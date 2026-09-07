import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import {
  articles,
  images,
  leasingInventory,
  localeConfig,
  origin,
  primaryNav,
  profileSources,
  routeIds,
  routeLastModified,
  routePath,
  seoTitles,
  site,
  socialLinks
} from "./site-data.mjs";

import { imageAssets } from "./image-assets.mjs";
import { analyticsCopy, measurementId } from "./analytics-config.mjs";

const root = process.cwd();
const locales = Object.keys(localeConfig);

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function displayImage(url, sizes = "100vw") {
  const asset = imageAssets[url];
  if (!asset) return `src="${escapeHtml(url)}"`;
  return `src="${asset.src}" srcset="${asset.srcset}" sizes="${sizes}" width="${asset.width}" height="${asset.height}" decoding="async"`;
}

function safeJson(value) {
  return JSON.stringify(value).replaceAll("<", "\\u003c");
}

function absolute(locale, routeId) {
  return `${origin}${routePath(locale, routeId)}`;
}

function link(locale, routeId, label, className = "") {
  return `<a href="${routePath(locale, routeId)}"${className ? ` class="${className}"` : ""}>${escapeHtml(label)}</a>`;
}

function contactHref(locale, unitKey = "") {
  const base = routePath(locale, "contact");
  return unitKey ? `${base}?space=${encodeURIComponent(leasingInventory[unitKey].queryValue)}` : base;
}

function localeLinks(locale, routeId, expanded = false) {
  const t = site[locale];
  const variant = expanded ? "panel" : "header";
  return `<nav class="locale-nav locale-nav-${variant}" aria-label="${escapeHtml(t.language)}">
    ${expanded ? `<span class="locale-heading">${escapeHtml(t.language)}</span>` : '<span class="locale-symbol" aria-hidden="true">A/文</span>'}
    ${locales.map((key) => `<a href="${routePath(key, routeId)}" hreflang="${localeConfig[key].hreflang}" lang="${localeConfig[key].htmlLang}" aria-label="${escapeHtml(localeConfig[key].label)}"${key === locale ? ' aria-current="true"' : ""}>${escapeHtml(expanded ? localeConfig[key].label : localeConfig[key].short)}</a>`).join("")}
  </nav>`;
}

function header(locale, routeId) {
  const t = site[locale];
  const activeRoute = t.pages[routeId].parentRoute || routeId;
  const nav = primaryNav.map((id) => `<a href="${routePath(locale, id)}"${id === activeRoute ? ' aria-current="page"' : ""}>${escapeHtml(t.nav[id])}</a>`).join("");
  const mobileNav = routeIds.filter((id) => !t.pages[id].parentRoute).map((id) => `<a href="${routePath(locale, id)}"${id === activeRoute ? ' aria-current="page"' : ""}>${escapeHtml(t.nav[id])}</a>`).join("");
  return `<header class="site-header">
    <div class="header-inner">
      <a class="brand" href="${routePath(locale, "home")}" aria-label="TPK Park ${t.nav.home}">
        <img class="brand-logo" src="/assets/brand/tpk-park-logo.svg" alt="" width="76" height="41" aria-hidden="true">
      </a>
      <nav class="desktop-nav" aria-label="Primary">${nav}</nav>
      ${localeLinks(locale, routeId)}
      <button class="menu-button" type="button" aria-expanded="false" aria-controls="mobile-menu" aria-label="${escapeHtml(t.menuOpen)}"><span></span></button>
    </div>
    <div id="mobile-menu" class="mobile-panel" data-open="false">
      ${localeLinks(locale, routeId, true)}
      <nav class="mobile-nav" aria-label="Mobile">${mobileNav}</nav>
    </div>
  </header>`;
}

function footer(locale) {
  const t = site[locale];
  const explore = ["about", "homeLiving", "automotive", "lifestyle", "leasing", "news", "milestones", "profile"]
    .map((id) => link(locale, id, t.nav[id])).join("");
  const social = socialLinks.map(([label, url]) => `<a href="${url}" target="_blank" rel="noopener noreferrer">${label}<span class="visually-hidden"> (${escapeHtml(t.external)})</span></a>`).join("");
  return `<footer class="site-footer">
    <div class="shell">
      <div class="footer-grid">
        <div class="footer-brand">
          <a class="brand" href="${routePath(locale, "home")}" aria-label="TPK Park ${t.nav.home}"><img class="brand-logo brand-logo-reverse" src="/assets/brand/tpk-park-logo.svg" alt="" width="76" height="41" aria-hidden="true"></a>
          <p>${escapeHtml(t.footerIntro)}</p>
        </div>
        <div><p class="footer-title">${escapeHtml(t.explore)}</p><nav class="footer-links" aria-label="Footer">${explore}</nav></div>
        <div><p class="footer-title">${escapeHtml(t.connect)}</p><nav class="footer-links" aria-label="Social links">
          ${link(locale, "contact", t.nav.contact)}
          <a href="tel:+60380765200">+60 3 8076 5200</a>
          <a href="mailto:info@tpkpark.com">info@tpkpark.com</a>${social}
        </nav></div>
      </div>
      <div class="footer-bottom"><span>© 2026 ${escapeHtml(t.rights)}</span><span>Taman Perindustrian Kinrara · Puchong · Selangor</span><button type="button" class="analytics-settings" data-analytics-settings aria-controls="analytics-panel" hidden>${escapeHtml(analyticsCopy[locale].settings)}</button></div>
      <p class="analytics-note">${escapeHtml(analyticsCopy[locale].footer)}</p>
    </div>
  </footer>`;
}

