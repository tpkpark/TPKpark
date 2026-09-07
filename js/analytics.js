(() => {
  "use strict";
  const config = document.currentScript?.dataset;
  if (!config || !/^G-[A-Z0-9]+$/.test(config.measurementId || "")) return;
  // Preview deployments and local development never send production analytics.
  if (!["www.tpkpark.com", "tpkpark.com"].includes(location.hostname)) return;

  const id = config.measurementId;
  const banner = document.querySelector("[data-analytics-consent]");
  const settings = document.querySelector("[data-analytics-settings]");
  const key = "tpk-analytics-consent-v1";
  let allowed = false;
  let started = false;
  let choice = null;
  let openedFromSettings = false;
  try { choice = localStorage.getItem(key); } catch { /* Storage may be unavailable. */ }

  const params = {
    page_location: config.canonical,
    page_title: document.title,
    page_type: config.route,
    site_language: config.locale,
    page_referrer: ""
  };
  try { if (document.referrer) params.page_referrer = new URL(document.referrer).origin + "/"; } catch { /* No valid referrer. */ }

  window.dataLayer = window.dataLayer || [];
  const gtag = function () { window.dataLayer.push(arguments); };
  window.gtag = gtag;
  gtag("consent", "default", {
    analytics_storage: "denied", ad_storage: "denied",
    ad_user_data: "denied", ad_personalization: "denied"
  });

  function track(name, detail = {}) {
    if (allowed) gtag("event", name, { ...params, ...detail, send_to: id });
  }

  function start() {
    allowed = true;
    window["ga-disable-" + id] = false;
    gtag("consent", "update", { analytics_storage: "granted" });
    if (started) return;
    started = true;
    gtag("js", new Date());
    gtag("config", id, {
      ...params, send_page_view: false,
      allow_google_signals: false, allow_ad_personalization_signals: false,
      cookie_domain: "www.tpkpark.com", cookie_flags: "SameSite=Lax;Secure"
    });
    track("page_view");
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + id;
    document.head.appendChild(script);
  }

  function stop() {
    allowed = false;
    window["ga-disable-" + id] = true;
    gtag("consent", "update", { analytics_storage: "denied" });
    for (const cookie of document.cookie.split(";")) {
      const name = cookie.trim().split("=")[0];
      if (!/^_ga(?:_|$)/.test(name)) continue;
      for (const domain of ["", "; domain=www.tpkpark.com", "; domain=.tpkpark.com"]) {
        document.cookie = name + "=; Max-Age=0; path=/; SameSite=Lax; Secure" + domain;
      }
    }
  }

  function choose(value) {
    try { localStorage.setItem(key, value); } catch { /* The choice still applies on this page. */ }
    if (value === "granted") start(); else stop();
    if (banner) banner.hidden = true;
    if (openedFromSettings) settings?.focus();
    openedFromSettings = false;
  }

  document.querySelector("[data-analytics-allow]")?.addEventListener("click", () => choose("granted"));
  document.querySelector("[data-analytics-decline]")?.addEventListener("click", () => choose("denied"));
  if (settings) {
    settings.hidden = false;
    settings.addEventListener("click", () => {
      openedFromSettings = true;
      if (banner) banner.hidden = false;
      document.querySelector("[data-analytics-allow]")?.focus();
    });
  }
  if (choice === "granted") start();
  else if (choice === "denied") stop();
  else if (banner) banner.hidden = false;

  window.addEventListener("storage", (event) => {
    if (event.key !== key) return;
    if (event.newValue === "granted") start(); else stop();
  });

  document.addEventListener("click", (event) => {
    const link = event.target.closest?.("a[href]");
    if (!link) return;
    const href = link.getAttribute("href") || "";
    if (href.startsWith("tel:")) track("contact_click", { contact_method: "phone" });
    else if (href.startsWith("mailto:")) track("contact_click", { contact_method: "email" });
    else {
      try {
        const url = new URL(href, config.canonical);
        if (url.origin === "https://www.tpkpark.com" && /^\/assets\/leasing\/tpk-park-[a-z0-9-]+\.pdf$/.test(url.pathname)) {
          track("file_download", { file_name: url.pathname.split("/").pop(), file_extension: "pdf", link_url: url.origin + url.pathname });
        }
      } catch { /* Ignore links that are not URLs. */ }
    }
  });

  document.addEventListener("submit", (event) => {
    if (!event.target.matches?.("[data-email-form]")) return;
    const space = event.target.querySelector('[name="spaceType"]')?.value;
    const knownSpaces = ["shop-showroom", "detached-building", "semi-detached", "terrace-waitlist"];
    // This opens a draft in the visitor's email app; it is not a confirmed enquiry.
    track("email_draft", { space_type: knownSpaces.includes(space) ? space : "unspecified" });
  }, true);
})();
