import { SectionHeading } from "@/components/home/section-heading";
import { MiniChart } from "@/components/showcase/mini-chart";
import { formatDate, formatKES, formatKg, formatSignedKg } from "@/lib/format";
import { demoPortfolio } from "@/lib/livestock/demo-data";
import { totalCosts, weightSummary } from "@/lib/livestock/metrics";
import { cn } from "@/lib/utils";

const [sheep, , steer] = demoPortfolio.animals;

function Tile({ className, title, body, children }: { className?: string; title: string; body: string; children: React.ReactNode }) {
  return (
    <article className={cn("flex flex-col overflow-hidden rounded-[1.5rem] border border-border bg-white", className)}>
      <div className="p-6 pb-0 sm:p-8 sm:pb-0">
        <h3 className="font-display text-[1.4rem] font-medium tracking-[-0.015em] text-forest-950">{title}</h3>
        <p className="mt-2 max-w-md text-[0.95rem] leading-relaxed text-ink-soft">{body}</p>
      </div>
      <div className="mt-6 flex-1 sm:mt-8" aria-hidden="true">
        {children}
      </div>
    </article>
  );
}

export function Features() {
  const growth = weightSummary(steer)!;
  const costLines = sheep.costs.filter((c) => c.category !== "feed").concat({
    date: "2026-09-30",
    category: "feed",
    label: "Feed — June to September",
    amountKes: sheep.costs.filter((c) => c.category === "feed").reduce((s, c) => s + c.amountKes, 0),
  });

  return (
    <section className="bg-cream-50">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <SectionHeading
          eyebrow="The Cattle Buy record"
          title="Every animal, fully on record"
          body="No guesswork, no vague updates. Each animal carries a complete, dated history that the farm team keeps current and you can open any time."
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-3 lg:gap-5">
          <Tile
            className="lg:col-span-2"
            title="Growth you can see"
            body="Regular weigh-ins, plotted from intake to today."
          >
            <div className="px-6 pb-6 sm:px-8 sm:pb-8">
              <div className="flex flex-wrap items-end gap-x-10 gap-y-3">
                <div>
                  <p className="text-xs text-ink-muted">Boran · {steer.tag}</p>
                  <p className="mt-1 font-display text-4xl font-medium tracking-[-0.02em] text-forest-950 tabular">
                    {formatKg(growth.latest.kg)}
                  </p>
                </div>
                <div className="pb-1">
                  <p className="text-xs text-ink-muted">Since intake</p>
                  <p className="font-medium text-forest-600 tabular">{formatSignedKg(growth.gain)}</p>
                </div>
                <div className="pb-1">
                  <p className="text-xs text-ink-muted">Daily gain</p>
                  <p className="font-medium text-forest-950 tabular">{growth.adgGrams} g</p>
                </div>
              </div>
              <div className="mt-6">
                <MiniChart weights={steer.weights} width={640} height={150} id="feature-growth" />
              </div>
            </div>
          </Tile>

          <Tile title="A real identity" body="A unique ID on the ear tag, linked to every record.">
            <div className="flex h-full min-h-48 items-center justify-center bg-gradient-to-b from-cream-100 to-cream-200 px-6 py-10">
              <div className="relative">
                <div className="flex h-36 w-32 flex-col items-center rounded-[2.2rem_2.2rem_1.2rem_1.2rem] bg-[#e7c04a] pt-5 shadow-[0_18px_30px_-14px_rgba(80,60,0,0.6),inset_0_-6px_0_rgba(0,0,0,0.08)]">
                  <span className="size-3.5 rounded-full bg-cream-100 shadow-[inset_0_2px_3px_rgba(0,0,0,0.3)]" />
                  <span className="mt-5 font-mono text-[0.7rem] font-medium tracking-[0.12em] text-[#3a2e05]">TGM-CT</span>
                  <span className="font-mono text-2xl font-medium tracking-wider text-[#2a2104]">0003</span>
                </div>
              </div>
            </div>
          </Tile>

          <Tile title="Health on record" body="Vaccinations, treatments and checks, each dated and recorded by the farm team.">
            <ol className="mx-6 mb-6 space-y-0 border-l border-border pl-5 sm:mx-8 sm:mb-8">
              {steer.health.slice(1, 5).map((h) => (
                <li key={h.title} className="relative pb-4 last:pb-0">
                  <span className="absolute -left-[1.6rem] top-1.5 size-2.5 rounded-full bg-forest-600 ring-4 ring-white" />
                  <p className="text-sm font-medium text-forest-950">{h.title}</p>
                  <p className="text-xs text-ink-muted">{formatDate(h.date)}</p>
                </li>
              ))}
            </ol>
          </Tile>

          <Tile
            className="lg:col-span-2"
            title="Every shilling itemised"
            body="Purchase, feed and veterinary costs in KES, line by line. Records of what was spent — never projections of what you'll earn."
          >
            <div className="mx-6 mb-6 overflow-hidden rounded-2xl border border-border sm:mx-8 sm:mb-8">
              <div className="flex items-center justify-between bg-cream-100 px-5 py-3 text-xs text-ink-muted">
                <span>Statement · {sheep.tag}</span>
                <span>As of {formatDate("2026-09-30")}</span>
              </div>
              <dl className="divide-y divide-border bg-white">
                {costLines.map((c) => (
                  <div key={c.label} className="flex justify-between gap-4 px-5 py-3 text-sm">
                    <dt className="text-ink-soft">{c.label}</dt>
                    <dd className="font-medium text-forest-950 tabular">{formatKES(c.amountKes)}</dd>
                  </div>
                ))}
                <div className="flex justify-between gap-4 px-5 py-3.5">
                  <dt className="text-sm font-medium text-forest-950">Total</dt>
                  <dd className="font-display text-lg font-medium text-forest-950 tabular">{formatKES(totalCosts(sheep))}</dd>
                </div>
              </dl>
            </div>
          </Tile>
        </div>
        <p className="mt-5 text-xs text-ink-muted">Examples shown use sample records.</p>
      </div>
    </section>
  );
}
