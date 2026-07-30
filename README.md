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

## What's still a TODO

- `/checkout` (`src/pages/checkout.astro`) is built and verified — reads
  `?plan=basic|mid|premium` (`?plan=enterprise` redirects to `/#start`),
  monthly/annual toggle, two-checkbox consent gate. Still needs: a real Stripe
  Elements/Payment Element mount in place of the placeholder, and the pay
  button wired to actually create a Stripe Checkout session (build-spec-v2 §4).
- Location pages (`/reviews-cork`, `/reviews-galway`, …) — **deliberately not
  built.** A templated page that only swaps the town name won't rank for local
  search (Google treats that as thin/doorway content) — it needs genuinely
  unique content per town, which is a content decision, not a code one. The
  homepage's Ireland-wide positioning + towns list covers this for now.
  Revisit only once specific towns are picked worth writing real content for.
- `src/pages/privacy.astro`, `compliance.astro`, `ai-statement.astro`,
  `complaints.astro`, `contact.astro`, `terms.astro` are real content now
  (`spec/reviewcatcher-legal-pages.md` + `spec/reviewcatcher-terms.md`) —
  strong drafts, flagged for solicitor review before go-live, not legal
  advice. `dpa.astro` is still a placeholder — the DPA template hasn't been
  supplied yet.
- `src/config/site.config.ts` — fill in real contact phone (legal pages omit
  the phone line until it's set), Cal.com link (if kept), actual company
  registration number (RBN — currently "registration pending").
- Stripe products/prices + webhook wiring (build-spec-v2 §4, §6).
- Lead form + n8n webhook + Turnstile (build-spec-v2 §6) — currently a
  client-side-only toggle, not wired to anything.
- The n8n delivery engine itself (build-spec-v2 §7) — SMS requests, follow-ups,
  reactivation campaigns, AI review replies via Google Business Profile
  Manager access. This lives outside the Astro repo entirely.

## Deploying to Cloudflare Pages

1. Push this repo to GitHub.
2. In the Cloudflare dashboard: Pages → Create project → connect the GitHub repo.
   - Build command: `npm run build`
   - Build output directory: `dist`
3. Add environment variables in the Pages project settings (never commit them):
   `STRIPE_PUBLISHABLE_KEY`, `STRIPE_SECRET_KEY`, `N8N_LEAD_WEBHOOK_URL`,
   `N8N_STRIPE_WEBHOOK_URL`, `TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`,
   `PUBLIC_CF_BEACON_TOKEN` (from the Web Analytics tab once the site is added there).
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
