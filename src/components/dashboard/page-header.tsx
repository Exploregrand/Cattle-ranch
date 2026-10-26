export function PageHeader({ eyebrow, title, children }: { eyebrow?: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && <p className="text-sm text-ink-muted">{eyebrow}</p>}
        <h1 className="mt-1 font-display text-[2rem] font-medium leading-tight tracking-[-0.025em] text-forest-950 sm:text-4xl">
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
      <h2 className="font-display text-xl font-medium text-forest-950">{title}</h2>
      {children}
    </div>
  );
}
