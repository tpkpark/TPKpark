# TPK Park search baseline — 17 September 2026

This note records the Search Console state immediately after the brand-page/entity consolidation work and before enough time has passed to judge its SEO effect. Figures are from the connected Google Search Console source via Windsor.ai and include fresh data where available. They are observations, not proof of causation.

## Sitemap state

- Property: `https://www.tpkpark.com/`
- Sitemap: `https://www.tpkpark.com/sitemap.xml`
- Submitted URLs: 99
- Warnings: 0
- Errors: 0
- Last submitted: 15 September 2026
- Last downloaded by Google: 16 September 2026

The site-wide entity pass and homepage title refinement were deployed on 17 September 2026, so the recorded Google sitemap download predates those changes. The sitemap uses refreshed `lastmod` dates for the affected pages.

## Priority query baseline — last 28 days

| Query | Impressions | Clicks | Avg. position |
| --- | ---: | ---: | ---: |
| `tpk park` | 46 | 4 | 2.74 |
| `tpk` | 63 | 0 | 4.97 |
| `tpk park puchong` | 7 | 0 | 1.43 |
| `taman perindustrian kinrara` | 69 | 0 | 13.99 |
| `kinrara industrial park` | 65 | 0 | 18.55 |

For the exact query `taman perindustrian kinrara`, the English homepage had 44 impressions at average position 15.18; the English About page had 1 impression at position 5; and the Malay About page had 32 impressions at average position 11.38. This split is one reason the English homepage title was refined to: `TPK Park | Taman Perindustrian Kinrara (Kinrara Industrial Park)`.

## Priority landing-page baseline — last 28 days

| Page | Impressions | Clicks | CTR | Avg. position |
| --- | ---: | ---: | ---: | ---: |
| `/` | 455 | 12 | 2.64% | 7.92 |
| `/home-living/` | 39 | 0 | 0% | 8.95 |
| `/automotive/` | 40 | 0 | 0% | 7.95 |
| `/lifestyle/` | 32 | 0 | 0% | 7.41 |
| `/leasing/` | 23 | 1 | 4.35% | 6.09 |
| `/leasing/shop-showroom/` | 32 | 1 | 3.13% | 7.09 |
| `/leasing/semi-detached/` | 26 | 1 | 3.85% | 3.92 |

The three pillar pages are already around positions 7–9 on average. The immediate objective is therefore not to create another directory layer but to let the new brand-page hierarchy mature, strengthen external corroboration and improve the place-entity signal.

## Early brand-page discovery

Examples already appearing in Search Console include:

- `/lifestyle/motd/`: 8 impressions, 1 click, average position 6.0.
- `/home-living/jubin-bms/`: 1 impression, average position 4.0.
- `/ms/home-living/ga-hing/`: 1 impression, average position 3.0.
- `/zh/home-living/kuche-bath/`: 2 impressions, average position 5.0.

These samples are too small for performance conclusions, but they confirm that Google has begun surfacing individual brand subpages.

## Changes deployed on 17 September 2026

1. Brand and business pages were consolidated into the TPK Park / Taman Perindustrian Kinrara place entity through structured data, multilingual `mainEntityOfPage` relationships, pillar directory `ItemList` schema and refreshed sitemap dates.
2. The English homepage SEO title was refined to `TPK Park | Taman Perindustrian Kinrara (Kinrara Industrial Park)` while leaving visible body copy and layout unchanged.
3. A weekly Search Console watch was established to surface meaningful changes in priority place terms, pillar pages, leasing searches and individual brand pages.

## Interpretation rules

- Do not treat one or two impressions as a trend.
- Compare settled periods where possible; fresh data can change.
- Prioritise changes in query/page pairs, impressions, clicks and average position over vanity indexing counts.
- A new page receiving impressions confirms search visibility, not necessarily full or stable ranking.
- Do not keep rewriting brand pages while Google is still testing them unless there is a factual error or a clear query/content mismatch.
- The next meaningful content changes should be driven by observed search demand rather than adding pages for their own sake.
