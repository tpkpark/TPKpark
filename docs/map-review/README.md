# Interactive directory map — draft review, 7 October 2026

## Status and release gate

This is a **street-orientation prototype**, not the complete Phase 1 pin map. All 34 canonical businesses and one separate DRT POI are accounted for. Exact reusable coordinates are missing for all 35, so no business pins are plotted. Selecting a business highlights its recorded street, explicitly labelled as street-level orientation. Do not merge/publish as the completed interactive business map.

Update 7 October: the existing TPK Ops Hub architectural-plan archive and address-to-bay register have now been recovered; no fresh plan upload is needed. The 29-shoplot / 58-floor mapping is available. Geographic alignment and current entrance positions remain to be established. A screenshot copied from Google Maps is not a substitute for reusable source geometry. No new GBP edits or Maps suggestions were made.

The original detailed brief remains authoritative: `TPK_Park_Interactive_Map_Work_Mode_Prompt.md` (7 October). The acceptance gates for exact pins, collisions and precise POI placement remain open. Phase 2 illustrated layout is deferred.

## Architecture and design

The existing generated static EN/MS/ZH directory is extended, not replaced by a new framework. `scripts/park-map.mjs` joins location state to existing business IDs and profiles; DRT is a separate POI. A search/list view works without loading a renderer. Map code and the local GeoJSON load only when requested. Existing business guides gain a link to their directory selection. Fragment identifiers preserve selection across language switches, sharing and browser history, without creating new canonical routes. No search text is sent to analytics.

Leaflet 1.9.4 (BSD-2-Clause, vendored with licence) is adequate for this small local vector extent and works without WebGL. MapLibre is capable but would add WebGL/style infrastructure without a demonstrated requirement here. There is no remote basemap or geocoder, no provider key, and no tile service dependency. The preview's quiet road/building context is a finite geographic extract, not a schematic, survey, navigation route or ownership boundary. Building coverage is incomplete and does not establish occupants. No live transport fare/hours/operator claims.

## Data and licensing

`assets/map/context.geojson` contains OSM road geometry and available building context acquired via Overpass on 7 October 2026. OSM way IDs are retained. Names of unrelated background businesses are omitted. This map database is distributed under ODbL 1.0, including any adaptations of that database. Visible OpenStreetMap attribution and a download link are provided. The first-party directory remains separate; Google/Waze URLs are outbound links only and have not been mined for coordinates. No ratings, reviews, Google photos or tiles are copied.

Source query: `[out:json][timeout:25];(way[highway](3.042,101.631,3.055,101.642);nwr[name](3.043,101.632,3.054,101.641););out geom;` at https://overpass-api.de/api/interpreter. Only relevant road/building geometry was retained. A subsequent query for fuller building coverage timed out; no completeness claim is made. Source geometry is older community-contributed mapping; roads must be visually checked with management before production. Selection does not infer legal access, turn restrictions, safe crossings or walking times.

Official sources checked during this task:
- https://www.openstreetmap.org/copyright
- https://opendatacommons.org/licenses/odbl/1-0/
- https://operations.osmfoundation.org/policies/tiles/
- https://leafletjs.com/
- https://maplibre.org/maplibre-gl-js/docs/

## Operating cost

Map-provider bill: **US$0 for 1,000 or 10,000 map openings/month** for this self-served finite dataset; there are no metered provider API calls. Existing Vercel bandwidth/build usage still applies and is not claimed free. Approximate uncompressed transfer per first opening is the sum of the local GeoJSON, Leaflet JS/CSS and map renderer; browser/CDN compression and cache reuse reduce actual transfer. No paid plan, permission or DNS change was introduced. Do not replace this with public OSM tile prefetching.

## Location register and maintenance

Generate the current register with:

`node --input-type=module -e "import {site} from './scripts/site-data.mjs'; import {mapEntries,transportEntry} from './scripts/park-map.mjs'; console.log(JSON.stringify([...mapEntries(site.en),transportEntry('en')],null,2));"`

1. Edit the canonical business profile/cluster membership to add, move, hide or retire a business. No second list should be edited in the browser code.
2. Record provenance, date, permission/licence, precision, point type, floor and stable premises ID before adding a coordinate. Null coordinates mean unlocated, never park-centre placeholders. Presence verification and coordinate verification are distinct.
3. Add approved coordinates via `locationOverrides` only after completing the marker renderer, shared-premises selection and their tests. The current prototype intentionally does not plot overrides; that is a remaining implementation gate, not a supported maintenance operation yet.
4. Keep adjoining-unit and shared-building relationships explicit. Jon Detailing/Forsee, Lavino/Total Tools and multi-floor shops need premises review. Do not displace pins for appearance.
5. DRT is in front of Jazmina Bistro at No. 23, not inside the restaurant. Its exact pickup coordinate still needs confirmation. Preserve the current address fallback for Fadzil and preferred 39G KBO destination.
6. Run `npm run build`, `npm run test:map` and existing validators. Compare legacy diagnostics to base `0ff9ecde4abf19b4b69d1b88eb1972afb3d511a7`.

