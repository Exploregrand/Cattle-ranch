import "server-only";

import { redirect } from "next/navigation";
import { connection } from "next/server";

import { TIME_ZONE } from "@/lib/format";
import type { Animal, Portfolio } from "@/lib/livestock/types";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type LiveResult =
  | { state: "unconfigured" }
  | { state: "ready"; portfolio: Portfolio; userEmail?: string };

const ANIMAL_SELECT = `
  id, tag, species, breed, sex, date_of_birth, est_age_months_at_intake, intake_date, location, status,
  livestock_programmes ( name ),
  animal_ownerships!inner ( customer_id, starts_on, agreement_ref ),
  animal_weights ( recorded_on, weight_kg ),
  animal_health_events ( occurred_on, kind, title, detail ),
  animal_feedings ( started_on, ration, notes ),
  animal_costs ( incurred_on, category, label, amount_kes ),
  animal_photos ( taken_on, caption )
`;

/* eslint-disable @typescript-eslint/no-explicit-any -- rows are shaped by ANIMAL_SELECT */
function toAnimal(row: any, holder: string): Animal {
  const ownership = row.animal_ownerships?.[0];
  return {
    id: row.id,
    tag: row.tag,
    species: row.species,
    breed: row.breed,
    sex: row.sex,
    dateOfBirth: row.date_of_birth ?? undefined,
    estimatedAgeMonthsAtIntake: row.est_age_months_at_intake ?? undefined,
    intakeDate: row.intake_date,
    location: row.location,
    status: row.status,
    programme: row.livestock_programmes?.name ?? "—",
    ownership: {
      holder,
      since: ownership?.starts_on ?? row.intake_date,
      agreement: ownership?.agreement_ref ?? undefined,
    },
    weights: (row.animal_weights ?? []).map((w: any) => ({ date: w.recorded_on, kg: Number(w.weight_kg) })),
    health: (row.animal_health_events ?? []).map((h: any) => ({
      date: h.occurred_on,
      kind: h.kind,
      title: h.title,
      detail: h.detail ?? undefined,
    })),
    feeding: (row.animal_feedings ?? []).map((f: any) => ({
      date: f.started_on,
      ration: f.ration,
      notes: f.notes ?? undefined,
    })),
    costs: (row.animal_costs ?? []).map((c: any) => ({
      date: c.incurred_on,
      category: c.category,
      label: c.label,
      amountKes: Number(c.amount_kes),
    })),
    photos: (row.animal_photos ?? []).map((p: any) => ({ date: p.taken_on, caption: p.caption ?? "" })),
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

function todayInNairobi() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: TIME_ZONE }).format(new Date());
}

/**
 * Loads the signed-in customer's own records. Row-level security already limits
 * what can be read; the ownership filter also keeps staff accounts to their own herd here.
 */
export async function getLivePortfolio(nextPath = "/dashboard"): Promise<LiveResult> {
  // Always per-request: this reads the session and today's date.
  await connection();
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { state: "unconfigured" };

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect(`/sign-in?next=${encodeURIComponent(nextPath)}`);

  const [profile, animals, updates, documents] = await Promise.all([
    supabase.from("profiles").select("full_name, phone, county, created_at").eq("id", user.id).maybeSingle(),
    supabase.from("animals").select(ANIMAL_SELECT).eq("animal_ownerships.customer_id", user.id).order("intake_date"),
    supabase
      .from("farm_updates")
      .select("id, published_on, title, body")
      .eq("published", true)
      .order("published_on", { ascending: false })
      .limit(5),
    supabase
      .from("customer_documents")
      .select("id, title, kind, issued_on")
      .eq("customer_id", user.id)
      .order("issued_on", { ascending: false }),
  ]);

  const error = profile.error ?? animals.error ?? updates.error ?? documents.error;
  if (error) throw new Error(`Could not load your records: ${error.message}`);

  const fullName = profile.data?.full_name ?? user.email ?? "Customer";
  return {
    state: "ready",
    userEmail: user.email,
    portfolio: {
      asOf: todayInNairobi(),
      customer: {
        fullName,
        email: user.email,
        phone: profile.data?.phone ?? undefined,
        county: profile.data?.county ?? undefined,
        memberSince: profile.data?.created_at?.slice(0, 10),
      },
      animals: (animals.data ?? []).map((row) => toAnimal(row, fullName)),
      updates: (updates.data ?? []).map((u) => ({ id: u.id, date: u.published_on, title: u.title, body: u.body })),
      documents: (documents.data ?? []).map((d) => ({ id: d.id, title: d.title, kind: d.kind, date: d.issued_on })),
    },
  };
}
