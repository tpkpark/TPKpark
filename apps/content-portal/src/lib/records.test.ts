import assert from "node:assert/strict";
import test from "node:test";
import { buildDashboardData } from "./records.ts";
import { isAllowedGoogleProfile } from "./access.ts";

test("groups channel decisions under the correct story without treating an excluded channel as public", () => {
  const data = buildDashboardData([
    [["Submission ID", "Tenant", "Campaign", "Source folder link", "First seen (MYT)"],
      ["TPK-1", "m.o.t.d", "CHAR dining", "https://drive.google.com/drive/folders/example", "2026-09-29 15:52 MYT"]],
    [["Post ID", "Submission ID", "Channel", "Status", "Public URL", "Public verified MYT", "Published at MYT", "Control alert"],
      ["TPK-1-GBP", "TPK-1", "Google Business Profile", "Public", "https://example.com/post", "2026-09-29 16:07 MYT", "2026-09-29 ~16:01 MYT", ""],
      ["TPK-1-TT", "TPK-1", "TikTok", "Excluded", "", "", "", "Not suitable for this story"]],
    [["Event ID", "Recorded at MYT", "Post ID", "Event / status"], ["EV-1", "2026-09-29 16:07 MYT", "TPK-1-GBP", "Public"]],
    [["Rule ID", "Scope", "Condition", "Required action"], ["R01", "Timing", "Offer expires", "Review"]]
  ], "2026-09-29T08:10:00.000Z", "test-sheet");

  assert.equal(data.stories.length, 1);
  assert.equal(data.stories[0].posts.length, 2);
  assert.equal(data.stories[0].posts[0].publishedAt, "2026-09-29 ~16:01 MYT");
  assert.equal(data.stories[0].posts[1].status, "Excluded");
  assert.equal(data.stories[0].posts[1].publicUrl, "");
  assert.equal(data.events[0].postId, "TPK-1-GBP");
  assert.equal(data.rules[0].id, "R01");
});

test("Workspace access requires the hosted-domain claim, verified email and named account", () => {
  process.env.TPK_CONTENT_ALLOWED_EMAILS = "editor@tpkpark.com";
  assert.equal(isAllowedGoogleProfile({ email: "editor@tpkpark.com", email_verified: true, hd: "tpkpark.com" }), true);
  assert.equal(isAllowedGoogleProfile({ email: "editor@tpkpark.com", email_verified: true }), false);
  assert.equal(isAllowedGoogleProfile({ email: "stranger@tpkpark.com", email_verified: true, hd: "tpkpark.com" }), false);
  assert.equal(isAllowedGoogleProfile({ email: "editor@tpkpark.com", email_verified: false, hd: "tpkpark.com" }), false);
});
