import Link from "next/link";

import { AccountView } from "@/components/dashboard/account-view";
import { Button } from "@/components/ui/button";
import { demoPortfolio } from "@/lib/livestock/demo-data";

export default function DemoAccountPage() {
  return (
    <AccountView
      customer={demoPortfolio.customer}
      action={
        <Button asChild variant="outline">
          <Link href="/">Exit demo</Link>
        </Button>
      }
    />
  );
}