function pageHero(locale, routeId, page) {
  const t = site[locale];
  const parent = page.parentRoute ? `<span aria-hidden="true">/</span><a href="${routePath(locale, page.parentRoute)}">${escapeHtml(t.nav[page.parentRoute])}</a>` : "";
  const title = page.displayNames
    ? `<h1 class="profile-page-title">${page.displayNames.map((name, index) => `<span class="profile-name-${index === 0 ? "primary" : "secondary"}" lang="${escapeHtml(name.lang)}">${escapeHtml(name.text)}</span>`).join("")}</h1>`
    : `<h1>${escapeHtml(page.title)}</h1>`;
  return `<section class="page-hero"><div class="shell">
    <nav class="breadcrumb" aria-label="Breadcrumb"><a href="${routePath(locale, "home")}">${escapeHtml(t.breadcrumbHome)}</a>${parent}<span aria-hidden="true">/</span><span aria-current="page">${escapeHtml(page.eyebrow)}</span></nav>
    <div class="page-hero-grid"><div><p class="eyebrow">${escapeHtml(page.eyebrow)}</p>${title}</div><p class="page-hero-copy">${escapeHtml(page.lead)}</p></div>
  </div></section>`;
}

function homeHero(locale, page) {
  const t = site[locale];
  return `<section class="hero" aria-labelledby="hero-title">
    <img class="hero-media" ${displayImage(page.image, "(max-width: 760px) 1000px, 100vw")} alt="" fetchpriority="high" referrerpolicy="no-referrer">
    <div class="hero-content"><p class="eyebrow">${escapeHtml(page.eyebrow)}</p><h1 id="hero-title">${escapeHtml(page.title)}</h1><p class="hero-lead">${escapeHtml(page.lead)}</p>
      <div class="hero-actions">
        <a class="button button-primary" href="${routePath(locale, "homeLiving")}">${escapeHtml(t.discover)} <span class="arrow" aria-hidden="true">→</span></a>
        <a class="button button-secondary" href="${routePath(locale, "leasing")}">${escapeHtml(t.enquiries)}</a>
      </div>
    </div>
  </section>`;
}

function sectionHeader(block) {
  return `<div class="section-header"><div><span class="section-number">${escapeHtml(block.kicker || "")}</span></div><div><h2>${escapeHtml(block.title || "")}</h2>${block.text ? `<p>${escapeHtml(block.text)}</p>` : ""}</div></div>`;
}

function renderCards(locale, block) {
  const t = site[locale];
  const items = block.items.map((item) => {
    const href = item.route ? routePath(locale, item.route) : "";
    const more = href ? `<a class="text-link" href="${href}">${escapeHtml(item.linkLabel || t.readMore)} <span class="arrow" aria-hidden="true">→</span></a>` : "";
    if (item.image) {
      return `<article class="card image-card"><img ${displayImage(item.image, "(max-width: 760px) 960px, 1100px")} alt="" loading="lazy" referrerpolicy="no-referrer"><div class="image-card-content"><span class="number">${escapeHtml(item.number)}</span><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.text)}</p>${more}</div></article>`;
    }
    return `<article class="card"><span class="number">${escapeHtml(item.number)}</span><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.text)}</p>${more}</article>`;
  }).join("");
  return `<section class="section"><div class="shell">${sectionHeader(block)}<div class="card-grid">${items}</div></div></section>`;
}

function renderSplit(locale, block, index) {
  const t = site[locale];
  const action = block.route ? `<a class="button button-dark" href="${routePath(locale, block.route)}">${escapeHtml(block.linkLabel || t.readMore)} <span class="arrow" aria-hidden="true">→</span></a>` : "";
  const image = `<img class="split-media" ${displayImage(block.image, "(max-width: 760px) 960px, 1200px")} alt="${escapeHtml(block.alt)}" loading="lazy" referrerpolicy="no-referrer">`;
  const copy = `<div class="split-copy"><span class="section-number">${String(index + 1).padStart(2, "0")}</span><h2>${escapeHtml(block.title)}</h2><p>${escapeHtml(block.text)}</p>${action}</div>`;
  return `<section class="split section-sage">${index % 2 ? `${copy}${image}` : `${image}${copy}`}</section>`;
}

