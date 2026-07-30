// Cloudflare Pages Function — POST /api/submit-lead
// Verifies the Turnstile token server-side (the client-side widget alone
// proves nothing — a bot can just skip it and POST straight to n8n), then
// forwards the lead to the n8n webhook. Neither the Turnstile secret nor the
// n8n webhook URL are ever exposed to the browser.
//
// Requires TURNSTILE_SECRET_KEY and N8N_LEAD_WEBHOOK_URL in the environment
// (Pages project env vars, or .dev.vars locally — see README).

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

  const { businessName, name, phone, email, turnstileToken } = body || {};

  if (!businessName || !email) {
    return json({ error: "Business name and email are required." }, 400);
  }
  if (!turnstileToken) {
    return json({ error: "Please complete the verification check." }, 400);
  }
  if (!env.TURNSTILE_SECRET_KEY) {
    return json({ error: "Verification isn't configured on this environment (missing TURNSTILE_SECRET_KEY)." }, 500);
  }
  if (!env.N8N_LEAD_WEBHOOK_URL) {
    return json({ error: "Lead capture isn't configured on this environment (missing N8N_LEAD_WEBHOOK_URL)." }, 500);
  }

  const verifyParams = new URLSearchParams();
  verifyParams.set("secret", env.TURNSTILE_SECRET_KEY);
  verifyParams.set("response", turnstileToken);
  const clientIp = request.headers.get("CF-Connecting-IP");
  if (clientIp) verifyParams.set("remoteip", clientIp);

  const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: verifyParams.toString(),
  });
  const verifyData = await verifyRes.json();

  if (!verifyData.success) {
    return json({ error: "Verification failed — please try again." }, 400);
  }

  const n8nRes = await fetch(env.N8N_LEAD_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      businessName,
      name,
      phone,
      email,
      source: "website-lead-form",
      submittedAt: new Date().toISOString(),
    }),
  });

  if (!n8nRes.ok) {
    return json({ error: "The form couldn't be submitted. Please try again." }, 502);
  }

  return json({ success: true });
}
