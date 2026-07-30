# ReviewCatcher site

Astro, deployed to Cloudflare Pages. Built as a replicable service-business
site pipeline — see `spec/reviewcatcher-build-spec-v2.md` for the full brief,
`spec/reviewcatcher-mockup.html` / `spec/reviewcatcher-checkout.html` for the
approved design (source of truth for layout/copy), and
`spec/reviewcatcher-offer-sheet.md` for the locked pricing tiers. This repo is
instance #1; forking it stands up the next vertical.

The homepage (`src/pages/index.astro` + `src/components/*`) is built to match
the v2 mockup: brand tokens and fonts (Bricolage Grotesque / Figtree /
JetBrains Mono) live in `src/styles/tokens.css`, the ported mockup CSS is in
`src/styles/global.css`, and all business specifics (pricing tiers, towns,
guarantee copy, FAQ) live in `src/config/site.config.ts`.

## Local dev

Requires Node.js (LTS) and npm.

```bash
npm install
npm run dev
```

## Stripe Checkout wiring

`/checkout` creates a real Stripe Checkout Session on submit:

- `functions/api/create-checkout-session.js` — a Cloudflare Pages Function
  (server-side only). Reads `STRIPE_SECRET_KEY` from the environment, maps
  `{plan, cycle}` to a Stripe price ID, creates a `mode: "subscription"`
  Checkout Session (the setup-fee price is mixed into `line_items` so it's
  billed once on the first invoice, per `spec/reviewcatcher-stripe-prices.md`),
  and returns `{ url }` for the browser to redirect to.
- `functions/_lib/stripe-prices.js` — the tier/cycle → Stripe price ID map.
  **Currently sandbox/test-mode IDs.** At go-live: create the same 3 products
  in the Live Stripe account and swap the IDs in this one file.
- The pay button in `checkout.astro` is enabled only once both consent
  checkboxes are checked (existing gate), then POSTs the form + plan/cycle to
  the function above and redirects to the returned Stripe URL. Errors surface
  inline above the button.
- `?plan=enterprise` never reaches this endpoint — it's rejected server-side
  too, as a second guard behind the client-side `/#start` redirect.

**Verified:** ran `wrangler pages dev` locally with a placeholder secret key —
confirmed the endpoint is reachable, request/price-ID formatting is correct
(Stripe's real API returned a clean 401 "Invalid API Key" for basic/mid/
premium, meaning the request itself was well-formed), and enterprise/invalid-
plan/malformed-body all fail fast with a 400 without calling Stripe.
**Not yet verified:** an actual successful session (needs a real test-mode
`STRIPE_SECRET_KEY`, which wasn't available to test with) — run one end-to-end
purchase in Stripe test mode before treating this as launch-ready, and confirm
the setup fee actually lands on the first invoice as expected.

To test locally with a real test key:
```bash
cp .dev.vars.example .dev.vars   # then fill in your sk_test_... key
npm run preview:functions        # builds + runs wrangler pages dev
```

Still needed: a real Stripe Elements/Payment Element mount in the "Payment"
card (currently the placeholder shown in the mockup) if you want card entry
on-page rather than relying on Stripe's own hosted Checkout page after
redirect — Checkout itself already collects payment details, so this is
optional polish, not a blocker.

## What's still a TODO

- Location pages (`/reviews-cork`, `/reviews-galway`, …) — **deliberately not
  built.** A templated page that only swaps the town name won't rank for local
  search (Google treats that as thin/doorway content) — it needs genuinely
  unique content per town, which is a content decision, not a code one. The
  homepage's Ireland-wide positioning + towns list covers this for now.
  Revisit only once specific towns are picked worth writing real content for.
- All legal pages are real content now: `privacy.astro`, `compliance.astro`,
  `ai-statement.astro`, `complaints.astro`, `contact.astro`, `terms.astro`
  (from `spec/reviewcatcher-legal-pages.md` + `spec/reviewcatcher-terms.md`)
  and `dpa.astro` (from `spec/reviewcatcher-dpa-template.md`) — strong drafts,
  flagged for solicitor review before go-live, not legal advice. `/dpa` shows
  the standard terms every client signs; the Controller-side fields get filled
  in on the copy sent for signature during onboarding, not on the public page.
  **Open item:** Annex B (sub-processors) on `/dpa` has two real TODOs — the
  SMS delivery provider and the AI provider used for review replies are both
  still unconfirmed, and the table says so on the live page. Fill those in
  (and confirm n8n Cloud's hosting region) before this DPA is accurate enough
  to send for signature.
- `src/config/site.config.ts` — contact phone and RBN status are set; Cal.com
  was removed (not used — the lead form is a plain form, not an embed).
- Stripe products/prices are wired (see above); the `checkout.session.completed
  → n8n` onboarding webhook is Stripe/n8n dashboard configuration, not
  something built in this repo (build-spec-v2 §6).
- Lead form (`/#start`) is wired and verified — POSTs directly to the n8n
  production webhook (`PUBLIC_N8N_LEAD_WEBHOOK_URL`, see `.env.example`) and
  shows the "thanks" view on a real `200`. Tested end-to-end against the live
  workflow: got back `{"success":true,"message":"Lead received"}`. Turnstile
  isn't on it yet — add whenever you want spam protection (build-spec-v2 §8).
- The n8n delivery engine itself (build-spec-v2 §7) — SMS requests, follow-ups,
  reactivation campaigns, AI review replies via Google Business Profile
  Manager access. This lives outside the Astro repo entirely.

## Deploying to Cloudflare Pages

1. Push this repo to GitHub.
2. In the Cloudflare dashboard: Pages → Create project → connect the GitHub repo.
   - Build command: `npm run build`
   - Build output directory: `dist`
3. Add environment variables in the Pages project settings (never commit them
   — see `.env.example` / `.dev.vars.example` for the full list with notes):
   `STRIPE_SECRET_KEY`, `PUBLIC_N8N_LEAD_WEBHOOK_URL`, `PUBLIC_CF_BEACON_TOKEN`
   (from the Web Analytics tab once the site is added there), and later
   `TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` once Turnstile is added.
4. Enable **Web Analytics** for the project in the Cloudflare dashboard, copy the
   beacon token into `PUBLIC_CF_BEACON_TOKEN`.
5. Point `reviewcatcher.ie` at Cloudflare Pages by adding the CNAME/A records
   Cloudflare gives you in the **LetsHost** DNS zone — DNS itself stays at
   LetsHost for now. (Optional, later: migrate nameservers to Cloudflare to
   consolidate DNS there too — carry over the Google Workspace MX records if
   you do.)
6. Confirm HTTPS, test on a real iPhone (Safari) and Android (Chrome), submit
   the sitemap to Google Search Console.

## Forking for a new vertical

1. Copy this repo.
2. Edit `src/config/site.config.ts` (business name, contact, pricing, towns, links).
3. Edit `src/styles/tokens.css` (brand colors) and `public/favicon.svg`.
4. Swap the business details on the legal pages and the DPA.
5. New Stripe products under the same Stripe account; new n8n webhooks following
   the same patterns (lead capture, Stripe → onboarding).
6. New Cloudflare Pages project + Web Analytics site under the same Cloudflare
   account; point the new domain the same way (§ Deploying, above).
7. New GitHub repo, push, connect to Pages.

Standing platform list, reused unchanged for every future build: **Astro**
(build), **Stripe** (money), **n8n** (automation), **Cal.com** (booking),
**Cloudflare** (hosting, analytics, DNS, Turnstile, serverless), **GitHub** (code).
