import Link from "next/link";

import { brand } from "@/content/brand";
import { cn } from "@/lib/utils";

/** The Herd & Field seal: a double ring holding zebu horns over the land. */
export function BrandMark({ size = 36, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true" className={className}>
      <circle cx="24" cy="24" r="21.6" stroke="currentColor" strokeWidth="2.2" />
      <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
      <path d="M24 25.1 C 16.87 25.1, 12.5 20, 12.3 11.5 C 15.1 18, 17.675 21.9, 24 21.9 Z" fill="currentColor" />
      <path d="M24.00 25.1 C 31.13 25.1, 35.50 20, 35.70 11.5 C 32.90 18, 30.32 21.9, 24.00 21.9 Z" fill="currentColor" />
      <rect x="23.2" y="21.9" width="1.6" height="3.2" fill="currentColor" />
      <path d="M13 30.5 L35 30.5 M17.5 35 L30.5 35" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

export function Wordmark({
  tone = "dark",
  href = "/",
  className,
  compact = false,
}: {
  tone?: "dark" | "light";
  href?: string;
  className?: string;
  compact?: boolean;
}) {
  const dark = tone === "dark";
  return (
    <Link href={href} aria-label={`${brand.name} home`} className={cn("inline-flex items-center gap-2.5", className)}>
      <BrandMark size={compact ? 30 : 36} className={dark ? "text-forest-950" : "text-cream-50"} />
      <span className="leading-none">
        <span className={cn("block font-display text-[1.375rem] font-medium tracking-[-0.015em]", dark ? "text-forest-950" : "text-cream-50")}>
          {brand.name.split("&").map((part, i, all) => (
            <span key={i}>
              {part}
              {i < all.length - 1 && <span className="font-normal italic opacity-70">&amp;</span>}
            </span>
          ))}
        </span>
        <span className={cn("label-caps mt-1 block text-[0.5625rem] tracking-[0.2em]", dark ? "text-ink-muted" : "text-cream-50/60")}>
          {brand.parent}
        </span>
      </span>
    </Link>
  );
}
