import { registerAnimal } from "@/app/admin/_actions/livestock";
import { today } from "@/app/admin/_actions/shared";
import { ActionForm } from "@/components/admin/action-form";
import { DateInput, Field, NumberInput, Select } from "@/components/admin/fields";
import { Input } from "@/components/ui/input";

export function RegisterForm({ programmes }: { programmes: { id: string; name: string }[] }) {
  const t = today();
  return (
    <ActionForm action={registerAnimal} submitLabel="Register animal" pendingLabel="Registering…" reset={false}>
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Species">
          <Select name="species" defaultValue="" required>
            <option value="" disabled>
              Choose
            </option>
            <option value="sheep">Sheep</option>
            <option value="goats">Goat</option>
            <option value="cattle">Cattle</option>
          </Select>
        </Field>
        <Field label="Breed">
          <Input name="breed" placeholder="e.g. Dorper" required maxLength={60} />
        </Field>
        <Field label="Sex">
          <Select name="sex" defaultValue="" required>
            <option value="" disabled>
              Choose
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Select>
        </Field>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Date of birth" hint="(if known)">
          <Input type="date" name="dateOfBirth" max={t} />
        </Field>
        <Field label="Or estimated age" hint="(months)">
          <NumberInput name="estAgeMonths" step={1} suffix="mo" />
        </Field>
        <Field label="Intake date">
          <DateInput name="intakeDate" defaultValue={t} max={t} />
        </Field>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Intake weight" hint="(optional)">
          <NumberInput name="initialWeight" suffix="kg" />
        </Field>
        <Field label="Purchase cost" hint="(optional)">
          <NumberInput name="purchaseCost" suffix="KES" />
        </Field>
        <Field label="Programme">
          <Select name="programmeId" defaultValue="farm-owned">
            {programmes.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </Select>
        </Field>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Location">
          <Input name="location" defaultValue="Tangama Farm, Isinya" required maxLength={120} />
        </Field>
        <Field label="Notes" hint="(optional)">
          <Input name="notes" placeholder="Source, condition at intake…" maxLength={500} />
        </Field>
      </div>
      <p className="text-xs text-ink-muted">A unique ID (e.g. TGM-SH-0001) is assigned automatically.</p>
    </ActionForm>
  );
}
