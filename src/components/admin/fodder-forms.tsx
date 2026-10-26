import { clearBeds, logActivity, plantBeds } from "@/app/admin/_actions/fodder";
import { today } from "@/app/admin/_actions/shared";
import { ActionForm } from "@/components/admin/action-form";
import { DateInput, Field, NumberInput, Select } from "@/components/admin/fields";
import { BedRangeFields, CropSelect } from "@/components/admin/fodder-ui";
import { Textarea } from "@/components/ui/textarea";
import { activityKinds, stockForms } from "@/lib/admin/vocab";

/** `bedId` targets one bed; otherwise the form takes a section and bed range. */
export function ActivityForm({ bedId }: { bedId?: string }) {
  const t = today();
  return (
    <ActionForm action={logActivity} submitLabel="Log activity">
      {bedId ? <input type="hidden" name="bedId" value={bedId} /> : <BedRangeFields />}
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Activity">
          <Select name="kind" defaultValue="irrigation">
            {activityKinds.map((k) => (
              <option key={k.id} value={k.id}>
                {k.label}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Date">
          <DateInput defaultValue={t} max={t} />
        </Field>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Harvest yield" hint={bedId ? "(harvest only)" : "(total, harvest only)"}>
          <NumberInput name="yieldKg" suffix="kg" placeholder="0" />
        </Field>
        <Field label="Stored as" hint="(harvest only)">
          <Select name="stockForm" defaultValue="fresh">
            {stockForms.map((f) => (
              <option key={f.id} value={f.id}>
                {f.label}
              </option>
            ))}
          </Select>
        </Field>
      </div>
      <label className="flex items-center gap-3 text-sm text-ink-soft">
        <input type="checkbox" name="toStock" defaultChecked className="size-5 accent-forest-800" />
        Add harvested fodder to stock
      </label>
      <Field label="Notes" hint="(optional)">
        <Textarea name="notes" className="min-h-20" maxLength={500} />
      </Field>
    </ActionForm>
  );
}

export function PlantForm({ bedId }: { bedId?: string }) {
  const t = today();
  return (
    <ActionForm action={plantBeds} submitLabel={bedId ? "Record planting" : "Record planting"} variant="outline">
      {bedId ? <input type="hidden" name="bedId" value={bedId} /> : <BedRangeFields />}
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Crop">
          <CropSelect />
        </Field>
        <Field label="Planted on">
          <DateInput defaultValue={t} max={t} />
        </Field>
      </div>
      <p className="text-xs leading-relaxed text-ink-muted">Any current crop in these beds is closed off on this date.</p>
    </ActionForm>
  );
}

export function ClearForm({ bedId }: { bedId: string }) {
  const t = today();
  return (
    <ActionForm action={clearBeds} submitLabel="Clear bed" variant="outline">
      <input type="hidden" name="bedId" value={bedId} />
      <Field label="Cleared on">
        <DateInput defaultValue={t} max={t} />
      </Field>
    </ActionForm>
  );
}
