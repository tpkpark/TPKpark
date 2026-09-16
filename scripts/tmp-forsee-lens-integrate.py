from pathlib import Path
import re


def replace_once(text, old, new, label):
    if text.count(old) != 1:
        raise SystemExit(f"{label}: expected one target, found {text.count(old)}")
    return text.replace(old, new, 1)


# Site data: import, route, SEO, modified date, directory links and locale page maps.
p = Path("scripts/site-data.mjs")
s = p.read_text()
anchor = 'import { acesGymnasticAcademyProfiles } from "./aces-gymnastic-academy-profile.mjs";\n'
s = replace_once(s, anchor, anchor + 'import { forseeLensProfiles } from "./forsee-lens-profile.mjs";\n', "site import")
anchor = '  acesGymnasticAcademy: "lifestyle/aces-gymnastic-academy",\n'
s = replace_once(s, anchor, anchor + '  forseeLens: "lifestyle/forsee-lens",\n', "route")

seo_pairs = [
    ('    acesGymnasticAcademy: "Aces Gymnastic Academy Puchong | Gymnastics | TPK Park",\n', '    forseeLens: "Forsee Lens Puchong | Ophthalmic Lens Lab | TPK Park",\n'),
    ('    acesGymnasticAcademy: "Aces Gymnastic Academy Puchong | Gymnastics | TPK Park",\n', '    forseeLens: "Forsee Lens Puchong | Makmal Kanta Oftalmik | TPK Park",\n'),
    ('    acesGymnasticAcademy: "Aces Gymnastic Academy蒲种金銮 | 体操训练 | TPK Park",\n', '    forseeLens: "Forsee Lens蒲种金銮 | 眼镜镜片技术与生产 | TPK Park",\n')
]
# The EN and BM Aces titles are identical, so insert after the first and second occurrences separately.
common = seo_pairs[0][0]
if s.count(common) != 2:
    raise SystemExit(f"expected 2 EN/BM Aces SEO anchors, found {s.count(common)}")
pos = s.find(common)
s = s[:pos + len(common)] + seo_pairs[0][1] + s[pos + len(common):]
pos = s.find(common, pos + len(common) + len(seo_pairs[0][1]))
s = s[:pos + len(common)] + seo_pairs[1][1] + s[pos + len(common):]
zh_old, zh_new = seo_pairs[2]
s = replace_once(s, zh_old, zh_old + zh_new, "ZH SEO")

anchor = '  acesGymnasticAcademy: "2026-09-16",\n'
s = replace_once(s, anchor, anchor + '  forseeLens: "2026-09-16",\n', "last modified")

s, count = re.subn(r'(\["[^"]+", "Forsee Lens")\]', r'\1, "forseeLens"]', s)
if count != 3:
    raise SystemExit(f"expected 3 Forsee Lens directory entries, updated {count}")

for locale in ("en", "ms", "zh"):
    anchor = f"acesGymnasticAcademy: acesGymnasticAcademyProfiles.{locale},"
    s = replace_once(s, anchor, anchor + f" forseeLens: forseeLensProfiles.{locale},", f"{locale} page map")
p.write_text(s)

# Analytics: route allowlist, contact attribution and bounded Forsee outbound destinations.
p = Path("js/analytics.js")
s = p.read_text()
old = r"lifestyle(?:\/(?:motd|jazmina-bistro|nasi-lemak-nuarina|yummy-nyonya-kitchen|optimum-swim-school|aces-gymnastic-academy))?"
new = r"lifestyle(?:\/(?:motd|jazmina-bistro|nasi-lemak-nuarina|yummy-nyonya-kitchen|optimum-swim-school|aces-gymnastic-academy|forsee-lens))?"
s = replace_once(s, old, new, "analytics route allowlist")
anchor = '    if (href === "tel:+60103658213") return click("tenant_contact_click", { contact_method: "phone", tenant: "aces-gymnastic-academy" }, "aces-gymnastic-academy:phone");\n'
addition = (
    '    if (href === "tel:+60378000373") return click("tenant_contact_click", { contact_method: "phone", tenant: "forsee-lens" }, "forsee-lens:phone");\n'
    '    if (/^mailto:cs_forsee@forsee\\.com\\.my(?:[?#]|$)/i.test(href)) return click("tenant_contact_click", { contact_method: "email", tenant: "forsee-lens" }, "forsee-lens:email");\n'
)
s = replace_once(s, anchor, anchor + addition, "Forsee direct contacts")

