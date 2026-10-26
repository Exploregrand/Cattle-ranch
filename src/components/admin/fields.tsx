import { ChevronDown } from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function Field({
  label,
  hint,
  children,
  className,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block space-y-2", className)}>
      <span className="block text-sm font-medium text-forest-900">
        {label}
        {hint && <span className="ml-1 font-normal text-ink-muted">{hint}</span>}
      </span>
      {children}
    </label>
  );
}

export function Select({ className, children, ...props }: React.ComponentProps<"select">) {
  return (
    <span className="relative block">
      <select
        className={cn(
          "h-12 w-full appearance-none rounded-xl border border-input bg-white pl-4 pr-10 text-base text-ink outline-none transition-[border-color,box-shadow] focus-visible:border-gold-500 focus-visible:ring-4 focus-visible:ring-gold-200/60",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-ink-muted" aria-hidden="true" />
    </span>
  );
}

export function DateInput({ name = "date", defaultValue, max }: { name?: string; defaultValue: string; max: string }) {
  return <Input type="date" name={name} defaultValue={defaultValue} max={max} required />;
}

export function NumberInput({ suffix, ...props }: React.ComponentProps<"input"> & { suffix?: string }) {
  return (
    <span className="relative block">
      <Input type="number" inputMode="decimal" step="any" min="0" className={suffix ? "pr-14" : undefined} {...props} />
      {suffix && (
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-ink-muted">{suffix}</span>
      )}
    </span>
  );
}

export function Panel({
  title,
  description,
  children,
  className,
  action,
  id,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className={cn("rounded-2xl border border-border bg-white", className)}>
      <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div>
          <h2 className="font-display text-lg font-medium text-forest-950">{title}</h2>
          {description && <p className="mt-0.5 text-sm text-ink-muted">{description}</p>}
        </div>
        {action}
      </div>
      <div className="p-5 sm:p-6">{children}</div>
    </section>
  );
}
