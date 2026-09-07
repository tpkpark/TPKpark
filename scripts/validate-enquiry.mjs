import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";
import { deliveryConfig } from "./enquiry-config.mjs";

const source = await readFile(new URL("../js/enquiry.js", import.meta.url), "utf8");

function client({ mode = "email", search = "?space=shop-showroom&floor=first&intent=viewing&source=agent", send = async () => ({ ok: true, json: async () => ({ success: "true" }) }) } = {}) {
  const fields = {};
  const sent = [];
  const events = [];
  for (const [name, value] of Object.entries({ name: "Test visitor", company: "Example Company", email: "visitor@example.com", phone: "0123456789", interest: "", spaceType: "", requestType: "availability", floor: "", message: "A showroom enquiry\nSecond line", _honey: "" })) {
    fields[name] = { value, disabled: false, handlers: {}, addEventListener(type, fn) { this.handlers[type] = fn; }, get selectedOptions() { return [{ textContent: this.value }]; } };
  }
  const status = { dataset: {}, hidden: true, focus() {} };
  const label = { textContent: "Send" };
  const button = { disabled: false, querySelector: () => label };
  const leasingFields = { hidden: false };
  const floorField = { hidden: false };
  const elements = { "[data-enquiry-status]": status, '[type="submit"]': button, "[data-leasing-fields]": leasingFields, "[data-floor-field]": floorField };
  const form = {
    dataset: { deliveryMode: mode, ajaxEndpoint: mode === "formsubmit" ? "https://formsubmit.co/ajax/test-recipient" : "", leasingInterest: "Leasing", locale: "en", canonical: "https://www.tpkpark.com/contact/", draftReady: "Draft only", sending: "Sending", success: "Submitted", error: "Not confirmed", submitLabel: "Send" },
    elements: { namedItem: name => fields[name] }, handlers: {}, querySelector: selector => elements[selector],
    addEventListener(type, fn) { this.handlers[type] = fn; }, reportValidity: () => true, setAttribute() {},
    reset() { for (const field of Object.values(fields)) field.value = ""; }
  };
  const location = { search, href: "" };
  const document = { querySelector: () => form, dispatchEvent: event => events.push(event) };
  vm.runInNewContext(source, {
    document, location, URLSearchParams, AbortController,
    CustomEvent: class { constructor(type, options) { this.type = type; this.detail = options.detail; } },
    setTimeout: () => 1, clearTimeout() {},
    fetch: async (url, options) => { sent.push({ url, ...options }); return send(); }
  });
  return { form, fields, status, button, leasingFields, floorField, location, sent, events, submit: () => form.handlers.submit({ preventDefault() {} }) };
}

test("unapproved delivery remains an email draft; viewing and floor preferences are carried correctly", async () => {
  assert.equal(deliveryConfig().mode, "email");
  const page = client();
  assert.equal(page.fields.interest.value, "Leasing");
  assert.equal(page.fields.floor.value, "first");
  assert.equal(page.fields.requestType.value, "viewing");
  await page.submit();
  assert.equal(page.sent.length, 0);
  assert.equal(page.events.length, 0);
  const body = new URL(page.location.href).searchParams.get("body");
  assert.match(body, /Preferred floor: first/);
  assert.match(body, /Request: viewing/);
  assert.match(body, /Source: agent/);
  assert.match(body, /\nSecond line/);
  assert.equal(body.includes("\\n"), false);
  assert.equal(page.status.textContent, "Draft only");
});

test("failed or negative provider responses retain input and never record a submitted enquiry", async () => {
  for (const send of [
    async () => ({ ok: true, json: async () => ({ success: "false" }) }),
    async () => ({ ok: false, json: async () => ({ success: true }) }),
    async () => { throw new Error("Network timeout"); }
  ]) {
    const page = client({ mode: "formsubmit", send });
    await page.submit();
    assert.equal(page.events.length, 0);
    assert.equal(page.fields.email.value, "visitor@example.com");
    assert.equal(page.button.disabled, false);
    assert.equal(page.status.dataset.state, "error");
  }
});

test("confirmed provider acceptance sends once and emits only a bounded analytics category", async () => {
  const page = client({ mode: "formsubmit" });
  const first = page.submit();
  await page.submit();
  await first;
  await page.submit();
  assert.equal(page.sent.length, 1);
  assert.equal(page.sent[0].credentials, "omit");
  const payload = JSON.parse(page.sent[0].body);
  assert.equal(payload.email, "visitor@example.com");
  assert.equal(payload.Source, "agent");
  assert.equal(payload._url, "https://www.tpkpark.com/contact/");
  assert.equal(page.status.textContent, "Submitted");
  assert.equal(JSON.stringify(page.events), '[{"type":"tpk:enquiry-submitted","detail":{"spaceType":"shop-showroom"}}]');
});

test("untrusted query values and alternate delivery domains cannot redirect contact details", async () => {
  assert.throws(() => deliveryConfig("https://example.com/form"));
  assert.throws(() => deliveryConfig("https://formsubmit.co/test?redirect=elsewhere"));
  assert.throws(() => deliveryConfig("https://other@formsubmit.co/test"));
  assert.equal(deliveryConfig("https://formsubmit.co/test-recipient").ajax, "https://formsubmit.co/ajax/test-recipient");
  const page = client({ mode: "formsubmit", search: "?space=visitor@example.com&floor=first&source=visitor@example.com" });
  page.fields.interest.value = "General enquiry";
  page.fields.interest.handlers.change();
  assert.equal(page.floorField.hidden, true);
  assert.equal(page.fields.floor.disabled, true);
  await page.submit();
  const payload = JSON.parse(page.sent[0].body);
  assert.equal(payload.Source, "website");
  assert.equal(payload["Space type"], "");
  assert.equal(payload["Preferred floor"], "");
  assert.equal(page.events[0].detail.spaceType, "unspecified");
});
