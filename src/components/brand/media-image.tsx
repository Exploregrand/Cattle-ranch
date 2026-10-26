import Image from "next/image";

import { Landscape } from "@/components/brand/landscape";
import { media } from "@/content/media";
import { cn } from "@/lib/utils";

/** Renders the configured photo for a slot, or its illustrated fallback. */
export function MediaImage({
  slot,
  scene,
  priority,
  sizes = "100vw",
  className,
}: {
  slot: keyof typeof media;
  scene: "dusk" | "day" | "fodder";
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  const photo = media[slot];
  if (photo) {
    return (
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        priority={priority}
        sizes={sizes}
        className={cn("object-cover", className)}
      />
    );
  }
  return <Landscape scene={scene} id={`scene-${slot}`} className={cn("absolute inset-0", className)} />;
}
