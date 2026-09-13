import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { jadeExhibitionLastModified } from "./site-data.mjs";

const root = process.cwd();
const origin = "https://www.tpkpark.com";
const pages = [
  { locale: "en", path: "/wong-shung-yen/jade-exhibition-2024/", profile: "/wong-shung-yen/", record: "/wong-shung-yen/public-record/", must: ["Co-Curator", "National Art Gallery", "Malaysia–China", "Oriental Daily", "Kwong Wah Yit Poh"] },
  { locale: "ms", path: "/ms/wong-shung-yen/jade-exhibition-2024/", profile: "/ms/wong-shung-yen/", record: "/ms/wong-shung-yen/public-record/", must: ["Kurator Bersama", "Balai Seni Negara", "Malaysia–China", "Oriental Daily", "Kwong Wah Yit Poh"] },
  { locale: "zh", path: "/zh/wong-shung-yen/jade-exhibition-2024/", profile: "/zh/wong-shung-yen/", record: "/zh/wong-shung-yen/public-record/", must: ["联合策展人", "国家美术馆", "马中建交50周年", "东方日报", "光华日报"] },
];

function fileFor(pathname) {
  return join(root, pathname.slice(1), "index.html");
}

for (const page of pages) {
  const html = await readFile(fileFor(page.path), "utf8");
  assert.ok(html.includes(`<link rel="canonical" href="${origin}${page.path}">`), `${page.locale}: canonical missing`);
  assert.ok(html.includes('"@type":"ExhibitionEvent"'), `${page.locale}: ExhibitionEvent schema missing`);
  assert.ok(html.includes('"name":"Wong Shung Yen"'), `${page.locale}: Person entity missing`);
  assert.ok(html.includes("Dr Low Cheong Sin"), `${page.locale}: co-curator context missing`);
  assert.ok(html.includes("2024-11-23") && html.includes("2024-12-23"), `${page.locale}: exhibition dates missing`);
  assert.ok(html.includes("https://www.artgallery.gov.my/wp-content/uploads/2024/11/MEDIA-RELEASE-JADE-EXHIBITION.pdf"), `${page.locale}: official source missing`);
  assert.ok(html.includes("https://www.orientaldaily.com.my/news/nation/2024/11/25/695335"), `${page.locale}: Chinese media source missing`);
  assert.ok(html.includes("https://www.facebook.com/MalaysianChineseCulturalSocietyMCCS/posts/595099459531826/"), `${page.locale}: organiser source missing`);
  for (const term of page.must) assert.ok(html.includes(term), `${page.locale}: missing ${term}`);
  assert.doesNotMatch(html, /Wong Shung Yen['’]s (?:113|jade) (?:works|collection)|黄松延(?:个人)?收藏的113|koleksi 113 karya milik Wong/i, `${page.locale}: ownership overclaim detected`);

  const profile = await readFile(fileFor(page.profile), "utf8");
  const record = await readFile(fileFor(page.record), "utf8");
  assert.ok(profile.includes(`href="${page.path}"`), `${page.locale}: profile does not link to jade page`);
  assert.ok(record.includes(`href="${page.path}"`), `${page.locale}: public record does not link to jade page`);
  assert.ok(profile.includes("Cultural exhibition curation"), `${page.locale}: profile schema was not enriched`);
}

const sitemap = await readFile(join(root, "sitemap.xml"), "utf8");
for (const page of pages) {
  assert.ok(sitemap.includes(`<loc>${origin}${page.path}</loc>`), `${page.locale}: sitemap entry missing`);
  assert.ok(sitemap.includes(`href="${origin}${page.path}"`), `${page.locale}: sitemap hreflang target missing`);
}
assert.ok(sitemap.match(new RegExp(`<lastmod>${jadeExhibitionLastModified}</lastmod>`, "g"))?.length >= 3, "jade sitemap lastmod missing");

console.log("Jade exhibition profile validation passed for EN, BM and ZH.");
