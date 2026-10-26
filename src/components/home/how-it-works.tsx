import { Info } from "lucide-react";

import { SectionHeading } from "@/components/home/section-heading";
import { steps } from "@/content/site";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20 bg-cream-50">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionHeading
          eyebrow="How it works"
          title="Four simple steps, fully recorded"
          body="How Cattle Buy programmes are designed to work at launch."
        />

        <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step.title} className="flex flex-col bg-white p-6 sm:p-7">
              <span className="font-display text-4xl font-medium italic text-gold-500/90">{i + 1}</span>
              <h3 className="mt-6 font-display text-xl font-medium leading-snug text-forest-950">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{step.body}</p>
            </li>
          ))}
        </ol>

        <p className="mt-6 flex items-start gap-3 rounded-xl bg-cream-100 px-4 py-3.5 text-sm leading-relaxed text-ink-soft">
          <Info className="mt-0.5 size-4 shrink-0 text-gold-500" aria-hidden="true" />
          <span>
            <strong className="font-medium text-forest-900">Planned, not yet live.</strong> No
            animals, purchases or payments are available today. Programmes will open only
            after commercial and legal review, and Cattle Buy will never promise guaranteed returns.
          </span>
        </p>
      </div>
    </section>
  );
}
