# TPK Park website

Static multilingual website for TPK Park, deployed by Vercel.

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

Vercel builds with `npm run build` and serves the repository root as a static site. Preview branches must be reviewed before merging into `main`; merging to `main` is the production release action.

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

- A discreet floating button opens a help panel in the current page language. It links to leasing information, the three business categories and the contact page, with an email link to the existing team inbox.
- This is a quick-help panel, not an AI chatbot. It has no message input, model connection, conversation storage or external chat service. Do not describe it as answering questions or receiving enquiries.
- The panel opens only on request, closes with Escape or an outside click, and returns focus to its trigger when closed explicitly. It stays out of the way while the privacy panel or mobile menu is open. Without JavaScript, the floating control stays hidden and the normal site navigation remains available.
- `scripts/ask-tpk-copy.mjs` holds English, Malay and Chinese copy. `js/ask-tpk.js` controls the panel; existing analytics handles its ordinary links under the current visitor preferences.

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
