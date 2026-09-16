from pathlib import Path
import re


def replace_once(text, old, new, label):
    if text.count(old) != 1:
        raise SystemExit(f"{label}: expected one target, found {text.count(old)}")
    return text.replace(old, new, 1)


# Site data: import, route, SEO, modified date, Lifestyle directory links and locale page maps.
p = Path("scripts/site-data.mjs")
s = p.read_text()
anchor = 'import { optimumSwimSchoolProfiles } from "./optimum-swim-school-profile.mjs";\n'
s = replace_once(s, anchor, anchor + 'import { acesGymnasticAcademyProfiles } from "./aces-gymnastic-academy-profile.mjs";\n', "site import")
anchor = '  optimumSwimSchool: "lifestyle/optimum-swim-school",\n'
s = replace_once(s, anchor, anchor + '  acesGymnasticAcademy: "lifestyle/aces-gymnastic-academy",\n', "route")

common = '    optimumSwimSchool: "Optimum Swim School Puchong Kinrara | TPK Park",\n'
if s.count(common) != 2:
    raise SystemExit(f"expected two EN/BM Optimum SEO lines, found {s.count(common)}")
s = s.replace(common, common + '    acesGymnasticAcademy: "Aces Gymnastic Academy Puchong | Gymnastics | TPK Park",\n', 2)
zh = '    optimumSwimSchool: "Optimum Swim School蒲种金銮 | 室内恒温泳池 | TPK Park",\n'
s = replace_once(s, zh, zh + '    acesGymnasticAcademy: "Aces Gymnastic Academy蒲种金銮 | 体操训练 | TPK Park",\n', "ZH SEO")
anchor = '  optimumSwimSchool: "2026-09-16",\n'
s = replace_once(s, anchor, anchor + '  acesGymnasticAcademy: "2026-09-16",\n', "last modified")

s, count = re.subn(r'(\["Gymnastics", "Aces Gymnastic Academy")\]', r'\1, "acesGymnasticAcademy"]', s)
if count != 3:
    raise SystemExit(f"expected 3 Aces directory entries, updated {count}")

for locale in ("en", "ms", "zh"):
    anchor = f"optimumSwimSchool: optimumSwimSchoolProfiles.{locale},"
    s = replace_once(s, anchor, anchor + f" acesGymnasticAcademy: acesGymnasticAcademyProfiles.{locale},", f"{locale} page map")
p.write_text(s)

# Analytics: route allowlist, tenant phone attribution and official Facebook attribution.
p = Path("js/analytics.js")
s = p.read_text()
old = r"lifestyle(?:\/(?:motd|jazmina-bistro|nasi-lemak-nuarina|yummy-nyonya-kitchen|optimum-swim-school))?"
new = r"lifestyle(?:\/(?:motd|jazmina-bistro|nasi-lemak-nuarina|yummy-nyonya-kitchen|optimum-swim-school|aces-gymnastic-academy))?"
s = replace_once(s, old, new, "analytics route allowlist")
anchor = '    if (href === "tel:+60134808138") return click("tenant_contact_click", { contact_method: "phone", tenant: "optimum-swim-school" }, "optimum-swim-school:phone-alt");\n'
s = replace_once(s, anchor, anchor + '    if (href === "tel:+60103658213") return click("tenant_contact_click", { contact_method: "phone", tenant: "aces-gymnastic-academy" }, "aces-gymnastic-academy:phone");\n', "Aces phone analytics")

# Place tenant-specific Facebook handling before the generic social host branch.
anchor = '      } else if (socialHosts[url.hostname]) {\n        click("social_click", { network: socialHosts[url.hostname] }, socialHosts[url.hostname]);\n'
aces = '      } else if (["www.facebook.com", "facebook.com"].includes(url.hostname) && /^\\/Acesgymnasticacademy\\/?$/i.test(url.pathname)) {\n        click("social_click", { network: "facebook", tenant: "aces-gymnastic-academy" }, "aces-gymnastic-academy:facebook");\n'
s = replace_once(s, anchor, aces + anchor, "Aces Facebook analytics")
p.write_text(s)

