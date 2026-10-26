import "server-only";

import { redirect } from "next/navigation";
import { connection } from "next/server";

import { getSql } from "@/lib/db";
import { getSupabaseConfig } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type StaffRole = "admin" | "farm_manager";

export interface Staff {
  /** Profile id, or null for the local development owner. */
  id: string | null;
  name: string;
  role: StaffRole;
  localDev: boolean;
}

export type StaffResult = { state: "ok"; staff: Staff } | { state: "no-database" };

/**
 * Resolves the signed-in staff member. With Supabase configured, a real account with an
 * admin or farm_manager role is required. Without it, development builds get a local owner
 * session; production builds never do.
 */
export async function getStaff(nextPath = "/admin"): Promise<StaffResult> {
  await connection();
  const sql = getSql();
  if (!sql) return { state: "no-database" };

  if (!getSupabaseConfig()) {
    if (process.env.NODE_ENV === "production") {
      redirect(`/sign-in?next=${encodeURIComponent(nextPath)}`);
    }
    return { state: "ok", staff: { id: null, name: "Local owner", role: "admin", localDev: true } };
  }

  const supabase = (await createSupabaseServerClient())!;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect(`/sign-in?next=${encodeURIComponent(nextPath)}`);

  const [profile] = await sql<{ full_name: string | null; role: string }[]>`
    select full_name, role from public.profiles where id = ${user.id}
  `;
  // Customers (or unknown profiles) are sent to their own dashboard.
  if (!profile || (profile.role !== "admin" && profile.role !== "farm_manager")) redirect("/dashboard");
  return {
    state: "ok",
    staff: { id: user.id, name: profile.full_name ?? user.email ?? "Staff", role: profile.role as StaffRole, localDev: false },
  };
}

/** For server actions: throws instead of redirecting. */
export async function assertStaff(adminOnly = false): Promise<Staff> {
  const result = await getStaff();
  if (result.state !== "ok") throw new Error("Database not configured.");
  if (adminOnly && result.staff.role !== "admin") throw new Error("Only an admin can do this.");
  return result.staff;
}

/** Page guard: resolves staff or redirects. Admin-only pages send farm managers to /admin. */
export async function pageStaff(path: string, adminOnly = false): Promise<Staff | null> {
  const result = await getStaff(path);
  if (result.state !== "ok") return null;
  if (adminOnly && result.staff.role !== "admin") redirect("/admin");
  return result.staff;
}
