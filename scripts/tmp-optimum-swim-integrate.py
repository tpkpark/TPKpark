from pathlib import Path
import re


def replace_once(text, old, new, label):
    if text.count(old) != 1:
        raise SystemExit(f"{label}: expected one target, found {text.count(old)}")
    return text.replace(old, new, 1)


# Site data: import, route, SEO, modified date, directory links and locale page maps.
p = Path("scripts/site-data.mjs")
s = p.read_text()
anchor = 'import { yummyNyonyaProfiles } from "./yummy-nyonya-profile.mjs";\n'
s = replace_once(s, anchor, anchor + 'import { optimumSwimSchoolProfiles } from "./optimum-swim-school-profile.mjs";\n', "site import")
anchor = '  yummyNyonya: "lifestyle/yummy-nyonya-kitchen",\n'
s = replace_once(s, anchor, anchor + '  optimumSwimSchool: "lifestyle/optimum-swim-school",\n', "route")
common = '    yummyNyonya: "Yummy Nyonya Kitchen Puchong Kinrara | TPK Park",\n'
if s.count(common) != 2:
    raise SystemExit(f"expected two EN/BM Yummy SEO lines, found {s.count(common)}")
s = s.replace(common, common + '    optimumSwimSchool: "Optimum Swim School Puchong Kinrara | TPK Park",\n', 2)
zh = '    yummyNyonya: "Yummy Nyonya Kitchen蒲种金銮 | TPK Park",\n'
s = replace_once(s, zh, zh + '    optimumSwimSchool: "Optimum Swim School蒲种金銮 | 室内恒温泳池 | TPK Park",\n', "ZH SEO")
anchor = '  yummyNyonya: "2026-09-16",\n'
s = replace_once(s, anchor, anchor + '  optimumSwimSchool: "2026-09-16",\n', "last modified")
s, count = re.subn(r'(\["[^"]+", "Optimum Swim School")\]', r'\1, "optimumSwimSchool"]', s)
if count != 3:
    raise SystemExit(f"expected 3 Optimum directory entries, updated {count}")
for locale in ("en", "ms", "zh"):
    anchor = f"yummyNyonya: yummyNyonyaProfiles.{locale},"
    s = replace_once(s, anchor, anchor + f" optimumSwimSchool: optimumSwimSchoolProfiles.{locale},", f"{locale} page map")
p.write_text(s)

# Analytics: route allowlist, branch calls and bounded outbound destinations.
p = Path("js/analytics.js")
s = p.read_text()
old = r"lifestyle(?:\/(?:motd|jazmina-bistro|nasi-lemak-nuarina|yummy-nyonya-kitchen))?"
new = r"lifestyle(?:\/(?:motd|jazmina-bistro|nasi-lemak-nuarina|yummy-nyonya-kitchen|optimum-swim-school))?"
s = replace_once(s, old, new, "analytics route allowlist")
anchor = '    if (href === "tel:+60108912102") return click("tenant_contact_click", { contact_method: "phone", tenant: "yummy-nyonya-kitchen" }, "yummy-nyonya-kitchen:phone-alt");\n'
addition = (
    '    if (href === "tel:+60192848138") return click("tenant_contact_click", { contact_method: "phone", tenant: "optimum-swim-school" }, "optimum-swim-school:phone");\n'
    '    if (href === "tel:+60134808138") return click("tenant_contact_click", { contact_method: "phone", tenant: "optimum-swim-school" }, "optimum-swim-school:phone-alt");\n'
)
s = replace_once(s, anchor, anchor + addition, "Optimum phone analytics")
anchor = '''      } else if (["www.motdgroup.com", "motdgroup.com"].includes(url.hostname)) {
        const path = url.pathname.replace(/^\\/zh(?=\\/|$)/, "").replace(/\\/$/, "") || "/";
        const destination = { "/": "home", "/menu": "menu", "/live-house": "live_music", "/contact-us": "visit" }[path] || "website";
        click("outbound_click", { link_domain: "www.motdgroup.com" }, "motd:" + destination);
'''
if anchor not in s:
    raise SystemExit("MOTD analytics anchor missing")
