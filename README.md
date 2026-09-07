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

## Search and analytics maintenance

- GSC property: `https://www.tpkpark.com/`. The sitemap contains all 42 canonical pages.
- GA4 web stream: **TPK Park website**, property ID `552928193`, account ID `407042166`, stream ID `15734425194`, measurement ID `G-CF1WSRLQ2P`, Malaysia time and MYR. Account owner: TPK Park Sdn. Bhd.
- `scripts/analytics-config.mjs` holds the public measurement ID and EN/MS/ZH consent copy. `js/analytics.js` loads GA4 only on the production domain after consent; previews do not send events. Enhanced measurement is disabled in the stream to avoid duplicate or unintended form/link collection.
- Events: `page_view`, `file_download` (leasing PDF), `contact_click` (`phone` or `email`) and `email_draft` (the contact form prepares a mailto draft). **An email draft is not a sent or received enquiry.** Confirmed enquiries must be reconciled with the actual inbox or CRM; do not mark drafts as `generate_lead`.
- Names, email addresses, phone numbers, companies and free-text enquiry contents are excluded from Analytics. Page URLs use the canonical path, and referrers exclude paths and query strings. Advertising features are disabled. Visitors can change consent using the footer settings.
- The four core photographs in `assets/images/` are WebP copies of the existing photographs, with original crops and maximum dimensions preserved. `scripts/image-assets.mjs` maps display images; existing social preview image URLs are unchanged.
- Plans in `assets/leasing/plans/` are extracted from the owner-provided 3 September 2026 brochures. Verify dimensions, condition, permitted use and availability before making offers.
- No. 69 Jalan TPK 2/8 is leased. Its page describes the format and invites alternative enquiries. Old PDF URLs temporarily redirect to the status page. Keep the private agreed rent out of public content.
- The verified TPK Park place listing and the management company office listing are separate. Do not replace the park address with the office address or give the whole park office opening hours. Saturday office hours conflict between the website and brochure and require owner confirmation.

After release, inspect the changed URLs in Search Console and compare 28-day organic clicks, impressions, CTR and landing-page engagement. Use received enquiries alongside Analytics contact actions when assessing business results.

The official review link for genuine visitors is https://g.page/r/CVUHDbES4ZTNEBM/review. Ask for an honest account of their experience; do not offer rewards or require a positive rating. Relevant tenant and partner location pages can link to the matching TPK Park cluster page when useful to their visitors.
