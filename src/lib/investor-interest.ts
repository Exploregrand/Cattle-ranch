import "server-only";

import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

import { investorTypes, routes, tickets } from "@/content/investors";
import { getSql } from "@/lib/db";
import { normaliseKenyanPhone } from "@/lib/format";
import { getSupabaseConfig } from "@/lib/supabase/config";

const values = <T extends readonly { value: string }[]>(list: T) => list.map((o) => o.value) as [string, ...string[]];

export const investorSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name.").max(120),
  phone: z
    .string()
    .trim()
    .transform((value, ctx) => {
      const phone = normaliseKenyanPhone(value);
      if (!phone) {
        ctx.addIssue({ code: "custom", message: "Enter a Kenyan mobile number, e.g. 0712 345 678." });
        return z.NEVER;
      }
      return phone;
    }),
  email: z
    .string()
    .trim()
    .max(254)
    .transform((v) => v || undefined)
    .pipe(z.email("Enter a valid email address.").optional())
    .transform((v) => v ?? null),
  county: z.string().trim().min(2, "Choose your county.").max(60),
  investorType: z.enum(values(investorTypes), "Choose what describes you."),
  route: z.enum(values(routes), "Choose what you're interested in."),
  ticket: z.union([z.literal(""), z.enum(values(tickets))]).transform((v) => v || null),
  message: z.string().trim().max(1500).transform((v) => v || null),
  acknowledgedNoOffer: z.literal(true, "Please confirm you understand no offer is being made."),
  consent: z.literal(true, "Please agree so we can contact you."),
});

export type InvestorInterest = z.infer<typeof investorSchema>;

/** Supabase (RLS insert) → direct database → local file in development. */
export async function saveInvestorInterest(i: InvestorInterest) {
  const row = {
    full_name: i.fullName,
    phone: i.phone,
    email: i.email,
    county: i.county,
    investor_type: i.investorType,
    route: i.route,
    ticket: i.ticket,
    message: i.message,
    acknowledged_no_offer: i.acknowledgedNoOffer,
    consent: i.consent,
  };
  const config = getSupabaseConfig();
  if (config) {
    const supabase = createClient(config.url, config.key, { auth: { persistSession: false } });
    const { error } = await supabase.from("investor_interest").insert(row);
    if (error) throw new Error(error.message);
    return;
  }
  const sql = getSql();
  if (sql) {
    await sql`insert into investor_interest ${sql(row)}`;
    return;
  }
  if (process.env.NODE_ENV === "production" && process.env.VERCEL) throw new Error("Storage is not configured.");
  const dir = path.join(process.cwd(), ".data");
  await mkdir(dir, { recursive: true });
  await appendFile(path.join(dir, "investor-interest.jsonl"), JSON.stringify({ ...row, created_at: new Date().toISOString() }) + "\n");
}