function renderStats(locale, block) {
  const items = block.items.map((item) => `<div class="stat"><strong>${escapeHtml(item.value)}</strong><span>${escapeHtml(item.label)}</span></div>`).join("");
  const more = block.route ? `<p class="stats-link">${link(locale, block.route, block.linkLabel, "text-link")}</p>` : "";
  return `<section class="section-compact"><div class="shell"><div class="stats">${items}</div>${more}</div></section>`;
}

function renderDirectory(block) {
  const items = block.items.map(([category, name]) => `<div class="directory-item"><span>${escapeHtml(category)}</span><h3>${escapeHtml(name)}</h3></div>`).join("");
  return `<section class="section"><div class="shell">${sectionHeader(block)}<div class="directory">${items}</div></div></section>`;
}

function renderTimeline(block) {
  const rows = block.items.map((item) => `<article class="timeline-row"><span class="year">${escapeHtml(item.year)}</span><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.text)}</p></article>`).join("");
  return `<section class="section"><div class="shell">${sectionHeader(block)}<div class="timeline">${rows}</div></div></section>`;
}

function renderQuote(block) {
  return `<section class="quote-band"><blockquote>${escapeHtml(block.text)}</blockquote><cite>— ${escapeHtml(block.cite)}</cite></section>`;
}

