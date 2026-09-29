import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { loadDashboard, SheetAccessError } from "@/lib/google-sheets";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    const data = await loadDashboard(request);
    return NextResponse.json(data, { headers: { "Cache-Control": "private, no-store" } });
  } catch (error) {
    const status = error instanceof SheetAccessError ? error.status : 503;
    const message = error instanceof SheetAccessError ? error.message : "The content register could not be loaded.";
    return NextResponse.json({ error: message }, { status, headers: { "Cache-Control": "private, no-store" } });
  }
}
