import "server-only";

import { cropById, type CropId } from "@/lib/admin/vocab";
import { requireSql } from "@/lib/db";
import { formatKg } from "@/lib/format";

/** Draft a farm update from the last 30 days of Farm Ops records. Facts only. */
export async function draftUpdate() {
  const sql = requireSql();
  const [[act], plantings, [stock], [animals], [weights]] = await Promise.all([
    sql`select
          coalesce(sum(yield_kg) filter (where kind = 'harvest'), 0)::float as harvest,
          count(*) filter (where kind = 'irrigation')::int as irrigations,
          count(*)::int as records
        from fodder_activities where occurred_on >= current_date - 30`,
    sql`select crop, count(*)::int as n from bed_plantings where planted_on >= current_date - 30 group by crop order by n desc`,
    sql`select coalesce(sum(case direction when 'in' then quantity_kg else -quantity_kg end), 0)::float as kg from fodder_stock_movements`,
    sql`select count(*)::int as n from animals where status = 'active'`,
    sql`select count(*)::int as n from animal_weights where recorded_on >= current_date - 30`,
  ]);

  const lines: string[] = [];
  if (plantings.length) {
    lines.push(`Planted: ${plantings.map((p) => cropById[p.crop as CropId]?.label ?? p.crop).join(", ")}.`);
  }
  if (act.harvest > 0) lines.push(`Harvested ${formatKg(Math.round(act.harvest))} of fresh fodder.`);
  if (act.irrigations > 0) lines.push(`${act.irrigations} irrigation rounds on drip lines.`);
  if (stock.kg > 0) lines.push(`${formatKg(Math.round(stock.kg))} of fodder now in store.`);
  if (animals.n > 0) lines.push(`${animals.n} animals on the farm${weights.n ? `, with ${weights.n} weigh-ins recorded` : ""}.`);
  lines.push(`${act.records} field records logged in the last 30 days.`);

  const month = new Intl.DateTimeFormat("en-KE", { month: "long", year: "numeric", timeZone: "Africa/Nairobi" }).format(new Date());
  return {
    title: `Farm update: ${month}`,
    body: `${lines.join(" ")} Thank you for following Herd & Field.`,
    hasActivity: act.records > 0 || plantings.length > 0,
  };
}

export async function listUpdates() {
  const sql = requireSql();
  return sql<{ id: string; published_on: string; title: string; body: string; published: boolean }[]>`
    select id, published_on, title, body, published from farm_updates where animal_id is null
    order by published_on desc, created_at desc limit 50`;
}
