import { Suspense } from "react";
import Link from "next/link";

import { addTransaction } from "@/app/admin/_actions/crm-finance";
import { today } from "@/app/admin/_actions/shared";
import { ActionForm } from "@/components/admin/action-form";
import { AdminPageHeader, AdminSkeleton } from "@/components/admin/admin-shell";
import { DateInput, Field, NumberInput, Panel, Select } from "@/components/admin/fields";
import { Input } from "@/components/ui/input";
import { pageStaff } from "@/lib/admin/auth";
import { getLedger, getRealisedMargins, type Period } from "@/lib/admin/finance";
import { allCategoryLabels, ledgerCategories } from "@/lib/admin/vocab";
import { formatDate, formatKES } from "@/lib/format";
import { cn } from "@/lib/utils";

export const metadata = { title: "Finance" };

const periods: { id: Period; label: string }[] = [
  { id: "month", label: "This month" },
  { id: "year", label: "This year" },
  { id: "all", label: "All time" },
];

async function FinanceContent({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  if (!(await pageStaff("/admin/finance", true))) return null;
  const sp = await searchParams;
  const period: Period = sp.period === "year" || sp.period === "all" ? sp.period : "month";
  const [ledger, margins] = await Promise.all([getLedger(period), getRealisedMargins()]);
  const t = today();

  return (
    <>
      <AdminPageHeader title="Finance" description="Actual income and costs in KES. No projections.">
        <nav aria-label="Period" className="inline-flex rounded-full bg-cream-200/70 p-1">
          {periods.map((p) => (
            <Link
              key={p.id}
              href={`/admin/finance?period=${p.id}`}
              aria-current={period === p.id ? "page" : undefined}
              className={cn("rounded-full px-4 py-2 text-sm", period === p.id ? "bg-white font-medium text-forest-900 shadow-sm" : "text-ink-soft")}
            >
              {p.label}
            </Link>
          ))}
        </nav>
      </AdminPageHeader>

      <dl className="mb-8 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-white p-5">
          <dt className="text-xs text-ink-muted">Income</dt>
          <dd className="mt-1.5 font-display text-3xl font-medium text-forest-950 tabular">{formatKES(ledger.income)}</dd>
        </div>
        <div className="rounded-2xl border border-border bg-white p-5">
          <dt className="text-xs text-ink-muted">Expenses</dt>
          <dd className="mt-1.5 font-display text-3xl font-medium text-forest-950 tabular">{formatKES(ledger.expenses)}</dd>
        </div>
        <div className="rounded-2xl bg-forest-900 p-5 text-cream-50">
          <dt className="text-xs text-cream-100/70">Net</dt>
          <dd className="mt-1.5 font-display text-3xl font-medium tabular">
            {ledger.net < 0 ? "−" : ""}
            {formatKES(Math.abs(ledger.net))}
          </dd>
        </div>
      </dl>

      <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
        <Panel title="Ledger" description="Farm transactions and per-animal costs together.">
          {ledger.entries.length === 0 ? (
            <p className="text-sm text-ink-muted">No transactions in this period.</p>
          ) : (
            <ul className="-my-3 divide-y divide-border">
              {ledger.entries.map((e) => (
                <li key={`${e.source}-${e.id}`} className="flex items-center justify-between gap-4 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-forest-950">{e.description}</p>
                    <p className="text-xs text-ink-muted">
                      {formatDate(e.date)} · {allCategoryLabels[e.category] ?? e.category}
                      {e.animalTag && (
                        <>
                          {" · "}
                          <Link href={`/admin/livestock/${e.animalId}`} className="font-mono hover:underline">
                            {e.animalTag}
                          </Link>
                        </>
                      )}
                    </p>
                  </div>
                  <span className={cn("shrink-0 font-medium tabular", e.direction === "income" ? "text-forest-700" : "text-ink-soft")}>
                    {e.direction === "income" ? "+" : "−"}
                    {formatKES(e.amountKes)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Panel>

        <Panel title="Record a transaction" description="Livestock sales are recorded from the animal's page.">
          <ActionForm action={addTransaction} submitLabel="Save transaction">
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Type">
                <Select name="direction" defaultValue="expense">
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </Select>
              </Field>
              <Field label="Category">
                <Select name="category" defaultValue="" required>
                  <option value="" disabled>
                    Choose
                  </option>
                  <optgroup label="Expenses">
                    {ledgerCategories.expense.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.label}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Income">
                    {ledgerCategories.income
                      .filter((c) => c.id !== "livestock_sale")
                      .map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.label}
                        </option>
                      ))}
                  </optgroup>
                </Select>
              </Field>
              <Field label="Amount">
                <NumberInput name="amountKes" suffix="KES" required />
              </Field>
              <Field label="Date">
                <DateInput defaultValue={t} max={t} />
              </Field>
            </div>
            <Field label="Description">
              <Input name="description" placeholder="e.g. Desmodium seed, 5 kg" required maxLength={200} />
            </Field>
            <Field label="Animal ID" hint="(optional)">
              <Input name="animalTag" placeholder="TGM-SH-0001" className="font-mono uppercase" maxLength={12} />
            </Field>
          </ActionForm>
        </Panel>
      </div>

      <Panel title="Realised margins" className="mt-6" description="Sold animals only: sale proceeds minus every recorded cost.">
        {margins.length === 0 ? (
          <p className="text-sm text-ink-muted">No animals sold yet. Margins appear here once a sale is recorded.</p>
        ) : (
          <div className="-mx-5 overflow-x-auto sm:-mx-6">
            <table className="w-full min-w-[520px] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs text-ink-muted">
                  <th className="px-5 py-2.5 font-normal sm:px-6">Animal</th>
                  <th className="py-2.5 font-normal">Sold</th>
                  <th className="py-2.5 text-right font-normal">Sale</th>
                  <th className="py-2.5 text-right font-normal">Costs</th>
                  <th className="px-5 py-2.5 text-right font-normal sm:px-6">Margin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {margins.map((m) => (
                  <tr key={m.id}>
                    <td className="px-5 py-3 sm:px-6">
                      <Link href={`/admin/livestock/${m.id}`} className="font-mono font-medium text-forest-800 hover:underline">
                        {m.tag}
                      </Link>
                      <span className="text-ink-muted"> · {m.breed}</span>
                    </td>
                    <td className="py-3 text-ink-soft">{m.soldOn ? formatDate(m.soldOn) : "—"}</td>
                    <td className="py-3 text-right tabular">{formatKES(m.salesKes)}</td>
                    <td className="py-3 text-right tabular">{formatKES(m.costsKes)}</td>
                    <td className={cn("px-5 py-3 text-right font-medium tabular sm:px-6", m.marginKes < 0 ? "text-destructive" : "text-forest-700")}>
                      {m.marginKes < 0 ? "−" : "+"}
                      {formatKES(Math.abs(m.marginKes))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>
    </>
  );
}

export default function FinancePage({ searchParams }: PageProps<"/admin/finance">) {
  return (
    <Suspense fallback={<AdminSkeleton />}>
      <FinanceContent searchParams={searchParams} />
    </Suspense>
  );
}
