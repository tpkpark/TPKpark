from pathlib import Path
import re


def replace_once(text, old, new, label):
    if text.count(old) != 1:
        raise SystemExit(f"{label}: expected one target, found {text.count(old)}")
    return text.replace(old, new, 1)


# Site data: import, route, SEO, modified date, directory links and locale page maps.
p = Path("scripts/site-data.mjs")
s = p.read_text()
anchor = 'import { forseeLensProfiles } from "./forsee-lens-profile.mjs";\n'
s = replace_once(s, anchor, anchor + 'import { speedmart99Profiles } from "./99-speedmart-profile.mjs";\n', "site import")
anchor = '  forseeLens: "lifestyle/forsee-lens",\n'
s = replace_once(s, anchor, anchor + '  speedmart99: "lifestyle/99-speedmart",\n', "route")

# EN and BM use the same Forsee title anchor.
common = '    forseeLens: "Forsee Lens Puchong | Ophthalmic Lens Lab | TPK Park",\n'
if s.count(common) != 1:
    # BM title differs in current site.
    pass
s = replace_once(s, common, common + '    speedmart99: "99 Speedmart TPK Park Puchong | Groceries & Daily Essentials",\n', "EN SEO")
bm = '    forseeLens: "Forsee Lens Puchong | Makmal Kanta Oftalmik | TPK Park",\n'
s = replace_once(s, bm, bm + '    speedmart99: "99 Speedmart TPK Park Puchong | Barangan Runcit & Harian",\n', "BM SEO")
zh = '    forseeLens: "Forsee Lens蒲种金銮 | 眼镜镜片技术与生产 | TPK Park",\n'
s = replace_once(s, zh, zh + '    speedmart99: "99 Speedmart蒲种金銮 | 杂货与日用品 | TPK Park",\n', "ZH SEO")
anchor = '  forseeLens: "2026-09-16",\n'
s = replace_once(s, anchor, anchor + '  speedmart99: "2026-09-17",\n', "last modified")

s, count = re.subn(r'(\["[^"]+", "99 Speedmart")\]', r'\1, "speedmart99"]', s)
if count != 3:
    raise SystemExit(f"expected 3 99 Speedmart directory entries, updated {count}")

for locale in ("en", "ms", "zh"):
    anchor = f"forseeLens: forseeLensProfiles.{locale},"
    s = replace_once(s, anchor, anchor + f" speedmart99: speedmart99Profiles.{locale},", f"{locale} page map")
p.write_text(s)

# Analytics: route allowlist, customer-service attribution and bounded official-site destinations.
p = Path("js/analytics.js")
s = p.read_text()
old = r"lifestyle(?:\/(?:motd|jazmina-bistro|nasi-lemak-nuarina|yummy-nyonya-kitchen|optimum-swim-school|aces-gymnastic-academy|forsee-lens))?"
new = r"lifestyle(?:\/(?:motd|jazmina-bistro|nasi-lemak-nuarina|yummy-nyonya-kitchen|optimum-swim-school|aces-gymnastic-academy|forsee-lens|99-speedmart))?"
s = replace_once(s, old, new, "analytics route allowlist")
anchor = '    if (/^mailto:cs_forsee@forsee\\.com\\.my(?:[?#]|$)/i.test(href)) return click("tenant_contact_click", { contact_method: "email", tenant: "forsee-lens" }, "forsee-lens:email");\n'
addition = (
    '    if (href === "tel:+60105000099") return click("tenant_contact_click", { contact_method: "phone", tenant: "99-speedmart" }, "99-speedmart:customer-service");\n'
    '    if (/^mailto:customer_service@99speedmart\\.com\\.my(?:[?#]|$)/i.test(href)) return click("tenant_contact_click", { contact_method: "email", tenant: "99-speedmart" }, "99-speedmart:email");\n'
)
s = replace_once(s, anchor, anchor + addition, "99 Speedmart contacts")

anchor = '      } else if (["www.forseelens.com", "forseelens.com"].includes(url.hostname)) {\n'
speedmart = '''      } else if (["www.99speedmart.com.my", "99speedmart.com.my"].includes(url.hostname)) {
        const path = url.pathname.replace(/\\/$/, "").toLowerCase() || "/";
        const destination = { "/store-locations": "store_locator", "/speedpoint": "speedpoint", "/about-us": "about" }[path] || "website";
        click("outbound_click", { link_domain: "99speedmart.com.my" }, "99-speedmart:" + destination);
'''
s = replace_once(s, anchor, speedmart + anchor, "99 Speedmart outbound analytics")
p.write_text(s)

