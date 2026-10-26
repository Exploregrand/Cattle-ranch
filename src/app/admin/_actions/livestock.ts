"use server";

import { refresh } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { done, fail, fields, optionalText, pastDate, type ActionResult } from "@/app/admin/_actions/shared";
import { assertStaff } from "@/lib/admin/auth";
import { requireSql } from "@/lib/db";
import { formatKES, formatKg } from "@/lib/format";

const uuid = z.string().uuid("Unknown animal.");
const money = z.union([z.literal(""), z.coerce.number().min(0).max(100_000_000)]).optional();

export async function registerAnimal(_: ActionResult, formData: FormData): Promise<ActionResult> {
  let id: string;
  try {
    const staff = await assertStaff();
    const input = z
      .object({
        species: z.enum(["sheep", "goats", "cattle"], "Choose a species."),
        breed: z.string().trim().min(2, "Enter the breed.").max(60),
        sex: z.enum(["male", "female"], "Choose the sex."),
        dateOfBirth: z.union([z.literal(""), pastDate]).optional(),
        estAgeMonths: z.union([z.literal(""), z.coerce.number().int().min(0).max(300)]).optional(),
        intakeDate: pastDate,
        location: z.string().trim().min(2).max(120),
        programmeId: z.string().optional(),
        purchaseCost: money,
        initialWeight: z.union([z.literal(""), z.coerce.number().positive().max(2000)]).optional(),
        notes: optionalText(),
      })
      .parse(fields(formData));
    if (!input.dateOfBirth && input.estAgeMonths === "") {
      return { ok: false, message: "Enter a date of birth or an estimated age." };
    }
    const sql = requireSql();
    id = await sql.begin(async (tx) => {
      const [{ tag }] = await tx`select next_animal_tag(${input.species}) as tag`;
      const [row] = await tx`
        insert into animals (tag, species, breed, sex, date_of_birth, est_age_months_at_intake, intake_date, location, programme_id)
        values (${tag}, ${input.species}, ${input.breed}, ${input.sex}, ${input.dateOfBirth || null},
                ${input.estAgeMonths === "" || input.estAgeMonths === undefined ? null : input.estAgeMonths},
                ${input.intakeDate}, ${input.location}, ${input.programmeId || null})
        returning id`;
      await tx`insert into animal_status_events (animal_id, occurred_on, status, notes, recorded_by)
               values (${row.id}, ${input.intakeDate}, 'active', ${input.notes ?? "Registered at intake"}, ${staff.id})`;
      if (input.initialWeight) {
        await tx`insert into animal_weights (animal_id, recorded_on, weight_kg, recorded_by)
                 values (${row.id}, ${input.intakeDate}, ${input.initialWeight}, ${staff.id})`;
      }
      if (input.purchaseCost) {
        await tx`insert into animal_costs (animal_id, incurred_on, category, label, amount_kes)
                 values (${row.id}, ${input.intakeDate}, 'purchase', 'Animal purchase', ${input.purchaseCost})`;
      }
      return row.id as string;
    });
  } catch (e) {
    return fail(e);
  }
  redirect(`/admin/livestock/${id}?registered=1`);
}

export async function recordWeight(_: ActionResult, formData: FormData): Promise<ActionResult> {
  try {
    const staff = await assertStaff();
    const input = z
      .object({ animalId: uuid, date: pastDate, kg: z.coerce.number().positive("Enter the weight in kg.").max(2000) })
      .parse(fields(formData));
    const sql = requireSql();
    await sql`insert into animal_weights (animal_id, recorded_on, weight_kg, recorded_by)
              values (${input.animalId}, ${input.date}, ${input.kg}, ${staff.id})`;
    refresh();
    return done(`Weight recorded: ${formatKg(input.kg)}.`);
  } catch (e) {
    return fail(e);
  }
}

export async function recordHealth(_: ActionResult, formData: FormData): Promise<ActionResult> {
  try {
    const staff = await assertStaff();
    const input = z
      .object({
        animalId: uuid,
        date: pastDate,
        kind: z.enum(["vaccination", "treatment", "check"], "Choose a type."),
        title: z.string().trim().min(2, "Describe the treatment or check.").max(120),
        detail: optionalText(),
        costKes: money,
      })
      .parse(fields(formData));
    const sql = requireSql();
    await sql.begin(async (tx) => {
      await tx`insert into animal_health_events (animal_id, occurred_on, kind, title, detail, recorded_by)
               values (${input.animalId}, ${input.date}, ${input.kind}, ${input.title}, ${input.detail}, ${staff.id})`;
      if (input.costKes) {
        await tx`insert into animal_costs (animal_id, incurred_on, category, label, amount_kes)
                 values (${input.animalId}, ${input.date}, 'veterinary', ${input.title}, ${input.costKes})`;
      }
    });
    refresh();
    return done("Health record saved.");
  } catch (e) {
    return fail(e);
  }
}

