# Herd & Field — product audit

_1 November 2026. Covers the public website, customer dashboard, investor brief and Farm Ops._

## Working well

- **Honest positioning.** Every page is clear that nothing is for sale yet; no invented animals, customers or returns.
- **Farm Ops is real software.** 300-bed map, bulk planting and harvest logging, stock ledger, livestock register,
  health/weight/feeding/costs, sales, ownership, leads, KES ledger. Tested end to end.
- **Security foundations.** Row-level security on every table, role protection, staff-only Farm Ops, legal-approval
  gate on public programmes, spam trap on both forms.
- **Live proof.** Public figures come straight from Farm Ops records (shown only once real work is logged).
- **Design system.** One type scale (Newsreader + Instrument Sans), one spacing rhythm, restrained palette.
- **Structure.** Proper multi-page site: Home, How it works, Livestock (+ a page per animal), Qurbani, The farm,
  Investors, Privacy.

## Not working / blocked

| Issue | Impact | Fix |
| --- | --- | --- |
| **Not connected to Supabase** | In production, registrations, sign-in, records and photos have nowhere to go | Create the Supabase project, run `supabase/migrations/*`, set env vars, deploy |
| **Not deployed** | No public URL | Deploy to Vercel (or similar) with a `.co.ke` domain |
| **Breed/stock photos** | Buyers can't see *our* farm or animals | Photograph both farms, beds, housing, team |
| **No contact details** | The single biggest trust gap for Kenyan buyers | Fill `src/content/contact.ts` (phone/WhatsApp/email) |
| **Second farm unnamed** | Shown as "Second farm" | Confirm its location/name in `src/content/site.ts` |

## Missing

1. **Team / About** — names, roles, photos of the people behind Tangama (trust).
2. **Photo uploads in Farm Ops** — the storage bucket and table exist; the upload screen does not.
3. **Animal-level public listings** — when animals arrive, each needs its own public page (photo, ID, weight, price).
4. **Notifications** — SMS/WhatsApp to staff on new leads; to owners on new weigh-ins.
5. **Customer onboarding flow** — staff create an account, assign animals, send the sign-in invite.
6. **Documents** — agreement and statement PDFs in the customer dashboard (table and bucket exist).
7. **M-Pesa (Daraja)** — only after legal sign-off and agreements are ready.
8. **Swahili version** of the public site.
9. **Analytics** — privacy-friendly page and conversion tracking.
10. **Automated tests** in CI (forms, RLS, Farm Ops flows) — currently tested manually.

## Needs improving

- **Facilities copy** is generic; add specifics (number of pens, water source, staff on site, security).
- **Farm page** should show both farms separately with their own photos once available.
- **Qurbani** needs dates, animal options and pricing approach as soon as they're decided.
- **Investor brief** needs a team section and, later, monthly progress reports generated from Farm Ops.
- **Bed sections** are assumed as 3 × 100 (A–C). Confirm the real layout across the two farms.

## Recommended order

1. **Go live (1–2 weeks):** Supabase + deploy + domain; contact details; real photos; second-farm details; team section.
2. **Operate (2–4 weeks):** daily Farm Ops recording; photo uploads; lead notifications; monthly farm update.
3. **Prepare launch (before Eid 2027):** Qurbani details and pricing; agreement template with a lawyer; customer
   onboarding and documents; analytics.
4. **Launch & scale:** M-Pesa after legal sign-off; public animal listings; Swahili site; investor portal (after legal structure).
