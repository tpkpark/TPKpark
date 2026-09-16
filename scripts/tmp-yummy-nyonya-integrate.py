from pathlib import Path
import re


def replace_once(text, old, new, label):
    if text.count(old) != 1:
        raise SystemExit(f"{label}: expected one target, found {text.count(old)}")
    return text.replace(old, new, 1)

# Site data / route / SEO / directory / page maps.
path = Path("scripts/site-data.mjs")
text = path.read_text()
anchor = 'import { nuarinaProfiles } from "./nuarina-profile.mjs";\n'
text = replace_once(text, anchor, anchor + 'import { yummyNyonyaProfiles } from "./yummy-nyonya-profile.mjs";\n', "site import")
anchor = '  nuarina: "lifestyle/nasi-lemak-nuarina",\n'
text = replace_once(text, anchor, anchor + '  yummyNyonya: "lifestyle/yummy-nyonya-kitchen",\n', "route")

seo_lines = {
    '    nuarina: "Nasi Lemak Nuarina Puchong Kinrara | TPK Park",\n': '    yummyNyonya: "Yummy Nyonya Kitchen Puchong Kinrara | TPK Park",\n',
    '    nuarina: "Nasi Lemak Nuarina蒲种金銮 | TPK Park",\n': '    yummyNyonya: "Yummy Nyonya Kitchen蒲种金銮 | TPK Park",\n',
}
# EN and BM share the same Nuarina title, so update the first two occurrences separately.
common = '    nuarina: "Nasi Lemak Nuarina Puchong Kinrara | TPK Park",\n'
if text.count(common) != 2:
    raise SystemExit(f"expected 2 EN/BM Nuarina SEO lines, found {text.count(common)}")
text = text.replace(common, common + '    yummyNyonya: "Yummy Nyonya Kitchen Puchong Kinrara | TPK Park",\n', 2)
zh = '    nuarina: "Nasi Lemak Nuarina蒲种金銮 | TPK Park",\n'
text = replace_once(text, zh, zh + '    yummyNyonya: "Yummy Nyonya Kitchen蒲种金銮 | TPK Park",\n', "ZH SEO")

anchor = '  nuarina: "2026-09-16",\n'
text = replace_once(text, anchor, anchor + '  yummyNyonya: "2026-09-16",\n', "last modified")

text, count = re.subn(r'(\["[^"]+", "Yummy Nyonya Kitchen")\]', r'\1, "yummyNyonya"]', text)
if count != 3:
    raise SystemExit(f"expected 3 Yummy Nyonya directory entries, updated {count}")

for locale in ("en", "ms", "zh"):
    anchor = f"nuarina: nuarinaProfiles.{locale},"
    replacement = anchor + f" yummyNyonya: yummyNyonyaProfiles.{locale},"
    text = replace_once(text, anchor, replacement, f"{locale} page map")
path.write_text(text)

# Analytics route allowlist and tenant phone attribution.
path = Path("js/analytics.js")
text = path.read_text()
old = r"lifestyle(?:\/(?:motd|jazmina-bistro|nasi-lemak-nuarina))?"
new = r"lifestyle(?:\/(?:motd|jazmina-bistro|nasi-lemak-nuarina|yummy-nyonya-kitchen))?"
text = replace_once(text, old, new, "analytics route allowlist")
anchor = '    if (href === "tel:+60122282290") return click("tenant_contact_click", { contact_method: "phone", tenant: "nasi-lemak-nuarina" }, "nasi-lemak-nuarina:phone");\n'
addition = (
    '    if (href === "tel:+601111631126") return click("tenant_contact_click", { contact_method: "phone", tenant: "yummy-nyonya-kitchen" }, "yummy-nyonya-kitchen:phone");\n'
    '    if (href === "tel:+60108912102") return click("tenant_contact_click", { contact_method: "phone", tenant: "yummy-nyonya-kitchen" }, "yummy-nyonya-kitchen:phone-alt");\n'
)
text = replace_once(text, anchor, anchor + addition, "Yummy phone analytics")
path.write_text(text)

# Ask TPK route allowlist.
path = Path("js/ask-tpk.js")
text = path.read_text()
old = r"(?:motd|jazmina-bistro|nasi-lemak-nuarina)"
new = r"(?:motd|jazmina-bistro|nasi-lemak-nuarina|yummy-nyonya-kitchen)"
text = replace_once(text, old, new, "Ask TPK lifestyle allowlist")
path.write_text(text)

