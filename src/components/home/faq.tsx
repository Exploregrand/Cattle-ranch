import { Plus } from "lucide-react";

import { SectionHeading } from "@/components/home/section-heading";
import { farm } from "@/content/site";

const faqs = [
  {
    q: "Can I buy livestock today?",
    a: "Not yet. Cattle Buy is preparing to launch, and our first priority is the fodder that will feed every animal. Register for early access and we'll contact you as soon as sheep, goats or cattle become available.",
  },
  {
    q: "Is this an investment?",
    a: "No. We don't offer investment products, pooled schemes or guaranteed returns. With managed ownership you own a specific, identified animal and we care for it under a written service agreement. Any outcome depends on actual sale prices and recorded costs.",
  },
  {
    q: "Where are the animals kept?",
    a: `At ${farm.name} in ${farm.location}, fed largely on Sugargraze, Super Napier, alfalfa and desmodium grown on our own ${farm.acres} acres.`,
  },
  {
    q: "How will payments work?",
    a: "We plan to accept M-Pesa when programmes open, with every payment receipted in your account. No payments are collected today.",
  },
  {
    q: "Will you offer animals for Qurbani?",
    a: "Yes, a seasonal Qurbani service for Eid al-Adha is planned, covering reservation, preparation and delivery. Choose Qurbani when you register to be notified first.",
  },
];

export function Faq() {
  return (
    <section className="bg-cream-50">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
        <SectionHeading eyebrow="Questions" title="Straight answers" body="What you should know before you register." />
        <div className="divide-y divide-border border-y border-border">
          {faqs.map((item) => (
            <details key={item.q} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left [&::-webkit-details-marker]:hidden">
                <span className="font-display text-lg font-medium text-forest-950 sm:text-xl">{item.q}</span>
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border text-forest-800 transition-transform duration-300 group-open:rotate-45 group-open:bg-forest-900 group-open:text-cream-50">
                  <Plus className="size-4" aria-hidden="true" />
                </span>
              </summary>
              <p className="-mt-1 max-w-2xl pb-6 pr-12 leading-relaxed text-ink-soft">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
