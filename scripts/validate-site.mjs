import { access, readFile } from "node:fs/promises";
import { dirname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { articles, jadeExhibitionLastModified, leasingInventory, localeConfig, origin, profileSources, routeIds, routeLastModified, routePath, seoTitles, site } from "./site-data.mjs";

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
        if (!["profile", "publicRecord"].includes(routeId) && webPage?.mainEntity?.["@id"] !== (page.business?.["@id"] || placeId)) fail(label, "WebPage main entity does not reference its business or place");
        if (page.business) {
          const business = graph.find(entry => entry["@id"] === page.business["@id"]);
          const expected = {
            motd: { type: "Restaurant", url: "https://www.motdgroup.com/", phone: "+60166626951" },
            lavino: { type: "FurnitureStore", url: "https://www.lavino.com.my/", phone: "+60163391601" },
            gaHing: { type: "HomeGoodsStore", url: "https://gahing.com/", phone: "+60380809119" },
            kucheBath: { type: "HomeGoodsStore", url: "https://kbomy.com/", phone: "+60380791268" },
            jubinBms: { type: "HomeGoodsStore", url: "https://www.jubinbms.com.my/", phone: "+60380748300" },
            vHausLiving: { type: "FurnitureStore", url: "https://www.vhausliving.com/", phone: "+60127086389" },
            balensDesign: { type: "LocalBusiness", url: "https://balensdesign.com/", phone: "+60173388535" },
            builtop: { type: "LocalBusiness", url: "https://www.builtopmalaysia.com/", phone: "+601126838848" },
            premioDoor: { type: "HomeGoodsStore", url: "https://premiodoor.com.my/", phone: "+60165255100" },
            klot: { type: "HomeGoodsStore", url: "https://www.klot.com.my/", phone: "+60183403828" },
            dcMoto: { type: "LocalBusiness", url: "https://www.dcmoto.my/", phone: "+601156279623", contactUrl: "https://wa.me/601156279623" },
            fagolli: { type: "HomeGoodsStore", url: "https://www.fagolli.com.my/", phone: "+601154078187" },
            totalTools: { type: "HardwareStore", url: "https://www.totaltools.com.my/", phone: "+60102908007" },
            baagus: { type: "HomeGoodsStore", url: "https://baagus.com/", phone: "+60102133173" },
            mkCurtain: { type: "HomeGoodsStore", url: "https://www.mk.com.my/", phone: "+60380747210" },
            signature: { type: "HomeGoodsStore", url: "https://signature.my/", phone: "+60168133182" },
            chooseInterior: { type: "LocalBusiness", url: "https://www.instagram.com/chooseinterior.cid/", contactUrl: "https://www.instagram.com/chooseinterior.cid/" },
            peroduaKinrara: { type: "AutoDealer", url: "https://www.perodua3skinrara.com/", phone: "+60332912266" },
            mazdaKinrara: { type: "AutoDealer", url: "https://www.facebook.com/MazdaPersadaAuto/", phone: "+60380750812" }
          }[routeId];
          if (!expected || business?.["@type"] !== expected.type || business?.containedInPlace?.["@id"] !== placeId) fail(label, "Business profile must identify its business type and park location");
          if (business?.url !== expected?.url || business?.telephone !== expected?.phone) fail(label, "Business identity or branch contact is incorrect");
          if (!html.includes(`href="${expected?.contactUrl || `tel:${expected?.phone}`}"`)) fail(label, "Visible business contact does not match its published contact channel");
          if (routeId === "mazdaKinrara") {
            const visit = page.blocks.find(block => block.type === "businessVisit");
            if (business?.legalName !== "Persada Auto Sdn Bhd" || business?.address?.streetAddress !== "8, Jalan TPK 2/2, Taman Perindustrian Kinrara, Seksyen 2" || business?.address?.postalCode !== "47180" || /Kota Damansara|6142 1662|Jalan TPK 2\/3/.test(html)) fail(label, "Mazda must retain the Puchong Kinrara branch identity and address");
            if (visit?.contacts?.length !== 2 || !html.includes('href="tel:+60380750813"') || business?.contactPoint?.[1]?.telephone !== "+60380750813") fail(label, "Both verified Mazda branch lines must remain available");
            if (business?.openingHoursSpecification || business?.department || visit?.hours?.length) fail(label, "Do not infer Mazda hours or a department split from conflicting listings");
            if (business?.hasMap !== "https://waze.com/ul/hw2832g1br" || !html.includes('href="https://waze.com/ul/hw2832g1br"')) fail(label, "Mazda must retain its published Kinrara Waze destination");
            if (business?.image !== `${origin}/assets/images/mazda-kinrara-exterior-1280.webp` || !page.heroAlt.includes("2016") || !page.blocks.find(block => block.type === "split")?.caption.includes("2016")) fail(label, "Mazda’s original branch photo must keep its archive date");
          }
          if (routeId === "peroduaKinrara") {
            const service = business?.department;
            const visit = page.blocks.find(block => block.type === "businessVisit");
            if (business?.legalName !== "Lon G Setia Auto Sdn. Bhd." || business?.address?.streetAddress !== "8, Jalan TPK 2/3, Taman Perindustrian Kinrara, Seksyen 2" || business?.address?.postalCode !== "47180" || /Jalan Bridge|Kampung Sungai Kayu Ara|77317761|77279966/.test(html)) fail(label, "Perodua must use the Kinrara branch identity, address and contacts");
            if (service?.["@type"] !== "AutoRepair" || service?.telephone !== "+60332162255" || service?.parentOrganization?.["@id"] !== business?.["@id"] || !html.includes('href="tel:+60332162255"')) fail(label, "Perodua service enquiries must remain distinct from sales");
            if (business?.openingHoursSpecification?.[0]?.closes !== "20:00" || business?.openingHoursSpecification?.[1]?.closes !== "16:00" || service?.openingHoursSpecification?.[0]?.closes !== "17:00" || service?.openingHoursSpecification?.[1]?.opens !== "00:00" || service?.openingHoursSpecification?.[1]?.closes !== "00:00") fail(label, "Perodua must preserve separate showroom and service schedules");
            if (visit?.contacts?.length !== 2 || visit?.hours?.length !== 2 || [...visit.contacts, ...visit.hours].some(item => !html.includes(escapeHtml(item.label)) || !html.includes(escapeHtml(item.value)))) fail(label, "Both Perodua contacts and schedules must be visible");
            if (business?.image !== `${origin}/assets/images/perodua-kinrara-showroom-810.webp` || business?.hasMap !== "https://maps.google.com/?daddr=3.047798,101.637174") fail(label, "Perodua must retain its actual Kinrara photo and official branch directions");
          }
          if (routeId === "chooseInterior") {
            if (business?.address?.streetAddress !== "21-1, Jalan TPK 2/8, Taman Perindustrian Kinrara, Seksyen 2" || business?.address?.postalCode !== "47180" || /231 TR|Jalan Tun Razak|Wb78HRh6yhDg84vn8|hw283fszu6/.test(html)) fail(label, "Choose Interior must use its TPK Park address rather than the Imbi showroom details");
            if (business?.telephone || business?.openingHours || business?.openingHoursSpecification || business?.image || html.includes("tel:undefined")) fail(label, "Choose Interior must not infer a local phone, hours or a premises photograph");
            if (business?.contactPoint?.url !== expected.contactUrl) fail(label, "Choose Interior must retain its verified public Instagram enquiry channel");
          }
          if (routeId === "signature") {
            if (business?.address?.streetAddress !== "9, Jalan TPK 2/8, Taman Perindustrian Kinrara" || business?.address?.postalCode !== "47180" || /\+60126231866|\+60122877793|Jalan Puteri 1\/5/.test(html)) fail(label, "Signature must use its Bandar Kinrara branch details rather than the national or Bandar Puteri contact");
            if (business?.image) fail(label, "The Signature kitchen design must not be presented as a photo of the Bandar Kinrara premises");
          }
          if (routeId === "baagus") {
            if (business?.address?.streetAddress !== "7, Jalan TPK 2/8, Seksyen 2, Taman Perindustrian Kinrara" || business?.address?.postalCode !== "47180" || /\+60389385202|\+60127173005|Jalan BPD 1/.test(html)) fail(label, "Baagus must use its Bandar Kinrara branch details rather than D'Alpinia Puchong");
            const hours = business?.openingHoursSpecification;
            const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            if (hours?.length !== 2 || hours[0]?.opens !== "10:00" || hours[0]?.closes !== "19:00" || hours[0]?.dayOfWeek?.length !== 6 || days.some(day => !hours[0]?.dayOfWeek?.includes(day)) || hours[1]?.opens !== "10:00" || hours[1]?.closes !== "18:00" || hours[1]?.dayOfWeek?.length !== 1 || hours[1]?.dayOfWeek?.[0] !== "Sunday") fail(label, "Baagus must preserve the current official Kinrara hours, including the earlier Sunday closing");
            const sunday = { en: "Sunday, 10am–6pm", ms: "Ahad, 10 pagi–6 petang", zh: "星期日为上午10时至下午6时" }[locale];
            if (!html.includes(sunday)) fail(label, "Baagus Sunday hours must be visible");
            if (business?.hasMap !== "https://waze.com/ul/hw2832g40q" || !html.includes('href="https://waze.com/ul/hw2832g40q"')) fail(label, "Baagus must retain its official Kinrara Waze link");
            if (business?.image !== `${origin}/assets/images/baagus-kinrara-showroom-1440.webp`) fail(label, "Baagus must use the actual Kinrara storefront photograph");
          }
          if (routeId === "totalTools") {
            if (business?.address?.streetAddress !== "6, Jalan TPK 2/2, Taman Perindustrian Kinrara, Seksyen 2" || business?.address?.postalCode !== "47100" || /\+601126237882|\+601116174342|Jalan BPU 1/.test(html)) fail(label, "Total Tools must use the Kinrara branch details rather than the national office or Puchong Utama");
            if (business?.openingHoursSpecification || business?.openingHours) fail(label, "Total Tools must not publish conflicting hours as confirmed branch hours");
            if (business?.hasMap !== "https://maps.app.goo.gl/a5rv2mVYV5JwENgX6" || !html.includes('href="https://maps.app.goo.gl/a5rv2mVYV5JwENgX6"')) fail(label, "Total Tools must retain the official Kinrara map link");
            if (business?.image) fail(label, "The TOTAL product image must not be presented as a photo of the Kinrara premises");
          }
          if (routeId === "fagolli") {
            if (business?.legalName !== "Digicraft MSC Sdn. Bhd." || business?.address?.streetAddress !== "43-1, Jalan TPK 2/8, Taman Perindustrian Kinrara, Seksyen 2" || business?.address?.postalCode !== "47180" || /\+601116328187|\+601111178187|E9-1/.test(html)) fail(label, "Fagolli must use the current English/Malay Puchong contact listing consistently");
            const hours = business?.openingHoursSpecification;
            const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
            if (hours?.length !== 1 || hours[0]?.opens !== "10:00" || hours[0]?.closes !== "18:00" || hours[0]?.dayOfWeek?.length !== 5 || weekdays.some(day => !hours[0]?.dayOfWeek?.includes(day))) fail(label, "Fagolli must publish regular weekday hours only");
            const appointment = { en: "Saturday and Sunday visits are by appointment only", ms: "Lawatan pada Sabtu dan Ahad adalah melalui janji temu sahaja", zh: "星期六及星期日仅接受预约" }[locale];
            if (!html.includes(appointment)) fail(label, "Fagolli must distinguish appointment-only weekend visits");
            if (business?.contactPoint?.url !== "https://wa.me/601154078187" || !html.includes('href="https://wa.me/601154078187"')) fail(label, "Fagolli must retain its published WhatsApp contact");
          }
          if (routeId === "dcMoto") {
            if (business?.legalName !== "Intelligent Network Sdn Bhd" || business?.address?.streetAddress !== "49G, Jalan TPK 2/8, Taman Perindustrian Kinrara, Seksyen 2" || business?.address?.postalCode !== "47180" || /\+60389996636|\+601110843163|\+601110703163/.test(html)) fail(label, "DC Moto must use its Puchong centre details, not a dealer contact");
            if (business?.openingHoursSpecification || business?.openingHours) fail(label, "DC Moto must not publish unverified centre opening hours");
            if (business?.contactPoint?.contactType !== "WhatsApp enquiries" || business?.contactPoint?.url !== expected.contactUrl || html.includes('href="tel:+601156279623"')) fail(label, "DC Moto must preserve the official WhatsApp contact channel");
            const dealerNote = { en: "DCMOTO directs sales and purchases to its dealers", ms: "DCMOTO mengarahkan urusan jualan dan pembelian kepada pengedarnya", zh: "DCMOTO的销售与购买事宜请联系其经销商" }[locale];
            if (!html.includes(dealerNote)) fail(label, "DC Moto must distinguish its centre from dealer sales");
          }
          if (routeId === "klot") {
            if (business?.legalName !== "KLOT Resources (M) Sdn. Bhd." || business?.address?.streetAddress !== "23-1, Jalan TPK 2/8, Taman Perindustrian Kinrara, Seksyen 2" || business?.address?.postalCode !== "47180" || /\+60167135100/.test(html)) fail(label, "KLOT must use its current official address and contact");
            const hours = business?.openingHoursSpecification;
            const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
            if (hours?.length !== 2 || hours[0]?.opens !== "08:30" || hours[0]?.closes !== "17:30" || hours[0]?.dayOfWeek?.length !== 5 || weekdays.some(day => !hours[0]?.dayOfWeek?.includes(day)) || hours[1]?.opens !== "08:30" || hours[1]?.closes !== "14:00" || hours[1]?.dayOfWeek?.length !== 1 || hours[1]?.dayOfWeek?.[0] !== "Saturday") fail(label, "KLOT must distinguish weekday and Saturday hours");
            const closed = { en: "Closed on Sunday", ms: "Tutup pada hari Ahad", zh: "星期日休息" }[locale];
            if (!html.includes(closed)) fail(label, "KLOT must make its Sunday closure visible");
          }
          if (routeId === "lavino" && (business?.address?.streetAddress !== "6, Jalan TPK 2/2, Taman Perindustrian Kinrara" || business?.address?.postalCode !== "47100" || html.includes("+60166626951"))) fail(label, "Lavino must use its own branch address and contact");
          if (routeId === "gaHing" && (business?.address?.streetAddress !== "4, Jalan TPK 2/2, Taman Perindustrian Kinrara" || business?.address?.postalCode !== "47100" || /\+60163391601|\+60166626951/.test(html))) fail(label, "Ga Hing must use its own branch address and contact");
          if (routeId === "jubinBms" && (business?.address?.streetAddress !== "7, Jalan TPK 2/3, Taman Perindustrian Kinrara" || business?.address?.postalCode !== "47100" || /\+6073608888|\+60197251990|\+60362722999/.test(html))) fail(label, "Jubin BMS must use its Kinrara branch address and contact, not HQ or Kepong");
          if (routeId === "premioDoor") {
            if (business?.address?.streetAddress !== "25-G, Jalan TPK 2/8, Seksyen 2, Taman Perindustrian Kinrara" || business?.address?.postalCode !== "47180" || /\+60162565100|\+60168269100/.test(html)) fail(label, "Premio Door must use its Puchong branch address and phone");
            if (business?.openingHoursSpecification || business?.openingHours) fail(label, "Premio Door must not publish unverified opening hours");
            if (business?.image !== "https://www.tpkpark.com/assets/images/premio-door-puchong-1000.webp" || !html.includes('src="/assets/images/premio-door-puchong-1000.webp"')) fail(label, "Premio Door must use the verified Puchong showroom photo");
          }
          if (routeId === "builtop") {
            if (business?.legalName !== "Builtop Group Sdn. Bhd." || business?.address?.streetAddress !== "13-1, Jalan TPK 2/8, Taman Perindustrian Kinrara" || business?.address?.postalCode !== "47100" || /\+60102423593|\+60173388535/.test(html)) fail(label, "BUILTOP must use its official Group identity, Puchong address and contact");
            if (business?.openingHoursSpecification || business?.openingHours) fail(label, "BUILTOP must not publish unverified office hours");
            const hoursNote = { en: "Confirm office hours and your meeting time directly with BUILTOP", ms: "Sahkan waktu pejabat dan masa pertemuan terus dengan BUILTOP", zh: "出发前请直接向BUILTOP确认办公时间与会面安排" }[locale];
            if (!html.includes(hoursNote)) fail(label, "BUILTOP must direct visitors to confirm office hours");
          }
          if (routeId === "balensDesign") {
            if (business?.address?.streetAddress !== "25-1, Jalan TPK 2/8, Taman Perindustrian Kinrara" || business?.address?.postalCode !== "47180" || /\+60129892020/.test(html)) fail(label, "Balens Design must use its office address and current official phone");
            const hours = business?.openingHoursSpecification?.[0];
            const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
            if (hours?.opens !== "09:00" || hours?.closes !== "18:00" || hours?.dayOfWeek?.length !== 5 || days.some(day => !hours?.dayOfWeek?.includes(day))) fail(label, "Balens Design must distinguish weekday hours from appointment-only days");
            const appointment = { en: "Saturdays, Sundays and public holidays are by appointment only", ms: "Sabtu, Ahad dan cuti umum adalah melalui janji temu sahaja", zh: "星期六、星期日及公共假期仅接受预约" }[locale];
            if (!html.includes(appointment)) fail(label, "Balens Design must explain weekend and public-holiday appointments");
          }
          if (routeId === "vHausLiving") {
            if (business?.address?.streetAddress !== "1, 3, 5, Jalan TPK 2/8, Bandar Kinrara 4" || business?.address?.postalCode !== "47100" || /\+60196818961|\+601116678389|\+601121108389/.test(html)) fail(label, "V Haus Living must use its Puchong branch address and contact");
            const hours = business?.openingHoursSpecification?.[0];
            const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
            if (hours?.opens !== "10:30" || hours?.closes !== "19:30" || days.some(day => !hours?.dayOfWeek?.includes(day))) fail(label, "V Haus Living must use the published daily Puchong opening hours");
          }
        }
        if (routeId === "kucheBath") {
          const business = graph.find(entry => entry["@id"] === page.business["@id"]);
          if (business?.address?.streetAddress !== "39G, Jalan TPK 2/8, Taman Perindustrian Kinrara" || business?.address?.postalCode !== "47180" || /\+601139101314|\+60380809119|\+60163391601/.test(html)) fail(label, "Kuche + BaTH must use its Puchong branch address and contact");
        }
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
// The jade generator adds one exhibition page per locale after the core routes.
const jadeUrls = locales.map(locale => `${origin}${routePath(locale, "profile")}jade-exhibition-2024/`);
const expectedSitemapCount = locales.length * routeIds.length + jadeUrls.length;
if (locs.length !== expectedSitemapCount) fail("sitemap.xml", `expected ${expectedSitemapCount} locations, found ${locs.length}`);
if (lastmods.length !== expectedSitemapCount) fail("sitemap.xml", `expected ${expectedSitemapCount} lastmod values, found ${lastmods.length}`);
for (const locale of locales) for (const routeId of routeIds) {
  const url = `${origin}${routePath(locale, routeId)}`;
  if (!sitemap.includes(`<loc>${url}</loc>`)) fail("sitemap.xml", `missing ${url}`);
  if (!sitemap.includes(`<loc>${url}</loc>\n    <lastmod>${routeLastModified[routeId]}</lastmod>`)) fail("sitemap.xml", `missing or incorrect lastmod for ${url}`);
}
for (const url of jadeUrls) {
  if (!sitemap.includes(`<loc>${url}</loc>\n    <lastmod>${jadeExhibitionLastModified}</lastmod>`)) fail("sitemap.xml", `missing or incorrect exhibition entry for ${url}`);
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
