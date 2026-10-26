import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight, Droplets, Plus, Scale, Wheat } from "lucide-react";

import { today } from "@/app/admin/_actions/shared";
import { AdminSkeleton } from "@/components/admin/admin-shell";
import { cropName } from "@/components/admin/fodder-ui";
import { pageStaff } from "@/lib/admin/auth";
import { registrationCounts } from "@/lib/admin/crm";
import { getActivity, getBeds, getStock } from "@/lib/admin/fodder";
import { listAnimals } from "@/lib/admin/livestock";
import { activityLabel, crops } from "@/lib/admin/vocab";
import { daysBetween, formatDate, formatDaysAgo, formatKg, TIME_ZONE } from "@/lib/format";

function greeting() {
  const hour = Number(new Intl.DateTimeFormat("en-GB", { hour: "numeric", hourCycle: "h23", timeZone: TIME_ZONE }).format(new Date()));
  return hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
}

async function OverviewContent() {
  const staff = await pageStaff("/admin");
  if (!staff) return null;
  const isAdmin = staff.role === "admin";
  const t = today();
  const [beds, stock, activity, animals, leads] = await Promise.all([
    getBeds(),
    getStock(),
    getActivity({ limit: 6 }),
    listAnimals({ status: "active" }),
    isAdmin ? registrationCounts() : Promise.resolve(null),
  ]);
  const planted = beds.filter((b) => b.crop);
  // Planted beds not irrigated in the last 3 days (or never).
  const dry = planted.filter((b) => !b.lastIrrigation || daysBetween(b.lastIrrigation, t) > 3);

  const tiles = [
    { label: "Beds planted", value: `${planted.length}`, sub: `of ${beds.length}`, href: "/admin/fodder" },
    { label: "Fodder in stock", value: formatKg(stock.totalKg), sub: "all crops", href: "/admin/fodder/stock" },
    { label: "Animals on farm", value: `${animals.length}`, sub: "active", href: "/admin/livestock" },
    ...(leads ? [{ label: "Early-access leads", value: `${leads.total}`, sub: `${leads.new} new`, href: "/admin/customers" }] : []),
  ];

  return (
    <>
      <p className="text-sm text-ink-muted">{formatDate(t)}</p>
      <h1 className="mt-1 font-display text-[1.9rem] font-medium leading-tight tracking-[-0.025em] text-forest-950 sm:text-[2.4rem]">
        {staff.localDev ? greeting() : `${greeting()}, ${staff.name.split(" ")[0]}`}
      </h1>

      <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {tiles.map((tile) => (
          <Link key={tile.label} href={tile.href} className="group rounded-2xl border border-border bg-white p-4 transition-colors hover:border-forest-600/40 sm:p-5">
            <p className="text-xs text-ink-muted">{tile.label}</p>
            <p className="mt-1.5 font-display text-[1.7rem] font-medium leading-none text-forest-950 tabular">{tile.value}</p>
            <p className="mt-1.5 text-xs text-ink-muted">{tile.sub}</p>
          </Link>
        ))}
      </div>

      <section className="mt-8">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted">Quick record</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { href: "/admin/fodder#log", label: "Irrigation", icon: Droplets },
            { href: "/admin/fodder#log", label: "Harvest", icon: Wheat },
            { href: "/admin/livestock", label: "Weigh-in", icon: Scale },
            { href: "/admin/livestock/new", label: "New animal", icon: Plus },
          ].map(({ href, label, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              className="flex h-20 flex-col justify-between rounded-2xl bg-forest-900 p-4 text-cream-50 transition-colors hover:bg-forest-800"
            >
              <Icon className="size-5 text-gold-400" aria-hidden="true" />
              <span className="text-sm font-medium">{label}</span>
            </Link>
          ))}
        </div>
      </section>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.25fr_1fr]">
        <section className="rounded-2xl border border-border bg-white p-5 sm:p-6">
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-xl font-medium text-forest-950">Fodder beds</h2>
            <Link href="/admin/fodder" className="text-sm font-medium text-forest-700 hover:underline">
              Open map
            </Link>
          </div>
          <div className="mt-5 flex h-3 overflow-hidden rounded-full bg-cream-200" role="img" aria-label={`${planted.length} of ${beds.length} beds planted`}>
            {crops.map((c) => {
              const n = beds.filter((b) => b.crop === c.id).length;
              return n ? <span key={c.id} style={{ width: `${(n / beds.length) * 100}%`, background: c.color }} className="border-r-2 border-white last:border-0" /> : null;
            })}
          </div>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            {crops.map((c) => (
              <li key={c.id} className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-2 text-ink-soft">
                  <span className="size-2.5 rounded-full" style={{ background: c.color }} aria-hidden="true" />
                  {c.label}
                </span>
                <span className="font-medium text-forest-950 tabular">{beds.filter((b) => b.crop === c.id).length}</span>
              </li>
            ))}
          </ul>
          {planted.length > 0 && dry.length > 0 && (
            <p className="mt-5 rounded-xl bg-gold-200/50 px-4 py-3 text-sm text-forest-950">
              <strong className="font-medium">{dry.length} planted beds</strong> have no irrigation recorded in the last 3 days.
            </p>
          )}
        </section>

        <section className="rounded-2xl border border-border bg-white p-5 sm:p-6">
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-xl font-medium text-forest-950">Latest activity</h2>
            <Link href="/admin/fodder/activity" className="inline-flex items-center gap-1 text-sm font-medium text-forest-700 hover:underline">
              All <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          </div>
          {activity.length === 0 ? (
            <p className="mt-4 text-sm text-ink-muted">Nothing recorded yet. Start by planting beds on the fodder map.</p>
          ) : (
            <ul className="mt-3 divide-y divide-border">
              {activity.map((a) => (
                <li key={a.id} className="flex justify-between gap-4 py-2.5 text-sm">
                  <span className="text-forest-950">
                    <span className="font-mono text-xs text-ink-muted">{a.bedId}</span>{" "}
                    {a.kind === "planting" ? `Planted ${cropName(a.crop)}` : activityLabel[a.kind]}
                    {a.yieldKg !== null && ` · ${formatKg(a.yieldKg)}`}
                  </span>
                  <span className="shrink-0 text-ink-muted">{formatDaysAgo(a.occurredOn, t)}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
}

export default function AdminOverviewPage() {
  return (
    <Suspense fallback={<AdminSkeleton />}>
      <OverviewContent />
    </Suspense>
  );
}
