import { Suspense } from "react";

import { DashboardSkeleton } from "@/app/dashboard/loading-skeleton";
import { HomeView } from "@/components/dashboard/home-view";
import { UnconfiguredNotice } from "@/components/dashboard/notices";
import { emptyPortfolio } from "@/lib/livestock/empty";
import { getLivePortfolio } from "@/lib/livestock/live";

async function LiveHome() {
  const result = await getLivePortfolio("/dashboard");
  if (result.state === "unconfigured") {
    return (
      <>
        <UnconfiguredNotice />
        <HomeView portfolio={emptyPortfolio()} base="/dashboard" />
      </>
    );
  }
  return <HomeView portfolio={result.portfolio} base="/dashboard" />;
}

export default function DashboardHomePage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <LiveHome />
    </Suspense>
  );
}
