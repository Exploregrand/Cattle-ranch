import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ImageIcon } from "lucide-react";

import { GrowthChart } from "@/components/dashboard/growth-chart";
import { SectionTitle } from "@/components/dashboard/page-header";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatAge, formatDate, formatKES, formatKg, formatSignedKg } from "@/lib/format";
import { ageMonths, sortedWeights, speciesLabel, totalCosts, weightSummary } from "@/lib/livestock/metrics";
import type { Animal, HealthKind } from "@/lib/livestock/types";

const statusLabel: Record<Animal["status"], string> = {
  active: "Active",
  sold: "Sold",
  transferred: "Transferred",
  deceased: "Deceased",
};

const healthLabel: Record<HealthKind, string> = {
  vaccination: "Vaccination",
  treatment: "Treatment",
  check: "Health check",
};

const costLabel = { purchase: "Purchase", feed: "Feed", veterinary: "Veterinary", other: "Other" } as const;

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-2xl border border-border bg-white p-4 sm:p-5">
      <p className="text-xs text-ink-muted">{label}</p>
      <p className="mt-1.5 font-display text-2xl font-medium tracking-[-0.01em] text-forest-950 tabular">{value}</p>
      {sub && <p className="mt-0.5 text-xs text-ink-muted">{sub}</p>}
    </div>
  );
}

