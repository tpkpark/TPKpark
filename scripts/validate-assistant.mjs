import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import vm from "node:vm";
import * as stateHelpers from "../js/ask-tpk-state.js";
import { propertyCatalog, emptyEnquiry } from "../lib/assistant-rich.mjs";
import { askTpkCopy } from "./ask-tpk-copy.mjs";
import { answerQuestion, assistantEnabled, validateInput, systemPrompt, replyLanguage } from "../lib/assistant.mjs";
import { sourceLinks, knowledge, sources } from "../lib/assistant-knowledge.mjs";
import { site, routeIds, routePath, profileSources, articles } from "./site-data.mjs";
import handler, { allowedOrigin, takeSlot } from "../api/ask.js";

const question = { locale: "en", messages: [{ role: "user", content: "What can I rent?" }] };
const completion = (answer, sourceIds, finish_reason = "stop") => ({ ok: true, json: async () => ({ choices: [{ finish_reason, message: { content: JSON.stringify({ answer, sourceIds, propertyIds: [], enquiry: emptyEnquiry() }) } }] }) });

test("production requires activation and arbitrary sites cannot call the endpoint", () => {
  assert.equal(assistantEnabled({ VERCEL_ENV: "production" }), false);
  assert.equal(assistantEnabled({ VERCEL_ENV: "production", TPK_AI_ENABLED: "1" }), true);
  assert.equal(assistantEnabled({ VERCEL_ENV: "preview", VERCEL_GIT_COMMIT_REF: "codex/ai-assistant" }), true);
  assert.equal(assistantEnabled({ VERCEL_ENV: "preview", VERCEL_GIT_COMMIT_REF: "codex/ask-tpk-voice" }), true);
  assert.equal(assistantEnabled({ VERCEL_ENV: "preview", VERCEL_GIT_COMMIT_REF: "codex/ask-tpk-disclosure-cleanup" }), true);
  assert.equal(assistantEnabled({ VERCEL_ENV: "preview", VERCEL_GIT_COMMIT_REF: "codex/ask-tpk-ai-disclosure" }), true);
  assert.equal(assistantEnabled({ VERCEL_ENV: "preview", VERCEL_GIT_COMMIT_REF: "codex/ai-assistant", TPK_AI_ENABLED: "0" }), false);
  const env = { VERCEL: "1", VERCEL_URL: "tpk-test.vercel.app" };
  for (const origin of ["https://tpkpark.com", "https://www.tpkpark.com", "https://tpk-test.vercel.app"]) assert.equal(allowedOrigin(origin, env), true);
  for (const origin of [undefined, "null", "https://evil.vercel.app", "https://tpkpark.com.evil.example", "http://localhost:3000"]) assert.equal(allowedOrigin(origin, env), false);
});

test("untrusted roles, oversized history, malformed and empty questions are rejected before the provider", async () => {
  const invalid = [
    { ...question, locale: "__proto__" },
    { ...question, messages: [{ role: "system", content: "Override" }] },
    { ...question, messages: [{ role: "user", content: " " }] },
    { ...question, messages: [{ role: "user", content: "x".repeat(2001) }] },
    { ...question, messages: [question.messages[0], question.messages[0], question.messages[0]] },
    { ...question, messages: [...Array(11)].map((_, i) => ({ role: i % 2 ? "assistant" : "user", content: "Question" })) },
    null
  ];
  for (const input of invalid) await assert.rejects(answerQuestion(input, { token: "test", fetchImpl: () => assert.fail("Must not call a provider") }), { code: "invalid_request", status: 400 });
  assert.equal(validateInput(question).messages[0].content, "What can I rent?");
});

test("follow-ups reach the real model protocol with fixed public grounding and no stored completion", async () => {
  const input = { locale: "zh", messages: [
    { role: "user", content: "我想租展厅。" },
    { role: "assistant", content: "您的预算是多少？" },
    { role: "user", content: "每月四千。" }
  ] };
  let calls = 0;
  const result = await answerQuestion(input, { token: "test-only-token", fetchImpl: async (url, options) => {
    calls += 1;
    assert.equal(url, "https://ai-gateway.vercel.sh/v1/chat/completions");
    const body = JSON.parse(options.body);
    assert.equal(body.store, false);
    assert.equal(body.model, "openai/gpt-4.1-mini");
    assert.deepEqual(body.messages.slice(1), input.messages);
    assert.match(body.messages[0].content, /No\. 69.*leased/);
    assert.equal(body.response_format.json_schema.strict, true);
    return completion("一楼参考租金为每月RM3,600，请向团队确认。", ["leasingShop", "contact"]);
  } });
  assert.equal(calls, 1);
  assert.equal(result.language, "zh");
  assert.equal(result.sources[0].url, "/zh/leasing/shop-showroom/");
});

