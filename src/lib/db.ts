import "server-only";

import postgres from "postgres";

declare global {
  var __cattleBuySql: postgres.Sql | undefined;
}

/**
 * Direct Postgres access for Farm Ops (server only). Staff permissions are checked in
 * the app before every query; customer-facing reads go through Supabase with RLS instead.
 */
export function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  globalThis.__cattleBuySql ??= postgres(url, {
    max: 5,
    idle_timeout: 20,
    prepare: false, // compatible with Supabase's transaction pooler
    types: { date: { to: 1082, from: [1082], serialize: (v: string) => v, parse: (v: string) => v } },
  });
  return globalThis.__cattleBuySql;
}

export function requireSql() {
  const sql = getSql();
  if (!sql) throw new Error("DATABASE_URL is not configured.");
  return sql;
}
