import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { jadeExhibitionLastModified as lastModified } from "./site-data.mjs";

const root = process.cwd();
const origin = "https://www.tpkpark.com";

const locales = {
  en: {
    htmlLang: "en-MY", hreflang: "en-MY", profilePath: "/wong-shung-yen/", publicRecordPath: "/wong-shung-yen/public-record/", jadePath: "/wong-shung-yen/jade-exhibition-2024/",
    home: "Home", leadership: "Leadership", cultureLabel: "Arts & cultural engagement · 2024",
    seoTitle: "Wong Shung Yen | Co-Curator, National Art Gallery Jade Exhibition 2024",
    title: "JADE: A Journey Across Millennia of Dedication to Enduring Prosperity",
    description: "Explore the 2024 National Art Gallery jade exhibition, co-curated by Wong Shung Yen, with exhibition details, media coverage and catalogue information.",
    lead: "Wong Shung Yen served as co-curator of this exhibition, presented by the Malaysian Chinese Cultural Society at the National Art Gallery to mark 50 years of Malaysia–China diplomatic relations.",
    profileKicker: "Arts & cultural engagement", profileTitle: "Co-curating a National Art Gallery jade exhibition", profileText: "In 2024, Wong Shung Yen served as co-curator of a month-long National Art Gallery exhibition on ancient jade, presented by the Malaysian Chinese Cultural Society to mark 50 years of Malaysia–China diplomatic relations.", profileLink: "Explore the exhibition",
    recordKicker: "Culture · 2024", recordTitle: "Jade exhibition at the National Art Gallery, 2024", recordText: "Wong Shung Yen served as co-curator of JADE: A Journey Across Millennia of Dedication to Enduring Prosperity, presented by the Malaysian Chinese Cultural Society at the National Art Gallery to mark 50 years of Malaysia–China diplomatic relations.", recordMore: "Explore the exhibition, its background and selected media coverage.", recordLink: "View the exhibition",
    factsKicker: "National Art Gallery · 2024", factsTitle: "About the exhibition", factsText: "Held at the National Art Gallery in Kuala Lumpur from 23 November to 23 December 2024, the exhibition brought together more than 100 jade carvings spanning prehistoric cultures through the Ming and Qing dynasties.",
    cards: [
      ["01", "Jade and craftsmanship", "The works offered a view of jade carving, changing styles and the cultural significance of jade across different historical periods."],
      ["02", "Malaysia–China 50th anniversary", "Presented to mark 50 years of diplomatic relations between Malaysia and China, the exhibition formed part of the anniversary’s cultural programme."],
      ["03", "Media coverage", "The exhibition was covered by English, Chinese and Malay publications, including The Star, Oriental Daily, Nanyang Siang Pau, Kwong Wah Yit Poh and Dewan Budaya."],
    ],
    stats: [["113", "jade works documented in the exhibition catalogue"], ["23 Nov–23 Dec 2024", "exhibition dates"], ["National Art Gallery", "Kuala Lumpur · Malaysia"]],
    sourcesKicker: "Selected reading", sourcesTitle: "Media coverage and official announcements", sourcesText: "Read selected reports and announcements from the gallery, the organiser and English, Chinese and Malay publications.",
    legacyKicker: "Further reading", legacyTitle: "Academic support and exhibition catalogue", legacyText: "The following links provide further background on the exhibition’s academic support and the catalogue published after the exhibition.",
    backRecord: "View full media & public record", backProfile: "Return to Wong Shung Yen profile",
  },
  ms: {
    htmlLang: "ms-MY", hreflang: "ms-MY", profilePath: "/ms/wong-shung-yen/", publicRecordPath: "/ms/wong-shung-yen/public-record/", jadePath: "/ms/wong-shung-yen/jade-exhibition-2024/",
    home: "Laman utama", leadership: "Kepimpinan", cultureLabel: "Penglibatan seni & budaya · 2024",
    seoTitle: "Wong Shung Yen | Kurator Bersama Pameran Jed Balai Seni Negara 2024",
    title: "Pameran Batu Jed: Jejak Beribu Tahun Menuju Kemakmuran Yang Abadi",
    description: "Kenali pameran jed Balai Seni Negara 2024 dengan Wong Shung Yen sebagai kurator bersama, termasuk butiran pameran, liputan media dan maklumat katalog.",
    lead: "Wong Shung Yen ialah kurator bersama pameran ini, yang dianjurkan oleh Pertubuhan Kebudayaan Cina Malaysia di Balai Seni Negara sempena 50 tahun hubungan diplomatik Malaysia–China.",
    profileKicker: "Penglibatan seni & budaya", profileTitle: "Kurator bersama pameran jed di Balai Seni Negara", profileText: "Pada 2024, Wong Shung Yen ialah kurator bersama pameran jed purba selama sebulan di Balai Seni Negara. Pameran ini dianjurkan oleh Pertubuhan Kebudayaan Cina Malaysia sempena 50 tahun hubungan diplomatik Malaysia–China.", profileLink: "Terokai pameran",
    recordKicker: "Budaya · 2024", recordTitle: "Pameran jed di Balai Seni Negara, 2024", recordText: "Wong Shung Yen ialah kurator bersama Pameran Batu Jed: Jejak Beribu Tahun Menuju Kemakmuran Yang Abadi, yang dianjurkan oleh Pertubuhan Kebudayaan Cina Malaysia di Balai Seni Negara sempena 50 tahun hubungan diplomatik Malaysia–China.", recordMore: "Ketahui latar belakang pameran dan baca liputan media terpilih.", recordLink: "Lihat pameran",
    factsKicker: "Balai Seni Negara · 2024", factsTitle: "Mengenai pameran", factsText: "Pameran ini berlangsung di Balai Seni Negara, Kuala Lumpur, dari 23 November hingga 23 Disember 2024. Lebih 100 ukiran jed dipamerkan, merangkumi zaman prasejarah hingga dinasti Ming dan Qing.",
    cards: [
      ["01", "Jed dan seni ukiran", "Karya yang dipamerkan memperlihatkan seni ukiran jed, perubahan gaya dan makna budaya jed dalam pelbagai zaman."],
      ["02", "50 tahun Malaysia–China", "Pameran ini merupakan sebahagian daripada program kebudayaan sempena 50 tahun hubungan diplomatik Malaysia dan China."],
      ["03", "Liputan media", "Pameran ini mendapat liputan penerbitan bahasa Inggeris, Cina dan Melayu, termasuk The Star, Oriental Daily, Nanyang Siang Pau, Kwong Wah Yit Poh dan Dewan Budaya."],
    ],
    stats: [["113", "karya jed yang didokumentasikan dalam katalog pameran"], ["23 Nov–23 Dis 2024", "tarikh pameran"], ["Balai Seni Negara", "Kuala Lumpur · Malaysia"]],
    sourcesKicker: "Bacaan terpilih", sourcesTitle: "Liputan media dan pengumuman rasmi", sourcesText: "Baca laporan dan pengumuman terpilih daripada galeri, penganjur serta penerbitan bahasa Inggeris, Cina dan Melayu.",
    legacyKicker: "Bacaan lanjut", legacyTitle: "Sokongan akademik dan katalog pameran", legacyText: "Pautan berikut memberikan maklumat lanjut tentang sokongan akademik dan katalog yang diterbitkan selepas pameran.",
    backRecord: "Lihat rekod media & awam penuh", backProfile: "Kembali ke profil Wong Shung Yen",
  },
  zh: {
    htmlLang: "zh-Hans-MY", hreflang: "zh-Hans-MY", profilePath: "/zh/wong-shung-yen/", publicRecordPath: "/zh/wong-shung-yen/public-record/", jadePath: "/zh/wong-shung-yen/jade-exhibition-2024/",
    home: "首页", leadership: "领导简介", cultureLabel: "艺术与文化参与 · 2024",
    seoTitle: "黄松延｜2024国家美术馆古玉展联合策展人",
    title: "《璀璨千年—不朽与繁荣之美》古玉展",
    description: "了解黄松延担任联合策展人的2024年国家美术馆《璀璨千年》古玉展，包括展览背景、媒体报道、学术支持及展览图录。",
    lead: "黄松延担任本次古玉展的联合策展人。展览由马来西亚华人文化协会在国家美术馆呈献，配合马中建交50周年举行。",
    profileKicker: "艺术与文化参与", profileTitle: "联合策展国家美术馆古玉展", profileText: "2024年，黄松延担任国家美术馆古玉展的联合策展人。展览为期一个月，由马来西亚华人文化协会配合马中建交50周年呈献。", profileLink: "了解展览",
    recordKicker: "文化 · 2024", recordTitle: "2024年国家美术馆古玉展", recordText: "黄松延担任《璀璨千年—不朽与繁荣之美》古玉展的联合策展人。展览由马来西亚华人文化协会在国家美术馆呈献，配合马中建交50周年举行。", recordMore: "了解展览背景，并浏览精选媒体报道。", recordLink: "查看展览",
    factsKicker: "国家美术馆 · 2024", factsTitle: "关于展览", factsText: "展览于2024年11月23日至12月23日在吉隆坡国家美术馆举行，展出逾100件玉雕，涵盖史前文化至明清时期的作品。",
    cards: [
      ["01", "古玉与工艺", "从雕刻技法到造型与纹饰，展品呈现不同时期的审美变化，以及玉器在礼仪与文化生活中的意义。"],
      ["02", "马中建交50周年", "展览是马中建交50周年文化活动之一，以古玉为题，介绍历史、工艺与文化交流。"],
      ["03", "媒体报道", "展览获英语、中文及马来语媒体报道，包括《星报》《东方日报》《南洋商报》《光华日报》及《Dewan Budaya》。"],
    ],
    stats: [["113", "展览图录收录的玉器作品"], ["2024年11月23日–12月23日", "展览日期"], ["国家美术馆", "吉隆坡 · 马来西亚"]],
    sourcesKicker: "精选阅读", sourcesTitle: "媒体报道与官方消息", sourcesText: "浏览国家美术馆、主办方及英语、中文、马来语媒体发布的展览消息与报道。",
    legacyKicker: "延伸阅读", legacyTitle: "学术支持与展览图录", legacyText: "以下链接介绍展览的学术支持，以及展后出版的图录。",
    backRecord: "查看完整媒体与公开记录", backProfile: "返回黄松延简介",
  },
};

