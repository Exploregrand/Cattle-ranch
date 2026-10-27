import Link from "next/link";

import { Wordmark } from "@/components/brand/wordmark";
import { farm } from "@/content/site";

const links = [
  { href: "/#animals", label: "Animals" },
  { href: "/early-access", label: "Register interest" },
  { href: "/#care", label: "Care" },
  { href: "/sign-in", label: "Owner sign in" },
  { href: "/#farm", label: "The farm" },
  { href: "/demo", label: "App preview" },
];

export function SiteFooter() {
  return (
    <footer className="bg-forest-950 text-cream-100">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Wordmark tone="light" />
            <p className="mt-5 text-sm leading-relaxed text-cream-100/70">
              {farm.name}, {farm.location}, Kenya. Livestock raised on our own fodder, with every record kept for its owner.
            </p>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-14 gap-y-3">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="label-caps text-[0.9rem] text-cream-100/75 hover:text-cream-50">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="mt-12 border-t border-cream-50/10 pt-6 text-xs leading-relaxed text-cream-100/55">
          Tangama Livestock has not yet launched. No livestock, purchases, investments or payments are offered on this website. Any
          future programme will open only after commercial and legal review, and will never promise guaranteed returns.
        </p>
      </div>
    </footer>
  );
}
