# TPK Park website

Multilingual website for TPK Park, with static pages and a small AI endpoint on Vercel.

## Structure

- `scripts/site-data.mjs` contains the English, Bahasa Melayu and Chinese content.
- `scripts/build-site.mjs` generates 14 routes for each language (42 HTML pages), including permanent leasing pages for the principal property formats.
- `scripts/validate-site.mjs` checks routes, internal links, metadata, `hreflang`, JSON-LD, images and form labels.
- `src/input.css` contains the shared design system.
- Generated HTML and CSS are produced during the build; the generator, content model and stylesheet source are the maintenance source of truth.

## Local commands

```sh
npm ci
npm test
```

`npm test` regenerates the site, compiles the production CSS and runs the complete validation suite.

## Deployment

Vercel builds with `npm run build`, serves the static pages and runs `api/ask.js` as a Node function. Preview branches must be reviewed before merging into `main`; merging to `main` is the production release action.

## Leasing enquiries

- The leasing overview and shop page distinguish ground-floor and first-floor asking rents. These are reference options from the September 2026 brochure, not a verified list of vacant unit numbers. Do not infer individual floor area by halving the brochure's whole-unit figure. The operational workbook contains different architectural area bases and historical occupancy entries awaiting review.
- Property viewing links preselect the space type and request. Shop comparison links also preselect the requested floor. The contact form preserves general, event and media enquiries; leasing-only fields are hidden when not relevant.
- `scripts/enquiry-config.mjs` contains multilingual leasing and enquiry copy. `js/enquiry.js` prepares an email draft to `info@tpkpark.com` with the visitor's preferences and reminds them to send it from their email application.
- The owner declined the proposed external form service. Its unused integration has been removed; no external form-delivery endpoint is configured or contacted.
- `email_draft` remains a draft action, not proof of email receipt, a confirmed viewing or a signed tenancy. Analytics receives no message text or contact details and continues to respect the visitor's preferences.
- Links directly to the enquiry page may use `source=google-business`, `agent`, `facebook`, `instagram`, `signage` or `tenant-referral`. These fixed labels accompany the operational enquiry only; they create no browser storage or visitor identifier. Other values are reported as `website`, and attribution is not persisted across page navigation.
- No leasing WhatsApp number has been verified. Retain the existing office phone and email until management identifies the intended WhatsApp contact. Do not use a supplier's number from a quoted email signature.
- `docs/leasing-distribution.md` contains prepared public copy and links for Google Business and agents. It has not been posted or sent. GSC Wizard now has a leasing content group and English, Malay and Chinese rental-intent keyword groups; these help reporting and do not change rankings themselves.

## Ask TPK Park

- The discreet button opens a real typed conversation when AI is enabled, with English, Malay and Chinese answers, starter questions, follow-ups and related public pages. Plain text and allowlisted source links prevent model output from creating HTML or arbitrary links.
- `api/ask.js` calls OpenAI GPT-4.1 mini through Vercel AI Gateway. `@vercel/oidc` obtains the current deployment identity inside each request; no provider key is shipped to the browser. An existing `AI_GATEWAY_API_KEY` may be supplied server-side for local development. Do not put secrets in chat, source code or GitHub.
- `lib/assistant-knowledge.mjs` derives the reference from the checked-in public website and leasing inventory. No tenancy workbooks, inboxes or private documents are connected. New public content is picked up on the next deployment. Inventory is not live; the team must confirm rents, suitability, availability and viewings. Unit 69 remains leased and its private agreed rent is excluded.
- Conversation context is bounded and held only in page memory. New chat or page navigation clears it. The endpoint does not save or log transcripts; `store: false` is sent to the model. Messages still pass through Vercel and OpenAI, whose service retention policies apply. Chat content never enters site analytics. This is not a zero-retention guarantee.
- The assistant cannot send emails, collect leads, book viewings or agree tenancy terms. It points to the existing contact page; its email form still prepares a draft that the visitor must send.
- The panel opens only on request, closes with Escape or an outside click, and returns focus to its trigger when closed explicitly. It stays out of the way while the privacy panel or mobile menu is open. Without JavaScript, the floating control stays hidden and the normal site navigation remains available.
- The `codex/ai-assistant` Vercel preview enables AI for review. Production requires `TPK_AI_ENABLED=1` and a redeployment after approval. `TPK_AI_ENABLED=0` disables it; an unset production value retains the existing quick-help panel. Keep this production switch off until actual provider responses, public facts, privacy copy and a project spending limit are reviewed.
- Each request has a 2,000-character question limit, bounded recent history, 700 output tokens and a 23-second provider timeout, without automatic retries. The server also rejects cross-site requests and applies a 12-request/10-minute visitor limit and three concurrent requests **per function instance**. These limits are not a distributed quota or monthly cost cap. Use the AI Gateway budget scoped to `tpkpark-site`; do not alter other projects or enable automatic credit purchases without approval.
- `TPK_AI_ENABLED=1 npm test` checks the AI page variant and deterministic protocol, request, output and privacy boundaries without calling a model. Only builds of the named Vercel preview branch run four fixed public model questions, writing `assets/assistant-preview-check.json` and a build-log result. A successful site build alone does not mean those live checks passed; inspect their report before release. These preview calls consume a small amount of gateway credit.
- Provider outages or exhausted credit show a clear retry message and leave leasing and contact links available. Failed questions remain in the input; there is no silent fake response.