# Site validation and Yummy-specific guardrails.
path = Path("scripts/validate-site.mjs")
text = path.read_text()
anchor = '            nuarina: { type: "Restaurant", phone: "+60122282290" }\n'
replacement = '            nuarina: { type: "Restaurant", phone: "+60122282290" },\n            yummyNyonya: { type: "Restaurant", phone: "+601111631126" }\n'
text = replace_once(text, anchor, replacement, "validate expected map")
insert_before = '          if (routeId === "nuarina") {\n'
yummy_check = '''          if (routeId === "yummyNyonya") {
            const split = page.blocks.find(block => block.type === "split");
            if (business?.address?.streetAddress !== "43G, Jalan TPK 2/8, Taman Perindustrian Kinrara" || business?.address?.postalCode !== "47180") fail(label, "Yummy Nyonya Kitchen must retain the verified No. 43G Jalan TPK 2/8 address");
            if (business?.telephone !== "+601111631126" || business?.url || business?.image || business?.openingHoursSpecification || business?.openingHours) fail(label, "Yummy Nyonya Kitchen must retain its verified phone without inferring a website, schema image or disputed hours");
            if (business?.contactPoint?.[1]?.telephone !== "+60108912102") fail(label, "Yummy Nyonya Kitchen alternate public line is missing");
            if (page.heroImage !== "https://i.imgur.com/Z5h4hmH.jpg" || split?.image !== "https://i.imgur.com/Z5h4hmH.jpg") fail(label, "Yummy Nyonya Kitchen must use the TPK Park Lifestyle contextual image until a branch photo is verified");
            if (!html.includes('href="tel:+601111631126"') || !html.includes('href="tel:+60108912102"')) fail(label, "Yummy Nyonya Kitchen public phone lines must remain visible");
            if (locale === "en" && (!html.includes("exact published hours currently differ") || !html.includes("older directories incorrectly show Jalan TPK 2/7"))) fail(label, "Yummy Nyonya Kitchen must preserve the public-source timing and address cautions");
          }
'''
text = replace_once(text, insert_before, yummy_check + insert_before, "Yummy site validation")
path.write_text(text)

# Assistant grounding regression checks.
path = Path("scripts/validate-assistant.mjs")
text = path.read_text()
anchor = '    assert.deepEqual(sourceLinks(["nuarina"], locale).map(source => source.url), [routePath(locale, "nuarina")]);\n'
addition = '''    assert.match(sources.yummyNyonya.texts[locale], /43G, Jalan TPK 2\\/8/);
    assert.match(sources.yummyNyonya.texts[locale], /\\+60 11 1163 1126/);
    assert.match(sources.yummyNyonya.texts[locale], /Yummy Nyonya Kitchen/);
    assert.deepEqual(sourceLinks(["yummyNyonya"], locale).map(source => source.url), [routePath(locale, "yummyNyonya")]);
'''
text = replace_once(text, anchor, anchor + addition, "assistant Yummy assertions")
path.write_text(text)

# Analytics regression test.
path = Path("scripts/validate-analytics.mjs")
text = path.read_text()
anchor = 'test("Nuarina menu, maps and calls stay attributable without leaking visitor data", () => {'
pos = text.find(anchor)
if pos < 0:
    raise SystemExit("Nuarina analytics test anchor missing")
test_block = '''test("Yummy Nyonya Kitchen navigation, maps and calls retain tenant attribution without private URL data", () => {
  const page = client({ saved: "detailed", locale: "en" });
  page.clickLink("/lifestyle/yummy-nyonya-kitchen/");
  page.clickLink("/zh/lifestyle/yummy-nyonya-kitchen/", ".locale-nav");
  page.clickLink("https://www.google.com/maps/search/?api=1&query=Yummy+Nyonya+Kitchen+PRIVATE123&email=private@example.com#private");
  page.clickLink("https://www.waze.com/live-map/directions/yummy-nyonya-kitchen-jalan-tpk-28-puchong?to=place.w.66584606.666108209.5814230&message=PRIVATE123");
  page.clickLink("tel:+601111631126");
  page.clickLink("tel:+60108912102");
  assert.deepEqual(page.basicSent().map(event => event.name), ["navigation_click", "language_switch", "directions_click", "directions_click", "tenant_contact_click", "tenant_contact_click"]);
  assert.deepEqual(page.basicSent().map(event => event.data.target), ["/lifestyle/yummy-nyonya-kitchen/", "zh", "about", "about", "yummy-nyonya-kitchen:phone", "yummy-nyonya-kitchen:phone-alt"]);
  assert.equal(page.sent().filter(event => event[1] === "contact_click").length, 0);
  assert.equal(page.sent().at(-1)[2].tenant, "yummy-nyonya-kitchen");
  assert.doesNotMatch(JSON.stringify([page.sent(), page.basicSent()]), /PRIVATE123|private@example.com|601111631126|60108912102|5814230/);
  page.controls.off.handlers.click();
  page.clickLink("tel:+601111631126");
  assert.equal(page.basicSent().length, 6);
});

'''
text = text[:pos] + test_block + text[pos:]
path.write_text(text)

# README counts/list/source documentation.
path = Path("README.md")
text = path.read_text()
text = text.replace("generates 41 routes for each language (123 HTML pages)", "generates 42 routes for each language (126 HTML pages)", 1)
text = text.replace("Jazmina Bistro and Nasi Lemak Daun Pisang Nuarina business guides.", "Jazmina Bistro, Nasi Lemak Daun Pisang Nuarina and Yummy Nyonya Kitchen business guides.", 1)
text = text.replace("bringing the total to 126.", "bringing the total to 129.", 1)
text = text.replace("`scripts/jazmina-bistro-profile.mjs` and `scripts/nuarina-profile.mjs`;", "`scripts/jazmina-bistro-profile.mjs`, `scripts/nuarina-profile.mjs` and `scripts/yummy-nyonya-profile.mjs`;", 1)
text = text.replace("[Jazmina Bistro guide sources](docs/jazmina-bistro-profile-sources.md) and [Nuarina guide sources](docs/nuarina-profile-sources.md).", "[Jazmina Bistro guide sources](docs/jazmina-bistro-profile-sources.md), [Nuarina guide sources](docs/nuarina-profile-sources.md) and [Yummy Nyonya Kitchen guide sources](docs/yummy-nyonya-profile-sources.md).", 1)
text = text.replace("The sitemap contains all 126 canonical pages.", "The sitemap contains all 129 canonical pages.", 1)
path.write_text(text)