function formatDate(locale, date) {
  return new Intl.DateTimeFormat(localeConfig[locale].htmlLang, { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`));
}

function renderNewsFeature(locale, block) {
  const date = formatDate(locale, block.date);
  return `<section class="section news-feature-section"><div class="shell">
    <article class="news-feature">
      <div class="news-feature-media"><img src="${block.image}" alt="${escapeHtml(block.alt)}" loading="eager" fetchpriority="high" referrerpolicy="no-referrer"></div>
      <div class="news-feature-copy">
        <span class="section-number">${escapeHtml(block.kicker)}</span>
        <div class="news-feature-meta"><span>${escapeHtml(block.category)}</span><time datetime="${block.date}">${escapeHtml(date)}</time></div>
        <h2>${escapeHtml(block.title)}</h2>
        <p>${escapeHtml(block.text)}</p>
        <a class="button button-primary" href="${routePath(locale, block.route)}">${escapeHtml(block.linkLabel)} <span class="arrow" aria-hidden="true">→</span></a>
      </div>
    </article>
  </div></section>`;
}

function renderNewsUpdates(locale, block) {
  const items = block.items.map((item) => {
    const date = item.date ? `<time datetime="${item.date}">${escapeHtml(formatDate(locale, item.date))}</time>` : "";
    const href = routePath(locale, item.route);
    return `<article class="update-card">
      <a class="update-card-media" href="${href}"><img src="${item.image}" alt="${escapeHtml(item.alt)}" loading="lazy" referrerpolicy="no-referrer"></a>
      <div class="update-card-meta"><span>${escapeHtml(item.category)}</span>${date}</div>
      <h3><a href="${href}">${escapeHtml(item.title)}</a></h3>
      <p>${escapeHtml(item.text)}</p>
      <a class="text-link" href="${href}">${escapeHtml(item.linkLabel)} <span class="arrow" aria-hidden="true">→</span></a>
    </article>`;
  }).join("");
  return `<section class="section section-sage"><div class="shell">${sectionHeader(block)}<div class="updates-grid">${items}</div></div></section>`;
}

function renderNews(locale, block) {
  const t = site[locale];
  const cards = articles.slice(0, block.limit).map((article) => {
    const date = formatDate(locale, article.date);
    const sourceLanguage = t.newsUi.sourceLanguages[article.sourceLanguage];
    const summary = block.detailed ? `<p class="news-summary">${escapeHtml(article.summary[locale])}</p>` : "";
    return `<article class="news-card">
      <a href="${article.url}" target="_blank" rel="noopener noreferrer"><img src="${article.image}" alt="${escapeHtml(article.title[locale])}" loading="lazy" referrerpolicy="no-referrer"></a>
      <div class="news-meta"><span>${escapeHtml(article.source)} · ${escapeHtml(sourceLanguage)}</span><time datetime="${article.date}">${escapeHtml(date)}</time></div>
      <h3><a href="${article.url}" target="_blank" rel="noopener noreferrer">${escapeHtml(article.title[locale])}</a></h3>
      ${summary}
      <a class="text-link" href="${article.url}" target="_blank" rel="noopener noreferrer">${escapeHtml(t.readMore)} <span class="arrow" aria-hidden="true">↗</span><span class="visually-hidden"> (${escapeHtml(t.external)})</span></a>
    </article>`;
  }).join("");
  const all = block.limit < articles.length ? `<div style="margin-top:34px">${link(locale, "news", t.viewAll, "button button-outline")}</div>` : "";
  return `<section class="section"><div class="shell">${sectionHeader(block)}<div class="news-grid">${cards}</div>${all}</div></section>`;
}

function renderFaq(block) {
  const items = block.items.map((item) => `<details><summary>${escapeHtml(item.q)}</summary><p>${escapeHtml(item.a)}</p></details>`).join("");
  return `<section class="section section-sage"><div class="shell">${sectionHeader(block)}<div class="faq-list">${items}</div></div></section>`;
}

function renderNotice(locale, block) {
  return `<section class="section-compact"><div class="shell"><p class="notice"><span class="archive-label">${escapeHtml(block.label || site[locale].noticeLabel)}</span><br><br>${escapeHtml(block.text)}</p></div></section>`;
}

function renderUnitDetails(locale, block) {
  const t = site[locale];
  const ui = t.leasingUi;
  const unit = leasingInventory[block.inventory];
  const leased = unit.status === "leased";
  const keys = ["availability", "address", "builtUp", "landArea", "askingRent", "format"];
  const facts = keys.filter((key) => unit.values[key]).map((key) => `<div class="unit-fact"><dt>${escapeHtml(ui.labels[key])}</dt><dd>${escapeHtml(unit.values[key][locale])}</dd></div>`).join("");
  const brochureUrl = unit.brochureUrls[locale];
  const brochureExternal = brochureUrl.startsWith("http");
  const brochureAttrs = brochureExternal ? ' target="_blank" rel="noopener noreferrer"' : " download";
  const englishBrochure = leased || locale === "en" ? "" : `<a class="text-link" href="${escapeHtml(unit.brochureUrls.en)}" type="application/pdf" hreflang="en-MY" download>${escapeHtml(ui.brochureEnglish)}</a>`;
  const brochure = leased ? "" : `<a class="button button-outline" href="${escapeHtml(brochureUrl)}" type="application/pdf" hreflang="${localeConfig[locale].hreflang}"${brochureAttrs}>${escapeHtml(ui.brochure)}</a>`;
  return `<section class="section unit-details"><div class="shell">
    ${sectionHeader({ kicker: ui.factsKicker, title: leased ? ui.leasedTitle : ui.factsTitle, text: leased ? ui.leasedText : ui.factsText })}
    <dl class="unit-facts">${facts}<div class="unit-fact"><dt>${escapeHtml(ui.labels.lastUpdated)}</dt><dd><time datetime="${routeLastModified[unit.routeId]}">${escapeHtml(formatDate(locale, routeLastModified[unit.routeId]))}</time></dd></div></dl>
    <div class="unit-actions">
      <a class="button button-dark" href="${contactHref(locale, block.inventory)}">${escapeHtml(leased ? ui.enquireAlternatives : ui.enquire)} <span class="arrow" aria-hidden="true">→</span></a>
      <a class="button button-outline" href="tel:+60380765200">${escapeHtml(ui.call)}</a>
      ${brochure}
      ${englishBrochure}
      <a class="text-link" href="${escapeHtml(unit.mapUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(ui.location)} <span class="arrow" aria-hidden="true">↗</span></a>
    </div>
    <p class="unit-disclaimer">${escapeHtml(ui.disclaimer)}</p>
  </div></section>`;
}

function renderPlans(block) {
  const plans = block.items.map((item) => `<figure class="floor-plan">
    <h3>${escapeHtml(item.title)}</h3>
    <a href="${escapeHtml(item.image)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(`${block.openLabel}: ${item.title}`)}"><img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.alt)}" width="${item.width}" height="${item.height}" loading="lazy" decoding="async"></a>
    <figcaption>${escapeHtml(block.openLabel)}</figcaption>
    ${item.photo ? `<img class="plan-interior" src="${escapeHtml(item.photo)}" alt="${escapeHtml(item.photoAlt)}" width="467" height="${item.photo.includes("first-floor") ? 238 : 239}" loading="lazy" decoding="async">` : ""}
  </figure>`).join("");
  return `<section class="section"><div class="shell">${sectionHeader(block)}<details class="floor-plans"><summary>${escapeHtml(block.kicker)}</summary><div class="plan-grid">${plans}</div><p class="unit-disclaimer">${escapeHtml(block.note)}</p></details></div></section>`;
}

function renderProfile(page, block) {
  return `<section class="section"><div class="shell"><div class="profile-hero">
    <div><p class="profile-role">${escapeHtml(page.lead)}</p><p class="profile-descriptor">${escapeHtml(block.descriptor)}</p><p class="profile-intro">${escapeHtml(block.introduction)}</p></div>
    <figure class="profile-portrait"><img src="${images.portrait}" alt="${escapeHtml(block.imageAlt)}" loading="eager" referrerpolicy="no-referrer"></figure>
  </div></div></section>`;
}

function renderProfileSource(locale, item) {
  const t = site[locale];
  const sourceLanguage = t.newsUi.sourceLanguages[item.sourceLanguage];
  const date = item.date ? formatDate(locale, item.date) : item.year;
  const time = item.date
    ? `<time datetime="${item.date}">${escapeHtml(date)}</time>`
    : `<span>${escapeHtml(item.year)}</span>`;
  return `<article class="source-record">
    <div class="source-record-meta">${time}<span>${escapeHtml(t.recordUi.categories[item.category])}</span></div>
    <div class="source-record-copy">
      <p class="source-publisher">${escapeHtml(item.source)} · ${escapeHtml(sourceLanguage)}</p>
      <h3><a href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(item.title[locale])} <span class="source-arrow" aria-hidden="true">↗</span><span class="visually-hidden"> (${escapeHtml(t.external)})</span></a></h3>
      <p>${escapeHtml(item.summary[locale])}</p>
    </div>
  </article>`;
}

function renderProfileSources(locale, block) {
  const t = site[locale];
  const items = block.mode === "featured" ? profileSources.filter((item) => item.featured) : profileSources;
  let records;
  if (block.mode === "all") {
    const years = [...new Set(items.map((item) => item.year))];
    records = years.map((year, index) => `<details class="source-year-group"${index === 0 ? " open" : ""}>
      <summary class="source-year-summary"><span class="source-year-label">${escapeHtml(year)}</span><span class="source-year-toggle" aria-hidden="true"></span></summary>
      <div class="source-list">${items.filter((item) => item.year === year).map((item) => renderProfileSource(locale, item)).join("")}</div>
    </details>`).join("");
  } else {
    records = `<div class="source-list">${items.map((item) => renderProfileSource(locale, item)).join("")}</div>`;
  }
  const more = block.moreRoute ? `<div class="source-more"><a class="button button-outline" href="${routePath(locale, block.moreRoute)}">${escapeHtml(t.recordUi.fullRecord)} <span class="arrow" aria-hidden="true">→</span></a></div>` : "";
  return `<section class="section profile-sources-section"><div class="shell">${sectionHeader(block)}<div class="source-years">${records}</div>${more}</div></section>`;
}

function renderContact(locale, block) {
  const t = site[locale];
  const f = t.form;
  const labels = block.labels;
  const options = f.options.map((option) => `<option value="${escapeHtml(option)}">${escapeHtml(option)}</option>`).join("");
  const spaceOptions = f.spaceOptions.map((option) => `<option value="${escapeHtml(option.value)}">${escapeHtml(option.label)}</option>`).join("");
  return `<section class="section"><div class="shell"><div class="contact-grid">
    <div class="contact-list">
      <div class="contact-row"><span>${escapeHtml(labels.phone)}</span><a href="tel:+60380765200">+60 3 8076 5200</a></div>
      <div class="contact-row"><span>${escapeHtml(labels.email)}</span><a href="mailto:info@tpkpark.com">info@tpkpark.com</a></div>
      <div class="contact-row"><span>${escapeHtml(labels.hours)}</span><p>${escapeHtml(block.officeHours)}</p></div>
      <div class="contact-row"><span>${escapeHtml(labels.address)}</span><p>${escapeHtml(block.address)}</p></div>
    </div>
    <div><p class="eyebrow">${escapeHtml(labels.formTitle)}</p><form class="form-grid" data-email-form>
      <div class="field"><label for="name">${escapeHtml(f.name)}</label><input id="name" name="name" autocomplete="name" required></div>
      <div class="field"><label for="company">${escapeHtml(f.company)}</label><input id="company" name="company" autocomplete="organization"></div>
      <div class="field"><label for="email">${escapeHtml(f.email)}</label><input id="email" name="email" type="email" autocomplete="email" required></div>
      <div class="field"><label for="phone">${escapeHtml(f.phone)}</label><input id="phone" name="phone" type="tel" autocomplete="tel"></div>
      <div class="field field-full"><label for="interest">${escapeHtml(f.interest)}</label><select id="interest" name="interest" required><option value="">${escapeHtml(f.select)}</option>${options}</select></div>
      <div class="field field-full"><label for="space-type">${escapeHtml(f.spaceType)}</label><select id="space-type" name="spaceType"><option value="">${escapeHtml(f.spaceSelect)}</option>${spaceOptions}</select></div>
      <div class="field field-full"><label for="message">${escapeHtml(f.message)}</label><textarea id="message" name="message" required></textarea></div>
      <p class="form-note">${escapeHtml(t.emailApp)}</p>
      <div class="field-full"><button class="button button-dark" type="submit">${escapeHtml(f.send)} <span class="arrow" aria-hidden="true">→</span></button></div>
    </form></div>
  </div></div></section>`;
}

function renderBlock(locale, routeId, page, block, index) {
  switch (block.type) {
    case "cards": return renderCards(locale, block);
    case "split": return renderSplit(locale, block, index);
    case "stats": return renderStats(locale, block);
    case "directory": return renderDirectory(block);
    case "timeline": return renderTimeline(block);
    case "quote": return renderQuote(block);
    case "newsFeature": return renderNewsFeature(locale, block);
    case "newsUpdates": return renderNewsUpdates(locale, block);
    case "news": return renderNews(locale, block);
    case "faq": return renderFaq(block);
    case "notice": return renderNotice(locale, block);
    case "unitDetails": return renderUnitDetails(locale, block);
    case "plans": return renderPlans(block);
    case "profile": return renderProfile(page, block);
    case "profileSources": return renderProfileSources(locale, block);
    case "contact": return renderContact(locale, block);
    default: throw new Error(`Unknown block type: ${block.type}`);
  }
}

function cta(locale, page) {
  const t = site[locale];
  const config = page.cta || { title: t.ctaTitle, text: t.ctaText, button: t.ctaButton };
  const href = config.route ? routePath(locale, config.route) : contactHref(locale, page.unitKey);
  return `<aside class="cta-panel"><div><h2>${escapeHtml(config.title)}</h2><p>${escapeHtml(config.text)}</p></div><a class="button button-primary" href="${href}">${escapeHtml(config.button)} <span class="arrow" aria-hidden="true">→</span></a></aside>`;
}

function schemas(locale, routeId, page) {
  const url = absolute(locale, routeId);
  const profileUrl = absolute(locale, "profile");
  const personId = `${profileUrl}#person`;
  const organizationId = `${origin}/#organization`;
  const placeId = `${origin}/#taman-perindustrian-kinrara`;
  const personPage = ["profile", "publicRecord"].includes(routeId);
  const pageEntityId = personPage ? personId : placeId;
  const pageType = routeId === "profile" ? "ProfilePage" : routeId === "publicRecord" ? "CollectionPage" : "WebPage";
  const recordListId = `${url}#record-list`;
  const graph = [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: "TPK Park Sdn. Bhd.",
      alternateName: "TPK Park",
      url: `${origin}/`,
      logo: { "@type": "ImageObject", url: `${origin}/assets/brand/tpk-park-logo.svg`, width: 567, height: 304 },
      description: "Manages and promotes selected properties and place-renewal initiatives at Taman Perindustrian Kinrara.",
      telephone: "+60 3 8076 5200",
      email: "info@tpkpark.com",
      foundingDate: "2010",
      address: { "@type": "PostalAddress", streetAddress: "2 Jalan TPK 1/4, Taman Perindustrian Kinrara", postalCode: "47180", addressLocality: "Puchong", addressRegion: "Selangor", addressCountry: "MY" },
      location: { "@id": placeId },
      sameAs: socialLinks.map(([, socialUrl]) => socialUrl)
    },
    {
      "@type": "Place",
      "@id": placeId,
      name: "Taman Perindustrian Kinrara",
      alternateName: ["TPK", "TPK Park", "Kinrara Industrial Park", "金銮工业园"],
      url: `${origin}/`,
      address: { "@type": "PostalAddress", postalCode: "47180", addressLocality: "Puchong", addressRegion: "Selangor", addressCountry: "MY" }
    },
    {
      "@type": "WebSite",
      "@id": `${origin}/#website`,
      url: `${origin}/`,
      name: "TPK Park",
      publisher: { "@id": organizationId },
      about: { "@id": placeId },
      inLanguage: localeConfig[locale].htmlLang
    },
    {
      "@type": pageType,
      "@id": `${url}#webpage`,
      url,
      name: page.title,
      description: page.description,
      isPartOf: { "@id": `${origin}/#website` },
      publisher: { "@id": organizationId },
      about: { "@id": pageEntityId },
      mainEntity: { "@id": routeId === "publicRecord" ? recordListId : pageEntityId },
      datePublished: "2026-09-01",
      dateModified: routeLastModified[routeId],
      inLanguage: localeConfig[locale].htmlLang
    }
  ];

  if (routeId !== "home") {
    const breadcrumbItems = [
      { "@type": "ListItem", position: 1, name: site[locale].breadcrumbHome, item: absolute(locale, "home") }
    ];
    if (page.parentRoute) breadcrumbItems.push({ "@type": "ListItem", position: 2, name: site[locale].nav[page.parentRoute], item: absolute(locale, page.parentRoute) });
    breadcrumbItems.push({ "@type": "ListItem", position: breadcrumbItems.length + 1, name: page.title, item: url });
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbItems
    });
  }

  const faq = page.blocks.find((block) => block.type === "faq");
  if (faq) graph.push({ "@type": "FAQPage", mainEntity: faq.items.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) });

  if (routeId === "news") {
    const feature = page.blocks.find((block) => block.type === "newsFeature");
    const updates = page.blocks.find((block) => block.type === "newsUpdates")?.items || [];
    const firstPartyItems = [feature, ...updates].filter(Boolean).map((item) => ({ url: absolute(locale, item.route), name: item.title }));
    const mediaItems = articles.map((article) => ({ url: article.url, name: article.title[locale] }));
    graph.push({
      "@type": "ItemList",
      name: page.title,
      itemListElement: [...firstPartyItems, ...mediaItems].map((item, index) => ({ "@type": "ListItem", position: index + 1, url: item.url, name: item.name }))
    });
  }

  if (routeId === "leasing") {
    graph.push({
      "@type": "ItemList",
      name: page.title,
      itemListElement: Object.values(leasingInventory).map((unit, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absolute(locale, unit.routeId),
        name: site[locale].pages[unit.routeId].title
      }))
    });
  }

  if (personPage) {
    graph.push({
      "@type": "Person",
      "@id": personId,
      name: "Wong Shung Yen",
      alternateName: "黄松延",
      jobTitle: "Managing Director",
      worksFor: { "@id": `${origin}/#organization` },
      url: profileUrl,
      image: images.portrait,
      ...(routeId === "profile" ? { mainEntityOfPage: { "@id": `${url}#webpage` } } : {}),
      sameAs: ["https://www.linkedin.com/in/wong-shung-yen/", "https://www.imdb.com/name/nm6562891/"],
      alumniOf: [{ "@type": "CollegeOrUniversity", name: "University of Melbourne" }],
      knowsAbout: ["Property Development", "Industrial Real Estate", "Asset Management", "Retail Clustering", "Placemaking"]
    });
  }

  if (routeId === "publicRecord") {
    graph.push({
      "@type": "ItemList",
      "@id": recordListId,
      name: page.title,
      numberOfItems: profileSources.length,
      about: { "@id": personId },
      itemListElement: profileSources.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: item.url,
        name: item.title[locale]
      }))
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

