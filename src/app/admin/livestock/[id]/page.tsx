import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronDown, ChevronLeft, CircleCheck } from "lucide-react";

import { today } from "@/app/admin/_actions/shared";
import { AdminSkeleton } from "@/components/admin/admin-shell";
import {
  CostForm,
  FeedingForm,
  HealthForm,
  OwnerForm,
  StatusForm,
  WeightForm,
} from "@/components/admin/livestock-forms";
import { AnimalProfile } from "@/components/dashboard/animal-profile";
import { pageStaff } from "@/lib/admin/auth";
import { getAnimal, listCustomers } from "@/lib/admin/livestock";
import { formatDate, formatKES, formatKg } from "@/lib/format";

function Action({ title, open, children }: { title: string; open?: boolean; children: React.ReactNode }) {
  return (
    <details open={open} className="group rounded-2xl border border-border bg-white">
      <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 font-medium text-forest-950 [&::-webkit-details-marker]:hidden">
        {title}
        <ChevronDown className="size-4 text-ink-muted transition-transform group-open:rotate-180" aria-hidden="true" />
      </summary>
      <div className="border-t border-border px-5 pb-5 pt-4">{children}</div>
    </details>
  );
}

async function AnimalContent({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { id } = await params;
  const staff = await pageStaff(`/admin/livestock/${id}`);
  if (!staff) return null;
  const animal = await getAnimal(id);
  if (!animal) notFound();
  const isAdmin = staff.role === "admin";
  const customers = isAdmin ? await listCustomers() : [];
  const justRegistered = (await searchParams).registered === "1";
  const t = today();

  return (
    <>
      <Link href="/admin/livestock" className="-ml-1 mb-4 inline-flex items-center gap-1 text-sm text-ink-soft hover:text-forest-900">
        <ChevronLeft className="size-4" aria-hidden="true" /> Livestock
      </Link>
      {justRegistered && (
        <p role="status" className="mb-6 flex items-center gap-2 rounded-xl bg-forest-100 px-4 py-3 text-sm text-forest-900">
          <CircleCheck className="size-4 shrink-0" aria-hidden="true" />
          <span>
            Registered as <strong className="font-mono">{animal.tag}</strong>. Tag the animal with this ID.
          </span>
        </p>
      )}
      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="order-2 min-w-0 lg:order-1">
          <AnimalProfile animal={animal} base="/admin" asOf={t} hideBack />
          {(animal.statusHistory.length > 0 || animal.sales.length > 0 || animal.fedKg > 0) && (
            <section className="mt-10 rounded-2xl border border-border bg-white p-5 sm:p-6">
              <h2 className="font-display text-xl font-medium text-forest-950">Movements and outcomes</h2>
              <ul className="mt-4 divide-y divide-border text-sm">
                {animal.statusHistory.map((s, i) => (
                  <li key={i} className="flex justify-between gap-4 py-2.5">
                    <span className="capitalize text-forest-950">
                      {s.status}
                      {s.notes && <span className="normal-case text-ink-muted"> · {s.notes}</span>}
                    </span>
                    <span className="shrink-0 text-ink-muted">{formatDate(s.date)}</span>
                  </li>
                ))}
                {animal.sales.map((s, i) => (
                  <li key={`sale-${i}`} className="flex justify-between gap-4 py-2.5">
                    <span className="text-forest-950">{s.description}</span>
                    <span className="shrink-0 font-medium tabular">{formatKES(s.amountKes)}</span>
                  </li>
                ))}
                {animal.fedKg > 0 && (
                  <li className="flex justify-between gap-4 py-2.5">
                    <span className="text-forest-950">Fodder fed from farm stock</span>
                    <span className="shrink-0 font-medium tabular">{formatKg(animal.fedKg)}</span>
                  </li>
                )}
              </ul>
            </section>
          )}
        </div>

        <aside className="order-1 space-y-3 lg:sticky lg:top-6 lg:order-2 lg:self-start" aria-label="Record">
          <p className="px-1 text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted">Record</p>
          <Action title="Weight" open>
            <WeightForm animalId={animal.id} />
          </Action>
          <Action title="Health or vaccination">
            <HealthForm animalId={animal.id} />
          </Action>
          <Action title="Feeding">
            <FeedingForm animalId={animal.id} />
          </Action>
          {isAdmin && (
            <Action title="Cost">
              <CostForm animalId={animal.id} />
            </Action>
          )}
          <Action title="Status — sale, death or transfer">
            <StatusForm animalId={animal.id} current={animal.status} isAdmin={isAdmin} />
          </Action>
          {isAdmin && (
            <Action title="Ownership">
              <OwnerForm animalId={animal.id} currentOwnerId={animal.ownerId} customers={customers} />
            </Action>
          )}
        </aside>
      </div>
    </>
  );
}

export default function AdminAnimalPage({ params, searchParams }: PageProps<"/admin/livestock/[id]">) {
  return (
    <Suspense fallback={<AdminSkeleton />}>
      <AnimalContent params={params} searchParams={searchParams} />
    </Suspense>
  );
}
