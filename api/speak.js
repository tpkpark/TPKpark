import { createHmac, randomBytes } from "node:crypto";
import { getVercelOidcToken } from "@vercel/oidc";
import { allowedOrigin } from "./ask.js";
import { assistantEnabled } from "../lib/assistant.mjs";

export const SPEECH_TEXT_LIMIT = 1800;
export const SPEECH_LOCALES = new Set([
  "en-MY", "ms-MY", "zh-CN", "ja-JP", "ko-KR", "th-TH", "id-ID",
  "ta-IN", "hi-IN", "ar-SA", "fr-FR", "de-DE", "es-ES"
]);

class SpeechError extends Error {
  constructor(code = "unavailable", status = 503, retryAfter = 0) {
    super(code);
    this.code = code;
    this.status = status;
    this.retryAfter = retryAfter;
  }
}

export function validateSpeechInput(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) throw new SpeechError("invalid_request", 400);
  const text = typeof body.text === "string" ? body.text.trim() : "";
  if (!text || text.length > SPEECH_TEXT_LIMIT || /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/u.test(text)) throw new SpeechError("invalid_request", 400);
  if (typeof body.locale !== "string" || !SPEECH_LOCALES.has(body.locale)) throw new SpeechError("invalid_request", 400);
  return { text, locale: body.locale };
}

export async function generateSpeech({ text, locale }, { fetchImpl = fetch, token, env = process.env } = {}) {
  let auth = token || env.AI_GATEWAY_API_KEY;
  if (!auth) {
    try { auth = await getVercelOidcToken(); }
    catch { throw new SpeechError(); }
  }
  let response;
  try {
    response = await fetchImpl("https://ai-gateway.vercel.sh/v4/ai/speech-model", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${auth}`,
        "Content-Type": "application/json",
        "ai-model-id": "openai/tts-1"
      },
      body: JSON.stringify({ text, voice: "nova", outputFormat: "mp3", language: locale, speed: 1 }),
      signal: AbortSignal.timeout(26000)
    });
  } catch { throw new SpeechError(); }
  if (!response.ok) {
    const status = response.status === 429 ? 429 : 503;
    const header = response.headers?.get?.("retry-after");
    const retryAfter = response.status === 429 && Number.isFinite(Number(header)) ? Math.max(1, Math.ceil(Number(header))) : 60;
    throw new SpeechError(response.status === 429 ? "busy" : response.status === 402 ? "budget_limited" : "unavailable", status, retryAfter);
  }
  try {
    const result = await response.json();
    const encoded = result?.audio;
    if (typeof encoded !== "string" || encoded.length < 4 || encoded.length > 11000000 || encoded.length % 4 || !/^[A-Za-z0-9+/]+={0,2}$/.test(encoded)) throw new Error();
    const audio = Buffer.from(encoded, "base64");
    if (audio.length < 1 || audio.length > 8000000) throw new Error();
    return audio;
  } catch { throw new SpeechError(); }
}

const salt = randomBytes(32);
const visitors = new Map();
let active = 0;

export function takeSpeechSlot(key, now = Date.now(), networkLimit = 60) {
  for (const [id, entry] of visitors) if (entry.until <= now) visitors.delete(id);
  const entry = visitors.get(key) || { count: 0, until: (Math.floor(now / 600000) + 1) * 600000 };
  if (entry.count >= networkLimit || active >= 2 || (!visitors.has(key) && visitors.size >= 2000)) return null;
  entry.count += 1;
  visitors.set(key, entry);
  active += 1;
  let released = false;
  return () => { if (!released) active -= 1; released = true; };
}

export function createSpeechHandler({ env = process.env, speak = generateSpeech } = {}) {
  let gatewayReadyAt = 0;
  return async function handler(req, res) {
    res.setHeader("Cache-Control", "private, no-store");
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Cross-Origin-Resource-Policy", "same-origin");
    res.setHeader("Vary", "Origin");
    const send = (status, value) => {
      res.statusCode = status;
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      res.end(JSON.stringify(value));
    };
    if (req.method !== "POST") { res.setHeader("Allow", "POST"); return send(405, { error: "method_not_allowed" }); }
    if (!allowedOrigin(req.headers.origin, env) || req.headers["sec-fetch-site"] === "cross-site") return send(403, { error: "invalid_origin" });
    if (!assistantEnabled(env)) return send(503, { error: "unavailable" });
    if (!(req.headers["content-type"] || "").toLowerCase().startsWith("application/json")) return send(415, { error: "invalid_request" });
    if (Number(req.headers["content-length"]) > 8000) return send(413, { error: "too_long" });
    let body;
    try {
      const raw = typeof req.body === "string" ? req.body : Buffer.isBuffer(req.body) ? req.body.toString("utf8") : JSON.stringify(req.body);
      if (!raw || Buffer.byteLength(raw) > 8000) return send(413, { error: "too_long" });
      body = validateSpeechInput(JSON.parse(raw));
    } catch (error) {
      const safe = error instanceof SpeechError ? error : new SpeechError("invalid_request", 400);
      return send(safe.status, { error: safe.code });
    }
    if (Date.now() < gatewayReadyAt) {
      res.setHeader("Retry-After", String(Math.max(1, Math.ceil((gatewayReadyAt - Date.now()) / 1000))));
      return send(429, { error: "busy" });
    }
    const address = String(req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "unknown").split(",")[0];
    const key = createHmac("sha256", salt).update(`${Math.floor(Date.now() / 600000)}:${address}`).digest("hex");
    const release = takeSpeechSlot(key);
    if (!release) { res.setHeader("Retry-After", "60"); return send(429, { error: "busy" }); }
    try {
      const audio = await speak(body, { env });
      res.statusCode = 200;
      res.setHeader("Content-Type", "audio/mpeg");
      res.setHeader("Content-Length", String(audio.length));
      return res.end(audio);
    } catch (error) {
      const safe = error instanceof SpeechError ? error : new SpeechError();
      if (safe.status === 429) {
        const delay = Math.max(1, Math.min(3600, safe.retryAfter || 60));
        gatewayReadyAt = Date.now() + delay * 1000;
        res.setHeader("Retry-After", String(delay));
      }
      return send(safe.status, { error: safe.code });
    } finally { release(); }
  };
}

export default createSpeechHandler();
