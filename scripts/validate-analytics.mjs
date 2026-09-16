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

test("MOTD navigation and referrals are measured without counting restaurant calls as park enquiries", () => {
  const page = client({ saved: "detailed" });
  page.clickLink("/lifestyle/motd/");
  page.clickLink("/zh/lifestyle/motd/", ".locale-nav");
  page.clickLink("https://www.motdgroup.com/menu?email=private@example.com#private");
  page.clickLink("https://www.motdgroup.com/zh/live-house");
  page.clickLink("https://www.motdgroup.com/contact-us");
  page.clickLink("https://www.motdgroup.com/zh");
  page.clickLink("tel:+60166626951");
  assert.deepEqual(page.basicSent().map(event => event.data.target), ["/lifestyle/motd/", "zh", "motd:menu", "motd:live_music", "motd:visit", "motd:home", "motd:phone"]);
  assert.equal(page.sent().filter(event => event[1] === "contact_click").length, 0);
  assert.equal(page.sent().filter(event => event[1] === "tenant_contact_click").length, 1);
  assert.doesNotMatch(JSON.stringify([page.sent(), page.basicSent()]), /private@example.com|#private|60166626951/);
});

test("Lavino visits and referrals keep the showroom contact separate from park enquiries", () => {
  const page = client({ saved: "detailed", locale: "ms" });
  page.clickLink("/ms/home-living/lavino/");
  page.clickLink("/zh/home-living/lavino/", ".locale-nav");
  page.clickLink("https://www.lavino.com.my/?email=private@example.com#private");
  page.clickLink("https://www.waze.com/live-map/directions/my/selangor/puchong/lavino-puchong-or-bandar-kinrara-furniture-showroom?to=place.ChIJ-UmXrFBLzDERLRSUYQXuCqA&private=private@example.com");
  page.clickLink("tel:+60163391601");
  assert.deepEqual(page.basicSent().map(event => event.name), ["navigation_click", "language_switch", "outbound_click", "directions_click", "tenant_contact_click"]);
  assert.deepEqual(page.basicSent().map(event => event.data.target), ["/ms/home-living/lavino/", "zh", "lavino:website", "about", "lavino:phone"]);
  assert.equal(page.sent().find(event => event[1] === "directions_click")[2].map_provider, "waze");
  assert.equal(page.sent().filter(event => event[1] === "contact_click").length, 0);
  assert.equal(page.sent().at(-1)[2].tenant, "lavino");
  assert.doesNotMatch(JSON.stringify([page.sent(), page.basicSent()]), /private@example.com|#private|60163391601|ChIJ/);
  page.controls.off.handlers.click();
  page.clickLink("tel:+60163391601");
  assert.equal(page.basicSent().length, 5);
});

test("Ga Hing navigation, maps and calls preserve branch attribution and privacy", () => {
  const page = client({ saved: "detailed", locale: "zh" });
  page.clickLink("/zh/home-living/ga-hing/");
  page.clickLink("/ms/home-living/ga-hing/", ".locale-nav");
  page.clickLink("https://gahing.com/?email=private@example.com#private");
  page.clickLink("https://gahing.com/contact/?email=private@example.com");
  page.clickLink("https://goo.gl/maps/2DQ9PTWTaCcj6JM38?private=private@example.com");
  page.clickLink("tel:+60380809119");
  assert.deepEqual(page.basicSent().map(event => event.name), ["navigation_click", "language_switch", "outbound_click", "outbound_click", "directions_click", "tenant_contact_click"]);
  assert.deepEqual(page.basicSent().map(event => event.data.target), ["/zh/home-living/ga-hing/", "ms", "ga-hing:website", "ga-hing:visit", "about", "ga-hing:phone"]);
  assert.equal(page.sent().find(event => event[1] === "directions_click")[2].map_provider, "google");
  assert.equal(page.sent().filter(event => event[1] === "contact_click").length, 0);
  assert.equal(page.sent().at(-1)[2].tenant, "ga-hing");
  assert.doesNotMatch(JSON.stringify([page.sent(), page.basicSent()]), /private@example.com|#private|60380809119|2DQ9/);
  page.controls.off.handlers.click();
  page.clickLink("tel:+60380809119");
  assert.equal(page.basicSent().length, 6);
});

test("Kuche + BaTH referrals use the Puchong branch contact and respect privacy choices", () => {
  const page = client({ saved: "detailed", locale: "ms" });
  page.clickLink("/ms/home-living/kuche-bath/");
  page.clickLink("/zh/home-living/kuche-bath/", ".locale-nav");
  page.clickLink("https://kbomy.com/?email=private@example.com#private");
  page.clickLink("https://kbomy.com/contact-us/?email=private@example.com");
  page.clickLink("https://maps.app.goo.gl/GVQyy6omJkKiJu7VA?private=private@example.com");
  page.clickLink("tel:+60380791268");
  assert.deepEqual(page.basicSent().map(event => event.name), ["navigation_click", "language_switch", "outbound_click", "outbound_click", "directions_click", "tenant_contact_click"]);
  assert.deepEqual(page.basicSent().map(event => event.data.target), ["/ms/home-living/kuche-bath/", "zh", "kuche-bath:website", "kuche-bath:visit", "about", "kuche-bath:phone"]);
  assert.equal(page.sent().find(event => event[1] === "directions_click")[2].map_provider, "google");
  assert.equal(page.sent().filter(event => event[1] === "contact_click").length, 0);
  assert.equal(page.sent().at(-1)[2].tenant, "kuche-bath");
  assert.doesNotMatch(JSON.stringify([page.sent(), page.basicSent()]), /private@example.com|#private|60380791268|GVQyy/);
  page.controls.off.handlers.click();
  page.clickLink("tel:+60380791268");
  assert.equal(page.basicSent().length, 6);
});

test("Jubin BMS referrals preserve the Kinrara contact and omit private URL contents", () => {
  const page = client({ saved: "detailed", locale: "ms" });
  page.clickLink("/ms/home-living/jubin-bms/");
  page.clickLink("/zh/home-living/jubin-bms/", ".locale-nav");
  page.clickLink("https://www.jubinbms.com.my/?email=private@example.com#private");
  page.clickLink("https://www.jubinbms.com.my/locate-us?email=private@example.com");
  page.clickLink("https://www.google.com/maps/dir/?api=1&destination=Jubin+BMS+Puchong+Kinrara&private=private@example.com");
  page.clickLink("tel:+60380748300");
  assert.deepEqual(page.basicSent().map(event => event.name), ["navigation_click", "language_switch", "outbound_click", "outbound_click", "directions_click", "tenant_contact_click"]);
  assert.deepEqual(page.basicSent().map(event => event.data.target), ["/ms/home-living/jubin-bms/", "zh", "jubin-bms:website", "jubin-bms:visit", "about", "jubin-bms:phone"]);
  assert.equal(page.sent().find(event => event[1] === "directions_click")[2].map_provider, "google");
  assert.equal(page.sent().filter(event => event[1] === "contact_click").length, 0);
  assert.equal(page.sent().at(-1)[2].tenant, "jubin-bms");
  assert.doesNotMatch(JSON.stringify([page.sent(), page.basicSent()]), /private@example.com|#private|60380748300|destination=/);
  page.controls.off.handlers.click();
  page.clickLink("tel:+60380748300");
  assert.equal(page.basicSent().length, 6);
});

test("V Haus Living visits and calls use Puchong attribution and respect privacy choices", () => {
  const page = client({ saved: "detailed", locale: "zh" });
  page.clickLink("/zh/home-living/v-haus-living/");
  page.clickLink("/ms/home-living/v-haus-living/", ".locale-nav");
  page.clickLink("https://www.vhausliving.com/?email=private@example.com#private");
  page.clickLink("https://www.vhausliving.com/contactus/branch/833211/?email=private@example.com");
  page.clickLink("https://www.google.com/maps/dir/?api=1&destination=3.048802%2C101.637725&private=private@example.com");
  page.clickLink("tel:+60127086389");
  assert.deepEqual(page.basicSent().map(event => event.name), ["navigation_click", "language_switch", "outbound_click", "outbound_click", "directions_click", "tenant_contact_click"]);
  assert.deepEqual(page.basicSent().map(event => event.data.target), ["/zh/home-living/v-haus-living/", "ms", "v-haus-living:website", "v-haus-living:visit", "about", "v-haus-living:phone"]);
  assert.equal(page.sent().find(event => event[1] === "directions_click")[2].map_provider, "google");
  assert.equal(page.sent().filter(event => event[1] === "contact_click").length, 0);
  assert.equal(page.sent().at(-1)[2].tenant, "v-haus-living");
  assert.doesNotMatch(JSON.stringify([page.sent(), page.basicSent()]), /private@example.com|#private|60127086389|3\.048802|101\.637725/);
  page.controls.off.handlers.click();
  page.clickLink("tel:+60127086389");
  assert.equal(page.basicSent().length, 6);
});

test("Balens Design consultation referrals remain separate from park enquiries and exclude private URL data", () => {
  const page = client({ saved: "detailed", locale: "en" });
  page.clickLink("/home-living/balens-design/");
  page.clickLink("/zh/home-living/balens-design/", ".locale-nav");
  page.clickLink("https://balensdesign.com/?email=private@example.com#private");
  page.clickLink("https://balensdesign.com/contact-us?email=private@example.com");
  page.clickLink("https://balensdesign.com/projects/?email=private@example.com");
  page.clickLink("https://www.google.com/maps/dir/?api=1&destination=Balens+Design+25-1+Jalan+TPK+2%2F8&private=private@example.com");
  page.clickLink("tel:+60173388535");
  assert.deepEqual(page.basicSent().map(event => event.name), ["navigation_click", "language_switch", "outbound_click", "outbound_click", "outbound_click", "directions_click", "tenant_contact_click"]);
  assert.deepEqual(page.basicSent().map(event => event.data.target), ["/home-living/balens-design/", "zh", "balens-design:website", "balens-design:visit", "balens-design:projects", "about", "balens-design:phone"]);
  assert.equal(page.sent().filter(event => event[1] === "contact_click").length, 0);
  assert.equal(page.sent().at(-1)[2].tenant, "balens-design");
  assert.doesNotMatch(JSON.stringify([page.sent(), page.basicSent()]), /private@example.com|#private|60173388535|25-1|destination=/);
  page.controls.off.handlers.click();
  page.clickLink("tel:+60173388535");
  assert.equal(page.basicSent().length, 7);
});

test("BUILTOP project referrals remain separate from park enquiries and exclude private URL data", () => {
  const page = client({ saved: "detailed", locale: "en" });
  page.clickLink("/home-living/builtop/");
  page.clickLink("/zh/home-living/builtop/", ".locale-nav");
  page.clickLink("https://www.builtopmalaysia.com/?email=private@example.com#private");
  page.clickLink("https://www.builtopmalaysia.com/contactus?email=private@example.com");
  page.clickLink("https://www.builtopmalaysia.com/services/?email=private@example.com");
  page.clickLink("https://www.google.com/maps/dir/?api=1&destination=BUILTOP+13-1+Jalan+TPK+2%2F8&private=private@example.com");
  page.clickLink("tel:+601126838848");
  assert.deepEqual(page.basicSent().map(event => event.name), ["navigation_click", "language_switch", "outbound_click", "outbound_click", "outbound_click", "directions_click", "tenant_contact_click"]);
  assert.deepEqual(page.basicSent().map(event => event.data.target), ["/home-living/builtop/", "zh", "builtop:website", "builtop:visit", "builtop:services", "about", "builtop:phone"]);
  assert.equal(page.sent().filter(event => event[1] === "contact_click").length, 0);
  assert.equal(page.sent().at(-1)[2].tenant, "builtop");
  assert.doesNotMatch(JSON.stringify([page.sent(), page.basicSent()]), /private@example.com|#private|601126838848|13-1|destination=/);
  page.controls.off.handlers.click();
  page.clickLink("tel:+601126838848");
  assert.equal(page.basicSent().length, 7);
});

test("Premio Door referrals use the branch contact and exclude private URL data", () => {
  const page = client({ saved: "detailed", locale: "en" });
  page.clickLink("/home-living/premio-door/");
  page.clickLink("/zh/home-living/premio-door/", ".locale-nav");
  page.clickLink("https://premiodoor.com.my/?email=private@example.com#private");
  page.clickLink("https://premiodoor.com.my/location.php?email=private@example.com");
  page.clickLink("https://premiodoor.com.my/productSeries.php?email=private@example.com");
  page.clickLink("https://www.google.com/maps/dir/?api=1&destination=Premio+25-G+Jalan+TPK+2%2F8&private=private@example.com");
  page.clickLink("tel:+60165255100");
  assert.deepEqual(page.basicSent().map(event => event.name), ["navigation_click", "language_switch", "outbound_click", "outbound_click", "outbound_click", "directions_click", "tenant_contact_click"]);
  assert.deepEqual(page.basicSent().map(event => event.data.target), ["/home-living/premio-door/", "zh", "premio-door:website", "premio-door:visit", "premio-door:collections", "about", "premio-door:phone"]);
  assert.equal(page.sent().filter(event => event[1] === "contact_click").length, 0);
  assert.equal(page.sent().at(-1)[2].tenant, "premio-door");
  assert.doesNotMatch(JSON.stringify([page.sent(), page.basicSent()]), /private@example.com|#private|60165255100|25-G|destination=/);
  page.controls.off.handlers.click();
  page.clickLink("tel:+60165255100");
  assert.equal(page.basicSent().length, 7);
});

test("KLOT referrals distinguish the tenant and exclude contact and query data", () => {
  const page = client({ saved: "detailed", locale: "en" });
  page.clickLink("/home-living/klot/");
  page.clickLink("/ms/home-living/klot/", ".locale-nav");
  page.clickLink("https://www.klot.com.my/?email=private@example.com#private");
  page.clickLink("https://www.klot.com.my/pages/contact-us?email=private@example.com");
  page.clickLink("https://www.klot.com.my/pages/catalog-1?email=private@example.com");
  page.clickLink("https://maps.app.goo.gl/RaAZZQ97MP8wj574A?email=private@example.com");
  page.clickLink("tel:+60183403828");
  assert.deepEqual(page.basicSent().map(event => event.name), ["navigation_click", "language_switch", "outbound_click", "outbound_click", "outbound_click", "directions_click", "tenant_contact_click"]);
  assert.deepEqual(page.basicSent().map(event => event.data.target), ["/home-living/klot/", "ms", "klot:website", "klot:visit", "klot:catalogue", "about", "klot:phone"]);
  assert.equal(page.sent().filter(event => event[1] === "contact_click").length, 0);
  assert.equal(page.sent().at(-1)[2].tenant, "klot");
  assert.doesNotMatch(JSON.stringify([page.sent(), page.basicSent()]), /private@example.com|#private|60183403828|RaAZZQ97MP8wj574A/);
  page.controls.off.handlers.click();
  page.clickLink("tel:+60183403828");
  assert.equal(page.basicSent().length, 7);
});

test("DC Moto WhatsApp enquiries remain tenant actions without phone or message data", () => {
  const page = client({ saved: "detailed", locale: "en" });
  page.clickLink("/home-living/dc-moto/");
  page.clickLink("/zh/home-living/dc-moto/", ".locale-nav");
  page.clickLink("https://www.dcmoto.my/?email=private@example.com#private");
  page.clickLink("https://www.dcmoto.my/contact-us/?email=private@example.com");
  page.clickLink("https://www.dcmoto.my/user-support-guide/?email=private@example.com");
  page.clickLink("https://maps.app.goo.gl/xxw6Q4EFmfjz3uVG6?email=private@example.com");
  page.clickLink("https://wa.me/601156279623?text=private@example.com#private");
  assert.deepEqual(page.basicSent().map(event => event.name), ["navigation_click", "language_switch", "outbound_click", "outbound_click", "outbound_click", "directions_click", "tenant_contact_click"]);
  assert.deepEqual(page.basicSent().map(event => event.data.target), ["/home-living/dc-moto/", "zh", "dc-moto:website", "dc-moto:visit", "dc-moto:support", "about", "dc-moto:whatsapp"]);
  assert.equal(page.sent().filter(event => event[1] === "contact_click").length, 0);
  assert.equal(page.sent().at(-1)[2].tenant, "dc-moto");
  assert.equal(page.sent().at(-1)[2].contact_method, "whatsapp");
  assert.doesNotMatch(JSON.stringify([page.sent(), page.basicSent()]), /private@example.com|#private|601156279623|xxw6Q4EFmfjz3uVG6|text=/);
  page.controls.off.handlers.click();
  page.clickLink("https://wa.me/601156279623");
  assert.equal(page.basicSent().length, 7);
});

test("Fagolli calls and WhatsApp remain tenant enquiries without contact or message data", () => {
  const page = client({ saved: "detailed", locale: "en" });
  page.clickLink("/home-living/fagolli/");
  page.clickLink("/ms/home-living/fagolli/", ".locale-nav");
  page.clickLink("https://www.fagolli.com.my/?email=private@example.com#private");
  page.clickLink("https://www.fagolli.com.my/contact-us/?email=private@example.com");
  page.clickLink("https://www.fagolli.com.my/gallery/?email=private@example.com");
  page.clickLink("https://www.fagolli.com.my/fagolli_bifoldgate/?email=private@example.com");
  page.clickLink("https://www.google.com/maps/search/?api=1&query=Fagolli+43-1+Jalan+TPK+2%2F8&email=private@example.com");
  page.clickLink("tel:+601154078187");
  page.clickLink("https://wa.me/601154078187?text=private@example.com#private");
  assert.deepEqual(page.basicSent().map(event => event.name), ["navigation_click", "language_switch", "outbound_click", "outbound_click", "outbound_click", "outbound_click", "directions_click", "tenant_contact_click", "tenant_contact_click"]);
  assert.deepEqual(page.basicSent().map(event => event.data.target), ["/home-living/fagolli/", "ms", "fagolli:website", "fagolli:visit", "fagolli:gallery", "fagolli:products", "about", "fagolli:phone", "fagolli:whatsapp"]);
  assert.equal(page.sent().filter(event => event[1] === "contact_click").length, 0);
  assert.deepEqual(page.sent().filter(event => event[1] === "tenant_contact_click").map(event => [event[2].tenant, event[2].contact_method]), [["fagolli", "phone"], ["fagolli", "whatsapp"]]);
  assert.doesNotMatch(JSON.stringify([page.sent(), page.basicSent()]), /private@example.com|#private|601154078187|43-1|text=|query=/);
  page.controls.off.handlers.click();
  page.clickLink("tel:+601154078187");
  page.clickLink("https://wa.me/601154078187");
  assert.equal(page.basicSent().length, 9);
});

test("Total Tools referrals preserve consent and keep branch contacts out of analytics data", () => {
  const page = client({ saved: "detailed", locale: "en" });
  page.clickLink("/home-living/total-tools/");
  page.clickLink("/zh/home-living/total-tools/", ".locale-nav");
  page.clickLink("https://www.totaltools.com.my/?email=private@example.com#private");
  page.clickLink("https://www.totaltools.com.my/products?search=private@example.com");
  page.clickLink("https://www.totaltools.com.my/stores?address=private@example.com");
  page.clickLink("https://maps.app.goo.gl/a5rv2mVYV5JwENgX6?email=private@example.com");
  page.clickLink("https://biz.puchong.co/businesses/total-one-stop-tools-station-bestbuy-kinrara-bk4-bhk82/?email=private@example.com");
  page.clickLink("tel:+60102908007");
  assert.deepEqual(page.basicSent().map(event => event.name), ["navigation_click", "language_switch", "outbound_click", "outbound_click", "outbound_click", "directions_click", "outbound_click", "tenant_contact_click"]);
  assert.deepEqual(page.basicSent().map(event => event.data.target), ["/home-living/total-tools/", "zh", "total-tools:website", "total-tools:products", "total-tools:visit", "about", "biz.puchong.co", "total-tools:phone"]);
  assert.equal(page.sent().filter(event => event[1] === "contact_click").length, 0);
  assert.deepEqual(page.sent().filter(event => event[1] === "tenant_contact_click").map(event => [event[2].tenant, event[2].contact_method]), [["total-tools", "phone"]]);
  assert.doesNotMatch(JSON.stringify([page.sent(), page.basicSent()]), /private@example.com|#private|60102908007|a5rv2mVYV5JwENgX6|bhk82|search=|address=/);
  page.controls.off.handlers.click();
  page.clickLink("tel:+60102908007");
  page.clickLink("https://www.totaltools.com.my/products");
  assert.equal(page.basicSent().length, 8);
});

test("Baagus calls and official Waze links respect consent without leaking branch or query data", () => {
  const page = client({ saved: "detailed", locale: "en" });
  page.clickLink("/home-living/baagus/");
  page.clickLink("/ms/home-living/baagus/", ".locale-nav");
  page.clickLink("https://baagus.com/?email=private@example.com#private");
  page.clickLink("https://baagus.com/site/branchdetails?id=34&email=private@example.com");
  page.clickLink("https://baagus.com/site/curtains?search=private@example.com");
  page.clickLink("https://baagus.com/site/blind?search=private@example.com");
  page.clickLink("https://waze.com/ul/hw2832g40q?email=private@example.com#private");
  page.clickLink("https://www.google.com/maps/search/?api=1&query=Baagus+7+Jalan+TPK+2%2F8&email=private@example.com");
  page.clickLink("tel:+60102133173");
  assert.deepEqual(page.basicSent().map(event => event.name), ["navigation_click", "language_switch", "outbound_click", "outbound_click", "outbound_click", "outbound_click", "directions_click", "directions_click", "tenant_contact_click"]);
  assert.deepEqual(page.basicSent().map(event => event.data.target), ["/home-living/baagus/", "ms", "baagus:website", "baagus:visit", "baagus:curtains", "baagus:blinds", "about", "about", "baagus:phone"]);
  assert.deepEqual(page.sent().filter(event => event[1] === "directions_click").map(event => event[2].map_provider), ["waze", "google"]);
  assert.equal(page.sent().filter(event => event[1] === "contact_click").length, 0);
  assert.deepEqual(page.sent().filter(event => event[1] === "tenant_contact_click").map(event => [event[2].tenant, event[2].contact_method]), [["baagus", "phone"]]);
  assert.doesNotMatch(JSON.stringify([page.sent(), page.basicSent()]), /private@example.com|#private|60102133173|hw2832g40q|id=34|search=|query=/);
  page.controls.off.handlers.click();
  page.clickLink("tel:+60102133173");
  page.clickLink("https://waze.com/ul/hw2832g40q");
  assert.equal(page.basicSent().length, 9);
});

test("MK Curtain enquiries respect consent and exclude phone and query contents from analytics", () => {
  const page = client({ saved: "detailed", locale: "en" });
  page.clickLink("/home-living/mk-curtain/");
  page.clickLink("/zh/home-living/mk-curtain/", ".locale-nav");
  page.clickLink("https://www.mk.com.my/?email=private@example.com#private");
  page.clickLink("https://www.mk.com.my/find-nearest-branch?address=private@example.com");
  page.clickLink("https://www.mk.com.my/our-services?message=private@example.com");
  page.clickLink("https://www.google.com/maps/search/?api=1&query=MK+Curtain+11+Jalan+TPK+2%2F8&email=private@example.com");
  page.clickLink("tel:+60380747210");
  assert.deepEqual(page.basicSent().map(event => event.data.target), ["/home-living/mk-curtain/", "zh", "mk-curtain:website", "mk-curtain:visit", "mk-curtain:services", "about", "mk-curtain:phone"]);
  assert.equal(page.sent().filter(event => event[1] === "contact_click").length, 0);
  assert.deepEqual(page.sent().filter(event => event[1] === "tenant_contact_click").map(event => [event[2].tenant, event[2].contact_method]), [["mk-curtain", "phone"]]);
  assert.doesNotMatch(JSON.stringify([page.sent(), page.basicSent()]), /private@example.com|#private|60380747210|address=|message=|query=/);
  page.controls.off.handlers.click();
  page.clickLink("tel:+60380747210");
  page.clickLink("https://www.mk.com.my/our-services");
  assert.equal(page.basicSent().length, 7);
});

test("Signature links retain tenant attribution and exclude contact and query contents from analytics", () => {
  const page = client({ saved: "detailed", locale: "en" });
  page.clickLink("/home-living/signature/");
  page.clickLink("/ms/home-living/signature/", ".locale-nav");
  page.clickLink("https://signature.my/?email=private@example.com#private");
  page.clickLink("https://signature.my/locate-a-showroom/?address=private@example.com");
  page.clickLink("https://signature.my/kitchens/?message=private@example.com");
  page.clickLink("https://www.signature.my/wardrobes/?email=private@example.com");
  page.clickLink("https://maps.app.goo.gl/4SZVDi8fQY6deuf97?email=private@example.com#private");
  page.clickLink("tel:+60168133182");
  assert.deepEqual(page.basicSent().map(event => event.data.target), ["/home-living/signature/", "ms", "signature:website", "signature:visit", "signature:kitchens", "signature:wardrobes", "about", "signature:phone"]);
  assert.equal(page.sent().filter(event => event[1] === "contact_click").length, 0);
  assert.deepEqual(page.sent().filter(event => event[1] === "tenant_contact_click").map(event => [event[2].tenant, event[2].contact_method]), [["signature", "phone"]]);
  assert.doesNotMatch(JSON.stringify([page.sent(), page.basicSent()]), /private@example.com|#private|60168133182|4SZVDi8fQY6deuf97|address=|message=/);
  page.controls.off.handlers.click();
  page.clickLink("tel:+60168133182");
  page.clickLink("https://signature.my/kitchens/");
  assert.equal(page.basicSent().length, 8);
});

test("Choose Interior enquiries remain distinct from park social links and exclude query contents", () => {
  const page = client({ saved: "detailed", locale: "en" });
  page.clickLink("/home-living/choose-interior/");
  page.clickLink("/zh/home-living/choose-interior/", ".locale-nav");
  page.clickLink("https://www.instagram.com/chooseinterior.cid/?email=private@example.com#private");
  page.clickLink("https://www.instagram.com/chooseinterior.cid/p/CnQv4oOP5gF/?message=private@example.com");
  page.clickLink("https://www.google.com/maps/search/?api=1&query=21-1+Jalan+TPK+2%2F8&email=private@example.com");
  page.clickLink("https://www.instagram.com/tpkpark/");
  assert.deepEqual(page.basicSent().map(event => event.data.target), ["/home-living/choose-interior/", "zh", "choose-interior:instagram", "choose-interior:portfolio", "about", "instagram"]);
  assert.deepEqual(page.sent().filter(event => event[1] === "tenant_contact_click").map(event => [event[2].tenant, event[2].contact_method]), [["choose-interior", "instagram"]]);
  assert.equal(page.sent().filter(event => event[1] === "social_click").length, 1);
  assert.doesNotMatch(JSON.stringify([page.sent(), page.basicSent()]), /private@example.com|#private|CnQv4oOP5gF|21-1|email=|message=|query=/);
  page.controls.off.handlers.click();
  page.clickLink("https://www.instagram.com/chooseinterior.cid/");
  page.clickLink("https://www.instagram.com/chooseinterior.cid/p/CnQv4oOP5gF/");
  assert.equal(page.basicSent().length, 6);
});

test("Perodua sales, service and directions retain branch attribution without contact or location payloads", () => {
  const page = client({ saved: "detailed", locale: "en" });
  page.clickLink("/automotive/perodua-3s-kinrara/");
  page.clickLink("/ms/automotive/perodua-3s-kinrara/", ".locale-nav");
  page.clickLink("tel:+60332912266");
  page.clickLink("tel:+60332162255");
  page.clickLink("https://www.perodua3skinrara.com/?email=private@example.com");
  page.clickLink("https://www.perodua3skinrara.com/onlineservicebooking?plate=PRIVATE123#private");
  page.clickLink("https://maps.google.com/?daddr=3.047798,101.637174&email=private@example.com");
  page.clickLink("https://ul.waze.com/ul?ll=3.04748271%2C101.63726807&navigate=yes&email=private@example.com");
  assert.deepEqual(page.basicSent().map(event => event.data.target), ["/automotive/perodua-3s-kinrara/", "ms", "perodua-3s-kinrara:sales", "perodua-3s-kinrara:service", "perodua-3s-kinrara:website", "perodua-3s-kinrara:service_booking", "about", "about"]);
  assert.deepEqual(page.sent().filter(event => event[1] === "tenant_contact_click").map(event => [event[2].tenant, event[2].department]), [["perodua-3s-kinrara", "sales"], ["perodua-3s-kinrara", "service"]]);
  assert.deepEqual(page.sent().filter(event => event[1] === "directions_click").map(event => event[2].map_provider), ["google", "waze"]);
  assert.doesNotMatch(JSON.stringify([page.sent(), page.basicSent()]), /32912266|32162255|3\.047|101\.637|private@example.com|PRIVATE123|#private/);
  page.controls.off.handlers.click();
  page.clickLink("tel:+60332162255");
  page.clickLink("https://www.perodua3skinrara.com/onlineservicebooking");
  assert.equal(page.basicSent().length, 8);
});

test("Mazda branch actions exclude phone numbers, queries and location details and stop after opt-out", () => {
  const page = client({ saved: "detailed", locale: "en" });
  page.clickLink("/automotive/mazda-kinrara/");
  page.clickLink("/zh/automotive/mazda-kinrara/", ".locale-nav");
  page.clickLink("tel:+60380750812");
  page.clickLink("tel:+60380750813");
  page.clickLink("https://www.facebook.com/MazdaPersadaAuto/?email=private@example.com");
  page.clickLink("https://mazda.com.my/find-a-dealer/?email=private@example.com");
  page.clickLink("https://mazda.com.my/mazda-connect-test-drive-page/?plate=PRIVATE123#private");
  page.clickLink("https://www.google.com/maps/search/?api=1&query=Mazda+Persada+Auto+8+Jalan+TPK+2%2F2+47180+Puchong");
  page.clickLink("https://waze.com/ul/hw2832g1br?email=private@example.com");
  assert.deepEqual(page.basicSent().map(event => event.data.target), ["/automotive/mazda-kinrara/", "zh", "mazda-kinrara:phone", "mazda-kinrara:phone", "mazda-kinrara:facebook", "mazda-kinrara:dealer_locator", "mazda-kinrara:test_drive", "about", "about"]);
  assert.equal(page.sent().filter(event => event[1] === "tenant_contact_click" && event[2].tenant === "mazda-kinrara").length, 3);
  assert.deepEqual(page.sent().filter(event => event[1] === "directions_click").map(event => event[2].map_provider), ["google", "waze"]);
  assert.doesNotMatch(JSON.stringify([page.sent(), page.basicSent()]), /80750812|80750813|hw2832g1br|47180|private@example.com|PRIVATE123|#private/);
  page.controls.off.handlers.click();
  page.clickLink("tel:+60380750812");
  page.clickLink("https://www.facebook.com/MazdaPersadaAuto/");
  assert.equal(page.basicSent().length, 9);
});

test("Kia workshop actions keep contact and enquiry details out of analytics and respect opt-out", () => {
  const page = client({ saved: "detailed", locale: "en" });
  page.clickLink("/automotive/kia-4s-service/");
  page.clickLink("/ms/automotive/kia-4s-service/", ".locale-nav");
  page.clickLink("tel:+60380761005");
  page.clickLink("mailto:sales@kiapuchong.com.my?subject=PRIVATE123&body=private@example.com");
  page.clickLink("https://kiapuchong.com.my/?email=private@example.com#private");
  page.clickLink("https://kiapuchong.com.my/wp-content/uploads/2024/09/Kia-Puchong-Workshop-2.jpg");
  page.clickLink("https://www.kia.com/my/shopping-tools/find-a-dealer.html?plate=PRIVATE123#private");
  assert.deepEqual(page.basicSent().map(event => event.data.target), ["/automotive/kia-4s-service/", "ms", "kia-4s-service:phone", "kia-4s-service:email", "kia-4s-service:website", "kia-4s-service:photo", "kia-4s-service:dealer_locator"]);
  assert.deepEqual(page.sent().filter(event => event[1] === "tenant_contact_click").map(event => event[2].contact_method), ["phone", "email"]);
  assert.doesNotMatch(JSON.stringify([page.sent(), page.basicSent()]), /80761005|sales@|private@example.com|PRIVATE123|#private/);
  page.controls.off.handlers.click();
  page.clickLink("tel:+60380761005");
  page.clickLink("mailto:sales@kiapuchong.com.my");
  assert.equal(page.basicSent().length, 7);
});

test("Techtrics workshop actions exclude enquiry details from analytics and respect opt-out", () => {
  const page = client({ saved: "detailed", locale: "en" });
  page.clickLink("/automotive/techtrics-auto/");
  page.clickLink("/zh/automotive/techtrics-auto/", ".locale-nav");
  page.clickLink("tel:+60358916661");
  page.clickLink("tel:+60124496696");
  page.clickLink("mailto:info@mercedesworkshop.com.my?subject=PRIVATE123&body=private@example.com");
  page.clickLink("https://mercedesworkshop.com.my/?email=private@example.com#private");
  page.clickLink("https://mercedesworkshop.com.my/wp-content/uploads/2017/04/hq-1-1.png?plate=PRIVATE123");
  page.clickLink("https://ul.waze.com/ul?preview_venue_id=66584606.666108209.9699534&navigate=yes");
  assert.deepEqual(page.basicSent().map(event => event.data.target), ["/automotive/techtrics-auto/", "zh", "techtrics-auto:phone", "techtrics-auto:phone", "techtrics-auto:email", "techtrics-auto:website", "techtrics-auto:photo", "about"]);
  assert.deepEqual(page.sent().filter(event => event[1] === "tenant_contact_click").map(event => event[2].contact_method), ["phone", "phone", "email"]);
  assert.doesNotMatch(JSON.stringify([page.sent(), page.basicSent()]), /58916661|4496696|info@|private@example.com|PRIVATE123|#private|66584606/);
  page.controls.off.handlers.click();
  page.clickLink("tel:+60358916661");
  page.clickLink("mailto:info@mercedesworkshop.com.my");
  assert.equal(page.basicSent().length, 8);
});

test("Techtra course enquiries keep contact and student details out of analytics and respect opt-out", () => {
  const page = client({ saved: "detailed", locale: "en" });
  page.clickLink("/automotive/techtra-automotive-academy/");
  page.clickLink("/ms/automotive/techtra-automotive-academy/", ".locale-nav");
  page.clickLink("tel:+60182886565");
  page.clickLink("tel:+60183886565");
  page.clickLink("mailto:enquiry@techtraacademy.my?subject=PRIVATE123&body=private@example.com");
  page.clickLink("https://wa.me/60182886565?text=PRIVATE123%20private@example.com");
  page.clickLink("https://techtra.edu.my/?email=private@example.com#private");
  page.clickLink("https://techtra.edu.my/automotive-technology-courses/?student=PRIVATE123");
  page.clickLink("https://techtra.edu.my/wp-content/uploads/2023/02/Techtra-Automotive-Academy-Malaysia-11-min.jpg");
  assert.deepEqual(page.basicSent().map(event => event.data.target), ["/automotive/techtra-automotive-academy/", "ms", "techtra-automotive-academy:phone", "techtra-automotive-academy:phone", "techtra-automotive-academy:email", "techtra-automotive-academy:whatsapp", "techtra-automotive-academy:website", "techtra-automotive-academy:courses", "techtra-automotive-academy:photo"]);
  assert.deepEqual(page.sent().filter(event => event[1] === "tenant_contact_click").map(event => event[2].contact_method), ["phone", "phone", "email", "whatsapp"]);
  assert.doesNotMatch(JSON.stringify([page.sent(), page.basicSent()]), /182886565|183886565|enquiry@|private@example.com|PRIVATE123|#private/);
  page.controls.off.handlers.click();
  page.clickLink("tel:+60182886565");
  page.clickLink("https://wa.me/60182886565?text=PRIVATE123");
  assert.equal(page.basicSent().length, 9);
});

test("Jon Detailing enquiries exclude contact details and URL queries from analytics and respect opt-out", () => {
  const page = client({ saved: "detailed", locale: "en" });
  page.clickLink("/automotive/jon-detailing/");
  page.clickLink("/zh/automotive/jon-detailing/", ".locale-nav");
  page.clickLink("tel:+60126844034");
  page.clickLink("https://www.facebook.com/jondetailing/?message=PRIVATE123&email=private@example.com#private");
  page.clickLink("https://www.facebook.com/photo/?fbid=1905956784132823&set=pcb.1905956880799480&message=PRIVATE123#private");
  page.clickLink("https://www.google.com/maps/search/?api=1&query=Jon+Detailing+PRIVATE123");
  page.clickLink("https://www.waze.com/live-map/directions/my/selangor/puchong/jon-detailing?to=place.ChIJxwp1ZmxKzDERodc0zzgPgF8&message=PRIVATE123");
  assert.deepEqual(page.basicSent().map(event => event.data.target), ["/automotive/jon-detailing/", "zh", "jon-detailing:phone", "jon-detailing:facebook", "jon-detailing:photo", "about", "about"]);
  assert.deepEqual(page.sent().filter(event => event[1] === "tenant_contact_click").map(event => event[2].contact_method), ["phone", "facebook"]);
  assert.doesNotMatch(JSON.stringify([page.sent(), page.basicSent()]), /126844034|1905956784132823|1905956880799480|private@example.com|PRIVATE123|#private/);
  page.controls.off.handlers.click();
  page.clickLink("tel:+60126844034");
  page.clickLink("https://www.facebook.com/jondetailing/?message=PRIVATE123");
  assert.equal(page.basicSent().length, 7);
});

test("Jaecoo service enquiries exclude vehicle details and messages from analytics and respect opt-out", () => {
  const page = client({ saved: "detailed", locale: "en" });
  page.clickLink("/automotive/jaecoo-service-centre/");
  page.clickLink("/ms/automotive/jaecoo-service-centre/", ".locale-nav");
  page.clickLink("tel:+60193988817");
  page.clickLink("https://wa.me/60193988817?text=PRIVATE123%20private@example.com");
  page.clickLink("https://omodajaecoo.com.my/dealer-locator?registration=PRIVATE123#private");
  page.clickLink("https://www.omodajaecoo.com.my/news-events/inaugural-omoda-i-jaecoo-technical-skills-competition-spotlights-excellence-and-competitive-spirit?visitor=PRIVATE123");
  page.clickLink("https://www.google.com/maps/search/?api=1&query=Jaecoo+Apple+Autotech+PRIVATE123");
  page.clickLink("https://www.waze.com/ul?q=Jaecoo%20Kinrara%20PRIVATE123&navigate=yes");
  assert.deepEqual(page.basicSent().map(event => event.data.target), ["/automotive/jaecoo-service-centre/", "ms", "jaecoo-service-centre:phone", "jaecoo-service-centre:whatsapp", "jaecoo-service-centre:dealer_locator", "jaecoo-service-centre:photo", "about", "about"]);
  assert.deepEqual(page.sent().filter(event => event[1] === "tenant_contact_click").map(event => event[2].contact_method), ["phone", "whatsapp"]);
  assert.doesNotMatch(JSON.stringify([page.sent(), page.basicSent()]), /193988817|private@example.com|PRIVATE123|#private/);
  page.controls.off.handlers.click();
  page.clickLink("tel:+60193988817");
  page.clickLink("https://wa.me/60193988817?text=PRIVATE123");
  assert.equal(page.basicSent().length, 8);
});

test("Toyokar enquiries keep vehicle details, messages and email contents out of analytics and respect opt-out", () => {
  const page = client({ saved: "detailed", locale: "en" });
  page.clickLink("/automotive/toyokar/");
  page.clickLink("/zh/automotive/toyokar/", ".locale-nav");
  page.clickLink("tel:+60123856228");
  page.clickLink("https://wa.me/60123856228?text=PRIVATE123%20private@example.com");
  page.clickLink("mailto:info@toyokar.my?subject=PRIVATE123&body=private@example.com");
  page.clickLink("https://www.toyokar.my/?registration=PRIVATE123#private");
  page.clickLink("https://www.toyokar.my/gallery?visitor=PRIVATE123");
  page.clickLink("https://www.google.com/maps/search/?api=1&query=Toyokar+PRIVATE123");
  page.clickLink("https://www.waze.com/ul?q=Toyokar%20PRIVATE123&navigate=yes");
  assert.deepEqual(page.basicSent().map(event => event.data.target), ["/automotive/toyokar/", "zh", "toyokar:phone", "toyokar:whatsapp", "toyokar:email", "toyokar:website", "toyokar:gallery", "about", "about"]);
  assert.deepEqual(page.sent().filter(event => event[1] === "tenant_contact_click").map(event => event[2].contact_method), ["phone", "whatsapp", "email"]);
  assert.doesNotMatch(JSON.stringify([page.sent(), page.basicSent()]), /123856228|info@toyokar|private@example.com|PRIVATE123|#private/);
  page.controls.off.handlers.click();
  page.clickLink("tel:+60123856228");
  page.clickLink("https://wa.me/60123856228?text=PRIVATE123");
  page.clickLink("mailto:info@toyokar.my?body=PRIVATE123");
  assert.equal(page.basicSent().length, 9);
});

test("Forsee Lens website, directions and contacts retain tenant attribution without private data", () => {
  const page = client({ saved: "detailed", locale: "en" });
  page.clickLink("/lifestyle/forsee-lens/");
  page.clickLink("/zh/lifestyle/forsee-lens/", ".locale-nav");
  page.clickLink("https://forseelens.com/?email=private@example.com#private");
  page.clickLink("https://forseelens.com/lens-selector?name=PRIVATE123");
  page.clickLink("https://forseelens.com/myoboostplus?name=PRIVATE123");
  page.clickLink("https://www.google.com/maps/search/?api=1&query=Forsee+PRIVATE123");
  page.clickLink("tel:+60378000373");
  page.clickLink("mailto:cs_forsee@forsee.com.my?subject=PRIVATE123");
  page.clickLink("https://wa.me/60162057917?text=PRIVATE123");
  assert.deepEqual(page.basicSent().map(event => event.name), ["navigation_click", "language_switch", "outbound_click", "outbound_click", "outbound_click", "directions_click", "tenant_contact_click", "tenant_contact_click", "tenant_contact_click"]);
  assert.deepEqual(page.basicSent().slice(2, 5).map(event => event.data.target), ["forsee-lens:website", "forsee-lens:lens_selector", "forsee-lens:myoboost_plus"]);
  assert.equal(page.basicSent().at(-3).data.target, "forsee-lens:phone");
  assert.equal(page.basicSent().at(-2).data.target, "forsee-lens:email");
  assert.equal(page.basicSent().at(-1).data.target, "forsee-lens:whatsapp");
  assert.equal(page.sent().filter(event => event[1] === "contact_click").length, 0);
  assert.doesNotMatch(JSON.stringify([page.sent(), page.basicSent()]), /PRIVATE123|private@example.com|60378000373|60162057917|cs_forsee/);
  page.controls.off.handlers.click();
  page.clickLink("tel:+60378000373");
  assert.equal(page.basicSent().length, 9);
});

test("Aces Gymnastic Academy maps, Facebook and calls retain tenant attribution without private data", () => {
  const page = client({ saved: "detailed", locale: "en" });
  page.clickLink("/lifestyle/aces-gymnastic-academy/");
  page.clickLink("/zh/lifestyle/aces-gymnastic-academy/", ".locale-nav");
  page.clickLink("https://www.google.com/maps/search/?api=1&query=Aces+PRIVATE123&query_place_id=PRIVATE123");
  page.clickLink("https://www.waze.com/live-map/directions/my/selangor/puchong/aces-gymnastics-academy?to=place.PRIVATE123&message=private@example.com");
  page.clickLink("https://www.facebook.com/Acesgymnasticacademy?ref=PRIVATE123");
  page.clickLink("tel:+60103658213");
  assert.deepEqual(page.basicSent().map(event => event.name), ["navigation_click", "language_switch", "directions_click", "directions_click", "social_click", "tenant_contact_click"]);
  assert.deepEqual(page.basicSent().map(event => event.data.target), ["/lifestyle/aces-gymnastic-academy/", "zh", "about", "about", "aces-gymnastic-academy:facebook", "aces-gymnastic-academy:phone"]);
  assert.equal(page.sent().filter(event => event[1] === "contact_click").length, 0);
  assert.doesNotMatch(JSON.stringify([page.sent(), page.basicSent()]), /PRIVATE123|private@example.com|60103658213/);
  page.controls.off.handlers.click();
  page.clickLink("tel:+60103658213");
  assert.equal(page.basicSent().length, 6);
});

test("Optimum Swim School programme, directions and branch contacts remain attributable without private data", () => {
  const page = client({ saved: "detailed", locale: "en" });
  page.clickLink("/lifestyle/optimum-swim-school/");
  page.clickLink("/zh/lifestyle/optimum-swim-school/", ".locale-nav");
  page.clickLink("https://optimumswimschool.com/?email=private@example.com#private");
  page.clickLink("https://optimumswimschool.com/free-trial/?student=PRIVATE123");
  page.clickLink("https://optimumswimschool.com/learn-to-swim/?student=PRIVATE123");
  page.clickLink("https://www.google.com/maps/search/?api=1&query=Optimum+PRIVATE123");
  page.clickLink("https://www.waze.com/live-map/directions/my/selangor/puchong/optimum-swim-school-%40-puchong-kinrara-%28learn-to-swim-for-kids-and-adults%29?to=place.ChIJ1XiPLEdLzDER-U3WYmrZsdI&message=PRIVATE123");
  page.clickLink("tel:+60192848138");
  page.clickLink("tel:+60134808138");
  assert.deepEqual(page.basicSent().map(event => event.name), ["navigation_click", "language_switch", "outbound_click", "outbound_click", "outbound_click", "directions_click", "directions_click", "tenant_contact_click", "tenant_contact_click"]);
  assert.deepEqual(page.basicSent().slice(2, 5).map(event => event.data.target), ["optimum-swim-school:website", "optimum-swim-school:free_trial", "optimum-swim-school:learn_to_swim"]);
  assert.equal(page.basicSent().at(-2).data.target, "optimum-swim-school:phone");
  assert.equal(page.basicSent().at(-1).data.target, "optimum-swim-school:phone-alt");
  assert.equal(page.sent().filter(event => event[1] === "contact_click").length, 0);
  assert.doesNotMatch(JSON.stringify([page.sent(), page.basicSent()]), /PRIVATE123|private@example.com|60192848138|60134808138|ChIJ/);
  page.controls.off.handlers.click();
  page.clickLink("tel:+60192848138");
  assert.equal(page.basicSent().length, 9);
});

test("Yummy Nyonya Kitchen navigation, maps and calls retain tenant attribution without private URL data", () => {
  const page = client({ saved: "detailed", locale: "en" });
  page.clickLink("/lifestyle/yummy-nyonya-kitchen/");
  page.clickLink("/zh/lifestyle/yummy-nyonya-kitchen/", ".locale-nav");
  page.clickLink("https://www.google.com/maps/search/?api=1&query=Yummy+Nyonya+Kitchen+PRIVATE123&email=private@example.com#private");
  page.clickLink("https://www.waze.com/live-map/directions/yummy-nyonya-kitchen-jalan-tpk-28-puchong?to=place.w.66584606.666108209.5814230&message=PRIVATE123");
  page.clickLink("tel:+601111631126");
  page.clickLink("tel:+60108912102");
  assert.deepEqual(page.basicSent().map(event => event.name), ["navigation_click", "language_switch", "directions_click", "directions_click", "tenant_contact_click", "tenant_contact_click"]);
  assert.deepEqual(page.basicSent().map(event => event.data.target), ["/lifestyle/yummy-nyonya-kitchen/", "zh", "about", "about", "yummy-nyonya-kitchen:phone", "yummy-nyonya-kitchen:phone-alt"]);
  assert.equal(page.sent().filter(event => event[1] === "contact_click").length, 0);
  assert.equal(page.sent().at(-1)[2].tenant, "yummy-nyonya-kitchen");
  assert.doesNotMatch(JSON.stringify([page.sent(), page.basicSent()]), /PRIVATE123|private@example.com|601111631126|60108912102|5814230/);
  page.controls.off.handlers.click();
  page.clickLink("tel:+601111631126");
  assert.equal(page.basicSent().length, 6);
});

test("Nuarina menu, maps and calls stay attributable without leaking visitor data", () => {
  const page = client({ saved: "detailed", locale: "en" });
  page.clickLink("/lifestyle/nasi-lemak-nuarina/");
  page.clickLink("/ms/lifestyle/nasi-lemak-nuarina/", ".locale-nav");
  page.clickLink("https://www.foodpanda.my/restaurant/qq2q/nasi-lemak-nuarina-since-2010?order=PRIVATE123&email=private@example.com#private");
  page.clickLink("https://m.me/aafiyah2018?ref=private@example.com");
  page.clickLink("https://maps.app.goo.gl/G3W9LGDYd4kUX9qW9?private=private@example.com");
  page.clickLink("https://www.waze.com/ul?q=Nasi%20Lemak%20PRIVATE123&navigate=yes");
  page.clickLink("tel:+60122282290");
  assert.deepEqual(page.basicSent().map(event => event.name), ["navigation_click", "language_switch", "outbound_click", "outbound_click", "directions_click", "directions_click", "tenant_contact_click"]);
  assert.equal(page.basicSent()[2].data.target, "nasi-lemak-nuarina:menu");
  assert.equal(page.basicSent()[3].data.target, "nasi-lemak-nuarina:facebook");
  assert.equal(page.basicSent().at(-1).data.target, "nasi-lemak-nuarina:phone");
  assert.equal(page.sent().at(-1)[2].tenant, "nasi-lemak-nuarina");
  assert.doesNotMatch(JSON.stringify([page.sent(), page.basicSent()]), /PRIVATE123|private@example.com|60122282290|G3W9LG/);
  page.controls.off.handlers.click();
  page.clickLink("tel:+60122282290");
  assert.equal(page.basicSent().length, 7);
});

test("Jazmina Bistro menu and directions stay attributable without leaking URL details", () => {
  const page = client({ saved: "detailed", locale: "en" });
  page.clickLink("/lifestyle/jazmina-bistro/");
  page.clickLink("/ms/lifestyle/jazmina-bistro/", ".locale-nav");
  page.clickLink("https://www.foodpanda.my/restaurant/rlie/jazmina-bistro-rlie?order=PRIVATE123&email=private@example.com#private");
  page.clickLink("https://www.google.com/maps/search/?api=1&query=Jazmina+Bistro+PRIVATE123");
  page.clickLink("https://www.waze.com/ul?q=Jazmina%20Bistro%20PRIVATE123&navigate=yes");
  assert.deepEqual(page.basicSent().map(event => event.data.target), ["/lifestyle/jazmina-bistro/", "ms", "jazmina-bistro:menu", "about", "about"]);
  assert.deepEqual(page.sent().filter(event => event[1] === "directions_click").map(event => event[2].map_provider), ["google", "waze"]);
  assert.doesNotMatch(JSON.stringify([page.sent(), page.basicSent()]), /PRIVATE123|private@example.com|#private|order=|query=/);
  page.controls.off.handlers.click();
  page.clickLink("https://www.foodpanda.my/restaurant/rlie/jazmina-bistro-rlie?order=PRIVATE123");
  assert.equal(page.basicSent().length, 5);
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
    for (const action of ["open", "question", "answer", "draft_ready", "voice_start", "voice_ready", "listen_start", "error"]) page.assistant({ action, reason: "timeout", question: "private@example.com", answer: "Secret", draft: "Confidential", transcript: "Do not collect" });
    assert.equal(page.basicSent().length, basic ? 8 : 0);
    assert.equal(page.sent().filter(e => e[1].startsWith("assistant_")).length, detailed ? 8 : 0);
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
