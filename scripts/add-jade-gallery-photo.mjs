import { mkdir, readFile, writeFile, readdir, stat } from "node:fs/promises";
import { dirname, extname, join } from "node:path";

const root = process.cwd();
const sourcePage = "https://dewanbudaya.jendeladbp.my/2024/11/25/10670/";
const jinaPage = `https://r.jina.ai/http://dewanbudaya.jendeladbp.my/2024/11/25/10670/`;
const captionNeedle = "turut mengambil peluang mengunjungi pameran";
const assetDir = join(root, "assets", "wong-shung-yen");

const pages = {
  en: {
    path: "/wong-shung-yen/jade-exhibition-2024/",
    alt: "Wong Shung Yen inside the 2024 National Art Gallery jade exhibition during an official gallery visit",
    caption: "Wong Shung Yen at the 2024 National Art Gallery jade exhibition during an official gallery visit.",
    source: "Photo: Dewan Budaya / JendelaDBP",
  },
  ms: {
    path: "/ms/wong-shung-yen/jade-exhibition-2024/",
    alt: "Wong Shung Yen di dalam pameran jed Balai Seni Negara 2024 semasa lawatan rasmi di galeri",
    caption: "Wong Shung Yen di Pameran Batu Jed Balai Seni Negara 2024 semasa lawatan rasmi di galeri.",
    source: "Foto: Dewan Budaya / JendelaDBP",
  },
  zh: {
    path: "/zh/wong-shung-yen/jade-exhibition-2024/",
    alt: "黄松延于2024年国家美术馆古玉展展场，摄于官方参观展览期间",
    caption: "黄松延于2024年国家美术馆古玉展展场，摄于官方参观展览期间。",
    source: "图片：Dewan Budaya / JendelaDBP",
  },
};

function decodeEntities(value = "") {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&#038;", "&")
    .replaceAll("&#38;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#039;", "'");
}

function absoluteUrl(value, base = sourcePage) {
  const clean = decodeEntities(value.trim());
  if (!clean || clean.startsWith("data:")) return null;
  if (clean.startsWith("//")) return `https:${clean}`;
  try { return new URL(clean, base).href; } catch { return null; }
}

function bestFromSrcset(srcset) {
  if (!srcset) return null;
  const candidates = decodeEntities(srcset).split(",").map((part) => {
    const bits = part.trim().split(/\s+/);
    const width = Number.parseInt(bits[1] || "0", 10) || 0;
    return { url: bits[0], width };
  }).filter((item) => item.url);
  candidates.sort((a, b) => b.width - a.width);
  return candidates[0]?.url || null;
}

function extractAttr(tag, name) {
  const match = tag.match(new RegExp(`\\b${name}=["']([^"']+)["']`, "i"));
  return match?.[1] || null;
}

function imageFromTag(tag) {
  if (!tag) return null;
  const srcset = extractAttr(tag, "srcset") || extractAttr(tag, "data-srcset");
  const candidates = [
    bestFromSrcset(srcset),
    extractAttr(tag, "data-lazy-src"),
    extractAttr(tag, "data-src"),
    extractAttr(tag, "data-original"),
    extractAttr(tag, "src"),
  ];
  for (const candidate of candidates) {
    const url = candidate && absoluteUrl(candidate);
    if (url) return { url, width: extractAttr(tag, "width"), height: extractAttr(tag, "height") };
  }
  return null;
}

function extractImageFromHtml(html) {
  const lower = html.toLowerCase();
  const index = lower.indexOf(captionNeedle);
  if (index < 0) return null;
  const before = html.slice(Math.max(0, index - 20000), index);
  const figureStart = before.toLowerCase().lastIndexOf("<figure");
  const scope = figureStart >= 0 ? before.slice(figureStart) : before.slice(-8000);
  const tags = [...scope.matchAll(/<img\b[^>]*>/gi)].map((match) => match[0]);
  return imageFromTag(tags.at(-1));
}

function extractImageFromMarkdown(markdown) {
  const lower = markdown.toLowerCase();
  const index = lower.indexOf(captionNeedle);
  if (index < 0) return null;
  const before = markdown.slice(Math.max(0, index - 12000), index);
  const images = [...before.matchAll(/!\[[^\]]*\]\((https?:\/\/[^\s)]+)(?:\s+"[^"]*")?\)/gi)];
  const url = images.at(-1)?.[1];
  return url ? { url: decodeEntities(url), width: null, height: null } : null;
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: {
      "user-agent": "Mozilla/5.0 (compatible; TPKParkSite/1.0; +https://www.tpkpark.com)",
      "accept": "text/html,application/xhtml+xml,text/plain;q=0.9,*/*;q=0.8",
      "accept-language": "en-MY,en;q=0.9,ms;q=0.8,zh;q=0.7",
    },
  });
  if (!response.ok) throw new Error(`${url} returned ${response.status}`);
  return response.text();
}

