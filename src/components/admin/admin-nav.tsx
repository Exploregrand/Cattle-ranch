"use client";

import { Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Banknote, LayoutGrid, Sprout, Tag, Users } from "lucide-react";

import { cn } from "@/lib/utils";

const items = [
  { href: "/admin", label: "Overview", icon: LayoutGrid, adminOnly: false },
  { href: "/admin/fodder", label: "Fodder", icon: Sprout, adminOnly: false },
  { href: "/admin/livestock", label: "Livestock", icon: Tag, adminOnly: false },
  { href: "/admin/customers", label: "Customers", icon: Users, adminOnly: true },
  { href: "/admin/finance", label: "Finance", icon: Banknote, adminOnly: true },
];

function visible(isAdmin: boolean, pathname: string | null) {
  return items
    .filter((i) => isAdmin || !i.adminOnly)
    .map((i) => ({
      ...i,
      active: pathname !== null && (i.href === "/admin" ? pathname === "/admin" : pathname.startsWith(i.href)),
    }));
}

function SideNavView({ links }: { links: ReturnType<typeof visible> }) {
  return (
    <nav aria-label="Farm Ops" className="space-y-1">
      {links.map(({ href, label, icon: Icon, active }) => (
        <Link
          key={href}
          href={href}
          aria-current={active ? "page" : undefined}
          className={cn(
            "flex h-11 items-center gap-3 rounded-xl px-3.5 text-sm transition-colors",
            active ? "bg-cream-50/10 font-medium text-cream-50" : "text-cream-100/65 hover:bg-cream-50/5 hover:text-cream-50",
          )}
        >
          <Icon className={cn("size-[1.1rem]", active ? "text-gold-400" : "")} aria-hidden="true" />
          {label}
        </Link>
      ))}
    </nav>
  );
}

function BottomNavView({ links }: { links: ReturnType<typeof visible> }) {
  return (
    <nav
      aria-label="Farm Ops"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white pb-[env(safe-area-inset-bottom)] lg:hidden"
    >
      <ul className="flex">
        {links.map(({ href, label, icon: Icon, active }) => (
          <li key={href} className="flex-1">
            <Link
              href={href}
              aria-current={active ? "page" : undefined}
              className={cn("flex h-16 flex-col items-center justify-center gap-1 text-[0.68rem]", active ? "font-semibold text-forest-900" : "text-ink-muted")}
            >
              <span className={cn("flex h-7 w-11 items-center justify-center rounded-full", active && "bg-forest-100")}>
                <Icon className="size-[1.15rem]" aria-hidden="true" />
              </span>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function ActiveSide({ isAdmin }: { isAdmin: boolean }) {
  return <SideNavView links={visible(isAdmin, usePathname())} />;
}
function ActiveBottom({ isAdmin }: { isAdmin: boolean }) {
  return <BottomNavView links={visible(isAdmin, usePathname())} />;
}

export function SideNav({ isAdmin }: { isAdmin: boolean }) {
  return (
    <Suspense fallback={<SideNavView links={visible(isAdmin, null)} />}>
      <ActiveSide isAdmin={isAdmin} />
    </Suspense>
  );
}
export function BottomNav({ isAdmin }: { isAdmin: boolean }) {
  return (
    <Suspense fallback={<BottomNavView links={visible(isAdmin, null)} />}>
      <ActiveBottom isAdmin={isAdmin} />
    </Suspense>
  );
}
