# Tangama Livestock — product & marketing strategy

_Last updated: 31 October 2026. Pre-launch: 4 acres under cultivation in Isinya, a further 5 acres planned
for early 2027. No animals, sales, investments or payments yet._

## 1. Who we serve, and what each needs to decide

| Audience | What they want | What earns their trust | Where they go |
| --- | --- | --- | --- |
| **Managed-ownership buyers** — Nairobi/Kajiado professionals, people with land-less ambitions to own livestock | A real, specific animal, cared for properly, without the hassle | A named farm they can visit, written terms, records they can check, a phone number that answers | `/` → `/early-access` |
| **Qurbani buyers** — households and community committees, every Eid al-Adha | A healthy animal that meets Qurbani requirements, reserved early, delivered on time | Proof of health and age, a clear price, reliable collection/delivery | `/qurbani` |
| **Investors & chamas** — Kenyan individuals, chamas, SACCOs, companies | Back a credible, well-run business early | Real progress, honest stage, governance, people they can meet | `/investors` |

Keep the three audiences separate in messaging. Customer pages never use investment language;
investor pages never imply that buying an animal is an investment.

## 2. Site structure

```
/                Home — routes each audience in the first scroll
  Hero            Own livestock, raised on our land
  Three ways in   Managed ownership · Qurbani · Invest
  How it works    4 steps + "what your agreement will set out"
  Animals         Sheep · Goats · Cattle
  A day of care   The care routine
  The record      What owners will see
  The farm, live  Figures straight from Farm Ops
  Questions       Straight answers to buyers' real worries
/qurbani         Seasonal landing page (standards, reservation steps, FAQ)
/farm            Proof: location, acreage + expansion, live progress, the feed, visiting
/investors       Investor brief + expression of interest (no offer)
/early-access    Registration (customers)
/dashboard       Owners' records (after launch) · /demo shows the design with sample data
/admin           Farm Ops (staff only) — also the source of every public "live" figure
```

## 3. Buyer confidence — what builds it

Pre-launch businesses can't ask for trust on promises alone. In order of impact:

1. **Live proof.** The site publishes aggregate figures straight from Farm Ops (beds planted, fodder
   harvested, field records). Keep recording daily — an empty or stale record undermines everything.
2. **A real, reachable team.** Add a phone/WhatsApp number and email in `src/content/contact.ts`
   (hidden until set). Add the people behind Tangama — names, roles, photos — to the farm page.
3. **Our own photography.** Replace breed photos with photos of our farm, beds, team and, later,
   our animals.
4. **Written terms before payment.** The site commits that every agreement will set out price, care
   fee, what's included, illness/death, collection/sale and exit. Prepare that agreement template with a
   lawyer before launch.
5. **Farm visits.** Invite registered buyers and investors to scheduled visit days.
6. **Verifiable credentials** (only once real): business registration, vet partner, any county permits.

## 4. Marketing strategy

**Positioning:** _Livestock you can see. Records you can trust._ We are not a get-rich scheme — we
are a working farm that writes everything down.

**Sequence**

1. **Now → early 2027 — build the list and the proof.** Monthly farm update (WhatsApp broadcast +
   social) generated from Farm Ops figures: beds planted, harvest kg, expansion progress. Every post links
   to `/farm`. Goal: early-access and investor registrations.
2. **Before Eid al-Adha 2027 — Qurbani as the first product.** It's a purchase Kenyans already make
   every year, it's seasonal (a natural launch date), and it proves care + delivery before longer
   ownership programmes. Work with mosque committees and community WhatsApp groups in Nairobi and
   Kajiado. Registered buyers hear first.
3. **After legal review — managed ownership.** Launch with a small first cohort from the waitlist, with
   farm visit days.

**Channels (priority order):** WhatsApp (broadcast lists, status, groups) · referrals from registered
buyers · chamas and SACCOs (presentations, not ads) · mosque and community committees (Qurbani) ·
farm visit days · Facebook/Instagram (photo-led farm diary) · Google Business Profile for "Isinya".

**Measure:** registrations by interest, investor expressions of interest, visit-day attendance,
WhatsApp list size, and the share of registrations from referrals.

## 5. The investing platform — phased

| Phase | When | What | Status |
| --- | --- | --- | --- |
| **A. Interest** | Now | Investor brief, expressions of interest, live progress, leads in Farm Ops | Built |
| **B. Structure** | After Kenyan legal advice (incl. Capital Markets Authority rules) | Decide the vehicle (private equity raise vs. asset-backed programmes), offer documents, KYC/AML process | Not started — legal first |
| **C. Investor portal** | After B | Signed-in investor area: documents, capital account, quarterly reports generated from Farm Ops and finance records | Design ready to extend from the customer dashboard |

No capital is accepted, and no feature that takes money is built, until Phase B is signed off.

## 6. Language guidelines

- **Plain and specific.** "Weighed every month" beats "advanced growth monitoring". Use real numbers.
- **Honest about stage.** Say "planned", "will", "after launch". Never imply animals or offers exist.
- **Never on customer pages:** guaranteed, returns, profit, ROI, passive income, investment, yield.
- **Never anywhere:** "risk-free", "guaranteed", projected profits.
- **Kenyan voice.** KES, M-Pesa, chamas, counties; light Swahili where natural (Habari, Kondoo, Mbuzi,
  Ng'ombe). Consider a full Swahili version once the English copy settles.
- **Calm tone.** Short sentences, no exclamation marks, no hype.

## 7. Open items for the Tangama team

- [ ] Phone/WhatsApp and email for `src/content/contact.ts`
- [ ] Team names, roles and photos for the farm page
- [x] Our own farm photography (Nov 2026) — more animal photos as the herd arrives
- [ ] Confirm bed count after expansion (currently 120 beds, Sections A–C)
- [ ] Agreement template (managed ownership, Qurbani) reviewed by a lawyer
- [ ] Legal advice on the investment structure before Phase B
- [ ] Supabase project connected so registrations, records and photos persist in production
