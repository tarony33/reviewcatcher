# ReviewCatcher — Offer Sheet (locked)

The definitive tier definitions, guarantee, and what has to be *built and tested* before each tier is sold. Prices are the agreed starting points — adjust freely; the structure is what matters. Setup fees are one-off; monthly is recurring, no lock-in; annual ≈ 2 months free.

---

## Tiers

### Basic — €149/mo + €199 setup
*Single location. Sole traders and one-person teams.*
- Automated review requests (personalised, by SMS)
- Smart follow-up reminders
- One reactivation campaign to existing customers
- Up to 50 requests / month

### Mid ⭐ — €279/mo + €249 setup  *(the target)*
*Single location. Established businesses.*
- Everything in Basic, plus:
- **AI replies to every review** (via Google Business Profile manager access — see notes)
- Up to 150 requests / month
- Priority support

### Premium — €499/mo, setup included
*Multi-location businesses.*
- Everything in Mid, plus:
- Up to 5 locations
- Consolidated reporting across locations
- Higher request volume

### Enterprise — Enquire (priced on application)
*Franchises, groups, agencies. Scoped and quoted per deal — nothing pre-promised.*
- Everything in Premium, plus:
- Unlimited locations
- Dedicated account manager
- Monthly strategy call

---

## Guarantee (customer-facing wording)

> **Reviews in 30 days, or your setup is free.** If you don't get a single new Google review in your first 30 days, we refund your setup fee in full — provided you give us at least 50 contactable past customers you have permission to message.

Once it's true, add: *"— and we've never had to."*

**Internal notes:** refund is capped to the **setup fee only** (never monthly fees). The 50-contact condition ties the promise to the one input you don't otherwise control — a client with no list can't be guaranteed an outcome. Put the full terms on the site's Terms page.

---

## Deliverability status — build/test before selling each tier

| Feature | Status | Note |
|---|---|---|
| Automated requests + follow-ups | Core — must be live | The heart of the n8n engine |
| Reactivation campaign | Core — must be live | Also what the guarantee rests on |
| AI review replies (Mid+) | Manager-access dependent | Owner adds you as a **Manager** on their Google Business Profile — no login/password sharing. Full automation needs Google Business Profile **API access** (apply early — approval takes time); until then, n8n alerts you and drafts the reply for one-click manual posting via manager access |
| Multi-location (Premium) | Build before selling Premium | Just replicates the single-location flow per site + reporting |
| Enterprise features | Scoped per deal | Never auto-sold; the "Enquire" route protects you |
| Personalised images / social posts | **Parked** | Removed from all tiers for now; add later only if tooling is confirmed |

**Rule:** actively sell only the tier whose every feature is built and tested. For the first customer, that's **Basic / Mid core**.

**Trust line to use in sales + the DPA:** *"We never ask for your login — you grant us secure, revocable Manager access, and can remove it any time."*
