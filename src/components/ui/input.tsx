import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-12 w-full min-w-0 rounded-xl border border-input bg-white px-4 text-base text-ink shadow-[0_1px_2px_rgba(20,42,29,0.04)] transition-[border-color,box-shadow] outline-none placeholder:text-ink-muted/70 focus-visible:border-gold-500 focus-visible:ring-4 focus-visible:ring-gold-200/60 aria-invalid:border-destructive disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
