import { MediaImage } from "@/components/brand/media-image";
import { SectionHeading } from "@/components/home/section-heading";
import { farm } from "@/content/site";

/** Layout diagram of the real bed plan: three sections of 40 beds. */
function BedPlan() {
  return (
    <figure className="rounded-2xl border border-border bg-white p-5 sm:p-6">
      <figcaption className="flex items-baseline justify-between gap-4">
        <span className="font-display text-lg text-forest-950">Bed plan</span>
        <span className="text-xs text-ink-muted tabular">{farm.beds} beds · 3 sections</span>
      </figcaption>
      <div className="mt-5 grid grid-cols-3 gap-3 sm:gap-5">
        {farm.sections.map((section) => (
          <div key={section.id}>
            <div
              className="grid grid-cols-5 gap-[3px] sm:gap-1"
              role="img"
              aria-label={`Section ${section.id}: ${section.beds} beds`}
            >
              {Array.from({ length: section.beds }).map((_, i) => (
                <span key={i} className="h-3 rounded-[3px] bg-forest-600/80 sm:h-3.5" />
              ))}
            </div>
            <p className="mt-3 text-xs font-medium text-forest-900">
              Section {section.id}
              <span className="ml-1 font-normal text-ink-muted tabular">· {section.beds}</span>
            </p>
          </div>
        ))}
      </div>
    </figure>
  );
}

export function OurFarm() {
  return (
    <section id="farm" className="scroll-mt-20 bg-cream-100">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative min-h-[320px] overflow-hidden rounded-2xl bg-forest-100 sm:min-h-[420px] lg:min-h-0">
            <MediaImage slot="fodder" scene="fodder" sizes="(min-width: 1024px) 50vw, 100vw" />
            <p className="absolute bottom-4 left-4 rounded-full bg-forest-950/60 px-3 py-1.5 text-xs text-cream-50 backdrop-blur">
              {farm.name} · {farm.location}
            </p>
          </div>

          <div>
            <SectionHeading
              eyebrow="Our farm"
              title="Growing the feed before the herd"
              body={`On ${farm.acres} acres in ${farm.location}, we are developing a mix of energy-rich grasses and protein-rich legumes across ${farm.beds} growing beds — the foundation for well-fed, well-recorded livestock.`}
            />

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {farm.fodder.map((crop) => (
                <li key={crop.name} className="rounded-xl border border-border bg-white/70 p-4">
                  <p className="font-medium text-forest-900">{crop.name}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">{crop.note}</p>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <BedPlan />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
