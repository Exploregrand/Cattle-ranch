export function PageHeader({ eyebrow, title, children }: { eyebrow?: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && <p className="text-sm text-ink-muted">{eyebrow}</p>}
        <h1 className="t-h2 mt-1 text-forest-950">
          {title}
        </h1>
      </div>
      {children}
    </div>
  );
}

export function SectionTitle({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className="mb-3 flex items-baseline justify-between gap-4">
      <h2 className="t-h3 text-forest-950">{title}</h2>
      {children}
    </div>
  );
}
