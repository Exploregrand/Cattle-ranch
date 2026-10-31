import Link from "next/link";

import { Wordmark } from "@/components/brand/wordmark";
import { BackToTop } from "@/components/site/back-to-top";
import { farm } from "@/content/site";

const links = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/early-access", label: "Register interest" },
  { href: "/livestock", label: "Livestock" },
  { href: "/qurbani", label: "Qurbani" },
  { href: "/sign-in", label: "Owner sign in" },
  { href: "/farm", label: "The farm" },
  { href: "/demo", label: "App preview" },
  { href: "/#questions", label: "Questions" },
  { href: "/investors", label: "Investors" },
  { href: "/privacy", label: "Privacy" },
];

export function SiteFooter() {
  return (
    <footer className="bg-forest-950 text-cream-100">
      <BackToTop />
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Wordmark tone="light" />
            <p className="mt-5 text-[0.9375rem] leading-relaxed text-cream-100/65">
              Herd & Field is a Tangama Farm company, based in {farm.location}, Kenya. Livestock raised on our own fodder, with every record kept for its owner.
            </p>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-14 gap-y-3">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="label-caps text-[0.8125rem] text-cream-100/70 transition-colors hover:text-cream-50">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="mt-14 max-w-4xl border-t border-cream-50/10 pt-6 text-[0.8125rem] leading-relaxed text-cream-100/50">
          Herd & Field has not yet launched. No livestock, purchases, investments or payments are offered on this website. Any
          future programme will open only after commercial and legal review, and will never promise guaranteed returns.
        </p>
      </div>
    </footer>
  );
}
