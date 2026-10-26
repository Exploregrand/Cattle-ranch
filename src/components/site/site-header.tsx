import Link from "next/link";

import { Wordmark } from "@/components/brand/wordmark";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "@/components/site/mobile-menu";
import { cn } from "@/lib/utils";

export const siteNav = [
  { href: "/#livestock", label: "Livestock" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#farm", label: "Our farm" },
];

/** `overlay` sits transparently on top of the dark hero; `solid` is for inner pages. */
export function SiteHeader({ variant = "solid" }: { variant?: "overlay" | "solid" }) {
  const overlay = variant === "overlay";
  return (
    <header
      className={cn(
        "z-40 w-full",
        overlay ? "absolute inset-x-0 top-0" : "sticky top-0 border-b border-border/70 bg-cream-50/90 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Wordmark tone={overlay ? "light" : "dark"} />

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {siteNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm transition-colors",
                overlay ? "text-cream-100/85 hover:text-cream-50" : "text-ink-soft hover:text-forest-900",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/sign-in"
            className={cn(
              "hidden px-3 text-sm md:inline",
              overlay ? "text-cream-100/85 hover:text-cream-50" : "text-ink-soft hover:text-forest-900",
            )}
          >
            Sign in
          </Link>
          <Button asChild size="sm" variant={overlay ? "light" : "default"} className="hidden sm:inline-flex">
            <Link href="/early-access">Early access</Link>
          </Button>
          <MobileMenu tone={overlay ? "light" : "dark"} />
        </div>
      </div>
    </header>
  );
}
