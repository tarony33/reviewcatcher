# ReviewCatcher — Stripe Price Mapping (for the checkout wiring)

**⚠️ These are SANDBOX / TEST price IDs.** They only work in test mode. When you go live, recreate the three products in the Live account (same recipe) and swap in the new live IDs. Keep both sets in environment variables, not hard-coded — one file to change at go-live.

## The mapping

| Tier | Cycle | Amount | Stripe Price ID |
|---|---|---|---|
| Basic | Monthly | €149 | `price_1Tyw8c807IWGWhTDW3vWIcGp` |
| Basic | Annual | €1,490 | `price_1TywD9807IWGWhTDeGmTAQNp` |
| Basic | Setup (one-off) | €199 | `price_1TywD9807IWGWhTDA3238HAB` |
| Mid | Monthly | €279 | `price_1TywC0807IWGWhTD4azolbxC` |
| Mid | Annual | €2,790 | `price_1TywC0807IWGWhTDtxbBPsPV` |
| Mid | Setup (one-off) | €249 | `price_1TywC0807IWGWhTDdR7p7qnP` |
| Premium | Monthly | €499 | `price_1TywGT807IWGWhTD2ay1Sw1F` |
| Premium | Annual | €4,990 | `price_1TywHR807IWGWhTDf8V7sfTe` |
| Premium | Setup | €0 | *(omit — see note)* |

Product IDs: Basic `prod_UytwOECjVB44SF` · Mid `prod_Uyu0yIuG0tfsd4` · Premium `prod_Uyu48pTcRCyMHj`

## Config object

```js
// SANDBOX price IDs — swap for live IDs at go-live (keep in env vars)
const STRIPE_PRICES = {
  basic:   { monthly: "price_1Tyw8c807IWGWhTDW3vWIcGp", annual: "price_1TywD9807IWGWhTDeGmTAQNp", setup: "price_1TywD9807IWGWhTDA3238HAB" },
  mid:     { monthly: "price_1TywC0807IWGWhTD4azolbxC", annual: "price_1TywC0807IWGWhTDtxbBPsPV", setup: "price_1TywC0807IWGWhTDdR7p7qnP" },
  premium: { monthly: "price_1TywGT807IWGWhTD2ay1Sw1F", annual: "price_1TywHR807IWGWhTDf8V7sfTe", setup: null },
};
```

## Checkout wiring logic

When a customer picks a tier + cycle on `/checkout`:
- Create a Stripe Checkout **subscription** session using `STRIPE_PRICES[tier][cycle]` as the recurring line item.
- If `STRIPE_PRICES[tier].setup` is set, add the one-off setup fee **to the first invoice** (via Checkout's `add_invoice_items`, so it's charged once alongside the first subscription payment).
- **Premium** has no setup (`setup: null`) → subscription line only, no setup added.
- `?plan=enterprise` never reaches Stripe → route to the enquiry form.

## Two quick tidy-ups in Stripe (optional, not blockers)

1. **Premium's €0 setup price** — harmless, but a €0.00 line looks odd on an invoice. Cleanest to leave it out of the checkout (config already has `setup: null`); you can also archive that €0 price in Stripe to keep the product tidy.
2. **Typo** — Mid's setup price description reads "Setup (on-off)". Internal only, doesn't affect anything; fix it if you want it clean.

## Note on tax behaviour
The prices are set to tax behaviour "unspecified", which is fine while Stripe Tax is off and you're not VAT-registered. Revisit (set inclusive/exclusive) if/when you register for VAT.