optimum = '''      } else if (["www.optimumswimschool.com", "optimumswimschool.com"].includes(url.hostname)) {
        const path = url.pathname.replace(/\\/$/, "") || "/";
        const destination = { "/free-trial": "free_trial", "/learn-to-swim": "learn_to_swim", "/water-lifesaving": "lifesaving", "/our-branches": "branches" }[path] || "website";
        click("outbound_click", { link_domain: "optimumswimschool.com" }, "optimum-swim-school:" + destination);
'''
s = s.replace(anchor, anchor + optimum, 1)
p.write_text(s)

# Ask TPK source path allowlist.
p = Path("js/ask-tpk.js")
s = p.read_text()
old = r"(?:motd|jazmina-bistro|nasi-lemak-nuarina|yummy-nyonya-kitchen)"
new = r"(?:motd|jazmina-bistro|nasi-lemak-nuarina|yummy-nyonya-kitchen|optimum-swim-school)"
s = replace_once(s, old, new, "Ask TPK lifestyle allowlist")
p.write_text(s)

# Site validation and branch guardrails.
p = Path("scripts/validate-site.mjs")
s = p.read_text()
anchor = '            yummyNyonya: { type: "Restaurant", phone: "+601111631126" }\n'
replacement = '            yummyNyonya: { type: "Restaurant", phone: "+601111631126" },\n            optimumSwimSchool: { type: "SportsActivityLocation", url: "https://optimumswimschool.com/", phone: "+60192848138" }\n'
s = replace_once(s, anchor, replacement, "validate expected map")
insert_before = '          if (routeId === "yummyNyonya") {\n'
check = '''          if (routeId === "optimumSwimSchool") {
            const split = page.blocks.find(block => block.type === "split");
            const hours = business?.openingHoursSpecification;
            const weekdays = ["Tuesday", "Wednesday", "Thursday", "Friday"];
            const weekend = ["Saturday", "Sunday"];
            if (business?.address?.streetAddress !== "2, Jalan TPK 2/2, Taman Perindustrian Kinrara" || business?.address?.postalCode !== "47100") fail(label, "Optimum Swim School must retain its official Puchong Kinrara address");
            if (business?.telephone !== "+60192848138" || business?.contactPoint?.[1]?.telephone !== "+60134808138") fail(label, "Optimum Swim School must retain both official Puchong Kinrara branch lines");
            if (hours?.length !== 2 || hours[0]?.opens !== "16:00" || hours[0]?.closes !== "21:00" || hours[0]?.dayOfWeek?.length !== 4 || weekdays.some(day => !hours[0]?.dayOfWeek?.includes(day)) || hours[1]?.opens !== "08:00" || hours[1]?.closes !== "19:00" || hours[1]?.dayOfWeek?.length !== 2 || weekend.some(day => !hours[1]?.dayOfWeek?.includes(day))) fail(label, "Optimum Swim School must preserve the current official Puchong operating hours");
            if (business?.image !== `${origin}/assets/images/optimum-swim-school-puchong-kinrara.webp` || page.heroImage !== business.image || split?.image !== business.image) fail(label, "Optimum Swim School must use the verified official Puchong Kinrara branch photograph");
            if (business?.hasMap !== "https://www.waze.com/live-map/directions/my/selangor/puchong/optimum-swim-school-%40-puchong-kinrara-%28learn-to-swim-for-kids-and-adults%29?to=place.ChIJ1XiPLEdLzDER-U3WYmrZsdI") fail(label, "Optimum Swim School must retain the named Puchong Kinrara Waze destination");
            if (!html.includes('href="https://optimumswimschool.com/free-trial/"') || !html.includes('href="tel:+60192848138"') || !html.includes('href="tel:+60134808138"')) fail(label, "Optimum Swim School trial and branch contacts must remain visible");
            const closed = { en: "Closed", ms: "Tutup", zh: "休息" }[locale];
            if (!html.includes(closed)) fail(label, "Optimum Swim School Monday closure must remain visible");
          }
'''
s = replace_once(s, insert_before, check + insert_before, "Optimum site validation")
p.write_text(s)

# Assistant grounding checks.
p = Path("scripts/validate-assistant.mjs")
s = p.read_text()
anchor = '    assert.deepEqual(sourceLinks(["yummyNyonya"], locale).map(source => source.url), [routePath(locale, "yummyNyonya")]);\n'
addition = '''    assert.match(sources.optimumSwimSchool.texts[locale], /2, Jalan TPK 2\\/2/);
    assert.match(sources.optimumSwimSchool.texts[locale], /\\+60 19 284 8138/);
    assert.match(sources.optimumSwimSchool.texts[locale], /Optimum Swim School/);
    assert.deepEqual(sourceLinks(["optimumSwimSchool"], locale).map(source => source.url), [routePath(locale, "optimumSwimSchool")]);
'''
s = replace_once(s, anchor, anchor + addition, "assistant Optimum assertions")
p.write_text(s)

