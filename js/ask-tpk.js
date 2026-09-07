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
  const starterButtons = [...starters.querySelectorAll("[data-ask-starter]")];
  let history = [];
  let pending = false;
  let retryAt = 0;

  function message(role, text, sources = []) {
    const item = document.createElement("div");
    item.className = "ask-tpk-message";
    item.dataset.role = role;
    const name = document.createElement("strong");
    name.textContent = widget.dataset[role === "user" ? "you" : "assistant"];
    const body = document.createElement("p");
    body.textContent = text;
    item.append(name, body);
    const links = document.createElement("nav");
    links.className = "ask-tpk-sources";
    links.setAttribute("aria-label", widget.dataset.sources);
    for (const source of sources.slice(0, 3)) {
      // The server supplies allowlisted paths. Validate again before rendering;
      // AI output is never inserted as HTML or made into arbitrary links.
      if (typeof source?.url !== "string" || typeof source.title !== "string") continue;
      const url = new URL(source.url, location.origin);
      if (url.origin !== location.origin || !/^\/(?:ms\/|zh\/)?(?:about\/|home-living\/|automotive\/|lifestyle\/|leasing\/(?:shop-showroom\/|detached-building\/|semi-detached\/)?|contact\/|milestones\/)?$/.test(url.pathname) || url.search || url.hash) continue;
      const link = document.createElement("a");
      link.href = url.pathname;
      link.textContent = source.title;
      links.append(link);
    }
    if (links.childElementCount) item.append(links);
    log.append(item);
    return item;
  }

  function busy(value) {
    pending = value;
    input.readOnly = value;
    sendButton.disabled = value;
    clearButton.disabled = value;
    for (const button of starterButtons) button.disabled = value;
    form.setAttribute("aria-busy", String(value));
  }

  for (const button of starterButtons) button.addEventListener("click", () => {
    if (pending) return;
    input.value = button.textContent;
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
    history = [];
    log.replaceChildren();
    status.hidden = true;
    starters.hidden = false;
    input.value = "";
    input.focus();
  });

  form.addEventListener("submit", async event => {
    event.preventDefault();
    const question = input.value.trim();
    if (pending || !question || question.length > 2000) return;
    if (Date.now() < retryAt) {
      status.textContent = widget.dataset.busy;
      status.hidden = false;
      return;
    }
    const messages = [...history.slice(-8), { role: "user", content: question }];
    const payload = { locale: widget.dataset.locale, messages };
    while (messages.length > 1 && (messages.reduce((n, item) => n + item.content.length, 0) > 9000 || new TextEncoder().encode(JSON.stringify(payload)).length > 18000)) messages.splice(0, 2);
    busy(true);
    const userMessage = message("user", question);
    starters.hidden = true;
    status.textContent = widget.dataset.thinking;
    status.hidden = false;
    input.scrollIntoView({ block: "nearest" });
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 28000);
    try {
      const response = await fetch("/api/ask", {
        method: "POST", credentials: "same-origin", cache: "no-store",
        headers: { "Content-Type": "application/json" }, signal: controller.signal,
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        if (response.status === 429) {
          const delay = Number(response.headers?.get("retry-after"));
          retryAt = Date.now() + (Number.isFinite(delay) && delay > 0 ? delay : 60) * 1000;
        }
        throw new Error(response.status === 429 ? "busy" : "error");
      }
      const result = await response.json();
      if (typeof result.answer !== "string" || !result.answer.trim() || result.answer.length > 5000 || !Array.isArray(result.sources)) throw new Error("error");
      const answer = message("assistant", result.answer, result.sources);
      history = [...messages, { role: "assistant", content: result.answer }];
      while (log.childElementCount > history.length) log.firstElementChild.remove();
      input.value = "";
      status.hidden = true;
      if (!panel.hidden) answer.scrollIntoView({ block: "nearest" });
    } catch (error) {
      userMessage.remove();
      starters.hidden = history.length > 0;
      status.textContent = widget.dataset[error.message === "busy" ? "busy" : "error"];
      status.hidden = false;
    } finally {
      clearTimeout(timer);
      busy(false);
      if (!panel.hidden) input.focus({ preventScroll: true });
    }
  });
})();