const sourceRecords = [
  { date: "22 Nov 2024", source: "National Art Gallery / MOTAC", lang: "English", kind: "Media release", url: "https://www.artgallery.gov.my/wp-content/uploads/2024/11/MEDIA-RELEASE-JADE-EXHIBITION.pdf", summaries: {
    en: "The National Art Gallery’s English media release introduces the exhibition, its organisers and curatorial team.",
    ms: "Siaran media bahasa Inggeris Balai Seni Negara memperkenalkan pameran, penganjur dan pasukan kuratornya.",
    zh: "国家美术馆英文文告介绍展览、主办单位与策展团队。",
  }},
  { date: "22 Nov 2024", source: "National Art Gallery / MOTAC", lang: "Bahasa Melayu", kind: "Media release", url: "https://www.artgallery.gov.my/wp-content/uploads/2024/11/SIARAN-MEDIA-PAMERAN-BATU-JED-JEJAK-BERIBU-TAHUN-MENUJU-KEMAKMURAN-ABADI.docx.pdf", summaries: {
    en: "The National Art Gallery’s Malay media release provides an overview of the exhibition.",
    ms: "Siaran media bahasa Melayu Balai Seni Negara memberikan gambaran keseluruhan pameran.",
    zh: "国家美术馆马来文文告介绍展览概况。",
  }},
  { date: "23 Nov 2024", source: "Malaysian Chinese Cultural Society", lang: "Chinese", kind: "Organiser announcement", url: "https://www.facebook.com/MalaysianChineseCulturalSocietyMCCS/posts/595099459531826/", summaries: {
    en: "The Malaysian Chinese Cultural Society’s announcement introduces the exhibition and acknowledges the curatorial team.",
    ms: "Pengumuman Pertubuhan Kebudayaan Cina Malaysia memperkenalkan pameran dan merakamkan penghargaan kepada pasukan kurator.",
    zh: "马来西亚华人文化协会发布展览消息，并向策展团队致谢。",
  }},
  { date: "25 Nov 2024", source: "The Star", lang: "English", kind: "News report", url: "https://www.thestar.com.my/metro/metro-news/2024/11/25/over-100-jade-carvings-showcased-at-national-art-gallery-exhibition", summaries: {
    en: "A report on the exhibition’s jade carvings, historical scope and curatorial team.",
    ms: "Laporan tentang ukiran jed, zaman yang diwakili oleh karya pameran dan pasukan kurator.",
    zh: "《星报》介绍展出的玉雕、作品的历史跨度与策展团队。",
  }},
  { date: "25 Nov 2024", source: "Oriental Daily", lang: "Chinese", kind: "News report", url: "https://www.orientaldaily.com.my/news/nation/2024/11/25/695335", summaries: {
    en: "A report on the exhibition and its 113 jade works.",
    ms: "Laporan tentang pameran dan 113 karya jed yang dipamerkan.",
    zh: "《东方日报》报道展览及展出的113件玉雕。",
  }},
  { date: "25 Nov 2024", source: "Dewan Budaya / DBP", lang: "Bahasa Melayu", kind: "Cultural feature", url: "https://dewanbudaya.jendeladbp.my/2024/11/25/10670/", summaries: {
    en: "A cultural feature on the jade exhibition at the National Art Gallery.",
    ms: "Rencana kebudayaan tentang pameran jed di Balai Seni Negara.",
    zh: "《Dewan Budaya》刊登国家美术馆古玉展的文化专题报道。",
  }},
  { date: "26 Nov 2024", source: "Nanyang Siang Pau", lang: "Chinese", kind: "News report", url: "https://www.enanyang.my/news/20241126/State/640501", summaries: {
    en: "Coverage of the exhibition and its 113 jade works.",
    ms: "Liputan pameran dan 113 karya jed yang dipamerkan.",
    zh: "《南洋商报》介绍古玉展及展出的113件玉雕。",
  }},
  { date: "26 Nov 2024", source: "Kwong Wah Yit Poh", lang: "Chinese", kind: "News report", url: "https://www.kwongwah.com.my/20241126/%E7%92%80%E7%92%A8%E5%8D%83%E5%B9%B4%E5%8F%A4%E7%8E%89%E5%B1%95-113%E4%BB%B6%E7%8E%89%E9%9B%95%E4%BA%A4%E6%B5%81%E4%BA%92%E9%89%B4/", summaries: {
    en: "Coverage of the exhibition’s 113 jade carvings and its Malaysia–China cultural exchange setting.",
    ms: "Liputan 113 ukiran jed yang dipamerkan serta latar pertukaran budaya Malaysia–China.",
    zh: "《光华日报》报道展出的113件玉雕与马中文化交流背景。",
  }},
  { date: "23 Nov 2024", source: "MalaysiaGazette", lang: "Bahasa Melayu", kind: "News report", url: "https://malaysiagazette.com/2024/11/23/balai-seni-negara-anjur-pameran-batu-jed-jejak-beribu-tahun-menuju-kemakmuran-yang-abadi/", summaries: {
    en: "A Malay-language report introducing the exhibition at the National Art Gallery.",
    ms: "Laporan bahasa Melayu yang memperkenalkan pameran di Balai Seni Negara.",
    zh: "MalaysiaGazette以马来文介绍国家美术馆的古玉展。",
  }},
];

