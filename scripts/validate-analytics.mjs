import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";
import test from "node:test";

const source = await readFile(new URL("../js/analytics.js", import.meta.url), "utf8");
const key = "tpk-analytics-preference-v2";

function client({ hostname = "www.tpkpark.com", saved = null, legacy = null, privacy = {}, storageUnavailable = false, locale = "en" } = {}) {
  const events = {};
  const windowEvents = {};
  const scripts = [];
  const controls = {};
  const storage = new Map([[key, saved], ["tpk-analytics-consent-v1", legacy]]);
  const cookieWrites = [];
  for (const name of ["consent", "settings", "status", "allow", "basic", "off", "close"]) controls[name] = {
    hidden: true, handlers: {}, attributes: {}, focus() {},
    dataset: { basic: "basic", detailed: "detailed", off: "off", signal: "privacy signal" },
    setAttribute(name, value) { this.attributes[name] = value; },
    addEventListener(type, callback) { this.handlers[type] = callback; }
  };
  const canonical = `https://www.tpkpark.com/${locale === "en" ? "" : locale + "/"}about/`;
  const document = {
    currentScript: { dataset: { measurementId: "G-TEST12345", locale, route: "about", canonical } },
    documentElement: { scrollHeight: 2000 },
    title: "About TPK Park",
    referrer: "https://www.google.com/search?q=private@example.com",
    get cookie() { return "_ga=existing; _ga_TEST12345=existing; essential=keep"; },
    set cookie(value) { cookieWrites.push(value); },
    querySelector(selector) { return controls[selector.match(/analytics-([a-z]+)/)?.[1]]; },
    addEventListener(type, callback) { events[type] = callback; },
    createElement() { return {}; },
    head: { appendChild(script) { scripts.push(script); } }
  };
  const window = { innerHeight: 1000, scrollY: 0, addEventListener(type, callback) { windowEvents[type] = callback; } };
  const context = vm.createContext({
    document, window, URL, navigator: privacy, location: { hostname, search: "?email=private@example.com" },
    localStorage: {
      getItem(name) { if (storageUnavailable) throw new Error("Storage blocked"); return storage.get(name) || null; },
      setItem(name, value) { if (storageUnavailable) throw new Error("Storage blocked"); storage.set(name, value); }
    }
  });
  vm.runInContext(source, context);
  const sent = () => Array.from(window.dataLayer || [], args => Array.from(args)).filter(args => args[0] === "event");
  const basicSent = () => Array.from(window.vaq || [], args => Array.from(args)).filter(args => args[0] === "event").map(args => args[1]);
  const beforeSend = event => Array.from(window.vaq || [], args => Array.from(args)).find(args => args[0] === "beforeSend")?.[1](event);
  const clickLink = (href, area = "") => events.click?.({ target: { closest: () => ({
    getAttribute: () => href, closest: selector => (Array.isArray(area) ? area : [area]).includes(selector) ? {} : null
  }) } });
  const submit = space => events.submit?.({ target: { matches: () => true, querySelector: selector => {
    assert.equal(selector, '[name="spaceType"]', "only a known category may be read from the form");
    return { value: space };
  } } });
  const focusForm = () => events.focusin?.({ target: { closest: () => ({}) } });
  const scroll = position => { window.scrollY = position; windowEvents.scroll?.(); };
  const assistant = detail => events["tpk:assistant"]?.({ detail });
  return { assistant, controls, scripts, sent, basicSent, beforeSend, clickLink, submit, focusForm, scroll, window, windowEvents, storage, cookieWrites, canonical, reloadScript: () => vm.runInContext(source, context) };
}

