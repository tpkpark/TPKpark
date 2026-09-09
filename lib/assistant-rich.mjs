import { leasingInventory, routeIds, routePath, site } from "../scripts/site-data.mjs";
import { enquiryCopy } from "../scripts/enquiry-config.mjs";

export const propertyIds = ["shopGround", "shopFirst", "detached"];
export const enquiryFields = ["businessType", "budget", "size", "floor", "timing"];
export const emptyEnquiry = () => ({ requested: false, ...Object.fromEntries(enquiryFields.map(key => [key, ""])) });

// The model chooses IDs, never images, prices or download URLs. The catalog is
// rebuilt from the same public records that render the leasing pages.
export function propertyCatalog(locale = "en") {
  const c = enquiryCopy[locale];
  return Object.fromEntries(propertyIds.map(id => {
    const unit = leasingInventory[id === "detached" ? "detached" : "shopShowroom"];
    if (unit.status === "leased") return [id, null];
    const prefix = { shopGround: "ground", shopFirst: "first", detached: "detached" }[id];
    return [id, {
      id, title: c[`${prefix}Title`], description: c[`${prefix}Text`], rent: c[`${prefix}Rent`],
      image: unit.image, url: routePath(locale, unit.routeId), brochure: unit.brochureUrls[locale],
      builtUp: unit.values.builtUp[locale], landArea: unit.values.landArea?.[locale] || "",
      status: unit.values.availability[locale], note: id === "detached" ? site[locale].leasingUi.disclaimer : c.overviewNote
    }];
  }).filter(([, value]) => value));
}

export function pageContext(pathname = "/") {
  if (typeof pathname !== "string" || pathname.length > 150) return null;
  for (const locale of ["en", "ms", "zh"]) for (const id of routeIds) {
    if (pathname === routePath(locale, id)) return { id, locale, title: site[locale].pages[id].title };
  }
  return null;
}

export function wantsEmailDraft(messages) {
  const text = messages.filter(m => m.role === "user").at(-1)?.content || "";
  if (/\b(?:do not|don't|no need to|jangan|tak perlu)\b.{0,35}(?:draft|email|e-mail|draf)|(?:不要|不用|无需).{0,15}(?:草稿|电邮|邮件)|(?:メール|下書き).{0,8}(?:不要|しないで)/iu.test(text)) return false;
  return /(?:draft|compose|prepare|write).{0,55}(?:email|e-mail|enquiry)|(?:email|e-mail|enquiry).{0,40}(?:draft|compose)|(?:draf|sediakan|tulis).{0,45}(?:e-mel|emel|pertanyaan)|(?:帮|请|准备|撰写|生成|写).{0,30}(?:电邮|邮件|咨询草稿)|(?:邮件|电邮).{0,15}草稿|(?:メール|問い合わせ).{0,20}(?:下書き|作成|書いて)/iu.test(text);
}

export function cleanEnquiry(enquiry, messages) {
  const result = emptyEnquiry();
  if (!wantsEmailDraft(messages) || enquiry?.requested !== true) return result;
  result.requested = true;
  const userText = messages.filter(m => m.role === "user").map(m => m.content.normalize("NFKC")).join("\n");
  for (const key of enquiryFields) {
    const value = typeof enquiry[key] === "string" ? enquiry[key].trim().normalize("NFKC") : "";
    // Only verbatim visitor-supplied requirements. Never copy assistant guesses,
    // contact details, URLs, credentials or instructions into an enquiry.
    if (value && value.length <= 120 && userText.includes(value) && !/[\r\n<>@]|https?:|www\.|\b(?:password|passport|secret|token|api.?key|medical|diagnos)/iu.test(value) && !/(?:\+?\d[\s()-]*){8,}/u.test(value)) result[key] = value;
  }
  return result;
}
