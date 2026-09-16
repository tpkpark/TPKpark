from pathlib import Path

files = {
    "scripts/forsee-lens-profile.mjs": [
        ('const lensSelector = "https://forseelens.com/lens-selector";', 'const lensSelector = "https://forseelens.com/post-listing";')
    ],
    "js/analytics.js": [
        ('{ "/contact": "contact", "/lens-selector": "lens_selector", "/myoboostplus": "myoboost_plus", "/about": "about" }', '{ "/contact": "contact", "/post-listing": "lens_selector", "/myoboostplus": "myoboost_plus", "/about": "about" }')
    ],
    "scripts/validate-analytics.mjs": [
        ('https://forseelens.com/lens-selector?name=PRIVATE123', 'https://forseelens.com/post-listing?name=PRIVATE123')
    ],
    "docs/forsee-lens-profile-sources.md": [
        ('- Official website: `https://forseelens.com/`.', '- Official website: `https://forseelens.com/`.\n- The current site’s **Lens Selector** navigation resolves to `https://forseelens.com/post-listing`; this route is used rather than the more intuitive but non-current `/lens-selector` path.')
    ]
}

for filename, replacements in files.items():
    p = Path(filename)
    s = p.read_text()
    for old, new in replacements:
        if s.count(old) != 1:
            raise SystemExit(f"{filename}: expected one occurrence of {old!r}, found {s.count(old)}")
        s = s.replace(old, new, 1)
    p.write_text(s)
