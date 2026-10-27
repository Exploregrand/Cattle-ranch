import "server-only";

import { requireSql } from "@/lib/db";

export interface Registration {
  id: string;
  fullName: string;
  phone: string;
  email: string | null;
  location: string | null;
  interests: string[];
  message: string | null;
  status: "new" | "contacted" | "closed";
  createdAt: Date;
}

export async function listRegistrations(status?: string): Promise<Registration[]> {
  const sql = requireSql();
  const rows = await sql`
    select * from early_access_registrations
    where ${status ?? null}::text is null or status = ${status ?? null}
    order by created_at desc limit 500
  `;
  return rows.map((r) => ({
    id: r.id,
    fullName: r.full_name,
    phone: r.phone,
    email: r.email,
    location: r.location,
    interests: r.interests,
    message: r.message,
    status: r.status,
    createdAt: r.created_at,
  }));
}

export async function registrationCounts() {
  const sql = requireSql();
  const rows = await sql`
    select count(*)::int as total,
      count(*) filter (where status = 'new')::int as new,
      count(*) filter (where 'sheep' = any(interests))::int as sheep,
      count(*) filter (where 'goats' = any(interests))::int as goats,
      count(*) filter (where 'cattle' = any(interests))::int as cattle,
      count(*) filter (where 'managed' = any(interests))::int as managed,
      count(*) filter (where 'qurbani' = any(interests))::int as qurbani
    from early_access_registrations
  `;
  return rows[0] as Record<"total" | "new" | "sheep" | "goats" | "cattle" | "managed" | "qurbani", number>;
}

export interface InvestorLead {
  id: string;
  fullName: string;
  phone: string;
  email: string | null;
  county: string;
  investorType: string;
  route: string;
  ticket: string | null;
  message: string | null;
  status: "new" | "contacted" | "closed";
  createdAt: Date;
}

export async function listInvestorInterest(): Promise<InvestorLead[]> {
  const sql = requireSql();
  const rows = await sql`select * from investor_interest order by created_at desc limit 500`;
  return rows.map((r) => ({
    id: r.id,
    fullName: r.full_name,
    phone: r.phone,
    email: r.email,
    county: r.county,
    investorType: r.investor_type,
    route: r.route,
    ticket: r.ticket,
    message: r.message,
    status: r.status,
    createdAt: r.created_at,
  }));
}
