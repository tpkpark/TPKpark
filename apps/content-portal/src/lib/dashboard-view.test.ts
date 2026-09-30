import assert from "node:assert/strict";
import test from "node:test";
import { buildDashboardData } from "./records.ts";
import { actionItems, filteredStories, mytToday, upcomingPosts } from "./dashboard-view.ts";

const data = buildDashboardData([
  [["Submission ID", "Tenant", "Campaign"], ["TPK-1", "m.o.t.d", "Dining"]],
  [["Post ID", "Submission ID", "Channel", "Status", "Public URL", "Public verified MYT",
    "Rule IDs / reason",
    "Proposed publish MYT", "Published at MYT", "Offer end / next review MYT", "Control alert"],
    ["GBP", "TPK-1", "Google Business Profile", "Public", "https://example.com/post", "2026-09-29 16:07 MYT", "", "", "2026-09-29 16:01 MYT", "2026-10-06", "Photo rights to confirm"],
    ["IG", "TPK-1", "Instagram", "Public", "https://example.com/ig", "", "", "", "2026-09-28 19:00 MYT", "", ""],
    ["FB", "TPK-1", "Facebook", "Scheduled", "", "", "", "2026-10-02 11:00 MYT", "", "", ""],
    ["XHS", "TPK-1", "XHS / RedNote", "Scheduled", "", "", "", "2026-09-29 11:00 MYT", "", "", ""],
    ["WEB", "TPK-1", "tpkpark.com", "Held", "", "", "R11 R15 — current terms missing", "2026-10-02 11:00 MYT", "", "", ""],
    ["TT", "TPK-1", "TikTok", "Excluded", "", "", "", "", "", "", "Deliberate exclusion"]],
  [["Event ID"], ["E1"]],
  [["Rule ID"], ["R1"]]
], "2026-09-30T06:00:00.000Z", "test-sheet");

test("owner actions distinguish evidence, due timing and follow-up without flagging deliberate exclusions", () => {
  const actions = actionItems(data.stories, "2026-09-30");
  assert.deepEqual(actions.map((item) => [item.post.id, item.kind]), [
    ["WEB", "decision"], ["IG", "verification"], ["XHS", "due"], ["GBP", "followup"]
  ]);
  assert.equal(actions[0].title, "Publishing on hold");
  assert.equal(actions[0].detail, "current terms missing");
  assert.deepEqual(upcomingPosts(data.stories, "2026-09-30").map(({ post }) => post.id), ["FB"]);
  assert.equal(mytToday(new Date("2026-09-29T16:30:00Z")), "2026-09-30");
});

test("story filters narrow platform decisions by action, channel and posting window", () => {
  const base = { search: "", tenant: "", channel: "", status: "", timing: "" };
  const attention = filteredStories(data.stories, { ...base, status: "action" }, "2026-09-30");
  assert.deepEqual(attention[0].visiblePosts.map((post) => post.id), ["GBP", "IG", "XHS", "WEB"]);
  assert.deepEqual(filteredStories(data.stories, { ...base, status: "held" }, "2026-09-30")[0].visiblePosts.map((post) => post.id), ["WEB"]);
  const upcoming = filteredStories(data.stories, { ...base, channel: "Facebook", timing: "upcoming" }, "2026-09-30");
  assert.deepEqual(upcoming[0].visiblePosts.map((post) => post.id), ["FB"]);
  assert.equal(filteredStories(data.stories, { ...base, channel: "TikTok", status: "action" }, "2026-09-30").length, 0);
});
