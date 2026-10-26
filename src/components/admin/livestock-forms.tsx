import {
  assignOwner,
  changeStatus,
  recordCost,
  recordFeeding,
  recordHealth,
  recordWeight,
} from "@/app/admin/_actions/livestock";
import { today } from "@/app/admin/_actions/shared";
import { ActionForm } from "@/components/admin/action-form";
import { DateInput, Field, NumberInput, Select } from "@/components/admin/fields";
import { CropSelect } from "@/components/admin/fodder-ui";
import { Input } from "@/components/ui/input";
import { animalCostCategories, stockForms } from "@/lib/admin/vocab";

function Hidden({ id }: { id: string }) {
  return <input type="hidden" name="animalId" value={id} />;
}

export function WeightForm({ animalId }: { animalId: string }) {
  const t = today();
  return (
    <ActionForm action={recordWeight} submitLabel="Save weight">
      <Hidden id={animalId} />
      <div className="grid grid-cols-2 gap-3">
        <Field label="Weight">
          <NumberInput name="kg" suffix="kg" required autoFocus={false} />
        </Field>
        <Field label="Date">
          <DateInput defaultValue={t} max={t} />
        </Field>
      </div>
    </ActionForm>
  );
}

export function HealthForm({ animalId }: { animalId: string }) {
  const t = today();
  return (
    <ActionForm action={recordHealth} submitLabel="Save health record">
      <Hidden id={animalId} />
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Type">
          <Select name="kind" defaultValue="vaccination">
            <option value="vaccination">Vaccination</option>
            <option value="treatment">Treatment</option>
            <option value="check">Health check</option>
          </Select>
        </Field>
        <Field label="Date">
          <DateInput defaultValue={t} max={t} />
        </Field>
      </div>
      <Field label="What was given or found">
        <Input name="title" placeholder="e.g. PPR vaccination" required maxLength={120} />
      </Field>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Details" hint="(optional)">
          <Input name="detail" placeholder="Dose, product, vet name…" maxLength={500} />
        </Field>
        <Field label="Cost" hint="(optional)">
          <NumberInput name="costKes" suffix="KES" />
        </Field>
      </div>
    </ActionForm>
  );
}

export function FeedingForm({ animalId }: { animalId: string }) {
  const t = today();
  return (
    <ActionForm action={recordFeeding} submitLabel="Save feeding">
      <Hidden id={animalId} />
      <div className="grid gap-3 sm:grid-cols-[1.6fr_1fr]">
        <Field label="Ration">
          <Input name="ration" placeholder="e.g. Napier, desmodium and mineral lick" required maxLength={160} />
        </Field>
        <Field label="From">
          <DateInput defaultValue={t} max={t} />
        </Field>
      </div>
      <fieldset className="rounded-xl bg-cream-100/70 p-4">
        <legend className="sr-only">Deduct from fodder stock</legend>
        <p className="mb-3 text-sm font-medium text-forest-900">
          Deduct from fodder stock <span className="font-normal text-ink-muted">(optional)</span>
        </p>
        <div className="grid grid-cols-3 gap-3">
          <Field label="Crop">
            <CropSelect name="fodderCrop" includeOther />
          </Field>
          <Field label="Form">
            <Select name="fodderForm" defaultValue="fresh">
              {stockForms.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.label}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Amount">
            <NumberInput name="fodderKg" suffix="kg" />
          </Field>
        </div>
      </fieldset>
      <Field label="Notes" hint="(optional)">
        <Input name="notes" maxLength={500} />
      </Field>
    </ActionForm>
  );
}

export function CostForm({ animalId }: { animalId: string }) {
  const t = today();
  return (
    <ActionForm action={recordCost} submitLabel="Save cost">
      <Hidden id={animalId} />
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Category">
          <Select name="category" defaultValue="feed">
            {animalCostCategories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Date">
          <DateInput defaultValue={t} max={t} />
        </Field>
        <Field label="Description">
          <Input name="label" placeholder="e.g. Feed — October" required maxLength={120} />
        </Field>
        <Field label="Amount">
          <NumberInput name="amountKes" suffix="KES" required />
        </Field>
      </div>
      <label className="flex items-center gap-3 text-sm text-ink-soft">
        <input type="checkbox" name="internal" className="size-5 accent-forest-800" />
        Internal only — hide from the customer&apos;s statement
      </label>
    </ActionForm>
  );
}

export function StatusForm({ animalId, current, isAdmin }: { animalId: string; current: string; isAdmin: boolean }) {
  const t = today();
  const options = [
    { id: "active", label: "Active on farm" },
    { id: "sold", label: "Sold" },
    { id: "transferred", label: "Transferred" },
    { id: "deceased", label: "Deceased" },
  ].filter((o) => o.id !== current && (isAdmin || o.id !== "sold"));
  return (
    <ActionForm action={changeStatus} submitLabel="Update status" variant="outline">
      <Hidden id={animalId} />
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="New status">
          <Select name="status" defaultValue={options[0]?.id}>
            {options.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Date">
          <DateInput defaultValue={t} max={t} />
        </Field>
      </div>
      {isAdmin && (
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Sale price" hint="(if sold)">
            <NumberInput name="salePrice" suffix="KES" />
          </Field>
          <Field label="Buyer" hint="(optional)">
            <Input name="buyer" maxLength={120} />
          </Field>
        </div>
      )}
      <Field label="Notes" hint="(cause, destination…)">
        <Input name="notes" maxLength={500} />
      </Field>
    </ActionForm>
  );
}

export function OwnerForm({
  animalId,
  currentOwnerId,
  customers,
}: {
  animalId: string;
  currentOwnerId: string | null;
  customers: { id: string; full_name: string | null; phone: string | null }[];
}) {
  const t = today();
  return (
    <ActionForm action={assignOwner} submitLabel="Save ownership" variant="outline" reset={false}>
      <Hidden id={animalId} />
      <Field label="Owner">
        <Select name="customerId" defaultValue={currentOwnerId ?? ""}>
          <option value="">Cattle Buy (farm-owned)</option>
          {customers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.full_name ?? "Unnamed customer"}
              {c.phone ? ` · ${c.phone}` : ""}
            </option>
          ))}
        </Select>
      </Field>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Effective from">
          <DateInput defaultValue={t} max={t} />
        </Field>
        <Field label="Agreement ref" hint="(optional)">
          <Input name="agreement" placeholder="e.g. MA-2026-001" maxLength={60} />
        </Field>
      </div>
      {customers.length === 0 && (
        <p className="text-xs text-ink-muted">No customer accounts yet. Customers appear here once they are onboarded.</p>
      )}
    </ActionForm>
  );
}