function scripts(locale) {
  const t = site[locale];
  return `<script>
    const menuButton = document.querySelector('.menu-button');
    const mobileMenu = document.querySelector('#mobile-menu');
    if (menuButton && mobileMenu) {
      menuButton.addEventListener('click', () => {
        const open = menuButton.getAttribute('aria-expanded') !== 'true';
        menuButton.setAttribute('aria-expanded', String(open));
        menuButton.setAttribute('aria-label', open ? ${safeJson(t.menuClose)} : ${safeJson(t.menuOpen)});
        mobileMenu.dataset.open = String(open);
        document.body.classList.toggle('menu-open', open);
      });
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') menuButton.click();
      });
    }
    const emailForm = document.querySelector('[data-email-form]');
    if (emailForm) {
      const requestedSpace = new URLSearchParams(window.location.search).get('space');
      const spaceField = emailForm.querySelector('[name="spaceType"]');
      const interestField = emailForm.querySelector('[name="interest"]');
      if (requestedSpace && spaceField && [...spaceField.options].some((option) => option.value === requestedSpace)) {
        spaceField.value = requestedSpace;
        interestField.value = ${safeJson(t.form.options[0])};
      }
      emailForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const data = new FormData(emailForm);
        const selectedSpace = spaceField?.selectedOptions[0]?.text || '-';
        const subject = 'TPK Park enquiry — ' + data.get('interest');
        const body = [
          '${escapeHtml(t.form.name)}: ' + data.get('name'),
          '${escapeHtml(t.form.company)}: ' + (data.get('company') || '-'),
          '${escapeHtml(t.form.email)}: ' + data.get('email'),
          '${escapeHtml(t.form.phone)}: ' + (data.get('phone') || '-'),
          '${escapeHtml(t.form.interest)}: ' + data.get('interest'),
          '${escapeHtml(t.form.spaceType)}: ' + selectedSpace,
          '',
          data.get('message')
        ].join('\\n');
        window.location.href = 'mailto:info@tpkpark.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      });
    }
  </script>`;
}