## Rollback and deployment

Isolated branch `codex/tpk-interactive-map`; draft PR only. Owner-confirmed hosting rule (7 October 2026): only tristar.tpkpark.com is hosted under Lawrence’s Vercel account. tpkpark.com and every other subdomain are hosted under Shung Yen’s Vercel account. An older GitHub commit status links to `lawrencew7729-4682s-projects/tpkpark-site`; treat that as historical, not current hosting authority. The connector currently exposes only the study workspace and content portal and rejects access to tpkpark-site. Confirm the current project/domain linkage under Shung Yen before deploying. A branch push may trigger existing preview integrations; none are production release authority. No production merge/deploy is authorised by this draft. Rollback after a later approved release: revert the map PR through the same review pipeline, or restore the preceding production deployment with authorised Vercel access. No database migration or DNS reversal is needed.

## QA evidence

- Production build passed.
- 8 map tests and 44 analytics tests passed.
- Legacy site validation: 104 diagnostics on both untouched base and feature; no new diagnostics. Failures include earlier metadata/contact/sitemap assumptions. Full `npm test` therefore remains red and is not represented as passing.
- Chromium 153, Linux headless: lazy loading, alias search, category/count sync, transport toggle, empty state, selection/detail, language links, Fadzil address fallback, browser back/forward, invalid IDs, EN/MS/ZH interaction, JavaScript-disabled list and map-data failure fallback passed with no page errors.
- Viewports 360×800, 390×844, 768×1024, 844×390 and 1440×1000: no horizontal overflow. Road-label collision suppression was added after visual review.
- Screenshots: [desktop](desktop.png), [mobile](mobile.png). Test environment lacks Chinese fonts; Chinese text/state was checked, but Chinese typography on a real device remains a visual release check. Physical Android, Safari and a complete WCAG audit were not performed.
- Full result: [browser-qa.json](browser-qa.json).
- GitHub/Vercel reports the draft branch build Ready. The hosted preview redirects to Vercel sign-in, so this session's interaction verification used the local build. Hosted rendered interactions remain unverified.
- Map-only initial raw transfer is approximately 237 KB (geometry + Leaflet + renderer/CSS), roughly 237 MB at 1,000 cold openings and 2.37 GB at 10,000 before compression and caching, excluding the rest of the page. Verify actual compressed bytes after deployment; this is a bandwidth estimate, not a bill.


## Architectural source recovery — 7 October 2026

Recovered all three management-held architectural PDFs, five pages each, and checked the site-plan and ground-floor sheets visually against the current Ops Hub `04 Leasable Area Master` address/block/bay/floor fields. Block A contains 12 bays at odd addresses 1–23; B contains 9 bays at 25–41; C contains 8 bays at 43–57. The current register contains all 58 ground/first-floor records with High address-to-bay confidence. This confidence is about the mapping, not surveyed latitude/longitude.

The detailed drawings abbreviate repeated typical bays with drawing breaks. Never treat the displayed compressed span as the complete physical width. The full site plan preserves the block sequence and Block C bend. Private originals, full database rows, legal tenant names and commercial terms are not copied into this public repository.

`scripts/shop-premises.mjs` records the 29 premises and a visitor-facing subset matching 19 existing featured businesses to their known block/unit/floor. The map details now display this block/floor information. Shared premises remain separate occupants; adjoining premises do not increase business counts. Geographic coordinates remain null pending alignment; these records enable a plan-based layout without invented GPS points.

Examples: MOTD at 1G/3G; V Haus at 1-1/3-1/5G/5-1; BAAGUS at 7G; Signature at 9G; MK Curtain at 11G and Aces at 11-1; Jazmina at 23G and KLOT at 23-1; Premio at 25G and Balens at 25-1; preferred KBO destination at 39G; Nuarina at 41G; Yummy Nyonya at 43G and Fagolli at 43-1; DC Moto at 49G.

Forsee's current visitor address requires owner reconciliation between the public directory and internal record; it has intentionally not been moved. DRT's frontage relationship to Jazmina at Block A No.23 is established, but no exact pickup coordinate is claimed.

Next geographic task: georeference the full site plan against reusable road control points and distinguish plan-derived approximate building positions from field-verified entrances. Do not export the technical source drawings as the public map.
