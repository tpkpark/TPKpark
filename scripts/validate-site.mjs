import { access, readFile } from "node:fs/promises";
import { dirname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { articles, leasingInventory, localeConfig, origin, profileSources, routeIds, routeLastModified, routePath, seoTitles, site } from "./site-data.mjs";

const root = process.cwd();
const locales = Object.keys(localeConfig);
const failures = [];
let jsonLdBlocks = 0;
let imageCount = 0;
let labelCount = 0;
let internalLinkCount = 0;

function fail(file, message) {
  failures.push(`${file}: ${message}`);
}

function outputFile(locale, routeId) {
  const path = routePath(locale, routeId);
  return path === "/" ? join(root, "index.html") : join(root, path.slice(1), "index.html");
}

function matches(html, pattern) {
  return [...html.matchAll(pattern)];
}

function attr(tag, name) {
  const found = tag.match(new RegExp(`\\s${name}=(?:"([^"]*)"|'([^']*)')`, "i"));
  return found ? (found[1] ?? found[2]) : null;
}

function escapeHtml(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

async function exists(path) {
  try { await access(path); return true; } catch { return false; }
}

for (const locale of locales) {
  for (const routeId of routeIds) {
    const file = outputFile(locale, routeId);
    const label = file.replace(`${root}/`, "");
    if (!(await exists(file))) {
      fail(label, "missing generated page");
      continue;
    }

    const html = await readFile(file, "utf8");
    const page = site[locale].pages[routeId];
    const seoTitle = seoTitles[locale][routeId];
    const canonical = `${origin}${routePath(locale, routeId)}`;

    if (!html.startsWith("<!doctype html>")) fail(label, "missing HTML5 doctype");
    if (!html.includes(`<html lang="${localeConfig[locale].htmlLang}">`)) fail(label, "incorrect html lang");
    if (!seoTitle) fail(label, "missing configured SEO title");
    if (seoTitle?.length > 65) fail(label, `SEO title exceeds 65 characters: ${seoTitle.length}`);
    if (!html.includes(`<title>${escapeHtml(seoTitle)}</title>`)) fail(label, "incorrect or missing SEO title");
    if (!html.includes(`<link rel="canonical" href="${canonical}">`)) fail(label, "incorrect canonical URL");
    if (!html.includes('<meta name="description" content="')) fail(label, "missing meta description");
    if (!html.includes('<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">')) fail(label, "missing explicit index/follow directive");
    if (!html.includes(`<meta property="og:title" content="${escapeHtml(seoTitle)}">`)) fail(label, "incorrect Open Graph title");
    if (!html.includes(`<meta name="twitter:title" content="${escapeHtml(seoTitle)}">`)) fail(label, "incorrect Twitter title");
    if (!html.includes(`<meta property="og:locale" content="${localeConfig[locale].ogLocale}">`)) fail(label, "incorrect Open Graph locale");

    const ogLocaleAlternates = matches(html, /<meta property="og:locale:alternate" content="[^"]+">/g);
    if (ogLocaleAlternates.length !== locales.length - 1) fail(label, `expected two Open Graph locale alternates, found ${ogLocaleAlternates.length}`);

    const h1s = matches(html, /<h1(?:\s[^>]*)?>/gi);
    if (h1s.length !== 1) fail(label, `expected one h1, found ${h1s.length}`);
    if (page.displayNames) {
      const displayNameMarkup = `<h1 class="profile-page-title">${page.displayNames.map((name, index) => `<span class="profile-name-${index === 0 ? "primary" : "secondary"}" lang="${escapeHtml(name.lang)}">${escapeHtml(name.text)}</span>`).join("")}</h1>`;
      if (!html.includes(displayNameMarkup)) fail(label, "profile names are not rendered as separate language lines");
    } else if (!html.includes(`>${escapeHtml(page.title)}</h1>`)) fail(label, "h1 does not match the configured page title");

    const alternates = matches(html, /<link rel="alternate" hreflang="[^"]+" href="[^"]+">/g);
    if (alternates.length !== 4) fail(label, `expected four hreflang links, found ${alternates.length}`);
    for (const key of locales) {
      const expected = `<link rel="alternate" hreflang="${localeConfig[key].hreflang}" href="${origin}${routePath(key, routeId)}">`;
      if (!html.includes(expected)) fail(label, `missing ${localeConfig[key].hreflang} alternate`);
    }

    if (!html.includes(`<nav class="locale-nav locale-nav-header" aria-label="${escapeHtml(site[locale].language)}">`)) fail(label, "prominent header language selector is missing");
    if (!html.includes(`<nav class="locale-nav locale-nav-panel" aria-label="${escapeHtml(site[locale].language)}">`)) fail(label, "expanded mobile language selector is missing");
    if (!html.includes('<span class="locale-symbol" aria-hidden="true">A/文</span>')) fail(label, "header language cue is missing");
    if (matches(html, /<img class="brand-logo(?: brand-logo-reverse)?" src="\/assets\/brand\/tpk-park-logo\.svg"/g).length !== 2) fail(label, "official TPK Park logo is missing from the header or footer");
    if (html.includes('class="brand-mark"')) fail(label, "legacy circular TPK badge is still present");
    if (html.includes('class="brand-name"')) fail(label, "duplicate typed TPK Park brand name is still present");
    for (const key of locales) {
      const current = key === locale ? ' aria-current="true"' : "";
      const attrs = `<a href="${routePath(key, routeId)}" hreflang="${localeConfig[key].hreflang}" lang="${localeConfig[key].htmlLang}" aria-label="${escapeHtml(localeConfig[key].label)}"${current}>`;
      if (!html.includes(`${attrs}${escapeHtml(localeConfig[key].short)}</a>`)) fail(label, `missing compact ${key} language option`);
      if (!html.includes(`${attrs}${escapeHtml(localeConfig[key].label)}</a>`)) fail(label, `missing expanded ${key} language option`);
    }

    const jsonScripts = matches(html, /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g);
    if (jsonScripts.length !== 1) fail(label, `expected one JSON-LD block, found ${jsonScripts.length}`);
    for (const block of jsonScripts) {
      jsonLdBlocks += 1;
      try {
        const parsed = JSON.parse(block[1]);
        if (parsed["@context"] !== "https://schema.org") fail(label, "JSON-LD context is incorrect");
        if (!Array.isArray(parsed["@graph"])) fail(label, "JSON-LD graph is missing");
        const graph = parsed["@graph"] || [];
        const organizationId = `${origin}/#organization`;
        const placeId = `${origin}/#taman-perindustrian-kinrara`;
        const organization = graph.find((entry) => entry["@type"] === "Organization");
        const place = graph.find((entry) => entry["@type"] === "Place");
        const webSite = graph.find((entry) => entry["@type"] === "WebSite");
        const expectedPageType = routeId === "profile" ? "ProfilePage" : routeId === "publicRecord" ? "CollectionPage" : "WebPage";
        const webPage = graph.find((entry) => entry["@type"] === expectedPageType);
        if (!organization) fail(label, "Organization schema is missing");
        if (organization?.["@id"] !== organizationId) fail(label, "Organization schema ID is incorrect");
        if (organization?.location?.["@id"] !== placeId) fail(label, "Organization location does not reference Taman Perindustrian Kinrara");
        if (!place) fail(label, "Taman Perindustrian Kinrara Place schema is missing");
        if (place?.["@id"] !== placeId) fail(label, "Place schema ID is incorrect");
        if (place?.name !== "Taman Perindustrian Kinrara") fail(label, "Place schema name is incorrect");
        if (!Array.isArray(place?.alternateName) || !place.alternateName.includes("TPK") || !place.alternateName.includes("TPK Park")) fail(label, "Place schema aliases are incomplete");
        if (!webSite) fail(label, "WebSite schema is missing");
        if (webSite?.publisher?.["@id"] !== organizationId) fail(label, "WebSite publisher is incorrect");
        if (webSite?.about?.["@id"] !== placeId) fail(label, "WebSite subject is incorrect");
        if (!webPage) fail(label, `${expectedPageType} schema is missing`);
        if (webPage?.dateModified !== routeLastModified[routeId]) fail(label, "WebPage dateModified is incorrect");
        if (webPage?.publisher?.["@id"] !== organizationId) fail(label, "WebPage publisher is incorrect");
        if (!["profile", "publicRecord"].includes(routeId) && webPage?.about?.["@id"] !== placeId) fail(label, "WebPage subject does not reference Taman Perindustrian Kinrara");
        if (!["profile", "publicRecord"].includes(routeId) && webPage?.mainEntity?.["@id"] !== placeId) fail(label, "WebPage main entity does not reference Taman Perindustrian Kinrara");
        const breadcrumb = graph.find((entry) => entry["@type"] === "BreadcrumbList");
        if (routeId !== "home" && !breadcrumb) fail(label, "BreadcrumbList schema is missing");
        if (page.parentRoute && breadcrumb?.itemListElement?.length !== 3) fail(label, "nested page breadcrumb does not contain three levels");
        if (routeId === "leasing") {
          const itemList = graph.find((entry) => entry["@type"] === "ItemList");
          if (itemList?.itemListElement?.length !== Object.keys(leasingInventory).length) fail(label, "leasing ItemList does not contain every property page");
        }
        if (routeId === "news") {
          const firstPartyCount = 1 + (page.blocks.find((block) => block.type === "newsUpdates")?.items.length || 0);
          const itemList = graph.find((entry) => entry["@type"] === "ItemList");
          if (itemList?.itemListElement?.length !== firstPartyCount + articles.length) fail(label, "news ItemList does not contain first-party updates and all media coverage");
        }
        if (routeId === "profile") {
          const person = graph.find((entry) => entry["@type"] === "Person");
          if (!person) fail(label, "Person schema is missing");
          if (person?.["@id"] !== `${canonical}#person`) fail(label, "Person schema ID is incorrect");
          if (webPage?.mainEntity?.["@id"] !== `${canonical}#person`) fail(label, "profile WebPage mainEntity is incorrect");
          if (!person?.sameAs?.includes("https://www.imdb.com/name/nm6562891/")) fail(label, "IMDb sameAs link is missing");
          if (person?.alumniOf?.some((institution) => institution.name === "Universiti Tunku Abdul Rahman")) fail(label, "current university is incorrectly listed as alumniOf");
        }
        if (routeId === "publicRecord") {
          const profileCanonical = `${origin}${routePath(locale, "profile")}`;
          const person = graph.find((entry) => entry["@type"] === "Person");
          const itemList = graph.find((entry) => entry["@type"] === "ItemList");
          if (webPage?.about?.["@id"] !== `${profileCanonical}#person`) fail(label, "public record subject is not the profile Person");
          if (webPage?.mainEntity?.["@id"] !== `${canonical}#record-list`) fail(label, "public record main entity is incorrect");
          if (person?.["@id"] !== `${profileCanonical}#person`) fail(label, "public record Person schema ID is incorrect");
          if (!person?.sameAs?.includes("https://www.imdb.com/name/nm6562891/")) fail(label, "IMDb sameAs link is missing");
          if (itemList?.itemListElement?.length !== profileSources.length) fail(label, "public record ItemList does not contain every selected source");
        }
      } catch (error) {
        fail(label, `invalid JSON-LD: ${error.message}`);
      }
    }

    if (page.unitKey) {
      const unit = leasingInventory[page.unitKey];
      if (!html.includes('class="unit-facts"')) fail(label, "unit facts are missing");
      if (!html.includes(`${routePath(locale, "contact")}?space=${unit.queryValue}`)) fail(label, "unit-specific enquiry link is missing");
      const brochureUrl = unit.brochureUrls[locale];
      if (unit.status === "leased") {
        if (/type="application\/pdf"/.test(html)) fail(label, "leased unit still offers an outdated brochure");
        if (/RM25,000/.test(html) || unit.values.askingRent) fail(label, "leased unit still advertises rent");
        if (!html.includes(escapeHtml(site[locale].leasingUi.enquireAlternatives))) fail(label, "leased unit has no alternative enquiry route");
      } else {
        if (!html.includes(`href="${brochureUrl}" type="application/pdf" hreflang="${localeConfig[locale].hreflang}"`)) fail(label, "localized leasing information pack link is missing language metadata");
        if (brochureUrl.startsWith("/") && !html.includes(`href="${brochureUrl}" type="application/pdf" hreflang="${localeConfig[locale].hreflang}" download`)) fail(label, "localized leasing information pack is not configured as a download");
        if (locale !== "en") {
          if (!html.includes(`href="${unit.brochureUrls.en}" type="application/pdf" hreflang="en-MY" download`)) fail(label, "English leasing information pack fallback is missing");
          if (!html.includes(escapeHtml(site[locale].leasingUi.brochureEnglish))) fail(label, "English brochure link label is missing");
        }
      }
      if (!html.includes(`<time datetime="${routeLastModified[unit.routeId]}">`)) fail(label, "visible leasing update date is incorrect");
      for (const value of Object.values(unit.values)) {
        if (value && !html.includes(escapeHtml(value[locale]))) fail(label, `missing localized inventory fact: ${value[locale]}`);
      }
    }

    if (routeId === "contact") {
      if (!html.includes('id="space-type"')) fail(label, "space-type enquiry field is missing");
      for (const unit of Object.values(leasingInventory)) if (!html.includes(`value="${unit.queryValue}"`)) fail(label, `missing enquiry option: ${unit.queryValue}`);
    }

    if (routeId === "news") {
      if (!html.includes('class="news-feature"')) fail(label, "featured TPK Park update is missing");
      if (matches(html, /class="update-card"/g).length !== 3) fail(label, "expected three first-party update cards");
      if (matches(html, /class="news-summary"/g).length !== articles.length) fail(label, "media coverage summaries are incomplete");
      if (!html.includes(`href="${routePath(locale, "leasing")}"`)) fail(label, "news leasing route is missing");
      for (const sourceLanguage of new Set(articles.map((article) => article.sourceLanguage))) {
        if (!html.includes(escapeHtml(site[locale].newsUi.sourceLanguages[sourceLanguage]))) fail(label, `missing ${sourceLanguage} source-language label`);
      }
    }

    if (routeId === "profile") {
      const featuredCount = profileSources.filter((item) => item.featured).length;
      if (matches(html, /class="source-record"/g).length !== featuredCount) fail(label, "selected profile sources are incomplete");
      if (!html.includes("Men Who Save the World")) fail(label, "bilingual film title is missing");
      if (!html.includes("https://variety.com/2014/film/festivals/film-review-men-who-save-the-world-1201282850/")) fail(label, "independent film-credit source is missing");
    }

    if (routeId === "publicRecord") {
      const sourceYears = [...new Set(profileSources.map((item) => item.year))];
      if (matches(html, /class="source-record"/g).length !== profileSources.length) fail(label, "public record source list is incomplete");
      if (matches(html, /<details class="source-year-group"/g).length !== sourceYears.length) fail(label, "public record does not provide one disclosure per year");
      if (matches(html, /<details class="source-year-group" open>/g).length !== 1) fail(label, "only the current public-record year should be expanded by default");
      if (matches(html, /class="source-year-summary"/g).length !== sourceYears.length) fail(label, "public-record year disclosures are incomplete");
      for (const item of profileSources) if (!html.includes(`href="${item.url}"`)) fail(label, `missing public-record source: ${item.source}`);
    }

    const images = matches(html, /<img\b[^>]*>/gi);
    imageCount += images.length;
    for (const image of images) if (attr(image[0], "alt") === null) fail(label, `image missing alt: ${image[0].slice(0, 100)}`);

    const ids = new Set(matches(html, /\sid="([^"]+)"/g).map((match) => match[1]));
    const labels = matches(html, /<label\b[^>]*>/gi);
    labelCount += labels.length;
    for (const labelTag of labels) {
      const target = attr(labelTag[0], "for");
      if (!target || !ids.has(target)) fail(label, `label has no valid control: ${labelTag[0]}`);
    }

    const links = matches(html, /<a\b[^>]*>/gi);
    for (const linkTag of links) {
      const href = attr(linkTag[0], "href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("http://") || href.startsWith("https://")) continue;
      internalLinkCount += 1;
      if (!href.startsWith("/")) {
        fail(label, `internal link is not root-relative: ${href}`);
        continue;
      }
      const clean = href.split(/[?#]/)[0];
      const target = clean.endsWith("/") ? join(root, clean.slice(1), "index.html") : join(root, clean.slice(1));
      if (!(await exists(normalize(target)))) fail(label, `broken internal link: ${href}`);
    }

    const externalLinks = links.filter((linkTag) => {
      const href = attr(linkTag[0], "href");
      return href?.startsWith("http") && !href.startsWith(origin);
    });
    for (const linkTag of externalLinks) {
      if (attr(linkTag[0], "target") === "_blank" && !(attr(linkTag[0], "rel") || "").includes("noopener")) fail(label, "target=_blank link missing noopener");
    }

    const forbidden = [
      "+603-8070-1234",
      "lawrencew7729-collab/TPKpark",
      "data-i18n=",
      "TPK Park is within Taman Perindustrian Kinrara",
      "TPK Park is the destination identity for",
      "TPK Park terletak dalam Taman Perindustrian Kinrara",
      "TPK Park ialah identiti destinasi",
      "TPK Park位于金銮工业园",
      "TPK Park是金銮工业园内一组",
      "TPK Park Sdn. Bhd. does not own or control the whole industrial park",
      "TPK Park Sdn. Bhd. tidak memiliki atau mengawal keseluruhan taman perindustrian",
      "TPK Park Sdn. Bhd.并不拥有或控制整个工业园",
      "Treasurer of SJK(C) Shin Cheng's Board of Governors since 2010",
      "Bendahari Lembaga Pengelola SJK(C) Shin Cheng sejak 2010",
      "自2010年任深静（哈古乐）华小董事会财政"
    ];
    for (const phrase of forbidden) if (html.includes(phrase)) fail(label, `contains forbidden legacy text: ${phrase}`);
  }
}

const sitemapPath = join(root, "sitemap.xml");
const sitemap = await readFile(sitemapPath, "utf8");
const locs = matches(sitemap, /<loc>([^<]+)<\/loc>/g);
const lastmods = matches(sitemap, /<lastmod>([^<]+)<\/lastmod>/g);
if (locs.length !== locales.length * routeIds.length) fail("sitemap.xml", `expected ${locales.length * routeIds.length} locations, found ${locs.length}`);
if (lastmods.length !== locales.length * routeIds.length) fail("sitemap.xml", `expected ${locales.length * routeIds.length} lastmod values, found ${lastmods.length}`);
for (const locale of locales) for (const routeId of routeIds) {
  const url = `${origin}${routePath(locale, routeId)}`;
  if (!sitemap.includes(`<loc>${url}</loc>`)) fail("sitemap.xml", `missing ${url}`);
  if (!sitemap.includes(`<loc>${url}</loc>\n    <lastmod>${routeLastModified[routeId]}</lastmod>`)) fail("sitemap.xml", `missing or incorrect lastmod for ${url}`);
}

const robots = await readFile(join(root, "robots.txt"), "utf8");
if (!robots.includes(`Sitemap: ${origin}/sitemap.xml`)) fail("robots.txt", "missing sitemap declaration");
if (!(await exists(join(root, "css", "tailwind.css")))) fail("css/tailwind.css", "missing compiled stylesheet");
if (!(await exists(join(root, "assets", "brand", "tpk-park-logo.svg")))) fail("assets/brand/tpk-park-logo.svg", "official TPK Park logo asset is missing");

if (failures.length) {
  console.error(`Validation failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Validated ${locales.length * routeIds.length} pages.`);
console.log(`JSON-LD blocks: ${jsonLdBlocks}`);
console.log(`Images with alt attributes: ${imageCount}`);
console.log(`Associated form labels: ${labelCount}`);
console.log(`Internal links checked: ${internalLinkCount}`);
