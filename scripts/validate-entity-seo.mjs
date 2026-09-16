import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { localeConfig, origin, routeIds, routePath, site } from "./site-data.mjs";

const root = process.cwd();
const locales = Object.keys(localeConfig);
const pillarRoutes = ["homeLiving", "automotive", "lifestyle"];
const enhancementDate = "2026-09-17";
const placeId = `${origin}/#taman-perindustrian-kinrara`;

function absolute(locale, routeId) {
  return `${origin}${routePath(locale, routeId)}`;
}

function pageFile(locale, routeId) {
  const pathname = routePath(locale, routeId).replace(/^\/+|\/+$/g, "");
  return pathname ? join(root, ...pathname.split("/"), "index.html") : join(root, "index.html");
}

function businessRouteIds(locale) {
  return routeIds.filter((routeId) => {
    const page = site[locale].pages[routeId];
    return page?.business?.["@id"] && pillarRoutes.includes(page.parentRoute);
  });
}

function directoryItems(locale, routeId) {
  const directory = site[locale].pages[routeId]?.blocks?.find((block) => block.type === "directory");
  return (directory?.items || [])
    .map(([category, name, childRoute]) => ({ category, name, routeId: childRoute }))
    .filter((item) => item.routeId && site[locale].pages[item.routeId]);
}

function ids(value) {
  return (Array.isArray(value) ? value : [value]).filter(Boolean).map((entry) => entry?.["@id"]).filter(Boolean);
}

async function graphFor(locale, routeId) {
  const html = await readFile(pageFile(locale, routeId), "utf8");
  const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  assert.ok(match, `${locale}/${routeId}: JSON-LD block missing`);
  const data = JSON.parse(match[1]);
  assert.ok(Array.isArray(data["@graph"]), `${locale}/${routeId}: JSON-LD graph missing`);
  return data["@graph"];
}

for (const locale of locales) {
  for (const routeId of routeIds) {
    const page = site[locale].pages[routeId];
    const url = absolute(locale, routeId);
    const graph = await graphFor(locale, routeId);
    const place = graph.find((node) => node?.["@id"] === placeId);
    const webpage = graph.find((node) => node?.["@id"] === `${url}#webpage`);

    assert.ok(place, `${locale}/${routeId}: place entity missing`);
    assert.ok(webpage, `${locale}/${routeId}: webpage entity missing`);
    assert.ok(place.alternateName?.includes("TPK"), `${locale}/${routeId}: TPK alias missing`);
    assert.ok(place.alternateName?.includes("TPK Park"), `${locale}/${routeId}: TPK Park alias missing`);
    assert.ok(place.alternateName?.includes("Kinrara Industrial Park"), `${locale}/${routeId}: English place alias missing`);
    assert.equal(place.subjectOf?.length, pillarRoutes.length, `${locale}/${routeId}: pillar subject links incomplete`);

    if (page.business?.["@id"]) {
      const businessId = page.business["@id"];
      const business = graph.find((node) => node?.["@id"] === businessId);
      assert.ok(business, `${locale}/${routeId}: business entity missing`);
      assert.equal(business.containedInPlace?.["@id"], placeId, `${locale}/${routeId}: containedInPlace is incorrect`);
      assert.ok(ids(business.mainEntityOfPage).includes(`${url}#webpage`), `${locale}/${routeId}: mainEntityOfPage missing localized page`);
      assert.equal(webpage.about?.["@id"], placeId, `${locale}/${routeId}: webpage place subject changed unexpectedly`);
      assert.equal(webpage.mainEntity?.["@id"], businessId, `${locale}/${routeId}: business is not the main entity`);
    }

    if (pillarRoutes.includes(routeId)) {
      const items = directoryItems(locale, routeId);
      const listId = `${url}#business-directory`;
      const itemList = graph.find((node) => node?.["@id"] === listId);

      assert.equal(webpage["@type"], "WebPage", `${locale}/${routeId}: pillar page type changed unexpectedly`);
      assert.equal(webpage.about?.["@id"], placeId, `${locale}/${routeId}: pillar page should remain about Taman Perindustrian Kinrara`);
      assert.equal(itemList?.["@type"], "ItemList", `${locale}/${routeId}: directory ItemList missing`);
      assert.equal(itemList?.numberOfItems, items.length, `${locale}/${routeId}: ItemList count mismatch`);
      assert.equal(itemList?.itemListElement?.length, items.length, `${locale}/${routeId}: ItemList entries mismatch`);
      assert.equal(webpage.hasPart?.length, items.length, `${locale}/${routeId}: WebPage hasPart mismatch`);

      items.forEach((item, index) => {
        assert.equal(itemList.itemListElement[index]?.position, index + 1, `${locale}/${routeId}: ItemList position mismatch`);
        assert.equal(itemList.itemListElement[index]?.url, absolute(locale, item.routeId), `${locale}/${routeId}: ItemList URL mismatch`);
      });
    }
  }
}

const sitemap = await readFile(join(root, "sitemap.xml"), "utf8");
const sitemapBlocks = [...sitemap.matchAll(/<url>[\s\S]*?<\/url>/g)].map((match) => match[0]);

for (const locale of locales) {
  for (const routeId of [...pillarRoutes, ...businessRouteIds(locale)]) {
    const url = absolute(locale, routeId);
    const block = sitemapBlocks.find((entry) => entry.includes(`<loc>${url}</loc>`));
    assert.ok(block, `${locale}/${routeId}: sitemap entry missing`);
    const lastmod = block.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1];
    assert.ok(lastmod && lastmod >= enhancementDate, `${locale}/${routeId}: sitemap lastmod should reflect the entity SEO pass`);
  }
}

console.log("Entity SEO validation passed for all locales, pillar directories and brand pages.");
