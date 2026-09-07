(() => {
  "use strict";
  const form = document.querySelector("[data-email-form]");
  if (!form) return;
  const config = form.dataset;
  const field = name => form.elements.namedItem(name);
  const status = form.querySelector("[data-enquiry-status]");
  const button = form.querySelector('[type="submit"]');
  const buttonLabel = button.querySelector("[data-submit-label]");
  const leasingFields = form.querySelector("[data-leasing-fields]");
  const floorField = form.querySelector("[data-floor-field]");
  const params = new URLSearchParams(location.search);
  const knownSpaces = ["shop-showroom", "detached-building", "semi-detached", "terrace-waitlist"];
  const knownFloors = ["ground", "first", "both"];
  const knownSources = ["google-business", "agent", "facebook", "instagram", "signage", "tenant-referral"];
  const requestedSpace = params.get("space");
  if (knownSpaces.includes(requestedSpace)) {
    field("spaceType").value = requestedSpace;
    field("interest").value = config.leasingInterest;
  }
  if (params.get("intent") === "viewing") {
    field("requestType").value = "viewing";
    field("interest").value = config.leasingInterest;
  }
  if (knownFloors.includes(params.get("floor")) && requestedSpace === "shop-showroom") field("floor").value = params.get("floor");
  const source = knownSources.includes(params.get("source")) ? params.get("source") : "website";

  function syncFields() {
    const leasing = field("interest").value === config.leasingInterest;
    leasingFields.hidden = !leasing;
    for (const name of ["spaceType", "requestType"]) field(name).disabled = !leasing;
    const shop = leasing && field("spaceType").value === "shop-showroom";
    floorField.hidden = !shop;
    field("floor").disabled = !shop;
  }
  field("interest").addEventListener("change", syncFields);
  field("spaceType").addEventListener("change", syncFields);
  syncFields();

  function announce(message, error = false) {
    status.textContent = message;
    status.dataset.state = error ? "error" : "success";
    status.hidden = false;
    status.focus();
  }
  function selectedLabel(name) {
    const element = field(name);
    return element.disabled ? "" : (element.selectedOptions?.[0]?.textContent || element.value || "");
  }
  let submitting = false;
  let submitted = false;
  form.addEventListener("submit", async event => {
    event.preventDefault();
    if (submitting || submitted || !form.reportValidity()) return;
    if (field("_honey").value) return;
    syncFields();
    const details = {
      name: field("name").value.trim(),
      email: field("email").value.trim(),
      Company: field("company").value.trim(),
      Phone: field("phone").value.trim(),
      Interest: selectedLabel("interest"),
      "Space type": selectedLabel("spaceType"),
      Request: selectedLabel("requestType"),
      "Preferred floor": selectedLabel("floor"),
      Message: field("message").value.trim(),
      Language: config.locale,
      Source: source,
      "Page URL": config.canonical
    };
    if (config.deliveryMode === "email") {
      const body = Object.entries(details).filter(([, value]) => value).map(([name, value]) => `${name}: ${value}`).join("\n");
      location.href = `mailto:info@tpkpark.com?subject=${encodeURIComponent("TPK Park enquiry — " + details.Interest)}&body=${encodeURIComponent(body)}`;
      announce(config.draftReady);
      return;
    }
    // Network delivery is enabled only by the approved, activated build config.
    if (config.deliveryMode !== "formsubmit" || !/^https:\/\/formsubmit\.co\/ajax\/[a-zA-Z0-9@._-]+$/.test(config.ajaxEndpoint || "")) {
      announce(config.error, true);
      return;
    }
    submitting = true;
    button.disabled = true;
    form.setAttribute("aria-busy", "true");
    status.hidden = true;
    buttonLabel.textContent = config.sending;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch(config.ajaxEndpoint, {
        method: "POST",
        credentials: "omit",
        referrerPolicy: "strict-origin",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...details, _subject: "TPK Park website enquiry", _template: "table", _url: config.canonical, _honey: "" }),
        signal: controller.signal
      });
      const result = await response.json();
      if (!response.ok || ![true, "true"].includes(result.success)) throw new Error("Submission was not accepted");
      submitted = true;
      announce(config.success);
      const space = knownSpaces.includes(field("spaceType").value) && !field("spaceType").disabled ? field("spaceType").value : "unspecified";
      // Operational contact details never enter the analytics event.
      document.dispatchEvent(new CustomEvent("tpk:enquiry-submitted", { detail: { spaceType: space } }));
      form.reset();
      syncFields();
    } catch {
      // Keep the visitor's input and never retry automatically after a timeout.
      announce(config.error, true);
    } finally {
      clearTimeout(timeout);
      submitting = false;
      button.disabled = submitted;
      buttonLabel.textContent = config.submitLabel;
      form.setAttribute("aria-busy", "false");
    }
  });
})();
