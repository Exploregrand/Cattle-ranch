import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-28 w-full rounded-xl border border-input bg-white px-4 py-3 text-base text-ink shadow-[0_1px_2px_rgba(20,42,29,0.04)] outline-none transition-[border-color,box-shadow] placeholder:text-ink-muted/70 focus-visible:border-gold-500 focus-visible:ring-4 focus-visible:ring-gold-200/60 aria-invalid:border-destructive",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
