import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const root = process.cwd();
const origin = "https://www.tpkpark.com";
const lastModified = "2026-09-12";

const locales = {
  en: {
    htmlLang: "en-MY", hreflang: "en-MY", profilePath: "/wong-shung-yen/", publicRecordPath: "/wong-shung-yen/public-record/", jadePath: "/wong-shung-yen/jade-exhibition-2024/",
    home: "Home", leadership: "Leadership", cultureLabel: "Arts & cultural engagement · 2024",
    seoTitle: "Wong Shung Yen | Co-Curator, National Art Gallery Jade Exhibition 2024",
    title: "JADE: A Journey Across Millennia of Dedication to Enduring Prosperity",
    description: "Source-led record of Wong Shung Yen’s co-curatorial role in the 2024 National Art Gallery jade exhibition marking 50 years of Malaysia–China diplomatic relations.",
    lead: "Dato’ Wong Shung Yen co-curated the National Art Gallery exhibition with Dr Low Cheong Sin for the Malaysian Chinese Cultural Society, in conjunction with the 50th anniversary of Malaysia–China diplomatic relations.",
    profileKicker: "Arts & cultural engagement", profileTitle: "Co-curating a National Art Gallery jade exhibition", profileText: "In 2024, Wong Shung Yen served as co-curator, together with Dr Low Cheong Sin, of a month-long National Art Gallery exhibition on ancient jade presented by the Malaysian Chinese Cultural Society for the 50th anniversary of Malaysia–China diplomatic relations.", profileLink: "Explore the exhibition record",
    recordKicker: "Culture · 2024", recordTitle: "A stronger multilingual record of the jade exhibition", recordText: "Official National Art Gallery/MOTAC records and established English, Chinese and Malay media explicitly document Wong Shung Yen’s curatorial role. The dedicated project page separates primary evidence, independent coverage and later amplification.", recordLink: "View the jade exhibition evidence",
    factsKicker: "What the public record establishes", factsTitle: "One exhibition, documented across institutions and languages", factsText: "The evidence supports a clear co-curatorial role without attributing ownership of the exhibited works.",
    cards: [
      ["01", "Co-curator", "The National Art Gallery/MOTAC names Wong as Curator and Special Advisor to the Malaysian Chinese Cultural Society; The Star describes Wong and Dr Low Cheong Sin as co-curators."],
      ["02", "Malaysia–China 50th anniversary", "The exhibition was presented in conjunction with 50 years of diplomatic relations between Malaysia and China and framed around cultural exchange."],
      ["03", "Multilingual corroboration", "Established English, Chinese and Malay coverage independently or institutionally repeats the curator/co-curator identification."],
    ],
    stats: [["113", "jade works reported by established Chinese-language media"], ["23 Nov–23 Dec 2024", "public exhibition period"], ["National Art Gallery", "Kuala Lumpur · Malaysia"]],
    sourcesKicker: "Source-led evidence", sourcesTitle: "Primary records and established coverage", sourcesText: "The sources below are selected for evidential value. Reposts and derivative rewrites are not counted as separate independent corroboration.",
    legacyKicker: "Exhibition legacy", legacyTitle: "A catalogue and wider institutional context", legacyText: "The exhibition was supported by Chinese cultural institutions and later documented through an exhibition catalogue. These sources strengthen the exhibition context, while the National Art Gallery and established media remain the primary evidence for Wong’s role.",
    methodology: "Editorial note: this page describes only roles established by the cited public sources. It does not attribute ownership of the displayed jade works to Wong Shung Yen or treat repeated coverage of this event as separate exhibitions.",
    backRecord: "View full media & public record", backProfile: "Return to Wong Shung Yen profile",
  },
  ms: {
    htmlLang: "ms-MY", hreflang: "ms-MY", profilePath: "/ms/wong-shung-yen/", publicRecordPath: "/ms/wong-shung-yen/public-record/", jadePath: "/ms/wong-shung-yen/jade-exhibition-2024/",
    home: "Laman utama", leadership: "Kepimpinan", cultureLabel: "Penglibatan seni & budaya · 2024",
    seoTitle: "Wong Shung Yen | Kurator Bersama Pameran Jed Balai Seni Negara 2024",
    title: "Pameran Batu Jed: Jejak Beribu Tahun Menuju Kemakmuran Yang Abadi",
    description: "Rekod berasaskan sumber mengenai peranan Wong Shung Yen sebagai kurator bersama pameran jed Balai Seni Negara 2024 sempena 50 tahun hubungan diplomatik Malaysia–China.",
    lead: "Dato’ Wong Shung Yen menjadi kurator bersama pameran Balai Seni Negara dengan Dr Low Cheong Sin bagi Pertubuhan Kebudayaan Cina Malaysia, sempena ulang tahun ke-50 hubungan diplomatik Malaysia–China.",
    profileKicker: "Penglibatan seni & budaya", profileTitle: "Kurator bersama pameran jed di Balai Seni Negara", profileText: "Pada 2024, Wong Shung Yen menjadi kurator bersama Dr Low Cheong Sin bagi pameran jed purba selama sebulan di Balai Seni Negara yang dibawakan Pertubuhan Kebudayaan Cina Malaysia sempena ulang tahun ke-50 hubungan diplomatik Malaysia–China.", profileLink: "Terokai rekod pameran",
    recordKicker: "Budaya · 2024", recordTitle: "Rekod pelbagai bahasa yang lebih lengkap bagi pameran jed", recordText: "Rekod rasmi Balai Seni Negara/MOTAC serta media mapan dalam bahasa Inggeris, Cina dan Melayu secara jelas mendokumentasikan peranan kuratorial Wong Shung Yen. Halaman projek khusus membezakan bukti primer, liputan bebas dan pengulangan kemudian.", recordLink: "Lihat bukti pameran jed",
    factsKicker: "Apa yang disahkan rekod awam", factsTitle: "Satu pameran, didokumentasikan merentas institusi dan bahasa", factsText: "Bukti menyokong peranan jelas sebagai kurator bersama tanpa mengaitkan pemilikan karya yang dipamerkan kepadanya.",
    cards: [
      ["01", "Kurator bersama", "Balai Seni Negara/MOTAC menamakan Wong sebagai Kurator dan Penasihat Pertubuhan Kebudayaan Cina Malaysia; The Star menyifatkan Wong dan Dr Low Cheong Sin sebagai kurator bersama."],
      ["02", "50 tahun Malaysia–China", "Pameran ini diadakan sempena 50 tahun hubungan diplomatik Malaysia–China dan diletakkan dalam konteks pertukaran budaya."],
      ["03", "Sokongan pelbagai bahasa", "Liputan mapan dalam bahasa Inggeris, Cina dan Melayu mengulangi pengenalpastian kurator/kurator bersama secara bebas atau institusi."],
    ],
    stats: [["113", "karya jed yang dilaporkan media bahasa Cina mapan"], ["23 Nov–23 Dis 2024", "tempoh pameran awam"], ["Balai Seni Negara", "Kuala Lumpur · Malaysia"]],
    sourcesKicker: "Bukti berasaskan sumber", sourcesTitle: "Rekod primer dan liputan mapan", sourcesText: "Sumber dipilih berdasarkan nilai bukti. Siaran semula dan penulisan derivatif tidak dikira sebagai sokongan bebas yang berasingan.",
    legacyKicker: "Legasi pameran", legacyTitle: "Katalog dan konteks institusi yang lebih luas", legacyText: "Pameran mendapat sokongan institusi kebudayaan China dan kemudian didokumentasikan melalui katalog pameran. Sumber ini mengukuhkan konteks pameran, manakala Balai Seni Negara dan media mapan kekal sebagai bukti utama peranan Wong.",
    methodology: "Nota editorial: halaman ini hanya menerangkan peranan yang disokong oleh sumber awam yang dipetik. Ia tidak mengaitkan pemilikan karya jed yang dipamerkan kepada Wong Shung Yen atau menganggap liputan berulang bagi acara sama sebagai pameran berasingan.",
    backRecord: "Lihat rekod media & awam penuh", backProfile: "Kembali ke profil Wong Shung Yen",
  },
  zh: {
    htmlLang: "zh-Hans-MY", hreflang: "zh-Hans-MY", profilePath: "/zh/wong-shung-yen/", publicRecordPath: "/zh/wong-shung-yen/public-record/", jadePath: "/zh/wong-shung-yen/jade-exhibition-2024/",
    home: "首页", leadership: "领导简介", cultureLabel: "艺术与文化参与 · 2024",
    seoTitle: "黄松延｜2024国家美术馆古玉展联合策展人",
    title: "《璀璨千年—不朽与繁荣之美》古玉展",
    description: "以公开来源整理黄松延担任2024年国家美术馆古玉展联合策展人的记录；该展览配合马中建交50周年举行。",
    lead: "拿督黄松延与刘创新博士共同策展，由马来西亚华人文化协会配合马中建交50周年，在国家美术馆呈献这项古玉展。",
    profileKicker: "艺术与文化参与", profileTitle: "联合策展国家美术馆古玉展", profileText: "2024年，黄松延与刘创新博士共同策划国家美术馆为期一个月的古玉展。展览由马来西亚华人文化协会配合马中建交50周年呈献。", profileLink: "查看展览公开记录",
    recordKicker: "文化 · 2024", recordTitle: "更完整的多语种古玉展公开记录", recordText: "国家美术馆／旅游、艺术及文化部的官方记录，以及英语、中文和马来语主流媒体，都明确记录黄松延的策展角色。专题页区分原始资料、独立报道及后续转载，避免重复计算。", recordLink: "查看古玉展证据资料",
    factsKicker: "公开记录所能确认的事实", factsTitle: "同一项展览，获不同机构与多语种媒体记录", factsText: "现有证据清楚支持联合策展人的角色，但不把展出玉器的所有权归于黄松延。",
    cards: [
      ["01", "联合策展人", "国家美术馆／旅游、艺术及文化部列黄松延为策展人及马来西亚华人文化协会特别顾问；《星报》则明确称黄松延与刘创新博士为联合策展人。"],
      ["02", "马中建交50周年", "展览配合马来西亚与中国建交50周年举行，并以文化交流与文明互鉴为主要脉络。"],
      ["03", "多语种相互印证", "英语、中文及马来语的主流媒体与机构资料，均以策展人或联合策展人身份记录黄松延。"],
    ],
    stats: [["113", "马来西亚中文主流媒体报道的展出玉雕数量"], ["2024年11月23日–12月23日", "对外开放期间"], ["国家美术馆", "吉隆坡 · 马来西亚"]],
    sourcesKicker: "以来源为本", sourcesTitle: "官方资料与主流媒体报道", sourcesText: "以下资料按证据价值筛选；转载及衍生报道不会被当作额外的独立佐证。",
    legacyKicker: "展览后续", legacyTitle: "图录与更广泛的机构脉络", legacyText: "展览获得中国文化机构的学术支持，并在展后形成图录记录。这些资料有助补充展览背景；黄松延策展角色的主要证据仍以国家美术馆及主流媒体为准。",
    methodology: "编辑说明：本页只陈述引用的公开来源能够支持的角色与事实，不把展出玉器的所有权归于黄松延，也不会把同一展览的重复报道视为不同展览。",
    backRecord: "查看完整媒体与公开记录", backProfile: "返回黄松延简介",
  },
};

