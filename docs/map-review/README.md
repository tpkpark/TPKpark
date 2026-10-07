# Interactive directory map — draft review, 7 October 2026

## Status and release gate

This preview depicts approximate premises for **31 of 34 businesses**: 20 shoplot businesses and 11 businesses across archival building footprints. Three businesses (Jaecoo, Toyokar and Fadzil) retain street-level orientation. All 34 businesses and the separate DRT POI remain searchable. No surveyed entrance coordinates are asserted. Review is still required before production publication.

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

`scripts/shop-premises.mjs` records the 29 premises and a visitor-facing subset matching 20 existing featured businesses to their known block/unit/floor. The map details now display this block/floor information. Shared premises remain separate occupants; adjoining premises do not increase business counts. Geographic coordinates remain null pending alignment; these records enable a plan-based layout without invented GPS points.

Examples: MOTD at 1G/3G; V Haus at 1-1/3-1/5G/5-1; BAAGUS at 7G; Signature at 9G; MK Curtain at 11G and Aces at 11-1; Jazmina at 23G and KLOT at 23-1; Premio at 25G and Balens at 25-1; preferred KBO destination at 39G; Nuarina at 41G; Yummy Nyonya at 43G and Fagolli at 43-1; DC Moto at 49G.

On 7 October 2026, the owner confirmed that Forsee Lens visitors should go to 53G, Jalan TPK 2/8 (Block C, bay 6, ground floor), consistent with the Ops Hub premises record. The three language guides, structured address and address-search directions now use 53G. This confirms the visitor destination, not a relocation of the entire laboratory or company. DRT's frontage relationship to Jazmina at Block A No.23 is established, but no exact pickup coordinate is claimed.

## Approximate premises layer — review candidate

The full site plan has now been aligned to five OSM road-centre junctions on Jalan TPK 2/1, 2/2, 2/3, 2/4 and 2/8. An affine least-squares fit has a 2.5 m control residual; this is NOT an absolute accuracy or entrance-location claim. Archival drawing differences, manual tracing and OSM alignment uncertainty remain. The reproducible derivation is `scripts/map/derive-shop-layout.py` (Python + NumPy). Public geometry is `assets/map/shop-premises.geojson`, with ODbL alignment attribution. Original technical drawings and private source records are not redistributed.

All 29 unit footprints are approximate, including the Block C bend. The 20 confirmed featured-business mappings select whole footprints, with floor labels and a chooser for shared units. Filtered-out businesses are excluded from the chooser. Unmatched businesses and the DRT point retain street-level display; the confirmed Jazmina frontage relationship does not establish a surveyed pickup coordinate. No business latitude/longitude is emitted as verified structured data. The neutral units mean no featured business is mapped, not vacancy.

Visitor flow: directory selection → embedded public premises mapping → self-hosted geometry → approximate footprint → business/floor chooser → guide or directions. No runtime database credentials are used. Local build, 11 map tests, browser selection/shared-floor/filter/history/fallback checks and five viewport widths pass. `layout-qa.json` records the added checks. Physical phones, Safari and field entrance positions remain unverified. The full site validator's existing baseline failures remain documented above.

Review [desktop](forsee-desktop.webp) and [mobile](forsee-mobile.webp) Forsee screenshots and the Vercel preview before production approval. Production belongs to Shung Yen's Vercel; a preview hostname containing an older account slug does not establish current ownership. No merge or production deployment is made in this step.


## Non-shoplot review — 7 October 2026

Added four approximate historical building footprints on Jalan TPK 2/2: No.2 Optimum Swim School, No.4 Ga Hing, No.6 Lavino and Total Tools (shared chooser), No.8 Mazda. Address order is visible on management's annotated DYM TPK2 layout; rectangles come from the full architectural site plan, using the same OSM alignment. These are archival building outlines, not verified current extensions, property boundaries or entrances. The private annotated source contains commercial data and is not published.

25 of 34 featured businesses now have a premises-level depiction: 20 shoplot businesses plus five frontage businesses. Nine remain street-level: Jubin BMS, Perodua, Kia, Techtrics Auto, Techtra Academy, Jon Detailing, Jaecoo, Toyokar and Fadzil. DRT remains street-level with its owner-confirmed Jazmina frontage description. Further factory plans found did not yet establish sufficient address-to-outline evidence for these nine; do not infer numbered factory order from unrelated lot numbers.

Validation: build, 12 map tests and building-qa.json checks pass, including shared Lavino/Total Tools selection. Preview images: [desktop](building-desktop.webp), [mobile](building-mobile.webp).

Hosting inspection: the connector returned deployment-not-found for both www.tpkpark.com and the observed preview deployment ID on 7 October. Earlier scoped project access was forbidden. This does not establish domain ownership; browser inspection of the signed-in Vercel dashboard is required before release. No DNS, project transfer or production change was made.


## Factory address-to-outline reconciliation — 7 October 2026

Six more businesses now have approximate archival building depictions. The existing affine alignment is unchanged. The factory row extends beyond the road-control area, so its positional uncertainty may be greater than the control-fit residual suggests.

| Business | Visitor address | Drawing evidence |
| --- | --- | --- |
| Jubin BMS | 7, Jalan TPK 2/3 | Annotated DYM site layout identifies No.7; the address-specific tenancy floor plan corroborates the detached premises |
| Perodua Kinrara | 8, Jalan TPK 2/3 | Annotated DYM layout identifies No.8 on the opposite side of 2/3; Ops Hub corroborates the premises address |
| Kia 4S Service | 59, Jalan TPK 2/8 | Annotated site layout in the No.59 tenancy folder explicitly labels Nos.59–77 |
| Techtrics Auto | 61 and 63, Jalan TPK 2/8 | Same annotated layout; retain two independent outlines for the same business |
| Techtra Academy | 65, Jalan TPK 2/8 | Same annotated layout |
| Jon Detailing | 71, Jalan TPK 2/8 | Same annotated layout; distinct from Forsee's visitor destination at 53G |

The annotated tenancy layout resolves the site-plan workshop indices 1–10 to street numbers 59–77. Traces use the full architectural drawing, not the reduced annotated drawing. Original plans and private tenancy records are not redistributed. Public source labels describe the evidence without publishing contract, rent or personal data.

Remaining three: No.4 Jalan TPK 1/4 is indicated on an annotated Jaecoo premises layout, but no sufficiently checked geographic footprint has been derived. Fadzil's No.3 Jalan TPK 1/3 approval letter confirms the address and title reference but contains no location drawing. The Toyokar folder's sewerage drawing is an internal services schematic, not a geographical location plan. Keep all three at street level until their geographical outlines are resolved.

Ops Hub tenant/premises links were last marked verified on 10 August 2026. This reconciliation is address-to-drawing evidence, not a fresh confirmation of occupancy or renewal. Current extensions, vehicle gates and pedestrian entrances remain unverified. Forsee visitor routing stays at 53G. DRT stays at its previously recorded Jazmina frontage description.

Hosting: the current verified assignment is in ../vercel-hosting.md; that later browser inspection supersedes earlier owner-assignment statements in this chronological review log. No production deployment is authorized by this data update.

Validation for this update: build and 13 map tests pass. Browser checks pass for all six new selections, both Techtrics outlines, the existing shared occupant choosers and data-failure fallback. Desktop/mobile screenshots: [desktop](factory-desktop.webp), [mobile](factory-mobile.webp). Results: factory-qa.json.
