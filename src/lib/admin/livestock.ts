import "server-only";

import { requireSql } from "@/lib/db";
import type { Animal } from "@/lib/livestock/types";

export interface AnimalListItem {
  id: string;
  tag: string;
  species: Animal["species"];
  breed: string;
  sex: Animal["sex"];
  status: Animal["status"];
  intakeDate: string;
  location: string;
  latestKg: number | null;
  latestOn: string | null;
  ownerName: string | null;
}

export async function listAnimals(filter: { species?: string; status?: string } = {}): Promise<AnimalListItem[]> {
  const sql = requireSql();
  const rows = await sql`
    select a.id, a.tag, a.species, a.breed, a.sex, a.status, a.intake_date, a.location,
      w.weight_kg, w.recorded_on, pr.full_name as owner_name
    from animals a
    left join lateral (
      select weight_kg, recorded_on from animal_weights where animal_id = a.id order by recorded_on desc, created_at desc limit 1
    ) w on true
    left join lateral (
      select o.customer_id from animal_ownerships o
      where o.animal_id = a.id and o.ends_on is null order by o.starts_on desc limit 1
    ) o on true
    left join profiles pr on pr.id = o.customer_id
    where (${filter.species ?? null}::text is null or a.species = ${filter.species ?? null})
      and (${filter.status ?? null}::text is null or a.status = ${filter.status ?? null})
    order by a.status = 'active' desc, a.intake_date desc, a.tag
  `;
  return rows.map((r) => ({
    id: r.id,
    tag: r.tag,
    species: r.species,
    breed: r.breed,
    sex: r.sex,
    status: r.status,
    intakeDate: r.intake_date,
    location: r.location,
    latestKg: r.weight_kg === null ? null : Number(r.weight_kg),
    latestOn: r.recorded_on,
    ownerName: r.owner_name,
  }));
}

export interface AdminAnimal extends Animal {
  programmeId: string | null;
  ownerId: string | null;
  statusHistory: { date: string; status: string; notes: string | null }[];
  sales: { date: string; amountKes: number; description: string }[];
  fedKg: number;
}

export async function getAnimal(id: string): Promise<AdminAnimal | null> {
  if (!/^[0-9a-f-]{36}$/i.test(id)) return null;
  const sql = requireSql();
  const [a] = await sql`
    select a.*, p.name as programme_name from animals a
    left join livestock_programmes p on p.id = a.programme_id where a.id = ${id}
  `;
  if (!a) return null;
  const [weights, health, feeding, costs, ownership, status, sales, fed] = await Promise.all([
    sql`select recorded_on, weight_kg from animal_weights where animal_id = ${id} order by recorded_on`,
    sql`select occurred_on, kind, title, detail from animal_health_events where animal_id = ${id} order by occurred_on desc`,
    sql`select started_on, ration, notes from animal_feedings where animal_id = ${id} order by started_on desc`,
    sql`select incurred_on, category, label, amount_kes from animal_costs where animal_id = ${id} order by incurred_on`,
    sql`select o.customer_id, o.starts_on, o.agreement_ref, pr.full_name from animal_ownerships o
        left join profiles pr on pr.id = o.customer_id
        where o.animal_id = ${id} and o.ends_on is null order by o.starts_on desc limit 1`,
    sql`select occurred_on, status, notes from animal_status_events where animal_id = ${id} order by occurred_on desc, created_at desc`,
    sql`select occurred_on, amount_kes, description from farm_transactions
        where animal_id = ${id} and category = 'livestock_sale' order by occurred_on`,
    sql`select coalesce(sum(quantity_kg), 0) as kg from fodder_stock_movements where animal_id = ${id} and reason = 'fed'`,
  ]);
  const owner = ownership[0];
  return {
    id: a.id,
    tag: a.tag,
    species: a.species,
    breed: a.breed,
    sex: a.sex,
    dateOfBirth: a.date_of_birth ?? undefined,
    estimatedAgeMonthsAtIntake: a.est_age_months_at_intake ?? undefined,
    intakeDate: a.intake_date,
    location: a.location,
    status: a.status,
    programme: a.programme_name ?? "Farm-owned",
    programmeId: a.programme_id,
    ownerId: owner?.customer_id ?? null,
    ownership: {
      holder: owner ? owner.full_name ?? "Customer" : "Tangama (farm-owned)",
      since: owner?.starts_on ?? a.intake_date,
      agreement: owner?.agreement_ref ?? undefined,
    },
    weights: weights.map((w) => ({ date: w.recorded_on, kg: Number(w.weight_kg) })),
    health: health.map((h) => ({ date: h.occurred_on, kind: h.kind, title: h.title, detail: h.detail ?? undefined })),
    feeding: feeding.map((f) => ({ date: f.started_on, ration: f.ration, notes: f.notes ?? undefined })),
    costs: costs.map((c) => ({ date: c.incurred_on, category: c.category, label: c.label, amountKes: Number(c.amount_kes) })),
    photos: [],
    statusHistory: status.map((s) => ({ date: s.occurred_on, status: s.status, notes: s.notes })),
    sales: sales.map((s) => ({ date: s.occurred_on, amountKes: Number(s.amount_kes), description: s.description })),
    fedKg: Number(fed[0].kg),
  };
}

export async function listProgrammes() {
  const sql = requireSql();
  return sql<{ id: string; name: string; public_enabled: boolean }[]>`
    select id, name, public_enabled from livestock_programmes order by name
  `;
}

export async function listCustomers() {
  const sql = requireSql();
  return sql<{ id: string; full_name: string | null; phone: string | null; county: string | null; created_at: Date; animals: number }[]>`
    select p.id, p.full_name, p.phone, p.county, p.created_at,
      (select count(*)::int from animal_ownerships o where o.customer_id = p.id and o.ends_on is null) as animals
    from profiles p where p.role = 'customer' order by p.full_name nulls last
  `;
}