# Ask TPK route allowlist.
p = Path("js/ask-tpk.js")
s = p.read_text()
old = r"(?:motd|jazmina-bistro|nasi-lemak-nuarina|yummy-nyonya-kitchen|optimum-swim-school)"
new = r"(?:motd|jazmina-bistro|nasi-lemak-nuarina|yummy-nyonya-kitchen|optimum-swim-school|aces-gymnastic-academy)"
s = replace_once(s, old, new, "Ask TPK lifestyle allowlist")
p.write_text(s)

# Site validation and Aces-specific guardrails.
p = Path("scripts/validate-site.mjs")
s = p.read_text()
anchor = '            optimumSwimSchool: { type: "SportsActivityLocation", url: "https://optimumswimschool.com/", phone: "+60192848138" }\n'
replacement = '            optimumSwimSchool: { type: "SportsActivityLocation", url: "https://optimumswimschool.com/", phone: "+60192848138" },\n            acesGymnasticAcademy: { type: "SportsActivityLocation", url: "https://www.facebook.com/Acesgymnasticacademy", phone: "+60103658213" }\n'
s = replace_once(s, anchor, replacement, "validate expected map")
insert_before = '          if (routeId === "optimumSwimSchool") {\n'
check = '''          if (routeId === "acesGymnasticAcademy") {
            const split = page.blocks.find(block => block.type === "split");
            const hours = business?.openingHoursSpecification;
            if (business?.address?.streetAddress !== "11-1, Jalan TPK 2/8, Taman Perindustrian Kinrara" || business?.address?.postalCode !== "47180") fail(label, "Aces Gymnastic Academy must retain its verified first-floor TPK Park address");
            if (business?.telephone !== "+60103658213" || business?.url !== "https://www.facebook.com/Acesgymnasticacademy" || business?.image) fail(label, "Aces must retain its public phone and Facebook page without presenting contextual park imagery as a premises photo");
            if (hours?.length !== 4 || hours[0]?.dayOfWeek?.[0] !== "Monday" || hours[0]?.opens !== "17:00" || hours[0]?.closes !== "21:00" || hours[1]?.dayOfWeek?.join(",") !== "Tuesday,Wednesday" || hours[1]?.opens !== "16:00" || hours[1]?.closes !== "20:30" || hours[2]?.dayOfWeek?.[0] !== "Saturday" || hours[2]?.opens !== "11:00" || hours[2]?.closes !== "20:00" || hours[3]?.dayOfWeek?.[0] !== "Sunday" || hours[3]?.opens !== "11:00" || hours[3]?.closes !== "18:00") fail(label, "Aces must preserve only the operating intervals published by the current public listing");
            if (page.heroImage !== "https://i.imgur.com/Z5h4hmH.jpg" || split?.image !== "https://i.imgur.com/Z5h4hmH.jpg") fail(label, "Aces must keep the TPK Park Lifestyle image explicitly contextual until a verified branch photograph is available");
            if (!html.includes('href="tel:+60103658213"') || !html.includes('href="https://www.facebook.com/Acesgymnasticacademy"')) fail(label, "Aces public phone and Facebook page must remain visible");
            const timetableCaution = { en: "does not publish Thursday or Friday hours", ms: "tidak menerbitkan waktu Khamis atau Jumaat", zh: "没有公布星期四及星期五的时段" }[locale];
            if (!html.includes(timetableCaution)) fail(label, "Aces must preserve the Thursday/Friday timetable caution");
          }
'''
s = replace_once(s, insert_before, check + insert_before, "Aces site validation")
p.write_text(s)

