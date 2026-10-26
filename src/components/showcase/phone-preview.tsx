import { Syringe, Stethoscope, Wheat } from "lucide-react";

import { MiniChart } from "@/components/showcase/mini-chart";
import { formatKg, formatShortDate, formatSignedKg } from "@/lib/format";
import { demoPortfolio } from "@/lib/livestock/demo-data";
import { weightSummary } from "@/lib/livestock/metrics";

const animal = demoPortfolio.animals[0];

/** A rendered, non-interactive preview of the animal profile screen (sample data). */
export function PhonePreview() {
  const summary = weightSummary(animal)!;
  return (
    <div
      aria-hidden="true"
      className="relative w-[288px] rounded-[2.9rem] bg-[#0b140e] p-[9px] shadow-[0_50px_100px_-30px_rgba(0,0,0,0.75),0_0_0_1px_rgba(255,255,255,0.08)_inset] sm:w-[312px]"
    >
      <div className="relative overflow-hidden rounded-[2.35rem] bg-cream-50">
        {/* status bar */}
        <div className="flex items-center justify-between px-7 pt-3.5 text-[11px] font-semibold text-forest-950">
          <span>9:41</span>
          <span className="absolute left-1/2 top-2.5 h-[22px] w-[84px] -translate-x-1/2 rounded-full bg-[#0b140e]" />
          <span className="flex items-center gap-1">
            <span className="h-2 w-3.5 rounded-[2px] border border-forest-950/70" />
          </span>
        </div>

        <div className="px-5 pb-6 pt-5">
          <p className="text-[10px] font-medium text-ink-muted">‹ My livestock</p>
          <div className="mt-3 flex items-center gap-1.5">
            <span className="font-mono text-[10px] tracking-wide text-ink-muted">{animal.tag}</span>
            <span className="rounded-full bg-forest-100 px-1.5 py-0.5 text-[9px] font-medium text-forest-800">Active</span>
          </div>
          <p className="mt-1 font-display text-[1.45rem] font-medium leading-tight tracking-[-0.02em] text-forest-950">
            Dorper sheep
          </p>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="rounded-2xl border border-border bg-white p-3">
              <p className="text-[9.5px] text-ink-muted">Latest weight</p>
              <p className="mt-0.5 font-display text-lg font-medium text-forest-950 tabular">{formatKg(summary.latest.kg)}</p>
            </div>
            <div className="rounded-2xl border border-border bg-white p-3">
              <p className="text-[9.5px] text-ink-muted">Since intake</p>
              <p className="mt-0.5 font-display text-lg font-medium text-forest-700 tabular">{formatSignedKg(summary.gain)}</p>
            </div>
          </div>

          <div className="mt-2 rounded-2xl border border-border bg-white p-3">
            <div className="flex items-baseline justify-between">
              <p className="text-[11px] font-medium text-forest-950">Growth</p>
              <p className="text-[9.5px] text-ink-muted">
                {formatShortDate(summary.initial.date)} – {formatShortDate(summary.latest.date)}
              </p>
            </div>
            <div className="mt-2">
              <MiniChart weights={animal.weights} id="phone-chart" />
            </div>
          </div>

          <p className="mt-4 text-[11px] font-medium text-forest-950">Recent records</p>
          <ul className="mt-2 divide-y divide-border rounded-2xl border border-border bg-white">
            {[
              { icon: Stethoscope, title: "Routine check", meta: "Healthy · 2 Sept" },
              { icon: Wheat, title: "Finishing ration", meta: "Sugargraze silage · 15 Aug" },
              { icon: Syringe, title: "Enterotoxaemia vaccine", meta: "15 Jul" },
            ].map(({ icon: Icon, title, meta }) => (
              <li key={title} className="flex items-center gap-2.5 px-3 py-2.5">
                <span className="flex size-7 items-center justify-center rounded-full bg-forest-100 text-forest-700">
                  <Icon className="size-3.5" />
                </span>
                <span>
                  <span className="block text-[11px] font-medium text-forest-950">{title}</span>
                  <span className="block text-[9.5px] text-ink-muted">{meta}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* tab bar */}
        <div className="grid grid-cols-4 border-t border-border bg-cream-50 px-3 pb-5 pt-2.5 text-center text-[9px] text-ink-muted">
          <span>Home</span>
          <span className="font-semibold text-forest-900">My Livestock</span>
          <span>Explore</span>
          <span>Account</span>
        </div>
      </div>
    </div>
  );
}
