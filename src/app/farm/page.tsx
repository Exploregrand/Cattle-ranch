import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";

import { LiveProgress } from "@/components/home/live-progress";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { Button } from "@/components/ui/button";
import { contact } from "@/content/contact";
import { photos } from "@/content/photos";
import { farm } from "@/content/site";

export const metadata: Metadata = {
  title: "The farm",
  description: "Tangama's two farms — 2.17 and 2.5 acres, based in Isinya, Kajiado County — with a further 5 acres planned for early 2027, and live progress from our farm records.",
};

const wrap = "mx-auto w-full max-w-7xl px-6 sm:px-8";

export default function FarmPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-cream-50 text-ink">
        <section className={`${wrap} grid items-end gap-10 pt-12 sm:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16`}>
          <div>
            <p className="eyebrow">Tangama Farm · Kajiado County</p>
            <h1 className="t-display mt-5 max-w-[12ch]">Where every animal will be raised.</h1>
            <p className="t-lead mt-6 max-w-xl text-ink-soft">
              Two farms of {farm.farms.map((f) => f.acres).join(" and ")} acres, based in Isinya, south of Nairobi in Kajiado County —
              about {farm.acres} acres under cultivation today and a further {farm.expansion.acres} acres planned for{" "}
              {farm.expansion.timing}. We&apos;re building in the right order: feed first, then the herd — and recording all of it.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <Image src={photos.cattle.src} alt={photos.cattle.alt} fill priority sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover object-[50%_68%]" />
          </div>
        </section>

        <section className={`${wrap} section-y`}>
          <p className="eyebrow">Live from the farm</p>
          <h2 className="t-h1 mt-4 max-w-[20ch]">What&apos;s happening, as recorded.</h2>
          <p className="t-body mt-5 max-w-xl text-ink-soft">
            These figures update from the same records our farm team keeps every day — plantings, irrigation, harvests and stock.
          </p>
          <div className="mt-10">
            <Suspense fallback={<div className="h-32 border-t border-ink/15" />}>
              <LiveProgress />
            </Suspense>
          </div>
        </section>

        <section className="border-y border-border bg-white">
          <div className={`${wrap} section-y`}>
            <p className="eyebrow">The feed</p>
            <h2 className="t-h1 mt-4 max-w-[18ch]">Four crops, grown for our own animals.</h2>
            <dl className="mt-12 grid border-t border-ink/15 sm:grid-cols-2 lg:grid-cols-4">
              {farm.fodder.map((crop) => (
                <div key={crop.name} className="border-b border-ink/10 py-7 sm:pr-8 lg:border-b-0 lg:border-r lg:px-7 lg:first:pl-0 lg:last:border-r-0">
                  <dt className="t-h3">{crop.name}</dt>
                  <dd className="t-body mt-2 text-ink-soft">{crop.note}</dd>
                </div>
              ))}
            </dl>

          </div>
        </section>

        <section className={`${wrap} section-y`}>
          <p className="eyebrow">On the farms</p>
          <h2 className="t-h1 mt-4 max-w-[18ch]">Lived in, and ready for animals.</h2>
          <dl className="mt-12 grid border-t border-ink/15 md:grid-cols-3">
            {farm.facilities.map((f) => (
              <div key={f.title} className="border-b border-ink/10 py-7 md:border-b-0 md:border-r md:px-7 md:first:pl-0 md:last:border-r-0">
                <dt className="t-h3">{f.title}</dt>
                <dd className="t-body mt-2 text-ink-soft">{f.body}</dd>
              </div>
            ))}
          </dl>
          <dl className="mt-12 grid gap-4 sm:grid-cols-2">
            {farm.farms.map((f) => (
              <div key={f.name} className="rounded-xl border border-border bg-white p-6">
                <dt className="eyebrow">{f.location ?? "Second farm"}</dt>
                <dd className="t-figure mt-3 text-[2.5rem]">
                  {f.acres} <span className="text-[1.25rem] text-ink-muted">acres</span>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section className={`${wrap} section-y border-t border-border grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end`}>
          <div>
            <p className="eyebrow">Visiting</p>
            <h2 className="t-h1 mt-4 max-w-[16ch]">See it for yourself.</h2>
            <p className="t-body mt-5 max-w-lg text-ink-soft">
              {contact.visits ??
                "We'll invite registered buyers and investors to visit the farm as we approach launch. Register your interest and we'll be in touch."}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-self-end">
            <Button asChild size="lg">
              <Link href="/early-access">Register interest</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/investors">Investor brief</Link>
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
