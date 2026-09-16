// Compatibility wrapper around the original site data.
// `site-data-base.mjs` preserves the existing public site; this module adds the
// Happivilles Lifestyle profile and small directory updates without duplicating
// the full site-data source.
import * as base from "./site-data-base.mjs";
import { happivillesProfiles } from "./happivilles-profile.mjs";

export const origin = base.origin;
export const localeConfig = base.localeConfig;

export const routeSlugs = {
  ...base.routeSlugs,
  happivilles: "lifestyle/happivilles"
};
export const routeIds = Object.keys(routeSlugs);

export const seoTitles = {
  en: {
    ...base.seoTitles.en,
    happivilles: "Happivilles Puchong | Personal Development & Wellness | TPK Park",
    kia4sService: "Kia Puchong Sales & Service | TPK Park"
  },
  ms: {
    ...base.seoTitles.ms,
    happivilles: "Happivilles Puchong | Pembangunan Diri & Kesejahteraan | TPK Park",
    kia4sService: "Kia Puchong Jualan & Servis | TPK Park"
  },
  zh: {
    ...base.seoTitles.zh,
    happivilles: "Happivilles快乐坊蒲种 | 个人成长与身心探索 | TPK Park",
    kia4sService: "Kia Puchong蒲种 | 销售与维修 | TPK Park"
  }
};

export const jadeExhibitionLastModified = base.jadeExhibitionLastModified;
export const routeLastModified = {
  ...base.routeLastModified,
  happivilles: "2026-09-17",
  automotive: "2026-09-17",
  kia4sService: "2026-09-17"
};

export function routePath(locale, routeId) {
  const prefix = localeConfig[locale].prefix;
  const slug = routeSlugs[routeId];
  const parts = [prefix, slug].filter(Boolean);
  return parts.length ? `/${parts.join("/")}/` : "/";
}

export const images = base.images;
export const leasingInventory = base.leasingInventory;
export const articles = base.articles;
export const profileSources = base.profileSources;

export const site = Object.fromEntries(
  Object.entries(base.site).map(([locale, data]) => [
    locale,
    {
      ...data,
      pages: {
        ...data.pages,
        happivilles: happivillesProfiles[locale]
      }
    }
  ])
);

for (const locale of Object.keys(site)) {
  const directory = site[locale].pages.lifestyle.blocks.find(block => block.type === "directory");
  if (directory) {
    directory.items = directory.items.map(item =>
      item[1] === "Happivilles" ? [item[0], item[1], "happivilles"] : item
    );
  }
}

const fadzilCategory = {
  en: "Sales",
  ms: "Jualan",
  zh: "销售"
};

for (const locale of Object.keys(site)) {
  const directory = site[locale].pages.automotive.blocks.find(block => block.type === "directory");
  if (directory && !directory.items.some(item => item[1] === "Fadzil Enterprise")) {
    directory.items = [...directory.items, [fadzilCategory[locale], "Fadzil Enterprise"]];
  }
}

const kiaCategory = {
  en: "Sales & Service",
  ms: "Jualan & Servis",
  zh: "销售与维修"
};