# Assistant grounding regression checks.
p = Path("scripts/validate-assistant.mjs")
s = p.read_text()
anchor = '    assert.deepEqual(sourceLinks(["optimumSwimSchool"], locale).map(source => source.url), [routePath(locale, "optimumSwimSchool")]);\n'
addition = '''    assert.match(sources.acesGymnasticAcademy.texts[locale], /11-1, Jalan TPK 2\\/8/);
    assert.match(sources.acesGymnasticAcademy.texts[locale], /\\+60 10 365 8213/);
    assert.match(sources.acesGymnasticAcademy.texts[locale], /Aces Gymnastic Academy/);
    assert.deepEqual(sourceLinks(["acesGymnasticAcademy"], locale).map(source => source.url), [routePath(locale, "acesGymnasticAcademy")]);
'''
s = replace_once(s, anchor, anchor + addition, "assistant Aces assertions")
p.write_text(s)

# Analytics regression test.
p = Path("scripts/validate-analytics.mjs")
s = p.read_text()
anchor = 'test("Optimum Swim School programme, directions and branch contacts remain attributable without private data", () => {'
pos = s.find(anchor)
if pos < 0:
    raise SystemExit("Optimum analytics test anchor missing")
test_block = '''test("Aces Gymnastic Academy maps, Facebook and calls retain tenant attribution without private data", () => {
  const page = client({ saved: "detailed", locale: "en" });
  page.clickLink("/lifestyle/aces-gymnastic-academy/");
  page.clickLink("/zh/lifestyle/aces-gymnastic-academy/", ".locale-nav");
  page.clickLink("https://www.google.com/maps/search/?api=1&query=Aces+PRIVATE123&query_place_id=PRIVATE123");
  page.clickLink("https://www.waze.com/live-map/directions/my/selangor/puchong/aces-gymnastics-academy?to=place.PRIVATE123&message=private@example.com");
  page.clickLink("https://www.facebook.com/Acesgymnasticacademy?ref=PRIVATE123");
  page.clickLink("tel:+60103658213");
  assert.deepEqual(page.basicSent().map(event => event.name), ["navigation_click", "language_switch", "directions_click", "directions_click", "social_click", "tenant_contact_click"]);
  assert.deepEqual(page.basicSent().map(event => event.data.target), ["/lifestyle/aces-gymnastic-academy/", "zh", "about", "about", "aces-gymnastic-academy:facebook", "aces-gymnastic-academy:phone"]);
  assert.equal(page.sent().filter(event => event[1] === "contact_click").length, 0);
  assert.doesNotMatch(JSON.stringify([page.sent(), page.basicSent()]), /PRIVATE123|private@example.com|60103658213/);
  page.controls.off.handlers.click();
  page.clickLink("tel:+60103658213");
  assert.equal(page.basicSent().length, 6);
});

'''
s = s[:pos] + test_block + s[pos:]
p.write_text(s)

# README counts, guide lists and source documentation.
p = Path("README.md")
s = p.read_text()
s = s.replace("generates 43 routes for each language (129 HTML pages)", "generates 44 routes for each language (132 HTML pages)", 1)
s = s.replace("Yummy Nyonya Kitchen and Optimum Swim School business guides.", "Yummy Nyonya Kitchen, Optimum Swim School and Aces Gymnastic Academy business guides.", 1)
s = s.replace("bringing the total to 132.", "bringing the total to 135.", 1)
s = s.replace("`scripts/yummy-nyonya-profile.mjs` and `scripts/optimum-swim-school-profile.mjs`;", "`scripts/yummy-nyonya-profile.mjs`, `scripts/optimum-swim-school-profile.mjs` and `scripts/aces-gymnastic-academy-profile.mjs`;", 1)
s = s.replace("[Yummy Nyonya Kitchen guide sources](docs/yummy-nyonya-profile-sources.md) and [Optimum Swim School guide sources](docs/optimum-swim-school-profile-sources.md).", "[Yummy Nyonya Kitchen guide sources](docs/yummy-nyonya-profile-sources.md), [Optimum Swim School guide sources](docs/optimum-swim-school-profile-sources.md) and [Aces Gymnastic Academy guide sources](docs/aces-gymnastic-academy-profile-sources.md).", 1)
s = s.replace("The sitemap contains all 132 canonical pages.", "The sitemap contains all 135 canonical pages.", 1)
p.write_text(s)
