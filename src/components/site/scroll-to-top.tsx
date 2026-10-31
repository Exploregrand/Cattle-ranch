"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Start every new page at the top. Next's own scroll reset can be skipped when the
 * first element of a page is sticky (our header), so we enforce it on route change.
 * Links to a #section are left alone so they still land on that section.
 */
export function ScrollToTop() {
  const pathname = usePathname();
  useEffect(() => {
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}
