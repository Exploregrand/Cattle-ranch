"use server";

import { refresh } from "next/cache";
import { z } from "zod";

import { done, fail, fields, optionalText, pastDate, type ActionResult } from "@/app/admin/_actions/shared";
import { assertStaff } from "@/lib/admin/auth";
import { bedRange } from "@/lib/admin/fodder";
import { requireSql } from "@/lib/db";
import { formatKg } from "@/lib/format";

const cropId = z.enum(["sugargraze", "super_napier", "alfalfa", "desmodium"], "Choose a crop.");

const bedSelection = z
  .object({
    section: z.enum(["A", "B", "C"], "Choose a section."),
    from: z.coerce.number().int().min(1).max(40),
    to: z.coerce.number().int().min(1).max(40),
  })
  .transform(({ section, from, to }) => bedRange(section, from, to));

function rangeLabel(beds: string[]) {
  return beds.length === 1 ? `bed ${beds[0]}` : `${beds.length} beds (${beds[0]}–${beds[beds.length - 1]})`;
}

function selectedBeds(raw: Record<string, unknown>) {
  return raw.bedId ? [z.string().regex(/^[ABC]\d{2}$/).parse(raw.bedId)] : bedSelection.parse(raw);
}

export async function plantBeds(_: ActionResult, formData: FormData): Promise<ActionResult> {
  try {
    const staff = await assertStaff();
    const raw = fields(formData);
    const beds = selectedBeds(raw);
    const input = z.object({ crop: cropId, date: pastDate, notes: optionalText() }).parse(raw);
    const sql = requireSql();
    await sql.begin(async (tx) => {
      await tx`update bed_plantings set ended_on = greatest(planted_on, ${input.date}::date)
               where bed_id in ${tx(beds)} and ended_on is null`;
      for (const bed of beds) {
        await tx`insert into bed_plantings (bed_id, crop, planted_on, notes, recorded_by)
                 values (${bed}, ${input.crop}, ${input.date}, ${input.notes}, ${staff.id})`;
      }
    });
    refresh();
    return done(`Planting recorded for ${rangeLabel(beds)}.`);
  } catch (e) {
    return fail(e);
  }
}

export async function clearBeds(_: ActionResult, formData: FormData): Promise<ActionResult> {
  try {
    await assertStaff();
    const raw = fields(formData);
    const beds = selectedBeds(raw);
    const { date } = z.object({ date: pastDate }).parse(raw);
    const sql = requireSql();
    const res = await sql`update bed_plantings set ended_on = greatest(planted_on, ${date}::date)
                          where bed_id in ${sql(beds)} and ended_on is null`;
    refresh();
    return done(res.count ? `Cleared ${rangeLabel(beds)}.` : "Those beds had no current crop.");
  } catch (e) {
    return fail(e);
  }
}

export async function logActivity(_: ActionResult, formData: FormData): Promise<ActionResult> {
  try {
    const staff = await assertStaff();
    const raw = fields(formData);
    const beds = selectedBeds(raw);
    const input = z
      .object({
        kind: z.enum(["irrigation", "harvest", "fertiliser", "weeding", "pest_control", "note"], "Choose an activity."),
        date: pastDate,
        yieldKg: z.union([z.literal(""), z.coerce.number().positive("Yield must be more than 0.").max(100000)]).optional(),
        toStock: z.string().optional(),
        stockForm: z.enum(["fresh", "silage", "hay"]).default("fresh"),
        notes: optionalText(),
      })
      .parse(raw);
    const totalYield = input.kind === "harvest" && input.yieldKg ? Number(input.yieldKg) : null;
    if (input.kind === "harvest" && !totalYield) return { ok: false, message: "Enter the harvested weight in kg." };

    const sql = requireSql();
    await sql.begin(async (tx) => {
      const perBed = totalYield ? Math.round((totalYield / beds.length) * 10) / 10 : null;
      for (const bed of beds) {
        await tx`insert into fodder_activities (bed_id, kind, occurred_on, yield_kg, notes, recorded_by)
                 values (${bed}, ${input.kind}, ${input.date}, ${perBed}, ${input.notes}, ${staff.id})`;
      }
      if (totalYield && input.toStock) {
        // Add the harvest to stock, grouped by each bed's current crop.
        const byCrop = await tx`select coalesce(p.crop, 'other') as crop, count(*)::int as n from fodder_beds b
          left join bed_plantings p on p.bed_id = b.id and p.ended_on is null
          where b.id in ${tx(beds)} group by 1`;
        for (const row of byCrop) {
          await tx`insert into fodder_stock_movements (occurred_on, crop, form, direction, reason, quantity_kg, notes, recorded_by)
                   values (${input.date}, ${row.crop}, ${input.stockForm}, 'in', 'harvest',
                           ${Math.round((totalYield * row.n * 10) / beds.length) / 10},
                           ${`Harvest from ${rangeLabel(beds)}`}, ${staff.id})`;
        }
      }
    });
    refresh();
    return done(
      totalYield
        ? `Harvest of ${formatKg(totalYield)} logged for ${rangeLabel(beds)}${input.toStock ? " and added to stock" : ""}.`
        : `Activity logged for ${rangeLabel(beds)}.`,
    );
  } catch (e) {
    return fail(e);
  }
}

export async function recordStock(_: ActionResult, formData: FormData): Promise<ActionResult> {
  try {
    const staff = await assertStaff();
    const input = z
      .object({
        direction: z.enum(["in", "out"]),
        crop: z.enum(["sugargraze", "super_napier", "alfalfa", "desmodium", "other"], "Choose a crop."),
        form: z.enum(["fresh", "silage", "hay"]),
        reason: z.enum(["harvest", "purchased", "fed", "sold", "spoiled", "adjustment"], "Choose a reason."),
        quantityKg: z.coerce.number().positive("Enter a quantity in kg.").max(1000000),
        date: pastDate,
        notes: optionalText(),
      })
      .parse(fields(formData));
    const sql = requireSql();
    if (input.direction === "out") {
      const [{ balance }] = await sql`select coalesce(sum(case direction when 'in' then quantity_kg else -quantity_kg end), 0) as balance
        from fodder_stock_movements where crop = ${input.crop} and form = ${input.form}`;
      if (input.reason !== "adjustment" && Number(balance) < input.quantityKg) {
        return { ok: false, message: `Only ${formatKg(Number(balance))} in stock for that crop and form.` };
      }
    }
    await sql`insert into fodder_stock_movements (occurred_on, crop, form, direction, reason, quantity_kg, notes, recorded_by)
              values (${input.date}, ${input.crop}, ${input.form}, ${input.direction}, ${input.reason}, ${input.quantityKg}, ${input.notes}, ${staff.id})`;
    refresh();
    return done(`Stock ${input.direction === "in" ? "added" : "removed"}: ${formatKg(input.quantityKg)}.`);
  } catch (e) {
    return fail(e);
  }
}
