import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";
import test from "node:test";

const source = await readFile(new URL("../js/analytics.js", import.meta.url), "utf8");

function client({ hostname = "www.tpkpark.com", locale = "en" } = {}) {
  const events = {};
  const windowEvents = {};
  const scripts = [];
  const canonical = `https://www.tpkpark.com/${locale === "en" ? "" : locale + "/"}about/`;
  const document = {
    currentScript: { dataset: { measurementId: "G-TEST12345", locale, route: "about", canonical } },
    documentElement: { scrollHeight: 2000 },
    title: "About TPK Park",
    referrer: "https://www.google.com/search?q=private@example.com",
    querySelector() { return null; },
    addEventListener(type, callback) { events[type] = callback; },
    createElement() { return {}; },
    head: { appendChild(script) { scripts.push(script); } }
  };
  const window = { innerHeight: 1000, scrollY: 0, addEventListener(type, callback) { windowEvents[type] = callback; } };
  const context = vm.createContext({ document, window, URL, location: { hostname } });
  vm.runInContext(source, context);
  const sent = () => Array.from(window.dataLayer || [], args => Array.from(args)).filter(args => args[0] === "event");
  const vercelSent = () => Array.from(window.vaq || [], args => Array.from(args)).filter(args => args[0] === "event").map(args => args[1]);
  const beforeSend = event => Array.from(window.vaq || [], args => Array.from(args)).find(args => args[0] === "beforeSend")?.[1](event);
  const clickLink = (href, area = "") => events.click?.({ target: { closest: () => ({
    getAttribute: () => href, closest: selector => selector === area ? {} : null
  }) } });
  const submit = space => events.submit?.({ target: { matches: () => true, querySelector: () => ({ value: space }) } });
  const focusForm = () => events.focusin?.({ target: { closest: () => ({}) } });
  const scroll = position => { window.scrollY = position; windowEvents.scroll?.(); };
  return { scripts, sent, vercelSent, beforeSend, clickLink, submit, focusForm, scroll, canonical };
}

test("production pages load Vercel and GA4 automatically without a consent model", () => {
  const page = client();
  assert.deepEqual(page.scripts.map(script => script.src), [
    "/_vercel/insights/script.js",
    "https://www.googletagmanager.com/gtag/js?id=G-TEST12345"
  ]);
  assert.deepEqual(page.sent().map(event => event[1]), ["page_view"]);
  assert.equal(page.beforeSend({ type: "pageview", url: page.canonical + "?email=private@example.com#secret" }).url, page.canonical);
});

test("customer actions are sent to both analytics systems without form/contact contents", () => {
  const page = client({ locale: "zh" });
  page.clickLink("mailto:info@tpkpark.com?body=private@example.com");
  page.clickLink("/assets/leasing/tpk-park-section-2-shoplots-for-lease.pdf?email=private@example.com");
  page.clickLink("/assets/leasing/plans/detached-building-ground-floor.webp");
  page.clickLink("https://www.google.com/maps/search/Puchong?private=private@example.com");
  page.clickLink("https://www.instagram.com/tpkpark/?private=private@example.com");
  page.clickLink("https://example.org/story?email=private@example.com#private");
  page.clickLink("/ms/about/", ".locale-nav");
  page.clickLink("/zh/leasing/shop-showroom/");
  page.clickLink("/zh/contact/?space=shop-showroom&email=private@example.com");
  page.submit("shop-showroom");

  assert.deepEqual(page.vercelSent().map(event => event.name), [
    "contact_click", "file_download", "plan_view", "directions_click", "social_click",
    "outbound_click", "language_switch", "leasing_click", "enquiry_click", "email_draft"
  ]);
  const payloads = JSON.stringify([page.sent(), page.vercelSent()]);
  assert.equal(payloads.includes("private@example.com"), false);
  assert.equal(payloads.includes("+60380765200"), false);
  assert.equal(payloads.includes("info@tpkpark.com"), false);
});

test("engagement events are always measured and scroll milestones fire once", () => {
  const page = client();
  page.focusForm();
  page.focusForm();
  page.scroll(500);
  page.scroll(950);
  page.scroll(990);
  assert.deepEqual(page.sent().map(event => event[1]), ["page_view", "form_start", "scroll_depth", "scroll_depth"]);
});

test("preview hosts do not send analytics", () => {
  const page = client({ hostname: "tpkpark-preview.vercel.app" });
  assert.equal(page.scripts.length, 0);
  assert.equal(page.sent().length, 0);
  assert.equal(page.vercelSent().length, 0);
});
