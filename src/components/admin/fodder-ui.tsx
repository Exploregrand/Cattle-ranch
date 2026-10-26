import Link from "next/link";

import { Field, NumberInput, Select } from "@/components/admin/fields";
import { cropById, crops, sections } from "@/lib/admin/vocab";
import type { BedState } from "@/lib/admin/fodder";
import { cn } from "@/lib/utils";

export function FodderTabs({ active }: { active: "beds" | "stock" | "activity" }) {
  const tabs = [
    { id: "beds", href: "/admin/fodder", label: "Beds" },
    { id: "stock", href: "/admin/fodder/stock", label: "Stock" },
    { id: "activity", href: "/admin/fodder/activity", label: "Activity log" },
  ];
  return (
    <nav aria-label="Fodder" className="mb-8 inline-flex rounded-full bg-cream-200/70 p-1">
      {tabs.map((t) => (
        <Link
          key={t.id}
          href={t.href}
          aria-current={active === t.id ? "page" : undefined}
          className={cn(
            "rounded-full px-4 py-2 text-sm transition-colors",
            active === t.id ? "bg-white font-medium text-forest-900 shadow-sm" : "text-ink-soft hover:text-forest-900",
          )}
        >
          {t.label}
        </Link>
      ))}
    </nav>
  );
}

export function CropLegend() {
  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-soft">
      {crops.map((c) => (
        <li key={c.id} className="flex items-center gap-2">
          <span className="size-3 rounded-[4px]" style={{ background: c.color }} aria-hidden="true" />
          {c.label} <span className="font-mono text-xs text-ink-muted">{c.code}</span>
        </li>
      ))}
      <li className="flex items-center gap-2">
        <span className="size-3 rounded-[4px] border border-dashed border-ink-muted/50" aria-hidden="true" />
        Unplanted
      </li>
    </ul>
  );
}

export function BedMap({ beds }: { beds: BedState[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {sections.map((section) => {
        const list = beds.filter((b) => b.section === section);
        const planted = list.filter((b) => b.crop).length;
        return (
          <div key={section} className="rounded-2xl border border-border bg-white p-4 sm:p-5">
            <div className="mb-4 flex items-baseline justify-between">
              <h3 className="font-display text-lg font-medium text-forest-950">Section {section}</h3>
              <p className="text-xs text-ink-muted tabular">
                {planted}/{list.length} planted
              </p>
            </div>
            <ul className="grid grid-cols-5 gap-1.5">
              {list.map((bed) => {
                const crop = bed.crop ? cropById[bed.crop] : null;
                return (
                  <li key={bed.id}>
                    <Link
                      href={`/admin/fodder/beds/${bed.id}`}
                      title={`${bed.id}${crop ? ` · ${crop.label}` : " · unplanted"}`}
                      aria-label={`Bed ${bed.id}, ${crop ? crop.label : "unplanted"}`}
                      className={cn(
                        "flex h-12 flex-col items-center justify-center rounded-lg text-[0.7rem] leading-tight transition-transform hover:scale-[1.06] focus-visible:scale-[1.06]",
                        crop ? "text-white" : "border border-dashed border-ink-muted/35 text-ink-muted hover:border-forest-600",
                      )}
                      style={crop ? { background: crop.color } : undefined}
                    >
                      <span className="font-mono font-medium tabular">{String(bed.position).padStart(2, "0")}</span>
                      {crop && <span className="font-mono text-[0.6rem] opacity-90">{crop.code}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

export function BedRangeFields() {
  return (
    <div className="grid grid-cols-3 gap-3">
      <Field label="Section">
        <Select name="section" defaultValue="A">
          {sections.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </Select>
      </Field>
      <Field label="From bed">
        <NumberInput name="from" min={1} max={40} step={1} defaultValue={1} required />
      </Field>
      <Field label="To bed">
        <NumberInput name="to" min={1} max={40} step={1} defaultValue={40} required />
      </Field>
    </div>
  );
}

export function CropSelect({ name = "crop", includeOther = false }: { name?: string; includeOther?: boolean }) {
  return (
    <Select name={name} defaultValue="" required>
      <option value="" disabled>
        Choose crop
      </option>
      {crops.map((c) => (
        <option key={c.id} value={c.id}>
          {c.label}
        </option>
      ))}
      {includeOther && <option value="other">Other</option>}
    </Select>
  );
}

export function cropName(id: string | null) {
  if (!id) return "Unplanted";
  return id in cropById ? cropById[id as keyof typeof cropById].label : "Other";
}