test("fabricated sources, incomplete output and provider failures never become successful answers", async () => {
  for (const response of [completion("Read this", ["https://evil.example"]), completion("Read this", ["__proto__"]), completion("Partial", ["home"], "length"), { ok: false, status: 402 }]) {
    await assert.rejects(answerQuestion(question, { token: "test", fetchImpl: async () => response }), { code: "unavailable" });
  }
  await assert.rejects(answerQuestion(question, { token: "test", fetchImpl: async () => { throw new Error("secret credential in error"); } }), error => error.code === "unavailable" && !error.message.includes("secret"));
  assert.deepEqual(sourceLinks(["__proto__", "contact", "contact"], "ms").map(s => s.url), ["/ms/contact/"]);
});

test("short-lived abuse limits cap bursts and release concurrency safely", () => {
  const releases = [takeSlot("a"), takeSlot("b"), takeSlot("c")];
  assert.equal(takeSlot("d"), null);
  releases.forEach(release => { release(); release(); });
  for (let i = 0; i < 100; i += 1) { const release = takeSlot("visitor-limit", 1000); assert.equal(typeof release, "function"); release(); }
  assert.equal(takeSlot("visitor-limit", 1000), null);
  const release = takeSlot("visitor-limit", 601001); assert.equal(typeof release, "function"); release();
});

test("HTTP interface rejects cross-site calls and never caches chat output", async () => {
  const headers = {};
  let body;
  const res = { setHeader(name, value) { headers[name] = value; }, end(value) { body = JSON.parse(value); } };
  await handler({ method: "POST", headers: { origin: "https://evil.example" } }, res);
  assert.equal(res.statusCode, 403);
  assert.equal(headers["Cache-Control"], "no-store");
  assert.equal(body.error, "invalid_origin");
});

test("approved knowledge retains public inventory boundaries", () => {
  assert.match(knowledge, /RM8,300/);
  assert.match(knowledge, /RM3,600/);
  assert.match(knowledge, /RM58,000/);
  assert.match(knowledge, /No\. 69.*leased/);
  assert.doesNotMatch(knowledge, /23,?500|formsubmit\.co/);
  assert.match(systemPrompt("ms"), /cannot send messages or save enquiries/i);
});

test("the assistant can read the published profile and shared public-record blocks", () => {
  assert.deepEqual(Object.keys(sources), routeIds, "Every published route must be available for answers");
  const profile = site.en.pages.profile.blocks.find(block => block.type === "profile");
  assert.ok(sources.profile.text.includes(profile.introduction));
  assert.match(sources.profile.text, /Managing Director of TPK Park Sdn\. Bhd\./);
  assert.match(sources.profile.text, /Currently pursuing a Master/);
  assert.match(sources.profile.text, /Associate Producer.*Men Who Save the World/);
  for (const record of profileSources) assert.ok(sources.publicRecord.text.includes(record.summary.en), `Missing published ${record.source} summary`);
  for (const article of articles) assert.ok(sources.news.text.includes(article.summary.en), `Missing published ${article.source} news summary`);
  for (const locale of ["en", "ms", "zh"]) {
    assert.deepEqual(sourceLinks(["profile", "publicRecord", "news"], locale).map(source => source.url), ["profile", "publicRecord", "news"].map(id => routePath(locale, id)));
    assert.ok(systemPrompt(locale).includes(site[locale].pages.profile.blocks.find(block => block.type === "profile").introduction));
  }
  assert.match(systemPrompt("zh"), /深静（哈古乐）华小/);
  assert.match(systemPrompt("zh"), /协同制片人/);
  assert.doesNotMatch(systemPrompt("zh"), /新成学校|拯救世界的男人/);
});

