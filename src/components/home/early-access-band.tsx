import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function EarlyAccessBand() {
  return (
    <section className="bg-cream-50">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="relative overflow-hidden rounded-[1.75rem] bg-forest-900 px-6 py-12 text-cream-50 sm:px-12 sm:py-16">
          <div
            aria-hidden="true"
            className="absolute -right-24 -top-24 size-80 rounded-full bg-gold-400/15 blur-3xl"
          />
          <div className="relative grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-400">Early access</p>
              <h2 className="mt-4 font-display text-[2rem] font-medium leading-[1.08] tracking-[-0.025em] text-balance sm:text-[2.6rem]">
                Be the first to know when programmes open.
              </h2>
              <p className="mt-4 max-w-lg text-cream-100/75">
                Tell us what interests you — sheep, goats, cattle, managed ownership or
                Qurbani. No payment, no commitment.
              </p>
            </div>
            <div className="md:justify-self-end">
              <Button asChild variant="gold" size="lg" className="w-full md:w-auto">
                <Link href="/early-access">
                  Register interest
                  <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
