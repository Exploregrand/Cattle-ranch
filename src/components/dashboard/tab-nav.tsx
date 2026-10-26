"use client";

import { Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Home, Layers, UserRound } from "lucide-react";

import { cn } from "@/lib/utils";

function tabsFor(base: string, pathname: string | null) {
  const tabs = [
    { href: base, label: "Home", icon: Home },
    { href: `${base}/livestock`, label: "My Livestock", icon: Layers },
    { href: `${base}/explore`, label: "Explore", icon: Compass },
    { href: `${base}/account`, label: "Account", icon: UserRound },
  ];
  return tabs.map((tab) => ({
    ...tab,
    active: pathname !== null && (tab.href === base ? pathname === base : pathname.startsWith(tab.href)),
  }));
}

type Tabs = ReturnType<typeof tabsFor>;

function DesktopTabsView({ tabs }: { tabs: Tabs }) {
  return (
    <nav aria-label="Dashboard" className="hidden items-center gap-1 rounded-full bg-cream-100 p-1 md:flex">
      {tabs.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          aria-current={tab.active ? "page" : undefined}
          className={cn(
            "rounded-full px-4 py-2 text-sm transition-colors",
            tab.active
              ? "bg-white font-medium text-forest-900 shadow-[0_1px_2px_rgba(20,42,29,0.08)]"
              : "text-ink-soft hover:text-forest-900",
          )}
        >
          {tab.label}
        </Link>
      ))}
    </nav>
  );
}

function MobileTabBarView({ tabs }: { tabs: Tabs }) {
  return (
    <nav
      aria-label="Dashboard"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-cream-50/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden"
    >
      <ul className="grid grid-cols-4">
        {tabs.map(({ href, label, icon: Icon, active }) => (
          <li key={href}>
            <Link
              href={href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex h-16 flex-col items-center justify-center gap-1 text-[0.7rem]",
                active ? "font-medium text-forest-900" : "text-ink-muted",
              )}
            >
              <span
                className={cn(
                  "flex h-7 w-12 items-center justify-center rounded-full transition-colors",
                  active && "bg-forest-100",
                )}
              >
                <Icon className="size-[1.15rem]" strokeWidth={active ? 2.2 : 1.8} aria-hidden="true" />
              </span>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function ActiveDesktopTabs({ base }: { base: string }) {
  return <DesktopTabsView tabs={tabsFor(base, usePathname())} />;
}

function ActiveMobileTabBar({ base }: { base: string }) {
  return <MobileTabBarView tabs={tabsFor(base, usePathname())} />;
}

/** The pathname is request data, so the active state streams in behind a static shell. */
export function DesktopTabs({ base }: { base: string }) {
  return (
    <Suspense fallback={<DesktopTabsView tabs={tabsFor(base, null)} />}>
      <ActiveDesktopTabs base={base} />
    </Suspense>
  );
}

export function MobileTabBar({ base }: { base: string }) {
  return (
    <Suspense fallback={<MobileTabBarView tabs={tabsFor(base, null)} />}>
      <ActiveMobileTabBar base={base} />
    </Suspense>
  );
}