test("a profile question reaches the model with biography facts and valid profile citations", async () => {
  const result = await answerQuestion({ locale: "en", messages: [{ role: "user", content: "tell me about wong shung yen" }] }, { token: "test", fetchImpl: async (_, options) => {
    const body = JSON.parse(options.body);
    assert.match(body.messages[0].content, /Wong Shung Yen is Managing Director of TPK Park Sdn\. Bhd\./);
    assert.match(body.messages[0].content, /Variety.*associate producer/);
    assert.ok(body.response_format.json_schema.schema.properties.sourceIds.items.enum.includes("profile"));
    assert.ok(body.response_format.json_schema.schema.properties.sourceIds.items.enum.includes("publicRecord"));
    return completion("Wong Shung Yen is Managing Director of TPK Park Sdn. Bhd.", ["profile", "publicRecord"]);
  } });
  assert.equal(result.sources[0].url, "/wong-shung-yen/");
  assert.equal(result.sources[1].url, "/wong-shung-yen/public-record/");
});

test("Chinese questions and numeric follow-ups retain language even on English pages", async () => {
  const messages = [{ role: "user", content: "我想租展厅。" }, { role: "assistant", content: "您的预算是多少？" }, { role: "user", content: "RM4000" }];
  assert.equal(replyLanguage("en", messages), "zh");
  assert.equal(replyLanguage("zh", [{ role: "user", content: "What is the rent?" }]), "en");
  assert.equal(replyLanguage("en", [{ role: "user", content: "Berapakah sewa tingkat satu?" }]), "ms");
  await assert.rejects(answerQuestion({ locale: "en", messages }, { token: "test", fetchImpl: async () => completion("An English answer", ["leasingShop"]) }), { code: "unavailable" });
});

const clientSource = await readFile(new URL("../js/ask-tpk.js", import.meta.url), "utf8");
function chatClient(responses, storage = { getItem() {}, setItem() {}, removeItem() {} }, browser = {}) {
  let now = Date.now();
  const telemetry = [];
  class Element {
    constructor() { this.dataset = {}; this.children = []; this.events = {}; this.attributes = {}; this.value = ""; this.hidden = false; this.textContent = ""; }
    addEventListener(name, fn) {
      const previous = this.events[name];
      this.events[name] = previous ? event => { previous(event); return fn(event); } : fn;
    }
    setAttribute(name, value) { this.attributes[name] = String(value); }
    getAttribute(name) { return this.attributes[name] ?? "false"; }
    querySelector() { return null; }
    querySelectorAll() { return []; }
    append(...items) { items.forEach(item => { item.parent = this; this.children.push(item); }); }
    replaceChildren() { this.children = []; }
    remove() { if (this.parent) this.parent.children = this.parent.children.filter(item => item !== this); }
    get childElementCount() { return this.children.length; }
    get firstElementChild() { return this.children[0]; }
    set innerHTML(_) { assert.fail("Chat must never render HTML"); }
    focus() {}
    scrollIntoView() {}
  }
  const names = ["trigger", "panel", "close", "form", "input", "messages", "status", "starters", "clear", "send", "language", "draft", "voice", "voice-status"];
  const elements = Object.fromEntries(names.map(name => [name, new Element()]));
  elements.panel.hidden = true;
  elements.voice.hidden = true;
  const widget = new Element();
  widget.dataset = { aiEnabled: "true", locale: "en", pathname: "/", you: "You", assistant: "AI", error: "Try again", busy: "Busy", thinking: "Thinking", sources: "Sources" };
  widget.querySelector = selector => elements[selector.replace(/\[data-ask-|\]/g, "")];
  const config = { copy: askTpkCopy.en, catalog: propertyCatalog("en"), sources: Object.fromEntries(routeIds.map(id => [id, { id, title: id, url: routePath("en", id) }])) };
  const document = { querySelector: selector => selector === "[data-ask-tpk]" ? widget : selector === "#ask-tpk-config" ? { textContent: JSON.stringify(config) } : null, addEventListener() {}, createElement: () => new Element(), dispatchEvent(event) { telemetry.push({ type: event.type, ...event.detail }); } };
  const requests = [];
  vm.runInNewContext(clientSource.replace(/^import .*?;\n/, ""), {
    ...stateHelpers, window: { sessionStorage: storage, ...browser },
    document, location: { origin: "https://www.tpkpark.com" }, URL, TextEncoder, AbortController, setTimeout, clearTimeout, Date: class extends Date { static now() { return now; } },
    MutationObserver: class { observe() {} },
    CustomEvent: class { constructor(type, options) { this.type = type; this.detail = options.detail; } },
    fetch: async (url, options) => { requests.push({ url, body: JSON.parse(options.body) }); return responses.shift(); }
  });
  return { ...elements, voiceStatus: elements["voice-status"], telemetry, requests, advance: ms => { now += ms; }, submit: () => elements.form.events.submit({ preventDefault() {} }) };
}

