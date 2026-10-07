# Interactive directory map — draft review, 7 October 2026

## Status and release gate

This is a **street-orientation prototype**, not the complete Phase 1 pin map. All 34 canonical businesses and one separate DRT POI are accounted for. Exact reusable coordinates are missing for all 35, so no business pins are plotted. Selecting a business highlights its recorded street, explicitly labelled as street-level orientation. Do not merge/publish as the completed interactive business map.

Owner input needed to complete the geographic layer: an annotated management site/lot plan showing current occupants and entrances, with permission to use it, or independently collected coordinates. A screenshot copied from Google Maps is not a substitute for reusable source geometry. No new GBP edits or Maps suggestions were made.

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

Isolated branch `codex/tpk-interactive-map`; draft PR only. Existing Vercel repository link is `lawrencew7729-4682s-projects/tpkpark-site`. Connector access to that workspace was denied (403), so branch integration is used if available. No production merge/deploy is authorised by this draft. Rollback after a later approved release: revert the map PR through the same review pipeline, or restore the preceding production deployment with authorised Vercel access. No database migration or DNS reversal is needed.
