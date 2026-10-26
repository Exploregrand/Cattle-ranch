import type { Metadata } from "next";

import { AppShell, DemoBanner } from "@/components/dashboard/app-shell";

export const metadata: Metadata = {
  title: "Dashboard demo",
  robots: { index: false },
};

export default function DemoLayout({ children }: LayoutProps<"/demo">) {
  return (
    <AppShell base="/demo" banner={<DemoBanner />}>
      {children}
    </AppShell>
  );
}