export function AnimalProfile({
  animal,
  base,
  asOf,
  isDemo = false,
  backLabel = "My livestock",
  hideBack = false,
}: {
  animal: Animal;
  base: string;
  asOf: string;
  isDemo?: boolean;
  backLabel?: string;
  hideBack?: boolean;
}) {
  const summary = weightSummary(animal);
  const age = ageMonths(animal, asOf);
  const weights = sortedWeights(animal);
  const health = [...animal.health].sort((a, b) => b.date.localeCompare(a.date));
  const feeding = [...animal.feeding].sort((a, b) => b.date.localeCompare(a.date));
  const costsByCategory = Object.entries(
    animal.costs.reduce<Record<string, number>>((acc, c) => {
      acc[c.category] = (acc[c.category] ?? 0) + c.amountKes;
      return acc;
    }, {}),
  ) as [keyof typeof costLabel, number][];

  const details: [string, string][] = [
    ["Animal ID", animal.tag],
    ["Species", speciesLabel[animal.species]],
    ["Breed", animal.breed],
    ["Sex", animal.sex === "male" ? "Male" : "Female"],
    animal.dateOfBirth
      ? ["Date of birth", formatDate(animal.dateOfBirth)]
      : ["Estimated age", age !== null ? formatAge(age) : "Not recorded"],
    ["Intake date", formatDate(animal.intakeDate)],
    ["Initial weight", summary ? formatKg(summary.initial.kg) : "Not recorded"],
    ["Latest weight", summary ? formatKg(summary.latest.kg) : "Not recorded"],
    ["Location", animal.location],
  ];

  return (
    <div className="space-y-10">
      <div>
        {!hideBack && (
          <Link
            href={`${base}/livestock`}
            className="-ml-1 mb-4 inline-flex items-center gap-1 text-sm text-ink-soft hover:text-forest-900"
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
            {backLabel}
          </Link>
        )}
        <div className="flex items-center gap-5 sm:gap-7">
          <div className="relative size-24 shrink-0 overflow-hidden rounded-[1.75rem] bg-cream-200 sm:size-32">
            {animal.coverPhoto ? (
              <Image src={animal.coverPhoto} alt={`${animal.breed} ${speciesLabel[animal.species].toLowerCase()}`} fill sizes="128px" className="object-cover" />
            ) : (
              <span className="label-caps flex h-full items-center justify-center px-2 text-center text-xs text-ink-muted">No photo yet</span>
            )}
          </div>
          <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-sm tracking-wide text-ink-muted">{animal.tag}</span>
              <Badge variant={animal.status === "active" ? "default" : "soon"}>{statusLabel[animal.status]}</Badge>
              {isDemo && <Badge variant="gold">Sample record</Badge>}
            </div>
            <h1 className="mt-2 font-display text-[2rem] font-medium leading-tight tracking-[-0.025em] text-forest-950 sm:text-4xl">
              {animal.breed} {speciesLabel[animal.species].toLowerCase()}
            </h1>
            <p className="mt-1 text-ink-soft">
              {animal.programme}
              {age !== null && ` · ${formatAge(age)} old`}
            </p>
              </div>
        </div>
      </div>

      {summary && (
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
          <Stat label="Latest weight" value={formatKg(summary.latest.kg)} sub={formatDate(summary.latest.date)} />
          <Stat label="Gained since intake" value={formatSignedKg(summary.gain)} sub={`From ${formatKg(summary.initial.kg)}`} />
          {summary.adgGrams !== null && (
            <div className="col-span-2 lg:col-span-1">
              <Stat label="Average daily gain" value={`${summary.adgGrams} g`} sub="Per day since intake" />
            </div>
          )}
        </div>
      )}

      {weights.length > 0 && (
        <section>
          <SectionTitle title="Growth" />
          <Card className="p-4 pt-8 sm:p-6 sm:pt-10">
            <GrowthChart weights={weights} />
            <details className="group mt-4 border-t border-border pt-4">
              <summary className="cursor-pointer text-sm font-medium text-forest-800 marker:text-ink-muted">
                Weight records ({weights.length})
              </summary>
              <table className="mt-3 w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-ink-muted">
                    <th className="py-2 font-normal">Date</th>
                    <th className="py-2 text-right font-normal">Weight</th>
                    <th className="py-2 text-right font-normal">Change</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {weights.map((w, i) => (
                    <tr key={w.date}>
                      <td className="py-2 text-ink-soft">{formatDate(w.date)}</td>
                      <td className="py-2 text-right font-medium text-forest-950 tabular">{formatKg(w.kg)}</td>
                      <td className="py-2 text-right text-ink-muted tabular">
                        {i === 0 ? "—" : formatSignedKg(w.kg - weights[i - 1].kg)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </details>
          </Card>
        </section>
      )}

      <section>
        <SectionTitle title="Details" />
        <Card>
          <dl className="grid divide-y divide-border sm:grid-cols-2 sm:divide-y-0">
            {details.map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4 px-5 py-3.5 sm:border-b sm:border-border sm:px-6">
                <dt className="text-sm text-ink-muted">{label}</dt>
                <dd className={label === "Animal ID" ? "text-right font-mono text-sm text-forest-950" : "text-right text-sm font-medium text-forest-950"}>
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </Card>
      </section>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-8 [&>*]:min-w-0">
        <section>
          <SectionTitle title="Health and vaccinations" />
          <Card>
            {health.length === 0 ? (
              <p className="p-6 text-sm text-ink-muted">No health records yet.</p>
            ) : (
              <ol className="divide-y divide-border">
                {health.map((h) => (
                  <li key={`${h.date}-${h.title}`} className="px-5 py-4 sm:px-6">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-medium text-forest-950">{h.title}</p>
                      <Badge variant={h.kind === "vaccination" ? "default" : "outline"}>{healthLabel[h.kind]}</Badge>
                    </div>
                    <p className="mt-0.5 text-xs text-ink-muted">{formatDate(h.date)}</p>
                    {h.detail && <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{h.detail}</p>}
                  </li>
                ))}
              </ol>
            )}
          </Card>
        </section>

        <section>
          <SectionTitle title="Feeding" />
          <Card>
            {feeding.length === 0 ? (
              <p className="p-6 text-sm text-ink-muted">No feeding records yet.</p>
            ) : (
              <ol className="divide-y divide-border">
                {feeding.map((f) => (
                  <li key={`${f.date}-${f.ration}`} className="px-5 py-4 sm:px-6">
                    <p className="text-xs text-ink-muted">From {formatDate(f.date)}</p>
                    <p className="mt-0.5 font-medium text-forest-950">{f.ration}</p>
                    {f.notes && <p className="mt-1 text-sm text-ink-soft">{f.notes}</p>}
                  </li>
                ))}
              </ol>
            )}
          </Card>
        </section>
      </div>

      <section>
        <SectionTitle title="Photos" />
        {animal.photos.length === 0 ? (
          <Card className="p-6 text-sm text-ink-muted">No photos yet.</Card>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {animal.photos.map((p) => (
              <figure key={`${p.date}-${p.caption}`} className="overflow-hidden rounded-2xl border border-border bg-white">
                <div className="flex aspect-[4/3] flex-col items-center justify-center gap-2 bg-cream-100 text-ink-muted">
                  <ImageIcon className="size-6" aria-hidden="true" />
                  <span className="text-xs">{isDemo ? "Sample photo slot" : "Photo"}</span>
                </div>
                <figcaption className="px-3.5 py-3">
                  <p className="text-sm font-medium text-forest-950">{p.caption}</p>
                  <p className="text-xs text-ink-muted">{formatDate(p.date)}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </section>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-8 [&>*]:min-w-0">
        <section>
          <SectionTitle title="Recorded costs" />
          <Card>
            {animal.costs.length === 0 ? (
              <p className="p-6 text-sm text-ink-muted">No costs recorded yet.</p>
            ) : (
              <>
                <dl className="divide-y divide-border">
                  {costsByCategory.map(([category, amount]) => (
                    <div key={category} className="flex justify-between gap-4 px-5 py-3.5 sm:px-6">
                      <dt className="text-sm text-ink-soft">{costLabel[category]}</dt>
                      <dd className="text-sm font-medium text-forest-950 tabular">{formatKES(amount)}</dd>
                    </div>
                  ))}
                  <div className="flex justify-between gap-4 bg-cream-100/70 px-5 py-4 sm:px-6">
                    <dt className="text-sm font-medium text-forest-950">Total to date</dt>
                    <dd className="font-display text-lg font-medium text-forest-950 tabular">{formatKES(totalCosts(animal))}</dd>
                  </div>
                </dl>
                <p className="border-t border-border px-5 py-3 text-xs leading-relaxed text-ink-muted sm:px-6">
                  Actual recorded costs only. This is not a valuation, projection or promise of return.
                </p>
              </>
            )}
          </Card>
        </section>

        <section>
          <SectionTitle title="Ownership" />
          <Card>
            <dl className="divide-y divide-border">
              {(
                [
                  ["Owner", animal.ownership.holder],
                  ["Since", formatDate(animal.ownership.since)],
                  ["Programme", animal.programme],
                  ["Agreement", animal.ownership.agreement ?? "—"],
                ] as const
              ).map(([label, value]) => (
                <div key={label} className="flex justify-between gap-4 px-5 py-3.5 sm:px-6">
                  <dt className="text-sm text-ink-muted">{label}</dt>
                  <dd className="text-right text-sm font-medium text-forest-950">{value}</dd>
                </div>
              ))}
            </dl>
          </Card>
        </section>
      </div>
    </div>
  );
}
