import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";
import { site, routePath, routeLastModified } from "./site-data.mjs";
import { sources } from "../lib/assistant-knowledge.mjs";

const email = "enquiry@techtra.edu.my";
const whatsapp = "https://wa.me/60124496696";
const brands = ["Lamborghini", "Ferrari", "McLaren", "Mercedes-Benz", "BMW", "Audi", "Porsche", "MINI", "Volkswagen"];
const hours = [
  { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:30", closes: "17:30" },
  { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "15:00" }
];

for (const locale of ["en", "ms", "zh"]) {
  const workshop = site[locale].pages.techtricsAuto;
  const academy = site[locale].pages.techtraAcademy;
  const workshopVisit = workshop.blocks.find(block => block.type === "businessVisit");
  const academyVisit = academy.blocks.find(block => block.type === "businessVisit");
  const overview = workshop.blocks.find(block => block.type === "split");
  for (const brand of brands) assert.ok(overview.text.includes(brand), `${locale}: missing ${brand}`);
  assert.deepEqual(workshop.business.openingHoursSpecification, hours);
  assert.equal(workshop.cta.url, whatsapp);
  assert.ok(workshopVisit.contacts.some(contact => contact.url === whatsapp));
  assert.ok(workshopVisit.contacts.some(contact => contact.url === "tel:+60358916661"));
  assert.ok(workshopVisit.contacts.some(contact => contact.url === "tel:+60124496696"));
  assert.equal(academy.business.email, email);
  assert.ok(academyVisit.contacts.some(contact => contact.value === email && contact.url === `mailto:${email}`));
  assert.doesNotMatch(JSON.stringify(academy), /enquiry@techtraacademy\.my/);
  assert.ok(sources.techtraAcademy.texts[locale].includes(email));
  assert.doesNotMatch(sources.techtraAcademy.texts[locale], /enquiry@techtraacademy\.my/);
  assert.ok(sources.techtricsAuto.texts[locale].includes("Lamborghini"));
  assert.ok(sources.techtricsAuto.texts[locale].includes("WhatsApp"));

  const visitHours = {
    en: /Monday–Friday, 8:30am–5:30pm; Saturday, 9:00am–3:00pm/,
    ms: /Isnin–Jumaat, 8:30 pagi–5:30 petang; Sabtu, 9:00 pagi–3:00 petang/,
    zh: /星期一至星期五，上午8:30至下午5:30；星期六，上午9:00至下午3:00/
  }[locale];
  assert.match(workshopVisit.text, visitHours);
  assert.match(sources.techtricsAuto.texts[locale], visitHours);
  assert.equal(workshop.heroImage, "https://www.tpkpark.com/assets/images/techtrics-auto-exterior-1280.webp");
  assert.equal(academy.heroImage, "https://www.tpkpark.com/assets/images/techtra-automotive-training-1280.webp");

  for (const [route, profile] of [["techtricsAuto", workshop], ["techtraAcademy", academy]]) {
    assert.deepEqual(profile.blocks.map(block => block.type), ["split", "cards", "businessVisit"]);
    assert.equal(profile.blocks[0].route, "automotive");
    assert.equal(profile.blocks[1].alignHeadings, true);
    assert.equal(profile.blocks[1].items.length, 3);
    assert.equal(routeLastModified[route], "2026-09-19");
    const html = await readFile(new URL(`..${routePath(locale, route)}index.html`, import.meta.url), "utf8");
    assert.match(html, /class="business-guide"/);
    assert.ok(html.includes(`https://www.tpkpark.com${routePath(locale, route)}`));
    if (route === "techtraAcademy") {
      assert.ok(html.includes(`mailto:${email}`));
      assert.ok(html.includes(`"email":"${email}"`));
      assert.doesNotMatch(html, /enquiry@techtraacademy\.my/);
    } else {
      assert.ok(html.includes(whatsapp));
      assert.ok(html.includes('"opens":"08:30","closes":"17:30"'));
      assert.ok(html.includes('"opens":"09:00","closes":"15:00"'));
    }
  }
}

assert.match(site.en.pages.techtricsAuto.lead, /specialising in European and continental vehicles/);
assert.match(site.en.pages.techtraAcademy.lead, /primary focus on European vehicle technology/);
assert.match(site.zh.pages.techtraAcademy.lead, /课程以欧系汽车技术为主要学习方向/);
assert.match(site.en.pages.techtraAcademy.blocks[0].text, /automotive refinishing courses, and short-term technical training programmes/);
assert.match(site.zh.pages.techtraAcademy.blocks[0].text, /汽车维修技术课程、汽车喷漆课程及短期技术培训课程/);
assert.match(site.zh.pages.techtraAcademy.blocks[1].items[1].text, /向课程顾问了解课程大纲/);
assert.equal(site.zh.pages.techtricsAuto.blocks[1].items[0].text, "准备好车型、年份、行驶里程及保养记录。预约前，先确认建议进行的保养项目、报价包含的内容及预计维修时间，并确认送车与取车安排，方便提前规划行程。");

// Exercise the real analytics click handler without network calls or visitor data.
const handlers = {};
const window = { location: new URL("https://www.tpkpark.com/"), addEventListener() {} };
const document = {
  currentScript: { dataset: { measurementId: "G-TEST1", canonical: "https://www.tpkpark.com/automotive/techtrics-auto/", locale: "en", route: "techtricsAuto" } },
  querySelector() { return null; },
  addEventListener(name, callback) { handlers[name] = callback; },
  createElement() { return {}; }, head: { appendChild() {} }, referrer: "", cookie: ""
};
const analytics = await readFile(new URL("../js/analytics.js", import.meta.url), "utf8");
vm.runInNewContext(analytics, {
  window, document, location: window.location, navigator: {}, URL,
  localStorage: { getItem() { return "detailed"; }, setItem() {} }
});
for (const href of [
  "mailto:enquiry@techtra.edu.my?subject=PRIVATE123&body=private@example.com",
  "https://wa.me/60124496696?text=PRIVATE123"
]) {
  const link = { getAttribute() { return href; }, closest() { return null; } };
  handlers.click({ target: { closest() { return link; } } });
}
const events = window.dataLayer.map(args => Array.from(args)).filter(args => args[0] === "event" && args[1] === "tenant_contact_click");
assert.equal(events.length, 2);
assert.equal(events[0][2].tenant, "techtra-automotive-academy");
assert.equal(events[0][2].contact_method, "email");
assert.equal(events[1][2].tenant, "techtrics-auto");
assert.equal(events[1][2].contact_method, "whatsapp");
assert.doesNotMatch(JSON.stringify(events), /PRIVATE123|private@example\.com|60124496696|enquiry@/);
console.log("Furnished automotive revisions validated: six pages, schema, assistant knowledge and private contact analytics.");
