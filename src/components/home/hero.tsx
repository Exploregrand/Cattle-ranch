import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { MediaImage } from "@/components/brand/media-image";
import { PhonePreview } from "@/components/showcase/phone-preview";
import { Button } from "@/components/ui/button";
import { farm } from "@/content/site";

function FloatingCard({ className, children }: { className: string; children: React.ReactNode }) {
  return (
    <div
      aria-hidden="true"
      className={`absolute hidden rounded-2xl bg-white/95 p-3.5 shadow-[0_24px_50px_-20px_rgba(0,0,0,0.55)] ring-1 ring-black/5 backdrop-blur lg:block ${className}`}
    >
      {children}
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-forest-950 text-cream-50">
      {/* Atmosphere: low landscape, soft gold glow, fine vignette */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-x-0 bottom-0 h-[55%] opacity-60">
          <MediaImage slot="hero" scene="dusk" priority />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-forest-950 via-forest-950/80 to-forest-950/30" />
        <div className="absolute right-[-10%] top-[10%] size-[42rem] rounded-full bg-gold-400/10 blur-[120px]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-forest-950 to-transparent" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 pb-0 pt-32 sm:px-8 sm:pt-36 lg:grid-cols-[1.08fr_1fr] lg:gap-8 lg:pb-24 lg:pt-40">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-cream-50/[0.07] px-3 py-1.5 text-xs font-medium tracking-wide text-cream-100 ring-1 ring-cream-50/15">
            <span className="size-1.5 rounded-full bg-gold-400" aria-hidden="true" />
            From {farm.location}, Kenya
          </p>
          <h1 className="mt-7 font-display text-[2.9rem] font-medium leading-[1.0] tracking-[-0.035em] text-balance sm:text-[4rem] lg:text-[4.6rem]">
            Own Livestock.
            <br />
            Track Growth.
            <br />
            <span className="italic text-gold-400">Build Value.</span>
          </h1>
          <p className="mt-7 max-w-lg text-[1.05rem] leading-relaxed text-cream-100/80 text-pretty sm:text-lg">
            Professionally managed sheep, goats and cattle — each with its own ID, weigh-ins,
            vet records and itemised costs, live in your pocket.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="gold" size="lg" className="h-13 px-8">
              <Link href="#livestock">
                Explore Livestock
                <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="outline-light" size="lg" className="h-13 px-8">
              <Link href="#how-it-works">How It Works</Link>
            </Button>
          </div>
          <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-sm text-cream-100/70">
            {["Free early access", "No payment today", "Kenyan-run farm"].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Check className="size-4 text-gold-400" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto flex w-full max-w-md justify-center lg:max-w-none">
          <div className="relative translate-y-10 lg:translate-y-0">
            <PhonePreview />
            <FloatingCard className="-left-36 top-[17rem] w-48">
              <p className="text-[11px] text-ink-muted">Weigh-in recorded</p>
              <p className="mt-0.5 font-display text-xl font-medium text-forest-950">+2.7 kg</p>
              <p className="text-[11px] text-forest-600">Last 14 days</p>
            </FloatingCard>
            <FloatingCard className="-right-32 top-24 w-48">
              <p className="text-[11px] text-ink-muted">Recorded costs</p>
              <p className="mt-0.5 font-display text-xl font-medium text-forest-950">KES 19,050</p>
              <p className="text-[11px] text-ink-muted">Itemised to date</p>
            </FloatingCard>
          </div>
        </div>
      </div>
      <p className="relative mx-auto max-w-6xl px-5 pb-4 pt-14 text-right text-[11px] text-cream-100/40 sm:px-8 lg:pt-0">
        App preview with sample data
      </p>
    </section>
  );
}
