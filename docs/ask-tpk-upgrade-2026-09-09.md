# Ask TPK Park upgrade — 9 September 2026

Implements the agreed Mr. M improvements for TPK Park's leasing and public-information assistant. Retains the static multilingual website, approved public reference and existing Vercel AI Gateway connection.

## Visitor experience

- Validated current-page context and relevant questions for property, business-category, leadership, contact and history/news pages. An explicit visitor topic wins over the page hint.
- Last three completed exchanges survive navigation in the same tab for up to 90 minutes of inactivity. New chat clears them. Storage-blocked browsers continue in page memory. Failed questions remain editable and never become completed history.
- Auto / EN / 中文 / BM answer preference. Auto supports additional languages, including Japanese, with Japanese kana checked before Chinese Han characters. Fixed preferences override language requests in chat. Page controls, reference cards and email templates use the website page language.
- Ground-floor shop, first-floor shop and No. 7 recommendation cards use the current public site data, images, areas, asking rents and PDF links. The model selects approved IDs only. Shop whole-unit area remains labelled as covering two floors. Unit 69 has no recommendation card or retired brochure link.
- Email drafts appear only after an explicit request or the Draft an enquiry button. The assistant extracts verbatim visitor-supplied business type, budget, size, floor and timing; it cannot turn its own suggestions into visitor requirements. Missing fields remain blank. The visitor reviews/edits the draft and opens their email app to send it. Edits are not submitted to the model, analytics or a lead service.
- Permanent office phone, team email and leasing links remain usable during errors. No WhatsApp or FormSubmit.
- Short factual answers, at most one useful follow-up, no repetitive contact pitch. Published information cannot confirm availability, suitability, licences, a tenancy offer or a viewing.

## Cost control and release requirement

Use the existing AI Gateway **project** budget. No new database, model provider account or persistent API key is required.

**Not activated by this PR:** the available Vercel connection returns 403 for `tpkpark-site`. The previous dashboard review showed Unlimited and disabled budget actions. Do not describe the cap as active until the actual project budget has been inspected and set.

Before publishing:

1. In Lawrence's existing Vercel workspace, set the **tpkpark-site project** AI Gateway budget to **US$5, monthly refresh**. Do not change the whole-team budget or unrelated projects. No top-up or subscription is required by this code change.
2. Verify the actual saved project budget. An owner, Budget Manager or project admin with the required permission can perform this step.
3. Only then set `TPK_AI_GATEWAY_BUDGET_CONFIRMED=5_USD_MONTHLY` for Production. This is a release acknowledgement; setting the variable does **not** create or enforce a budget by itself.
4. Publish this reviewed PR. A production build with AI enabled fails before replacing the live deployment if that acknowledgement is missing. The function also rejects calls without it.

Production always uses the project's OIDC token, so an API key cannot move requests outside the project budget. AI Gateway enforces the monthly cap across instances and deployments. Budget refusals are handled safely without returning private provider error bodies or automatically retrying. The budget checks new requests; in-flight requests and platform accounting timing can cause a small overshoot. This is an AI inference cap, not a cap on all Vercel hosting or analytics charges.

The local abuse backstop allows 100 requests per network hash in a fixed 10-minute window per instance (formerly 12), with three concurrent model calls per instance. This is not a globally shared per-network quota. The native Gateway project budget is the shared financial control. Raw IPs and transcripts are never stored by the site; only temporary counters and a rotating salted network hash are used. Retry-After reports the actual local window or provider cooldown, not a blanket one-minute promise. No automatic model retries.

The named `codex/ask-tpk-upgrade` preview enables AI for review using the existing preview convention. Its requests can spend Gateway credit. The production acknowledgement is intentionally not required for a preview. Do not claim an uncapped preview has a monthly limit.

Official references checked 9 September 2026:
- https://vercel.com/docs/ai-gateway/observability-and-spend/budgets
- https://vercel.com/ai-gateway/models/gpt-4.1-mini

## Data boundaries

The reference still covers every published website route and current public property facts. No RAG migration, private tenancy records, inboxes, private PDFs or visitor-contact collection. Analytics/privacy explanations remain excluded from chatbot knowledge. The assistant's own public disclosure accurately explains the new tab session storage. Chat text, extracted requirements and edited email bodies are not sent to analytics. Existing click events record only generic email/phone or approved property/PDF targets; a click is not a sent enquiry.

## Verification

`TPK_AI_ENABLED=1 npm test` validates 42 pages, existing analytics/enquiry behavior, current-page validation, fixed/automatic language behavior, current PDFs and card facts, strict model output, draft request/quotation boundaries, same-tab continuity, clearing/expiry, storage failures, editable mailto drafts, origin and payload bounds, retry behavior and the production budget release gate.

Only the named preview branch runs seven fixed public model checks during its build: Wong Shung Yen, first-floor budget/area/card, Japanese No. 7 context, fixed Chinese film credit, explicit email draft, Unit 69 leased status and Malay plan provenance. Read `assets/assistant-preview-check.json` or the build report to verify the actual results; build readiness alone is not evidence that these answers passed. No visitor conversations are used.

## Rollback

The current production deployment remains unchanged until publication. `TPK_AI_ENABLED=0` disables the assistant and retains quick-help links on the next deployment. The existing previous deployment remains available for rollback. Do not remove the verified Gateway budget when disabling AI.
