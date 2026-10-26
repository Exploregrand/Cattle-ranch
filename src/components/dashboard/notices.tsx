import { Info } from "lucide-react";

/** Shown on /dashboard while Supabase credentials are not configured. */
export function UnconfiguredNotice() {
  return (
    <div className="mb-6 flex items-start gap-3 rounded-xl border border-border bg-cream-100 px-4 py-3.5 text-sm leading-relaxed text-ink-soft">
      <Info className="mt-0.5 size-4 shrink-0 text-gold-500" aria-hidden="true" />
      <p>
        <strong className="font-medium text-forest-900">Preview.</strong> Customer accounts are
        not connected yet, so this dashboard shows what a new customer sees before any animals
        are allocated.
      </p>
    </div>
  );
}
