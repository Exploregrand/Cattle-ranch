"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Sticky header that tucks away when scrolling down and returns on scroll up.
 * Always visible near the top of the page and while keyboard focus is inside it.
 */
export function SmartHeader({ children }: { children: React.ReactNode }) {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastY.current;
        setScrolled(y > 8);
        if (y < 120 || ref.current?.contains(document.activeElement)) setHidden(false);
        else if (delta > 6) setHidden(true);
        else if (delta < -6) setHidden(false);
        lastY.current = y;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      ref={ref}
      onFocusCapture={() => setHidden(false)}
      className={cn(
        "sticky top-0 z-40 w-full border-b bg-cream-50/95 backdrop-blur transition-[transform,box-shadow,border-color] duration-300 ease-out",
        hidden ? "-translate-y-full" : "translate-y-0",
        scrolled ? "border-border shadow-[0_8px_24px_-18px_rgba(28,27,25,0.35)]" : "border-transparent",
      )}
    >
      {children}
    </header>
  );
}
