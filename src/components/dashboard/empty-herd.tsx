import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Landscape } from "@/components/brand/landscape";
import { Button } from "@/components/ui/button";

export function EmptyHerd({ base }: { base: string }) {
  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-border bg-white">
      <div className="relative h-36 sm:h-44">
        <Landscape scene="day" id="empty-herd" className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent" />
      </div>
      <div className="px-6 pb-8 pt-2 sm:px-10 sm:pb-10">
        <h2 className="font-display text-2xl font-medium tracking-[-0.02em] text-forest-950 sm:text-3xl">
          Your livestock will appear here
        </h2>
        <p className="mt-3 max-w-xl leading-relaxed text-ink-soft">
          You don&apos;t have any animals yet. Once livestock programmes open, each animal you
          own or have under Cattle Buy management will be listed here with its weights, health
          records, feeding and photos.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <Link href={`${base}/explore`}>
              See upcoming programmes
              <ArrowRight />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/demo">Preview with sample data</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
