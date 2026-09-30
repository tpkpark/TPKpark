"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { ChannelPost, DashboardData, Story } from "@/lib/records";
import {
  actionItems, filteredStories, mytToday, upcomingPosts,
  type ActionItem, type ActionKind, type StoryFilters
} from "@/lib/dashboard-view";

type View = "overview" | "stories" | "activity" | "rules";

const emptyFilters: StoryFilters = { search: "", tenant: "", channel: "", status: "", timing: "" };
const actionGroups: { kind: ActionKind; label: string; explanation: string }[] = [
  { kind: "decision", label: "Decision needed", explanation: "Held or awaiting a channel decision" },
  { kind: "verification", label: "Verify or link", explanation: "Public status needs evidence in the register" },
  { kind: "due", label: "Posting due", explanation: "Planned time has arrived" },
  { kind: "followup", label: "Follow-up", explanation: "Recorded alerts or review dates" }
];

function safeUrl(value: string) {
  try { const url = new URL(value); return url.protocol === "https:" ? url.href : ""; }
  catch { return ""; }
}

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  const url = safeUrl(href);
  return url ? <a href={url} target="_blank" rel="noopener noreferrer">{children} <span aria-hidden="true">↗</span></a> : <span>{children}</span>;
}

function statusClass(status: string) {
  const normalized = status.toLowerCase();
  if (normalized === "public") return "public";
  if (normalized === "excluded") return "excluded";
  if (normalized.includes("hold") || normalized.includes("fail")) return "held";
  if (normalized.includes("schedul") || normalized.includes("approv")) return "scheduled";
  return "neutral";
}

function shortDate(value: string) {
  return value.replace(/\s*MYT\s*$/i, "").trim() || "—";
}

function postStatus(post: ChannelPost) {
  if (post.status === "Public" && !post.publicUrl) return "Link missing";
  return post.status || "Unrecorded";
}

function postKey(story: Story, post: ChannelPost) {
  return story.id + ":" + post.id;
}

function PostRow({ story, post, focused }: { story: Story; post: ChannelPost; focused: boolean }) {
  return <div id={"post-" + postKey(story, post)} tabIndex={-1} className={"post-row" + (focused ? " focused-post" : "")}>
    <div className="post-channel"><span className="channel-dot" />{post.channel}<small>{post.language || "Language unrecorded"}</small></div>
    <div className="post-state"><span className={"pill " + statusClass(post.status)}>{postStatus(post)}</span>
      {post.decision && post.decision !== "Candidate" && <small>{post.decision}</small>}
    </div>
    <div className="post-date">
      {post.proposedAt && <span><strong>Planned</strong>{shortDate(post.proposedAt)}</span>}
      {post.publishedAt && <span><strong>Published</strong>{shortDate(post.publishedAt)}</span>}
      {!post.proposedAt && !post.publishedAt && <span className="muted">Time not recorded</span>}
      {post.publicVerifiedAt && <small>Verified {shortDate(post.publicVerifiedAt)}</small>}
    </div>
    <div className="post-link">{post.publicUrl ? <ExternalLink href={post.publicUrl}>View post</ExternalLink> : <span className="muted">—</span>}</div>
    {(post.alert || post.notes || post.nextReview) && <div className="post-detail">
      {post.alert && <p><strong>Recorded alert:</strong> {post.alert}</p>}
      {post.nextReview && <p><strong>Next review / offer end:</strong> {post.nextReview}</p>}
      {post.notes && <p>{post.notes}</p>}
    </div>}
  </div>;
}

