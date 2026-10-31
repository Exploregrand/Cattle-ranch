import Link from "next/link";

import { brand } from "@/content/brand";
import { cn } from "@/lib/utils";

/** Branding-iron mark: horns over an H, inside a ring. */
export function BrandMark({ size = 36, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true" className={className}>
      <circle cx="24" cy="24" r="21" stroke="currentColor" strokeWidth="3" />
      <path d="M18 18c-4.2-.6-6.5-2.8-6.5-6.4 0-1.9 1.5-2.9 3.1-2" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M30 18c4.2-.6 6.5-2.8 6.5-6.4 0-1.9-1.5-2.9-3.1-2" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M18 17v18M30 17v18M18 26h12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
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
    <Link href={href} aria-label={`${brand.name} — home`} className={cn("inline-flex items-center gap-2.5", className)}>
      <BrandMark size={compact ? 30 : 36} className={dark ? "text-forest-950" : "text-cream-50"} />
      <span className="leading-none">
        <span className={cn("block font-display text-[1.375rem] font-medium tracking-[-0.015em]", dark ? "text-forest-950" : "text-cream-50")}>
          {brand.name}
        </span>
        <span className={cn("label-caps mt-1 block text-[0.5625rem] tracking-[0.2em]", dark ? "text-ink-muted" : "text-cream-50/60")}>
          {brand.parent}
        </span>
      </span>
    </Link>
  );
}