const contextSources = [
  { source: "Xiling Seal Art Society · 西泠印社", label: { en: "Academic support", ms: "Sokongan akademik", zh: "学术支持" }, url: "https://www.xlys.org.cn/hdgm/10851.jhtml", text: {
    en: "In October 2024, Xiling Seal Art Society agreed to provide academic support for the exhibition.",
    ms: "Pada Oktober 2024, Xiling Seal Art Society bersetuju memberikan sokongan akademik kepada pameran ini.",
    zh: "2024年10月，西泠印社复函同意担任展览的学术支持单位。",
  }},
  { source: "Exhibition catalogue · Tai Yip Art Bookshop", titles: { ms: "Katalog pameran · Tai Yip Art Bookshop", zh: "展览图录 · 大业艺术书店" }, label: { en: "Exhibition catalogue", ms: "Katalog pameran", zh: "展览图录" }, url: "https://www.taiyipartbookshop.com/product/%E7%92%80%E8%80%80%E5%8D%83%E5%B9%B4-a-journey-across-millennia-of-dedication-to-enduring-prosperity/", text: {
    en: "The exhibition catalogue documents 113 jade works spanning prehistoric cultures through the Ming and Qing dynasties. Further publication details are available through Tai Yip Art Bookshop.",
    ms: "Katalog pameran mendokumentasikan 113 karya jed dari zaman prasejarah hingga dinasti Ming dan Qing. Maklumat lanjut tentang penerbitan ini tersedia melalui Tai Yip Art Bookshop.",
    zh: "展览图录收录113件玉器作品，涵盖史前文化至明清时期。出版详情可参阅大业艺术书店的介绍。",
  }},
];

