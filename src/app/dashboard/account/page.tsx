import { Suspense } from "react";

import { signOut } from "@/app/actions/auth";
import { DashboardSkeleton } from "@/app/dashboard/loading-skeleton";
import { AccountsNotConnected, AccountView } from "@/components/dashboard/account-view";
import { Button } from "@/components/ui/button";
import { getLivePortfolio } from "@/lib/livestock/live";

async function LiveAccount() {
  const result = await getLivePortfolio("/dashboard/account");
  if (result.state === "unconfigured") return <AccountsNotConnected />;
  return (
    <AccountView
      customer={result.portfolio.customer}
      action={
        <form action={signOut}>
          <Button type="submit" variant="outline">
            Sign out
          </Button>
        </form>
      }
    />
  );
}

export default function DashboardAccountPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <LiveAccount />
    </Suspense>
  );
}
