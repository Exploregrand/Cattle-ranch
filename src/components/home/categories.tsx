import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SectionHeading } from "@/components/home/section-heading";
import { categories } from "@/content/site";
import { cn } from "@/lib/utils";

export function Categories() {
  return (
    <section id="livestock" className="scroll-mt-20 bg-cream-100">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <SectionHeading
          eyebrow="Livestock"
          title="Sheep, goats and cattle"
          body="Three categories, raised and recorded the same careful way. Register for the ones you want and we'll reach you first when they open."
        />

        <div className="mt-14 grid gap-4 md:grid-cols-3 md:gap-5">
          {categories.map((category, i) => (
            <article
              key={category.id}
              className={cn(
                "group relative flex flex-col overflow-hidden rounded-[1.5rem] p-6 sm:p-7",
                i === 2
                  ? "bg-forest-900 text-cream-50"
                  : "border border-border bg-white shadow-[0_1px_2px_rgba(20,42,29,0.04),0_24px_48px_-36px_rgba(20,42,29,0.35)]",
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 text-xs font-medium",
                    i === 2 ? "text-cream-100/70" : "text-ink-muted",
                  )}
                >
                  <span className="size-1.5 rounded-full bg-gold-400" aria-hidden="true" />
                  Opening after launch
                </span>
                <span className={cn("font-mono text-xs", i === 2 ? "text-cream-100/50" : "text-ink-muted/70")}>
                  0{i + 1}
                </span>
              </div>

              <h3 className="mt-14 font-display text-[2.6rem] font-medium leading-none tracking-[-0.03em] sm:mt-20">
                {category.name}
              </h3>
              <p className={cn("mt-2 font-display text-lg italic", i === 2 ? "text-gold-400" : "text-gold-500")}>
                {category.swahili}
              </p>
              <p className={cn("mt-5 text-[0.95rem] leading-relaxed", i === 2 ? "text-cream-100/80" : "text-ink-soft")}>
                {category.summary}
              </p>

              <div className="mt-5">
                <p className={cn("text-[0.7rem] uppercase tracking-[0.16em]", i === 2 ? "text-cream-100/50" : "text-ink-muted")}>
                  Common Kenyan breeds
                </p>
                <ul className="mt-2.5 flex flex-wrap gap-1.5">
                  {category.breeds.map((breed) => (
                    <li
                      key={breed}
                      className={cn(
                        "rounded-full px-2.5 py-1 text-xs",
                        i === 2 ? "bg-cream-50/10 text-cream-100" : "bg-cream-100 text-forest-900",
                      )}
                    >
                      {breed}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={`/early-access?interest=${category.id}`}
                className={cn(
                  "mt-8 inline-flex h-12 items-center justify-between rounded-full px-5 text-sm font-medium transition-colors",
                  i === 2
                    ? "bg-gold-400 text-forest-950 hover:bg-gold-200"
                    : "bg-cream-100 text-forest-900 hover:bg-forest-900 hover:text-cream-50",
                )}
              >
                Register interest in {category.name.toLowerCase()}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