function escapeHtml(value = "") {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

function fileFor(pathname) {
  return join(root, pathname.slice(1), "index.html");
}

function sectionHeader(kicker, title, text = "", more = "") {
  return `<div class="section-header"><div><span class="section-number">${escapeHtml(kicker)}</span></div><div><h2>${escapeHtml(title)}</h2>${[text, more].filter(Boolean).map(paragraph => `<p>${escapeHtml(paragraph)}</p>`).join("")}</div></div>`;
}

function cultureProfileSection(locale, copy) {
  return `<section class="section section-sage"><div class="shell">${sectionHeader(copy.profileKicker, copy.profileTitle, copy.profileText)}<a class="button button-dark" href="${copy.jadePath}">${escapeHtml(copy.profileLink)} <span class="arrow" aria-hidden="true">→</span></a></div></section>`;
}

function publicRecordFeature(copy) {
  return `<section class="section section-sage"><div class="shell">${sectionHeader(copy.recordKicker, copy.recordTitle, copy.recordText, copy.recordMore)}<a class="button button-dark" href="${copy.jadePath}">${escapeHtml(copy.recordLink)} <span class="arrow" aria-hidden="true">→</span></a></div></section>`;
}

const sourceKindLabels = {
  ms: { "Media release": "Siaran media", "Organiser announcement": "Pengumuman penganjur", "News report": "Laporan berita", "Cultural feature": "Rencana kebudayaan" },
  zh: { "Media release": "新闻稿", "Organiser announcement": "主办方消息", "News report": "新闻报道", "Cultural feature": "文化专题" },
};

function renderSourceRecord(record, locale) {
  const kind = sourceKindLabels[locale]?.[record.kind] || record.kind;
  return `<article class="source-record"><div class="source-record-meta"><span>${escapeHtml(record.date)}</span><span>${escapeHtml(kind)}</span></div><div class="source-record-copy"><p class="source-publisher">${escapeHtml(record.source)} · ${escapeHtml(record.lang)}</p><h3><a href="${escapeHtml(record.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(record.source)} <span class="source-arrow" aria-hidden="true">↗</span></a></h3><p>${escapeHtml(record.summaries[locale])}</p></div></article>`;
}

function jadeMain(locale, copy) {
  const cards = copy.cards.map(([number, title, text]) => `<article class="card"><span class="number">${number}</span><h3>${escapeHtml(title)}</h3><p>${escapeHtml(text)}</p></article>`).join("");
  const stats = copy.stats.map(([value, label]) => `<div class="stat"><strong>${escapeHtml(value)}</strong><span>${escapeHtml(label)}</span></div>`).join("");
  const sources = sourceRecords.map(record => renderSourceRecord(record, locale)).join("");
  const context = contextSources.map(item => `<article class="source-record"><div class="source-record-meta"><span>${escapeHtml(item.label[locale])}</span></div><div class="source-record-copy"><h3><a href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(item.titles?.[locale] || item.source)} <span class="source-arrow" aria-hidden="true">↗</span></a></h3><p>${escapeHtml(item.text[locale])}</p></div></article>`).join("");
  return `<section class="page-hero"><div class="shell"><nav class="breadcrumb" aria-label="Breadcrumb"><a href="${locale === "en" ? "/" : `/${locale}/`}">${escapeHtml(copy.home)}</a><span aria-hidden="true">/</span><a href="${copy.profilePath}">${escapeHtml(copy.leadership)}</a><span aria-hidden="true">/</span><span aria-current="page">${escapeHtml(copy.cultureLabel)}</span></nav><div class="page-hero-grid"><div><p class="eyebrow">${escapeHtml(copy.cultureLabel)}</p><h1>${escapeHtml(copy.title)}</h1></div><p class="page-hero-copy">${escapeHtml(copy.lead)}</p></div></div></section>
  <section class="section-compact"><div class="shell"><div class="stats">${stats}</div></div></section>
  <section class="section"><div class="shell">${sectionHeader(copy.factsKicker, copy.factsTitle, copy.factsText)}<div class="card-grid">${cards}</div></div></section>
  <section class="section section-sage profile-sources-section"><div class="shell">${sectionHeader(copy.sourcesKicker, copy.sourcesTitle, copy.sourcesText)}<div class="source-years"><div class="source-list">${sources}</div></div></div></section>
  <section class="section profile-sources-section"><div class="shell">${sectionHeader(copy.legacyKicker, copy.legacyTitle, copy.legacyText)}<div class="source-years"><div class="source-list">${context}</div></div><div style="margin-top:34px;display:flex;gap:12px;flex-wrap:wrap"><a class="button button-dark" href="${copy.publicRecordPath}">${escapeHtml(copy.backRecord)} <span class="arrow" aria-hidden="true">→</span></a><a class="button button-outline" href="${copy.profilePath}">${escapeHtml(copy.backProfile)}</a></div></div></section>`;
}

function replaceMeta(html, copy) {
  const canonical = `${origin}${copy.jadePath}`;
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(copy.seoTitle)}</title>`);
  html = html.replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${escapeHtml(copy.description)}">`);
  html = html.replace(/<link rel="canonical" href="[^"]+">/, `<link rel="canonical" href="${canonical}">`);
  for (const other of Object.values(locales)) {
    html = html.replace(new RegExp(`<link rel="alternate" hreflang="${other.hreflang}" href="[^"]+">`), `<link rel="alternate" hreflang="${other.hreflang}" href="${origin}${other.jadePath}">`);
  }
  html = html.replace(/<link rel="alternate" hreflang="x-default" href="[^"]+">/, `<link rel="alternate" hreflang="x-default" href="${origin}${locales.en.jadePath}">`);
  html = html.replace(/<meta property="og:type" content="[^"]+">/, '<meta property="og:type" content="website">');
  html = html.replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${escapeHtml(copy.seoTitle)}">`);
  html = html.replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${escapeHtml(copy.description)}">`);
  html = html.replace(/<meta property="og:url" content="[^"]+">/, `<meta property="og:url" content="${canonical}">`);
  html = html.replace(/<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${escapeHtml(copy.seoTitle)}">`);
  html = html.replace(/<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${escapeHtml(copy.description)}">`);
  return html;
}

function replaceLocaleNav(html) {
  return html.replace(/<nav class="locale-nav ([^"]+)"[\s\S]*?<\/nav>/g, (nav) => {
    let updated = nav;
    for (const other of Object.values(locales)) updated = updated.replaceAll(`href="${other.profilePath}"`, `href="${other.jadePath}"`);
    return updated;
  });
}

