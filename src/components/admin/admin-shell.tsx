import Link from "next/link";
import { ExternalLink } from "lucide-react";

import { Wordmark } from "@/components/brand/wordmark";
import { BottomNav, SideNav } from "@/components/admin/admin-nav";
import type { Staff } from "@/lib/admin/auth";

export function AdminShell({ staff, children }: { staff: Staff; children: React.ReactNode }) {
  const isAdmin = staff.role === "admin";
  return (
    <div className="flex min-h-full flex-1 bg-cream-50">
      <aside className="sticky top-0 hidden h-svh w-64 shrink-0 flex-col bg-forest-950 px-4 py-6 lg:flex">
        <div className="px-3">
          <Wordmark tone="light" href="/admin" />
          <p className="mt-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-cream-100/45">Farm Ops</p>
        </div>
        <div className="mt-10 flex-1">
          <SideNav isAdmin={isAdmin} />
        </div>
        <div className="space-y-4 border-t border-cream-50/10 px-3 pt-5">
          <div>
            <p className="text-sm font-medium text-cream-50">{staff.name}</p>
            <p className="text-xs text-cream-100/55">{isAdmin ? "Owner / Admin" : "Farm manager"}</p>
          </div>
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-cream-100/60 hover:text-cream-50">
            Customer website <ExternalLink className="size-3" aria-hidden="true" />
          </Link>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-cream-50/95 px-5 backdrop-blur lg:hidden">
          <div className="flex items-baseline gap-2.5">
            <Wordmark href="/admin" />
            <span className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-ink-muted">Farm Ops</span>
          </div>
          <span className="text-xs text-ink-muted">{staff.name}</span>
        </header>
        {staff.localDev && (
          <p className="border-b border-gold-200 bg-gold-200/50 px-5 py-2 text-xs text-forest-950 lg:px-10">
            <strong className="font-semibold">Local development.</strong> Signed in automatically as the owner. Production
            requires a staff account.
          </p>
        )}
        <main className="mx-auto w-full max-w-6xl flex-1 px-5 pb-28 pt-6 sm:pt-8 lg:px-10 lg:pb-16 lg:pt-10">{children}</main>
      </div>
      <BottomNav isAdmin={isAdmin} />
    </div>
  );
}

export function AdminPageHeader({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="font-display text-[1.9rem] font-medium leading-tight tracking-[-0.025em] text-forest-950 sm:text-[2.2rem]">
          {title}
        </h1>
        {description && <p className="mt-1.5 text-ink-soft">{description}</p>}
      </div>
      {children && <div className="flex flex-wrap gap-2">{children}</div>}
    </div>
  );
}

export function SetupRequired() {
  return (
    <div className="mx-auto max-w-lg px-5 py-24 text-center">
      <Wordmark />
      <h1 className="mt-8 font-display text-3xl font-medium text-forest-950">Connect the farm database</h1>
      <p className="mt-3 leading-relaxed text-ink-soft">
        Farm Ops stores fodder, livestock and finance records in Postgres. Set <code className="font-mono text-sm">DATABASE_URL</code>{" "}
        to your Supabase connection string and run the migrations in <code className="font-mono text-sm">supabase/migrations</code>.
      </p>
    </div>
  );
}

export function AdminSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading" className="animate-pulse space-y-6">
      <div className="h-9 w-56 rounded-lg bg-cream-200" />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-24 rounded-2xl bg-cream-100" />
        ))}
      </div>
      <div className="h-72 rounded-2xl bg-cream-100" />
    </div>
  );
}
