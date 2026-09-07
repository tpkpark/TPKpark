import { site, routePath, routeLastModified, leasingInventory } from "../scripts/site-data.mjs";

// Only the checked-in, public website is a source. No tenancy records, inbox,
// visitor submissions, arbitrary URLs or private documents are loaded here.
const sourceIds = ["home", "about", "homeLiving", "automotive", "lifestyle", "leasing", "leasingShop", "leasingDetached", "leasingSemiDetached", "contact", "milestones"];
const textKeys = new Set(["title", "description", "lead", "text", "q", "a", "value", "label", "year", "officeHours", "address", "items", "blocks"]);

function publicText(value) {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.map(publicText).filter(Boolean).join("\n");
  if (!value || typeof value !== "object") return "";
  return Object.entries(value).filter(([key]) => textKeys.has(key)).map(([, child]) => publicText(child)).filter(Boolean).join("\n");
}

export const sources = Object.fromEntries(sourceIds.map(id => [id, {
  id,
  updated: routeLastModified[id],
  text: publicText(site.en.pages[id]),
  titles: Object.fromEntries(["en", "ms", "zh"].map(locale => [locale, site[locale].pages[id].eyebrow || site[locale].pages[id].title]))
}]));

const properties = Object.values(leasingInventory).map(unit => ({
  sourceId: unit.routeId,
  status: unit.status || "Confirm current availability with management",
  ...Object.fromEntries(Object.entries(unit.values).map(([key, value]) => [key, value?.en || "Not published"]))
}));

export const knowledge = JSON.stringify({
  propertyDetails: properties,
  pages: sourceIds.map(id => ({ id, updated: sources[id].updated, text: sources[id].text })),
  rules: [
    "TPK Park Sdn. Bhd. manages selected properties and projects, not the entire industrial park.",
    "No. 69 Jalan TPK 2/8 is leased. Its rent is not published; never invent or disclose an agreed rent or offer it as vacant.",
    "Shop ground-floor and first-floor asking rents are separate. The 3,520 sq ft figure covers TWO floors. Do not halve it or treat lot size as a verified floor area.",
    "All rents are indicative, subject to current availability, negotiation, landlord approval and contract. Proposed use, licensing, access, loading and fit-out must be confirmed.",
    "16 businesses, 96,728 sq ft and 8 categories refer to the recognised Home & Living cluster only.",
    "Management office hours are not the opening hours of the whole park or its individual businesses. Confirm current hours before travelling.",
    "Office telephone: +60 3 8076 5200. Public team email: info@tpkpark.com. No verified leasing WhatsApp number is published.",
    "The contact form prepares an email draft in the visitor's email app. It does not send an enquiry or confirm a viewing automatically."
  ]
});

export function sourceLinks(ids, locale) {
  return [...new Set(ids)].filter(id => Object.hasOwn(sources, id)).slice(0, 3).map(id => ({
    id, title: sources[id].titles[locale], url: routePath(locale, id)
  }));
}
