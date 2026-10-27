import Link from "next/link";

import { Wordmark } from "@/components/brand/wordmark";
import { MobileMenu } from "@/components/site/mobile-menu";

export const siteNav = [
  { href: "/#animals", label: "Animals" },
  { href: "/#care", label: "Care" },
  { href: "/#farm", label: "The farm" },
  { href: "/#qurbani", label: "Qurbani" },
  { href: "/investors", label: "Investors" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-cream-50/92 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Wordmark />
        <nav aria-label="Main" className="hidden items-center gap-9 md:flex">
          {siteNav.map((item) => (
            <Link key={item.href} href={item.href} className="label-caps text-[0.95rem] text-ink-muted transition-colors hover:text-forest-950">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/sign-in" className="label-caps hidden px-3 text-[0.95rem] text-ink-muted hover:text-forest-950 lg:inline">
            Sign in
          </Link>
          <Link
            href="/early-access"
            className="label-caps hidden h-11 items-center rounded-full bg-forest-950 px-5 text-[0.95rem] font-bold text-cream-50 hover:bg-clay sm:inline-flex"
          >
            Register interest
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
