type Row = Record<string, string>;

export type ChannelPost = {
  id: string;
  submissionId: string;
  channel: string;
  language: string;
  format: string;
  decision: string;
  status: string;
  reason: string;
  proposedAt: string;
  approvedAt: string;
  publicUrl: string;
  publicVerifiedAt: string;
  publishedAt: string;
  nextReview: string;
  alert: string;
  notes: string;
};

export type Story = {
  id: string;
  tenant: string;
  campaign: string;
  sourceUrl: string;
  firstSeen: string;
  starts: string;
  expires: string;
  preferredWindow: string;
  editorialDecision: string;
  nextAction: string;
  reason: string;
  posts: ChannelPost[];
};

export type PublicationEvent = {
  id: string;
  recordedAt: string;
  postId: string;
  submissionId: string;
  status: string;
  actor: string;
  evidenceUrl: string;
  detail: string;
};

export type PublishingRule = {
  id: string;
  scope: string;
  condition: string;
  action: string;
  reviewed: string;
  status: string;
};

export type DashboardData = {
  syncedAt: string;
  registerUrl: string;
  stories: Story[];
  events: PublicationEvent[];
  rules: PublishingRule[];
};

function objects(rows: string[][]): Row[] {
  const [header = [], ...body] = rows;
  return body.filter((cells) => cells.some((value) => value?.trim()))
    .map((cells) => Object.fromEntries(header.map((name, index) => [name.trim(), cells[index]?.trim() || ""])));
}

function field(row: Row, key: string) { return row[key] || ""; }

export function buildDashboardData(tabs: string[][][], syncedAt: string, sheetId: string): DashboardData {
  const [queue = [], channelRows = [], eventRows = [], ruleRows = []] = tabs;
  const posts = objects(channelRows).map((row): ChannelPost => ({
    id: field(row, "Post ID"),
    submissionId: field(row, "Submission ID"),
    channel: field(row, "Channel"),
    language: field(row, "Language"),
    format: field(row, "Format"),
    decision: field(row, "Decision"),
    status: field(row, "Status"),
    reason: field(row, "Rule IDs / reason"),
    proposedAt: field(row, "Proposed publish MYT"),
    approvedAt: field(row, "Approved at MYT"),
    publicUrl: field(row, "Public URL"),
    publicVerifiedAt: field(row, "Public verified MYT"),
    publishedAt: field(row, "Published at MYT"),
    nextReview: field(row, "Offer end / next review MYT"),
    alert: field(row, "Control alert"),
    notes: field(row, "Correction / notes")
  }));
  const bySubmission = new Map<string, ChannelPost[]>();
  for (const post of posts) {
    if (!post.submissionId) continue;
    bySubmission.set(post.submissionId, [...(bySubmission.get(post.submissionId) || []), post]);
  }

  const stories = objects(queue).filter((row) => field(row, "Submission ID"))
    .map((row): Story => {
      const id = field(row, "Submission ID");
      return {
        id,
        tenant: field(row, "Tenant"),
        campaign: field(row, "Campaign"),
        sourceUrl: field(row, "Source folder link"),
        firstSeen: field(row, "First seen (MYT)"),
        starts: field(row, "Starts"),
        expires: field(row, "Expires"),
        preferredWindow: field(row, "Suggested window (MYT)"),
        editorialDecision: field(row, "Editorial decision"),
        nextAction: field(row, "Next action"),
        reason: field(row, "Reason or gap"),
        posts: bySubmission.get(id) || []
      };
    }).reverse();

  const events = objects(eventRows).filter((row) => field(row, "Event ID"))
    .map((row): PublicationEvent => ({
      id: field(row, "Event ID"),
      recordedAt: field(row, "Recorded at MYT"),
      postId: field(row, "Post ID"),
      submissionId: field(row, "Submission ID"),
      status: field(row, "Event / status"),
      actor: field(row, "Actor or source"),
      evidenceUrl: field(row, "Evidence URL"),
      detail: field(row, "Detail / next action")
    })).reverse();

  const rules = objects(ruleRows).filter((row) => field(row, "Rule ID"))
    .map((row): PublishingRule => ({
      id: field(row, "Rule ID"),
      scope: field(row, "Scope"),
      condition: field(row, "Condition"),
      action: field(row, "Required action"),
      reviewed: field(row, "Reviewed"),
      status: field(row, "Status")
    }));

  return {
    syncedAt,
    registerUrl: `https://docs.google.com/spreadsheets/d/${encodeURIComponent(sheetId)}/edit`,
    stories,
    events,
    rules
  };
}
