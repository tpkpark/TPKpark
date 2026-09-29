import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { isAllowedEmail, workspaceDomain } from "./access";
import { buildDashboardData, type DashboardData } from "./records";

const sheetId = process.env.TPK_CONTENT_SHEET_ID;
const tabs = ["Content queue", "Channel posts", "Publication events", "Publishing rules"] as const;
const ranges = ["'Content queue'!A1:Z1000", "'Channel posts'!A1:AC1000",
  "'Publication events'!A1:H1000", "'Publishing rules'!A1:J200"] as const;

type GoogleValues = { valueRanges?: Array<{ range: string; values?: string[][] }> };

export class SheetAccessError extends Error {
  constructor(message: string, public status: number) { super(message); }
}

async function accessTokenFor(request: NextRequest) {
  const secureCookie = request.nextUrl.protocol === "https:" || request.headers.get("x-forwarded-proto") === "https";
  const token = await getToken({ req: request, secret: process.env.AUTH_SECRET, secureCookie });
  if (!token || !isAllowedEmail(token.email) || token.hostedDomain?.toLowerCase() !== workspaceDomain) {
    throw new SheetAccessError("Sign in with an approved TPK Park Workspace account.", 401);
  }
  if (token.googleAccessToken && token.googleExpiresAt && token.googleExpiresAt * 1000 > Date.now() + 60_000) {
    return token.googleAccessToken;
  }
  if (!token.googleRefreshToken || !process.env.AUTH_GOOGLE_ID || !process.env.AUTH_GOOGLE_SECRET) {
    throw new SheetAccessError("The Google session has expired. Please sign in again.", 401);
  }
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.AUTH_GOOGLE_ID,
      client_secret: process.env.AUTH_GOOGLE_SECRET,
      refresh_token: token.googleRefreshToken,
      grant_type: "refresh_token"
    }),
    cache: "no-store"
  });
  const refreshed = await response.json() as { access_token?: string };
  if (!response.ok || !refreshed.access_token) {
    throw new SheetAccessError("The Google session has expired. Please sign out and sign in again.", 401);
  }
  return refreshed.access_token;
}

export async function loadDashboard(request: NextRequest): Promise<DashboardData> {
  const accessToken = await accessTokenFor(request);
  if (!sheetId) throw new SheetAccessError("The content register is not configured.", 503);
  const url = new URL(`https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(sheetId)}/values:batchGet`);
  for (const range of ranges) url.searchParams.append("ranges", range);
  url.searchParams.set("valueRenderOption", "FORMATTED_VALUE");
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-store"
  });
  if (response.status === 401 || response.status === 403) {
    throw new SheetAccessError("The signed-in account needs access to the Tenant Content Register.", 403);
  }
  if (!response.ok) {
    throw new SheetAccessError(`Google Sheets is temporarily unavailable (${response.status}).`, 503);
  }
  const values = await response.json() as GoogleValues;
  if (!values.valueRanges || values.valueRanges.length !== tabs.length) {
    throw new SheetAccessError("The content register could not be read completely.", 503);
  }
  return buildDashboardData(values.valueRanges.map((range) => range.values || []),
    new Date().toISOString(), sheetId);
}
