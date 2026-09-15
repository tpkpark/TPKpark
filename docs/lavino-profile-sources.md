# Lavino Puchong visitor guide

Published under `/home-living/lavino/`, `/ms/home-living/lavino/` and `/zh/home-living/lavino/`. Research date: 15 September 2026.

## Public sources

- [Lavino official website](https://www.lavino.com.my/): the brand's living, dining and bedroom furniture range. Search-indexed official catalogue pages include sofas, dining sets, bed frames and mattresses. The guide describes the brand range and asks visitors to confirm branch displays; it does not claim that every online item is stocked locally.
- [Lavino's official Puchong post](https://www.instagram.com/reel/C4AG3lOLjk7/): indexed branch information names 6, Jalan TPK 2/2 and telephone 016 339 1601. The old promotion itself is not repeated.
- [Waze branch listing](https://www.waze.com/live-map/directions/my/selangor/puchong/lavino-puchong-or-bandar-kinrara-furniture-showroom?to=place.ChIJ-UmXrFBLzDERLRSUYQXuCqA): corroborates the showroom address, postcode 47100 and branch telephone +60 16 339 1601, and supplies the published navigation link.
- The existing TPK Park Home & Living directory supplies the park context and neighbouring retail categories.

## Editorial boundaries

- Lavino's official contact footer gives a separate HQ/customer-care number, +60 16 332 9592. The visitor guide uses the showroom number, not that HQ contact.
- Waze lists daily showroom hours; the official footer lists Monday–Saturday HQ hours. These should not be conflated. The guide asks visitors to confirm hours and omits `openingHoursSpecification`.
- Prices, stock, delivery times, assembly, warranty terms and specific parking availability are not asserted. Visitors are directed to the showroom for details.
- `FurnitureStore` identifies the Puchong branch with its own ID and `containedInPlace` reference to Taman Perindustrian Kinrara. It does not claim that TPK Park owns or operates Lavino.

## Photography

Lavino's official contact/about photographs were found in image search, but direct retrieval returned HTTP 403. No remote Lavino photograph is hotlinked or represented as a locally available asset.

The guide uses the site's existing approved `home-living-1120.webp` and responsive 480-pixel variant only in the surrounding Home & Living section. Its caption and alternative text identify the park frontage, not the Lavino building. This contextual image also supplies the page preview. No image of a different showroom is attached to the Lavino `FurnitureStore` entity. A verified Lavino branch photograph can replace this arrangement in a later editorial update.

## Site integration

- Each Home & Living directory links to its own language's Lavino guide. Canonicals, language alternates, breadcrumbs and sitemap entries are generated from the route data.
- Ask TPK Park receives the published guide and visible branch phone number in EN, MS and ZH. It does not fetch third-party stock or private records.
- Analytics measures Lavino navigation, official website referrals, Waze directions and showroom calls within existing consent controls. A showroom call is `tenant_contact_click`, not a park leasing enquiry. Query strings and phone numbers are excluded from event payloads.
