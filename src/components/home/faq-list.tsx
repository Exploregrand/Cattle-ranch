import { Plus } from "lucide-react";

export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-ink/10 border-y border-ink/15">
      {items.map((item) => (
        <details key={item.q} className="group">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
            <span className="t-h3">{item.q}</span>
            <Plus className="mt-1.5 size-4 shrink-0 text-ink-muted transition-transform duration-300 group-open:rotate-45" aria-hidden="true" />
          </summary>
          <p className="t-body -mt-1 max-w-2xl pb-6 pr-10 text-ink-soft">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