const sourceRecords = [
  { date: "22 Nov 2024", source: "National Art Gallery / MOTAC", lang: "English", kind: "Official primary", url: "https://www.artgallery.gov.my/wp-content/uploads/2024/11/MEDIA-RELEASE-JADE-EXHIBITION.pdf", summaries: {
    en: "The official release explicitly names Dato’ Wong Shung Yen as Curator and Special Advisor for the Malaysian Chinese Cultural Society, alongside Dr Low Cheong Sin as Curator.",
    ms: "Siaran rasmi menamakan Dato’ Wong Shung Yen secara jelas sebagai Kurator dan Penasihat Pertubuhan Kebudayaan Cina Malaysia, bersama Dr Low Cheong Sin sebagai Kurator.",
    zh: "官方文告明确列拿督黄松延为策展人及马来西亚华人文化协会特别顾问，并列刘创新博士为策展人。",
  }},
  { date: "22 Nov 2024", source: "National Art Gallery / MOTAC", lang: "Bahasa Melayu", kind: "Official primary", url: "https://www.artgallery.gov.my/wp-content/uploads/2024/11/SIARAN-MEDIA-PAMERAN-BATU-JED-JEJAK-BERIBU-TAHUN-MENUJU-KEMAKMURAN-ABADI.docx.pdf", summaries: {
    en: "The Malay official release separately records Wong as “Kurator dan Penasihat Pertubuhan Kebudayaan Cina Malaysia”.",
    ms: "Versi Bahasa Melayu merekodkan Wong sebagai “Kurator dan Penasihat Pertubuhan Kebudayaan Cina Malaysia”.",
    zh: "马来文官方文告同样记录黄松延为“Kurator dan Penasihat Pertubuhan Kebudayaan Cina Malaysia”（策展人兼文化协会顾问）。",
  }},
  { date: "23 Nov 2024", source: "Malaysian Chinese Cultural Society", lang: "Chinese", kind: "Organiser primary", url: "https://www.facebook.com/MalaysianChineseCulturalSocietyMCCS/posts/595099459531826/", summaries: {
    en: "The organiser specifically thanks Wong and Dr Low Cheong Sin for their work participating in the exhibition’s curation.",
    ms: "Penganjur secara khusus berterima kasih kepada Wong dan Dr Low Cheong Sin atas usaha mereka dalam kerja kuratorial pameran.",
    zh: "主办方马来西亚华人文化协会特别感谢黄松延及刘创新博士参与策展工作。",
  }},
  { date: "25 Nov 2024", source: "The Star", lang: "English", kind: "Established media", url: "https://www.thestar.com.my/metro/metro-news/2024/11/25/over-100-jade-carvings-showcased-at-national-art-gallery-exhibition", summaries: {
    en: "The Star explicitly describes the exhibition as co-curated by special advisor Datuk Wong Shung Yen and Dr Low Cheong Sin.",
    ms: "The Star secara jelas menyifatkan pameran ini sebagai dikurasi bersama oleh penasihat khas Datuk Wong Shung Yen dan Dr Low Cheong Sin.",
    zh: "《星报》明确报道展览由特别顾问拿督黄松延及刘创新博士共同策展。",
  }},
  { date: "25 Nov 2024", source: "Oriental Daily", lang: "Chinese", kind: "Established media", url: "https://www.orientaldaily.com.my/news/nation/2024/11/25/695335", summaries: {
    en: "Oriental Daily states that curators Dato’ Wong Shung Yen and Dr Low Cheong Sin jointly planned the exhibition and reports 113 jade works.",
    ms: "Oriental Daily menyatakan kurator Dato’ Wong Shung Yen dan Dr Low Cheong Sin merancang pameran bersama serta melaporkan 113 karya jed.",
    zh: "《东方日报》明确写道“展览由策展人拿督黄松延和刘创新博士共同策划”，并报道展出113件玉雕。",
  }},
  { date: "25 Nov 2024", source: "Dewan Budaya / DBP", lang: "Bahasa Melayu", kind: "Cultural publication", url: "https://dewanbudaya.jendeladbp.my/2024/11/25/10670/", summaries: {
    en: "Dewan Budaya records Wong as curator and adviser to the Malaysian Chinese Cultural Society in its cultural coverage of the exhibition.",
    ms: "Dewan Budaya merekodkan Wong sebagai kurator dan penasihat Pertubuhan Kebudayaan Cina Malaysia dalam liputan kebudayaannya.",
    zh: "马来西亚国家语文出版机构旗下《Dewan Budaya》在文化报道中记录黄松延的策展人及文化协会顾问身份。",
  }},
  { date: "26 Nov 2024", source: "Nanyang Siang Pau", lang: "Chinese", kind: "Established media", url: "https://www.enanyang.my/news/20241126/State/640501", summaries: {
    en: "Nanyang identifies cultural-association special advisor Dato’ Wong Shung Yen in the curatorial team and reports 113 works.",
    ms: "Nanyang menamakan penasihat khas persatuan kebudayaan Dato’ Wong Shung Yen dalam pasukan kuratorial dan melaporkan 113 karya.",
    zh: "《南洋商报》列文化协会特别顾问拿督黄松延参与策展，并报道展出113件玉雕。",
  }},
  { date: "26 Nov 2024", source: "Kwong Wah Yit Poh", lang: "Chinese", kind: "Established media", url: "https://www.kwongwah.com.my/20241126/%E7%92%80%E7%92%A8%E5%8D%83%E5%B9%B4%E5%8F%A4%E7%8E%89%E5%B1%95-113%E4%BB%B6%E7%8E%89%E9%9B%95%E4%BA%A4%E6%B5%81%E4%BA%92%E9%89%B4/", summaries: {
    en: "Kwong Wah states that Dato’ Wong Shung Yen and Dr Low Cheong Sin jointly curated/planned the exhibition and reports 113 works.",
    ms: "Kwong Wah menyatakan Dato’ Wong Shung Yen dan Dr Low Cheong Sin bersama-sama mengkurasi/merancang pameran serta melaporkan 113 karya.",
    zh: "《光华日报》报道展览由策展人拿督黄松延和刘创新博士共同策划，并记录113件玉雕。",
  }},
  { date: "23 Nov 2024", source: "MalaysiaGazette", lang: "Bahasa Melayu", kind: "Media", url: "https://malaysiagazette.com/2024/11/23/balai-seni-negara-anjur-pameran-batu-jed-jejak-beribu-tahun-menuju-kemakmuran-yang-abadi/", summaries: {
    en: "MalaysiaGazette identifies Wong as curator and adviser to the Malaysian Chinese Cultural Society, alongside Dr Low as curator.",
    ms: "MalaysiaGazette mengenal pasti Wong sebagai kurator dan penasihat Pertubuhan Kebudayaan Cina Malaysia, bersama Dr Low sebagai kurator.",
    zh: "MalaysiaGazette马来文报道列黄松延为策展人及马来西亚华人文化协会顾问，并列刘创新博士为策展人。",
  }},
];

