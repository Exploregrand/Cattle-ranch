import type { Metadata } from "next";
import { Suspense } from "react";

import { AdminShell, SetupRequired } from "@/components/admin/admin-shell";
import { getStaff } from "@/lib/admin/auth";

export const metadata: Metadata = {
  title: { default: "Farm Ops", template: "%s · Farm Ops" },
  robots: { index: false },
};

async function Frame({ children }: { children: React.ReactNode }) {
  const result = await getStaff();
  if (result.state === "no-database") return <SetupRequired />;
  return <AdminShell staff={result.staff}>{children}</AdminShell>;
}

function FrameSkeleton() {
  return (
    <div className="flex min-h-svh flex-1">
      <div className="hidden w-64 bg-forest-950 lg:block" />
      <div className="flex-1 animate-pulse space-y-4 p-10">
        <div className="h-9 w-64 rounded bg-cream-200" />
        <div className="h-32 rounded-2xl bg-cream-100" />
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return (
    <Suspense fallback={<FrameSkeleton />}>
      <Frame>{children}</Frame>
    </Suspense>
  );
}