## Search and analytics maintenance

- GSC property: `https://www.tpkpark.com/`. The sitemap contains all 42 canonical pages.
- GA4 web stream: **TPK Park website**, property ID `552928193`, account ID `407042166`, stream ID `15734425194`, measurement ID `G-CF1WSRLQ2P`, Malaysia time and MYR. Account owner: TPK Park Sdn. Bhd.
- `scripts/analytics-config.mjs` holds the public measurement ID and EN/MS/ZH analytics explanations. `js/analytics.js` operates only on `tpkpark.com` and `www.tpkpark.com`; local and preview deployments send no analytics.
- **Basic statistics:** Vercel Web Analytics counts page views and selected actions without analytics cookies. Enable Web Analytics on the existing `tpkpark-site` project before deploying this integration. The stable `/_vercel/insights/script.js` route and HTML queue API are supported by Vercel's SDK. The service loads once per page; a `beforeSend` hook cleans page URLs and rejects subsequent measurements after opt-out.
- **Optional detailed analytics:** GA4 loads only after an explicit opt-in or a previously saved grant. Enhanced measurement remains disabled in the stream to avoid duplicate or unintended form/link collection. GA4 adds cookie-based visit analysis, form-start counts and scroll milestones (50% and 90%, once each per page). Advertising features remain disabled. No events collected before opt-in are replayed to GA4.
- GA4 event-scoped report fields: **Site language** (`site_language`), **Page type** (`page_type`) and **Interaction target** (`interaction_target`). Use Interaction target with Event name to distinguish contact methods, brochure filenames, property categories, destination pages/languages or scroll milestones. Custom fields may take 24–48 hours after incoming data to appear in reports.
- Visitors choose **basic**, **detailed** (both systems), or **off** in Privacy & analytics. The preference is stored locally, and withdrawal applies across open tabs. Global Privacy Control and Do Not Track disable both systems. Previous GA4 refusals migrate to **off**, preserving the original promise; those visitors may select basic statistics themselves. Closing the initial prompt keeps basic statistics and does not grant GA4 consent.
- Both systems receive the selected action names `file_download`, `plan_view`, `contact_click`, `directions_click`, `social_click`, `outbound_click`, `language_switch`, `leasing_click`, `enquiry_click`, `navigation_click` and `email_draft`. Vercel custom events have at most two properties (`language` and a bounded `target`), within the existing Pro plan limit; the source page accompanies the event. **An email draft or contact click is not a sent or received enquiry.** Confirmed enquiries must be reconciled with the actual inbox or CRM; do not mark drafts as `generate_lead`.
- Form contents, names, email addresses, phone numbers and companies are not read into analytics payloads. Only known space categories are recorded from the form. Page URLs use canonical paths without queries or fragments; outbound events include only the destination domain. GA4 referrers use origin only, and the site's `strict-origin` referrer policy prevents full URLs being sent as referrers when leaving a page.
- Use Vercel for overall activity and GA4 for the opt-in subset; **do not add their totals together**. Counts can differ because of consent, browser privacy settings, blockers, network failures and each service's visitor definitions. Vercel's temporary visitor hash is discarded after 24 hours, so its visitors are not a persistent cross-day audience count.
- Vercel Web Analytics was enabled on the existing Pro plan on 7 September 2026, with no Plus add-on. Published usage pricing is US$0.03 per 1,000 page views/custom events, subject to the team's usage credit; 100,000 events correspond to US$3 before credit. Keep any cost controls scoped to this project; do not pause unrelated projects in the shared workspace. References: https://vercel.com/docs/analytics/limits-and-pricing and https://vercel.com/docs/analytics/privacy-policy.
- The four core photographs in `assets/images/` are WebP copies of the existing photographs, with original crops and maximum dimensions preserved. `scripts/image-assets.mjs` maps display images; existing social preview image URLs are unchanged.
- Plans in `assets/leasing/plans/` are extracted from the owner-provided 3 September 2026 brochures. Verify dimensions, condition, permitted use and availability before making offers.
- No. 69 Jalan TPK 2/8 is leased. Its page describes the format and invites alternative enquiries. Old PDF URLs temporarily redirect to the status page. Keep the private agreed rent out of public content.
- The verified TPK Park place listing and the management company office listing are separate. Do not replace the park address with the office address or give the whole park office opening hours. Saturday office hours conflict between the website and brochure and require owner confirmation.

After release, inspect the changed URLs in Search Console and compare 28-day organic clicks, impressions, CTR and landing-page engagement. Use received enquiries alongside Analytics contact actions when assessing business results.

The official review link for genuine visitors is https://g.page/r/CVUHDbES4ZTNEBM/review. Ask for an honest account of their experience; do not offer rewards or require a positive rating. Relevant tenant and partner location pages can link to the matching TPK Park cluster page when useful to their visitors.
