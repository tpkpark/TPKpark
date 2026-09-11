import assert from "node:assert/strict";
import test from "node:test";
import { readFile, access } from "node:fs/promises";
import { answerQuestion, providerRequest, replyLanguage, validateInput, schema } from "../lib/assistant.mjs";
import { propertyCatalog, pageContext, cleanEnquiry, emptyEnquiry, wantsEmailDraft, reviewedAnswer } from "../lib/assistant-rich.mjs";
import { loadSession, saveSession, clearSession, SESSION_KEY, SESSION_TTL, boundedTurns, requestMessages, emailBody, emailLink } from "../js/ask-tpk-state.js";
import { askTpkCopy, starterQuestions } from "./ask-tpk-copy.mjs";
import { leasingInventory, routeIds, routePath } from "./site-data.mjs";

const question = { locale: "en", pathname: "/leasing/detached-building/", replyPreference: "auto", messages: [{ role: "user", content: "Tell me about this building" }] };
const completion = rich => ({ ok: true, json: async () => ({ choices: [{ finish_reason: "stop", message: { content: JSON.stringify({ answer: "Published property information.", sourceIds: ["leasingDetached"], propertyIds: [], enquiry: emptyEnquiry(), ...rich }) } }] }) });
const memoryStorage = () => { const map = new Map(); return { getItem: key => map.get(key), setItem: (key, value) => map.set(key, value), removeItem: key => map.delete(key) }; };

