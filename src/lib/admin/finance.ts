import "server-only";

import { requireSql } from "@/lib/db";

export interface LedgerEntry {
  id: string;
  source: "ledger" | "animal";
  date: string;
  direction: "income" | "expense";
  category: string;
  description: string;
  amountKes: number;
  animalId: string | null;
  animalTag: string | null;
}

export type Period = "month" | "year" | "all";

function periodStart(period: Period) {
  if (period === "all") return null;
  const now = new Intl.DateTimeFormat("en-CA", { timeZone: "Africa/Nairobi" }).format(new Date());
  return period === "month" ? `${now.slice(0, 7)}-01` : `${now.slice(0, 4)}-01-01`;
}

/** Farm ledger plus per-animal costs, as one statement. */
export async function getLedger(period: Period) {
  const sql = requireSql();
  const from = periodStart(period);
  const rows = await sql`
    select * from (
      select t.id, 'ledger' as source, t.occurred_on, t.direction, t.category, t.description, t.amount_kes, t.animal_id, a.tag
      from farm_transactions t left join animals a on a.id = t.animal_id
      union all
      select c.id, 'animal', c.incurred_on, 'expense', c.category, c.label, c.amount_kes, c.animal_id, a.tag
      from animal_costs c join animals a on a.id = c.animal_id
    ) x
    where ${from}::date is null or x.occurred_on >= ${from}::date
    order by occurred_on desc
    limit 300
  `;
  const entries: LedgerEntry[] = rows.map((r) => ({
    id: r.id,
    source: r.source,
    date: r.occurred_on,
    direction: r.direction,
    category: r.category,
    description: r.description,
    amountKes: Number(r.amount_kes),
    animalId: r.animal_id,
    animalTag: r.tag,
  }));
  const income = entries.filter((e) => e.direction === "income").reduce((s, e) => s + e.amountKes, 0);
  const expenses = entries.filter((e) => e.direction === "expense").reduce((s, e) => s + e.amountKes, 0);
  return { entries, income, expenses, net: income - expenses };
}

/** Realised margin for animals that have actually been sold. Never projections. */
export async function getRealisedMargins() {
  const sql = requireSql();
  const rows = await sql`
    select a.id, a.tag, a.breed, a.species,
      (select coalesce(sum(amount_kes), 0) from farm_transactions t where t.animal_id = a.id and t.category = 'livestock_sale') as sales,
      (select coalesce(sum(amount_kes), 0) from animal_costs c where c.animal_id = a.id) as costs,
      (select max(occurred_on) from farm_transactions t where t.animal_id = a.id and t.category = 'livestock_sale') as sold_on
    from animals a where a.status = 'sold'
    order by sold_on desc nulls last
  `;
  return rows.map((r) => ({
    id: r.id as string,
    tag: r.tag as string,
    breed: r.breed as string,
    species: r.species as string,
    soldOn: r.sold_on as string | null,
    salesKes: Number(r.sales),
    costsKes: Number(r.costs),
    marginKes: Number(r.sales) - Number(r.costs),
  }));
}
