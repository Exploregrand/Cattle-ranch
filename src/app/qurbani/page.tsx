import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";

import { FaqList } from "@/components/home/faq-list";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { Button } from "@/components/ui/button";
import { photos } from "@/content/photos";

export const metadata: Metadata = {
  title: "Qurbani",
  description:
    "Reserve a healthy, well-fed goat, sheep or bull for Qurbani, raised and checked on our farms in Isinya, Kajiado. Register to hear first when reservations open.",
};

const wrap = "mx-auto w-full max-w-7xl px-6 sm:px-8";

const steps = [
  { title: "Register your interest", body: "Tell us which animal you're looking for. Registered buyers hear first when reservations open." },
  { title: "Choose your animal", body: "See each animal's ID, breed, age, weight and health checks before you reserve." },
  { title: "We care for it until Eid", body: "Your animal stays on our farm, fed on our own fodder, with its record updated as it goes." },
  { title: "Collect or arrange delivery", body: "Collect from the farm in Isinya or arrange delivery ahead of Eid al-Adha." },
];

const standards = [
  "Meets the accepted age and soundness requirements for Qurbani",
  "Health-checked, with every treatment recorded",
  "Raised on our own Sugargraze, Napier, alfalfa and desmodium",
  "Its own ear-tag ID, so you know exactly which animal is yours",
  "A clear price agreed in writing before you pay",
];

const faqs = [
  {
    q: "When will reservations open?",
    a: "We'll announce reservation dates to registered buyers first, well ahead of Eid al-Adha. Registering is free and commits you to nothing.",
  },
  {
    q: "Which animals will you offer?",
    a: "We plan to offer goats, sheep and cattle. Availability depends on our first season — register for the animal you want and we'll tell you as soon as we know.",
  },
  {
    q: "Can I see the animal before Eid?",
    a: "Yes. Every animal has its own record with photos and health checks, and you can ask to see it at the farm.",
  },
  {
    q: "How will I pay?",
    a: "We plan to accept M-Pesa, with a receipt for every payment. No payments are taken today.",
  },
];

export default function QurbaniPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-cream-50 text-ink">
        <section className={`${wrap} grid items-center gap-10 pt-12 sm:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16`}>
          <div>
            <p className="eyebrow">Seasonal · Eid al-Adha</p>
            <h1 className="t-display mt-5 max-w-[12ch]">Qurbani, from a farm you know.</h1>
            <p className="t-lead mt-6 max-w-xl text-ink-soft">
              A healthy, well-fed animal, raised and checked on our farm in Isinya — with its record in your hands from the day you
              reserve it to the day you collect it.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/early-access?interest=qurbani">Register for Qurbani</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#how">How reservation works</a>
              </Button>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <Image src={photos.goat.src} alt={photos.goat.alt} fill priority sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" style={{ objectPosition: photos.goat.position }} />
          </div>
        </section>

        <section className={`${wrap} section-y`}>
          <div className="grid gap-10 rounded-xl border border-border bg-white p-7 sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <p className="eyebrow">Our standard</p>
              <h2 className="t-h2 mt-4">Every Qurbani animal we offer will be:</h2>
            </div>
            <ul className="space-y-4">
              {standards.map((s) => (
                <li key={s} className="flex gap-3 border-b border-ink/10 pb-4 text-[0.9375rem] leading-relaxed last:border-b-0 last:pb-0">
                  <Check className="mt-1 size-4 shrink-0 text-ink-muted" aria-hidden="true" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="how" className="scroll-mt-20 border-y border-border bg-white">
          <div className={`${wrap} section-y`}>
            <p className="eyebrow">How reservation will work</p>
            <h2 className="t-h1 mt-4 max-w-[18ch]">Four steps to Eid.</h2>
            <ol className="mt-12 grid border-t border-ink/15 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, i) => (
                <li key={step.title} className="border-b border-ink/10 py-7 sm:pr-8 lg:border-b-0 lg:border-r lg:px-7 lg:first:pl-0 lg:last:border-r-0">
                  <span className="t-figure text-[1.75rem] text-ink-muted">{i + 1}</span>
                  <p className="t-h3 mt-5">{step.title}</p>
                  <p className="t-body mt-2 text-ink-soft">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={`${wrap} section-y grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20`}>
          <div>
            <p className="eyebrow">Questions</p>
            <h2 className="t-h1 mt-4">Before you reserve.</h2>
          </div>
          <FaqList items={faqs} />
        </section>

        <section className="border-t border-border bg-white">
          <div className={`${wrap} section-y text-center`}>
            <h2 className="t-h1 mx-auto max-w-[18ch]">Hear first when reservations open.</h2>
            <p className="t-body mx-auto mt-5 max-w-md text-ink-soft">No payment and no commitment. We&apos;ll contact registered buyers first.</p>
            <Button asChild size="lg" className="mt-9">
              <Link href="/early-access?interest=qurbani">Register for Qurbani</Link>
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
