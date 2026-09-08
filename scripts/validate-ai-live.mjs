import { mkdir, writeFile } from "node:fs/promises";
import { answerQuestion } from "../lib/assistant.mjs";

// Four fixed public questions, only on this review branch. Never runs paid calls
// in local tests or production builds and never reads visitor conversations.
if (process.env.VERCEL_ENV !== "preview" || process.env.VERCEL_GIT_COMMIT_REF !== "codex/ai-assistant") process.exit(0);
const checks = [];
const samples = [
  { locale: "en", question: "tell me about wong shung yen", check: result => /Wong Shung Yen/i.test(result.answer) && /Managing Director/i.test(result.answer) && /TPK Park/i.test(result.answer) && result.sources.some(s => s.id === "profile") && !/no information|no details|not (?:have|available)/i.test(result.answer) },
  { locale: "en", question: "How do ground-floor and first-floor shops differ, and what would renting both floors cost?", check: result => /8,?300/.test(result.answer) && /3,?600/.test(result.answer) && /office|appointment/i.test(result.answer) && /separate quot|quoted separately|quotation.*team|team.*quot/i.test(result.answer) && result.sources.some(s => s.id === "leasingShop") },
  { locale: "ms", question: "Dari manakah pelan lantai kedai dan bangunan No. 7 diperoleh, dan adakah ukuran serta keadaannya telah disahkan?", check: result => /3 September 2026/i.test(result.answer) && /rujukan/i.test(result.answer) && /sah|semak|periksa/i.test(result.answer) && result.sources.some(s => ["leasingShop", "leasingDetached"].includes(s.id)) },
  { locale: "zh", question: "我填好网站查询表格并点击提交后，查询就发出去了吗？预约看单位前要准备哪些资料？", check: result => /草稿/.test(result.answer) && /发送|寄出/.test(result.answer) && /预算/.test(result.answer) && /日期|时间/.test(result.answer) && result.sources.some(s => s.id === "contact") }
];
try {
  for (const sample of samples) {
    if (checks.length) await new Promise(resolve => setTimeout(resolve, 20000));
    const response = await answerQuestion({ locale: sample.locale, messages: [{ role: "user", content: sample.question }] });
    checks.push({ locale: sample.locale, question: sample.question, ...response, passed: sample.check(response) });
  }
} catch (error) {
  checks.push({ passed: false, error: error.code || "unavailable", providerStatus: error.providerStatus || null, retryAfter: error.retryAfter || null });
}
const report = { kind: "Public profile, leasing guidance, floor-plan notes and enquiry instructions; no visitor data", checkedAt: new Date().toISOString(), passed: checks.length === samples.length && checks.every(check => check.passed), checks };
await mkdir("assets", { recursive: true });
await writeFile("assets/assistant-preview-check.json", JSON.stringify(report, null, 2));
console.log("TPK AI preview check:", JSON.stringify(report));
