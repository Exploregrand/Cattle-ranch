import { Suspense } from "react";

import { AdminSkeleton } from "@/components/admin/admin-shell";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";

import { today } from "@/app/admin/_actions/shared";
import { Panel } from "@/components/admin/fields";
import { ActivityForm, ClearForm, PlantForm } from "@/components/admin/fodder-forms";
import { cropName } from "@/components/admin/fodder-ui";
import { pageStaff } from "@/lib/admin/auth";
import { getActivity, getBeds } from "@/lib/admin/fodder";
import { activityLabel, cropById } from "@/lib/admin/vocab";
import { daysBetween, formatDate, formatDaysAgo, formatKg } from "@/lib/format";

async function BedPageContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!(await pageStaff(`/admin/fodder/beds/${id}`))) return null;
  const bed = (await getBeds()).find((b) => b.id === id.toUpperCase());
  if (!bed) notFound();
  const history = await getActivity({ bedId: bed.id, limit: 100 });
  const t = today();
  const crop = bed.crop ? cropById[bed.crop] : null;

  return (
    <>
      <Link href="/admin/fodder" className="-ml-1 inline-flex items-center gap-1 text-sm text-ink-soft hover:text-forest-900">
        <ChevronLeft className="size-4" aria-hidden="true" /> All beds
      </Link>
      <div className="mb-8 mt-4 flex flex-wrap items-center gap-4">
        <span
          className="flex size-16 items-center justify-center rounded-2xl font-mono text-lg font-medium text-white"
          style={{ background: crop?.color ?? "#d9d0bd" }}
        >
          {bed.id}
        </span>
        <div>
          <h1 className="font-display text-[1.9rem] font-medium leading-tight tracking-[-0.025em] text-forest-950">
            Bed {bed.id}
          </h1>
          <p className="text-ink-soft">
            Section {bed.section} · {cropName(bed.crop)}
            {bed.plantedOn && ` · planted ${formatDate(bed.plantedOn)}`}
          </p>
        </div>
      </div>

      <dl className="mb-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { label: "Crop age", value: bed.plantedOn ? `${daysBetween(bed.plantedOn, t)} days` : "—" },
          { label: "Last irrigated", value: bed.lastIrrigation ? formatDaysAgo(bed.lastIrrigation, t) : "Not recorded" },
          { label: "Last harvested", value: bed.lastHarvest ? formatDaysAgo(bed.lastHarvest, t) : "Not recorded" },
          { label: "Yield this planting", value: formatKg(bed.totalYieldKg) },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-white p-4 sm:p-5">
            <dt className="text-xs text-ink-muted">{s.label}</dt>
            <dd className="mt-1.5 font-display text-xl font-medium text-forest-950 tabular">{s.value}</dd>
          </div>
        ))}
      </dl>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <Panel title="Log work">
          <ActivityForm bedId={bed.id} />
        </Panel>
        <div className="space-y-6">
          <Panel title={bed.crop ? "Replant" : "Plant"}>
            <PlantForm bedId={bed.id} />
          </Panel>
          {bed.crop && (
            <Panel title="Clear bed" description="End the current crop without replanting.">
              <ClearForm bedId={bed.id} />
            </Panel>
          )}
        </div>
      </div>

      <Panel title="History" className="mt-6">
        {history.length === 0 ? (
          <p className="text-sm text-ink-muted">Nothing recorded for this bed yet.</p>
        ) : (
          <ol className="-my-3 divide-y divide-border">
            {history.map((h) => (
              <li key={h.id} className="flex items-start justify-between gap-4 py-3">
                <div>
                  <p className="text-sm font-medium text-forest-950">
                    {h.kind === "planting" ? `Planted ${cropName(h.crop)}` : activityLabel[h.kind]}
                    {h.yieldKg !== null && ` · ${formatKg(h.yieldKg)}`}
                  </p>
                  {h.notes && <p className="mt-0.5 text-sm text-ink-soft">{h.notes}</p>}
                </div>
                <time className="shrink-0 text-xs text-ink-muted">{formatDate(h.occurredOn)}</time>
              </li>
            ))}
          </ol>
        )}
      </Panel>
    </>
  );
}

export default function BedPage({ params }: PageProps<"/admin/fodder/beds/[id]">) {
  return (
    <Suspense fallback={<AdminSkeleton />}>
      <BedPageContent params={params} />
    </Suspense>
  );
}
