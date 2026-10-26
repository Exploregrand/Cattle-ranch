import { Suspense } from "react";

import { DashboardSkeleton } from "@/app/dashboard/loading-skeleton";
import { LivestockView } from "@/components/dashboard/livestock-view";
import { UnconfiguredNotice } from "@/components/dashboard/notices";
import { getLivePortfolio } from "@/lib/livestock/live";

async function LiveLivestock() {
  const result = await getLivePortfolio("/dashboard/livestock");
  return (
    <>
      {result.state === "unconfigured" && <UnconfiguredNotice />}
      <LivestockView animals={result.state === "ready" ? result.portfolio.animals : []} base="/dashboard" />
    </>
  );
}

export default function DashboardLivestockPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <LiveLivestock />
    </Suspense>
  );
}
