// Cloudflare Pages Function — POST /api/create-checkout-session
// Creates a Stripe Checkout Session server-side (secret key never touches the
// client) and returns its URL for the browser to redirect to.
//
// Requires STRIPE_SECRET_KEY in the Pages project's environment variables
// (or a local .dev.vars file for `wrangler pages dev` — see README).
import { STRIPE_PRICES } from "../_lib/stripe-prices.js";

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function onRequestPost({ request, env }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid request body." }, 400);
  }

  const { plan, cycle, businessName, name, email, phone } = body || {};

  if (plan === "enterprise") {
    return json({ error: "Enterprise is enquiry-only — this endpoint doesn't handle it." }, 400);
  }

  const tierPrices = STRIPE_PRICES[plan];
  if (!tierPrices || (cycle !== "monthly" && cycle !== "annual")) {
    return json({ error: "Unknown plan or billing cycle." }, 400);
  }

  if (!env.STRIPE_SECRET_KEY) {
    return json(
      { error: "Stripe isn't configured on this environment (missing STRIPE_SECRET_KEY)." },
      500
    );
  }

  const recurringPriceId = tierPrices[cycle];
  const setupPriceId = tierPrices.setup;
  const origin = new URL(request.url).origin;

  const params = new URLSearchParams();
  params.set("mode", "subscription");
  params.set("line_items[0][price]", recurringPriceId);
  params.set("line_items[0][quantity]", "1");
  if (setupPriceId) {
    // Mixing a one-time price into a subscription-mode Session's line_items
    // is how Stripe Checkout charges a one-off setup fee alongside the first
    // subscription invoice, without a separate manual invoice step.
    params.set("line_items[1][price]", setupPriceId);
    params.set("line_items[1][quantity]", "1");
  }
  params.set("success_url", `${origin}/thank-you?session_id={CHECKOUT_SESSION_ID}`);
  params.set("cancel_url", `${origin}/checkout?plan=${encodeURIComponent(plan)}`);
  if (email) params.set("customer_email", email);
  // Metadata for the checkout.session.completed -> n8n onboarding webhook (build-spec-v2 §6).
  params.set("metadata[plan]", plan);
  params.set("metadata[cycle]", cycle);
  if (businessName) params.set("metadata[business_name]", businessName);
  if (name) params.set("metadata[contact_name]", name);
  if (phone) params.set("metadata[contact_phone]", phone);

  const stripeRes = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  const data = await stripeRes.json();

  if (!stripeRes.ok) {
    return json(
      { error: data?.error?.message || "Stripe couldn't create the checkout session." },
      stripeRes.status
    );
  }

  return json({ url: data.url });
}
