# Tangama Livestock

Livestock ownership and management platform from Tangama Farm in Isinya, Kajiado County.
Customers will be able to own professionally managed sheep, goats and cattle and follow each
animal's weights, health, feeding, photos and itemised costs from their phone.

**Current stage:** pre-launch. Two farms (2.17 and 2.5 acres, based in Isinya) with about 4 acres under
cultivation and a further 5 acres planned for early 2027, developing fodder (Sugargraze, Super Napier, alfalfa,
desmodium) across 300 beds in Sections A–C (100 each). No livestock, purchases, investments or payments are
offered. The product is built so that nothing implies otherwise.

## What's here

| Route | What it is |
| --- | --- |
| `/` | Public website: hero with app preview, record features, livestock categories, how it works, our farm, FAQ |
| `/early-access` | Interest registration (Supabase, or `.data/early-access.jsonl` in local dev) |
| `/sign-in` | Invite-only email magic-link sign-in (accounts are created by the team, never self sign-up) |
| `/dashboard/*` | Customer dashboard: Home, My Livestock, animal profile, Explore, Account. Shows real records only |
| `/demo/*` | The same dashboard with clearly labelled sample data, for design review |
| `/investors` | Investor brief for Kenyan investors and chamas: sourced market facts, model, honest status, roadmap, proposed governance, and an expression-of-interest form (no offer, no payments) |
| `/admin` | **Farm Ops** (staff only): overview, quick-record actions |
| `/admin/fodder` | Live map of the 300 beds, bulk planting and activity by bed range, per-bed history, stock ledger |
| `/admin/livestock` | Register animals (auto IDs `TGM-SH-0001`), weights, health, feeding, costs, sale/death/transfer, ownership |
| `/admin/customers` | Early-access leads, investor interest (call, WhatsApp, follow-up status) and customer accounts — admin only |
| `/admin/finance` | KES ledger, period totals, realised per-animal margins — admin only |

Farm Ops is fully separate from the customer platform: its own layout, navigation and role checks.
Workflows are connected: harvests can flow into fodder stock, feeding deducts stock per animal,
a sale updates the animal's status and posts income, and assigning an owner makes the animal
appear in that customer's dashboard.

## Stack

Next.js 16 (App Router, Cache Components) · TypeScript · Tailwind CSS v4 · shadcn/ui conventions
(`components.json`, `src/components/ui`) · Supabase (Postgres, Auth, Storage) · zod.
Formatting is Kenya-first: KES, `en-KE`, `Africa/Nairobi`.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npx tsc --noEmit
npm run build
```

Farm Ops needs `DATABASE_URL` (Postgres with all migrations applied). In development without
Supabase it signs you in automatically as a local owner; production always requires a real staff
account (Supabase sign-in plus an `admin` or `farm_manager` role).

Without Supabase credentials the public site runs fully. The dashboard shows an honest "accounts not
connected" preview, and early-access registrations are written to `.data/` locally.

### Connecting Supabase

1. Create a Supabase project and run every file in `supabase/migrations/` in order.
2. Copy `.env.example` to `.env.local` and fill in:
   ```
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
   DATABASE_URL=...   # Project Settings → Database → connection string
   ```
3. Make the owner an admin in the SQL editor:
   `update public.profiles set role = 'admin' where id = '<auth user id>';`

### Security model (row-level security on every table)

- **Customer:** reads only animals they currently own, plus those animals' weights, health,
  feeding, photos and customer-visible costs. Reads their own documents.
- **Farm manager:** manages livestock, health, weight and feeding records.
- **Admin:** everything, including finances, ownership, documents and early-access leads.
- Users cannot change their own role. Photos and documents sit in private storage buckets.
- A programme cannot be opened to the public until legal approval is recorded
  (`programme_requires_legal_approval` constraint).

## Brand

A mature, established livestock company — not tech, not playful. Branding-iron mark
(`src/components/brand/wordmark.tsx`), Newsreader headlines and Instrument Sans text and labels. Restrained palette:
ivory and white paper, charcoal ink, hairline rules, and one dark acacia-bark accent for primary actions
(tokens in `src/app/globals.css`). Photography carries the colour; the only other colours are the fodder
crop codes on the Farm Ops bed map, which are data.

Use the shared system rather than one-off sizes (all in `src/app/globals.css`):

- **Type scale:** `t-display` (one per page), `t-h1`, `t-h2`, `t-h3`, `t-lead`, `t-body`, `t-figure` for
  numbers, and `eyebrow` for section labels. Newsreader uses optical sizing.
- **Spacing:** `section-y` for section padding; page container `max-w-7xl px-6 sm:px-8`.
- **Shape:** squared buttons, tags and tabs (`rounded-md` / 3px); cards and images `rounded-xl`; hairline
  borders instead of shadows. Use `Button` and `Badge` from `src/components/ui`.

Photography lives in `public/images` and is registered in `src/content/photos.ts`. These are breed and
category images; they are never presented as specific Tangama animals or available stock. Real animals
only show their own photos (`coverPhoto`). The app is installable (web manifest + icons).

## Payments

M-Pesa is planned but deliberately not integrated. No payment collection will be enabled without
credentials, authorisation and testing.

## Investors

The investor brief collects **expressions of interest only**. No shares, securities or investment
products are offered and no money is taken through the platform. Any raise or ownership programme must
go through Kenyan legal and regulatory review (including Capital Markets Authority rules) and formal
documentation first. The governance safeguards on the page are proposals to confirm with legal advisers.
