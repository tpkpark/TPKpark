import { loadSession, saveSession, clearSession, boundedTurns, requestMessages, emailBody, emailLink, SESSION_TTL } from "./ask-tpk-state.js";

(() => {
  "use strict";
  const widget = document.querySelector("[data-ask-tpk]");
  if (!widget) return;
  const trigger = widget.querySelector("[data-ask-trigger]");
  const panel = widget.querySelector("[data-ask-panel]");
  const closeButton = widget.querySelector("[data-ask-close]");
  if (!trigger || !panel || !closeButton) return;
  let stopVoiceFeatures = () => {};

  function measure(action, reason) {
    // Emit categories only. The analytics listener applies the visitor's active setting.
    try {
      document.dispatchEvent(new CustomEvent("tpk:assistant", { detail: { action, reason } }));
    } catch { /* Measurement must never interrupt a visitor's conversation. */ }
  }

  function close(restoreFocus = false) {
    stopVoiceFeatures();
    panel.hidden = true;
    trigger.setAttribute("aria-expanded", "false");
    if (restoreFocus && !trigger.hidden) trigger.focus();
  }

  trigger.addEventListener("click", () => {
    if (!panel.hidden) return close(true);
    panel.hidden = false;
    trigger.setAttribute("aria-expanded", "true");
    panel.focus();
    measure("open");
  });
  closeButton.addEventListener("click", () => close(true));
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !panel.hidden) close(true);
  });
  document.addEventListener("click", event => {
    if (!panel.hidden && !widget.contains(event.target)) close();
  });
  document.addEventListener("focusin", event => {
    if (!panel.hidden && !widget.contains(event.target)) close();
  });

  // Keep the help control clear of the existing privacy panel and mobile menu.
  const privacyPanel = document.querySelector("[data-analytics-consent]");
  const menuButton = document.querySelector(".menu-button");
  function syncVisibility() {
    const covered = Boolean(privacyPanel && !privacyPanel.hidden) || menuButton?.getAttribute("aria-expanded") === "true";
    trigger.hidden = covered;
    if (covered) close();
  }
  const observer = new MutationObserver(syncVisibility);
  if (privacyPanel) observer.observe(privacyPanel, { attributes: true, attributeFilter: ["hidden"] });
  if (menuButton) observer.observe(menuButton, { attributes: true, attributeFilter: ["aria-expanded"] });
  syncVisibility();

  if (widget.dataset.aiEnabled !== "true") return;
  const form = widget.querySelector("[data-ask-form]");
  const input = widget.querySelector("[data-ask-input]");
  const log = widget.querySelector("[data-ask-messages]");
  const status = widget.querySelector("[data-ask-status]");
  const starters = widget.querySelector("[data-ask-starters]");
  const clearButton = widget.querySelector("[data-ask-clear]");
  const sendButton = widget.querySelector("[data-ask-send]");
  if (!form || !input || !log || !status || !starters || !clearButton || !sendButton) return;
  const language = widget.querySelector("[data-ask-language]");
  const draftButton = widget.querySelector("[data-ask-draft]");
  const voiceButton = widget.querySelector("[data-ask-voice]");
  const voiceStatus = widget.querySelector("[data-ask-voice-status]");
  let config;
  try { config = JSON.parse(document.querySelector("#ask-tpk-config").textContent); } catch { return; }
  const pageLocale = widget.dataset.locale;
  let locale = pageLocale;
  let { copy, catalog, sources } = config.locales[locale];
  const sourceIdsByPath = new Map(Object.values(config.locales).flatMap(pack => Object.values(pack.sources).map(source => [source.url, source.id])));
  const starterButtons = [...starters.querySelectorAll("[data-ask-starter]")];
  let storage;
  try { storage = window.sessionStorage; } catch { /* Page memory still works. */ }
  let state = loadSession(storage);
  let expiresAt = state.expiresAt || Date.now() + SESSION_TTL;
  let pending = false;
  let statusKind = "";
  let expiryTimer;
  language.value = state.replyPreference;
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const speechSynthesis = window.speechSynthesis;
  const SpeechUtterance = window.SpeechSynthesisUtterance;
  const canDictate = Boolean(voiceButton && voiceStatus && typeof SpeechRecognition === "function" && window.isSecureContext !== false);
  const canNativeSpeak = Boolean(speechSynthesis && typeof speechSynthesis.speak === "function" && typeof speechSynthesis.cancel === "function" && typeof SpeechUtterance === "function");
  const canRemoteSpeak = Boolean(typeof window.fetch === "function" && typeof window.Audio === "function" && typeof window.URL?.createObjectURL === "function" && typeof window.URL?.revokeObjectURL === "function");
  const canSpeak = canNativeSpeak || canRemoteSpeak;
  let recognition = null;
  let listening = false;
  let speakingButton = null;
  let speakingUtterance = null;
  let speechController = null;
  let remoteAudio = null;
  let remoteObjectUrl = "";
  let availableVoices = [];
  if (canDictate) voiceButton.hidden = false;

  const speechLocales = Object.freeze({ en: "en-MY", ms: "ms-MY", zh: "zh-CN", ja: "ja-JP", ko: "ko-KR", th: "th-TH", id: "id-ID", ta: "ta-IN", hi: "hi-IN", ar: "ar-SA", fr: "fr-FR", de: "de-DE", es: "es-ES" });
  function speechLanguage(text, hint = "auto") {
    if (speechLocales[hint]) return speechLocales[hint];
    if (speechLocales[state.replyPreference]) return speechLocales[state.replyPreference];
    if (/[぀-ヿ]/u.test(text)) return speechLocales.ja;
    if (/\p{Script=Hangul}/u.test(text)) return speechLocales.ko;
    if (/\p{Script=Han}/u.test(text)) return speechLocales.zh;
    if (/\p{Script=Thai}/u.test(text)) return speechLocales.th;
    if (/\p{Script=Tamil}/u.test(text)) return speechLocales.ta;
    if (/\p{Script=Devanagari}/u.test(text)) return speechLocales.hi;
    if (/\p{Script=Arabic}/u.test(text)) return speechLocales.ar;
    const browserLanguage = window.navigator?.language;
    return typeof browserLanguage === "string" && /^[a-z]{2,3}(?:-[a-z0-9]+)*$/i.test(browserLanguage) ? browserLanguage : speechLocales[widget.dataset.locale] || "en-MY";
  }
  function normalizedLocale(value) {
    return typeof value === "string" ? value.trim().replaceAll("_", "-").toLowerCase() : "";
  }
  function refreshVoices() {
    if (!canNativeSpeak || typeof speechSynthesis.getVoices !== "function") return;
    try { availableVoices = Array.from(speechSynthesis.getVoices() || []); }
    catch { availableVoices = []; }
  }
  function selectSpeechVoice(targetLocale) {
    const voices = availableVoices.filter(voice => voice && typeof voice.lang === "string");
    const target = normalizedLocale(targetLocale);
    if (!voices.length || !target) return null;
    if (target === "zh-cn") {
      const cantonese = /cantonese|\byue\b|粤|粵|廣東|广东/i;
      const mandarin = /mandarin|putonghua|普通话|普通話|國語|国语/i;
      const score = voice => {
        const lang = normalizedLocale(voice.lang);
        const name = String(voice.name || "");
        if (cantonese.test(name) || /^yue(?:-|$)/.test(lang) || /^zh-hk(?:-|$)/.test(lang)) return -1;
        let value = 0;
        if (lang === "zh-cn" || lang === "cmn-cn") value = 300;
        else if (lang === "zh-sg" || lang === "cmn-sg") value = 200;
        else if (lang === "zh-tw" || lang === "cmn-tw") value = 100;
        else if (lang === "cmn" || lang.startsWith("cmn-")) value = 80;
        else if (lang === "zh" || lang.startsWith("zh-")) value = 40;
        if (mandarin.test(name)) value += 30;
        return value;
      };
      return voices.map((voice, index) => ({ voice, index, score: score(voice) }))
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score || a.index - b.index)[0]?.voice || null;
    }
    return voices.find(voice => normalizedLocale(voice.lang) === target)
      || voices.find(voice => normalizedLocale(voice.lang).split("-")[0] === target.split("-")[0])
      || null;
  }
  function remoteSpeechLocale(value) {
    const target = normalizedLocale(value);
    return Object.values(speechLocales).find(locale => normalizedLocale(locale) === target) || "";
  }
  function setVoiceStatus(text = "") {
    if (!voiceStatus) return;
    voiceStatus.textContent = text;
    voiceStatus.hidden = !text;
  }
  function setListening(value) {
    listening = value;
    if (!voiceButton) return;
    voiceButton.setAttribute("aria-pressed", String(value));
    voiceButton.setAttribute("aria-label", value ? copy.voiceStop : copy.voiceStart);
    voiceButton.title = value ? copy.voiceStop : copy.voiceStart;
  }
  function abortRecognition() {
    if (!recognition) return;
    const active = recognition;
    recognition = null;
    active.onresult = null;
    active.onerror = null;
    active.onend = null;
    try { active.abort(); } catch { /* Recognition may already have ended. */ }
    setListening(false);
  }
  function resetListenButton(button) {
    if (!button) return;
    button.textContent = copy.listen;
    button.setAttribute("aria-label", copy.listenAnswer);
    button.setAttribute("aria-pressed", "false");
  }
  function setPlayingButton(button) {
    if (!button) return;
    button.textContent = copy.stopAudio;
    button.setAttribute("aria-label", copy.stopAudio);
    button.setAttribute("aria-pressed", "true");
  }
  function stopSpeech() {
    if (!canSpeak) return;
    const previous = speakingButton;
    speakingButton = null;
    if (speakingUtterance) {
      speakingUtterance.onstart = null;
      speakingUtterance.onend = null;
      speakingUtterance.onerror = null;
      speakingUtterance = null;
    }
    if (speechController) { try { speechController.abort(); } catch { /* Request may already have ended. */ } speechController = null; }
    if (remoteAudio) {
      remoteAudio.onended = null;
      remoteAudio.onerror = null;
      try { remoteAudio.pause(); remoteAudio.currentTime = 0; } catch { /* Playback may already have ended. */ }
      remoteAudio = null;
    }
    if (remoteObjectUrl) { try { window.URL.revokeObjectURL(remoteObjectUrl); } catch { /* URL may already be released. */ } remoteObjectUrl = ""; }
    if (canNativeSpeak) try { speechSynthesis.cancel(); } catch { /* Playback may already have ended. */ }
    resetListenButton(previous);
  }
  stopVoiceFeatures = () => {
    abortRecognition();
    stopSpeech();
    setVoiceStatus();
  };
  if (canNativeSpeak) {
    refreshVoices();
    speechSynthesis.addEventListener?.("voiceschanged", refreshVoices);
  }

  function persist() {
    saveSession(storage, state);
    expiresAt = Date.now() + SESSION_TTL;
    armExpiry();
  }
  function textElement(tag, text, className) {
    const element = document.createElement(tag);
    element.textContent = text;
    if (className) element.className = className;
    return element;
  }
  function copyElement(tag, key, className) {
    const element = textElement(tag, copy[key], className);
    element.dataset.askCopy = key;
    return element;
  }
  function localizeDialog() {
    locale = Object.hasOwn(config.locales, state.replyPreference) ? state.replyPreference : pageLocale;
    ({ copy, catalog, sources } = config.locales[locale]);
    panel.lang = locale;
    // Relabel controls in place: never rebuild the transcript or editable drafts.
    for (const element of panel.querySelectorAll("[data-ask-copy]")) element.textContent = copy[element.dataset.askCopy];
    for (const element of panel.querySelectorAll("[data-ask-copy-label]")) element.setAttribute("aria-label", copy[element.dataset.askCopyLabel]);
    for (const element of panel.querySelectorAll("[data-ask-copy-placeholder]")) element.setAttribute("placeholder", copy[element.dataset.askCopyPlaceholder]);
    starterButtons.forEach((button, index) => { button.textContent = config.locales[locale].starters[index]; });
    for (const link of panel.querySelectorAll("[data-ask-route]")) link.href = sources[link.dataset.askRoute].url;
    for (const link of log.querySelectorAll("[data-ask-source]")) {
      const source = sources[link.dataset.askSource];
      if (source) { link.textContent = source.title; link.href = source.url; }
    }
    for (const box of log.querySelectorAll("[data-ask-property]")) localizeCard(box);
    for (const box of log.querySelectorAll("[data-ask-email]")) {
      const draft = box.querySelector("textarea");
      box.querySelector("a").href = emailLink(draft.value, copy.emailSubject);
    }
    for (const button of log.querySelectorAll("[data-ask-listen]")) resetListenButton(button);
    setListening(false);
    setStatus(statusKind);
  }
  function safeSource(source) {
    if (typeof source?.url !== "string" || typeof source.title !== "string") return null;
    try {
      const url = new URL(source.url, location.origin);
      if (url.origin !== location.origin || !/^\/(?:ms\/|zh\/)?(?:about\/|home-living\/(?:(?:lavino|ga-hing|kuche-bath|jubin-bms)\/)?|automotive\/|lifestyle\/(?:motd\/)?|leasing\/(?:shop-showroom\/|detached-building\/|semi-detached\/)?|contact\/|milestones\/|news\/|wong-shung-yen\/(?:public-record\/)?)?$/.test(url.pathname) || url.search || url.hash) return null;
      return { ...source, id: sourceIdsByPath.get(url.pathname), url: url.pathname };
    } catch { return null; }
  }
  function localizeCard(box) {
    const card = catalog[box.dataset.askProperty];
    if (!card) return;
    const labels = { rent: "rentLabel", builtUp: "builtUpLabel", landArea: "landAreaLabel" };
    for (const element of box.querySelectorAll("[data-ask-card-field]")) {
      const key = element.dataset.askCardField;
      element.textContent = labels[key] ? `${copy[labels[key]]}: ${card[key]}` : card[key];
    }
    box.querySelector("img").alt = card.title;
    for (const link of box.querySelectorAll("[data-ask-card-link]")) link.href = card[link.dataset.askCardLink];
  }
  function renderCards(item, ids = []) {
    for (const id of [...new Set(ids)].slice(0, 3)) {
      if (!Object.hasOwn(catalog, id)) continue;
      const card = catalog[id];
      const box = document.createElement("article");
      box.className = "ask-tpk-property";
      box.dataset.askProperty = id;
      const photo = document.createElement("img");
      photo.src = card.image;
      photo.alt = card.title;
      photo.loading = "lazy";
      photo.width = 640; photo.height = 400;
      const field = (tag, key, className) => {
        const element = textElement(tag, "", className);
        element.dataset.askCardField = key;
        return element;
      };
      box.append(photo, field("h3", "title"), field("p", "description"), field("p", "rent", "ask-tpk-rent"), field("p", "builtUp"));
      if (card.landArea) box.append(field("p", "landArea"));
      box.append(field("p", "status"));
      const links = document.createElement("nav");
      links.className = "ask-tpk-sources";
      for (const [key, target] of [["details", "url"], ["brochure", "brochure"]]) {
        const link = copyElement("a", key);
        const url = card[target];
        link.dataset.askCardLink = target;
        link.href = url;
        if (url.endsWith(".pdf")) { link.type = "application/pdf"; link.target = "_blank"; link.rel = "noopener noreferrer"; }
        links.append(link);
      }
      box.append(links, field("p", "note", "ask-tpk-card-note"));
      localizeCard(box);
      item.append(box);
    }
  }
  function renderDraft(item, enquiry) {
    if (enquiry?.requested !== true) return;
    const box = document.createElement("details");
    box.className = "ask-tpk-email";
    box.dataset.askEmail = "";
    box.open = true;
    box.append(copyElement("summary", "draftTitle"), copyElement("p", "draftNote"));
    const label = document.createElement("label");
    label.append(copyElement("span", "draftLabel"));
    const draft = document.createElement("textarea");
    draft.value = emailBody(enquiry, copy);
    draft.rows = 9; draft.maxLength = 2400;
    label.append(draft);
    const open = copyElement("a", "openEmail", "ask-tpk-email-open");
    open.href = emailLink(draft.value, copy.emailSubject);
    draft.addEventListener("input", () => { open.href = emailLink(draft.value, copy.emailSubject); });
    // Edits remain in this page only; never send them to the model or analytics.
    box.append(label, open);
    item.append(box);
  }
  function renderListen(text, hint) {
    if (!canSpeak) return null;
    const button = textElement("button", copy.listen, "ask-tpk-listen");
    button.dataset.askListen = "";
    button.type = "button";
    button.setAttribute("aria-label", copy.listenAnswer);
    button.setAttribute("aria-pressed", "false");
    button.addEventListener("click", async () => {
      if (speakingButton === button) return stopSpeech();
      stopSpeech();
      setVoiceStatus();
      const playbackLocale = speechLanguage(text, hint);
      refreshVoices();
      const selectedVoice = selectSpeechVoice(playbackLocale);
      const fallbackLocale = remoteSpeechLocale(playbackLocale);
      if (canRemoteSpeak && fallbackLocale && (fallbackLocale === "zh-CN" || !canNativeSpeak || !selectedVoice)) {
        const controller = new AbortController();
        speechController = controller;
        speakingButton = button;
        setPlayingButton(button);
        const finish = () => {
          if (speakingButton !== button) return;
          if (remoteAudio) { remoteAudio.onended = null; remoteAudio.onerror = null; remoteAudio = null; }
          if (remoteObjectUrl) { try { window.URL.revokeObjectURL(remoteObjectUrl); } catch { /* URL may already be released. */ } remoteObjectUrl = ""; }
          speechController = null;
          speakingButton = null;
          resetListenButton(button);
        };
        try {
          const response = await window.fetch("/api/speak", {
            method: "POST", credentials: "same-origin", cache: "no-store",
            headers: { "Accept": "audio/mpeg", "Content-Type": "application/json" },
            body: JSON.stringify({ text, locale: fallbackLocale }), signal: controller.signal
          });
          if (!response.ok) throw new Error("unavailable");
          const blob = await response.blob();
          if (speakingButton !== button) return;
          if (!blob || !Number.isFinite(blob.size) || blob.size < 1 || blob.size > 8000000) throw new Error("unavailable");
          remoteObjectUrl = window.URL.createObjectURL(blob);
          remoteAudio = new window.Audio(remoteObjectUrl);
          remoteAudio.preload = "auto";
          remoteAudio.onended = finish;
          remoteAudio.onerror = () => { setVoiceStatus(copy.playbackUnavailable); finish(); };
          setVoiceStatus(copy.aiVoiceNotice);
          measure("listen_start");
          await remoteAudio.play();
        } catch (error) {
          if (speakingButton !== button) return;
          if (error?.name !== "AbortError") setVoiceStatus(copy.playbackUnavailable);
          finish();
        }
        return;
      }
      if (!canNativeSpeak) { setVoiceStatus(copy.playbackUnavailable); return; }
      let utterance;
      try { utterance = new SpeechUtterance(text); }
      catch { return; }
      utterance.lang = playbackLocale;
      if (selectedVoice) utterance.voice = selectedVoice;
      utterance.rate = 1;
      utterance.onstart = () => {
        if (speakingButton !== button) return;
        speakingButton = button;
        setPlayingButton(button);
        measure("listen_start");
      };
      const finish = () => {
        if (speakingButton !== button) return;
        speakingButton = null;
        speakingUtterance = null;
        resetListenButton(button);
      };
      utterance.onend = finish;
      utterance.onerror = finish;
      speakingButton = button;
      speakingUtterance = utterance;
      try { speechSynthesis.speak(utterance); }
      catch { finish(); }
    });
    return button;
  }
  function message(role, text, references = [], rich = {}) {
    const item = document.createElement("div");
    item.className = "ask-tpk-message";
    item.dataset.role = role;
    item.append(copyElement("strong", role === "user" ? "you" : "aiLabel"), textElement("p", text));
    if (role === "assistant") {
      const listenButton = renderListen(text, rich.language);
      if (listenButton) item.append(listenButton);
    }
    const links = document.createElement("nav");
    links.className = "ask-tpk-sources";
    links.dataset.askCopyLabel = "sources";
    links.setAttribute("aria-label", copy.sources);
    for (const source of references.slice(0, 3).map(safeSource).filter(Boolean)) {
      const localized = sources[source.id] || source;
      const link = textElement("a", localized.title);
      if (source.id) link.dataset.askSource = source.id;
      link.href = localized.url;
      links.append(link);
    }
    if (links.childElementCount) item.append(links);
    if (role === "assistant") { renderCards(item, rich.propertyIds); renderDraft(item, rich.enquiry); }
    log.append(item);
    return item;
  }
  function restore() {
    log.replaceChildren();
    for (const turn of state.turns) message(turn.role, turn.content, (turn.sourceIds || []).map(id => Object.hasOwn(sources, id) ? sources[id] : null).filter(Boolean), turn);
    starters.hidden = state.turns.length > 0;
  }
  localizeDialog();
  restore();
  function busy(value) {
    pending = value;
    input.readOnly = value;
    sendButton.disabled = value;
    clearButton.disabled = value;
    language.disabled = value;
    draftButton.disabled = value;
    if (voiceButton) voiceButton.disabled = value;
    for (const button of starterButtons) button.disabled = value;
    form.setAttribute("aria-busy", String(value));
  }
  function retryMessage() {
    const time = new Date(state.retryAt).toLocaleString(({ en: "en-MY", ms: "ms-MY", zh: "zh-MY" })[locale], { day: "numeric", month: "short", hour: "numeric", minute: "2-digit", second: "2-digit" });
    return copy.retry.replace("{time}", time);
  }
  function setStatus(kind = "") {
    statusKind = kind;
    status.textContent = kind === "retry" ? retryMessage() : copy[kind] || "";
    status.hidden = !kind;
  }
  function expire() {
    if (Date.now() < expiresAt) return;
    state.turns = [];
    clearSession(storage);
    restore();
    expiresAt = Date.now() + SESSION_TTL;
  }
  function armExpiry() {
    clearTimeout(expiryTimer);
    expiryTimer = setTimeout(expire, Math.max(1, expiresAt - Date.now()));
    expiryTimer?.unref?.();
  }
  armExpiry();
  document.addEventListener("visibilitychange", expire);
  trigger.addEventListener("click", expire);
  language.addEventListener("change", () => {
    stopVoiceFeatures();
    state.replyPreference = language.value;
    localizeDialog();
    persist();
  });
  if (canDictate) voiceButton.addEventListener("click", () => {
    if (pending) return;
    if (listening && recognition) {
      try { recognition.stop(); } catch { abortRecognition(); }
      return;
    }
    abortRecognition();
    stopSpeech();
    setVoiceStatus();
    let active;
    try { active = new SpeechRecognition(); }
    catch { setVoiceStatus(copy.voiceError); return; }
    recognition = active;
    const base = input.value.trimEnd();
    let heard = false;
    let failed = false;
    active.lang = speechLanguage("", state.replyPreference);
    active.continuous = false;
    active.interimResults = false;
    active.maxAlternatives = 1;
    active.onstart = () => {
      if (recognition !== active) return;
      setListening(true);
      setVoiceStatus(copy.voiceListening);
      measure("voice_start");
    };
    active.onresult = event => {
      if (recognition !== active || heard) return;
      const transcript = Array.from(event.results || [], result => result?.[0]?.transcript || "").join(" ").trim();
      if (!transcript) return;
      heard = true;
      input.value = `${base}${base ? " " : ""}${transcript}`.slice(0, 2000);
      setVoiceStatus(copy.voiceReady);
      measure("voice_ready");
      input.focus({ preventScroll: true });
    };
    active.onerror = event => {
      if (recognition !== active) return;
      failed = true;
      const reason = event?.error;
      setVoiceStatus(["not-allowed", "service-not-allowed"].includes(reason) ? copy.voiceDenied : reason === "no-speech" ? copy.voiceNoSpeech : copy.voiceError);
    };
    active.onend = () => {
      if (recognition !== active) return;
      recognition = null;
      setListening(false);
      if (!heard && !failed) setVoiceStatus(copy.voiceNoSpeech);
    };
    try { active.start(); }
    catch {
      recognition = null;
      setListening(false);
      setVoiceStatus(copy.voiceError);
    }
  });
  for (const button of starterButtons) button.addEventListener("click", () => {
    if (pending) return;
    input.value = button.textContent;
    form.requestSubmit();
  });
  draftButton.addEventListener("click", () => {
    if (pending) return;
    input.value = copy.draftPrompt;
    form.requestSubmit();
  });
  input.addEventListener("keydown", event => {
    if (event.key === "Enter" && !event.shiftKey && !event.isComposing) {
      event.preventDefault();
      if (!pending) form.requestSubmit();
    }
  });
  clearButton.addEventListener("click", () => {
    if (pending) return;
    stopVoiceFeatures();
    state.turns = [];
    clearSession(storage);
    restore();
    setStatus();
    input.value = "";
    input.focus();
  });
  form.addEventListener("submit", async event => {
    event.preventDefault();
    const question = input.value.trim();
    if (pending || !question || question.length > 2000) return;
    abortRecognition();
    stopSpeech();
    setVoiceStatus();
    expire();
    if (Date.now() < state.retryAt) {
      setStatus("retry");
      return;
    }
    const messages = requestMessages(state.turns, question);
    const payload = { locale: widget.dataset.locale, messages, replyPreference: state.replyPreference, pathname: widget.dataset.pathname };
    busy(true);
    const userMessage = message("user", question);
    starters.hidden = true;
    setStatus("thinking");
    input.scrollIntoView({ block: "nearest" });
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 29000);
    let diagnostic = "client_response";
    let failureReason = "network";
    measure("question");
    try {
      const response = await fetch("/api/ask", {
        method: "POST", credentials: "same-origin", cache: "no-store",
        headers: { "Content-Type": "application/json" }, signal: controller.signal,
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        failureReason = response.status === 429 ? "rate_limited" : "unavailable";
        diagnostic = `http_${response.status}`;
        try { const failure = await response.json(); if (/^(?:gateway_(?:auth|request|[0-9]{3})|output_(?:decode|incomplete|schema|language))$/.test(failure.diagnostic || "")) diagnostic += ":" + failure.diagnostic; } catch { /* Keep only the status code. */ }
        if (response.status === 429) {
          const header = response.headers?.get("retry-after");
          const delay = header && Number.isFinite(Number(header)) ? Number(header) : (Date.parse(header) - Date.now()) / 1000;
          state.retryAt = Date.now() + Math.min(32 * 86400, Number.isFinite(delay) && delay > 0 ? Math.ceil(delay) : 60) * 1000;
          persist();
        }
        throw new Error(response.status === 429 ? "busy" : "error");
      }
      failureReason = "invalid_response";
      const result = await response.json();
      if (typeof result.answer !== "string" || !result.answer.trim() || result.answer.length > 5000 || !Array.isArray(result.sources) || !Array.isArray(result.propertyIds)) throw new Error("error");
      const answer = message("assistant", result.answer, result.sources, result);
      const sourceIds = result.sources.map(safeSource).filter(Boolean).map(source => source.id).filter(id => Object.hasOwn(sources, id));
      // Save only completed exchanges; an interrupted question stays editable.
      state.turns = boundedTurns([...state.turns, { role: "user", content: question }, { role: "assistant", content: result.answer, sourceIds, propertyIds: result.propertyIds, enquiry: result.enquiry, language: result.language }]);
      state.retryAt = 0;
      persist();
      while (log.childElementCount > state.turns.length) log.firstElementChild.remove();
      input.value = "";
      setStatus();
      measure("answer");
      if (result.enquiry?.requested === true) measure("draft_ready");
      if (!panel.hidden) answer.scrollIntoView({ block: "nearest" });
    } catch (error) {
      measure("error", error.name === "AbortError" ? "timeout" : failureReason);
      if (location.hostname?.endsWith(".vercel.app")) console.warn("Ask TPK preview diagnostic:", diagnostic);
      userMessage.remove();
      starters.hidden = state.turns.length > 0;
      setStatus(error.message === "busy" ? "retry" : "error");
    } finally {
      clearTimeout(timer);
      busy(false);
      if (!panel.hidden) input.focus({ preventScroll: true });
    }
  });
})();
