import { mkdir, writeFile } from "node:fs/promises";
import { answerQuestion } from "../lib/assistant.mjs";

// Four fixed public questions, only on this review branch. Never runs paid calls
// in local tests or production builds and never reads visitor conversations.
if (process.env.VERCEL_ENV !== "preview" || process.env.VERCEL_GIT_COMMIT_REF !== "codex/ai-assistant") process.exit(0);
const checks = [];
const samples = [
  { locale: "en", question: "tell me about wong shung yen", check: result => /Wong Shung Yen/i.test(result.answer) && /Managing Director/i.test(result.answer) && /TPK Park/i.test(result.answer) && result.sources.some(s => s.id === "profile") && !/no information|no details|not (?:have|available)/i.test(result.answer) },
  { locale: "ms", question: "Siapakah Wong Shung Yen dan apakah peranannya di TPK Park?", check: result => /Wong Shung Yen/i.test(result.answer) && /Pengarah Urusan/i.test(result.answer) && result.sources.some(s => s.id === "profile") },
  { locale: "zh", question: "介绍一下黄松延，他与TPK Park有什么关系？", check: result => /黄松延/.test(result.answer) && /TPK Park/i.test(result.answer) && /董事|总经理/.test(result.answer) && result.sources.some(s => s.id === "profile") }
];
try {
  for (const sample of samples) {
    if (checks.length) await new Promise(resolve => setTimeout(resolve, 20000));
    const response = await answerQuestion({ locale: sample.locale, messages: [{ role: "user", content: sample.question }] });
    checks.push({ locale: sample.locale, question: sample.question, ...response, passed: sample.check(response) });
  }
  const question = "What are the public sources for his film and jade exhibition work?";
  await new Promise(resolve => setTimeout(resolve, 20000));
  const response = await answerQuestion({ locale: "en", messages: [
    { role: "user", content: samples[0].question },
    { role: "assistant", content: checks[0].answer },
    { role: "user", content: question }
  ] });
  checks.push({ locale: "en", question, ...response, passed: /Variety/i.test(response.answer) && /National Art Gallery|The Star/i.test(response.answer) && /2014/.test(response.answer) && /2024/.test(response.answer) && response.sources.some(s => s.id === "publicRecord") });
} catch (error) {
  checks.push({ passed: false, error: error.code || "unavailable", providerStatus: error.providerStatus || null, retryAfter: error.retryAfter || null });
}
const report = { kind: "Public profile regression questions; no visitor data", checkedAt: new Date().toISOString(), passed: checks.length === 4 && checks.every(check => check.passed), checks };
await mkdir("assets", { recursive: true });
await writeFile("assets/assistant-preview-check.json", JSON.stringify(report, null, 2));
console.log("TPK AI preview check:", JSON.stringify(report));
