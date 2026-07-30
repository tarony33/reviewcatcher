// Central business config — the fork point. A new vertical = edit this file
// (+ brand tokens in src/styles/tokens.css) and swap the domain. No business
// specifics should be hard-coded in components or pages.
//
// Source of truth: spec/reviewcatcher-offer-sheet.md + spec/reviewcatcher-mockup.html (v2)

export const siteConfig = {
  name: "ReviewCatcher",
  tagline: "More reviews, higher ranking.",
  url: "https://reviewcatcher.ie",

  contact: {
    email: "support@reviewcatcher.ie",
    phone: "+353 (87) 032 0993",
    address: "Rush, Co. Dublin, Ireland",
  },

  // Ireland-wide, no separate GBP storefront per town — see build-spec-v2 §5 /
  // §3 (location pages are a later phase, not built yet).
  areaServed: "Ireland",
  towns: [
    "Dublin",
    "Cork",
    "Galway",
    "Limerick",
    "Waterford",
    "Kilkenny",
    "Drogheda",
  ],
  townsNote: "and nationwide",

  // 4-tier pricing, locked structure per spec/reviewcatcher-offer-sheet.md.
  // Prices are the agreed starting points — adjust freely, keep the shape.
  pricing: {
    tiers: [
      {
        id: "basic",
        name: "Basic",
        tagline: "The essentials to start climbing. Single location, sole traders.",
        monthlyEUR: 149 as number | null,
        annualEUR: 1490 as number | null,
        setupEUR: 199 as number | null,
        setupNote: "+ €199 setup · no lock-in",
        featured: false,
        enquireOnly: false,
        badge: undefined as string | undefined,
        featuresIntro: undefined as string | undefined,
        features: [
          "Automated review requests",
          "Smart follow-up reminders",
          "One reactivation campaign",
          "Up to 50 requests / month",
        ],
      },
      {
        id: "mid",
        name: "Mid",
        tagline: "Everything on autopilot. Single location, established businesses.",
        monthlyEUR: 279 as number | null,
        annualEUR: 2790 as number | null,
        setupEUR: 249 as number | null,
        setupNote: "+ €249 setup & kickstart",
        featured: true,
        enquireOnly: false,
        badge: "Most popular" as string | undefined,
        featuresIntro: "Everything in Basic, plus:" as string | undefined,
        features: [
          "AI replies to every review",
          "Up to 150 requests / month",
          "Priority support",
        ],
      },
      {
        id: "premium",
        name: "Premium",
        tagline: "For multi-location businesses. Everything, across all your sites.",
        monthlyEUR: 499 as number | null,
        annualEUR: 4990 as number | null,
        setupEUR: 0 as number | null,
        setupNote: "setup included · no lock-in",
        featured: false,
        enquireOnly: false,
        badge: undefined as string | undefined,
        featuresIntro: "Everything in Mid, plus:" as string | undefined,
        features: [
          "Up to 5 locations",
          "Consolidated reporting",
          "Higher request volume",
        ],
      },
      {
        id: "enterprise",
        name: "Enterprise",
        tagline: "Franchises, groups & agencies. Custom scope, built around you.",
        monthlyEUR: null as number | null,
        annualEUR: null as number | null,
        setupEUR: null as number | null,
        setupNote: "priced on application",
        featured: false,
        enquireOnly: true,
        badge: undefined as string | undefined,
        featuresIntro: "Everything in Premium, plus:" as string | undefined,
        features: [
          "Unlimited locations",
          "Dedicated account manager",
          "Monthly strategy call",
        ],
      },
    ],
    annualNote: "All plans month-to-month. Prefer to save? Pay annually and get roughly 2 months free.",
  },

  // Results-only wording, deliberately no customer-count/process condition —
  // per spec/reviewcatcher-offer-sheet.md, qualification happens upstream at
  // the free review audit, not in the public guarantee text.
  guarantee: {
    headline: "Reviews in 30 days, or your money back.",
    body: "If you receive no new Google reviews in your first 30 days on the service, we refund your setup fee in full.",
    // Internal note: refund capped to the setup fee only, never monthly fees.
    // Full terms are on /terms §5.
  },

  legal: {
    pagesLastUpdated: "July 2026", // shared "Last updated" date across privacy/compliance/AI/complaints/terms/dpa
    registrationStatus: "RBN — registration pending", // used inline after "registered in Ireland (…)" on legal pages
  },

  // Rendered as real on-page content in <FAQ /> and reused for the FAQPage
  // JSON-LD in index.astro — single source of truth, keep in sync by editing here.
  faq: [
    {
      q: "Do you need my Google login?",
      a: "Never. You add ReviewCatcher as a Manager on your Google Business Profile — a 30-second step you do yourself. We reply to reviews on your behalf without ever seeing your password, and you can remove our access any time.",
    },
    {
      q: "Is it against Google's rules to ask for reviews?",
      a: "No. Asking is allowed and encouraged. What breaks the rules is incentivising reviews or only asking your happy customers. We ask every customer the same way, with no incentive — fully within Google's guidelines.",
    },
    {
      q: "How is my customers' data protected?",
      a: "Your customer list stays yours. We only ever use it to send review requests on your behalf, under a signed Data Processing Agreement, in line with GDPR. It's never sold or used for anything else, and every message has a one-tap opt-out.",
    },
    {
      q: "Do you work with businesses outside Dublin?",
      a: "Yes — ReviewCatcher works for businesses right across Ireland, and multi-location groups too. Because it runs remotely, we can set you up wherever you're based.",
    },
    {
      q: "Is there a lock-in contract?",
      a: "Never. Every plan is month-to-month. We want you to stay because you're winning more customers, not because a contract makes you.",
    },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
export type PricingTier = (typeof siteConfig.pricing.tiers)[number];
