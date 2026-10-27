"use client";

import { Button } from "@/components/ui/button";

/** Shown when Farm Ops can't reach the database or a page fails to load. */
export default function AdminError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="mx-auto max-w-lg px-5 py-24 text-center">
      <p className="label-caps text-clay">Farm Ops</p>
      <h1 className="mt-4 font-display text-3xl font-medium text-forest-950">We couldn&apos;t load the farm records</h1>
      <p className="mt-3 leading-relaxed text-ink-soft">
        The database may be unreachable right now. Your records are safe — try again in a moment.
      </p>
      <Button onClick={reset} className="mt-8">
        Try again
      </Button>
    </div>
  );
}