anchor = '      } else if (url.hostname === "wa.me" && /^\\/601154078187\\/?$/.test(url.pathname)) {\n        click("tenant_contact_click", { contact_method: "whatsapp", tenant: "fagolli" }, "fagolli:whatsapp");\n'
addition = '      } else if (url.hostname === "wa.me" && /^\\/60162057917\\/?$/.test(url.pathname)) {\n        click("tenant_contact_click", { contact_method: "whatsapp", tenant: "forsee-lens" }, "forsee-lens:whatsapp");\n'
s = replace_once(s, anchor, anchor + addition, "Forsee WhatsApp analytics")

anchor = '      } else if (["www.instagram.com", "instagram.com"].includes(url.hostname) && /^\\/chooseinterior\\.cid\\/?$/.test(url.pathname)) {\n'
forsee = '''      } else if (["www.forseelens.com", "forseelens.com"].includes(url.hostname)) {
        const path = url.pathname.replace(/\\/$/, "") || "/";
        const destination = { "/contact": "contact", "/lens-selector": "lens_selector", "/myoboostplus": "myoboost_plus", "/about": "about" }[path] || "website";
        click("outbound_click", { link_domain: "forseelens.com" }, "forsee-lens:" + destination);
'''
s = replace_once(s, anchor, forsee + anchor, "Forsee outbound analytics")
p.write_text(s)

# Ask TPK route allowlist.
p = Path("js/ask-tpk.js")
s = p.read_text()
old = r"(?:motd|jazmina-bistro|nasi-lemak-nuarina|yummy-nyonya-kitchen|optimum-swim-school|aces-gymnastic-academy)"
new = r"(?:motd|jazmina-bistro|nasi-lemak-nuarina|yummy-nyonya-kitchen|optimum-swim-school|aces-gymnastic-academy|forsee-lens)"
s = replace_once(s, old, new, "Ask TPK lifestyle allowlist")
p.write_text(s)

# Site validation and Forsee-specific guardrails.
p = Path("scripts/validate-site.mjs")
s = p.read_text()
anchor = '            acesGymnasticAcademy: { type: "SportsActivityLocation", url: "https://www.facebook.com/Acesgymnasticacademy", phone: "+60103658213" }\n'
replacement = '            acesGymnasticAcademy: { type: "SportsActivityLocation", url: "https://www.facebook.com/Acesgymnasticacademy", phone: "+60103658213" },\n            forseeLens: { type: "LocalBusiness", url: "https://forseelens.com/", phone: "+60378000373" }\n'
s = replace_once(s, anchor, replacement, "validate expected map")
insert_before = '          if (routeId === "acesGymnasticAcademy") {\n'
check = '''          if (routeId === "forseeLens") {
            const split = page.blocks.find(block => block.type === "split");
            if (business?.address?.streetAddress !== "71, Jalan TPK 2/8, Taman Perindustrian Kinrara" || business?.address?.postalCode !== "47180") fail(label, "Forsee Lens must retain the verified No. 71 Jalan TPK 2/8 address");
            if (business?.telephone !== "+60378000373" || business?.email !== "cs_forsee@forsee.com.my" || business?.parentOrganization?.name !== "Eyepoint Technology Sdn Bhd") fail(label, "Forsee Lens must retain its official contact identity and Eyepoint Technology relationship");
            if (business?.image || business?.openingHoursSpecification || business?.openingHours) fail(label, "Forsee Lens must not infer a premises image or unpublished opening hours");
            if (business?.contactPoint?.[1]?.telephone !== "+60162057917" || business?.contactPoint?.[1]?.url !== "https://wa.me/60162057917") fail(label, "Forsee Lens must retain its official WhatsApp contact");
            if (page.heroImage !== "https://i.imgur.com/Z5h4hmH.jpg" || split?.image !== "https://i.imgur.com/Z5h4hmH.jpg") fail(label, "Forsee Lens must keep the TPK Park Lifestyle image explicitly contextual until a verified branch photograph is available");
            if (!html.includes('href="tel:+60378000373"') || !html.includes('href="mailto:cs_forsee@forsee.com.my"') || !html.includes('href="https://wa.me/60162057917"') || !html.includes('href="https://forseelens.com/"')) fail(label, "Forsee Lens public contacts and official website must remain visible");
            const hoursCaution = { en: "Not published on the current official site", ms: "Tidak diterbitkan pada laman rasmi semasa", zh: "现行官网没有公布固定时段" }[locale];
            if (!html.includes(hoursCaution)) fail(label, "Forsee Lens must preserve the opening-hours caution");
          }
'''
s = replace_once(s, insert_before, check + insert_before, "Forsee site validation")
p.write_text(s)

