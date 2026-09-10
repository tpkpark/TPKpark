# Additive search growth strategy — 10 September 2026

## Decision

TPK Park's search programme is a portfolio, not a choice between corporate visibility and leasing acquisition. Preserve and grow the existing TPK Park brand and Wong Shung Yen profile visibility while adding high-intent Puchong and Kinrara property searches through dedicated leasing pages.

No successful brand or personal-profile page should be weakened, hidden or converted into a leasing landing page. Leasing is an additional acquisition layer with its own URLs, content and measurement.

## Early baseline

Google Search Console data settled through 7 September 2026 reports 25 clicks, 420 impressions, 5.95% CTR and an average position of 7.68. Meaningful data begins on 31 August, so this is an early baseline rather than an established trend.

- `tpk park`: 24 impressions, 2 clicks, average position 2.5.
- `tpk park puchong`: 4 impressions, average position 1.75.
- `黄松延`: 17 impressions, 2 clicks, average position 2.88.
- `kinrara industrial park`: 28 impressions, average position 24.18.
- `taman perindustrian kinrara`: 15 impressions, average position 22.13.

The URL Inspection tracker reported all 42 canonical pages indexed on 10 September, with no errors or warnings. Search Console's query table withholds some low-volume searches, so query rows must not be summed to reproduce property totals.

## Search-track ownership

| Track | Primary search purpose | Principal pages | Guardrail |
| --- | --- | --- | --- |
| TPK Park brand and place | TPK Park, Taman Perindustrian Kinrara, Kinrara Industrial Park and the destination's three pillars | Home, About, News, Milestones and cluster pages | Keep the homepage brand-led; leasing remains a clear secondary path |
| Wong Shung Yen profile | Wong Shung Yen / 黄松延, leadership, professional background and sourced public record | Leadership and Media & Public Record | Keep the profile factual, source-led and separate from generic leasing copy |
| Leasing acquisition | Shops, showrooms and commercial or industrial premises for rent in Puchong and Kinrara | Leasing overview and individual property-format pages | State availability and property facts carefully; do not invent stock, uses or terms |

The tracks reinforce one another through normal navigation, contextual links, canonical URLs, language alternates and shared Organization, Place and Person structured data. They should not use identical titles or compete for the same primary page purpose.

## Multilingual intent map

| Page | English emphasis | Bahasa Melayu emphasis | Chinese emphasis |
| --- | --- | --- | --- |
| Home / About | TPK Park; Kinrara Industrial Park; Taman Perindustrian Kinrara | TPK Park; Taman Perindustrian Kinrara | TPK Park; 蒲种金銮工业园 |
| Leadership / public record | Wong Shung Yen; TPK Park leadership | Wong Shung Yen; Pengarah Urusan TPK Park | 黄松延; Wong Shung Yen; TPK Park董事经理 |
| Leasing overview | commercial and industrial property for rent in Puchong | premis komersial dan perindustrian untuk disewa di Puchong | 蒲种商业与工业物业出租 |
| Shop / showroom | shoplot, shop and showroom for rent in Puchong or Kinrara | kedai dan bilik pameran untuk disewa di Puchong atau Kinrara | 蒲种或金銮商铺与展厅出租 |
| Detached building | detached showroom or whole building for rent in Puchong | bangunan komersial sesebuah untuk disewa di Puchong | 蒲种独立式展厅或整栋建筑出租 |

Use these as editorial meanings, not phrases to repeat mechanically. Natural, accurate copy takes priority over keyword density.

## Measurement

GSC Wizard maintains separate query clusters for TPK Park branded searches, Wong Shung Yen profile searches, industrial-park/location searches, Home & Living discovery and leasing intent in English, Bahasa Melayu and Chinese. It also maintains a dedicated all-language leadership/public-record page group.

Review each track separately:

1. Weekly: indexing exceptions, material query emergence, obvious title/CTR issues and received-enquiry quality.
2. After a complete 28-day settled period: clicks, impressions, CTR, average position and landing pages for each track.
3. Monthly: compare non-branded leasing visibility with contact, brochure and property-page actions. Keep actual received enquiries and arranged viewings in private operational records.

Do not treat a ranking fluctuation, contact click, chatbot question or prepared email draft as a qualified enquiry. Do not make repeated page rewrites from a few days of data.

## Release discipline

- Preview and validate every source change before merging to `main`.
- Preserve the existing EN/BM/Chinese canonical and `hreflang` structure.
- Submit only materially changed public URLs for recrawl after release.
- Do not change production hosting, analytics consent, AI budget or chatbot behaviour as part of search-content work.
- Keep Unit 69 marked as leased and keep private tenancy terms out of public content.
