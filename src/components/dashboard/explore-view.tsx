import Link from "next/link";
import { ArrowUpRight, Info } from "lucide-react";

import { PageHeader } from "@/components/dashboard/page-header";
import { Badge } from "@/components/ui/badge";
import { programs, type ProgramId } from "@/content/site";

const interestFor: Partial<Record<ProgramId, string>> = {
  "customer-owned": "managed",
  fattening: "managed",
  qurbani: "qurbani",
};

export function ExploreView() {
  return (
    <>
      <PageHeader title="Explore" eyebrow="Livestock programmes" />
      <div className="grid gap-3 sm:grid-cols-2">
        {programs.map((programme) => {
          const interest = interestFor[programme.id];
          return (
            <article key={programme.id} className="flex flex-col rounded-2xl border border-border bg-white p-5 sm:p-6">
              <div className="flex items-start justify-between gap-3">
                <h2 className="font-display text-xl font-medium text-forest-950">{programme.name}</h2>
                <Badge variant="soon">Not yet open</Badge>
              </div>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{programme.summary}</p>
              <Link
                href={interest ? `/early-access?interest=${interest}` : "/early-access"}
                className="mt-5 inline-flex items-center gap-1.5 self-start text-sm font-medium text-forest-800 underline-offset-4 hover:underline"
              >
                Register interest
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
            </article>
          );
        })}
      </div>
      <p className="mt-6 flex items-start gap-3 rounded-xl bg-cream-100 px-4 py-3.5 text-sm leading-relaxed text-ink-soft">
        <Info className="mt-0.5 size-4 shrink-0 text-gold-500" aria-hidden="true" />
        <span>
          Programmes open only after commercial and legal review. Cattle Buy does not offer
          investments or guaranteed returns.
        </span>
      </p>
    </>
  );
}
