import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";

const source = await readFile(new URL("../js/enquiry.js", import.meta.url), "utf8");

function client({ search = "?space=shop-showroom&floor=first&intent=viewing&source=agent" } = {}) {
  const fields = {};
  const sent = [];
  const events = [];
  for (const [name, value] of Object.entries({ name: "Test visitor", company: "Example Company", email: "visitor@example.com", phone: "0123456789", interest: "", spaceType: "", requestType: "availability", floor: "", message: "A showroom enquiry\nSecond line" })) {
    fields[name] = { value, disabled: false, handlers: {}, addEventListener(type, fn) { this.handlers[type] = fn; }, get selectedOptions() { return [{ textContent: this.value }]; } };
  }
  const status = { dataset: {}, hidden: true, focus() {} };
  const label = { textContent: "Send" };
  const button = { disabled: false, querySelector: () => label };
  const leasingFields = { hidden: false };
  const floorField = { hidden: false };
  const elements = { "[data-enquiry-status]": status, '[type="submit"]': button, "[data-leasing-fields]": leasingFields, "[data-floor-field]": floorField };
  const form = {
    dataset: { leasingInterest: "Leasing", locale: "en", canonical: "https://www.tpkpark.com/contact/", draftReady: "Draft only" },
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
    fetch: async (url, options) => { sent.push({ url, ...options }); throw new Error("The email draft must not call a delivery service"); }
  });
  return { form, fields, status, button, leasingFields, floorField, location, sent, events, submit: () => form.handlers.submit({ preventDefault() {} }) };
}

test("email drafts preserve viewing and floor preferences without sending visitor details", async () => {
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

test("untrusted query values cannot redirect contact details or populate unrelated fields", async () => {
  const page = client({ search: "?space=visitor@example.com&floor=first&source=visitor@example.com&recipient=visitor@example.com" });
  page.fields.interest.value = "General enquiry";
  page.fields.interest.handlers.change();
  assert.equal(page.floorField.hidden, true);
  assert.equal(page.fields.floor.disabled, true);
  await page.submit();
  const draft = new URL(page.location.href);
  const body = draft.searchParams.get("body");
  assert.equal(draft.protocol, "mailto:");
  assert.equal(draft.pathname, "info@tpkpark.com");
  assert.match(body, /Source: website/);
  assert.equal(body.includes("Space type:"), false);
  assert.equal(body.includes("Preferred floor:"), false);
  assert.equal(page.sent.length, 0);
  assert.equal(page.events.length, 0);
});