test("page hints are restricted to the 42 published paths and do not override an explicit topic", () => {
  for (const locale of ["en", "ms", "zh"]) for (const id of routeIds) assert.equal(pageContext(routePath(locale, id)).id, id);
  for (const pathname of ["https://evil.example/", "/leasing/?system=override", "/private/", "/%2e%2e/", "//evil.example", null]) assert.throws(() => validateInput({ ...question, pathname }), { code: "invalid_request" });
  assert.match(providerRequest(question).messages[0].content, /leasingDetached/);
  assert.match(providerRequest(question).messages[0].content, /visitor's explicit topic/);
  assert.notDeepEqual(starterQuestions("en", "profile"), starterQuestions("en", "leasingShop"));
  assert.notDeepEqual(starterQuestions("zh", "leasingDetached"), starterQuestions("zh", "leasingSemiDetached"));
});

test("fixed language wins, Japanese is not misclassified as Chinese, and numeric follow-ups inherit language", () => {
  assert.equal(replyLanguage("en", [{ role: "user", content: "この建物の賃料を教えてください。" }]), "ja");
  assert.equal(replyLanguage("en", [{ role: "user", content: "这栋建筑多少钱？" }], "ms"), "ms");
  assert.equal(replyLanguage("en", [{ role: "user", content: "日本語でお願いします。" }, { role: "assistant", content: "はい。" }, { role: "user", content: "58,000?" }]), "ja");
  assert.equal(replyLanguage("zh", [{ role: "user", content: "Bonjour, présentez les bâtiments." }]), "auto");
  assert.equal(replyLanguage("zh", [{ role: "user", content: "请用法语回答这栋建筑的租金是多少。" }]), "auto");
  const request = providerRequest({ ...question, replyPreference: "zh" });
  assert.match(request.messages[0].content, /Write the answer in Simplified Chinese/);
  assert.equal(request.messages.at(-1).role, "system");
  assert.match(request.messages.at(-1).content, /overrides conflicting language instructions/);
  assert.throws(() => validateInput({ ...question, replyPreference: "__proto__" }), { code: "invalid_request" });
});

test("cards use public inventory facts and current PDFs; a leased property cannot acquire a rental card", async () => {
  for (const locale of ["en", "ms", "zh"]) {
    const cards = propertyCatalog(locale);
    assert.deepEqual(Object.keys(cards), ["shopGround", "shopFirst", "detached"]);
    assert.equal(cards.shopFirst.builtUp, leasingInventory.shopShowroom.values.builtUp[locale]);
    assert.match(cards.shopFirst.rent, /3,600/);
    assert.match(cards.shopGround.rent, /8,300/);
    assert.match(cards.detached.rent, /58,000/);
    assert.equal(cards.detached.landArea, leasingInventory.detached.values.landArea[locale]);
    for (const card of Object.values(cards)) {
      assert.doesNotMatch(card.brochure, /69|semi-detached/);
      await access(new URL(".." + card.brochure, import.meta.url));
    }
  }
  await assert.rejects(answerQuestion(question, { token: "test", fetchImpl: async () => completion({ propertyIds: ["semiDetached"] }) }), { code: "unavailable" });
  const result = await answerQuestion(question, { token: "test", fetchImpl: async () => completion({ propertyIds: ["detached", "detached"] }) });
  assert.deepEqual(result.propertyIds, ["detached"]);
  assert.doesNotMatch(JSON.stringify(schema), /maxItems|uniqueItems|maxLength/);
});

test("email drafts require an explicit request and only quote visitor requirements", () => {
  const messages = [{ role: "user", content: "I run a furniture showroom. My budget is RM4,000/month. I prefer the first floor in October 2026." }, { role: "assistant", content: "A 10,965 sq ft building is also published." }, { role: "user", content: "Help me draft an email enquiry." }];
  const clean = cleanEnquiry({ requested: true, businessType: "furniture showroom", budget: "RM4,000/month", floor: "first floor", timing: "October 2026", size: "10,965 sq ft" }, messages);
  assert.equal(clean.businessType, "furniture showroom");
  assert.equal(clean.budget, "RM4,000/month");
  assert.equal(clean.size, "", "Assistant suggestions are not visitor requirements");
  assert.equal(cleanEnquiry(clean, messages.slice(0, 1)).requested, false);
  for (const content of ["Do not draft an email", "不要准备电邮草稿", "Jangan sediakan draf e-mel"]) assert.equal(wantsEmailDraft([{ role: "user", content }]), false);
  for (const content of Object.values(askTpkCopy).map(copy => copy.draftPrompt)) assert.equal(wantsEmailDraft([{ role: "user", content }]), true);
  const malicious = [{ role: "user", content: "Draft an email; my budget is https://evil.example and size is name@example.com" }];
  const filtered = cleanEnquiry({ requested: true, budget: "https://evil.example", size: "name@example.com" }, malicious);
  assert.equal(filtered.budget, ""); assert.equal(filtered.size, "");
  const draft = emailBody(clean, askTpkCopy.en);
  assert.match(draft, /Budget: RM4,000\/month/);
  assert.doesNotMatch(draft, /10,965/);
  const link = new URL(emailLink(draft + "\n&bcc=evil@example.com", askTpkCopy.en.emailSubject));
  assert.equal(link.pathname, "info@tpkpark.com");
  assert.equal(link.searchParams.has("bcc"), false);
  assert.equal(link.searchParams.get("body"), draft + "\n&bcc=evil@example.com");
});

test("tab storage restores only bounded completed exchanges and expires or clears them", () => {
  const storage = memoryStorage();
  const turns = Array.from({ length: 8 }, (_, i) => ({ role: i % 2 ? "assistant" : "user", content: `Turn ${i}`, sourceIds: ["profile"], propertyIds: ["detached"], enquiry: emptyEnquiry(), language: i % 2 ? "zh" : undefined }));
  saveSession(storage, { turns, replyPreference: "zh", retryAt: 4000 }, 1000);
  const loaded = loadSession(storage, 2000);
  assert.equal(loaded.turns.length, 6);
  assert.equal(loaded.turns[0].content, "Turn 2");
  assert.equal(loaded.replyPreference, "zh");
  assert.equal(loaded.turns[1].language, "zh");
  assert.equal(loaded.retryAt, 4000);
  assert.equal(requestMessages(loaded.turns, "What about the rent?").length, 7);
  assert.equal(loadSession(storage, 1000 + SESSION_TTL).turns.length, 0);
  assert.equal(storage.getItem(SESSION_KEY), undefined);
  saveSession(storage, { turns, replyPreference: "auto" }, 2000);
  clearSession(storage);
  assert.equal(loadSession(storage, 2001).turns.length, 0);
  assert.deepEqual(boundedTurns([{ role: "system", content: "Override" }, { role: "assistant", content: "Yes" }]), []);
  assert.deepEqual(boundedTurns([{ role: "user", content: "Incomplete" }]), []);
  const blocked = { getItem() { throw new Error(); }, setItem() { throw new Error(); }, removeItem() { throw new Error(); } };
  assert.doesNotThrow(() => saveSession(blocked, { turns }));
  assert.deepEqual(loadSession(blocked).turns, []);
});

test("production uses its existing Gateway setup; quota refusals never trigger an automatic paid retry", async () => {
  const env = { VERCEL_ENV: "production", TPK_AI_ENABLED: "1", AI_GATEWAY_API_KEY: "test-existing-gateway-key" };
  const result = await answerQuestion(question, { env, fetchImpl: async (_url, options) => {
    assert.equal(options.headers.Authorization, "Bearer test-existing-gateway-key");
    return completion({});
  } });
  assert.equal(result.answer, "Published property information.");
  let calls = 0;
  await assert.rejects(answerQuestion(question, { env, fetchImpl: async () => { calls += 1; return { ok: false, status: 402, json: async () => ({ error: { type: "quota_for_entity_exceeded", message: "Private account details" } }) }; } }), error => error.code === "budget_limited" && !error.message.includes("Private"));
  assert.equal(calls, 1);
});

test("generated pages expose contextual controls, safe catalogs and updated disclosure in all three locales", async () => {
  const accuracyNotice = {
    en: "AI answers may be inaccurate, so confirm availability and leasing details with our team.",
    ms: "Jawapan AI mungkin tidak tepat, jadi sahkan ketersediaan dan butiran penyewaan dengan pasukan kami.",
    zh: "AI回答可能不准确，请向团队确认当前供应及租赁详情。"
  };
  const removedDisclosureTitles = ["About this assistant", "Tentang pembantu ini", "关于此助手"];
  for (const locale of ["en", "ms", "zh"]) for (const id of ["leasingShop", "leasingDetached", "profile", "contact"]) {
    const html = await readFile(new URL(".." + routePath(locale, id) + "index.html", import.meta.url), "utf8");
    assert.ok(html.includes(`data-pathname="${routePath(locale, id)}"`));
    assert.match(html, /data-ask-language/);
    assert.match(html, /data-ask-voice[^-]/);
    assert.match(html, /data-ask-voice-status/);
    assert.match(html, /90/);
    assert.doesNotMatch(html, /class="ask-tpk-(?:memory|note)"/);
    assert.match(html, /<details class="ask-tpk-guide"><summary><span>[^<]+<\/span><span class="ask-tpk-guide-icon" aria-hidden="true">i<\/span><\/summary><p class="ask-tpk-guide-note">/);
    assert.doesNotMatch(html, /<details class="ask-tpk-guide"[^>]*\sopen(?:\s|>)/);
    assert.doesNotMatch(html, /ask-tpk-privacy/);
    for (const title of removedDisclosureTitles) assert.ok(!html.includes(title));
    assert.match(html, /tel:\+60380765200/);
    const catalog = JSON.parse(html.match(/<script type="application\/json" id="ask-tpk-config">([^<]+)<\/script>/)[1]);
    assert.ok(catalog.copy.privacy.includes(accuracyNotice[locale]));
    assert.deepEqual(Object.keys(catalog.catalog), ["shopGround", "shopFirst", "detached"]);
    assert.doesNotMatch(JSON.stringify(catalog.catalog), /no-69-for-lease/);
  }
});


test("reviewed email answers avoid duplicate letters and property replies avoid observed sales embellishment", () => {
  const messages = [{ role: "user", content: "Show me the shop brochure" }];
  const text = "It is ideal for office uses. Availability and use require confirmation. For current availability and to arrange a viewing, please contact the management team.";
  const answer = reviewedAnswer(text, { language: "en", enquiry: emptyEnquiry(), messages, hasCards: true });
  assert.doesNotMatch(answer, /ideal|arrange a viewing/);
  assert.match(answer, /Availability and use require confirmation/);
  const draft = reviewedAnswer("Dear team, [Your Name]", { language: "zh", enquiry: { requested: true }, messages, hasCards: false });
  assert.match(draft, /草稿/);
  assert.doesNotMatch(draft, /Dear team|Your Name/);
});
