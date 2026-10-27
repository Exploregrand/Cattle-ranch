import Link from "next/link";
import { FileText, Sprout } from "lucide-react";

import { AnimalCard } from "@/components/dashboard/animal-card";
import { EmptyHerd } from "@/components/dashboard/empty-herd";
import { SectionTitle } from "@/components/dashboard/page-header";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { farm } from "@/content/site";
import { formatDate, formatSignedKg, TIME_ZONE } from "@/lib/format";
import { weightSummary } from "@/lib/livestock/metrics";
import type { Portfolio } from "@/lib/livestock/types";

function longDate(iso: string) {
  return new Intl.DateTimeFormat("en-KE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: TIME_ZONE,
  }).format(new Date(`${iso}T12:00:00+03:00`));
}

export function HomeView({
  portfolio,
  base,
  isDemo = false,
}: {
  portfolio: Portfolio;
  base: string;
  isDemo?: boolean;
}) {
  const firstName = portfolio.customer.fullName.split(" ")[0];
  const { animals, updates, documents } = portfolio;

  const summaries = animals.map(weightSummary).filter((s) => s !== null);
  const totalGain = summaries.reduce((sum, s) => sum + s.gain, 0);
  const lastWeighIn = summaries.map((s) => s.latest.date).sort().pop();

  return (
    <div className="space-y-10">
      <div>
        <p className="text-sm text-ink-muted">{longDate(portfolio.asOf)}</p>
        <h1 className="mt-1 font-display text-[2rem] font-medium leading-tight tracking-[-0.025em] text-forest-950 sm:text-4xl">
          {firstName ? `Habari, ${firstName}` : "Karibu"}
        </h1>
      </div>

      {animals.length === 0 ? (
        <>
          <EmptyHerd base={base} />
          <Card className="flex items-start gap-4 p-5 sm:p-6">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-forest-100 text-forest-700">
              <Sprout className="size-5" aria-hidden="true" />
            </div>
            <div>
              <p className="font-medium text-forest-950">At the farm today</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                We are developing fodder across {farm.beds} beds in {farm.location} — Sugargraze,
                Super Napier, alfalfa and desmodium — ahead of livestock operations. Farm updates
                will be posted here.
              </p>
            </div>
          </Card>
        </>
      ) : (
        <>
          <section aria-label="Summary" className="relative overflow-hidden rounded-[1.5rem] bg-forest-900 p-6 text-cream-50 sm:p-8">
            <div className="relative flex items-start justify-between gap-4">
              <p className="text-sm text-cream-100/70">Animals under management</p>
              {isDemo && <Badge variant="dark">Sample data</Badge>}
            </div>
            <p className="relative mt-2 font-display text-6xl font-medium tracking-[-0.03em] tabular">{animals.length}</p>
            <dl className="relative mt-8 grid grid-cols-2 gap-6 border-t border-cream-50/10 pt-5">
              <div>
                <dt className="text-xs text-cream-100/60">Weight gained since intake</dt>
                <dd className="mt-1 font-display text-2xl font-medium tabular">{formatSignedKg(totalGain)}</dd>
              </div>
              {lastWeighIn && (
                <div>
                  <dt className="text-xs text-cream-100/60">Latest weigh-in</dt>
                  <dd className="mt-1 font-display text-2xl font-medium">{formatDate(lastWeighIn)}</dd>
                </div>
              )}
            </dl>
          </section>

          <section>
            <SectionTitle title="My livestock">
              <Link href={`${base}/livestock`} className="text-sm font-medium text-forest-700 hover:underline underline-offset-4">
                View all
              </Link>
            </SectionTitle>
            <div className="space-y-3">
              {animals.slice(0, 3).map((animal) => (
                <AnimalCard key={animal.id} animal={animal} base={base} />
              ))}
            </div>
          </section>
        </>
      )}

      {(updates.length > 0 || documents.length > 0) && (
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-8 [&>*]:min-w-0">
          {updates.length > 0 && (
            <section>
              <SectionTitle title="Farm updates" />
              <Card>
                <ol className="divide-y divide-border">
                  {updates.map((update) => (
                    <li key={update.id} className="p-5 sm:p-6">
                      <p className="text-xs text-ink-muted">{formatDate(update.date)}</p>
                      <p className="mt-1 font-medium text-forest-950">{update.title}</p>
                      <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{update.body}</p>
                    </li>
                  ))}
                </ol>
              </Card>
            </section>
          )}
          {documents.length > 0 && (
            <section>
              <SectionTitle title="Documents" />
              <Card>
                <ul className="divide-y divide-border">
                  {documents.map((doc) => (
                    <li key={doc.id} className="flex items-center gap-3.5 p-4 sm:px-5">
                      <FileText className="size-[1.1rem] shrink-0 text-forest-600" aria-hidden="true" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-forest-950">{doc.title}</p>
                        <p className="text-xs text-ink-muted">{formatDate(doc.date)}</p>
                      </div>
                      {isDemo && <Badge variant="soon">Sample</Badge>}
                    </li>
                  ))}
                </ul>
              </Card>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
