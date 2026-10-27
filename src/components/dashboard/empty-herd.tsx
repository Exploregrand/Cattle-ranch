import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Woodcut } from "@/components/brand/woodcut";
import { Button } from "@/components/ui/button";

export function EmptyHerd({ base }: { base: string }) {
  return (
    <div className="overflow-hidden rounded-[2rem] bg-cream-200">
      <div className="flex items-end justify-center gap-4 px-6 pt-10">
        <Woodcut species="goat" ink="#3a2a1f" paper="#e2d1ae" className="h-28 w-auto sm:h-36" />
        <Woodcut species="cattle" ink="#1e1a16" paper="#e2d1ae" className="h-36 w-auto sm:h-44" />
        <Woodcut species="sheep" ink="#1e1a16" paper="#e2d1ae" className="h-24 w-auto sm:h-28" />
      </div>
      <div className="px-6 pb-9 pt-8 sm:px-10 sm:pb-11">
        <h2 className="font-display text-[1.9rem] font-medium leading-tight tracking-[-0.02em] text-forest-950 sm:text-[2.4rem]">
          Your herd starts here
        </h2>
        <p className="mt-3 max-w-xl leading-relaxed text-ink-soft">
          You don&apos;t have any animals yet. When programmes open, every animal you own will appear here with its ear-tag ID,
          weigh-ins, health records, feeding and photos.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <Link href={`${base}/explore`}>
              See upcoming programmes
              <ArrowRight />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/demo">Preview with sample animals</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
