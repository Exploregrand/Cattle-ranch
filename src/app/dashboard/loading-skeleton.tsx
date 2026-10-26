export function DashboardSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading" className="animate-pulse space-y-6">
      <div className="h-4 w-40 rounded bg-cream-200" />
      <div className="h-9 w-56 rounded bg-cream-200" />
      <div className="h-48 rounded-[1.5rem] bg-cream-200" />
      <div className="h-20 rounded-2xl bg-cream-100" />
      <div className="h-20 rounded-2xl bg-cream-100" />
    </div>
  );
}