# Ask TPK route allowlist.
p = Path("js/ask-tpk.js")
s = p.read_text()
old = r"(?:motd|jazmina-bistro|nasi-lemak-nuarina|yummy-nyonya-kitchen|optimum-swim-school|aces-gymnastic-academy|forsee-lens)"
new = r"(?:motd|jazmina-bistro|nasi-lemak-nuarina|yummy-nyonya-kitchen|optimum-swim-school|aces-gymnastic-academy|forsee-lens|99-speedmart)"
s = replace_once(s, old, new, "Ask TPK lifestyle allowlist")
p.write_text(s)

# Site validation and 99 Speedmart-specific guardrails.
p = Path("scripts/validate-site.mjs")
s = p.read_text()
anchor = '            forseeLens: { type: "LocalBusiness", url: "https://forseelens.com/", phone: "+60378000373" }\n'
replacement = '            forseeLens: { type: "LocalBusiness", url: "https://forseelens.com/", phone: "+60378000373" },\n            speedmart99: { type: "ConvenienceStore", url: "https://99speedmart.com.my/", contactUrl: "https://99speedmart.com.my/store-locations/" }\n'
s = replace_once(s, anchor, replacement, "validate expected map")
insert_before = '          if (routeId === "forseeLens") {\n'
check = '''          if (routeId === "speedmart99") {
            const split = page.blocks.find(block => block.type === "split");
            const hours = business?.openingHoursSpecification?.[0];
            const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
            if (business?.address?.streetAddress !== "19 & 21 (Ground Floor), Jalan TPK 2/8, Taman Perindustrian Kinrara, Seksyen 2" || business?.address?.postalCode !== "47150") fail(label, "99 Speedmart must retain the current outlet 3116 address and postcode");
            if (business?.telephone || business?.image) fail(label, "99 Speedmart must not present the corporate line or contextual park image as branch-specific data");
            if (business?.contactPoint?.[0]?.telephone !== "+60105000099" || business?.contactPoint?.[0]?.email !== "customer_service@99speedmart.com.my") fail(label, "99 Speedmart must retain the official customer-service contacts");
            if (hours?.opens !== "10:00" || hours?.closes !== "22:00" || hours?.dayOfWeek?.length !== 7 || days.some(day => !hours?.dayOfWeek?.includes(day))) fail(label, "99 Speedmart outlet 3116 must retain the current daily 10am-10pm branch listing");
            if (page.heroImage !== "https://i.imgur.com/Z5h4hmH.jpg" || split?.image !== "https://i.imgur.com/Z5h4hmH.jpg") fail(label, "99 Speedmart must keep the TPK Park Lifestyle image explicitly contextual until a verified outlet photograph is available");
            if (business?.hasMap !== "https://www.google.com/maps/search/?api=1&query=99+Speedmart+3116+Taman+Perindustrian+Kinrara&query_place_id=ChIJxUFi-XdLzDER3RV5RcDFcwg") fail(label, "99 Speedmart must retain the exact outlet 3116 Google Maps destination");
            if (!html.includes('href="https://99speedmart.com.my/store-locations/"') || !html.includes('href="https://99speedmart.com.my/Speedpoint/"') || !html.includes('href="tel:+60105000099"') || !html.includes('href="mailto:customer_service@99speedmart.com.my"')) fail(label, "99 Speedmart official locator, services and customer-service contacts must remain visible");
            if (html.includes('href="tel:+60333626863"')) fail(label, "99 Speedmart corporate business line must not be presented as a dedicated TPK Park branch phone");
          }
'''
s = replace_once(s, insert_before, check + insert_before, "99 Speedmart site validation")
p.write_text(s)

