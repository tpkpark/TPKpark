(() => {
  "use strict";
  const form = document.querySelector("[data-email-form]");
  if (!form) return;
  const config = form.dataset;
  const field = name => form.elements.namedItem(name);
  const status = form.querySelector("[data-enquiry-status]");
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

  function announce(message) {
    status.textContent = message;
    status.hidden = false;
    status.focus();
  }
  function selectedLabel(name) {
    const element = field(name);
    return element.disabled ? "" : (element.selectedOptions?.[0]?.textContent || element.value || "");
  }
  form.addEventListener("submit", event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
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
    const body = Object.entries(details).filter(([, value]) => value).map(([name, value]) => `${name}: ${value}`).join("\n");
    location.href = `mailto:info@tpkpark.com?subject=${encodeURIComponent("TPK Park enquiry — " + details.Interest)}&body=${encodeURIComponent(body)}`;
    announce(config.draftReady);
  });
})();
