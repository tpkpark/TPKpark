import { createHmac, randomBytes } from "node:crypto";
import { answerQuestion, assistantEnabled, AssistantError, limits, validateInput } from "../lib/assistant.mjs";

import { productionBudgetReady } from "../lib/assistant-budget.mjs";

// Per-instance abuse backstop. Vercel AI Gateway enforces the shared monthly
// project budget; production OIDC requests cannot bypass that budget.
const salt = randomBytes(32);
const visitors = new Map();
let active = 0;
let gatewayReadyAt = 0;

export function allowedOrigin(origin, env = process.env) {
  const allowed = new Set(["https://www.tpkpark.com", "https://tpkpark.com"]);
  for (const name of ["VERCEL_URL", "VERCEL_BRANCH_URL"]) {
    if (/^[a-z0-9-]+\.vercel\.app$/.test(env[name] || "")) allowed.add(`https://${env[name]}`);
  }
  if (!env.VERCEL) allowed.add("http://localhost:3000");
  return allowed.has(origin);
}

export function takeSlot(key, now = Date.now(), networkLimit = 100) {
  for (const [id, entry] of visitors) if (entry.until <= now) visitors.delete(id);
  const entry = visitors.get(key) || { count: 0, until: (Math.floor(now / 600000) + 1) * 600000 };
  if (entry.count >= networkLimit || active >= 3 || (!visitors.has(key) && visitors.size >= 2000)) return null;
  entry.count += 1;
  visitors.set(key, entry);
  active += 1;
  let released = false;
  return () => { if (!released) active -= 1; released = true; };
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  const send = (status, value) => { res.statusCode = status; res.end(JSON.stringify(value)); };
  if (req.method !== "POST") { res.setHeader("Allow", "POST"); return send(405, { error: "method_not_allowed" }); }
  if (!allowedOrigin(req.headers.origin) || req.headers["sec-fetch-site"] === "cross-site") return send(403, { error: "invalid_origin" });
  if (!assistantEnabled() || !productionBudgetReady()) return send(503, { error: "unavailable" });
  if (!(req.headers["content-type"] || "").toLowerCase().startsWith("application/json")) return send(415, { error: "invalid_request" });
  if (Number(req.headers["content-length"]) > limits.bodyBytes) return send(413, { error: "too_long" });
  let body;
  try {
    const raw = typeof req.body === "string" ? req.body : Buffer.isBuffer(req.body) ? req.body.toString("utf8") : JSON.stringify(req.body);
    if (!raw || Buffer.byteLength(raw) > limits.bodyBytes) return send(413, { error: "too_long" });
    body = validateInput(JSON.parse(raw));
  } catch { return send(400, { error: "invalid_request" }); }
  if (Date.now() < gatewayReadyAt) {
    res.setHeader("Retry-After", String(Math.ceil((gatewayReadyAt - Date.now()) / 1000)));
    return send(429, { error: "busy" });
  }
  // Vercel supplies x-forwarded-for; it is not forwarded to the AI provider.
  const address = String(req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "unknown").split(",")[0];
  const key = createHmac("sha256", salt).update(`${Math.floor(Date.now() / 600000)}:${address}`).digest("hex");

  const release = takeSlot(key);
  if (!release) {
    const networkLimited = (visitors.get(key)?.count || 0) >= 100;
    const delay = networkLimited ? Math.max(1, Math.ceil((visitors.get(key).until - Date.now()) / 1000)) : 2;
    res.setHeader("Retry-After", String(delay));
    return send(429, { error: networkLimited ? "rate_limited" : "busy" });
  }
  try { return send(200, await answerQuestion(body)); }
  catch (error) {
    const safe = error instanceof AssistantError ? error : new AssistantError("unavailable");
    if (safe.status === 429) {
      const delay = safe.retryAfter || 60;
      if (safe.providerStatus === 429) gatewayReadyAt = Date.now() + delay * 1000;
      res.setHeader("Retry-After", String(delay));
    }
    // Never return or log request text, credentials or provider error bodies.
    return send(safe.status, { error: safe.code });
  } finally { release(); }
}
