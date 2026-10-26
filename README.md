# Cattle Buy

Kenya's digital livestock platform, operated from Tangama Farm in Isinya, Kajiado County.
Customers will be able to own professionally managed sheep, goats and cattle and follow each
animal's weights, health, feeding, photos and itemised costs from their phone.

**Current stage:** pre-launch. The farm is developing fodder (Sugargraze, Super Napier, alfalfa,
desmodium) across 120 beds in Sections A–C. No livestock, purchases, investments or payments are
offered. The product is built so that nothing implies otherwise.

## What's here

| Route | What it is |
| --- | --- |
| `/` | Public website: hero with app preview, record features, livestock categories, how it works, our farm, FAQ |
| `/early-access` | Interest registration (Supabase, or `.data/early-access.jsonl` in local dev) |
| `/sign-in` | Invite-only email magic-link sign-in (accounts are created by the team, never self sign-up) |
| `/dashboard/*` | Customer dashboard: Home, My Livestock, animal profile, Explore, Account. Shows real records only |
| `/demo/*` | The same dashboard with clearly labelled sample data, for design review |
| `/admin` | **Farm Ops** (staff only): overview, quick-record actions |
| `/admin/fodder` | Live map of the 120 beds, bulk planting and activity by bed range, per-bed history, stock ledger |
| `/admin/livestock` | Register animals (auto IDs `TGM-SH-0001`), weights, health, feeding, costs, sale/death/transfer, ownership |
| `/admin/customers` | Early-access leads (call, WhatsApp, follow-up status) and customer accounts — admin only |
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

Farm Ops needs `DATABASE_URL` (Postgres with both migrations applied). In development without
Supabase it signs you in automatically as a local owner; production always requires a real staff
account (Supabase sign-in plus an `admin` or `farm_manager` role).

Without Supabase credentials the public site runs fully. The dashboard shows an honest "accounts not
connected" preview, and early-access registrations are written to `.data/` locally.

### Connecting Supabase

1. Create a Supabase project and run both files in `supabase/migrations/` in order.
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

## Photography

`src/content/media.ts` holds the photo slots (hero, farm, fodder). Until real Tangama photos are
added under `public/images`, illustrated scenes are shown. Stock photos are never used, because
they could be mistaken for our farm or animals.

## Payments

M-Pesa is planned but deliberately not integrated. No payment collection will be enabled without
credentials, authorisation and testing.