test("chat renders plain text and approved links, preserves follow-ups, and clears local history", async () => {
  const response = { ok: true, json: async () => ({ answer: '<img src=x onerror="alert(1)"> Test answer', propertyIds: [], sources: [
    { title: "Contact", url: "/contact/" }, { title: "Detached", url: "/leasing/detached-building/" }, { title: "Unsafe", url: "https://evil.example" }
  ] }) };
  const page = chatClient([response, response, response]);
  page.input.value = "Tell me about premises";
  await page.submit();
  assert.equal(page.messages.children[1].children[1].textContent, '<img src=x onerror="alert(1)"> Test answer');
  assert.equal(page.messages.children[1].children[2].childElementCount, 2);
  assert.equal(page.input.value, "");
  page.input.value = "And the rent?";
  await page.submit();
  assert.equal(page.requests[1].body.messages.length, 3);
  assert.equal(page.requests[1].body.messages[0].content, "Tell me about premises");
  page.clear.events.click();
  page.input.value = "New question";
  await page.submit();
  assert.equal(page.requests[2].body.messages.length, 1);
  assert.equal(page.requests[2].url, "/api/ask");
  assert.deepEqual(page.telemetry.map(e => e.action), ["question", "answer", "question", "answer", "question", "answer"]);
  assert.doesNotMatch(JSON.stringify(page.telemetry), /Tell me|premises|Test answer|New question/);
});

test("profile, public-record and every other published route remain clickable in every language", async () => {
  for (const locale of ["en", "ms", "zh"]) {
    for (let i = 0; i < routeIds.length; i += 3) {
      const links = sourceLinks(routeIds.slice(i, i + 3), locale);
      const page = chatClient([{ ok: true, json: async () => ({ answer: "Published information", sources: links, propertyIds: [] }) }]);
      page.input.value = "Tell me about TPK Park";
      await page.submit();
      assert.deepEqual(page.messages.children[1].children[2].children.map(link => link.href), links.map(link => link.url));
    }
  }
});

test("failed questions stay editable and retry only once without polluting history", async () => {
  const page = chatClient([{ ok: false, status: 429 }, { ok: true, json: async () => ({ answer: "Please contact the team.", sources: [], propertyIds: [] }) }]);
  page.input.value = "Can I view tomorrow?";
  const first = page.submit();
  await page.submit();
  await first;
  assert.equal(page.requests.length, 1);
  assert.equal(page.input.value, "Can I view tomorrow?");
  assert.match(page.status.textContent, /Please try again after/);
  assert.equal(page.messages.childElementCount, 0);
  assert.equal(page.send.disabled, false);
  await page.submit();
  assert.equal(page.requests.length, 1, "Respect the cooldown before retrying");
  page.advance(61000);
  await page.submit();
  assert.equal(page.requests[1].body.messages.length, 1);
  assert.deepEqual(page.telemetry.map(e => e.action), ["question", "error", "question", "answer"]);
  assert.equal(page.telemetry[1].reason, "rate_limited");
});

test("provider retry intervals are preserved without retrying requests automatically", async () => {
  await assert.rejects(answerQuestion(question, { token: "test", fetchImpl: async () => ({ ok: false, status: 429, headers: { get: () => "90" } }) }), error => error.code === "busy" && error.retryAfter === 90);
});

test("moving to another page restores the conversation and language but New chat removes them", async () => {
  const map = new Map();
  const storage = { getItem: key => map.get(key), setItem: (key, value) => map.set(key, value), removeItem: key => map.delete(key) };
  const response = { ok: true, json: async () => ({ answer: "The published first-floor rent is RM3,600/month.", sources: [{ id: "leasingShop", title: "Shops", url: "/leasing/shop-showroom/" }], propertyIds: ["shopFirst"], enquiry: emptyEnquiry() }) };
  const first = chatClient([response], storage);
  first.language.value = "zh";
  first.language.events.change();
  first.input.value = "I want first-floor space.";
  await first.submit();
  const second = chatClient([response], storage);
  assert.equal(second.language.value, "zh");
  assert.equal(second.messages.childElementCount, 2);
  assert.equal(second.telemetry.length, 0, "Restoring a conversation must not recount answers");
  second.input.value = "What about the area?";
  await second.submit();
  assert.equal(second.requests[0].body.messages[0].content, "I want first-floor space.");
  assert.equal(second.requests[0].body.replyPreference, "zh");
  second.clear.events.click();
  const third = chatClient([], storage);
  assert.equal(third.messages.childElementCount, 0);
});