const contextSources = [
  { source: "Xiling Seal Art Society · 西泠印社", url: "https://www.xlys.org.cn/hdgm/10851.jhtml", text: {
    en: "On 8 October 2024, Xiling Seal Art Society formally agreed to act as an academic-support organisation for the exhibition. The letter does not name Wong and is used here only to establish institutional context.",
    ms: "Pada 8 Oktober 2024, Xiling Seal Art Society bersetuju secara rasmi menjadi organisasi sokongan akademik pameran. Surat itu tidak menamakan Wong dan digunakan di sini hanya bagi konteks institusi.",
    zh: "2024年10月8日，西泠印社正式复函同意担任展览学术支持单位。该复函没有提及黄松延，本页只把它用于说明展览的机构与学术背景。",
  }},
  { source: "Tai Yip Art Bookshop · exhibition catalogue", url: "https://www.taiyipartbookshop.com/product/%E7%92%80%E8%80%80%E5%8D%83%E5%B9%B4-a-journey-across-millennia-of-dedication-to-enduring-prosperity/", text: {
    en: "The later exhibition catalogue records 113 works across a wide chronological span. The bookseller description is useful for exhibition legacy, not as the primary evidence of Wong’s curatorial role.",
    ms: "Katalog pameran yang diterbitkan kemudian merekodkan 113 karya merentasi rentang kronologi yang luas. Huraian penjual buku berguna untuk legasi pameran, bukan sebagai bukti utama peranan kuratorial Wong.",
    zh: "展后图录记录113件跨越多个历史时期的作品。书店资料适合用于展览后续与图录脉络，而不是证明黄松延策展身份的主要来源。",
  }},
];

