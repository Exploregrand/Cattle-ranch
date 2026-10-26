import { Suspense } from "react";

import { AdminSkeleton } from "@/components/admin/admin-shell";
import { recordStock } from "@/app/admin/_actions/fodder";
import { today } from "@/app/admin/_actions/shared";
import { ActionForm } from "@/components/admin/action-form";
import { AdminPageHeader } from "@/components/admin/admin-shell";
import { DateInput, Field, NumberInput, Panel, Select } from "@/components/admin/fields";
import { CropSelect, cropName, FodderTabs } from "@/components/admin/fodder-ui";
import { Input } from "@/components/ui/input";
import { pageStaff } from "@/lib/admin/auth";
import { getStock } from "@/lib/admin/fodder";
import { stockForms, stockReasons } from "@/lib/admin/vocab";
import { formatDate, formatKg } from "@/lib/format";

export const metadata = { title: "Fodder stock" };

const reasonLabel = Object.fromEntries([...stockReasons.in, ...stockReasons.out].map((r) => [r.id, r.label]));
const formLabel = Object.fromEntries(stockForms.map((f) => [f.id, f.label]));

async function StockPageContent() {
  if (!(await pageStaff("/admin/fodder/stock"))) return null;
  const stock = await getStock();
  const t = today();
  return (
    <>
      <AdminPageHeader title="Fodder" description="What's in store, and where it went" />
      <FodderTabs active="stock" />

      <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-6">
          <section className="rounded-2xl bg-forest-900 p-6 text-cream-50">
            <p className="text-sm text-cream-100/70">Total fodder in stock</p>
            <p className="mt-1 font-display text-5xl font-medium tracking-[-0.02em] tabular">{formatKg(stock.totalKg)}</p>
            {stock.levels.length > 0 ? (
              <ul className="mt-6 divide-y divide-cream-50/10 border-t border-cream-50/10">
                {stock.levels.map((l) => (
                  <li key={`${l.crop}-${l.form}`} className="flex justify-between py-2.5 text-sm">
                    <span className="text-cream-100/80">
                      {cropName(l.crop)} · {formLabel[l.form]}
                    </span>
                    <span className="font-medium tabular">{formatKg(l.balanceKg)}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-cream-100/70">Harvests logged with “Add to stock” appear here automatically.</p>
            )}
          </section>
        </div>

        <Panel title="Record a stock movement" description="Purchases, sales, spoilage or a stock count adjustment.">
          <ActionForm action={recordStock} submitLabel="Save movement">
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Movement">
                <Select name="direction" defaultValue="in">
                  <option value="in">Into stock</option>
                  <option value="out">Out of stock</option>
                </Select>
              </Field>
              <Field label="Reason">
                <Select name="reason" defaultValue="" required>
                  <option value="" disabled>
                    Choose reason
                  </option>
                  <optgroup label="Into stock">
                    {stockReasons.in.map((r) => (
                      <option key={`in-${r.id}`} value={r.id}>
                        {r.label}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Out of stock">
                    {stockReasons.out
                      .filter((r) => r.id !== "adjustment")
                      .map((r) => (
                        <option key={`out-${r.id}`} value={r.id}>
                          {r.label}
                        </option>
                      ))}
                  </optgroup>
                </Select>
              </Field>
              <Field label="Crop">
                <CropSelect includeOther />
              </Field>
              <Field label="Form">
                <Select name="form" defaultValue="fresh">
                  {stockForms.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.label}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label="Quantity">
                <NumberInput name="quantityKg" suffix="kg" required />
              </Field>
              <Field label="Date">
                <DateInput defaultValue={t} max={t} />
              </Field>
            </div>
            <Field label="Notes" hint="(optional)">
              <Input name="notes" maxLength={500} />
            </Field>
          </ActionForm>
        </Panel>
      </div>

      <Panel title="Recent movements" className="mt-6">
        {stock.movements.length === 0 ? (
          <p className="text-sm text-ink-muted">No stock movements yet.</p>
        ) : (
          <ul className="-my-3 divide-y divide-border">
            {stock.movements.map((m) => (
              <li key={m.id} className="flex items-center justify-between gap-4 py-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-forest-950">
                    {reasonLabel[m.reason]} · {cropName(m.crop)} ({formLabel[m.form].toLowerCase()})
                    {m.animalTag && <span className="font-mono text-xs text-ink-muted"> · {m.animalTag}</span>}
                  </p>
                  <p className="truncate text-xs text-ink-muted">
                    {formatDate(m.occurredOn)}
                    {m.notes && ` · ${m.notes}`}
                  </p>
                </div>
                <span className={m.direction === "in" ? "shrink-0 font-medium text-forest-700 tabular" : "shrink-0 font-medium text-ink-soft tabular"}>
                  {m.direction === "in" ? "+" : "−"}
                  {formatKg(m.quantityKg)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </>
  );
}

export default function StockPage() {
  return (
    <Suspense fallback={<AdminSkeleton />}>
      <StockPageContent />
    </Suspense>
  );
}