test("reviewed draft edits affect only a mailto draft and never produce a model request", async () => {
  const page = chatClient([{ ok: true, json: async () => ({ answer: "Review your draft below.", sources: [], propertyIds: [], enquiry: { requested: true, businessType: "furniture showroom", budget: "RM4,000/month", size: "", floor: "first floor", timing: "" } }) }]);
  page.input.value = "Help me draft an email enquiry.";
  await page.submit();
  const box = page.messages.children[1].children[2];
  const textarea = box.children[2].children[1];
  const link = box.children[3];
  assert.match(textarea.value, /furniture showroom/);
  textarea.value += "\nI would prefer October.";
  textarea.events.input();
  assert.match(decodeURIComponent(link.href), /I would prefer October/);
  assert.match(link.href, /^mailto:info@tpkpark.com\?/);
  assert.equal(page.requests.length, 1);
  assert.deepEqual(page.telemetry.map(e => e.action), ["question", "answer", "draft_ready"]);
  assert.doesNotMatch(JSON.stringify(page.telemetry), /furniture|4,000|October|info@/);
});

test("opening the assistant is measured only when the panel opens", () => {
  const page = chatClient([]);
  page.trigger.events.click();
  page.trigger.events.click();
  page.trigger.events.click();
  assert.deepEqual(page.telemetry.map(e => e.action), ["open", "open"]);
  assert.equal(page.requests.length, 0);
});

test("browser voice input stays reviewable and answer playback is optional", async () => {
  const recognitions = [];
  class Recognition {
    constructor() { recognitions.push(this); }
    start() { this.onstart?.(); }
    stop() { this.onend?.(); }
    abort() {}
  }
  const spoken = [];
  const speechSynthesis = {
    speak(utterance) { spoken.push(utterance); utterance.onstart?.(); },
    cancel() {}
  };
  class SpeechSynthesisUtterance { constructor(text) { this.text = text; } }
  const response = { ok: true, json: async () => ({ answer: "Sewa yang diterbitkan ialah RM3,600 sebulan.", sources: [], propertyIds: [], enquiry: emptyEnquiry(), language: "ms" }) };
  const page = chatClient([response], { getItem() {}, setItem() {}, removeItem() {} }, { SpeechRecognition: Recognition, speechSynthesis, SpeechSynthesisUtterance, navigator: { language: "en-MY" }, isSecureContext: true });
  assert.equal(page.voice.hidden, false);
  page.language.value = "ms";
  page.language.events.change();
  page.input.value = "Saya";
  page.voice.events.click();
  assert.equal(recognitions[0].lang, "ms-MY");
  assert.equal(page.voice.getAttribute("aria-pressed"), "true");
  recognitions[0].onresult({ results: [[{ transcript: "mahu sewa kedai" }]] });
  assert.equal(page.input.value, "Saya mahu sewa kedai");
  assert.equal(page.requests.length, 0, "Dictation must remain editable until the visitor sends it");
  assert.deepEqual(page.telemetry.map(event => event.action), ["voice_start", "voice_ready"]);
  await page.submit();
  assert.equal(page.requests[0].body.messages[0].content, "Saya mahu sewa kedai");
  const listen = page.messages.children[1].children[2];
  assert.equal(listen.textContent, "Listen");
  listen.events.click();
  assert.equal(spoken[0].text, "Sewa yang diterbitkan ialah RM3,600 sebulan.");
  assert.equal(spoken[0].lang, "ms-MY");
  assert.equal(listen.getAttribute("aria-pressed"), "true");
  assert.deepEqual(page.telemetry.map(event => event.action), ["voice_start", "voice_ready", "question", "answer", "listen_start"]);
  assert.doesNotMatch(JSON.stringify(page.telemetry), /mahu sewa|RM3,600/);
});

test("voice controls remain hidden when browser speech recognition is unavailable", () => {
  const page = chatClient([]);
  assert.equal(page.voice.hidden, true);
  assert.equal(page.voice.events.click, undefined);
});
