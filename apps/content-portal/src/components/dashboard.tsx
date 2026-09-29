"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { ChannelPost, DashboardData, Story } from "@/lib/records";

type View = "overview" | "stories" | "activity" | "rules";

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

function mytToday() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kuala_Lumpur", year: "numeric", month: "2-digit", day: "2-digit" })
    .format(new Date());
}

function reviewDue(value: string) {
  const date = value.match(/\b20\d{2}-\d{2}-\d{2}\b/)?.[0];
  return Boolean(date && date <= mytToday());
}

function needsAttention(post: ChannelPost) {
  return statusClass(post.status) === "held" ||
    Boolean(post.alert && post.alert.toLowerCase() !== "none") ||
    (post.status === "Public" && reviewDue(post.nextReview));
}

function postStatus(post: ChannelPost) {
  if (post.status === "Public" && !post.publicUrl) return "Link missing";
  return post.status || "Unrecorded";
}

function PostRow({ post }: { post: ChannelPost }) {
  return <div className="post-row">
    <div className="post-channel"><span className="channel-dot" />{post.channel}<small>{post.language || "Language unrecorded"}</small></div>
    <div className="post-state"><span className={`pill ${statusClass(post.status)}`}>{postStatus(post)}</span>
      {post.decision && post.decision !== "Candidate" && <small>{post.decision}</small>}
    </div>
    <div className="post-date"><strong>{post.publishedAt ? "Published" : post.proposedAt ? "Planned / recorded" : "Timing"}</strong>
      <span>{shortDate(post.publishedAt || post.proposedAt)}</span>
      {post.publicVerifiedAt && <small>Verified {shortDate(post.publicVerifiedAt)}</small>}
    </div>
    <div className="post-link">{post.publicUrl ? <ExternalLink href={post.publicUrl}>View post</ExternalLink> : <span className="muted">—</span>}</div>
    {(post.alert || post.notes || (post.status === "Public" && reviewDue(post.nextReview))) &&
      <div className="post-detail">
        {post.alert && <p><strong>Alert:</strong> {post.alert}</p>}
        {post.status === "Public" && reviewDue(post.nextReview) && <p><strong>Review due:</strong> {post.nextReview}</p>}
        {post.notes && <p>{post.notes}</p>}
      </div>}
  </div>;
}

