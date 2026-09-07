import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";
import test from "node:test";

const source = await readFile(new URL("../js/analytics.js", import.meta.url), "utf8");

function client({ hostname = "www.tpkpark.com", saved = null } = {}) {
  const events = {};
  const windowEvents = {};
  const scripts = [];
  const controls = {};
  const storage = new Map(saved ? [["tpk-analytics-consent-v1", saved]] : []);
  for (const name of ["consent", "settings", "allow", "decline"]) controls[name] = {
    hidden: true, handlers: {}, focus() {},
    addEventListener(type, callback) { this.handlers[type] = callback; }
  };
  const document = {
    currentScript: { dataset: { measurementId: "G-TEST12345", locale: "en", route: "contact", canonical: "https://www.tpkpark.com/contact/" } },
    title: "Contact TPK Park Puchong | Leasing & Enquiries",
    referrer: "https://www.google.com/search?q=private@example.com",
    cookie: "_ga=existing; _ga_TEST12345=existing; essential=keep",
    querySelector(selector) { return controls[selector.match(/analytics-([a-z]+)/)?.[1]]; },
    addEventListener(type, callback) { events[type] = callback; },
    createElement() { return {}; },
    head: { appendChild(script) { scripts.push(script); } }
  };
  const window = { addEventListener(type, callback) { windowEvents[type] = callback; } };
  vm.runInNewContext(source, {
    document, window, URL, location: { hostname, search: "?email=private@example.com" },
    localStorage: { getItem: key => storage.get(key) || null, setItem: (key, value) => storage.set(key, value) }
  });
  const sent = () => Array.from(window.dataLayer || [], args => Array.from(args)).filter(args => args[0] === "event");
  const clickLink = href => events.click?.({ target: { closest: () => ({ getAttribute: () => href }) } });
  const submit = space => events.submit?.({ target: { matches: () => true, querySelector: () => ({ value: space }) } });
  return { controls, scripts, sent, clickLink, submit, window, windowEvents, storage };
}

test("analytics requires consent and collects only explicitly selected event details", () => {
  const page = client();
  assert.equal(page.controls.consent.hidden, false);
  page.clickLink("tel:+60380765200");
  page.submit("shop-showroom");
  assert.equal(page.scripts.length, 0);
  assert.equal(page.sent().length, 0);

  page.controls.allow.handlers.click();
  assert.equal(page.scripts.length, 1);
  page.clickLink("tel:+60380765200");
  page.clickLink("mailto:info@tpkpark.com?body=private@example.com");
  page.clickLink("/assets/leasing/tpk-park-section-2-shoplots-for-lease.pdf?email=private@example.com");
  page.submit("shop-showroom");
  page.submit("private@example.com");
  assert.deepEqual(page.sent().map(event => event[1]), ["page_view", "contact_click", "contact_click", "file_download", "email_draft", "email_draft"]);
  assert.equal(page.sent().at(-1)[2].space_type, "unspecified");
  assert.equal(page.sent().at(-2)[2].space_type, "shop-showroom");
  assert.equal(JSON.stringify(page.sent()).includes("private@example.com"), false);
  assert.equal(page.sent().some(event => event[1] === "generate_lead" || event[1] === "form_submit"), false);

  const before = page.sent().length;
  page.controls.decline.handlers.click();
  page.clickLink("tel:+60380765200");
  page.submit("shop-showroom");
  assert.equal(page.sent().length, before);
  assert.equal(page.window["ga-disable-G-TEST12345"], true);
  assert.equal(page.storage.get("tpk-analytics-consent-v1"), "denied");
});

test("returning visitors send one page view and cross-tab withdrawal stops events", () => {
  const page = client({ saved: "granted" });
  assert.equal(page.sent().length, 1);
  assert.equal(page.scripts.length, 1);
  page.controls.allow.handlers.click();
  assert.equal(page.sent().length, 1);
  page.windowEvents.storage({ key: "tpk-analytics-consent-v1", newValue: "denied" });
  page.clickLink("tel:+60380765200");
  assert.equal(page.sent().length, 1);
});

test("declined visitors and preview deployments never load Google Analytics", () => {
  const declined = client({ saved: "denied" });
  assert.equal(declined.scripts.length, 0);
  assert.equal(declined.controls.consent.hidden, true);
  const preview = client({ hostname: "tpkpark-preview.vercel.app", saved: "granted" });
  assert.equal(preview.scripts.length, 0);
  assert.equal(preview.sent().length, 0);
  assert.equal(preview.controls.settings.hidden, true);
});
