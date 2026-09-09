# Ask TPK Park upgrade — 9 September 2026

Implements the agreed Mr. M improvements for TPK Park's leasing and public-information assistant. Retains the static multilingual website, approved public reference and existing Vercel AI Gateway connection.

## Visitor experience

- Validated current-page context and relevant questions for property, business-category, leadership, contact and history/news pages. An explicit visitor topic wins over the page hint.
- Last three completed exchanges survive navigation in the same tab for up to 90 minutes of inactivity. New chat clears them. Storage-blocked browsers continue in page memory. Failed questions remain editable and never become completed history.
- Auto / EN / 中文 / BM answer preference. Auto supports additional languages, including Japanese, with Japanese kana checked before Chinese Han characters. Fixed preferences override language requests in chat. Page controls, reference cards and email templates use the website page language.
- Ground-floor shop, first-floor shop and No. 7 recommendation cards use the current public site data, images, areas, asking rents and PDF links. The model selects approved IDs only. Shop whole-unit area remains labelled as covering two floors. Unit 69 has no recommendation card or retired brochure link.
- Email drafts appear only after an explicit request or the Draft an enquiry button. The assistant extracts verbatim visitor-supplied business type, budget, size, floor and timing; it cannot turn its own suggestions into visitor requirements. Missing fields remain blank. The visitor reviews/edits the draft and opens their email app to send it. Edits are not submitted to the model, analytics or a lead service.
- Permanent office phone, team email and leasing links remain usable during errors. No WhatsApp or FormSubmit.
- Short factual answers, at most one useful follow-up, no repetitive contact pitch. Live-review hardening removes observed ideal/perfect wording and redundant closing viewing pitches; requested email drafts get a short review instruction instead of a duplicated letter or repeated property cards. Published information cannot confirm availability, suitability, licences, a tenancy offer or a viewing.

## Hosting and AI usage

TPK Park remains on Lawrence's existing `tpkpark-site` Vercel project. On 9 September 2026, the owner chose to leave hosting, AI credit and any spending-limit settings with Lawrence. The proposed US$5 monthly budget is therefore not a release requirement, and this upgrade does not configure a new monthly cap or require a budget acknowledgement environment variable.

Production retains the existing `TPK_AI_ENABLED=1` switch and authentication behavior: an existing server-side `AI_GATEWAY_API_KEY` takes precedence, otherwise the function obtains the current deployment OIDC token inside the request. No new database, provider account, key, top-up or subscription is required. No Vercel account settings are changed by this PR.

The local abuse backstop allows 100 requests per network hash in a fixed 10-minute window per instance (formerly 12), with three concurrent model calls per instance. These controls are neither a globally shared per-network quota nor a monthly spending cap. Raw IPs and transcripts are never stored by the site; only temporary counters and a rotating salted network hash are used. Retry-After reports the actual local window or provider cooldown. Existing Gateway quota refusals are handled safely without exposing provider error bodies or automatically retrying.

The named `codex/ask-tpk-upgrade` preview enables AI for review using the existing preview convention. Its requests use the existing Gateway account and credit.

## Data boundaries

The reference still covers every published website route and current public property facts. No RAG migration, private tenancy records, inboxes, private PDFs or visitor-contact collection. Analytics/privacy explanations remain excluded from chatbot knowledge. The assistant's own public disclosure accurately explains the new tab session storage. Chat text, extracted requirements and edited email bodies are not sent to analytics. Existing click events record only generic email/phone or approved property/PDF targets; a click is not a sent enquiry.

## Verification

`VERCEL_ENV=production TPK_AI_ENABLED=1 npm test` validates the production build with the existing configuration, all 42 pages, existing analytics/enquiry behavior, current-page validation, fixed/automatic language behavior, current PDFs and card facts, strict model output, draft request/quotation boundaries, same-tab continuity, clearing/expiry, storage failures, editable mailto drafts, origin and payload bounds, existing Gateway authentication and safe quota handling. Local validation makes no model calls.

Only the named preview branch runs seven fixed public model checks during its build: Wong Shung Yen, first-floor budget/area/card, Japanese No. 7 context, fixed Chinese film credit, explicit email draft, Unit 69 leased status and Malay plan provenance. Read `assets/assistant-preview-check.json` or the build report to verify the actual results; build readiness alone is not evidence that these answers passed. No visitor conversations are used.

## Rollback

The current production deployment remains unchanged until publication. `TPK_AI_ENABLED=0` disables the assistant and retains quick-help links on the next deployment. The existing previous deployment remains available for rollback. Hosting and AI usage settings remain managed by Lawrence.
