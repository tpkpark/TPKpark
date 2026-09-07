import { createHmac, randomBytes } from "node:crypto";
import { answerQuestion, assistantEnabled, AssistantError, limits } from "../lib/assistant.mjs";

// Short-lived, per-instance abuse protection. No raw IPs or conversations are
// stored. Gateway project budgets are the separate, durable spending control.
const salt = randomBytes(32);
const visitors = new Map();
let active = 0;

export function allowedOrigin(origin, env = process.env) {
  const allowed = new Set(["https://www.tpkpark.com", "https://tpkpark.com"]);
  for (const name of ["VERCEL_URL", "VERCEL_BRANCH_URL"]) {
    if (/^[a-z0-9-]+\.vercel\.app$/.test(env[name] || "")) allowed.add(`https://${env[name]}`);
  }
  if (!env.VERCEL) allowed.add("http://localhost:3000");
  return allowed.has(origin);
}

export function takeSlot(key, now = Date.now()) {
  for (const [id, entry] of visitors) if (entry.until <= now) visitors.delete(id);
  const entry = visitors.get(key) || { count: 0, until: now + 600000 };
  if (entry.count >= 12 || active >= 3 || (!visitors.has(key) && visitors.size >= 2000)) return null;
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
  if (!assistantEnabled()) return send(503, { error: "unavailable" });
  if (!(req.headers["content-type"] || "").toLowerCase().startsWith("application/json")) return send(415, { error: "invalid_request" });
  if (Number(req.headers["content-length"]) > limits.bodyBytes) return send(413, { error: "too_long" });
  let body;
  try {
    const raw = typeof req.body === "string" ? req.body : Buffer.isBuffer(req.body) ? req.body.toString("utf8") : JSON.stringify(req.body);
    if (!raw || Buffer.byteLength(raw) > limits.bodyBytes) return send(413, { error: "too_long" });
    body = JSON.parse(raw);
  } catch { return send(400, { error: "invalid_request" }); }
  // Vercel supplies x-forwarded-for; it is not forwarded to the AI provider.
  const address = String(req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "unknown").split(",")[0];
  const key = createHmac("sha256", salt).update(address).digest("hex");
  const release = takeSlot(key);
  if (!release) { res.setHeader("Retry-After", "60"); return send(429, { error: "busy" }); }
  try { return send(200, await answerQuestion(body)); }
  catch (error) {
    const safe = error instanceof AssistantError ? error : new AssistantError("unavailable");
    if (safe.status === 429) res.setHeader("Retry-After", "60");
    // Never return or log request text, credentials or provider error bodies.
    return send(safe.status, { error: safe.code });
  } finally { release(); }
}
