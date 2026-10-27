import Link from "next/link";

import { cn } from "@/lib/utils";

/** Branding-iron mark: a horned T inside a ring. */
export function BrandMark({ size = 36, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true" className={className}>
      <circle cx="24" cy="24" r="21" stroke="currentColor" strokeWidth="3" />
      <path d="M24 21c-6.5 0-11.5-2.2-11.5-7.6 0-2 1.6-3 3.2-2" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M24 21c6.5 0 11.5-2.2 11.5-7.6 0-2-1.6-3-3.2-2" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M24 21v15" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
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
    <Link href={href} aria-label="Tangama Livestock — home" className={cn("inline-flex items-center gap-2.5", className)}>
      <BrandMark size={compact ? 30 : 36} className={dark ? "text-forest-950" : "text-cream-50"} />
      <span className="leading-none">
        <span className={cn("block font-display text-[1.35rem] font-semibold tracking-[-0.02em]", dark ? "text-forest-950" : "text-cream-50")}>
          Tangama
        </span>
        <span className={cn("label-caps mt-1 block text-[0.66rem] tracking-[0.32em]", dark ? "text-clay" : "text-gold-400")}>
          Livestock
        </span>
      </span>
    </Link>
  );
}
