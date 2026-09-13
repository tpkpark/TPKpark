import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const sourcePage = "https://dewanbudaya.jendeladbp.my/2024/11/25/10670/";
const pages = [
  { locale: "en", path: "/wong-shung-yen/jade-exhibition-2024/", caption: "Wong Shung Yen at the 2024 National Art Gallery jade exhibition during an official gallery visit." },
  { locale: "ms", path: "/ms/wong-shung-yen/jade-exhibition-2024/", caption: "Wong Shung Yen di Pameran Batu Jed Balai Seni Negara 2024 semasa lawatan rasmi di galeri." },
  { locale: "zh", path: "/zh/wong-shung-yen/jade-exhibition-2024/", caption: "黄松延于2024年国家美术馆古玉展展场，摄于官方参观展览期间。" },
];

const assetDir = join(root, "assets", "wong-shung-yen");
const files = await readdir(assetDir);
const photo = files.find((name) => /^jade-gallery-visit\.(?:jpg|jpeg|png|webp)$/i.test(name));
assert.ok(photo, "Bundled jade gallery photo is missing");
const photoPath = join(assetDir, photo);
assert.ok((await stat(photoPath)).size >= 15000, "Bundled jade gallery photo is unexpectedly small");
const publicPath = `/assets/wong-shung-yen/${photo}`;

const provenance = JSON.parse(await readFile(join(assetDir, "jade-gallery-visit-source.json"), "utf8"));
assert.equal(provenance.sourcePage, sourcePage, "Photo provenance source page is incorrect");
assert.equal(provenance.publicPath, publicPath, "Photo provenance public path is incorrect");
assert.match(provenance.originalImageUrl, /^https?:\/\//, "Original media image URL was not recorded");

for (const page of pages) {
  const file = join(root, page.path.slice(1), "index.html");
  const html = await readFile(file, "utf8");
  assert.ok(html.includes("data-jade-gallery-photo"), `${page.locale}: gallery photo section missing`);
  assert.ok(html.includes(`src="${publicPath}"`), `${page.locale}: gallery photo is not bundled locally`);
  assert.ok(html.includes(page.caption), `${page.locale}: localized gallery caption missing`);
  assert.ok(html.includes(`href="${sourcePage}"`), `${page.locale}: DBP source link missing`);
  assert.ok(html.includes("Dewan Budaya / JendelaDBP"), `${page.locale}: photo source credit missing`);
  assert.doesNotMatch(html, /<img[^>]+src="https?:\/\/(?:dewanbudaya\.jendeladbp\.my|[^\"]*suara\.tv)[^"]*"/i, `${page.locale}: gallery photo is hotlinked instead of bundled`);

  const main = html.match(/<main id="main">([\s\S]*?)<\/main>/)?.[1] || "";
  assert.ok(main.includes("data-jade-gallery-photo"), `${page.locale}: gallery photo is outside the visible main content`);
  assert.doesNotMatch(main, /Dr\.? Low Cheong Sin|刘创新博士/, `${page.locale}: other curator's name reappeared in visible copy`);
}

console.log(`Jade gallery photo validation passed for EN, BM and ZH using ${photo}.`);
