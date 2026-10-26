import Link from "next/link";

import { Wordmark } from "@/components/brand/wordmark";
import { farm } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="bg-forest-950 text-cream-100">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Wordmark tone="light" />
            <p className="mt-4 text-sm leading-relaxed text-cream-100/70">
              {farm.name}, {farm.location}, Kenya. Building a transparent livestock
              platform on a foundation of home-grown fodder.
            </p>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm sm:gap-x-16">
            <Link href="/#livestock" className="text-cream-100/80 hover:text-cream-50">Livestock</Link>
            <Link href="/early-access" className="text-cream-100/80 hover:text-cream-50">Early access</Link>
            <Link href="/#how-it-works" className="text-cream-100/80 hover:text-cream-50">How it works</Link>
            <Link href="/sign-in" className="text-cream-100/80 hover:text-cream-50">Customer sign in</Link>
            <Link href="/#farm" className="text-cream-100/80 hover:text-cream-50">Our farm</Link>
            <Link href="/demo" className="text-cream-100/80 hover:text-cream-50">Dashboard demo</Link>
          </nav>
        </div>
        <div className="mt-12 border-t border-cream-50/10 pt-6 text-xs leading-relaxed text-cream-100/55">
          <p>
            Cattle Buy has not yet launched. No livestock, purchases, investments
            or payments are offered on this website. Any future programme will open only
            after commercial and legal review, and will never promise guaranteed returns.
          </p>
        </div>
      </div>
    </footer>
  );
}
