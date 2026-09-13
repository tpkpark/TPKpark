import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const pages = [
  { locale: "en", jade: "/wong-shung-yen/jade-exhibition-2024/", profile: "/wong-shung-yen/", record: "/wong-shung-yen/public-record/", title: "Wong Shung Yen | 2024 National Art Gallery Jade Co-Curator", description: "Explore the 2024 National Art Gallery jade exhibition, co-curated by Wong Shung Yen, with exhibition details, media coverage and catalogue information." },
  { locale: "ms", jade: "/ms/wong-shung-yen/jade-exhibition-2024/", profile: "/ms/wong-shung-yen/", record: "/ms/wong-shung-yen/public-record/", title: "Wong Shung Yen | Kurator Bersama Pameran Jed 2024", description: "Kenali pameran jed Balai Seni Negara 2024 dengan Wong Shung Yen sebagai kurator bersama, termasuk butiran pameran, liputan media dan maklumat katalog." },
  { locale: "zh", jade: "/zh/wong-shung-yen/jade-exhibition-2024/", profile: "/zh/wong-shung-yen/", record: "/zh/wong-shung-yen/public-record/", title: "黄松延｜2024国家美术馆《璀璨千年》古玉展联合策展人", description: "了解黄松延担任联合策展人的2024年国家美术馆《璀璨千年》古玉展，包括展览背景、媒体报道、学术支持及展览图录。" },
];

function fileFor(pathname) {
  return join(root, pathname.slice(1), "index.html");
}

function mainText(html) {
  return html.match(/<main id="main">([\s\S]*?)<\/main>/)?.[1] || "";
}

for (const page of pages) {
  const jade = await readFile(fileFor(page.jade), "utf8");
  const profile = await readFile(fileFor(page.profile), "utf8");
  const record = await readFile(fileFor(page.record), "utf8");

  assert.ok(jade.includes(`<title>${page.title}</title>`), `${page.locale}: refined title missing`);
  assert.ok(jade.includes(`<meta name="description" content="${page.description}">`), `${page.locale}: refined description missing`);
  assert.ok(jade.includes('<meta name="twitter:title" content="'), `${page.locale}: twitter title metadata malformed`);
  assert.ok(jade.match(/alt="TPK Park"/g)?.length >= 2, `${page.locale}: brand logo alt text not refined`);

  for (const [label, html] of [["jade", jade], ["profile", profile], ["record", record]]) {
    const visible = mainText(html);
    assert.doesNotMatch(visible, /Dr Low(?: Cheong Sin)?|刘创新博士/, `${page.locale} ${label}: other curator remains in visible copy`);
  }

  if (page.locale === "zh") {
    assert.ok(jade.includes("关于展览") && jade.includes("学术支持与展览图录"), "zh: exhibition background missing");
    assert.ok(jade.includes("古玉与工艺") && jade.includes("马中建交50周年") && jade.includes("媒体报道"), "zh: exhibition overview cards missing");
  }
}

assert.ok(pages[0].title.length <= 60, "en title remains too long");
assert.ok(pages[1].title.length <= 60, "ms title remains too long");
assert.ok(pages[0].description.length <= 160, "en description remains too long");
assert.ok(pages[1].description.length <= 160, "ms description remains too long");

console.log("Jade exhibition visible-copy refinement validation passed for EN, BM and ZH.");
