import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Sparkline } from "@/components/dashboard/sparkline";
import { formatKg, formatShortDate, formatSignedKg } from "@/lib/format";
import { speciesLabel, weightSummary } from "@/lib/livestock/metrics";
import type { Animal } from "@/lib/livestock/types";

export function AnimalCard({ animal, base }: { animal: Animal; base: string }) {
  const summary = weightSummary(animal);
  return (
    <Link
      href={`${base}/livestock/${animal.id}`}
      className="group flex items-center gap-4 rounded-2xl border border-border bg-white p-4 transition-[border-color,box-shadow] hover:border-forest-600/30 hover:shadow-[0_12px_32px_-24px_rgba(20,42,29,0.45)] sm:p-5"
    >
      <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-forest-100 font-display text-lg font-medium text-forest-800">
        {speciesLabel[animal.species][0]}
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-mono text-xs tracking-wide text-ink-muted">{animal.tag}</p>
        <p className="mt-0.5 truncate font-medium text-forest-950">
          {animal.breed} <span className="font-normal text-ink-muted">· {speciesLabel[animal.species]}</span>
        </p>
        {summary && (
          <p className="mt-1 text-xs text-ink-muted">Weighed {formatShortDate(summary.latest.date)}</p>
        )}
      </div>
      {summary && (
        <div className="hidden sm:block">
          <Sparkline weights={animal.weights} />
        </div>
      )}
      {summary && (
        <div className="text-right">
          <p className="font-display text-lg font-medium text-forest-950 tabular">{formatKg(summary.latest.kg)}</p>
          <p className="text-xs font-medium text-forest-600 tabular">{formatSignedKg(summary.gain)}</p>
        </div>
      )}
      <ChevronRight className="size-4 shrink-0 text-ink-muted transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
    </Link>
  );
}
