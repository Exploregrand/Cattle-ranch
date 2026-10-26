import Link from "next/link";

import { SiteHeader } from "@/components/site/site-header";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 items-center bg-cream-50">
        <div className="mx-auto max-w-xl px-5 py-24 text-center sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-500">Page not found</p>
          <h1 className="mt-4 font-display text-4xl font-medium tracking-[-0.025em] text-forest-950">
            We couldn&apos;t find that page
          </h1>
          <p className="mt-4 text-ink-soft">It may have moved, or the link may be incorrect.</p>
          <Button asChild className="mt-8">
            <Link href="/">Back to the homepage</Link>
          </Button>
        </div>
      </main>
    </>
  );
}
