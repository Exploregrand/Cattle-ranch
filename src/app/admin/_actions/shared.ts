import { z } from "zod";

import { TIME_ZONE } from "@/lib/format";

export type ActionResult = { ok: boolean; message: string; at?: number };
export const idle: ActionResult = { ok: false, message: "" };

export function today() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: TIME_ZONE }).format(new Date());
}

/** A YYYY-MM-DD date that is not in the future (Nairobi time). */
export const pastDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Choose a date.")
  .refine((d) => d <= today(), "Date can't be in the future.");

export const optionalText = (max = 500) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => v || null);

export function fields(formData: FormData) {
  return Object.fromEntries(
    [...formData.keys()].map((k) => {
      const all = formData.getAll(k).map(String);
      return [k, all.length > 1 ? all : all[0]];
    }),
  );
}

export function fail(error: unknown): ActionResult {
  if (error instanceof z.ZodError) return { ok: false, message: error.issues[0]?.message ?? "Check the form." };
  console.error(error);
  return { ok: false, message: error instanceof Error ? error.message : "Something went wrong." };
}

export const done = (message: string): ActionResult => ({ ok: true, message, at: Date.now() });