# Assistant grounding checks.
p = Path("scripts/validate-assistant.mjs")
s = p.read_text()
anchor = '    assert.deepEqual(sourceLinks(["forseeLens"], locale).map(source => source.url), [routePath(locale, "forseeLens")]);\n'
addition = '''    assert.match(sources.speedmart99.texts[locale], /19 & 21 .*Jalan TPK 2\\/8/);
    assert.match(sources.speedmart99.texts[locale], /3116/);
    assert.match(sources.speedmart99.texts[locale], /\\+60 10 500 0099/);
    assert.match(sources.speedmart99.texts[locale], /99 Speedmart/);
    assert.deepEqual(sourceLinks(["speedmart99"], locale).map(source => source.url), [routePath(locale, "speedmart99")]);
'''
s = replace_once(s, anchor, anchor + addition, "assistant 99 Speedmart assertions")
p.write_text(s)

# Analytics regression test.
p = Path("scripts/validate-analytics.mjs")
s = p.read_text()
anchor = 'test("Forsee Lens website, directions and contacts retain tenant attribution without private data", () => {'
pos = s.find(anchor)
if pos < 0:
    raise SystemExit("Forsee analytics test anchor missing")
test_block = '''test("99 Speedmart store locator, directions and customer service retain tenant attribution without private data", () => {
  const page = client({ saved: "detailed", locale: "en" });
  page.clickLink("/lifestyle/99-speedmart/");
  page.clickLink("/zh/lifestyle/99-speedmart/", ".locale-nav");
  page.clickLink("https://99speedmart.com.my/?email=private@example.com#private");
  page.clickLink("https://99speedmart.com.my/store-locations/?query=PRIVATE123");
  page.clickLink("https://99speedmart.com.my/Speedpoint/?account=PRIVATE123");
  page.clickLink("https://www.google.com/maps/search/?api=1&query=PRIVATE123&query_place_id=PRIVATE123");
  page.clickLink("tel:+60105000099");
  page.clickLink("mailto:customer_service@99speedmart.com.my?subject=PRIVATE123");
  assert.deepEqual(page.basicSent().map(event => event.name), ["navigation_click", "language_switch", "outbound_click", "outbound_click", "outbound_click", "directions_click", "tenant_contact_click", "tenant_contact_click"]);
  assert.deepEqual(page.basicSent().slice(2, 5).map(event => event.data.target), ["99-speedmart:website", "99-speedmart:store_locator", "99-speedmart:speedpoint"]);
  assert.equal(page.basicSent().at(-2).data.target, "99-speedmart:customer-service");
  assert.equal(page.basicSent().at(-1).data.target, "99-speedmart:email");
  assert.equal(page.sent().filter(event => event[1] === "contact_click").length, 0);
  assert.doesNotMatch(JSON.stringify([page.sent(), page.basicSent()]), /PRIVATE123|private@example.com|60105000099|customer_service/);
  page.controls.off.handlers.click();
  page.clickLink("tel:+60105000099");
  assert.equal(page.basicSent().length, 8);
});

'''
s = s[:pos] + test_block + s[pos:]
p.write_text(s)

# README counts, guide lists and source documentation.
p = Path("README.md")
s = p.read_text()
s = s.replace("generates 45 routes for each language (135 HTML pages)", "generates 46 routes for each language (138 HTML pages)", 1)
s = s.replace("Aces Gymnastic Academy and Forsee Lens business guides.", "Aces Gymnastic Academy, Forsee Lens and 99 Speedmart business guides.", 1)
s = s.replace("bringing the total to 138.", "bringing the total to 141.", 1)
s = s.replace("`scripts/aces-gymnastic-academy-profile.mjs` and `scripts/forsee-lens-profile.mjs`;", "`scripts/aces-gymnastic-academy-profile.mjs`, `scripts/forsee-lens-profile.mjs` and `scripts/99-speedmart-profile.mjs`;", 1)
s = s.replace("[Aces Gymnastic Academy guide sources](docs/aces-gymnastic-academy-profile-sources.md) and [Forsee Lens guide sources](docs/forsee-lens-profile-sources.md).", "[Aces Gymnastic Academy guide sources](docs/aces-gymnastic-academy-profile-sources.md), [Forsee Lens guide sources](docs/forsee-lens-profile-sources.md) and [99 Speedmart guide sources](docs/99-speedmart-profile-sources.md).", 1)
s = s.replace("The sitemap contains all 138 canonical pages.", "The sitemap contains all 141 canonical pages.", 1)
p.write_text(s)
