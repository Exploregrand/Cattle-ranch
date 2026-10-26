import Link from "next/link";

import { Wordmark } from "@/components/brand/wordmark";
import { DesktopTabs, MobileTabBar } from "@/components/dashboard/tab-nav";

export function DemoBanner() {
  return (
    <div className="bg-gold-200 text-forest-950">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-2.5 text-[0.8rem] sm:px-8">
        <p>
          <strong className="font-semibold">Demo mode.</strong>{" "}
          <span className="text-forest-950/80">
            Sample data only — these are not real animals, customers or records.
          </span>
        </p>
        <Link href="/" className="shrink-0 font-medium underline underline-offset-4">
          Exit demo
        </Link>
      </div>
    </div>
  );
}

export function AppShell({
  base,
  banner,
  children,
}: {
  base: "/dashboard" | "/demo";
  banner?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-cream-50">
      <div className="sticky top-0 z-40">
        {banner}
        <header className="border-b border-border/70 bg-cream-50/90 backdrop-blur-md">
          <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-6 px-5 sm:px-8">
            <Wordmark href={base} />
            <DesktopTabs base={base} />
            <Link href="/" className="hidden text-sm text-ink-soft hover:text-forest-900 lg:inline">
              Tangama website
            </Link>
          </div>
        </header>
      </div>
      <main className="mx-auto w-full max-w-5xl flex-1 px-5 pt-6 pb-safe-tabbar sm:px-8 sm:pt-10 md:pb-16">
        {children}
      </main>
      <MobileTabBar base={base} />
    </div>
  );
}
