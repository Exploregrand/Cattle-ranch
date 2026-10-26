import Link from "next/link";

import { cn } from "@/lib/utils";

/**
 * Temporary text wordmark. Replace with the approved Cattle Buy logo asset
 * (place it in /public/brand and render it here) once supplied.
 */
export function Wordmark({
  tone = "dark",
  href = "/",
  className,
}: {
  tone?: "dark" | "light";
  href?: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      aria-label="Cattle Buy — home"
      className={cn("group inline-flex items-baseline", className)}
    >
      <span
        className={cn(
          "font-display text-[1.5rem] font-semibold tracking-[-0.03em] leading-none",
          tone === "dark" ? "text-forest-900" : "text-cream-50",
        )}
      >
        Cattle
        <span className={cn("italic font-medium", tone === "dark" ? "text-gold-500" : "text-gold-400")}>
          {" "}Buy
        </span>
      </span>
    </Link>
  );
}