# Assistant grounding checks.
p = Path("scripts/validate-assistant.mjs")
s = p.read_text()
anchor = '    assert.deepEqual(sourceLinks(["acesGymnasticAcademy"], locale).map(source => source.url), [routePath(locale, "acesGymnasticAcademy")]);\n'
addition = '''    assert.match(sources.forseeLens.texts[locale], /71, Jalan TPK 2\\/8/);
    assert.match(sources.forseeLens.texts[locale], /\\+60 3 7800 0373/);
    assert.match(sources.forseeLens.texts[locale], /Forsee Lens/);
    assert.deepEqual(sourceLinks(["forseeLens"], locale).map(source => source.url), [routePath(locale, "forseeLens")]);
'''
s = replace_once(s, anchor, anchor + addition, "assistant Forsee assertions")
p.write_text(s)

# Analytics regression test.
p = Path("scripts/validate-analytics.mjs")
s = p.read_text()
anchor = 'test("Aces Gymnastic Academy maps, Facebook and calls retain tenant attribution without private data", () => {'
pos = s.find(anchor)
if pos < 0:
    raise SystemExit("Aces analytics test anchor missing")
test_block = '''test("Forsee Lens website, directions and contacts retain tenant attribution without private data", () => {
  const page = client({ saved: "detailed", locale: "en" });
  page.clickLink("/lifestyle/forsee-lens/");
  page.clickLink("/zh/lifestyle/forsee-lens/", ".locale-nav");
  page.clickLink("https://forseelens.com/?email=private@example.com#private");
  page.clickLink("https://forseelens.com/lens-selector?name=PRIVATE123");
  page.clickLink("https://forseelens.com/myoboostplus?name=PRIVATE123");
  page.clickLink("https://www.google.com/maps/search/?api=1&query=Forsee+PRIVATE123");
  page.clickLink("tel:+60378000373");
  page.clickLink("mailto:cs_forsee@forsee.com.my?subject=PRIVATE123");
  page.clickLink("https://wa.me/60162057917?text=PRIVATE123");
  assert.deepEqual(page.basicSent().map(event => event.name), ["navigation_click", "language_switch", "outbound_click", "outbound_click", "outbound_click", "directions_click", "tenant_contact_click", "tenant_contact_click", "tenant_contact_click"]);
  assert.deepEqual(page.basicSent().slice(2, 5).map(event => event.data.target), ["forsee-lens:website", "forsee-lens:lens_selector", "forsee-lens:myoboost_plus"]);
  assert.equal(page.basicSent().at(-3).data.target, "forsee-lens:phone");
  assert.equal(page.basicSent().at(-2).data.target, "forsee-lens:email");
  assert.equal(page.basicSent().at(-1).data.target, "forsee-lens:whatsapp");
  assert.equal(page.sent().filter(event => event[1] === "contact_click").length, 0);
  assert.doesNotMatch(JSON.stringify([page.sent(), page.basicSent()]), /PRIVATE123|private@example.com|60378000373|60162057917|cs_forsee/);
  page.controls.off.handlers.click();
  page.clickLink("tel:+60378000373");
  assert.equal(page.basicSent().length, 9);
});

'''
s = s[:pos] + test_block + s[pos:]
p.write_text(s)

# README counts, guide lists and source documentation.
p = Path("README.md")
s = p.read_text()
s = s.replace("generates 44 routes for each language (132 HTML pages)", "generates 45 routes for each language (135 HTML pages)", 1)
s = s.replace("Optimum Swim School and Aces Gymnastic Academy business guides.", "Optimum Swim School, Aces Gymnastic Academy and Forsee Lens business guides.", 1)
s = s.replace("bringing the total to 135.", "bringing the total to 138.", 1)
s = s.replace("`scripts/optimum-swim-school-profile.mjs` and `scripts/aces-gymnastic-academy-profile.mjs`;", "`scripts/optimum-swim-school-profile.mjs`, `scripts/aces-gymnastic-academy-profile.mjs` and `scripts/forsee-lens-profile.mjs`;", 1)
s = s.replace("[Optimum Swim School guide sources](docs/optimum-swim-school-profile-sources.md) and [Aces Gymnastic Academy guide sources](docs/aces-gymnastic-academy-profile-sources.md).", "[Optimum Swim School guide sources](docs/optimum-swim-school-profile-sources.md), [Aces Gymnastic Academy guide sources](docs/aces-gymnastic-academy-profile-sources.md) and [Forsee Lens guide sources](docs/forsee-lens-profile-sources.md).", 1)
s = s.replace("The sitemap contains all 135 canonical pages.", "The sitemap contains all 138 canonical pages.", 1)
p.write_text(s)
