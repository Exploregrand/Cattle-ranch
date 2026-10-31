import Link from "next/link";

import { Wordmark } from "@/components/brand/wordmark";
import { MobileMenu } from "@/components/site/mobile-menu";
import { Button } from "@/components/ui/button";

export const siteNav = [
  { href: "/#animals", label: "Animals" },
  { href: "/#care", label: "Care" },
  { href: "/#farm", label: "The farm" },
  { href: "/#qurbani", label: "Qurbani" },
  { href: "/investors", label: "Investors" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-cream-50/95 backdrop-blur">
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-6 px-6 sm:px-8">
        <Wordmark />
        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {siteNav.map((item) => (
            <Link key={item.href} href={item.href} className="label-caps text-[0.8125rem] text-ink-soft transition-colors hover:text-ink">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-5">
          <Link href="/sign-in" className="label-caps hidden text-[0.8125rem] text-ink-soft hover:text-ink lg:inline">
            Sign in
          </Link>
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/early-access">Register interest</Link>
          </Button>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
