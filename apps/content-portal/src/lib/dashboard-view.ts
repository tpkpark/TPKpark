import type { ChannelPost, Story } from "./records";

export type ActionKind = "decision" | "verification" | "due" | "followup";
export type ActionItem = {
  kind: ActionKind;
  story: Story;
  post: ChannelPost;
  title: string;
  detail: string;
  date: string;
};

export type StoryFilters = {
  search: string;
  tenant: string;
  channel: string;
  status: string;
  timing: string;
};

export function dateKey(value: string) {
  return value.match(/\b20\d{2}-\d{2}-\d{2}\b/)?.[0] || "";
}

export function mytToday(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kuala_Lumpur", year: "numeric", month: "2-digit", day: "2-digit"
  }).formatToParts(now);
  const part = (type: string) => parts.find((item) => item.type === type)?.value || "";
  return `${part("year")}-${part("month")}-${part("day")}`;
}

function dayNumber(key: string) {
  const [year, month, day] = key.split("-").map(Number);
  return Date.UTC(year, month - 1, day) / 86_400_000;
}

function dayDistance(value: string, today: string) {
  const key = dateKey(value);
  return key ? dayNumber(key) - dayNumber(today) : null;
}

function hasAlert(post: ChannelPost) {
  return Boolean(post.alert && !["none", "—", "-"].includes(post.alert.trim().toLowerCase()));
}

function statusOf(post: ChannelPost) {
  return post.status.trim().toLowerCase();
}

export function actionFor(story: Story, post: ChannelPost, today: string): ActionItem | null {
  const status = statusOf(post);
  const base = { story, post };
  if (status === "excluded") return null;

  if (status.includes("hold") || status.includes("fail")) {
    return { ...base, kind: "decision", title: "Publishing on hold",
      detail: post.alert || post.reason || "Review the channel decision before publishing.",
      date: post.proposedAt };
  }

  if (status === "public") {
    if (!post.publicUrl) return { ...base, kind: "verification", title: "Public link missing",
      detail: "Add the public post link to the register after checking it.", date: post.publishedAt };
    if (!post.publicVerifiedAt) return { ...base, kind: "verification", title: "Verification not recorded",
      detail: hasAlert(post) ? post.alert : "Confirm the public link or record a historical verification gap.", date: post.publishedAt };
    const reviewDistance = dayDistance(post.nextReview, today);
    if (reviewDistance !== null && reviewDistance <= 0) {
      return { ...base, kind: "followup", title: "Review date reached",
        detail: hasAlert(post) ? post.alert : `Review date: ${post.nextReview}`,
        date: post.nextReview };
    }
    if (hasAlert(post)) return { ...base, kind: "followup", title: "Recorded alert",
      detail: post.alert, date: post.nextReview };
    return null;
  }

  if (hasAlert(post)) return { ...base, kind: "decision", title: "Check recorded alert",
    detail: post.alert, date: post.proposedAt };

  const distance = dayDistance(post.proposedAt, today);
  if (distance !== null && distance <= 0) return { ...base, kind: "due", title: "Posting time reached",
    detail: post.reason || `Planned for ${post.proposedAt}; check the platform and update the register.`,
    date: post.proposedAt };
  if (["scheduled", "approved", "planned"].includes(status)) {
    if (distance !== null) return null;
    return { ...base, kind: "decision", title: "Posting time not recorded",
      detail: "Record the planned platform time or update its status.", date: "" };
  }
  return { ...base, kind: "decision", title: "Channel decision pending",
    detail: post.alert || post.reason || `Current register status: ${post.status || "Unrecorded"}.`,
    date: post.proposedAt };
}

export function actionItems(stories: Story[], today: string) {
  const priority: Record<ActionKind, number> = { decision: 0, verification: 1, due: 2, followup: 3 };
  return stories.flatMap((story) => story.posts.flatMap((post) => {
    const item = actionFor(story, post, today);
    return item ? [item] : [];
  })).sort((a, b) => priority[a.kind] - priority[b.kind] ||
    (dateKey(a.date) || "9999").localeCompare(dateKey(b.date) || "9999"));
}

export function upcomingPosts(stories: Story[], today: string) {
  return stories.flatMap((story) => story.posts.flatMap((post) => {
    const status = statusOf(post);
    const distance = dayDistance(post.proposedAt, today);
    return distance !== null && distance > 0 && distance <= 7 &&
      !["public", "excluded"].includes(status) && !status.includes("hold") && !status.includes("fail")
      ? [{ story, post }] : [];
  })).sort((a, b) => a.post.proposedAt.localeCompare(b.post.proposedAt));
}

export function filteredStories(stories: Story[], filters: StoryFilters, today: string) {
  const query = filters.search.trim().toLowerCase();
  return stories.flatMap((story) => {
    if (filters.tenant && story.tenant !== filters.tenant) return [];
    const storyMatches = `${story.id} ${story.tenant} ${story.campaign}`.toLowerCase().includes(query);
    const visiblePosts = story.posts.filter((post) => {
      if (filters.channel && post.channel !== filters.channel) return false;
      if (filters.status === "action" && !actionFor(story, post, today)) return false;
      if (filters.status === "public" && statusOf(post) !== "public") return false;
      if (filters.status === "planned" && !["scheduled", "approved", "planned"].includes(statusOf(post))) return false;
      if (filters.status === "held" && !statusOf(post).includes("hold") && !statusOf(post).includes("fail")) return false;
      if (filters.status === "excluded" && statusOf(post) !== "excluded") return false;
      if (filters.timing) {
        const value = filters.timing === "published" ? post.publishedAt : post.proposedAt;
        const distance = dayDistance(value, today);
        if (distance === null || (filters.timing === "today" && distance !== 0) ||
          (filters.timing === "upcoming" && (distance <= 0 || distance > 7)) ||
          (filters.timing === "published" && (distance > 0 || distance < -6))) return false;
      }
      if (query && !storyMatches && !`${post.id} ${post.channel} ${post.status} ${post.decision}`.toLowerCase().includes(query)) return false;
      return true;
    });
    const noPostFilter = !filters.channel && !filters.status && !filters.timing;
    return visiblePosts.length || (noPostFilter && storyMatches) ? [{ story, visiblePosts }] : [];
  });
}