function replaceSchema(html, locale, copy) {
  const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (!match) throw new Error(`Missing JSON-LD in ${locale} profile template`);
  const source = JSON.parse(match[1]);
  const graph = source["@graph"] || [];
  const person = graph.find(item => item["@type"] === "Person") || { "@type": "Person", name: "Wong Shung Yen", alternateName: "黄松延", url: `${origin}${copy.profilePath}` };
  person.knowsAbout = [...new Set([...(person.knowsAbout || []), "Cultural exhibition curation", "Chinese jade art exhibition"] )];
  person.subjectOf = { "@id": `${origin}${copy.jadePath}#webpage` };
  const organization = graph.find(item => item["@type"] === "Organization");
  const website = graph.find(item => item["@type"] === "WebSite");
  const page = {
    "@type": "WebPage", "@id": `${origin}${copy.jadePath}#webpage`, url: `${origin}${copy.jadePath}`, name: copy.seoTitle, description: copy.description, dateModified: lastModified,
    about: { "@id": `${origin}${copy.profilePath}#person` }, mainEntity: { "@id": `${origin}${copy.jadePath}#exhibition` }, ...(organization ? { publisher: { "@id": organization["@id"] } } : {}), ...(website ? { isPartOf: { "@id": website["@id"] } } : {}),
  };
  const exhibition = {
    "@type": "ExhibitionEvent", "@id": `${origin}${copy.jadePath}#exhibition`, name: copy.title, startDate: "2024-11-23", endDate: "2024-12-23", eventStatus: "https://schema.org/EventCompleted",
    location: { "@type": "Place", name: "National Art Gallery / Balai Seni Negara", address: { "@type": "PostalAddress", addressLocality: "Kuala Lumpur", addressCountry: "MY" } },
    organizer: { "@type": "Organization", name: "Malaysian Chinese Cultural Society" },
    contributor: [{ "@id": `${origin}${copy.profilePath}#person` }, { "@type": "Person", name: "Dr Low Cheong Sin", alternateName: "刘创新" }],
    description: copy.lead,
  };
  const evidence = { "@type": "ItemList", "@id": `${origin}${copy.jadePath}#sources`, name: copy.sourcesTitle, numberOfItems: sourceRecords.length, itemListElement: sourceRecords.map((item, index) => ({ "@type": "ListItem", position: index + 1, url: item.url, name: `${item.source}: ${item.kind}` })) };
  const breadcrumb = { "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: copy.home, item: `${origin}${locale === "en" ? "/" : `/${locale}/`}` },
    { "@type": "ListItem", position: 2, name: copy.leadership, item: `${origin}${copy.profilePath}` },
    { "@type": "ListItem", position: 3, name: copy.cultureLabel, item: `${origin}${copy.jadePath}` },
  ]};
  const newGraph = [organization, website, person, page, exhibition, evidence, breadcrumb].filter(Boolean);
  return html.replace(match[0], `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": newGraph }).replaceAll("<", "\\u003c")}</script>`);
}