const kiaProfileCopy = {
  en: {
    eyebrow: "Kia Puchong · Sales & Service",
    description: "Contact Kia Puchong for Kia vehicle sales enquiries and after-sales service. Its TPK Park workshop is at 59, Jalan TPK 2/8; the public branch website lists its showroom separately at Setiawalk, Puchong.",
    lead: "Kia Puchong, operated by KMW Auto Sdn Bhd, handles Kia vehicle sales and after-sales service. Its workshop is at No. 59, Jalan TPK 2/8 in TPK Park, while its public branch website lists the Kia Puchong showroom separately at Setiawalk.",
    visitText: "Kia Puchong handles both sales and after-sales service. The TPK Park workshop is at No. 59, Jalan TPK 2/8; for a showroom visit, sales consultation or test drive, confirm the meeting location with Kia Puchong because its public branch website lists the showroom separately at Setiawalk.",
    note: "Workshop hours are listed by Kia Malaysia. Confirm service appointments, sales meetings, test drives and the correct meeting location before travelling, especially on Sundays or public holidays.",
    cta: { title: "Talk to Kia Puchong about sales or service.", text: "Contact Kia Puchong for a vehicle enquiry, test-drive arrangement or workshop appointment.", button: "Call Kia Puchong", url: "tel:+60380761005" }
  },
  ms: {
    eyebrow: "Kia Puchong · Jualan & Servis",
    description: "Hubungi Kia Puchong untuk pertanyaan jualan kenderaan Kia dan servis selepas jualan. Bengkel TPK Park terletak di 59, Jalan TPK 2/8; laman awam cawangan menyenaraikan bilik pameran secara berasingan di Setiawalk, Puchong.",
    lead: "Kia Puchong, yang dikendalikan oleh KMW Auto Sdn Bhd, mengurus jualan kenderaan Kia serta servis selepas jualan. Bengkelnya berada di No. 59, Jalan TPK 2/8 di TPK Park, manakala laman awam cawangan menyenaraikan bilik pameran Kia Puchong secara berasingan di Setiawalk.",
    visitText: "Kia Puchong mengendalikan jualan dan servis selepas jualan. Bengkel TPK Park berada di No. 59, Jalan TPK 2/8; untuk lawatan bilik pameran, perbincangan jualan atau pandu uji, sahkan lokasi pertemuan dengan Kia Puchong kerana laman awam cawangan menyenaraikan bilik pameran secara berasingan di Setiawalk.",
    note: "Waktu bengkel disenaraikan oleh Kia Malaysia. Sahkan janji temu servis, pertemuan jualan, pandu uji dan lokasi pertemuan yang betul sebelum bertolak, khususnya pada hari Ahad atau cuti umum.",
    cta: { title: "Bincang dengan Kia Puchong tentang jualan atau servis.", text: "Hubungi Kia Puchong untuk pertanyaan kenderaan, aturan pandu uji atau janji temu bengkel.", button: "Telefon Kia Puchong", url: "tel:+60380761005" }
  },
  zh: {
    eyebrow: "Kia Puchong · 销售与维修",
    description: "联系Kia Puchong查询Kia新车销售及售后维修。TPK Park维修中心位于Jalan TPK 2/8门牌59号；Kia Puchong公开网站另列Setiawalk为其展厅地点。",
    lead: "Kia Puchong由KMW Auto Sdn Bhd经营，提供Kia汽车销售与售后服务。TPK Park内的维修中心位于Jalan TPK 2/8门牌59号，而Kia Puchong公开网站另列Setiawalk为其展厅地点。",
    visitText: "Kia Puchong同时处理汽车销售与售后维修。TPK Park维修中心位于Jalan TPK 2/8门牌59号；如需到展厅、进行购车咨询或安排试驾，请先向Kia Puchong确认会面地点，因为其公开网站另列Setiawalk为展厅。",
    note: "维修中心营业时间依据Kia Malaysia资料。出发前请确认维修预约、销售会面、试驾安排及正确会面地点，星期日或公共假期尤其应先确认。",
    cta: { title: "向Kia Puchong查询购车或维修。", text: "可联系Kia Puchong咨询车辆、安排试驾或预约维修。", button: "致电Kia Puchong", url: "tel:+60380761005" }
  }
};

for (const locale of Object.keys(site)) {
  const directory = site[locale].pages.automotive.blocks.find(block => block.type === "directory");
  if (directory) {
    directory.items = directory.items.map(item =>
      item[1] === "Kia 4S Service" ? [kiaCategory[locale], item[1], ...(item.slice(2))] : item
    );
  }

  const kiaPage = site[locale].pages.kia4sService;
  if (kiaPage) {
    const copy = kiaProfileCopy[locale];
    kiaPage.eyebrow = copy.eyebrow;
    kiaPage.description = copy.description;
    kiaPage.lead = copy.lead;
    kiaPage.cta = copy.cta;
    const visit = kiaPage.blocks?.find(block => block.type === "businessVisit");
    if (visit) {
      visit.text = copy.visitText;
      visit.note = copy.note;
    }
  }
}

export const primaryNav = base.primaryNav;
export const socialLinks = base.socialLinks;
