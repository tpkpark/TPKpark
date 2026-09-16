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
  // Preserve explicit choices. New visitors receive basic statistics; GA4 is optional.
  let preference = saved || (legacy === "granted" ? "detailed" : legacy === "denied" ? "off" : "basic");
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

  // Only bounded action categories cross this boundary; never forward event.detail wholesale.
  const assistantActions = new Set(["open", "question", "answer", "error", "draft_ready", "voice_start", "voice_ready", "listen_start"]);
  const assistantErrors = new Set(["rate_limited", "timeout", "network", "invalid_response", "unavailable"]);
  const assistantQuestionCategories = new Set(["leasing_enquiry", "leasing", "home_living", "automotive", "lifestyle", "location_contact", "company_history", "leadership_profile", "news_milestones", "other"]);
  let pendingAssistantQuestionCategory = "";

  function classifyAssistantAnswer(result) {
    if (!result || typeof result !== "object") return "other";
    if (result.enquiry?.requested === true) return "leasing_enquiry";
    if (Array.isArray(result.propertyIds) && result.propertyIds.length) return "leasing";
    const sourceIds = new Set(Array.isArray(result.sources) ? result.sources.map(source => source?.id).filter(id => typeof id === "string") : []);
    if (["leasing", "leasingShop", "leasingDetached", "leasingSemiDetached"].some(source => sourceIds.has(source))) return "leasing";
    if (sourceIds.has("homeLiving")) return "home_living";
    if (sourceIds.has("automotive")) return "automotive";
    if (sourceIds.has("lifestyle")) return "lifestyle";
    if (sourceIds.has("contact")) return "location_contact";
    if (sourceIds.has("profile") || sourceIds.has("publicRecord")) return "leadership_profile";
    if (sourceIds.has("news") || sourceIds.has("milestones")) return "news_milestones";
    if (sourceIds.has("about")) return "company_history";
    return "other";
  }

  if (typeof window.fetch === "function") {
    const nativeFetch = window.fetch.bind(window);
    window.fetch = async (...args) => {
      const response = await nativeFetch(...args);
      try {
        const target = typeof Request === "function" && args[0] instanceof Request ? args[0].url : String(args[0]);
        const url = new URL(target, window.location.href);
        if (url.origin === window.location.origin && url.pathname === "/api/ask" && response.ok) {
          const data = await response.clone().json();
          const category = classifyAssistantAnswer(data);
          pendingAssistantQuestionCategory = assistantQuestionCategories.has(category) ? category : "other";
        }
      } catch { pendingAssistantQuestionCategory = ""; }
      return response;
    };
  }

  document.addEventListener("tpk:assistant", event => {
    const action = event.detail?.action;
    if (!assistantActions.has(action)) return;
    if (action === "question") pendingAssistantQuestionCategory = "";
    const reason = action === "error" && assistantErrors.has(event.detail?.reason) ? event.detail.reason : "unspecified";
    const target = action === "error" ? reason : "assistant";
    const category = action === "answer" && assistantQuestionCategories.has(pendingAssistantQuestionCategory) ? pendingAssistantQuestionCategory : "";
    record("assistant_" + action, {
      interaction_origin: "assistant",
      ...(action === "error" ? { error_type: reason } : {}),
      ...(category ? { question_category: category } : {})
    }, target);
    if (action === "answer" || action === "error") pendingAssistantQuestionCategory = "";
  });

  const knownSpaces = ["shop-showroom", "detached-building", "semi-detached", "terrace-waitlist"];
  const pagePath = /^\/(?:ms\/|zh\/)?(?:about|home-living(?:\/(?:lavino|ga-hing|kuche-bath|jubin-bms|v-haus-living|balens-design|builtop|premio-door|klot|dc-moto|fagolli|total-tools|baagus|mk-curtain|signature|choose-interior))?|automotive(?:\/(?:perodua-3s-kinrara|mazda-kinrara|kia-4s-service|techtrics-auto|techtra-automotive-academy|jon-detailing|jaecoo-service-centre|toyokar))?|lifestyle(?:\/(?:motd|jazmina-bistro|nasi-lemak-nuarina|yummy-nyonya-kitchen|optimum-swim-school|aces-gymnastic-academy|forsee-lens|99-speedmart))?|leasing(?:\/(?:shop-showroom|detached-building|semi-detached))?|news|milestones|wong-shung-yen(?:\/public-record)?|contact)?\/?$/;
  const socialHosts = { "www.facebook.com": "facebook", "www.instagram.com": "instagram", "www.tiktok.com": "tiktok", "www.xiaohongshu.com": "xiaohongshu", "www.rednote.com": "xiaohongshu" };

  document.addEventListener("click", event => {
    const link = event.target.closest?.("a[href]");
    if (!link || link.closest("[data-analytics-consent]")) return;
    const href = link.getAttribute("href") || "";
    const fromAssistant = Boolean(link.closest("[data-ask-tpk]"));
    const click = (name, detail, target) => record(name, { ...detail, interaction_origin: fromAssistant ? "assistant" : "website" }, fromAssistant ? "assistant:" + target : target);
    if (href === "tel:+60166626951") return click("tenant_contact_click", { contact_method: "phone", tenant: "motd" }, "motd:phone");
    if (href === "tel:+60122282290") return click("tenant_contact_click", { contact_method: "phone", tenant: "nasi-lemak-nuarina" }, "nasi-lemak-nuarina:phone");
    if (href === "tel:+601111631126") return click("tenant_contact_click", { contact_method: "phone", tenant: "yummy-nyonya-kitchen" }, "yummy-nyonya-kitchen:phone");
    if (href === "tel:+60108912102") return click("tenant_contact_click", { contact_method: "phone", tenant: "yummy-nyonya-kitchen" }, "yummy-nyonya-kitchen:phone-alt");
    if (href === "tel:+60192848138") return click("tenant_contact_click", { contact_method: "phone", tenant: "optimum-swim-school" }, "optimum-swim-school:phone");
    if (href === "tel:+60134808138") return click("tenant_contact_click", { contact_method: "phone", tenant: "optimum-swim-school" }, "optimum-swim-school:phone-alt");
    if (href === "tel:+60103658213") return click("tenant_contact_click", { contact_method: "phone", tenant: "aces-gymnastic-academy" }, "aces-gymnastic-academy:phone");
    if (href === "tel:+60378000373") return click("tenant_contact_click", { contact_method: "phone", tenant: "forsee-lens" }, "forsee-lens:phone");
    if (/^mailto:cs_forsee@forsee\.com\.my(?:[?#]|$)/i.test(href)) return click("tenant_contact_click", { contact_method: "email", tenant: "forsee-lens" }, "forsee-lens:email");
    if (href === "tel:+60105000099") return click("tenant_contact_click", { contact_method: "phone", tenant: "99-speedmart" }, "99-speedmart:customer-service");
    if (/^mailto:customer_service@99speedmart\.com\.my(?:[?#]|$)/i.test(href)) return click("tenant_contact_click", { contact_method: "email", tenant: "99-speedmart" }, "99-speedmart:email");
    if (href === "tel:+60163391601") return click("tenant_contact_click", { contact_method: "phone", tenant: "lavino" }, "lavino:phone");
    if (href === "tel:+60380809119") return click("tenant_contact_click", { contact_method: "phone", tenant: "ga-hing" }, "ga-hing:phone");
    if (href === "tel:+60380791268") return click("tenant_contact_click", { contact_method: "phone", tenant: "kuche-bath" }, "kuche-bath:phone");
    if (href === "tel:+60380748300") return click("tenant_contact_click", { contact_method: "phone", tenant: "jubin-bms" }, "jubin-bms:phone");
    if (href === "tel:+60127086389") return click("tenant_contact_click", { contact_method: "phone", tenant: "v-haus-living" }, "v-haus-living:phone");
    if (href === "tel:+60173388535") return click("tenant_contact_click", { contact_method: "phone", tenant: "balens-design" }, "balens-design:phone");
    if (href === "tel:+601126838848") return click("tenant_contact_click", { contact_method: "phone", tenant: "builtop" }, "builtop:phone");
    if (href === "tel:+60165255100") return click("tenant_contact_click", { contact_method: "phone", tenant: "premio-door" }, "premio-door:phone");
    if (href === "tel:+60183403828") return click("tenant_contact_click", { contact_method: "phone", tenant: "klot" }, "klot:phone");
    if (href === "tel:+601154078187") return click("tenant_contact_click", { contact_method: "phone", tenant: "fagolli" }, "fagolli:phone");
    if (href === "tel:+60102908007") return click("tenant_contact_click", { contact_method: "phone", tenant: "total-tools" }, "total-tools:phone");
    if (href === "tel:+60102133173") return click("tenant_contact_click", { contact_method: "phone", tenant: "baagus" }, "baagus:phone");
    if (href === "tel:+60380747210") return click("tenant_contact_click", { contact_method: "phone", tenant: "mk-curtain" }, "mk-curtain:phone");
    if (href === "tel:+60168133182") return click("tenant_contact_click", { contact_method: "phone", tenant: "signature" }, "signature:phone");
    if (href === "tel:+60123856228") return click("tenant_contact_click", { contact_method: "phone", tenant: "toyokar" }, "toyokar:phone");
    if (/^mailto:info@toyokar\.my(?:[?#]|$)/i.test(href)) return click("tenant_contact_click", { contact_method: "email", tenant: "toyokar" }, "toyokar:email");
    if (href === "tel:+60193988817") return click("tenant_contact_click", { contact_method: "phone", tenant: "jaecoo-service-centre" }, "jaecoo-service-centre:phone");
    if (href === "tel:+60126844034") return click("tenant_contact_click", { contact_method: "phone", tenant: "jon-detailing" }, "jon-detailing:phone");
    if (["tel:+60182886565", "tel:+60183886565"].includes(href)) return click("tenant_contact_click", { contact_method: "phone", tenant: "techtra-automotive-academy" }, "techtra-automotive-academy:phone");
    if (/^mailto:enquiry@techtraacademy\.my(?:[?#]|$)/i.test(href)) return click("tenant_contact_click", { contact_method: "email", tenant: "techtra-automotive-academy" }, "techtra-automotive-academy:email");
    if (["tel:+60358916661", "tel:+60124496696"].includes(href)) return click("tenant_contact_click", { contact_method: "phone", tenant: "techtrics-auto" }, "techtrics-auto:phone");
    if (/^mailto:info@mercedesworkshop\.com\.my(?:[?#]|$)/i.test(href)) return click("tenant_contact_click", { contact_method: "email", tenant: "techtrics-auto" }, "techtrics-auto:email");
    if (href === "tel:+60380761005") return click("tenant_contact_click", { contact_method: "phone", tenant: "kia-4s-service" }, "kia-4s-service:phone");
    if (/^mailto:sales@kiapuchong\.com\.my(?:[?#]|$)/i.test(href)) return click("tenant_contact_click", { contact_method: "email", tenant: "kia-4s-service" }, "kia-4s-service:email");
    if (["tel:+60380750812", "tel:+60380750813"].includes(href)) return click("tenant_contact_click", { contact_method: "phone", tenant: "mazda-kinrara" }, "mazda-kinrara:phone");
    if (href === "tel:+60332912266") return click("tenant_contact_click", { contact_method: "phone", tenant: "perodua-3s-kinrara", department: "sales" }, "perodua-3s-kinrara:sales");
    if (href === "tel:+60332162255") return click("tenant_contact_click", { contact_method: "phone", tenant: "perodua-3s-kinrara", department: "service" }, "perodua-3s-kinrara:service");
    if (href.startsWith("tel:")) return click("contact_click", { contact_method: "phone" }, "phone");
    if (href.startsWith("mailto:")) return click("contact_click", { contact_method: "email" }, fromAssistant && link.closest(".ask-tpk-email") ? "email_draft" : "email");
    try {
      const url = new URL(href, canonical);
      if (!["https:", "http:"].includes(url.protocol)) return;
      if (productionHosts.includes(url.hostname)) {
        if (/^\/assets\/leasing\/tpk-park-[a-z0-9-]+\.pdf$/.test(url.pathname)) {
          const filename = url.pathname.split("/").pop();
          click("file_download", { file_name: filename, file_extension: "pdf", link_url: canonical.origin + url.pathname }, filename);
        } else if (/^\/assets\/leasing\/plans\/[a-z0-9-]+\.(?:webp|jpg|png)$/.test(url.pathname)) {
          const filename = url.pathname.split("/").pop();
          click("plan_view", { file_name: filename }, filename);
        } else if (pagePath.test(url.pathname) && url.pathname !== canonical.pathname) {
          if (link.closest(".locale-nav")) {
            const language = url.pathname.startsWith("/zh/") ? "zh" : url.pathname.startsWith("/ms/") ? "ms" : "en";
            click("language_switch", { destination_language: language }, language);
          } else if (/\/contact\/$/.test(url.pathname)) {
            const space = url.searchParams.get("space");
            const selected = knownSpaces.includes(space) ? space : "unspecified";
            click("enquiry_click", { space_type: selected }, selected);
          } else {
            const name = /\/leasing\//.test(url.pathname) ? "leasing_click" : "navigation_click";
            click(name, { destination_path: url.pathname }, url.pathname);
          }
        }
      } else if (url.hostname === "wa.me" && /^\/60123856228\/?$/.test(url.pathname)) {
        click("tenant_contact_click", { contact_method: "whatsapp", tenant: "toyokar" }, "toyokar:whatsapp");
      } else if (url.hostname === "wa.me" && /^\/60193988817\/?$/.test(url.pathname)) {
        click("tenant_contact_click", { contact_method: "whatsapp", tenant: "jaecoo-service-centre" }, "jaecoo-service-centre:whatsapp");
      } else if (url.hostname === "wa.me" && /^\/60182886565\/?$/.test(url.pathname)) {
        click("tenant_contact_click", { contact_method: "whatsapp", tenant: "techtra-automotive-academy" }, "techtra-automotive-academy:whatsapp");
      } else if (url.hostname === "wa.me" && /^\/601156279623\/?$/.test(url.pathname)) {
        click("tenant_contact_click", { contact_method: "whatsapp", tenant: "dc-moto" }, "dc-moto:whatsapp");
      } else if (url.hostname === "wa.me" && /^\/601154078187\/?$/.test(url.pathname)) {
        click("tenant_contact_click", { contact_method: "whatsapp", tenant: "fagolli" }, "fagolli:whatsapp");
      } else if (url.hostname === "wa.me" && /^\/60162057917\/?$/.test(url.pathname)) {
        click("tenant_contact_click", { contact_method: "whatsapp", tenant: "forsee-lens" }, "forsee-lens:whatsapp");
      } else if (((url.hostname === "www.google.com" && url.pathname.startsWith("/maps")) || url.hostname === "maps.google.com") || url.hostname === "maps.app.goo.gl" || (url.hostname === "goo.gl" && url.pathname.startsWith("/maps/"))) {
        click("directions_click", { map_provider: "google" }, config.route);
      } else if (["www.waze.com", "waze.com", "ul.waze.com"].includes(url.hostname) && (url.pathname.startsWith("/live-map/directions") || /^\/ul(?:\/|$)/.test(url.pathname))) {
        click("directions_click", { map_provider: "waze" }, config.route);
      } else if (["www.lavino.com.my", "lavino.com.my"].includes(url.hostname)) {
        click("outbound_click", { link_domain: "www.lavino.com.my" }, "lavino:website");
      } else if (["www.gahing.com", "gahing.com"].includes(url.hostname)) {
        const destination = /^\/contact\/?$/.test(url.pathname) ? "visit" : "website";
        click("outbound_click", { link_domain: "gahing.com" }, "ga-hing:" + destination);
      } else if (["www.kbomy.com", "kbomy.com"].includes(url.hostname)) {
        const destination = /^\/contact-us\/?$/.test(url.pathname) ? "visit" : "website";
        click("outbound_click", { link_domain: "kbomy.com" }, "kuche-bath:" + destination);
      } else if (["www.jubinbms.com.my", "jubinbms.com.my"].includes(url.hostname)) {
        const destination = /^\/locate-us\/?$/.test(url.pathname) ? "visit" : "website";
        click("outbound_click", { link_domain: "www.jubinbms.com.my" }, "jubin-bms:" + destination);
      } else if (["www.vhausliving.com", "vhausliving.com"].includes(url.hostname)) {
        const destination = /^\/contactus\/branch\/833211\/?$/.test(url.pathname) ? "visit" : "website";
        click("outbound_click", { link_domain: "www.vhausliving.com" }, "v-haus-living:" + destination);
      } else if (["www.balensdesign.com", "balensdesign.com"].includes(url.hostname)) {
        const path = url.pathname.replace(/\/$/, "") || "/";
        const destination = { "/contact-us": "visit", "/projects": "projects" }[path] || "website";
        click("outbound_click", { link_domain: "balensdesign.com" }, "balens-design:" + destination);
      } else if (["www.builtopmalaysia.com", "builtopmalaysia.com"].includes(url.hostname)) {
        const path = url.pathname.replace(/\/$/, "") || "/";
        const destination = { "/contactus": "visit", "/services": "services" }[path] || "website";
        click("outbound_click", { link_domain: "www.builtopmalaysia.com" }, "builtop:" + destination);
      } else if (["www.premiodoor.com.my", "premiodoor.com.my"].includes(url.hostname)) {
        const destination = { "/location.php": "visit", "/productSeries.php": "collections" }[url.pathname] || "website";
        click("outbound_click", { link_domain: "premiodoor.com.my" }, "premio-door:" + destination);
      } else if (["www.klot.com.my", "klot.com.my"].includes(url.hostname)) {
        const path = url.pathname.replace(/\/$/, "") || "/";
        const destination = { "/pages/contact-us": "visit", "/pages/location": "visit", "/pages/catalog-1": "catalogue" }[path] || "website";
        click("outbound_click", { link_domain: "www.klot.com.my" }, "klot:" + destination);
      } else if (["www.dcmoto.my", "dcmoto.my"].includes(url.hostname)) {
        const path = url.pathname.replace(/\/$/, "") || "/";
        const destination = { "/contact-us": "visit", "/user-support-guide": "support", "/products/gfm975": "products", "/products/gfm925": "products" }[path] || "website";
        click("outbound_click", { link_domain: "www.dcmoto.my" }, "dc-moto:" + destination);
      } else if (["www.fagolli.com.my", "fagolli.com.my"].includes(url.hostname)) {
        const path = url.pathname.replace(/\/$/, "") || "/";
        const destination = { "/contact-us": "visit", "/gallery": "gallery", "/fagolli_bifoldgate": "products" }[path] || "website";
        click("outbound_click", { link_domain: "www.fagolli.com.my" }, "fagolli:" + destination);
      } else if (["www.totaltools.com.my", "totaltools.com.my"].includes(url.hostname)) {
        const path = url.pathname.replace(/\/$/, "") || "/";
        const destination = { "/products": "products", "/stores": "visit" }[path] || "website";
        click("outbound_click", { link_domain: "www.totaltools.com.my" }, "total-tools:" + destination);
      } else if (["www.baagus.com", "baagus.com"].includes(url.hostname)) {
        const path = url.pathname.replace(/\/$/, "") || "/";
        const destination = { "/site/branchdetails": "visit", "/site/branches": "visit", "/site/curtains": "curtains", "/site/blind": "blinds" }[path] || "website";
        click("outbound_click", { link_domain: "baagus.com" }, "baagus:" + destination);
      } else if (["www.mk.com.my", "mk.com.my"].includes(url.hostname)) {
        const path = url.pathname.replace(/\/$/, "") || "/";
        const destination = { "/find-nearest-branch": "visit", "/our-services": "services" }[path] || "website";
        click("outbound_click", { link_domain: "www.mk.com.my" }, "mk-curtain:" + destination);
      } else if (["www.signature.my", "signature.my"].includes(url.hostname)) {
        const path = url.pathname.replace(/\/$/, "") || "/";
        const destination = { "/locate-a-showroom": "visit", "/kitchens": "kitchens", "/wardrobes": "wardrobes" }[path] || "website";
        click("outbound_click", { link_domain: "signature.my" }, "signature:" + destination);
      } else if (["www.perodua3skinrara.com", "perodua3skinrara.com"].includes(url.hostname)) {
        const destination = /^\/onlineservicebooking\/?$/.test(url.pathname) ? "service_booking" : "website";
        click("outbound_click", { link_domain: "www.perodua3skinrara.com" }, "perodua-3s-kinrara:" + destination);
      } else if (["www.foodpanda.my", "foodpanda.my"].includes(url.hostname) && /^\/restaurant\/rlie\/jazmina-bistro-rlie\/?$/.test(url.pathname)) {
        click("outbound_click", { link_domain: "www.foodpanda.my" }, "jazmina-bistro:menu");
      } else if (["www.foodpanda.my", "foodpanda.my"].includes(url.hostname) && /^\/restaurant\/qq2q\/nasi-lemak-nuarina-since-2010\/?$/.test(url.pathname)) {
        click("outbound_click", { link_domain: "www.foodpanda.my" }, "nasi-lemak-nuarina:menu");
      } else if (url.hostname === "m.me" && /^\/aafiyah2018\/?$/.test(url.pathname)) {
        click("outbound_click", { link_domain: "m.me" }, "nasi-lemak-nuarina:facebook");
      } else if (["www.toyokar.my", "toyokar.my"].includes(url.hostname)) {
        const destination = /^\/gallery\/?$/.test(url.pathname) ? "gallery" : "website";
        click("outbound_click", { link_domain: "www.toyokar.my" }, "toyokar:" + destination);
      } else if (["www.omodajaecoo.com.my", "omodajaecoo.com.my"].includes(url.hostname)) {
        const destination = /^\/dealer-locator\/?$/.test(url.pathname) ? "dealer_locator" : url.pathname === "/news-events/inaugural-omoda-i-jaecoo-technical-skills-competition-spotlights-excellence-and-competitive-spirit" ? "photo" : "website";
        click("outbound_click", { link_domain: "omodajaecoo.com.my" }, "jaecoo-service-centre:" + destination);
      } else if (["www.techtra.edu.my", "techtra.edu.my"].includes(url.hostname)) {
        const destination = url.pathname.startsWith("/wp-content/uploads/") ? "photo" : /^\/automotive-technology-courses\/?$/.test(url.pathname) ? "courses" : "website";
        click("outbound_click", { link_domain: "techtra.edu.my" }, "techtra-automotive-academy:" + destination);
      } else if (["www.mercedesworkshop.com.my", "mercedesworkshop.com.my"].includes(url.hostname)) {
        const destination = url.pathname.startsWith("/wp-content/uploads/") ? "photo" : "website";
        click("outbound_click", { link_domain: "mercedesworkshop.com.my" }, "techtrics-auto:" + destination);
      } else if (["www.kiapuchong.com.my", "kiapuchong.com.my"].includes(url.hostname)) {
        const destination = url.pathname.startsWith("/wp-content/uploads/") ? "photo" : "website";
        click("outbound_click", { link_domain: "kiapuchong.com.my" }, "kia-4s-service:" + destination);
      } else if (["www.kia.com", "kia.com"].includes(url.hostname) && url.pathname === "/my/shopping-tools/find-a-dealer.html") {
        click("outbound_click", { link_domain: "www.kia.com" }, "kia-4s-service:dealer_locator");
      } else if (["www.mazda.com.my", "mazda.com.my"].includes(url.hostname)) {
        const path = url.pathname.replace(/\/$/, "") || "/";
        const destination = { "/find-a-dealer": "dealer_locator", "/mazda-connect-test-drive-page": "test_drive" }[path] || "website";
        click("outbound_click", { link_domain: "mazda.com.my" }, "mazda-kinrara:" + destination);
      } else if (["www.facebook.com", "facebook.com"].includes(url.hostname) && /^\/jondetailing\/?$/.test(url.pathname)) {
        click("tenant_contact_click", { contact_method: "facebook", tenant: "jon-detailing" }, "jon-detailing:facebook");
      } else if (["www.facebook.com", "facebook.com"].includes(url.hostname) && /^\/photo\/?$/.test(url.pathname) && url.searchParams.get("fbid") === "1905956784132823") {
        click("outbound_click", { link_domain: "www.facebook.com" }, "jon-detailing:photo");
      } else if (["www.facebook.com", "facebook.com"].includes(url.hostname) && /^\/MazdaPersadaAuto\/?$/.test(url.pathname)) {
        click("tenant_contact_click", { contact_method: "facebook", tenant: "mazda-kinrara" }, "mazda-kinrara:facebook");
      } else if (["www.motdgroup.com", "motdgroup.com"].includes(url.hostname)) {
        const path = url.pathname.replace(/^\/zh(?=\/|$)/, "").replace(/\/$/, "") || "/";
        const destination = { "/": "home", "/menu": "menu", "/live-house": "live_music", "/contact-us": "visit" }[path] || "website";
        click("outbound_click", { link_domain: "www.motdgroup.com" }, "motd:" + destination);
      } else if (["www.optimumswimschool.com", "optimumswimschool.com"].includes(url.hostname)) {
        const path = url.pathname.replace(/\/$/, "") || "/";
        const destination = { "/free-trial": "free_trial", "/learn-to-swim": "learn_to_swim", "/water-lifesaving": "lifesaving", "/our-branches": "branches" }[path] || "website";
        click("outbound_click", { link_domain: "optimumswimschool.com" }, "optimum-swim-school:" + destination);
      } else if (["www.99speedmart.com.my", "99speedmart.com.my"].includes(url.hostname)) {
        const path = url.pathname.replace(/\/$/, "").toLowerCase() || "/";
        const destination = { "/store-locations": "store_locator", "/speedpoint": "speedpoint", "/about-us": "about" }[path] || "website";
        click("outbound_click", { link_domain: "99speedmart.com.my" }, "99-speedmart:" + destination);
      } else if (["www.forseelens.com", "forseelens.com"].includes(url.hostname)) {
        const path = url.pathname.replace(/\/$/, "") || "/";
        const destination = { "/contact": "contact", "/post-listing": "lens_selector", "/myoboostplus": "myoboost_plus", "/about": "about" }[path] || "website";
        click("outbound_click", { link_domain: "forseelens.com" }, "forsee-lens:" + destination);
      } else if (["www.instagram.com", "instagram.com"].includes(url.hostname) && /^\/chooseinterior\.cid\/?$/.test(url.pathname)) {
        click("tenant_contact_click", { contact_method: "instagram", tenant: "choose-interior" }, "choose-interior:instagram");
      } else if (["www.instagram.com", "instagram.com"].includes(url.hostname) && /^\/chooseinterior\.cid\/p\/CnQv4oOP5gF\/?$/.test(url.pathname)) {
        click("outbound_click", { link_domain: "www.instagram.com" }, "choose-interior:portfolio");
      } else if (["www.facebook.com", "facebook.com"].includes(url.hostname) && /^\/Acesgymnasticacademy\/?$/i.test(url.pathname)) {
        click("social_click", { network: "facebook", tenant: "aces-gymnastic-academy" }, "aces-gymnastic-academy:facebook");
      } else if (socialHosts[url.hostname]) {
        click("social_click", { network: socialHosts[url.hostname] }, socialHosts[url.hostname]);
      } else {
        // Domain only: exclude outbound query strings, fragments and contact contents.
        click("outbound_click", { link_domain: url.hostname }, url.hostname);
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
