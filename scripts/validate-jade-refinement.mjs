import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const pages = [
  { locale: "en", jade: "/wong-shung-yen/jade-exhibition-2024/", profile: "/wong-shung-yen/", record: "/wong-shung-yen/public-record/", title: "Wong Shung Yen | 2024 National Art Gallery Jade Co-Curator", description: "Source-led record of Wong Shung Yen’s co-curatorial role in the 2024 National Art Gallery jade exhibition marking 50 years of Malaysia–China relations." },
  { locale: "ms", jade: "/ms/wong-shung-yen/jade-exhibition-2024/", profile: "/ms/wong-shung-yen/", record: "/ms/wong-shung-yen/public-record/", title: "Wong Shung Yen | Kurator Bersama Pameran Jed 2024", description: "Rekod berasaskan sumber mengenai peranan Wong Shung Yen sebagai kurator bersama pameran jed Balai Seni Negara 2024 sempena 50 tahun hubungan Malaysia–China." },
  { locale: "zh", jade: "/zh/wong-shung-yen/jade-exhibition-2024/", profile: "/zh/wong-shung-yen/", record: "/zh/wong-shung-yen/public-record/", title: "黄松延｜2024国家美术馆《璀璨千年》古玉展联合策展人", description: "整理黄松延担任2024年国家美术馆《璀璨千年—不朽与繁荣之美》古玉展联合策展人的官方与媒体记录。展览配合马中建交50周年举行，获英语、中文及马来语媒体广泛报道。" },
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
    assert.ok(jade.includes("从古玉研究到当代文化交流"), "zh: expanded exhibition context missing");
    assert.ok(jade.includes("策展工作的重点") && jade.includes("跨语言的公共记录") && jade.includes("展览的文化脉络"), "zh: expanded cultural context cards missing");
  }
}

assert.ok(pages[0].title.length <= 60, "en title remains too long");
assert.ok(pages[1].title.length <= 60, "ms title remains too long");
assert.ok(pages[0].description.length <= 160, "en description remains too long");
assert.ok(pages[1].description.length <= 160, "ms description remains too long");

console.log("Jade exhibition visible-copy refinement validation passed for EN, BM and ZH.");