function analytics(locale, routeId) {
  const copy = analyticsCopy[locale];
  return `<section id="analytics-panel" class="analytics-consent" aria-labelledby="analytics-title" data-analytics-consent hidden>
    <div class="analytics-heading"><p id="analytics-title"><strong>${escapeHtml(copy.title)}</strong></p><button type="button" class="analytics-settings" data-analytics-close>${escapeHtml(copy.close)}</button></div>
    <p>${escapeHtml(copy.basicText)}</p>
    <details class="analytics-details"><summary>${escapeHtml(copy.more)}</summary><p>${escapeHtml(copy.detailText)}</p><p><a href="https://vercel.com/docs/analytics/privacy-policy" target="_blank" rel="noopener noreferrer">${escapeHtml(copy.vercelPrivacy)}</a> · <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">${escapeHtml(copy.googlePrivacy)}</a></p></details>
    <p class="analytics-status" data-analytics-status data-basic="${escapeHtml(copy.statusBasic)}" data-detailed="${escapeHtml(copy.statusDetailed)}" data-off="${escapeHtml(copy.statusOff)}" data-signal="${escapeHtml(copy.statusSignal)}" aria-live="polite"></p>
    <div class="analytics-actions"><button type="button" class="button button-dark" data-analytics-allow>${escapeHtml(copy.allow)}</button><button type="button" class="button button-outline" data-analytics-basic>${escapeHtml(copy.basic)}</button><button type="button" class="button button-outline" data-analytics-off>${escapeHtml(copy.off)}</button></div>
  </section>
  <script defer src="/js/analytics.js" data-measurement-id="${escapeHtml(measurementId)}" data-locale="${locale}" data-route="${routeId}" data-canonical="${absolute(locale, routeId)}"></script>`;
}

