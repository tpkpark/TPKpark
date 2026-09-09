import { mkdir, writeFile } from "node:fs/promises";
import { answerQuestion } from "../lib/assistant.mjs";

// Fixed public review questions only. No visitor transcripts, and no paid calls
// in local tests or production builds. Review the report, not just build status.
if (process.env.VERCEL_ENV !== "preview" || process.env.VERCEL_GIT_COMMIT_REF !== "codex/ask-tpk-upgrade") process.exit(0);
const checks = [];
const samples = [
  { locale: "en", question: "tell me about wong shung yen", check: r => /Wong Shung Yen/i.test(r.answer) && /Managing Director/i.test(r.answer) && r.sources.some(s => s.id === "profile") && !/no information/i.test(r.answer) && r.propertyIds.length === 0 && !r.enquiry.requested },
  { locale: "en", pathname: "/leasing/shop-showroom/", question: "I have RM4,000 per month for an office. Which shop floor should I consider, and can you show its brochure? Does 3,520 sq ft mean the first floor alone?", check: r => /3,?600/.test(r.answer) && /two floors|both floors|two storeys/i.test(r.answer) && r.propertyIds.includes("shopFirst") && !r.propertyIds.includes("shopGround") && !r.enquiry.requested },
  { locale: "en", pathname: "/leasing/detached-building/", question: "この建物の賃料と面積を教えてください。パンフレットも見たいです。", check: r => /[\p{Script=Hiragana}\p{Script=Katakana}]/u.test(r.answer) && /58,?000/.test(r.answer) && /10,?965/.test(r.answer) && r.propertyIds.includes("detached") },
  { locale: "en", replyPreference: "zh", question: "What is Wong Shung Yen's film credit? Please reply in English.", check: r => /\p{Script=Han}/u.test(r.answer) && /协同制片人/.test(r.answer) && /Lelaki Harapan Dunia|Men Who Save the World/.test(r.answer) && !r.enquiry.requested },
  { locale: "en", prior: [{ role: "user", content: "I run a furniture showroom. My budget is RM4,000/month and I prefer the first floor. I am aiming for October 2026." }, { role: "assistant", content: "The published first-floor indicative rent is RM3,600/month. Current availability and proposed use need confirmation." }], question: "Help me draft an email enquiry using those requirements.", check: r => r.enquiry.requested && /furniture showroom/i.test(r.enquiry.businessType) && /4,?000/.test(r.enquiry.budget) && /first floor/i.test(r.enquiry.floor) && /October 2026/.test(r.enquiry.timing) && !/I (?:have )?(?:sent|booked|reserved)/i.test(r.answer) },
  { locale: "en", pathname: "/leasing/semi-detached/", question: "Can I rent this property now? Show me its brochure and confirm a viewing tomorrow.", check: r => /leased/i.test(r.answer) && !r.propertyIds.some(id => /69|semi/i.test(id)) && !/viewing (?:is |has been )?confirmed|I (?:have )?booked/i.test(r.answer) && !r.enquiry.requested },
  { locale: "ms", question: "Dari manakah pelan lantai kedai dan bangunan No. 7 diperoleh, dan adakah ukuran serta keadaannya telah disahkan?", check: r => /3 September 2026/i.test(r.answer) && /rujukan/i.test(r.answer) && /sah|semak|periksa/i.test(r.answer) }
];
try {
  for (const sample of samples) {
    if (checks.length) await new Promise(resolve => setTimeout(resolve, 20000));
    const response = await answerQuestion({ locale: sample.locale, replyPreference: sample.replyPreference || "auto", pathname: sample.pathname || "/", messages: [...(sample.prior || []), { role: "user", content: sample.question }] });
    checks.push({ locale: sample.locale, question: sample.question, ...response, passed: sample.check(response) });
  }
} catch (error) {
  checks.push({ passed: false, error: error.code || "unavailable", providerStatus: error.providerStatus || null, retryAfter: error.retryAfter || null });
}
const report = { kind: "Ask TPK Park upgrade: public facts, page awareness, multilingual answers, property cards, explicit email drafts and leased-property boundaries; no visitor data", checkedAt: new Date().toISOString(), passed: checks.length === samples.length && checks.every(check => check.passed), checks };
await mkdir("assets", { recursive: true });
await writeFile("assets/assistant-preview-check.json", JSON.stringify(report, null, 2));
console.log("TPK AI preview check:", JSON.stringify(report));
