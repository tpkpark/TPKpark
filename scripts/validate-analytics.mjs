import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";
import test from "node:test";

const source = await readFile(new URL("../js/analytics.js", import.meta.url), "utf8");

function client({ hostname = "www.tpkpark.com", privacy = {}, locale = "en" } = {}) {
  const events = {};
  const windowEvents = {};
  const scripts = [];
  const canonical = `https://www.tpkpark.com/${locale === "en" ? "" : locale + "/"}about/`;
  const document = {
    currentScript: { dataset: { measurementId: "G-TEST12345", locale, route: "about", canonical } },
    documentElement: { scrollHeight: 2000 },
    title: "About TPK Park",
    referrer: "https://www.google.com/search?q=private@example.com",
    addEventListener(type, callback) { events[type] = callback; },
    createElement() { return {}; },
    head: { appendChild(script) { scripts.push(script); } }
  };
  const window = {
    innerHeight: 1000,
    scrollY: 0,
    addEventListener(type, callback) { windowEvents[type] = callback; }
  };
  const context = vm.createContext({
    document, window, URL, navigator: privacy, location: { hostname, search: "?email=private@example.com" }
  });
  vm.runInContext(source, context);
  const sent = () => Array.from(window.dataLayer || [], args => Array.from(args)).filter(args => args[0] === "event");
  const basicSent = () => Array.from(window.vaq || [], args => Array.from(args)).filter(args => args[0] === "event").map(args => args[1]);
  const beforeSend = event => Array.from(window.vaq || [], args => Array.from(args)).find(args => args[0] === "beforeSend")?.[1](event);
  const clickLink = (href, area = "") => events.click?.({ target: { closest: selector => {
    if (selector === "a[href]") return {
      getAttribute: () => href,
      closest: innerSelector => innerSelector === area ? {} : null
    };
    return null;
  } } });
  const submit = space => events.submit?.({ target: {
    matches: () => true,
    querySelector: selector => {
      assert.equal(selector, '[name="spaceType"]', "only a known category may be read from the form");
      return { value: space };
    }
  } });
  const focusForm = () => events.focusin?.({ target: { closest: () => ({}) } });
  const scroll = position => { window.scrollY = position; windowEvents.scroll?.(); };
  return { scripts, sent, basicSent, beforeSend, clickLink, submit, focusForm, scroll, window, canonical };
}

test("production pages automatically start Vercel Analytics and GA4 without a consent step", () => {
  const page = client();
  assert.deepEqual(page.scripts.map(script => script.src), [
    "/_vercel/insights/script.js",
    "https://www.googletagmanager.com/gtag/js?id=G-TEST12345"
  ]);
  assert.deepEqual(page.sent().map(event => event[1]), ["page_view"]);
  assert.equal(page.beforeSend({ type: "pageview", url: page.canonical + "?email=private@example.com#secret" }).url, page.canonical);

  page.clickLink("tel:+60380765200");
  assert.deepEqual(page.basicSent().map(event => event.name), ["contact_click"]);
  assert.deepEqual(page.sent().map(event => event[1]), ["page_view", "contact_click"]);
});

test("selected actions stay free of form contents and personal contact details in custom payloads", () => {
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
  page.clickLink("/zh/contact/?space=private@example.com");
  page.submit("shop-showroom");
  page.submit("private@example.com");

  assert.deepEqual(page.basicSent().map(event => event.name), [
    "contact_click", "file_download", "plan_view", "directions_click", "social_click", "outbound_click",
    "language_switch", "leasing_click", "enquiry_click", "enquiry_click", "email_draft", "email_draft"
  ]);
  assert.equal(page.basicSent().at(-1).data.target, "unspecified");
  for (const event of page.basicSent()) {
    assert.equal(Object.keys(event.data).length, 2);
    assert.equal(event.data.language, "zh");
  }
  const payloads = JSON.stringify([page.sent(), page.basicSent()]);
  assert.equal(payloads.includes("private@example.com"), false);
  assert.equal(payloads.includes("+60380765200"), false);
  assert.equal(payloads.includes("info@tpkpark.com"), false);
  assert.equal(page.sent().some(event => ["generate_lead", "form_submit"].includes(event[1])), false);
});

test("engagement events are collected automatically and milestones fire once", () => {
  const page = client();
  page.focusForm(); page.focusForm();
  page.scroll(500); page.scroll(950); page.scroll(990);
  assert.deepEqual(page.sent().map(event => event[1]), ["page_view", "form_start", "scroll_depth", "scroll_depth"]);
  assert.deepEqual(page.sent().slice(1).map(event => event[2].interaction_target), ["leasing_enquiry", "50", "90"]);
});

test("browser privacy preference flags do not gate tracking; non-production previews still do", () => {
  for (const privacy of [{ globalPrivacyControl: true }, { doNotTrack: "1" }]) {
    const page = client({ privacy });
    assert.equal(page.scripts.length, 2);
    assert.deepEqual(page.sent().map(event => event[1]), ["page_view"]);
  }

  const preview = client({ hostname: "tpkpark-preview.vercel.app" });
  preview.clickLink("tel:+60380765200");
  assert.equal(preview.scripts.length, 0);
  assert.equal(preview.sent().length, 0);
  assert.equal(preview.basicSent().length, 0);
});
