(() => {
  const root = document.querySelector("[data-business-directory]");
  if (!root) return;
  const controls = root.querySelector("[data-directory-controls]");
  const search = root.querySelector("[data-directory-search]");
  const cluster = root.querySelector("[data-directory-cluster]");
  const cards = [...root.querySelectorAll("[data-directory-entry]")];
  const count = root.querySelector("[data-directory-count]");
  const empty = root.querySelector("[data-directory-empty]");
  const normalise = value => value.normalize("NFKC").toLocaleLowerCase().trim();
  function update() {
    const terms = normalise(search.value).split(/\s+/).filter(Boolean);
    let visible = 0;
    for (const card of cards) {
      const matches = (!cluster.value || card.dataset.cluster === cluster.value) && terms.every(term => normalise(card.dataset.search).includes(term));
      card.hidden = !matches;
      if (matches) visible++;
    }
    count.textContent = String(visible);
    empty.hidden = visible !== 0;
  }
  // Search stays in the page: no URL parameters, storage or analytics events.
  search.addEventListener("input", update);
  cluster.addEventListener("change", update);
  root.querySelector("[data-directory-reset]").addEventListener("click", () => {
    search.value = "";
    cluster.value = "";
    update();
    search.focus();
  });
  controls.hidden = false;
  update();
})();
