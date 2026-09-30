# TPK Park Content Desk

Private, read-only dashboard for the **TPK Park Tenant Content Register**. The existing Google Drive folders remain the tenant upload point; the register remains the operational record. This app groups submissions with each channel decision, publication URL, recorded time, review alert and event history.

## Hosting

Deploy as a **separate Vercel project** from the existing `tpkpark/TPKpark` repository, with **Root Directory** `apps/content-portal`. Attach `content.tpkpark.com` to that project. This leaves the public `www.tpkpark.com` project and its build settings untouched. Use the DNS record Vercel supplies for the subdomain.

## Google Workspace setup

1. In a Google Cloud project controlled by TPK Park, enable the Google Sheets API and configure an **Internal** OAuth consent screen for the Workspace organisation.
2. Create a Web application OAuth client. Add `https://content.tpkpark.com` as an authorised JavaScript origin and `https://content.tpkpark.com/api/auth/callback/google` as an authorised redirect URI. For local sign-in testing, also add `http://localhost:3000/api/auth/callback/google`.
3. In the Vercel project, set the variables in `.env.example`. Generate `AUTH_SECRET` with a cryptographically random value and store it only in Vercel environment variables. Do not put OAuth secrets in the repository.
4. Set `TPK_CONTENT_ALLOWED_EMAILS` to the named TPK staff accounts as a comma-separated list and `TPK_CONTENT_SHEET_ID` to the private register ID. Each user also needs Viewer access to the **Tenant Content Register** (not the tenant upload folders) to see data through their own Google read-only token. The app denies access when the allowlist is empty.
5. Test one approved account and one non-approved Workspace account. Check that `/api/content` returns 401 without a session. Confirm the account can read the register before sharing the portal URL.

The sign-in checks Google's signed hosted-domain (`hd`) claim **and** the named-account allowlist. The dashboard requests only the Sheets read-only scope. OAuth access and refresh tokens stay in Auth.js's encrypted server session cookie and are never returned in `/api/content` or the browser session payload. Sessions last eight hours. Refresh tokens are used server-side when needed.

## Local development

```bash
cd apps/content-portal
npm ci
cp .env.example .env.local
# Fill in the OAuth values and a generated AUTH_SECRET.
npm run dev
```

`npm run typecheck`, `npm test` and `npm run build` verify the implementation. Google sign-in and live Sheets loading require the OAuth client and a signed-in approved Workspace account.

## Data and status conventions

- `Content queue` is the submission list; `Channel posts` has one row per platform decision; `Publication events` records status changes; `Publishing rules` shows editorial controls.
- A platform counts as **Public** only when its `Status` is `Public` and a public URL has been recorded. `Scheduled`, `Submitted`, `Under review`, `Private`, `Held` and `Excluded` remain distinct.
- `Published at MYT` is the actual or best recorded publication time. `Proposed publish MYT` is retained for planning. `Public verified MYT` is a separate check. The historical GBP time is approximate and marked `~`.
- The dashboard refreshes from Google Sheets when opened, every five minutes while visible, or when **Refresh** is clicked. “Register fetched” is the read time, not a Sheet edit time; “Latest logged event” is the last event recorded in the register. It does not detect new tenant Drive uploads, poll social platforms or submit posts. Correct statuses and links in the register after independently verifying each platform.
- The owner overview groups held/pending decisions, missing publication evidence, posting times reached and recorded follow-ups. A public post with an alert remains a follow-up until the register is corrected; an Excluded channel is a deliberate decision. The Submissions view filters by tenant, channel, status and recorded posting time.
- The portal is excluded from search indexing and sends `Cache-Control: private, no-store`. Access control applies to data on the server, including the API route.

The initial register contained an array formula spill error in `Channel posts!U2` and `AB2`. Those cells now carry literal historical notes. Future approval gates still require the editorial review recorded in the register.
