import { Suspense } from "react";

import { AdminSkeleton } from "@/components/admin/admin-shell";
import Link from "next/link";

import { AdminPageHeader } from "@/components/admin/admin-shell";
import { Panel } from "@/components/admin/fields";
import { cropName, FodderTabs } from "@/components/admin/fodder-ui";
import { pageStaff } from "@/lib/admin/auth";
import { getActivity } from "@/lib/admin/fodder";
import { activityLabel } from "@/lib/admin/vocab";
import { formatDate, formatKg } from "@/lib/format";

export const metadata = { title: "Fodder activity" };

async function FodderActivityPageContent() {
  if (!(await pageStaff("/admin/fodder/activity"))) return null;
  const log = await getActivity({ limit: 300 });
  return (
    <>
      <AdminPageHeader title="Fodder" description="Everything recorded on the beds, newest first" />
      <FodderTabs active="activity" />
      <Panel title="Activity log" description={`${log.length} most recent entries`}>
        {log.length === 0 ? (
          <p className="text-sm text-ink-muted">
            No activity yet. Record plantings and work from the <Link href="/admin/fodder" className="font-medium text-forest-800 underline">bed map</Link>.
          </p>
        ) : (
          <div className="-mx-5 overflow-x-auto sm:-mx-6">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs text-ink-muted">
                  <th className="px-5 py-2.5 font-normal sm:px-6">Date</th>
                  <th className="py-2.5 font-normal">Bed</th>
                  <th className="py-2.5 font-normal">Activity</th>
                  <th className="py-2.5 text-right font-normal">Yield</th>
                  <th className="px-5 py-2.5 font-normal sm:px-6">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {log.map((h) => (
                  <tr key={h.id}>
                    <td className="whitespace-nowrap px-5 py-3 text-ink-soft sm:px-6">{formatDate(h.occurredOn)}</td>
                    <td className="py-3">
                      <Link href={`/admin/fodder/beds/${h.bedId}`} className="font-mono font-medium text-forest-800 hover:underline">
                        {h.bedId}
                      </Link>
                    </td>
                    <td className="py-3 text-forest-950">{h.kind === "planting" ? `Planted ${cropName(h.crop)}` : activityLabel[h.kind]}</td>
                    <td className="py-3 text-right tabular">{h.yieldKg !== null ? formatKg(h.yieldKg) : "—"}</td>
                    <td className="max-w-64 truncate px-5 py-3 text-ink-muted sm:px-6">{h.notes ?? ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>
    </>
  );
}

export default function FodderActivityPage() {
  return (
    <Suspense fallback={<AdminSkeleton />}>
      <FodderActivityPageContent />
    </Suspense>
  );
}
