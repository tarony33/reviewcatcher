// Central business config — the fork point. A new vertical = edit this file
// (+ brand tokens + legal-page details) and swap the domain. No business
// specifics should be hard-coded in components or pages.

export const siteConfig = {
  name: "ReviewCatcher",
  tagline: "More reviews, higher ranking.",
  url: "https://reviewcatcher.ie",

  contact: {
    email: "hello@reviewcatcher.ie", // TODO: confirm real inbox
    phone: "", // TODO
  },

  serviceTowns: [
    // TODO: fill from reviewcatcher-website-copy.md — North Dublin towns served
  ],

  pricing: {
    setupOneOff: { amountEUR: 249, label: "Setup + kickstart" },
    monthly: { amountEUR: 199, label: "Monthly plan", interval: "month" },
    annual: { amountEUR: 1639, label: "Annual plan", interval: "year" }, // €149 x 11
  },

  booking: {
    calComLink: "", // TODO: Cal.com booking link
  },

  legal: {
    dpaLastUpdated: "", // TODO
  },
} as const;

export type SiteConfig = typeof siteConfig;
