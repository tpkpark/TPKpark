(() => {
  "use strict";
  const config = document.currentScript?.dataset;
  const productionHosts = ["www.tpkpark.com", "tpkpark.com"];
  if (!config || !productionHosts.includes(location.hostname) || window.tpkAnalyticsLoaded) return;
  window.tpkAnalyticsLoaded = true;

  const id = /^G-[A-Z0-9]+$/.test(config.measurementId || "") ? config.measurementId : "";
  const banner = document.querySelector("[data-analytics-consent]");
  const settings = document.querySelector("[data-analytics-settings]");
  const status = document.querySelector("[data-analytics-status]");
  const key = "tpk-analytics-preference-v2";
  const legacyKey = "tpk-analytics-consent-v1";
  const privacySignal = navigator.globalPrivacyControl === true || navigator.doNotTrack === "1";
  let saved = null;
  let legacy = null;
  try {
    saved = localStorage.getItem(key);
    legacy = localStorage.getItem(legacyKey);
  } catch { /* Preferences still apply to the current page when storage is unavailable. */ }
  if (!["basic", "detailed", "off"].includes(saved)) saved = null;
  // Preserve every previous explicit choice. New visitors use detailed analytics without an interruptive first-visit dialog.
  let preference = saved || (legacy === "granted" ? "detailed" : legacy === "denied" ? "off" : "detailed");
  let basicAllowed = false;
  let detailedAllowed = false;
  let vercelStarted = false;
  let googleStarted = false;
  let openedFromSettings = false;
  let formStarted = false;
  const scrollMilestones = new Set();

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
  gtag("consent", "default", {
    analytics_storage: "denied", ad_storage: "denied",
    ad_user_data: "denied", ad_personalization: "denied"
  });

  function googleEvent(name, detail = {}) {
    if (detailedAllowed && id) gtag("event", name, { ...params, ...detail, send_to: id });
  }

  function record(name, detail = {}, target = "") {
    if (basicAllowed) window.va?.("event", { name, data: { language: config.locale, target } });
    googleEvent(name, { ...detail, interaction_target: target });
  }

  function startBasic() {
    if (vercelStarted) return;
    vercelStarted = true;
    // Documented HTML queue API; use the stable first-party endpoint supported by the SDK.
    window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
    window.va("beforeSend", event => basicAllowed ? { ...event, url: canonical.href } : null);
    const script = document.createElement("script");
    script.defer = true;
    script.src = "/_vercel/insights/script.js";
    script.referrerPolicy = "no-referrer";
    document.head.appendChild(script);
  }

  function startGoogle() {
    if (!id) return;
    window["ga-disable-" + id] = false;
    gtag("consent", "update", { analytics_storage: "granted" });
    if (googleStarted) return;
    googleStarted = true;
    gtag("js", new Date());
    gtag("config", id, {
      ...params, send_page_view: false,
      allow_google_signals: false, allow_ad_personalization_signals: false,
      cookie_domain: location.hostname, cookie_flags: "SameSite=Lax;Secure"
    });
    googleEvent("page_view");
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + id;
    script.referrerPolicy = "no-referrer";
    document.head.appendChild(script);
  }

  function stopGoogle() {
    if (!id) return;
    window["ga-disable-" + id] = true;
    // Do not load Google merely to communicate an opt-out.
    if (googleStarted) gtag("consent", "update", { analytics_storage: "denied" });
    for (const cookie of document.cookie.split(";")) {
      const name = cookie.trim().split("=")[0];
      if (!/^_ga(?:_|$)/.test(name)) continue;
      for (const domain of ["", "; domain=www.tpkpark.com", "; domain=.tpkpark.com"]) {
        document.cookie = name + "=; Max-Age=0; path=/; SameSite=Lax; Secure" + domain;
      }
    }
  }

  function applyPreference() {
    basicAllowed = !privacySignal && preference !== "off";
    detailedAllowed = !privacySignal && preference === "detailed" && Boolean(id);
    if (basicAllowed) startBasic();
    if (detailedAllowed) startGoogle(); else stopGoogle();
    if (status) status.textContent = status.dataset[privacySignal ? "signal" : preference] || "";
  }

  function closeSettings() {
    if (banner) banner.hidden = true;
    settings?.setAttribute("aria-expanded", "false");
    if (openedFromSettings) settings?.focus();
    openedFromSettings = false;
  }

  function choose(value) {
    preference = value;
    try { localStorage.setItem(key, value); } catch { /* Apply on this page. */ }
    applyPreference();
    closeSettings();
  }

  for (const [control, value] of [["allow", "detailed"], ["basic", "basic"], ["off", "off"]]) {
    const button = document.querySelector(`[data-analytics-${control}]`);
    if (button) {
      button.disabled = privacySignal && value !== "off";
      button.addEventListener("click", () => choose(value));
    }
  }
  document.querySelector("[data-analytics-close]")?.addEventListener("click", () => choose(preference));
  if (settings) {
    settings.hidden = false;
    settings.addEventListener("click", () => {
      openedFromSettings = true;
      if (banner) banner.hidden = false;
      settings.setAttribute("aria-expanded", "true");
      const focusTarget = privacySignal ? "off" : preference === "detailed" ? "allow" : preference;
      document.querySelector(`[data-analytics-${focusTarget}]`)?.focus();
    });
  }
  applyPreference();
  // No first-visit dialog. Privacy controls remain available from the footer.

  window.addEventListener("storage", event => {
    if (event.key !== key && event.key !== null) return;
    preference = ["basic", "detailed", "off"].includes(event.newValue) ? event.newValue : "off";
    applyPreference();
    closeSettings();
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && banner && !banner.hidden) choose(preference);
  });

  const knownSpaces = ["shop-showroom", "detached-building", "semi-detached", "terrace-waitlist"];
  const pagePath = /^\/(?:ms\/|zh\/)?(?:about|home-living|automotive|lifestyle|leasing(?:\/(?:shop-showroom|detached-building|semi-detached))?|news|milestones|wong-shung-yen(?:\/public-record)?|contact)?\/?$/;
  const socialHosts = { "www.facebook.com": "facebook", "www.instagram.com": "instagram", "www.tiktok.com": "tiktok" };

  document.addEventListener("click", event => {
    const link = event.target.closest?.("a[href]");
    if (!link || link.closest("[data-analytics-consent]")) return;
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
        // Domain only: exclude outbound query strings, fragments and contact contents.
        record("outbound_click", { link_domain: url.hostname }, url.hostname);
      }
    } catch { /* Ignore invalid links. */ }
  });

  document.addEventListener("submit", event => {
    if (!event.target.matches?.("[data-email-form]")) return;
    const space = event.target.querySelector('[name="spaceType"]')?.value;
    const selected = knownSpaces.includes(space) ? space : "unspecified";
    // Preparing an email is not a sent or received enquiry.
    record("email_draft", { space_type: selected }, selected);
  }, true);

  document.addEventListener("focusin", event => {
    if (!detailedAllowed || formStarted || !event.target.closest?.("[data-email-form]")) return;
    formStarted = true;
    googleEvent("form_start", { form_name: "leasing_enquiry", interaction_target: "leasing_enquiry" });
  });
  window.addEventListener("scroll", () => {
    if (!detailedAllowed) return;
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
