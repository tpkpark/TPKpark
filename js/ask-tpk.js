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
})();