function renderPage(locale, routeId) {
  const t = site[locale];
  const page = t.pages[routeId];
  const seoTitle = seoTitles[locale][routeId];
  const canonical = absolute(locale, routeId);
  const alternates = locales.map((key) => `<link rel="alternate" hreflang="${localeConfig[key].hreflang}" href="${absolute(key, routeId)}">`).join("\n  ");
  const ogLocaleAlternates = locales.filter((key) => key !== locale).map((key) => `<meta property="og:locale:alternate" content="${localeConfig[key].ogLocale}">`).join("\n  ");
  const hero = routeId === "home" ? homeHero(locale, page) : pageHero(locale, routeId, page);
  const blocks = page.blocks.map((block, index) => renderBlock(locale, routeId, page, block, index)).join("");
  const ogImage = page.image || (routeId === "profile" ? images.portrait : images.park);
  const body = `${hero}${blocks}${routeId === "contact" ? "" : cta(locale, page)}`;
  return `<!doctype html>
<html lang="${localeConfig[locale].htmlLang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="referrer" content="strict-origin">
  <title>${escapeHtml(seoTitle)}</title>
  <meta name="description" content="${escapeHtml(page.description)}">
  <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">
  <meta name="theme-color" content="#173e31">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" sizes="any">
  <link rel="canonical" href="${canonical}">
  ${alternates}
  <link rel="alternate" hreflang="x-default" href="${absolute("en", routeId)}">
  <meta property="og:type" content="${routeId === "profile" ? "profile" : "website"}">
  <meta property="og:site_name" content="TPK Park">
  <meta property="og:locale" content="${localeConfig[locale].ogLocale}">
  ${ogLocaleAlternates}
  <meta property="og:title" content="${escapeHtml(seoTitle)}">
  <meta property="og:description" content="${escapeHtml(page.description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${ogImage}">
  <meta property="og:image:alt" content="${escapeHtml(page.title)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(seoTitle)}">
  <meta name="twitter:description" content="${escapeHtml(page.description)}">
  <meta name="twitter:image" content="${ogImage}">
  <meta name="twitter:image:alt" content="${escapeHtml(page.title)}">
  <link rel="preconnect" href="https://i.imgur.com" crossorigin>
  <link rel="stylesheet" href="/css/tailwind.css">
  <script type="application/ld+json">${safeJson(schemas(locale, routeId, page))}</script>
</head>
<body>
  <a class="skip-link" href="#main">${escapeHtml(t.skip)}</a>
  ${header(locale, routeId)}
  <main id="main">${body}</main>
  ${footer(locale)}
  ${analytics(locale, routeId)}
  ${scripts(locale)}
</body>
</html>`;
}

function outputFile(locale, routeId) {
  const path = routePath(locale, routeId);
  return path === "/" ? join(root, "index.html") : join(root, path.slice(1), "index.html");
}

for (const locale of locales) {
  for (const routeId of routeIds) {
    const file = outputFile(locale, routeId);
    await mkdir(dirname(file), { recursive: true });
    await writeFile(file, renderPage(locale, routeId), "utf8");
  }
}

const sitemapEntries = locales.flatMap((locale) => routeIds.map((routeId) => {
  const alternates = locales.map((key) => `    <xhtml:link rel="alternate" hreflang="${localeConfig[key].hreflang}" href="${absolute(key, routeId)}"/>`).join("\n");
  return `  <url>\n    <loc>${absolute(locale, routeId)}</loc>\n    <lastmod>${routeLastModified[routeId]}</lastmod>\n${alternates}\n    <xhtml:link rel="alternate" hreflang="x-default" href="${absolute("en", routeId)}"/>\n  </url>`;
})).join("\n");

await writeFile(join(root, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${sitemapEntries}\n</urlset>\n`, "utf8");
await writeFile(join(root, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`, "utf8");

console.log(`Generated ${locales.length * routeIds.length} pages across ${locales.length} locales.`);
