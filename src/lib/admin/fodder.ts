import "server-only";

import { requireSql } from "@/lib/db";
import type { ActivityKind, CropId } from "@/lib/admin/vocab";

export interface BedState {
  id: string;
  section: "A" | "B" | "C";
  position: number;
  crop: CropId | null;
  plantedOn: string | null;
  lastIrrigation: string | null;
  lastHarvest: string | null;
  totalYieldKg: number;
}

export async function getBeds(): Promise<BedState[]> {
  const sql = requireSql();
  const rows = await sql`
    select b.id, b.section, b.position,
      p.crop, p.planted_on,
      (select max(occurred_on) from fodder_activities a where a.bed_id = b.id and a.kind = 'irrigation') as last_irrigation,
      (select max(occurred_on) from fodder_activities a where a.bed_id = b.id and a.kind = 'harvest') as last_harvest,
      coalesce((select sum(yield_kg) from fodder_activities a
        where a.bed_id = b.id and a.kind = 'harvest' and (p.planted_on is null or a.occurred_on >= p.planted_on)), 0) as total_yield
    from fodder_beds b
    left join bed_plantings p on p.bed_id = b.id and p.ended_on is null
    order by b.section, b.position
  `;
  return rows.map((r) => ({
    id: r.id,
    section: r.section,
    position: r.position,
    crop: r.crop,
    plantedOn: r.planted_on,
    lastIrrigation: r.last_irrigation,
    lastHarvest: r.last_harvest,
    totalYieldKg: Number(r.total_yield),
  }));
}

export interface ActivityRow {
  id: string;
  bedId: string;
  kind: ActivityKind | "planting";
  occurredOn: string;
  yieldKg: number | null;
  notes: string | null;
  crop: CropId | null;
}

/** Fodder activity log, including plantings, newest first. */
export async function getActivity({ bedId, limit = 60 }: { bedId?: string; limit?: number } = {}): Promise<ActivityRow[]> {
  const sql = requireSql();
  const rows = await sql`
    select * from (
      select a.id, a.bed_id, a.kind, a.occurred_on, a.yield_kg, a.notes, null::text as crop, a.created_at
      from fodder_activities a
      union all
      select p.id, p.bed_id, 'planting', p.planted_on, null, p.notes, p.crop, p.created_at
      from bed_plantings p
    ) x
    where ${bedId ?? null}::text is null or x.bed_id = ${bedId ?? null}
    order by occurred_on desc, created_at desc
    limit ${limit}
  `;
  return rows.map((r) => ({
    id: r.id,
    bedId: r.bed_id,
    kind: r.kind,
    occurredOn: r.occurred_on,
    yieldKg: r.yield_kg === null ? null : Number(r.yield_kg),
    notes: r.notes,
    crop: r.crop,
  }));
}

export interface StockLevel {
  crop: string;
  form: string;
  balanceKg: number;
}

export async function getStock() {
  const sql = requireSql();
  const levels = await sql`
    select crop, form, sum(case direction when 'in' then quantity_kg else -quantity_kg end) as balance
    from fodder_stock_movements group by crop, form
    having sum(case direction when 'in' then quantity_kg else -quantity_kg end) <> 0
    order by crop, form
  `;
  const movements = await sql`
    select m.id, m.occurred_on, m.crop, m.form, m.direction, m.reason, m.quantity_kg, m.notes, a.tag
    from fodder_stock_movements m left join animals a on a.id = m.animal_id
    order by m.occurred_on desc, m.created_at desc limit 50
  `;
  const fedThisMonth = await sql`
    select coalesce(sum(quantity_kg), 0) as kg from fodder_stock_movements
    where reason = 'fed' and occurred_on >= date_trunc('month', (now() at time zone 'Africa/Nairobi'))::date
  `;
  return {
    levels: levels.map((l) => ({ crop: l.crop, form: l.form, balanceKg: Number(l.balance) })) as StockLevel[],
    totalKg: levels.reduce((s, l) => s + Number(l.balance), 0),
    fedThisMonthKg: Number(fedThisMonth[0].kg),
    movements: movements.map((m) => ({
      id: m.id as string,
      occurredOn: m.occurred_on as string,
      crop: m.crop as string,
      form: m.form as string,
      direction: m.direction as "in" | "out",
      reason: m.reason as string,
      quantityKg: Number(m.quantity_kg),
      notes: m.notes as string | null,
      animalTag: m.tag as string | null,
    })),
  };
}

/** Expands "A", 1, 10 into ["A01", …, "A10"]. */
export function bedRange(section: string, from: number, to: number) {
  const [lo, hi] = from <= to ? [from, to] : [to, from];
  return Array.from({ length: hi - lo + 1 }, (_, i) => `${section}${String(lo + i).padStart(2, "0")}`);
}
