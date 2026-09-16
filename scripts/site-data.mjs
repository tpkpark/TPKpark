// Compatibility wrapper around the original site data.
// `site-data-base.mjs` preserves the existing public site; this module adds the
// Happivilles Lifestyle profile without duplicating the full site-data source.
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
    happivilles: "Happivilles Puchong | Personal Development & Wellness | TPK Park"
  },
  ms: {
    ...base.seoTitles.ms,
    happivilles: "Happivilles Puchong | Pembangunan Diri & Kesejahteraan | TPK Park"
  },
  zh: {
    ...base.seoTitles.zh,
    happivilles: "Happivilles快乐坊蒲种 | 个人成长与身心探索 | TPK Park"
  }
};

export const jadeExhibitionLastModified = base.jadeExhibitionLastModified;
export const routeLastModified = {
  ...base.routeLastModified,
  happivilles: "2026-09-17"
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

export const primaryNav = base.primaryNav;
export const socialLinks = base.socialLinks;
