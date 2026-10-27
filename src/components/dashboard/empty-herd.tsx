import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { photos } from "@/content/photos";

export function EmptyHerd({ base }: { base: string }) {
  return (
    <div className="overflow-hidden rounded-[2rem] bg-cream-200">
      <div className="grid h-44 grid-cols-3 gap-1 sm:h-56">
        {(["sheep", "goat", "cattle"] as const).map((k) => (
          <div key={k} className="relative">
            <Image src={photos[k].src} alt="" fill sizes="(min-width: 640px) 33vw, 50vw" className="object-cover" style={{ objectPosition: photos[k].position }} />
          </div>
        ))}
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
