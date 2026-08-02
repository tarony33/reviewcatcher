// SANDBOX / TEST MODE Stripe price IDs — spec/reviewcatcher-stripe-prices.md.
// They only work with a test-mode STRIPE_SECRET_KEY. At go-live: recreate the
// three products in the Live Stripe account (same recipe) and replace the IDs
// below — this is the one file to change.
//
// Keys renamed starter/growth (from basic/mid) to match the tier rename —
// the Stripe Price IDs themselves are unchanged, same underlying prices.
//
// Premium has no setup price (setup is included in the plan) — `setup: null`
// means create-checkout-session.js won't add a second line item for it.
export const STRIPE_PRICES = {
  starter: {
    monthly: "price_1Tyw8c807IWGWhTDW3vWIcGp",
    annual: "price_1TywD9807IWGWhTDeGmTAQNp",
    setup: "price_1Tzzsf807IWGWhTD77O1w19m", // standalone Setup & Kickstart product
  },
  growth: {
    monthly: "price_1TywC0807IWGWhTD4azolbxC",
    annual: "price_1TywC0807IWGWhTDtxbBPsPV",
    setup: "price_1TzzoQ807IWGWhTDnr2xTIv8", // standalone Setup & Kickstart product
  },
  premium: {
    monthly: "price_1TywGT807IWGWhTD2ay1Sw1F",
    annual: "price_1TywHR807IWGWhTDf8V7sfTe",
    setup: null,
  },
};
