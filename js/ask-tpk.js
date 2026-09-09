import { loadSession, saveSession, clearSession, boundedTurns, requestMessages, emailBody, emailLink, SESSION_TTL } from "./ask-tpk-state.js";

(() => {
  "use strict";
  const widget = document.querySelector("[data-ask-tpk]");
  if (!widget) return;
  const trigger = widget.querySelector("[data-ask-trigger]");
  const panel = widget.querySelector("[data-ask-panel]");
  const closeButton = widget.querySelector("[data-ask-close]");
  if (!trigger || !panel || !closeButton) return;

  function close(restoreFocus = false) {
    panel.hidden = true;
    trigger.setAttribute("aria-expanded", "false");
    if (restoreFocus && !trigger.hidden) trigger.focus();
  }

  trigger.addEventListener("click", () => {
    if (!panel.hidden) return close(true);
    panel.hidden = false;
    trigger.setAttribute("aria-expanded", "true");
    panel.focus();
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
  let config;
  try { config = JSON.parse(document.querySelector("#ask-tpk-config").textContent); } catch { return; }
  const copy = config.copy;
  const starterButtons = [...starters.querySelectorAll("[data-ask-starter]")];
  let storage;
  try { storage = window.sessionStorage; } catch { /* Page memory still works. */ }
  let state = loadSession(storage);
  let expiresAt = state.expiresAt || Date.now() + SESSION_TTL;
  let pending = false;
  let expiryTimer;
  language.value = state.replyPreference;

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
  function safeSource(source) {
    if (typeof source?.url !== "string" || typeof source.title !== "string") return null;
    try {
      const url = new URL(source.url, location.origin);
      if (url.origin !== location.origin || !/^\/(?:ms\/|zh\/)?(?:about\/|home-living\/|automotive\/|lifestyle\/|leasing\/(?:shop-showroom\/|detached-building\/|semi-detached\/)?|contact\/|milestones\/|news\/|wong-shung-yen\/(?:public-record\/)?)?$/.test(url.pathname) || url.search || url.hash) return null;
      return { ...source, url: url.pathname };
    } catch { return null; }
  }
  function renderCards(item, ids = []) {
    for (const id of [...new Set(ids)].slice(0, 3)) {
      if (!Object.hasOwn(config.catalog, id)) continue;
      const card = config.catalog[id];
      const box = document.createElement("article");
      box.className = "ask-tpk-property";
      const photo = document.createElement("img");
      photo.src = card.image;
      photo.alt = card.title;
      photo.loading = "lazy";
      photo.width = 640; photo.height = 400;
      box.append(photo, textElement("h3", card.title), textElement("p", card.description), textElement("p", `${copy.rentLabel}: ${card.rent}`, "ask-tpk-rent"), textElement("p", `${copy.builtUpLabel}: ${card.builtUp}`));
      if (card.landArea) box.append(textElement("p", `${copy.landAreaLabel}: ${card.landArea}`));
      box.append(textElement("p", card.status));
      const links = document.createElement("nav");
      links.className = "ask-tpk-sources";
      for (const [title, url] of [[copy.details, card.url], [copy.brochure, card.brochure]]) {
        const link = textElement("a", title);
        link.href = url;
        if (url.endsWith(".pdf")) { link.type = "application/pdf"; link.target = "_blank"; link.rel = "noopener noreferrer"; }
        links.append(link);
      }
      box.append(links, textElement("p", card.note, "ask-tpk-card-note"));
      item.append(box);
    }
  }
  function renderDraft(item, enquiry) {
    if (enquiry?.requested !== true) return;
    const box = document.createElement("details");
    box.className = "ask-tpk-email";
    box.open = true;
    box.append(textElement("summary", copy.draftTitle), textElement("p", copy.draftNote));
    const label = document.createElement("label");
    label.append(textElement("span", copy.draftLabel));
    const draft = document.createElement("textarea");
    draft.value = emailBody(enquiry, copy);
    draft.rows = 9; draft.maxLength = 2400;
    label.append(draft);
    const open = textElement("a", copy.openEmail, "ask-tpk-email-open");
    open.href = emailLink(draft.value, copy.emailSubject);
    draft.addEventListener("input", () => { open.href = emailLink(draft.value, copy.emailSubject); });
    // Edits remain in this page only; never send them to the model or analytics.
    box.append(label, open);
    item.append(box);
  }
  function message(role, text, sources = [], rich = {}) {
    const item = document.createElement("div");
    item.className = "ask-tpk-message";
    item.dataset.role = role;
    item.append(textElement("strong", widget.dataset[role === "user" ? "you" : "assistant"]), textElement("p", text));
    const links = document.createElement("nav");
    links.className = "ask-tpk-sources";
    links.setAttribute("aria-label", widget.dataset.sources);
    for (const source of sources.slice(0, 3).map(safeSource).filter(Boolean)) {
      const link = textElement("a", source.title);
      link.href = source.url;
      links.append(link);
    }
    if (links.childElementCount) item.append(links);
    if (role === "assistant") { renderCards(item, rich.propertyIds); renderDraft(item, rich.enquiry); }
    log.append(item);
    return item;
  }
  function restore() {
    log.replaceChildren();
    for (const turn of state.turns) message(turn.role, turn.content, (turn.sourceIds || []).map(id => Object.hasOwn(config.sources, id) ? config.sources[id] : null).filter(Boolean), turn);
    starters.hidden = state.turns.length > 0;
  }
  restore();
  function busy(value) {
    pending = value;
    input.readOnly = value;
    sendButton.disabled = value;
    clearButton.disabled = value;
    language.disabled = value;
    draftButton.disabled = value;
    for (const button of starterButtons) button.disabled = value;
    form.setAttribute("aria-busy", String(value));
  }
  function retryMessage() {
    const time = new Date(state.retryAt).toLocaleString(({ en: "en-MY", ms: "ms-MY", zh: "zh-MY" })[widget.dataset.locale], { day: "numeric", month: "short", hour: "numeric", minute: "2-digit", second: "2-digit" });
    return copy.retry.replace("{time}", time);
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
  language.addEventListener("change", () => { state.replyPreference = language.value; persist(); });
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
    state.turns = [];
    clearSession(storage);
    restore();
    status.hidden = true;
    input.value = "";
    input.focus();
  });
  form.addEventListener("submit", async event => {
    event.preventDefault();
    const question = input.value.trim();
    if (pending || !question || question.length > 2000) return;
    expire();
    if (Date.now() < state.retryAt) {
      status.textContent = retryMessage();
      status.hidden = false;
      return;
    }
    const messages = requestMessages(state.turns, question);
    const payload = { locale: widget.dataset.locale, messages, replyPreference: state.replyPreference, pathname: widget.dataset.pathname };
    busy(true);
    const userMessage = message("user", question);
    starters.hidden = true;
    status.textContent = widget.dataset.thinking;
    status.hidden = false;
    input.scrollIntoView({ block: "nearest" });
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 29000);
    try {
      const response = await fetch("/api/ask", {
        method: "POST", credentials: "same-origin", cache: "no-store",
        headers: { "Content-Type": "application/json" }, signal: controller.signal,
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        if (response.status === 429) {
          const header = response.headers?.get("retry-after");
          const delay = header && Number.isFinite(Number(header)) ? Number(header) : (Date.parse(header) - Date.now()) / 1000;
          state.retryAt = Date.now() + Math.min(32 * 86400, Number.isFinite(delay) && delay > 0 ? Math.ceil(delay) : 60) * 1000;
          persist();
        }
        throw new Error(response.status === 429 ? "busy" : "error");
      }
      const result = await response.json();
      if (typeof result.answer !== "string" || !result.answer.trim() || result.answer.length > 5000 || !Array.isArray(result.sources) || !Array.isArray(result.propertyIds)) throw new Error("error");
      const answer = message("assistant", result.answer, result.sources, result);
      const sourceIds = result.sources.filter(safeSource).map(source => source.id || Object.keys(config.sources).find(id => config.sources[id].url === source.url)).filter(id => Object.hasOwn(config.sources, id));
      // Save only completed exchanges; an interrupted question stays editable.
      state.turns = boundedTurns([...state.turns, { role: "user", content: question }, { role: "assistant", content: result.answer, sourceIds, propertyIds: result.propertyIds, enquiry: result.enquiry }]);
      state.retryAt = 0;
      persist();
      while (log.childElementCount > state.turns.length) log.firstElementChild.remove();
      input.value = "";
      status.hidden = true;
      if (!panel.hidden) answer.scrollIntoView({ block: "nearest" });
    } catch (error) {
      userMessage.remove();
      starters.hidden = state.turns.length > 0;
      status.textContent = error.message === "busy" ? retryMessage() : widget.dataset.error;
      status.hidden = false;
    } finally {
      clearTimeout(timer);
      busy(false);
      if (!panel.hidden) input.focus({ preventScroll: true });
    }
  });
})();
