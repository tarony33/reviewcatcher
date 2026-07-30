// SANDBOX / TEST MODE Stripe price IDs — spec/reviewcatcher-stripe-prices.md.
// They only work with a test-mode STRIPE_SECRET_KEY. At go-live: recreate the
// three products in the Live Stripe account (same recipe) and replace the IDs
// below — this is the one file to change.
//
// Premium has no setup price (setup is included in the plan) — `setup: null`
// means create-checkout-session.js won't add a second line item for it.
export const STRIPE_PRICES = {
  basic: {
    monthly: "price_1Tyw8c807IWGWhTDW3vWIcGp",
    annual: "price_1TywD9807IWGWhTDeGmTAQNp",
    setup: "price_1TywD9807IWGWhTDA3238HAB",
  },
  mid: {
    monthly: "price_1TywC0807IWGWhTD4azolbxC",
    annual: "price_1TywC0807IWGWhTDtxbBPsPV",
    setup: "price_1TywC0807IWGWhTDdR7p7qnP",
  },
  premium: {
    monthly: "price_1TywGT807IWGWhTD2ay1Sw1F",
    annual: "price_1TywHR807IWGWhTDf8V7sfTe",
    setup: null,
  },
};
