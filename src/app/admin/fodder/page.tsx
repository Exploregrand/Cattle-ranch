import { Suspense } from "react";

import { AdminSkeleton } from "@/components/admin/admin-shell";
import { today } from "@/app/admin/_actions/shared";
import { AdminPageHeader } from "@/components/admin/admin-shell";
import { Panel } from "@/components/admin/fields";
import { ActivityForm, PlantForm } from "@/components/admin/fodder-forms";
import { BedMap, CropLegend, FodderTabs } from "@/components/admin/fodder-ui";
import { pageStaff } from "@/lib/admin/auth";
import { getBeds, getStock } from "@/lib/admin/fodder";
import { crops } from "@/lib/admin/vocab";
import { requireSql } from "@/lib/db";
import { formatKg } from "@/lib/format";

export const metadata = { title: "Fodder" };

async function FodderPageContent() {
  if (!(await pageStaff("/admin/fodder"))) return null;
  const sql = requireSql();
  const t = today();
  const [beds, stock, [harvest]] = await Promise.all([
    getBeds(),
    getStock(),
    sql`select coalesce(sum(yield_kg), 0) as kg from fodder_activities
        where kind = 'harvest' and occurred_on >= ${`${t.slice(0, 7)}-01`}::date`,
  ]);
  const planted = beds.filter((b) => b.crop).length;

  return (
    <>
      <AdminPageHeader title="Fodder" description={`${beds.length} beds across Sections A, B and C`} />
      <FodderTabs active="beds" />

      <dl className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { label: "Beds planted", value: `${planted} / ${beds.length}` },
          { label: "Harvested this month", value: formatKg(Number(harvest.kg)) },
          { label: "Fodder in stock", value: formatKg(stock.totalKg) },
          { label: "Fed to livestock this month", value: formatKg(stock.fedThisMonthKg) },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-white p-4 sm:p-5">
            <dt className="text-xs text-ink-muted">{s.label}</dt>
            <dd className="mt-1.5 font-display text-2xl font-medium text-forest-950 tabular">{s.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <CropLegend />
        <p className="text-xs text-ink-muted">
          {crops.map((c) => `${c.code} ${beds.filter((b) => b.crop === c.id).length}`).join(" · ")}
        </p>
      </div>
      <BedMap beds={beds} />
      <p className="mt-3 text-xs text-ink-muted">Tap a bed to see its history or record work on it.</p>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <Panel title="Log work on several beds" description="Irrigation, harvests, fertiliser, weeding and more." className="scroll-mt-20" id="log">
          <ActivityForm />
        </Panel>
        <Panel title="Plant beds" description="Set the crop for a range of beds.">
          <PlantForm />
        </Panel>
      </div>
    </>
  );
}

export default function FodderPage() {
  return (
    <Suspense fallback={<AdminSkeleton />}>
      <FodderPageContent />
    </Suspense>
  );
}
