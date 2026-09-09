export const SESSION_KEY = "tpk:ask:session:v2";
export const SESSION_TTL = 90 * 60 * 1000;
const fields = ["businessType", "budget", "size", "floor", "timing"];
const preferences = ["auto", "en", "ms", "zh"];
const blank = () => ({ turns: [], replyPreference: "auto", retryAt: 0 });

export function boundedTurns(turns) {
  if (!Array.isArray(turns) || turns.length % 2) return [];
  const result = [];
  for (let i = 0; i < turns.length; i += 1) {
    const turn = turns[i];
    const role = i % 2 ? "assistant" : "user";
    if (!turn || turn.role !== role || typeof turn.content !== "string" || !turn.content.trim() || turn.content.length > (i % 2 ? 5000 : 2000)) return [];
    const clean = { role, content: turn.content };
    if (role === "assistant") {
      clean.sourceIds = Array.isArray(turn.sourceIds) ? turn.sourceIds.filter(id => typeof id === "string" && id.length < 40).slice(0, 3) : [];
      clean.propertyIds = Array.isArray(turn.propertyIds) ? turn.propertyIds.filter(id => ["shopGround", "shopFirst", "detached"].includes(id)).slice(0, 3) : [];
      if (turn.enquiry?.requested === true) clean.enquiry = { requested: true, ...Object.fromEntries(fields.map(key => [key, typeof turn.enquiry[key] === "string" ? turn.enquiry[key].slice(0, 120) : ""])) };
    }
    result.push(clean);
  }
  while (result.length > 6 || result.reduce((n, t) => n + t.content.length, 0) > 7000) result.splice(0, 2);
  return result;
}

export function clearSession(storage) {
  try { storage?.removeItem(SESSION_KEY); } catch { /* Storage may be disabled. */ }
}

export function loadSession(storage, now = Date.now()) {
  try {
    const raw = storage?.getItem(SESSION_KEY);
    if (!raw) return blank();
    if (raw.length > 50000) throw new Error("Oversized session");
    const value = JSON.parse(raw);
    if (value.version !== 2 || !Number.isFinite(value.savedAt) || now - value.savedAt >= SESSION_TTL || value.savedAt > now || !preferences.includes(value.replyPreference)) throw new Error("Expired session");
    return { expiresAt: value.savedAt + SESSION_TTL, turns: boundedTurns(value.turns), replyPreference: value.replyPreference, retryAt: Number.isFinite(value.retryAt) && value.retryAt > now && value.retryAt < now + 32 * 86400000 ? value.retryAt : 0 };
  } catch { clearSession(storage); return blank(); }
}

export function saveSession(storage, state, now = Date.now()) {
  try { storage?.setItem(SESSION_KEY, JSON.stringify({ version: 2, savedAt: now, turns: boundedTurns(state.turns), replyPreference: preferences.includes(state.replyPreference) ? state.replyPreference : "auto", retryAt: state.retryAt || 0 })); } catch { /* Continue in page memory. */ }
}

export function requestMessages(turns, question) {
  const messages = [...boundedTurns(turns).map(({ role, content }) => ({ role, content })), { role: "user", content: question }];
  while (messages.length > 1 && (messages.reduce((n, t) => n + t.content.length, 0) > 9000 || new TextEncoder().encode(JSON.stringify(messages)).length > 17000)) messages.splice(0, 2);
  return messages;
}

export function emailBody(enquiry, copy) {
  return [copy.emailGreeting, "", copy.emailIntro, "", ...fields.filter(key => enquiry[key]).map(key => `${copy.fields[key]}: ${enquiry[key]}`), "", copy.emailConfirm, "", copy.emailThanks].join("\n");
}

export function emailLink(body, subject) {
  return `mailto:info@tpkpark.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body.slice(0, 2400))}`;
}
