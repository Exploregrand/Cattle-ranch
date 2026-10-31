"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

/** Friendly fallback for unexpected errors on public pages. */
export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main id="main" className="flex flex-1 items-center bg-cream-50">
      <div className="mx-auto max-w-lg px-6 py-24 text-center">
        <p className="eyebrow">Something went wrong</p>
        <h1 className="t-h1 mt-4">This page didn&apos;t load.</h1>
        <p className="t-body mt-4 text-ink-soft">Please try again. If it keeps happening, come back in a few minutes.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Button onClick={reset}>Try again</Button>
          <Button asChild variant="outline">
            <Link href="/">Back to home</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
