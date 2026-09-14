import assert from "node:assert/strict";
import test from "node:test";
import { createSpeechHandler, generateSpeech, SPEECH_TEXT_LIMIT, takeSpeechSlot, validateSpeechInput } from "../api/speak.js";

const enabledEnv = { VERCEL: "1", VERCEL_ENV: "production", TPK_AI_ENABLED: "1", AI_GATEWAY_API_KEY: "test-gateway-key" };

function request(body, overrides = {}) {
  const raw = typeof body === "string" ? body : JSON.stringify(body);
  return {
    method: "POST",
    headers: {
      origin: "https://www.tpkpark.com",
      "sec-fetch-site": "same-origin",
      "content-type": "application/json",
      "content-length": String(Buffer.byteLength(raw)),
      ...overrides.headers
    },
    body: raw,
    socket: { remoteAddress: "203.0.113.8" },
    ...overrides
  };
}

function response() {
  const headers = {};
  return { headers, statusCode: 0, body: null, setHeader(name, value) { headers[name] = String(value); }, end(value) { this.body = value; } };
}

test("speech input accepts Standard Mandarin and rejects malformed or unbounded requests", () => {
  assert.deepEqual(validateSpeechInput({ text: "  金銮工业园的办公时间。  ", locale: "zh-CN" }), { text: "金銮工业园的办公时间。", locale: "zh-CN" });
  for (const body of [
    { text: "", locale: "zh-CN" },
    { text: "x".repeat(SPEECH_TEXT_LIMIT + 1), locale: "zh-CN" },
    { text: "你好", locale: "zh-HK" },
    { text: "hello\u0000", locale: "en-MY" }
  ]) assert.throws(() => validateSpeechInput(body), error => error.code === "invalid_request" && error.status === 400);
});

test("speech generation uses the existing Vercel AI Gateway with an explicit Mandarin locale", async () => {
  const calls = [];
  const expected = Buffer.from([73, 68, 51, 4]);
  const audio = await generateSpeech({ text: "金銮工业园的办公时间。", locale: "zh-CN" }, {
    token: "test-token",
    fetchImpl: async (url, options) => {
      calls.push({ url, options });
      return { ok: true, status: 200, json: async () => ({ audio: expected.toString("base64"), warnings: [] }) };
    }
  });
  assert.deepEqual(audio, expected);
  assert.equal(calls[0].url, "https://ai-gateway.vercel.sh/v4/ai/speech-model");
  assert.equal(calls[0].options.headers.Authorization, "Bearer test-token");
  assert.equal(calls[0].options.headers["ai-model-id"], "openai/tts-1");
  assert.deepEqual(JSON.parse(calls[0].options.body), { text: "金銮工业园的办公时间。", voice: "nova", outputFormat: "mp3", language: "zh-CN", speed: 1 });
});

test("speech endpoint is same-origin, uncached and returns bounded MP3 bytes", async () => {
  let spoken;
  const handler = createSpeechHandler({ env: enabledEnv, speak: async body => { spoken = body; return Buffer.from([9, 8, 7]); } });
  const res = response();
  await handler(request({ text: "金銮工业园的办公时间。", locale: "zh-CN" }), res);
  assert.equal(res.statusCode, 200);
  assert.equal(res.headers["Content-Type"], "audio/mpeg");
  assert.equal(res.headers["Cache-Control"], "private, no-store");
  assert.equal(res.headers["Cross-Origin-Resource-Policy"], "same-origin");
  assert.deepEqual([...res.body], [9, 8, 7]);
  assert.deepEqual(spoken, { text: "金銮工业园的办公时间。", locale: "zh-CN" });
});

test("speech endpoint blocks cross-site calls and caps bursts", async () => {
  let calls = 0;
  const handler = createSpeechHandler({ env: enabledEnv, speak: async () => { calls += 1; return Buffer.from([1]); } });
  const res = response();
  await handler(request({ text: "你好", locale: "zh-CN" }, { headers: { origin: "https://evil.example", "sec-fetch-site": "cross-site" } }), res);
  assert.equal(res.statusCode, 403);
  assert.equal(calls, 0);
  const releases = [takeSpeechSlot("one"), takeSpeechSlot("two")];
  assert.equal(takeSpeechSlot("three"), null);
  releases.forEach(release => release());
});

test("Gateway budget refusals stop without a paid retry", async () => {
  let calls = 0;
  await assert.rejects(generateSpeech({ text: "你好", locale: "zh-CN" }, {
    token: "test-token",
    fetchImpl: async () => { calls += 1; return { ok: false, status: 402, headers: { get: () => null } }; }
  }), error => error.code === "budget_limited" && error.status === 503);
  assert.equal(calls, 1);
});
