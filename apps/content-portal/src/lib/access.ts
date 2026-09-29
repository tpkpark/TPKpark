export const workspaceDomain = (process.env.TPK_CONTENT_WORKSPACE_DOMAIN || "tpkpark.com").toLowerCase();

export function allowedEmails() {
  return new Set((process.env.TPK_CONTENT_ALLOWED_EMAILS || "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean));
}

export function isAllowedEmail(email: string | null | undefined) {
  return Boolean(email && allowedEmails().has(email.toLowerCase()));
}

export function isAllowedGoogleProfile(profile: {
  email?: string | null;
  email_verified?: boolean;
  hd?: string;
}) {
  return profile.email_verified === true &&
    profile.hd?.toLowerCase() === workspaceDomain &&
    isAllowedEmail(profile.email);
}
