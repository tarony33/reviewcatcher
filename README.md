# ReviewCatcher site

Astro + Tailwind, deployed to Cloudflare Pages. Built as a replicable
service-business site pipeline — see `reviewcatcher-build-spec.md` for the
full brief. This repo is instance #1; forking it stands up the next vertical.

## Local dev

Requires Node.js (LTS) and npm.

```bash
npm install
npm run dev
```

## What's still a TODO in this scaffold

The companion content files referenced in the build spec weren't available
when this was scaffolded, so pages ship as structural skeletons with `TODO`
markers instead of final copy:

- `src/pages/index.astro` — paste content from `reviewcatcher-website-copy.md`,
  including the two JSON-LD blocks (LocalBusiness/ProfessionalService + FAQPage).
- `src/pages/privacy.astro`, `compliance.astro`, `ai-statement.astro`,
  `complaints.astro`, `contact.astro` — paste from `reviewcatcher-legal-pages.md`.
- `src/pages/dpa.astro` — render/link `reviewcatcher-dpa-template.md`.
- `src/config/site.config.ts` — fill in service towns, phone, Cal.com link.
- Stripe Checkout wiring (products, payment methods, success redirect) — build-spec §6.
- Cal.com embed + lead-capture form → n8n webhook, Turnstile-protected — build-spec §7.
- Stripe → n8n webhook for the onboarding sequence — build-spec §7.

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
