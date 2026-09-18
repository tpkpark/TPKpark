import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import * as base from "./site-data-base.mjs";
import { origin, routePath, seoTitles, site } from "./site-data.mjs";

const chineseName = "金銮工业园";
const cases = {
  en: {
    note: "TPK Park and Taman Perindustrian Kinrara are names for the same place, also known in Chinese as 金銮工业园.",
    scope: "under its management."
  },
  ms: {
    note: "TPK Park dan Taman Perindustrian Kinrara merujuk kepada tempat yang sama, yang turut dikenali sebagai 金銮工业园 dalam bahasa Cina.",
    scope: "di bawah pengurusannya."
  }
};

function count(text, value) {
  return text.split(value).length - 1;
}

function plainText(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#0*39;|&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

for (const [locale, expected] of Object.entries(cases)) {
  const page = site[locale].pages.about;
  assert.ok(page.lead.startsWith(expected.note), `${locale}: expected naming sentence`);
  assert.equal(count(page.lead, chineseName), 1, `${locale}: only one Chinese-name mention in the introduction`);
  assert.ok(page.lead.endsWith(expected.scope), `${locale}: preserve company management scope`);
  assert.ok(page.title.includes("TPK Park") && page.title.includes("Taman Perindustrian Kinrara"), `${locale}: identify the same place in the heading`);
  assert.ok(!page.title.includes(chineseName), `${locale}: no Chinese place name in the heading`);
  assert.equal(seoTitles[locale].about, base.seoTitles[locale].about, `${locale}: retain the existing SEO title`);
  assert.equal(page.description, base.site[locale].pages.about.description, `${locale}: retain About metadata`);
  assert.deepEqual(page.blocks, base.site[locale].pages.about.blocks, `${locale}: retain the existing About content blocks`);
  assert.deepEqual(page.cta, base.site[locale].pages.about.cta, `${locale}: retain leasing links`);

  const filename = join(process.cwd(), routePath(locale, "about").replace(/^\/+|\/+$/g, ""), "index.html");
  const html = await readFile(filename, "utf8");
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1];
  assert.ok(main, `${locale}: generated About page has main content`);
  const visible = plainText(main);
  assert.ok(visible.includes(expected.note), `${locale}: naming explanation is server-rendered`);
  assert.equal(count(visible, chineseName), 1, `${locale}: exactly one visible Chinese-name mention`);
  assert.ok(visible.includes(expected.scope), `${locale}: company scope remains visible`);

  const canonical = [...html.matchAll(/<link\b[^>]*>/gi)]
    .map(match => match[0])
    .find(tag => /\brel=["']canonical["']/i.test(tag));
  assert.ok(canonical?.includes(`${origin}${routePath(locale, "about")}`), `${locale}: preserve canonical URL`);
  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? "";
  assert.ok(!title.includes(chineseName), `${locale}: no Chinese place name in the browser title`);

  // The existing structured-data alternateName is not visible body copy and is
  // intentionally retained. This check guards against adding Chinese place-name
  // text to other English/Malay page data as a side effect of the clarification.
  for (const [routeId, baseline] of Object.entries(base.site[locale].pages)) {
    if (routeId === "about") continue;
    assert.equal(
      count(JSON.stringify(site[locale].pages[routeId]), chineseName),
      count(JSON.stringify(baseline), chineseName),
      `${locale}/${routeId}: no additional Chinese place-name text`
    );
  }
}

assert.deepEqual(site.zh.pages.about, base.site.zh.pages.about, "Chinese About content is unchanged");
assert.deepEqual(site.ms.pages.home, base.site.ms.pages.home, "Malay homepage content is unchanged");
assert.deepEqual(site.zh.pages.home, base.site.zh.pages.home, "Chinese homepage content is unchanged");
assert.ok(site.en.pages.home.description.includes("TPK Park (Taman Perindustrian Kinrara)"), "English homepage description identifies synonymous names");
assert.ok(!site.en.pages.home.description.includes("TPK Park at Kinrara Industrial Park"), "Do not imply nested places");
console.log("Place-name validation passed: EN/MS About naming, restrained Chinese reference, company scope and unchanged surrounding content.");
