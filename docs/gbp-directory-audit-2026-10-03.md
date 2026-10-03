# TPK Park: Maps relationships and website directory

Audit date: 3 October 2026. Public business information and the authorised management account were inspected live.

## Findings and actions

| Listing | Observed details | Action and status |
| --- | --- | --- |
| TPK Park | Verified destination listing. Primary category Business Park; additional Business Centre and Shopping Centre. Description identifies Taman Perindustrian Kinrara / 金銮工业园 and the company's selected-property scope. Tenant hours are separate. Website already uses the approved GBP tracking tags. Maps exposes Overview, Reviews and About, without a Directory tab. | Retained the existing category, description, website and hours settings. Public Maps CID: 14813712544724485973. |
| Signature Kinrara | 9 Jalan TPK 2/8. No Located in relationship displayed before editing. | Selected the existing TPK Park destination in Located within and submitted. Google displayed its review confirmation; publication is not confirmed. CID: 4411444918523075618. |
| BAAGUS Kinrara | 7 Jalan TPK 2/8. Phone +60 10 213 3173 matches the official branch source. No Located in relationship displayed before editing. | Selected TPK Park and submitted as a Maps suggestion. Google displayed its review confirmation; publication is not confirmed. CID: 2775935466620920188. |
| MOTD | 1 Jalan TPK 2/8. Phone +60 16 662 6951. No Located in relationship displayed before editing. | Selected TPK Park and submitted. Google displayed its review confirmation; publication is not confirmed. CID: 2482574664683794866. |

The separate TPK Park Sdn. Bhd. office entry at 2 Jalan TPK 1/4 requires verification. It was not changed or merged with the destination. Listing a business within the park does not assert that TPK Park Sdn. Bhd. owns or manages that business or every property in the area.

## Contact discrepancy resolved

The owner confirmed on 3 October 2026 that Signature Kinrara uses **010-913 3198** (**+60 10 913 3198** internationally), matching its public Google listing. TPK Park's EN/MS/ZH profile contacts, click-to-call links, structured data and phone-click attribution are aligned to this confirmed number. The [national showroom directory](https://signature.my/locate-a-showroom/) still showed a different number when checked earlier; it is an external source and was not edited.

## Website changes

- A directory at `/directory/`, `/ms/directory/` and `/zh/directory/`, derived from the existing Home & Living, Automotive and Lifestyle lists: 34 businesses, 34 addresses and 23 available map links at release preparation.
- Search by business, service or street; cluster filters; reset and empty states. All listings remain accessible without JavaScript. Individual guides remain focused on their own business.
- Homepage, mobile navigation, footer and the existing cluster directories link to the new directory.
- Baagus's general Google search link is replaced by its inspected exact listing; its official Waze link remains available. MOTD receives a direct Maps link. Exact inspected URLs are in `scripts/park-maps.mjs`.
- CollectionPage and ItemList structured data describe the directory. The park Place references its inspected public Maps page; the place remains distinct from the management company.
- Existing consent-aware analytics count directory navigation and map clicks using known business destinations. Search terms are not stored or transmitted.

## Verification and follow-up

The production build passed, including its entity SEO and place-name checks. Analytics validation passed. The broad legacy site validator also fails on the unchanged base commit: 152 diagnostic lines on `ece13fa`; the directory branch has 146 of those existing lines and no new diagnostic lines. Existing diagnostic categories include old profile/contact assumptions, news-card counts and sitemap enhancement dates. They are not silently treated as passing.

Check Google's review outcome before expanding the association pilot. A Located in relationship and a mall-style Directory tab are distinct features; this implementation does not promise either indexing or Directory eligibility. Keep the business directory useful independently of Google's display decision.

For a dated comparison after release, use GBP website clicks and direction requests for matched reporting periods, alongside directory page visits, business-guide navigation and directions_click events. Do not treat the owner's undated views/interactions labels as a baseline.

Google references: [business information and location relationships](https://support.google.com/business/answer/2853879?hl=en), [business category guidance](https://support.google.com/business/answer/7249669?hl=en), and [Google's Directory announcement](https://blog.google/products-and-platforms/products/maps/keep-it-chill-holiday-new-tools-google-maps/).