function enhanceProfileSchema(html, copy) {
  const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (!match) return html;
  const schema = JSON.parse(match[1]);
  const person = schema["@graph"]?.find(item => item["@type"] === "Person");
  if (!person) return html;
  person.knowsAbout = [...new Set([...(person.knowsAbout || []), "Cultural exhibition curation"] )];
  person.subjectOf = { "@id": `${origin}${copy.jadePath}#webpage` };
  return html.replace(match[0], `<script type="application/ld+json">${JSON.stringify(schema).replaceAll("<", "\\u003c")}</script>`);
}

function updateSitemap(sitemap) {
  const entries = Object.values(locales).map(copy => {
    if (sitemap.includes(`<loc>${origin}${copy.jadePath}</loc>`)) return "";
    const alternates = Object.values(locales).map(other => `    <xhtml:link rel="alternate" hreflang="${other.hreflang}" href="${origin}${other.jadePath}"/>`).join("\n");
    return `  <url>\n    <loc>${origin}${copy.jadePath}</loc>\n    <lastmod>${lastModified}</lastmod>\n${alternates}\n    <xhtml:link rel="alternate" hreflang="x-default" href="${origin}${locales.en.jadePath}"/>\n  </url>`;
  }).filter(Boolean).join("\n");
  for (const copy of Object.values(locales)) {
    const escaped = copy.profilePath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    sitemap = sitemap.replace(new RegExp(`(<loc>${origin}${escaped}<\\/loc>\\s*<lastmod>)[^<]+`), `$1${lastModified}`);
    const recordEscaped = copy.publicRecordPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    sitemap = sitemap.replace(new RegExp(`(<loc>${origin}${recordEscaped}<\\/loc>\\s*<lastmod>)[^<]+`), `$1${lastModified}`);
  }
  return entries ? sitemap.replace("</urlset>", `${entries}\n</urlset>`) : sitemap;
}

