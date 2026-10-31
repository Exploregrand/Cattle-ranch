import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { Button } from "@/components/ui/button";
import { contact } from "@/content/contact";
import { FarmGallery, OrganicPractices, PlantingStory } from "@/components/sections/farm-story";
import { farmPhotos } from "@/content/farm-story";
import { farm } from "@/content/site";

export const metadata: Metadata = {
  title: "The farm",
  description: "Herd & Field farms 4.67 acres in Isinya, Kajiado County, with 5 more acres from January 2027 — organic practices, our own fodder and room for the herd.",
};

const wrap = "mx-auto w-full max-w-7xl px-6 sm:px-8";

export default function FarmPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-cream-50 text-ink">
        <section className={`${wrap} grid items-end gap-10 pt-12 sm:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16`}>
          <div>
            <p className="eyebrow">Our farms · Kajiado County</p>
            <h1 className="t-display mt-5 max-w-[12ch]">Where every animal will be raised.</h1>
            <p className="t-lead mt-6 max-w-xl text-ink-soft">
              {farm.acres} acres in Isinya, south of Nairobi in Kajiado County, with {farm.expansion.acres} more acres coming into
              cultivation in {farm.expansion.timing}. We&apos;re building in the right order: feed first, then the herd.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <Image src={farmPhotos.rowsGreen.src} alt={farmPhotos.rowsGreen.alt} fill priority sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover object-[50%_60%]" />
          </div>
        </section>

        <OrganicPractices />
        <PlantingStory />

        <section className="border-b border-border bg-white">
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
        </section>

        <FarmGallery />

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