function StoryCard({ story, expanded, toggle }: { story: Story; expanded: boolean; toggle: () => void }) {
  const publicCount = story.posts.filter((post) => post.status === "Public" && post.publicUrl).length;
  const alertCount = story.posts.filter(needsAttention).length;
  return <article className="story-card">
    <button className="story-heading" onClick={toggle} aria-expanded={expanded}>
      <div><span className="story-id">{story.id} · {story.tenant}</span><h3>{story.campaign}</h3>
        <span className="story-meta">{story.starts || "Start not recorded"} · Received {shortDate(story.firstSeen)}</span>
      </div>
      <div className="story-summary"><span className="count-chip">{publicCount} public</span>
        {alertCount > 0 && <span className="count-chip attention">{alertCount} to review</span>}
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
      {story.posts.length ? story.posts.map((post) => <PostRow key={post.id} post={post} />) : <p className="empty-note">No platform decisions recorded yet.</p>}
    </div>}
  </article>;
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<View>("overview");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState("");

  const refresh = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/content", { cache: "no-store" });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Unable to load the register.");
      setData(payload as DashboardData);
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : "Unable to load the register.");
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { void refresh(); }, [refresh]);

  const posts = useMemo(() => data?.stories.flatMap((story) => story.posts) || [], [data]);
  const publicPosts = posts.filter((post) => post.status === "Public" && Boolean(post.publicUrl));
  const attention = posts.filter(needsAttention);
  const held = posts.filter((post) => statusClass(post.status) === "held");
  const channels = [...new Set(posts.map((post) => post.channel))];
  const filtered = (data?.stories || []).filter((story) =>
    `${story.tenant} ${story.campaign} ${story.id} ${story.posts.map((post) => post.channel).join(" ")}`
      .toLowerCase().includes(search.toLowerCase()));

  return <main className="dashboard">
    <div className="page-heading"><div><p className="eyebrow">TPK Park · Tenant content</p><h1>Publishing overview</h1>
      <p className="subtitle">Submissions, decisions and verified links across TPK Park’s digital channels.</p></div>
      <div className="heading-actions"><span className="sync-time">{data ? `Register read ${new Intl.DateTimeFormat("en-MY", { timeZone: "Asia/Kuala_Lumpur", dateStyle: "medium", timeStyle: "short" }).format(new Date(data.syncedAt))} MYT` : ""}</span>
        <button className="outline-button" onClick={() => void refresh()} disabled={loading}>{loading ? "Loading…" : "↻ Refresh"}</button></div>
    </div>

    <nav className="view-nav" aria-label="Dashboard views">
      {(["overview", "stories", "activity", "rules"] as View[]).map((item) =>
        <button key={item} className={view === item ? "active" : ""} onClick={() => setView(item)}>
          {item === "overview" ? "Overview" : item === "stories" ? "Submissions" : item === "activity" ? "Publication log" : "Publishing rules"}
        </button>)}
    </nav>

    {error && <div className="error-panel" role="alert"><strong>Register unavailable</strong><p>{error}</p>
      <button className="outline-button" onClick={() => void refresh()}>Try again</button></div>}
    {!data && !error && <div className="loading-panel">Reading the content register…</div>}

    {data && view === "overview" && <>
      <div className="metrics">
        <div className="metric"><span>Submissions</span><strong>{data.stories.length}</strong><small>Distinct tenant stories</small></div>
        <div className="metric"><span>Public posts</span><strong>{publicPosts.length}</strong><small>With recorded links</small></div>
        <div className="metric"><span>Needs review</span><strong>{attention.length}</strong><small>Held, alerted or review due</small></div>
        <div className="metric"><span>Channels considered</span><strong>{channels.length}</strong><small>{held.length} held decisions</small></div>
      </div>
      <div className="overview-grid">
        <section className="panel"><div className="section-heading"><div><p className="eyebrow">Action list</p><h2>Needs your attention</h2></div><button className="text-button" onClick={() => setView("stories")}>All submissions →</button></div>
          {attention.length ? attention.slice(0, 7).map((post) => <div className="attention-row" key={post.id}>
            <div><strong>{post.channel}</strong><span>{data.stories.find((s) => s.id === post.submissionId)?.campaign || post.submissionId}</span></div>
            <small>{post.alert || (reviewDue(post.nextReview) ? `Review due: ${post.nextReview}` : post.reason || post.status)}</small>
          </div>) : <p className="empty-note">No held or overdue items in the register.</p>}
        </section>
        <section className="panel"><div className="section-heading"><div><p className="eyebrow">Distribution</p><h2>By channel</h2></div></div>
          {channels.length ? channels.map((channel) => {
            const channelPosts = posts.filter((post) => post.channel === channel);
            const live = channelPosts.filter((post) => post.status === "Public" && post.publicUrl).length;
            return <div className="channel-summary" key={channel}><span>{channel}</span><div className="track"><i style={{ width: `${Math.max(5, live / Math.max(1, channelPosts.length) * 100)}%` }} /></div><strong>{live} / {channelPosts.length}</strong></div>;
          }) : <p className="empty-note">No channel decisions recorded.</p>}
          <p className="panel-footnote">Counts follow the register. An excluded channel is a deliberate decision.</p>
        </section>
      </div>
      <section className="panel recent-panel"><div className="section-heading"><div><p className="eyebrow">Recent history</p><h2>Publication events</h2></div><button className="text-button" onClick={() => setView("activity")}>Full log →</button></div>
        {data.events.slice(0, 5).map((event) => <div className="event-row" key={event.id}><span className={`pill ${statusClass(event.status)}`}>{event.status}</span><div><strong>{event.postId || event.submissionId}</strong><p>{event.detail}</p></div><time>{shortDate(event.recordedAt)}</time></div>)}
      </section>
    </>}

    {data && view === "stories" && <section className="stories-view"><div className="section-heading"><div><p className="eyebrow">Editorial queue</p><h2>Tenant submissions</h2></div>
      <input className="search-input" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search tenant, story or platform" aria-label="Search submissions" /></div>
      {filtered.length ? filtered.map((story) => <StoryCard key={story.id} story={story} expanded={expanded === story.id} toggle={() => setExpanded(expanded === story.id ? "" : story.id)} />) : <p className="empty-note">No submissions match this search.</p>}
    </section>}

    {data && view === "activity" && <section className="panel"><div className="section-heading"><div><p className="eyebrow">Audit trail</p><h2>Publication log</h2></div><span className="muted">Newest recorded events first</span></div>
      {data.events.map((event) => <div className="event-row full" key={event.id}><span className={`pill ${statusClass(event.status)}`}>{event.status}</span>
        <div><strong>{event.postId || event.submissionId}</strong><small>{event.actor}</small><p>{event.detail}</p>{event.evidenceUrl && <ExternalLink href={event.evidenceUrl}>Open evidence</ExternalLink>}</div>
        <time>{shortDate(event.recordedAt)}</time></div>)}
    </section>}

    {data && view === "rules" && <section className="panel"><div className="section-heading"><div><p className="eyebrow">Editorial controls</p><h2>Publishing rules</h2></div><span className="muted">{data.rules.length} rules in register</span></div>
      {data.rules.map((rule) => <div className="rule-row" key={rule.id}><span className="rule-id">{rule.id}</span><div><strong>{rule.scope}</strong><p>{rule.condition}</p><small>{rule.action}</small></div><span className="muted">{rule.status}</span></div>)}
    </section>}

    {data && <footer className="dashboard-footer"><span>Live read from the <ExternalLink href={data.registerUrl}>TPK Park Tenant Content Register</ExternalLink>. Platform states reflect recorded evidence; this page does not publish or independently poll social accounts.</span><span>All times shown in Malaysia time (MYT).</span></footer>}
  </main>;
}