test("new visitors get basic counts; GA4 starts only after choosing detailed analytics", () => {
  const page = client();
  assert.deepEqual(page.scripts.map(script => script.src), ["/_vercel/insights/script.js"]);
  assert.equal(page.sent().length, 0);
  assert.equal(page.controls.consent.hidden, true);
  assert.equal(page.controls.settings.hidden, false);
  assert.equal(page.beforeSend({ type: "pageview", url: page.canonical + "?email=private@example.com#secret" }).url, page.canonical);
  page.clickLink("tel:+60380765200");
  assert.equal(page.basicSent().length, 1);
  assert.equal(page.sent().length, 0);
  page.controls.allow.handlers.click();
  page.clickLink("tel:+60380765200");
  assert.equal(page.scripts.length, 2);
  assert.deepEqual(page.sent().map(event => event[1]), ["page_view", "contact_click"]);
  page.controls.basic.handlers.click();
  page.clickLink("tel:+60380765200");
  assert.equal(page.window["ga-disable-G-TEST12345"], true);
  assert.equal(page.basicSent().length, 3);
  assert.equal(page.sent().length, 2);
});

test("selected actions exclude visitor text in both systems and use only two Vercel properties", () => {
  const page = client({ saved: "detailed", locale: "zh" });
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
  page.clickLink("https://policies.google.com/privacy", "[data-analytics-consent]");
  page.clickLink("/private@example.com/");
  assert.deepEqual(page.basicSent().map(event => event.name), ["contact_click", "file_download", "plan_view", "directions_click", "social_click", "outbound_click", "language_switch", "leasing_click", "enquiry_click", "enquiry_click", "email_draft", "email_draft"]);
  assert.equal(page.basicSent().at(-1).data.target, "unspecified");
  assert.equal(page.sent().at(-2)[2].space_type, "shop-showroom");
  assert.equal(page.sent().at(-1)[2].space_type, "unspecified");
  assert.equal(page.sent().at(-1)[2].interaction_target, "unspecified");
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

test("detailed engagement counts milestones once and stops independently of basic statistics", () => {
  const page = client({ saved: "detailed" });
  page.focusForm(); page.focusForm();
  page.scroll(500); page.scroll(950); page.scroll(990);
  assert.deepEqual(page.sent().map(event => event[1]), ["page_view", "form_start", "scroll_depth", "scroll_depth"]);
  assert.deepEqual(page.sent().slice(1).map(event => event[2].interaction_target), ["leasing_enquiry", "50", "90"]);
  assert.equal(page.basicSent().length, 0);
  page.controls.basic.handlers.click();
  page.clickLink("tel:+60380765200");
  assert.equal(page.sent().length, 4);
  assert.equal(page.basicSent().length, 1);
  assert.equal(page.window["ga-disable-G-TEST12345"], true);
  assert.equal(page.cookieWrites.every(value => value.startsWith("_ga")), true);
  page.controls.off.handlers.click();
  page.clickLink("tel:+60380765200"); page.submit("shop-showroom");
  assert.equal(page.basicSent().length, 1);
  assert.equal(page.beforeSend({ type: "pageview", url: page.canonical }), null);
  assert.equal(page.storage.get(key), "off");
});

test("previous refusals, explicit opt-outs, browser privacy preferences and previews prevent both collectors", () => {
  for (const options of [{ legacy: "denied" }, { saved: "off" }, { privacy: { globalPrivacyControl: true } }, { saved: "detailed", privacy: { doNotTrack: "1" } }, { hostname: "tpkpark-preview.vercel.app", saved: "detailed" }]) {
    const page = client(options);
    page.clickLink("tel:+60380765200");
    assert.equal(page.scripts.length, 0);
    assert.equal(page.sent().length, 0);
    assert.equal(page.basicSent().length, 0);
    assert.equal(page.controls.consent.hidden, true);
  }
  const previousGrant = client({ legacy: "granted" });
  assert.equal(previousGrant.scripts.length, 2);
  assert.equal(previousGrant.sent().length, 1);
});

test("cross-tab changes, blocked storage and footer settings preserve working privacy controls", () => {
  const page = client({ saved: "detailed" });
  page.windowEvents.storage({ key, newValue: "off" });
  page.clickLink("tel:+60380765200");
  assert.equal(page.sent().length, 1);
  assert.equal(page.basicSent().length, 0);
  assert.equal(page.beforeSend({ type: "event", url: page.canonical }), null);
  page.windowEvents.storage({ key, newValue: "basic" });
  page.clickLink("tel:+60380765200");
  assert.equal(page.basicSent().length, 1);
  assert.equal(page.sent().length, 1);

  const blocked = client({ storageUnavailable: true });
  assert.equal(blocked.sent().length, 0);
  blocked.controls.off.handlers.click();
  blocked.clickLink("tel:+60380765200");
  assert.equal(blocked.basicSent().length, 0);
  assert.equal(blocked.beforeSend({ type: "pageview", url: blocked.canonical }), null);

  const closed = client();
  assert.equal(closed.controls.consent.hidden, true);
  closed.controls.settings.handlers.click();
  assert.equal(closed.controls.consent.hidden, false);
  closed.controls.close.handlers.click();
  assert.equal(closed.storage.get(key), "basic");
  assert.equal(closed.sent().length, 0);
  assert.equal(closed.controls.consent.hidden, true);
});


test("assistant categories respect basic, detailed, off, privacy signals and preview isolation", () => {
  for (const options of [{}, { saved: "detailed" }, { saved: "off" }, { privacy: { globalPrivacyControl: true } }, { hostname: "preview.vercel.app" }]) {
    const page = client(options);
    const basic = !options.privacy && !options.hostname && options.saved !== "off";
    const detailed = basic && options.saved === "detailed";
    for (const action of ["open", "question", "answer", "draft_ready", "error"]) page.assistant({ action, reason: "timeout", question: "private@example.com", answer: "Secret", draft: "Confidential" });
    assert.equal(page.basicSent().length, basic ? 5 : 0);
    assert.equal(page.sent().filter(e => e[1].startsWith("assistant_")).length, detailed ? 5 : 0);
    const payloads = JSON.stringify([page.sent(), page.basicSent()]);
    assert.doesNotMatch(payloads, /private@example.com|Secret|Confidential/);
    if (basic) assert.equal(page.basicSent().at(-1).data.target, "timeout");
  }
});

test("assistant clicks retain one event and separate drafts, contact methods and property links", () => {
  const page = client({ saved: "detailed" });
  page.clickLink("tel:+60380765200", "[data-ask-tpk]");
  page.clickLink("mailto:info@tpkpark.com?body=Confidential", ["[data-ask-tpk]", ".ask-tpk-email"]);
  page.clickLink("/assets/leasing/tpk-park-section-2-shoplots-for-lease.pdf", "[data-ask-tpk]");
  page.clickLink("/leasing/shop-showroom/", "[data-ask-tpk]");
  page.clickLink("mailto:info@tpkpark.com", "[data-ask-tpk]");
  page.clickLink("mailto:info@tpkpark.com");
  assert.deepEqual(page.basicSent().map(e => e.data.target), ["assistant:phone", "assistant:email_draft", "assistant:tpk-park-section-2-shoplots-for-lease.pdf", "assistant:/leasing/shop-showroom/", "assistant:email", "email"]);
  assert.equal(page.sent().filter(e => e[1] === "contact_click").length, 4);
  assert.equal(page.sent().at(-2)[2].interaction_origin, "assistant");
  assert.equal(page.sent().at(-1)[2].interaction_origin, "website");
  assert.doesNotMatch(JSON.stringify([page.sent(), page.basicSent()]), /Confidential|info@tpkpark.com/);
});

test("unknown assistant payloads are discarded and withdrawal stops subsequent chat measurements", () => {
  const page = client({ saved: "detailed" });
  page.assistant({ action: "private@example.com" });
  page.assistant({ action: "error", reason: "private@example.com", text: "Confidential" });
  assert.equal(page.basicSent().length, 1);
  assert.equal(page.basicSent()[0].data.target, "unspecified");
  page.controls.off.handlers.click();
  page.assistant({ action: "answer" });
  page.clickLink("mailto:info@tpkpark.com", "[data-ask-tpk]");
  assert.equal(page.basicSent().length, 1);
  assert.equal(page.sent().filter(e => e[1] === "assistant_error").length, 1);
  assert.equal(page.beforeSend({ type: "event", url: page.canonical }), null);
});
