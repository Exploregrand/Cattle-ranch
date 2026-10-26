import type { Metadata } from "next";

import { AppShell } from "@/components/dashboard/app-shell";

export const metadata: Metadata = {
  title: "My dashboard",
  robots: { index: false },
};

export default function DashboardLayout({ children }: LayoutProps<"/dashboard">) {
  return <AppShell base="/dashboard">{children}</AppShell>;
}