export async function recordFeeding(_: ActionResult, formData: FormData): Promise<ActionResult> {
  try {
    const staff = await assertStaff();
    const input = z
      .object({
        animalId: uuid,
        date: pastDate,
        ration: z.string().trim().min(2, "Describe the ration.").max(160),
        notes: optionalText(),
        fodderCrop: z.enum(["", "sugargraze", "super_napier", "alfalfa", "desmodium", "other"]).optional(),
        fodderForm: z.enum(["fresh", "silage", "hay"]).default("fresh"),
        fodderKg: z.union([z.literal(""), z.coerce.number().positive().max(100000)]).optional(),
      })
      .parse(fields(formData));
    const sql = requireSql();
    await sql.begin(async (tx) => {
      await tx`insert into animal_feedings (animal_id, started_on, ration, notes, recorded_by)
               values (${input.animalId}, ${input.date}, ${input.ration}, ${input.notes}, ${staff.id})`;
      if (input.fodderCrop && input.fodderKg) {
        await tx`insert into fodder_stock_movements (occurred_on, crop, form, direction, reason, quantity_kg, animal_id, notes, recorded_by)
                 values (${input.date}, ${input.fodderCrop}, ${input.fodderForm}, 'out', 'fed', ${input.fodderKg}, ${input.animalId}, ${input.ration}, ${staff.id})`;
      }
    });
    refresh();
    return done(input.fodderKg ? `Feeding saved and ${formatKg(Number(input.fodderKg))} deducted from stock.` : "Feeding saved.");
  } catch (e) {
    return fail(e);
  }
}

export async function recordCost(_: ActionResult, formData: FormData): Promise<ActionResult> {
  try {
    await assertStaff(true);
    const input = z
      .object({
        animalId: uuid,
        date: pastDate,
        category: z.enum(["purchase", "feed", "veterinary", "other"]),
        label: z.string().trim().min(2, "Describe the cost.").max(120),
        amountKes: z.coerce.number().positive("Enter an amount.").max(100_000_000),
        internal: z.string().optional(),
      })
      .parse(fields(formData));
    const sql = requireSql();
    await sql`insert into animal_costs (animal_id, incurred_on, category, label, amount_kes, customer_visible)
              values (${input.animalId}, ${input.date}, ${input.category}, ${input.label}, ${input.amountKes}, ${!input.internal})`;
    refresh();
    return done(`Cost recorded: ${formatKES(input.amountKes)}.`);
  } catch (e) {
    return fail(e);
  }
}

export async function changeStatus(_: ActionResult, formData: FormData): Promise<ActionResult> {
  try {
    const staff = await assertStaff();
    const input = z
      .object({
        animalId: uuid,
        date: pastDate,
        status: z.enum(["active", "sold", "transferred", "deceased"]),
        notes: optionalText(),
        salePrice: money,
        buyer: optionalText(120),
      })
      .parse(fields(formData));
    if (input.status === "sold" && staff.role !== "admin") return { ok: false, message: "Only an admin can record a sale." };
    if (input.status === "sold" && !input.salePrice) return { ok: false, message: "Enter the sale price." };
    const sql = requireSql();
    await sql.begin(async (tx) => {
      const [animal] = await tx`select tag, status from animals where id = ${input.animalId} for update`;
      if (!animal) throw new Error("Unknown animal.");
      if (animal.status === input.status) throw new Error(`Already marked as ${input.status}.`);
      await tx`update animals set status = ${input.status} where id = ${input.animalId}`;
      await tx`insert into animal_status_events (animal_id, occurred_on, status, notes, recorded_by)
               values (${input.animalId}, ${input.date}, ${input.status}, ${input.notes}, ${staff.id})`;
      if (input.status === "sold" && input.salePrice) {
        await tx`insert into farm_transactions (occurred_on, direction, category, amount_kes, description, animal_id, recorded_by)
                 values (${input.date}, 'income', 'livestock_sale', ${input.salePrice},
                         ${`Sale of ${animal.tag}${input.buyer ? ` to ${input.buyer}` : ""}`}, ${input.animalId}, ${staff.id})`;
      }
    });
    refresh();
    return done(`Status updated to ${input.status}.`);
  } catch (e) {
    return fail(e);
  }
}

export async function assignOwner(_: ActionResult, formData: FormData): Promise<ActionResult> {
  try {
    await assertStaff(true);
    const input = z
      .object({
        animalId: uuid,
        customerId: z.union([z.literal(""), z.string().uuid()]),
        date: pastDate,
        agreement: optionalText(60),
      })
      .parse(fields(formData));
    const sql = requireSql();
    await sql.begin(async (tx) => {
      await tx`update animal_ownerships set ends_on = greatest(starts_on, ${input.date}::date)
               where animal_id = ${input.animalId} and ends_on is null`;
      if (input.customerId) {
        await tx`insert into animal_ownerships (animal_id, customer_id, starts_on, agreement_ref)
                 values (${input.animalId}, ${input.customerId}, ${input.date}, ${input.agreement})`;
      }
    });
    refresh();
    return done(input.customerId ? "Ownership assigned. The customer can now see this animal." : "Returned to farm ownership.");
  } catch (e) {
    return fail(e);
  }
}