function StoryCard({ story, visiblePosts, expanded, focusedPost, toggle }: {
  story: Story; visiblePosts: ChannelPost[]; expanded: boolean; focusedPost: string; toggle: () => void;
}) {
  const publicCount = story.posts.filter((post) => post.status === "Public" && post.publicUrl).length;
  return <article id={"story-" + story.id} className="story-card">
    <button className="story-heading" onClick={toggle} aria-expanded={expanded}>
      <div><span className="story-id">{story.id} · {story.tenant}</span><h3>{story.campaign}</h3>
        <span className="story-meta">{story.starts || "Start not recorded"} · Received {shortDate(story.firstSeen)}</span>
      </div>
      <div className="story-summary"><span className="count-chip">{publicCount} linked public</span>
        <span className="chevron" aria-hidden="true">{expanded ? "−" : "+"}</span></div>
    </button>
    {expanded && <div className="story-body">
      <div className="story-context">
        <div><small>Editorial decision</small><p>{story.editorialDecision || "Not recorded"}</p></div>
        <div><small>Preferred posting window</small><p>{story.preferredWindow || "Not recorded"}</p></div>
        <div><small>Next action</small><p>{story.nextAction || "None recorded"}</p></div>
        {story.sourceUrl && <div><small>Tenant material</small><p><ExternalLink href={story.sourceUrl}>Open source folder</ExternalLink></p></div>}
      </div>
      <div className="posts-heading"><span>Platform</span><span>Status</span><span>Time (MYT)</span><span>Evidence</span></div>
      {visiblePosts.length ? visiblePosts.map((post) => <PostRow key={post.id} story={story} post={post}
        focused={focusedPost === postKey(story, post)} />) : <p className="empty-note">No platform decisions recorded yet.</p>}
    </div>}
  </article>;
}

