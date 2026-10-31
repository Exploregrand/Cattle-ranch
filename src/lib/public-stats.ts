import "server-only";

import { cacheLife } from "next/cache";

import { getSql } from "@/lib/db";

export interface FarmProgress {
  crops: { crop: string }[];
  harvestKgTotal: number;
  harvestKg30d: number;
  workLogged30d: number;
  lastRecordedOn: string | null;
  animalsOnFarm: number;
}

/**
 * Public, aggregate-only figures from Farm Ops records — no bed counts, customer, finance or lead data.
 * Cached for an hour. Returns null when no database is connected or nothing has been recorded yet,
 * so pages fall back to the fixed farm facts.
 */
export async function getFarmProgress(): Promise<FarmProgress | null> {
  "use cache";
  cacheLife("hours");

  const sql = getSql();
  if (!sql) return null;
  try {
    const [beds, crops, harvest, activity, animals] = await Promise.all([
      sql`select count(*)::int as total,
            count(p.id)::int as planted
          from fodder_beds b left join bed_plantings p on p.bed_id = b.id and p.ended_on is null`,
      sql`select crop, count(*)::int as beds from bed_plantings where ended_on is null group by crop order by beds desc`,
      sql`select coalesce(sum(yield_kg), 0)::float as total,
            coalesce(sum(yield_kg) filter (where occurred_on >= current_date - 30), 0)::float as recent
          from fodder_activities where kind = 'harvest'`,
      sql`select count(*) filter (where occurred_on >= current_date - 30)::int as recent,
            max(occurred_on) as last
          from (select occurred_on from fodder_activities union all select planted_on from bed_plantings) x`,
      sql`select count(*)::int as n from animals where status = 'active'`,
    ]);
    // Don't publish an empty record — show the fixed farm facts until real work has been logged.
    if (beds[0].planted === 0 && harvest[0].total === 0) return null;
    return {
      crops: crops.map((c) => ({ crop: c.crop })),
      harvestKgTotal: harvest[0].total,
      harvestKg30d: harvest[0].recent,
      workLogged30d: activity[0].recent,
      lastRecordedOn: activity[0].last ?? null,
      animalsOnFarm: animals[0].n,
    };
  } catch (error) {
    console.error("Farm progress unavailable", error);
    return null;
  }
}
