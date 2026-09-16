import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { localeConfig, origin, routeIds, routePath, site } from "./site-data.mjs";

const root = process.cwd();
const locales = Object.keys(localeConfig);
const pillarRoutes = ["homeLiving", "automotive", "lifestyle"];
const enhancementDate = "2026-09-17";
const placeId = `${origin}/#taman-perindustrian-kinrara`;
const websiteId = `${origin}/#website`;

const placeDescriptions = {
  en: "TPK Park is the common name for Taman Perindustrian Kinrara (Kinrara Industrial Park) in Puchong, Selangor, where Home & Living, Automotive and Lifestyle businesses come together.",
  ms: "TPK Park ialah nama yang lazim digunakan untuk Taman Perindustrian Kinrara di Puchong, Selangor, yang menghimpunkan perniagaan Home & Living, Automotif dan Gaya Hidup.",
  zh: "TPK Park是蒲种金銮工业园（Taman Perindustrian Kinrara）的常用名称，园区汇集家居生活、汽车及生活方式相关商家。"
};

function absolute(locale, routeId) {
  return `${origin}${routePath(locale, routeId)}`;
}

function pageFile(locale, routeId) {
  const pathname = routePath(locale, routeId).replace(/^\/+|\/+$/g, "");
  return pathname ? join(root, ...pathname.split("/"), "index.html") : join(root, "index.html");
}

function uniqueStrings(items) {
  return [...new Set(items.filter(Boolean))];
}

function businessRouteIds(locale) {
  return routeIds.filter((routeId) => {
    const page = site[locale].pages[routeId];
    return page?.business?.["@id"] && pillarRoutes.includes(page.parentRoute);
  });
}

function directoryItems(locale, routeId) {
  const page = site[locale].pages[routeId];
  const directory = page?.blocks?.find((block) => block.type === "directory");
  if (!directory) return [];

  return directory.items
    .map(([category, name, childRoute]) => ({ category, name, routeId: childRoute }))
    .filter((item) => item.routeId && site[locale].pages[item.routeId]);
}

function webpageNode(graph, url) {
  return graph.find((node) => node?.["@id"] === `${url}#webpage`);
}

function placeNode(graph) {
  return graph.find((node) => node?.["@id"] === placeId);
}

function replaceJsonLd(html, data) {
  const pattern = /<script type="application\/ld\+json">[\s\S]*?<\/script>/;
  if (!pattern.test(html)) throw new Error("Primary JSON-LD block not found");
  return html.replace(pattern, `<script type="application/ld+json">${JSON.stringify(data)}</script>`);
}

async function enhancePage(locale, routeId) {
  const page = site[locale].pages[routeId];
  const file = pageFile(locale, routeId);
  let html = await readFile(file, "utf8");
  const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (!match) throw new Error(`${locale}/${routeId}: JSON-LD not found`);

  const data = JSON.parse(match[1]);
  const graph = data["@graph"];
  if (!Array.isArray(graph)) throw new Error(`${locale}/${routeId}: JSON-LD graph not found`);

  const url = absolute(locale, routeId);
  const place = placeNode(graph);
  const webpage = webpageNode(graph, url);
  if (!place || !webpage) throw new Error(`${locale}/${routeId}: core entity nodes not found`);

  place.name = "Taman Perindustrian Kinrara";
  place.alternateName = uniqueStrings([
    ...(Array.isArray(place.alternateName) ? place.alternateName : []),
    "TPK",
    "TPK Park",
    "Kinrara Industrial Park",
    "金銮工业园"
  ]);
  place.description = placeDescriptions[locale];
  place.subjectOf = pillarRoutes.map((pillarRoute) => ({ "@id": `${absolute(locale, pillarRoute)}#webpage` }));

  const website = graph.find((node) => node?.["@id"] === websiteId);
  if (website) website.about = { "@id": placeId };

  if (page.business?.["@id"]) {
    const businessId = page.business["@id"];
    const business = graph.find((node) => node?.["@id"] === businessId);
    if (!business) throw new Error(`${locale}/${routeId}: business entity not found`);

    business.containedInPlace = { "@id": placeId };
    business.mainEntityOfPage = locales.map((language) => ({ "@id": `${absolute(language, routeId)}#webpage` }));
  }

  if (pillarRoutes.includes(routeId)) {
    const items = directoryItems(locale, routeId);
    const listId = `${url}#business-directory`;

    webpage.hasPart = items.map((item) => ({ "@id": `${absolute(locale, item.routeId)}#webpage` }));

    const itemList = {
      "@type": "ItemList",
      "@id": listId,
      name: page.title,
      description: page.description,
      numberOfItems: items.length,
      about: { "@id": placeId },
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: absolute(locale, item.routeId)
      }))
    };

    const existingIndex = graph.findIndex((node) => node?.["@id"] === listId);
    if (existingIndex >= 0) graph[existingIndex] = itemList;
    else graph.push(itemList);
  }

  html = replaceJsonLd(html, data);
  await writeFile(file, html);
}

function maxDate(a, b) {
  if (!a) return b;
  return a >= b ? a : b;
}

async function enhanceSitemap() {
  const file = join(root, "sitemap.xml");
  let sitemap = await readFile(file, "utf8");
  const targetUrls = new Set();

  for (const locale of locales) {
    for (const routeId of [...pillarRoutes, ...businessRouteIds(locale)]) {
      targetUrls.add(absolute(locale, routeId));
    }
  }

  sitemap = sitemap.replace(/<url>[\s\S]*?<\/url>/g, (block) => {
    const loc = block.match(/<loc>([^<]+)<\/loc>/)?.[1];
    if (!loc || !targetUrls.has(loc)) return block;

    const lastmodMatch = block.match(/<lastmod>([^<]+)<\/lastmod>/);
    if (lastmodMatch) {
      const nextDate = maxDate(lastmodMatch[1], enhancementDate);
      return block.replace(lastmodMatch[0], `<lastmod>${nextDate}</lastmod>`);
    }

    return block.replace(/(<loc>[^<]+<\/loc>)/, `$1\n    <lastmod>${enhancementDate}</lastmod>`);
  });

  await writeFile(file, sitemap);
}

for (const locale of locales) {
  for (const routeId of routeIds) {
    await enhancePage(locale, routeId);
  }
}

await enhanceSitemap();
console.log(`Enhanced TPK Park entity SEO across ${locales.length * routeIds.length} generated pages.`);
