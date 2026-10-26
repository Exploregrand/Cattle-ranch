import { Suspense } from "react";
import Link from "next/link";
import { ChevronRight, Plus } from "lucide-react";

import { AdminPageHeader, AdminSkeleton } from "@/components/admin/admin-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { pageStaff } from "@/lib/admin/auth";
import { listAnimals } from "@/lib/admin/livestock";
import { formatDate, formatKg } from "@/lib/format";
import { speciesLabel } from "@/lib/livestock/metrics";
import { cn } from "@/lib/utils";

export const metadata = { title: "Livestock" };

const speciesFilters = [
  { id: undefined, label: "All" },
  { id: "sheep", label: "Sheep" },
  { id: "goats", label: "Goats" },
  { id: "cattle", label: "Cattle" },
];

async function LivestockContent({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  if (!(await pageStaff("/admin/livestock"))) return null;
  const sp = await searchParams;
  const species = typeof sp.species === "string" && ["sheep", "goats", "cattle"].includes(sp.species) ? sp.species : undefined;
  const animals = await listAnimals({ species });
  const active = animals.filter((a) => a.status === "active").length;

  return (
    <>
      <AdminPageHeader title="Livestock" description={`${active} active on farm · ${animals.length} on record`}>
        <Button asChild>
          <Link href="/admin/livestock/new">
            <Plus /> Register animal
          </Link>
        </Button>
      </AdminPageHeader>

      <nav aria-label="Filter by species" className="mb-6 flex flex-wrap gap-2">
        {speciesFilters.map((f) => (
          <Link
            key={f.label}
            href={f.id ? `/admin/livestock?species=${f.id}` : "/admin/livestock"}
            aria-current={species === f.id ? "page" : undefined}
            className={cn(
              "rounded-full border px-4 py-2 text-sm transition-colors",
              species === f.id ? "border-forest-900 bg-forest-900 text-cream-50" : "border-border bg-white text-ink-soft hover:border-forest-600",
            )}
          >
            {f.label}
          </Link>
        ))}
      </nav>

      {animals.length === 0 ? (
        <div className="rounded-[1.5rem] border border-dashed border-ink-muted/30 bg-white px-6 py-16 text-center">
          <p className="font-display text-2xl font-medium text-forest-950">No animals registered yet</p>
          <p className="mx-auto mt-2 max-w-md text-ink-soft">
            Register each animal at intake. It gets a unique ID such as TGM-SH-0001, and its weights, health, feeding and costs are
            recorded from day one.
          </p>
          <Button asChild className="mt-6">
            <Link href="/admin/livestock/new">
              <Plus /> Register the first animal
            </Link>
          </Button>
        </div>
      ) : (
        <ul className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-white">
          {animals.map((a) => (
            <li key={a.id}>
              <Link href={`/admin/livestock/${a.id}`} className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-cream-50">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-medium text-forest-950">{a.tag}</span>
                    {a.status !== "active" && <Badge variant="soon" className="capitalize">{a.status}</Badge>}
                  </div>
                  <p className="mt-0.5 truncate text-sm text-ink-soft">
                    {a.breed} {speciesLabel[a.species].toLowerCase()} · {a.sex === "male" ? "Male" : "Female"} · {a.ownerName ?? "Farm-owned"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-forest-950 tabular">{a.latestKg !== null ? formatKg(a.latestKg) : "—"}</p>
                  <p className="text-xs text-ink-muted">{a.latestOn ? formatDate(a.latestOn) : "Not weighed"}</p>
                </div>
                <ChevronRight className="size-4 text-ink-muted" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default function LivestockPage({ searchParams }: PageProps<"/admin/livestock">) {
  return (
    <Suspense fallback={<AdminSkeleton />}>
      <LivestockContent searchParams={searchParams} />
    </Suspense>
  );
}
