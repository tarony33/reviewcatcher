# ReviewCatcher — Build Specification (master brief for Claude Code) · v2

Hand this to Claude Code together with the finished mockups and content files. The mockups are now the **source of truth for layout and copy** — build to match them; this spec covers stack, wiring, deploy, and replicability.

Companion files:
- `reviewcatcher-mockup.html` — finished landing page (build components to match)
- `reviewcatcher-checkout.html` — finished checkout (cart + payment + compliance gating)
- `reviewcatcher-offer-sheet.md` — locked tiers + guarantee (source for prices/features)
- `reviewcatcher-legal-pages.md` — privacy, compliance, AI statement, complaints, contact
- `reviewcatcher-dpa-template.md` — client DPA (linked from footer, sent on onboarding)
- `reviewcatcher-website-copy.md` — copy + FAQ + JSON-LD schema

## 1. Goals
Professional layout (match mockups) · maxed technical SEO/GEO · all legal pages linked + cookie consent · full payments (most methods, recurring + one-off) via Stripe · lead capture + self-serve checkout · replicable across verticals by editing config only.

## 2. Stack
- **Framework:** Astro (static, zero-JS default, islands for interactive bits)
- **Styling:** carry the mockups' design tokens into one central file (`--brand:#185FA5` etc.), Tailwind or plain CSS
- **Payments:** Stripe Checkout + Stripe Billing (subscriptions)
- **Automation / funnels:** n8n via webhooks
- **Host + analytics + DNS + serverless + bot-protection:** Cloudflare (Pages, Web Analytics, DNS, Workers, Turnstile) — one platform, learn once, reuse every build
- **Code:** GitHub

## 3. Pages (match the mockups)
- `/` home — hero, problem, how-it-works, features, **4-tier pricing**, guarantee, lead form, FAQ, footer
- `/checkout` — reads `?plan=basic|mid|premium`, monthly/annual toggle, Stripe payment, two compliance tickboxes gating the pay button. `?plan=enterprise` → redirect to the enquiry form
- `/privacy` `/compliance` `/ai-statement` `/complaints` `/contact` — from legal-pages file
- `/dpa` — render/link the DPA
- `/thank-you` — post-lead and post-payment confirmation
- Location pages (`/reviews-cork`, `/reviews-galway`, …) — templated, one per major city/county for local SEO. Same layout, swapped location string.

## 4. Pricing / payments (from the offer sheet)
- Stripe products & prices: **Basic** (€149/mo, €1490/yr, €199 setup), **Mid** (€279/mo, €2790/yr, €249 setup), **Premium** (€499/mo, €4990/yr, setup included). Enterprise = no product; enquiry only.
- Setup fee added as a one-off line item on the first invoice of the subscription.
- Enable methods: cards, Apple/Google Pay, Link (automatic) + SEPA Direct Debit, iDEAL, Bancontact from the dashboard.
- Checkout is Stripe-hosted — no card data touches the site.
- **Secrets (Stripe keys, n8n webhook URLs) live in Cloudflare env vars — never in the repo.**

## 5. SEO / GEO
- Per-page title + meta description (home: `ReviewCatcher | Get More Google Reviews — for Businesses Across Ireland`)
- Inject both JSON-LD blocks from the copy file (update areaServed to Country: Ireland); keep the FAQ as real on-page content
- Auto sitemap + robots; semantic headings; alt text; Core Web Vitals green (Astro's zero-JS helps)
- Location pages carry the local-SEO weight (a remote service has limited Google Business Profile eligibility)
- Post-launch: Google Search Console + Rich Results Test

## 6. Lead + funnel automation (n8n)
- Lead form → n8n webhook → alert Anthony + store lead + confirmation to prospect
- Stripe `checkout.session.completed` → n8n onboarding: welcome, **send DPA for signature**, request customer list + lawful-basis confirmation, start setup

## 7. The delivery engine (n8n — this is the actual product)
Separate from the site. Workflows:
- Trigger (job/visit complete, or list upload) → personalised SMS request → timed follow-up reminder
- Reactivation campaign to existing list (with opt-out honoured)
- **AI review replies (Mid+):** owner grants **Manager access** on their Google Business Profile; read new reviews + post AI-drafted replies via the Business Profile API (apply for API access early; manual one-click via manager access until granted). No passwords, ever.
- Test end-to-end on your own number before any client goes live.

## 8. Compliance wiring
Cookie consent (Cloudflare analytics is cookieless — light banner or none) · all legal pages in footer · DPA at `/dpa` + emailed on onboarding · two checkout tickboxes (Terms/Privacy/DPA + lawful-basis confirmation).

## 9. Deploy
1. Push repo to GitHub → connect Cloudflare Pages (auto-build on push)
2. Add env vars in Cloudflare (Stripe keys, n8n webhook URLs)
3. Point `reviewcatcher.ie` at Cloudflare Pages via LetsHost DNS records — **preserve existing Google Workspace MX/email records**
4. Confirm HTTPS; test full purchase in Stripe test mode; test on a real iPhone (Safari) + Android (Chrome); submit to Search Console

## 10. Replicability
All business specifics (copy, prices, towns, brand tokens, contact) in config/content — none hard-coded in components. New vertical = copy repo, edit config + tokens + copy, swap legal-page details, point a new domain, add Stripe products. Document the fork steps in the README.
