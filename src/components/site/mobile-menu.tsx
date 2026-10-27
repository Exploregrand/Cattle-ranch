"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { Wordmark } from "@/components/brand/wordmark";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/#animals", label: "Animals" },
  { href: "/#care", label: "Care" },
  { href: "/#farm", label: "The farm" },
  { href: "/#qurbani", label: "Qurbani" },
  { href: "/investors", label: "Investors" },
  { href: "/sign-in", label: "Sign in" },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(true)}
        className="inline-flex size-11 items-center justify-center rounded-full text-forest-950 hover:bg-cream-100"
      >
        <Menu className="size-5" />
      </button>

      {open && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-50 flex flex-col bg-forest-900 px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-4 text-cream-50 animate-in fade-in duration-200"
        >
          <div className="flex h-14 items-center justify-between">
            <Wordmark tone="light" />
            <button
              ref={closeRef}
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="inline-flex size-11 items-center justify-center rounded-full hover:bg-cream-50/10"
            >
              <X className="size-5" />
            </button>
          </div>
          <nav aria-label="Mobile" className="mt-10 flex flex-col">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-cream-50/10 py-5 font-display text-3xl tracking-tight text-cream-50"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto">
            <Button asChild size="lg" className="label-caps h-14 w-full bg-clay text-[1.05rem] text-cream-50 hover:bg-gold-400 hover:text-forest-950">
              <Link href="/early-access" onClick={() => setOpen(false)}>
                Register interest
              </Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
