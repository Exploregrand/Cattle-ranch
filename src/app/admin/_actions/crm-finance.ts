"use server";

import { refresh } from "next/cache";
import { z } from "zod";

import { done, fail, fields, pastDate, type ActionResult } from "@/app/admin/_actions/shared";
import { assertStaff } from "@/lib/admin/auth";
import { requireSql } from "@/lib/db";
import { formatKES } from "@/lib/format";

export async function setRegistrationStatus(_: ActionResult, formData: FormData): Promise<ActionResult> {
  try {
    await assertStaff(true);
    const input = z
      .object({ id: z.string().uuid(), status: z.enum(["new", "contacted", "closed"]) })
      .parse(fields(formData));
    const sql = requireSql();
    await sql`update early_access_registrations set status = ${input.status} where id = ${input.id}`;
    refresh();
    return done("Updated.");
  } catch (e) {
    return fail(e);
  }
}

export async function setInvestorStatus(_: ActionResult, formData: FormData): Promise<ActionResult> {
  try {
    await assertStaff(true);
    const input = z
      .object({ id: z.string().uuid(), status: z.enum(["new", "contacted", "closed"]) })
      .parse(fields(formData));
    const sql = requireSql();
    await sql`update investor_interest set status = ${input.status} where id = ${input.id}`;
    refresh();
    return done("Updated.");
  } catch (e) {
    return fail(e);
  }
}

export async function addTransaction(_: ActionResult, formData: FormData): Promise<ActionResult> {
  try {
    const staff = await assertStaff(true);
    const input = z
      .object({
        direction: z.enum(["income", "expense"]),
        category: z.string().min(1, "Choose a category."),
        amountKes: z.coerce.number().positive("Enter an amount.").max(100_000_000),
        date: pastDate,
        description: z.string().trim().min(2, "Add a short description.").max(200),
        animalTag: z
          .string()
          .trim()
          .toUpperCase()
          .transform((v) => v || null),
      })
      .parse(fields(formData));
    const sql = requireSql();
    let animalId: string | null = null;
    if (input.animalTag) {
      const [a] = await sql`select id from animals where tag = ${input.animalTag}`;
      if (!a) return { ok: false, message: `No animal with ID ${input.animalTag}.` };
      animalId = a.id;
    }
    if (input.category === "livestock_sale") {
      return { ok: false, message: "Record livestock sales from the animal's page, so its status updates too." };
    }
    await sql`insert into farm_transactions (occurred_on, direction, category, amount_kes, description, animal_id, recorded_by)
              values (${input.date}, ${input.direction}, ${input.category}, ${input.amountKes}, ${input.description}, ${animalId}, ${staff.id})`;
    refresh();
    return done(`${input.direction === "income" ? "Income" : "Expense"} of ${formatKES(input.amountKes)} recorded.`);
  } catch (e) {
    return fail(e);
  }
}
