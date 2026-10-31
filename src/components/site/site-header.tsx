import Link from "next/link";

import { Wordmark } from "@/components/brand/wordmark";
import { MobileMenu } from "@/components/site/mobile-menu";
import { NavLinks } from "@/components/site/nav-links";
import { SmartHeader } from "@/components/site/smart-header";
import { Button } from "@/components/ui/button";

export const siteNav = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/livestock", label: "Livestock" },
  { href: "/qurbani", label: "Qurbani" },
  { href: "/farm", label: "The farm" },
  { href: "/investors", label: "Investors" },
];

export function SiteHeader() {
  return (
    <SmartHeader>
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-6 px-6 sm:px-8">
        <Wordmark />
        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          <NavLinks items={siteNav} />
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
    </SmartHeader>
  );
}
