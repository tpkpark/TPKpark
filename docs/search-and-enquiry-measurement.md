# Search and enquiry measurement — 9 September 2026

## Indexing baseline

Property: https://www.tpkpark.com/ in GSC Wizard.

The tracker previously showed 39 of 42 URLs indexed. Fresh Google URL Inspection checks on 9 September returned **Submitted and indexed / PASS** for the English homepage, `/about/` and `/home-living/`, clearing the three saved exceptions. This is confirmation of Google's reported index state, not evidence that this release caused indexing. The existing sitemap lists 42 URLs and reports zero errors or warnings. No resubmission is needed for the cleared exceptions.

Source data for 10 August–6 September 2026: 22 clicks, 362 impressions, 6.08% CTR. Treat this as an early baseline, not an established growth trend. The query table omits some low-volume searches and cannot be summed to reproduce the property total.

Location searches include `kinrara industrial park` (27 impressions, 0 clicks, average position 24.37) and `taman perindustrian kinrara` (13 impressions, 0 clicks, average position 24.23). They led to the home/about pages. This release clarifies the English place-name alias, improves contextual paths from home/about/Home & Living to leasing, and makes the three leasing pages more specific about property type, street, floors and enquiry steps in EN/BM/Chinese. It adds no invented availability or guaranteed uses. Unit 69 remains leased.

## What the events mean

| Event or target | Meaning | Interpretation limit |
| --- | --- | --- |
| `assistant_open` | Help panel opened | Repeat opens are possible; not a unique visitor count |
| `assistant_question` | A valid question request started | Includes greetings and later failures; not a qualified lead |
| `assistant_answer` | A new answer displayed | Does not establish correctness, satisfaction or enquiry intent |
| `assistant_error` | A request failed | Only rate_limited, timeout, network, invalid_response or unavailable; no raw diagnostics |
| `assistant_draft_ready` | A requested email draft displayed | Not sent or received |
| `assistant_voice_start` | Browser speech recognition started after a visitor tapped the microphone | No microphone audio or transcript is measured |
| `assistant_voice_ready` | Recognised text was added to the editable question field | The text is not measured and has not been sent |
| `assistant_listen_start` | Browser or device began reading an answer aloud | The answer content is not measured |
| `contact_click` + `assistant:phone` / `assistant:email` | Office contact link clicked in chat | A click does not prove a call connected or an email was sent |
| `contact_click` + `assistant:email_draft` | Reviewed draft opened in an email app | Still not a received enquiry |
| `file_download` + `assistant:<filename>` | A brochure link clicked in chat | Not proof of a completed download |
| `leasing_click` + `assistant:<path>` | Property details opened from chat | Interest only |

Existing website events retain their names and targets. Chat link clicks use the existing **Interaction target** GA4 dimension, so a new custom dimension is not needed to distinguish their origin. Vercel keeps only `language` and bounded `target` fields. The page URL is canonical, without query strings or fragments.

New visitors receive basic Vercel counts. Optional GA4 adds detailed events when selected. Basic/off choices, earlier refusals and browser privacy signals are honoured. There is no first-visit dialog. Questions, replies, names, contact details and draft text are never event parameters. No events from restored conversations are replayed; previews send no production analytics.

## Review method

1. In GSC Wizard, compare settled periods for the leasing overview, shop and detached pages in all three languages. Review query/page pairs, clicks, impressions and CTR. Avoid interpreting tiny samples as proof of improvement or regression.
2. In GA4 or Vercel, inspect the assistant events and contact/PDF targets above. GA4 covers only visitors using detailed analytics. Do not add the two platforms' totals together or compare data across this settings change without noting it.
3. In the team's **private** enquiry records, separately count received leasing enquiries, qualified requirements and viewings actually arranged. A qualified enquiry should provide enough confirmed information about proposed business use, space needs, budget and timing for the leasing team to assess it. Deduplicate repeat messages from the same prospect. Record source as reported by the prospect or explicit in their enquiry; do not infer chatbot attribution from aggregate counts.
4. Keep visitor and commercial information out of this public repository. Do not mark a draft or contact click as `generate_lead`. This website does not send emails, read the inbox, confirm viewings or verify receipt.

The current release records the website side of this journey. Received-enquiry and viewing totals remain maintained by the leasing team; no inbox connection or new CRM was created.
