import "server-only";

import { mkdir, appendFile } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

import { interestOptions } from "@/content/site";
import { normaliseKenyanPhone } from "@/lib/format";
import { getSql } from "@/lib/db";
import { getSupabaseConfig } from "@/lib/supabase/config";

const interestValues = interestOptions.map((o) => o.value) as [string, ...string[]];

export const registrationSchema = z.object({
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
    .pipe(z.email("Enter a valid email address.").optional()),
  location: z.string().trim().max(120).transform((v) => v || undefined),
  interests: z.array(z.enum(interestValues)).min(1, "Choose at least one interest."),
  message: z.string().trim().max(1000).transform((v) => v || undefined),
  consent: z.literal(true, "Please agree so we can contact you."),
});

export type Registration = z.infer<typeof registrationSchema>;

/**
 * Stores a registration via Supabase (RLS insert), else the direct database connection.
 * With neither (local development only), it is appended to .data/early-access.jsonl.
 */
export async function saveRegistration(reg: Registration) {
  const config = getSupabaseConfig();
  if (config) {
    const supabase = createClient(config.url, config.key, { auth: { persistSession: false } });
    const { error } = await supabase.from("early_access_registrations").insert({
      full_name: reg.fullName,
      phone: reg.phone,
      email: reg.email ?? null,
      location: reg.location ?? null,
      interests: reg.interests,
      message: reg.message ?? null,
      consent: reg.consent,
    });
    if (error) throw new Error(error.message);
    return;
  }

  const sql = getSql();
  if (sql) {
    await sql`insert into early_access_registrations (full_name, phone, email, location, interests, message, consent)
              values (${reg.fullName}, ${reg.phone}, ${reg.email ?? null}, ${reg.location ?? null},
                      ${reg.interests}, ${reg.message ?? null}, ${reg.consent})`;
    return;
  }

  if (process.env.NODE_ENV === "production" && process.env.VERCEL) {
    throw new Error("Registration storage is not configured.");
  }
  const dir = path.join(process.cwd(), ".data");
  await mkdir(dir, { recursive: true });
  await appendFile(
    path.join(dir, "early-access.jsonl"),
    JSON.stringify({ ...reg, createdAt: new Date().toISOString() }) + "\n",
  );
}