async function resolvePhoto() {
  try {
    const html = await fetchText(sourcePage);
    const found = extractImageFromHtml(html);
    if (found) return { ...found, via: "publisher-html" };
  } catch (error) {
    console.warn(`Direct DBP fetch unavailable: ${error.message}`);
  }

  const markdown = await fetchText(jinaPage);
  const found = extractImageFromMarkdown(markdown);
  if (!found) throw new Error("Could not resolve the gallery-visit image from the DBP article");
  return { ...found, via: "jina-fallback" };
}

function extensionFor(contentType, url) {
  const type = (contentType || "").toLowerCase();
  if (type.includes("image/jpeg")) return ".jpg";
  if (type.includes("image/png")) return ".png";
  if (type.includes("image/webp")) return ".webp";
  const ext = extname(new URL(url).pathname).toLowerCase();
  if ([".jpg", ".jpeg", ".png", ".webp"].includes(ext)) return ext === ".jpeg" ? ".jpg" : ext;
  throw new Error(`Unsupported image type: ${contentType || "unknown"}`);
}

async function downloadPhoto(photo) {
  const response = await fetch(photo.url, {
    headers: {
      "user-agent": "Mozilla/5.0 (compatible; TPKParkSite/1.0; +https://www.tpkpark.com)",
      "referer": sourcePage,
      "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    },
  });
  if (!response.ok) throw new Error(`Photo fetch returned ${response.status}`);
  const bytes = new Uint8Array(await response.arrayBuffer());
  if (bytes.byteLength < 15000) throw new Error(`Resolved photo is unexpectedly small (${bytes.byteLength} bytes)`);
  const ext = extensionFor(response.headers.get("content-type"), photo.url);
  await mkdir(assetDir, { recursive: true });
  for (const name of await readdir(assetDir).catch(() => [])) {
    if (/^jade-gallery-visit\.(?:jpg|jpeg|png|webp)$/i.test(name)) {
      await import("node:fs/promises").then(({ unlink }) => unlink(join(assetDir, name)).catch(() => {}));
    }
  }
  const filename = `jade-gallery-visit${ext}`;
  const file = join(assetDir, filename);
  await writeFile(file, bytes);
  const size = (await stat(file)).size;
  const publicPath = `/assets/wong-shung-yen/${filename}`;
  await writeFile(join(assetDir, "jade-gallery-visit-source.json"), JSON.stringify({
    sourcePage,
    originalImageUrl: photo.url,
    resolvedVia: photo.via,
    publicPath,
    bytes: size,
    fetchedAt: new Date().toISOString(),
    captionMatch: captionNeedle,
  }, null, 2));
  return { publicPath, size, width: photo.width, height: photo.height };
}

function figureSection(copy, asset) {
  const dimensions = asset.width && asset.height ? ` width="${asset.width}" height="${asset.height}"` : "";
  return `<section class="section" data-jade-gallery-photo><div class="shell"><figure style="margin:0">
    <a href="${sourcePage}" target="_blank" rel="noopener noreferrer" aria-label="${copy.source}"><img src="${asset.publicPath}" alt="${copy.alt}"${dimensions} loading="eager" decoding="async" style="display:block;width:100%;height:auto;max-height:720px;object-fit:contain;background:#f4f1e9;border-radius:18px"></a>
    <figcaption class="unit-disclaimer" style="margin-top:12px">${copy.caption} <a class="text-link" href="${sourcePage}" target="_blank" rel="noopener noreferrer">${copy.source} <span aria-hidden="true">↗</span></a></figcaption>
  </figure></div></section>\n  `;
}

async function insertPhoto(pathname, copy, asset) {
  const file = join(root, pathname.slice(1), "index.html");
  let html = await readFile(file, "utf8");
  if (html.includes("data-jade-gallery-photo")) return;
  const statsIndex = html.indexOf('<section class="section-compact">');
  const marker = '<section class="section"><div class="shell">';
  const insertAt = statsIndex >= 0 ? html.indexOf(marker, statsIndex) : -1;
  if (insertAt < 0) throw new Error(`Could not find jade-page photo insertion point for ${pathname}`);
  html = `${html.slice(0, insertAt)}${figureSection(copy, asset)}${html.slice(insertAt)}`;
  await writeFile(file, html, "utf8");
}

const photo = await resolvePhoto();
const asset = await downloadPhoto(photo);
for (const copy of Object.values(pages)) await insertPhoto(copy.path, copy, asset);

console.log(`Added DBP gallery-visit photo (${asset.size} bytes) to EN, BM and ZH jade pages.`);