# Analytics regression test.
p = Path("scripts/validate-analytics.mjs")
s = p.read_text()
anchor = 'test("Yummy Nyonya Kitchen navigation, maps and calls retain tenant attribution without private URL data", () => {'
pos = s.find(anchor)
if pos < 0:
    raise SystemExit("Yummy analytics test anchor missing")
test_block = '''test("Optimum Swim School programme, directions and branch contacts remain attributable without private data", () => {
  const page = client({ saved: "detailed", locale: "en" });
  page.clickLink("/lifestyle/optimum-swim-school/");
  page.clickLink("/zh/lifestyle/optimum-swim-school/", ".locale-nav");
  page.clickLink("https://optimumswimschool.com/?email=private@example.com#private");
  page.clickLink("https://optimumswimschool.com/free-trial/?student=PRIVATE123");
  page.clickLink("https://optimumswimschool.com/learn-to-swim/?student=PRIVATE123");
  page.clickLink("https://www.google.com/maps/search/?api=1&query=Optimum+PRIVATE123");
  page.clickLink("https://www.waze.com/live-map/directions/my/selangor/puchong/optimum-swim-school-%40-puchong-kinrara-%28learn-to-swim-for-kids-and-adults%29?to=place.ChIJ1XiPLEdLzDER-U3WYmrZsdI&message=PRIVATE123");
  page.clickLink("tel:+60192848138");
  page.clickLink("tel:+60134808138");
  assert.deepEqual(page.basicSent().map(event => event.name), ["navigation_click", "language_switch", "outbound_click", "outbound_click", "outbound_click", "directions_click", "directions_click", "tenant_contact_click", "tenant_contact_click"]);
  assert.deepEqual(page.basicSent().slice(2, 5).map(event => event.data.target), ["optimum-swim-school:website", "optimum-swim-school:free_trial", "optimum-swim-school:learn_to_swim"]);
  assert.equal(page.basicSent().at(-2).data.target, "optimum-swim-school:phone");
  assert.equal(page.basicSent().at(-1).data.target, "optimum-swim-school:phone-alt");
  assert.equal(page.sent().filter(event => event[1] === "contact_click").length, 0);
  assert.doesNotMatch(JSON.stringify([page.sent(), page.basicSent()]), /PRIVATE123|private@example.com|60192848138|60134808138|ChIJ/);
  page.controls.off.handlers.click();
  page.clickLink("tel:+60192848138");
  assert.equal(page.basicSent().length, 9);
});

'''
s = s[:pos] + test_block + s[pos:]
p.write_text(s)

# README counts, guide lists and source documentation.
p = Path("README.md")
s = p.read_text()
s = s.replace("generates 42 routes for each language (126 HTML pages)", "generates 43 routes for each language (129 HTML pages)", 1)
s = s.replace("Yummy Nyonya Kitchen business guides.", "Yummy Nyonya Kitchen and Optimum Swim School business guides.", 1)
s = s.replace("bringing the total to 129.", "bringing the total to 132.", 1)
s = s.replace("`scripts/nuarina-profile.mjs` and `scripts/yummy-nyonya-profile.mjs`;", "`scripts/nuarina-profile.mjs`, `scripts/yummy-nyonya-profile.mjs` and `scripts/optimum-swim-school-profile.mjs`;", 1)
s = s.replace("[Nuarina guide sources](docs/nuarina-profile-sources.md) and [Yummy Nyonya Kitchen guide sources](docs/yummy-nyonya-profile-sources.md).", "[Nuarina guide sources](docs/nuarina-profile-sources.md), [Yummy Nyonya Kitchen guide sources](docs/yummy-nyonya-profile-sources.md) and [Optimum Swim School guide sources](docs/optimum-swim-school-profile-sources.md).", 1)
s = s.replace("The sitemap contains all 129 canonical pages.", "The sitemap contains all 132 canonical pages.", 1)
p.write_text(s)