function ActionRow({ item, onOpen }: { item: ActionItem; onOpen: () => void }) {
  return <div className="action-row">
    <div className="action-identity"><strong>{item.story.tenant} · {item.post.channel}</strong><span>{item.story.campaign}</span></div>
    <div className="action-description"><strong>{item.title}</strong><p>{item.detail}</p>
      {item.date && <small>{item.kind === "followup" ? "Review / follow-up" : "Recorded timing"}: {shortDate(item.date)} MYT</small>}</div>
    <button type="button" className="row-link" onClick={onOpen}>Open details <span aria-hidden="true">→</span></button>
  </div>;
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<View>("overview");
  const [filters, setFilters] = useState<StoryFilters>(emptyFilters);
  const [expanded, setExpanded] = useState("");
  const [focusedPost, setFocusedPost] = useState("");
  const today = mytToday();

  const refresh = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    try {
      const response = await fetch("/api/content", { cache: "no-store" });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Unable to load the register.");
      setData(payload as DashboardData);
      setError("");
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : "Unable to load the register.");
    } finally { if (!silent) setLoading(false); }
  }, []);

  useEffect(() => {
    void refresh();
    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible") void refresh(true);
    }, 5 * 60 * 1000);
    return () => window.clearInterval(timer);
  }, [refresh]);

  useEffect(() => {
    if (view !== "stories" || !expanded) return;
    const target = document.getElementById(focusedPost ? "post-" + focusedPost : "story-" + expanded);
    if (!target) return;
    const frame = window.requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
      if (focusedPost) target.focus({ preventScroll: true });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [view, expanded, focusedPost]);

  const stories = data?.stories || [];
  const posts = useMemo(() => stories.flatMap((story) => story.posts), [stories]);
  const actions = useMemo(() => actionItems(stories, today), [stories, today]);
  const upcoming = useMemo(() => upcomingPosts(stories, today), [stories, today]);
  const filtered = useMemo(() => filteredStories(stories, filters, today), [stories, filters, today]);
  const tenants = [...new Set(stories.map((story) => story.tenant).filter(Boolean))].sort();
  const channels = [...new Set(posts.map((post) => post.channel).filter(Boolean))].sort();
  const linkedPublic = posts.filter((post) => post.status === "Public" && Boolean(post.publicUrl)).length;
  const postById = new Map(posts.map((post) => [post.id, post]));
  const storyById = new Map(stories.map((story) => [story.id, story]));

  const openStory = (story: Story, post?: ChannelPost) => {
    setFilters(emptyFilters);
    setExpanded(story.id);
    setFocusedPost(post ? postKey(story, post) : "");
    setView("stories");
  };
  const updateFilter = (key: keyof StoryFilters, value: string) =>
    setFilters((current) => ({ ...current, [key]: value }));

  return <main className="dashboard">
    <div className="page-heading"><div><p className="eyebrow">TPK Park · Tenant content</p><h1>Publishing desk</h1>
      <p className="subtitle">Decisions, posting times and verified links across TPK Park’s digital channels.</p></div>
      <div className="heading-actions"><span className="sync-time">{data ? "Register fetched " +
        new Intl.DateTimeFormat("en-MY", { timeZone: "Asia/Kuala_Lumpur", dateStyle: "medium", timeStyle: "short" })
          .format(new Date(data.syncedAt)) + " MYT" : ""}</span>
        <button className="outline-button" onClick={() => void refresh()} disabled={loading}>{loading ? "Loading…" : "↻ Refresh"}</button></div>
    </div>
    <p className="source-note">Rechecks the register every five minutes while this page is visible.
      {data?.events[0]?.recordedAt && " Latest logged event: " + shortDate(data.events[0].recordedAt) + " MYT."}
      {" "}A fetch time is not the time of the last register edit or a live platform check.</p>

    <nav className="view-nav" aria-label="Dashboard views">
      {(["overview", "stories", "activity", "rules"] as View[]).map((item) =>
        <button key={item} className={view === item ? "active" : ""} aria-current={view === item ? "page" : undefined}
          onClick={() => setView(item)}>
          {item === "overview" ? "Overview" : item === "stories" ? "Submissions" : item === "activity" ? "Publication log" : "Publishing rules"}
        </button>)}
    </nav>

    {error && <div className="error-panel" role="alert"><strong>Register unavailable</strong><p>{error}</p>
      {data && <p>The last successful read remains visible below.</p>}
      <button className="outline-button" onClick={() => void refresh()}>Try again</button></div>}
    {!data && !error && <div className="loading-panel">Reading the content register…</div>}

    {data && view === "overview" && <>
      <div className="overview-intro"><div><p className="eyebrow">Your next steps</p><h2>What needs attention</h2>
        <p>Each item opens the exact platform decision in its tenant submission.</p></div>
        <div className="overview-total"><strong>{linkedPublic}</strong><span>public posts with links recorded</span></div></div>
      <div className="work-counts">
        {actionGroups.map((group) => {
          const count = actions.filter((item) => item.kind === group.kind).length;
          return count ? <a key={group.kind} href={"#actions-" + group.kind} className="work-count">
            <strong>{count}</strong><span>{group.label}</span></a> :
            <div key={group.kind} className="work-count work-count-empty"><strong>0</strong><span>{group.label}</span></div>;
        })}
      </div>
      <div className="action-groups">
        {actions.length ? actionGroups.filter((group) => actions.some((item) => item.kind === group.kind)).map((group) => {
          const items = actions.filter((item) => item.kind === group.kind);
          return <section id={"actions-" + group.kind} className="panel action-panel" key={group.kind}>
            <div className="section-heading"><div><p className="eyebrow">{group.explanation}</p><h3>{group.label} <span className="group-count">{items.length}</span></h3></div></div>
            {items.map((item) => <ActionRow key={postKey(item.story, item.post)} item={item}
              onOpen={() => openStory(item.story, item.post)} />)}
          </section>;
        }) : <section className="panel"><p className="empty-note compact">No action items recorded in the register.</p></section>}
      </div>

      <section className="panel upcoming-panel"><div className="section-heading"><div><p className="eyebrow">Next seven days</p>
        <h2>Planned posting</h2></div><span className="muted">Based on recorded platform times</span></div>
        {upcoming.length ? upcoming.map(({ story, post }) => <div className="upcoming-row" key={postKey(story, post)}>
          <time>{shortDate(post.proposedAt)} MYT</time><div><strong>{story.tenant} · {post.channel}</strong><span>{story.campaign}</span></div>
          <span className={"pill " + statusClass(post.status)}>{postStatus(post)}</span>
          <button type="button" className="row-link" onClick={() => openStory(story, post)}>Details →</button>
        </div>) : <p className="empty-note compact">No future platform time is recorded for the next seven days.</p>}
      </section>

      <section className="panel matrix-panel"><div className="section-heading"><div><p className="eyebrow">Tenant by platform</p>
        <h2>Where each story stands</h2></div><button className="text-button" onClick={() => setView("stories")}>All submissions →</button></div>
        {stories.map((story) => <div className="matrix-row" key={story.id}>
          <div className="matrix-story"><strong>{story.tenant}</strong><span>{story.campaign}</span><small>{story.id}</small></div>
          <div className="matrix-channels">{story.posts.length ? story.posts.map((post) =>
            <button type="button" className={"platform-chip " + statusClass(post.status)}
              key={post.id} onClick={() => openStory(story, post)}
              title={post.channel + ": " + postStatus(post)}>
              <strong>{post.channel}</strong><span>{postStatus(post)}</span></button>) : <span className="muted">No platform decisions</span>}</div>
          <div className="matrix-next"><small>Next action / window</small><span>{story.nextAction || story.preferredWindow || "Not recorded"}</span></div>
          <button type="button" className="row-link" onClick={() => openStory(story)}>Open →</button>
        </div>)}
      </section>
      <p className="overview-footnote">The portal reads recorded decisions. Tenant Drive uploads and platform changes need to be entered and verified in the register.</p>
    </>}

    {data && view === "stories" && <section className="stories-view">
      <div className="section-heading"><div><p className="eyebrow">Editorial queue</p><h2>Tenant submissions</h2></div>
        <span className="muted">{filtered.length} of {stories.length} stories</span></div>
      <div className="filter-bar">
        <label className="filter-search">Search<input className="search-input" value={filters.search}
          onChange={(event) => updateFilter("search", event.target.value)}
          placeholder="Tenant, story, post or platform" /></label>
        <label>Tenant<select value={filters.tenant} onChange={(event) => updateFilter("tenant", event.target.value)}>
          <option value="">All tenants</option>{tenants.map((tenant) => <option key={tenant}>{tenant}</option>)}</select></label>
        <label>Platform<select value={filters.channel} onChange={(event) => updateFilter("channel", event.target.value)}>
          <option value="">All platforms</option>{channels.map((channel) => <option key={channel}>{channel}</option>)}</select></label>
        <label>Status<select value={filters.status} onChange={(event) => updateFilter("status", event.target.value)}>
          <option value="">All decisions</option><option value="action">Needs attention</option>
          <option value="public">Public</option><option value="planned">Planned / scheduled</option>
          <option value="held">Held</option><option value="excluded">Excluded</option></select></label>
        <label>Timing<select value={filters.timing} onChange={(event) => updateFilter("timing", event.target.value)}>
          <option value="">All dates</option><option value="today">Planned today</option>
          <option value="upcoming">Planned next 7 days</option><option value="published">Published last 7 days</option></select></label>
        <button type="button" className="filter-reset" onClick={() => setFilters(emptyFilters)}>Clear filters</button>
      </div>
      {filtered.length ? filtered.map(({ story, visiblePosts }) => <StoryCard key={story.id} story={story}
        visiblePosts={visiblePosts} expanded={expanded === story.id} focusedPost={focusedPost}
        toggle={() => { setExpanded(expanded === story.id ? "" : story.id); setFocusedPost(""); }} />) :
        <p className="empty-note">No submissions match these filters.</p>}
    </section>}

    {data && view === "activity" && <section className="panel"><div className="section-heading"><div><p className="eyebrow">Audit trail</p>
      <h2>Publication log</h2></div><span className="muted">Newest recorded events first</span></div>
      {data.events.map((event) => {
        const post = postById.get(event.postId);
        const story = storyById.get(event.submissionId || post?.submissionId || "");
        return <div className="event-row full" key={event.id}><span className={"pill " + statusClass(event.status)}>{event.status}</span>
          <div><strong>{story ? story.tenant + " · " + story.campaign : event.postId || event.submissionId}</strong>
            <small>{post?.channel ? post.channel + " · " : ""}{event.postId || event.submissionId} · {event.actor}</small>
            <p>{event.detail}</p>{event.evidenceUrl && <ExternalLink href={event.evidenceUrl}>Open evidence</ExternalLink>}</div>
          <time>{shortDate(event.recordedAt)}</time></div>;
      })}
    </section>}

    {data && view === "rules" && <section className="panel"><div className="section-heading"><div><p className="eyebrow">Editorial controls</p>
      <h2>Publishing rules</h2></div><span className="muted">{data.rules.length} rules in register</span></div>
      {data.rules.map((rule) => <div className="rule-row" key={rule.id}><span className="rule-id">{rule.id}</span>
        <div><strong>{rule.scope}</strong><p>{rule.condition}</p><small>{rule.action}</small></div>
        <span className="muted">{rule.status}</span></div>)}
    </section>}

    {data && <footer className="dashboard-footer"><span>Read from the <ExternalLink href={data.registerUrl}>TPK Park Tenant Content Register</ExternalLink>.
      Platform states reflect recorded evidence; this page does not publish or independently poll social accounts.</span>
      <span>Times shown in Malaysia time (MYT).</span></footer>}
  </main>;
}