for (const [locale, copy] of Object.entries(locales)) {
  const profileFile = fileFor(copy.profilePath);
  const recordFile = fileFor(copy.publicRecordPath);
  let profile = await readFile(profileFile, "utf8");
  let record = await readFile(recordFile, "utf8");

  if (!profile.includes(copy.jadePath)) profile = profile.replace('<section class="section profile-sources-section">', `${cultureProfileSection(locale, copy)}<section class="section profile-sources-section">`);
  profile = enhanceProfileSchema(profile, copy);
  await writeFile(profileFile, profile, "utf8");

  if (!record.includes(copy.jadePath)) record = record.replace('<section class="section profile-sources-section">', `${publicRecordFeature(copy)}<section class="section profile-sources-section">`);
  await writeFile(recordFile, record, "utf8");

  let jade = profile;
  jade = replaceMeta(jade, copy);
  jade = replaceLocaleNav(jade);
  jade = jade.replace(/<main id="main">[\s\S]*?<\/main>/, `<main id="main">${jadeMain(locale, copy)}</main>`);
  jade = replaceSchema(jade, locale, copy);
  jade = jade.replace(`data-pathname="${copy.profilePath}"`, `data-pathname="${copy.jadePath}"`).replace('data-route="profile"', 'data-route="jade-exhibition-2024"');
  const jadeFile = fileFor(copy.jadePath);
  await mkdir(dirname(jadeFile), { recursive: true });
  await writeFile(jadeFile, jade, "utf8");
}

const sitemapFile = join(root, "sitemap.xml");
const sitemap = await readFile(sitemapFile, "utf8");
await writeFile(sitemapFile, updateSitemap(sitemap), "utf8");

console.log("Enhanced Wong Shung Yen cultural record and generated 3 jade exhibition pages.");
