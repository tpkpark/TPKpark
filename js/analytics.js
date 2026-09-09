(() => {
  "use strict";
  const config = document.currentScript?.dataset;
  const productionHosts = ["www.tpkpark.com", "tpkpark.com"];
  if (!config || !productionHosts.includes(location.hostname) || window.tpkAnalyticsLoaded) return;
  window.tpkAnalyticsLoaded = true;

  const id = /^G-[A-Z0-9]+$/.test(config.measurementId || "") ? config.measurementId : "";
  const canonical = new URL(config.canonical);
  if (!productionHosts.includes(canonical.hostname)) return;
  canonical.search = "";
  canonical.hash = "";

  const params = {
    page_location: canonical.href,
    page_title: document.title,
    page_type: config.route,
    site_language: config.locale,
    page_referrer: ""
  };
  try { if (document.referrer) params.page_referrer = new URL(document.referrer).origin + "/"; } catch { /* Invalid referrer. */ }

  window.dataLayer = window.dataLayer || [];
  const gtag = function () { window.dataLayer.push(arguments); };
  window.gtag = gtag;

  window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
  window.va("beforeSend", event => ({ ...event, url: canonical.href }));
  const vercelScript = document.createElement("script");
  vercelScript.defer = true;
  vercelScript.src = "/_vercel/insights/script.js";
  vercelScript.referrerPolicy = "no-referrer";
  document.head.appendChild(vercelScript);

  if (id) {
    gtag("js", new Date());
    gtag("config", id, {
      ...params,
      send_page_view: false,
      cookie_domain: location.hostname,
      cookie_flags: "SameSite=Lax;Secure"
    });
    gtag("event", "page_view", { ...params, send_to: id });
    const googleScript = document.createElement("script");
    googleScript.async = true;
    googleScript.src = "https://www.googletagmanager.com/gtag/js?id=" + id;
    googleScript.referrerPolicy = "no-referrer";
    document.head.appendChild(googleScript);
  }

  function googleEvent(name, detail = {}) {
    if (id) gtag("event", name, { ...params, ...detail, send_to: id });
  }

  function record(name, detail = {}, target = "") {
    window.va?.("event", { name, data: { language: config.locale, target } });
    googleEvent(name, { ...detail, interaction_target: target });
  }

  const knownSpaces = ["shop-showroom", "detached-building", "semi-detached", "terrace-waitlist"];
  const pagePath = /^\/(?:ms\/|zh\/)?(?:about|home-living|automotive|lifestyle|leasing(?:\/(?:shop-showroom|detached-building|semi-detached))?|news|milestones|wong-shung-yen(?:\/public-record)?|contact)?\/?$/;
  const socialHosts = { "www.facebook.com": "facebook", "www.instagram.com": "instagram", "www.tiktok.com": "tiktok" };
  let formStarted = false;
  const scrollMilestones = new Set();

  document.addEventListener("click", event => {
    const link = event.target.closest?.("a[href]");
    if (!link) return;
    const href = link.getAttribute("href") || "";
    if (href.startsWith("tel:")) return record("contact_click", { contact_method: "phone" }, "phone");
    if (href.startsWith("mailto:")) return record("contact_click", { contact_method: "email" }, "email");
    try {
      const url = new URL(href, canonical);
      if (!["https:", "http:"].includes(url.protocol)) return;
      if (productionHosts.includes(url.hostname)) {
        if (/^\/assets\/leasing\/tpk-park-[a-z0-9-]+\.pdf$/.test(url.pathname)) {
          const filename = url.pathname.split("/").pop();
          record("file_download", { file_name: filename, file_extension: "pdf", link_url: canonical.origin + url.pathname }, filename);
        } else if (/^\/assets\/leasing\/plans\/[a-z0-9-]+\.(?:webp|jpg|png)$/.test(url.pathname)) {
          const filename = url.pathname.split("/").pop();
          record("plan_view", { file_name: filename }, filename);
        } else if (pagePath.test(url.pathname) && url.pathname !== canonical.pathname) {
          if (link.closest(".locale-nav")) {
            const language = url.pathname.startsWith("/zh/") ? "zh" : url.pathname.startsWith("/ms/") ? "ms" : "en";
            record("language_switch", { destination_language: language }, language);
          } else if (/\/contact\/$/.test(url.pathname)) {
            const space = url.searchParams.get("space");
            const selected = knownSpaces.includes(space) ? space : "unspecified";
            record("enquiry_click", { space_type: selected }, selected);
          } else {
            const name = /\/leasing\//.test(url.pathname) ? "leasing_click" : "navigation_click";
            record(name, { destination_path: url.pathname }, url.pathname);
          }
        }
      } else if ((url.hostname === "www.google.com" && url.pathname.startsWith("/maps")) || url.hostname === "maps.app.goo.gl") {
        record("directions_click", { map_provider: "google" }, config.route);
      } else if (socialHosts[url.hostname]) {
        record("social_click", { network: socialHosts[url.hostname] }, socialHosts[url.hostname]);
      } else {
        record("outbound_click", { link_domain: url.hostname }, url.hostname);
      }
    } catch { /* Ignore invalid links. */ }
  });

  document.addEventListener("submit", event => {
    if (!event.target.matches?.("[data-email-form]")) return;
    const space = event.target.querySelector('[name="spaceType"]')?.value;
    const selected = knownSpaces.includes(space) ? space : "unspecified";
    record("email_draft", { space_type: selected }, selected);
  }, true);

  document.addEventListener("focusin", event => {
    if (formStarted || !event.target.closest?.("[data-email-form]")) return;
    formStarted = true;
    googleEvent("form_start", { form_name: "leasing_enquiry", interaction_target: "leasing_enquiry" });
  });

  window.addEventListener("scroll", () => {
    const height = document.documentElement.scrollHeight - window.innerHeight;
    if (height <= 0) return;
    const percent = window.scrollY / height * 100;
    for (const milestone of [50, 90]) {
      if (percent >= milestone && !scrollMilestones.has(milestone)) {
        scrollMilestones.add(milestone);
        googleEvent("scroll_depth", { percent_scrolled: milestone, interaction_target: String(milestone) });
      }
    }
  }, { passive: true });
})();
