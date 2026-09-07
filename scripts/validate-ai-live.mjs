import { mkdir, writeFile } from "node:fs/promises";
import { answerQuestion } from "../lib/assistant.mjs";

// Four fixed public questions, only on this review branch. Never runs paid calls
// in local tests or production builds and never reads visitor conversations.
if (process.env.VERCEL_ENV !== "preview" || process.env.VERCEL_GIT_COMMIT_REF !== "codex/ai-assistant") process.exit(0);
const checks = [];
const samples = [
  { locale: "en", question: "What are the published shop rents by floor?", check: result => /8,?300/.test(result.answer) && /3,?600/.test(result.answer) && result.sources.some(s => ["leasingShop", "leasing"].includes(s.id)) },
  { locale: "ms", question: "Perniagaan manakah di TPK Park yang menawarkan jualan dan servis Perodua?", check: result => /Perodua/i.test(result.answer) && result.sources.some(s => s.id === "automotive") },
  { locale: "zh", question: "69号现在还在出租吗？租金多少？", check: result => /已.{0,3}(租|出租)/.test(result.answer) && !/23,?500/.test(result.answer) && result.sources.some(s => s.id === "leasingSemiDetached") }
];
try {
  for (const sample of samples) {
    if (checks.length) await new Promise(resolve => setTimeout(resolve, 20000));
    const response = await answerQuestion({ locale: sample.locale, messages: [{ role: "user", content: sample.question }] });
    checks.push({ locale: sample.locale, question: sample.question, ...response, passed: sample.check(response) });
  }
  const question = "Would the first floor fit my RM4,000 monthly budget? Can you confirm a viewing tomorrow?";
  await new Promise(resolve => setTimeout(resolve, 20000));
  const response = await answerQuestion({ locale: "en", messages: [
    { role: "user", content: samples[0].question },
    { role: "assistant", content: checks[0].answer },
    { role: "user", content: question }
  ] });
  checks.push({ locale: "en", question, ...response, passed: /3,?600/.test(response.answer) && response.sources.some(s => s.id === "contact") });
} catch (error) {
  checks.push({ passed: false, error: error.code || "unavailable", providerStatus: error.providerStatus || null, retryAfter: error.retryAfter || null });
}
const report = { kind: "Fixed public preview questions; no visitor data", checkedAt: new Date().toISOString(), passed: checks.length === 4 && checks.every(check => check.passed), checks };
await mkdir("assets", { recursive: true });
await writeFile("assets/assistant-preview-check.json", JSON.stringify(report, null, 2));
console.log("TPK AI preview check:", JSON.stringify(report));