function escapeHtml(value = "") {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

function fileFor(pathname) {
  return join(root, pathname.slice(1), "index.html");
}

function sectionHeader(kicker, title, text = "") {
  return `<div class="section-header"><div><span class="section-number">${escapeHtml(kicker)}</span></div><div><h2>${escapeHtml(title)}</h2>${text ? `<p>${escapeHtml(text)}</p>` : ""}</div></div>`;
}

function cultureProfileSection(locale, copy) {
  return `<section class="section section-sage"><div class="shell">${sectionHeader(copy.profileKicker, copy.profileTitle, copy.profileText)}<a class="button button-dark" href="${copy.jadePath}">${escapeHtml(copy.profileLink)} <span class="arrow" aria-hidden="true">→</span></a></div></section>`;
}

function publicRecordFeature(copy) {
  return `<section class="section section-sage"><div class="shell">${sectionHeader(copy.recordKicker, copy.recordTitle, copy.recordText)}<div class="card-grid"><article class="card"><span class="number">01</span><h3>National Art Gallery / MOTAC</h3><p>${escapeHtml(sourceRecords[0].summaries[Object.keys(locales).find(key => locales[key] === copy) || "en"])}</p></article><article class="card"><span class="number">02</span><h3>The Star · Oriental Daily · Nanyang · Kwong Wah</h3><p>${escapeHtml(copy.factsText)}</p></article><article class="card"><span class="number">03</span><h3>Malaysian Chinese Cultural Society</h3><p>${escapeHtml(sourceRecords[2].summaries[Object.keys(locales).find(key => locales[key] === copy) || "en"])}</p></article></div><div style="margin-top:34px"><a class="button button-dark" href="${copy.jadePath}">${escapeHtml(copy.recordLink)} <span class="arrow" aria-hidden="true">→</span></a></div></div></section>`;
}

function renderSourceRecord(record, locale) {
  return `<article class="source-record"><div class="source-record-meta"><span>${escapeHtml(record.date)}</span><span>${escapeHtml(record.kind)}</span></div><div class="source-record-copy"><p class="source-publisher">${escapeHtml(record.source)} · ${escapeHtml(record.lang)}</p><h3><a href="${escapeHtml(record.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(record.source)} <span class="source-arrow" aria-hidden="true">↗</span></a></h3><p>${escapeHtml(record.summaries[locale])}</p></div></article>`;
}

function jadeMain(locale, copy) {
  const cards = copy.cards.map(([number, title, text]) => `<article class="card"><span class="number">${number}</span><h3>${escapeHtml(title)}</h3><p>${escapeHtml(text)}</p></article>`).join("");
  const stats = copy.stats.map(([value, label]) => `<div class="stat"><strong>${escapeHtml(value)}</strong><span>${escapeHtml(label)}</span></div>`).join("");
  const sources = sourceRecords.map(record => renderSourceRecord(record, locale)).join("");
  const context = contextSources.map(item => `<article class="source-record"><div class="source-record-meta"><span>${locale === "zh" ? "补充" : locale === "ms" ? "Konteks" : "Context"}</span></div><div class="source-record-copy"><p class="source-publisher">${escapeHtml(item.source)}</p><h3><a href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(item.source)} <span class="source-arrow" aria-hidden="true">↗</span></a></h3><p>${escapeHtml(item.text[locale])}</p></div></article>`).join("");
  return `<section class="page-hero"><div class="shell"><nav class="breadcrumb" aria-label="Breadcrumb"><a href="${locale === "en" ? "/" : `/${locale}/`}">${escapeHtml(copy.home)}</a><span aria-hidden="true">/</span><a href="${copy.profilePath}">${escapeHtml(copy.leadership)}</a><span aria-hidden="true">/</span><span aria-current="page">${escapeHtml(copy.cultureLabel)}</span></nav><div class="page-hero-grid"><div><p class="eyebrow">${escapeHtml(copy.cultureLabel)}</p><h1>${escapeHtml(copy.title)}</h1></div><p class="page-hero-copy">${escapeHtml(copy.lead)}</p></div></div></section>
  <section class="section-compact"><div class="shell"><div class="stats">${stats}</div></div></section>
  <section class="section"><div class="shell">${sectionHeader(copy.factsKicker, copy.factsTitle, copy.factsText)}<div class="card-grid">${cards}</div></div></section>
  <section class="section section-sage profile-sources-section"><div class="shell">${sectionHeader(copy.sourcesKicker, copy.sourcesTitle, copy.sourcesText)}<div class="source-years"><div class="source-list">${sources}</div></div></div></section>
  <section class="section profile-sources-section"><div class="shell">${sectionHeader(copy.legacyKicker, copy.legacyTitle, copy.legacyText)}<div class="source-years"><div class="source-list">${context}</div></div><p class="notice" style="margin-top:34px">${escapeHtml(copy.methodology)}</p><div style="margin-top:34px;display:flex;gap:12px;flex-wrap:wrap"><a class="button button-dark" href="${copy.publicRecordPath}">${escapeHtml(copy.backRecord)} <span class="arrow" aria-hidden="true">→</span></a><a class="button button-outline" href="${copy.profilePath}">${escapeHtml(copy.backProfile)}</a></div></div></section>`;
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
    "@type": "WebPage", "@id": `${origin}${copy.jadePath}#webpage`, url: `${origin}${copy.jadePath}`, name: copy.seoTitle, description: copy.description,
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