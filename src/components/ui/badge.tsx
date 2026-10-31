import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/** Small squared tags in condensed caps — quiet, like a stamp on a record. */
const badgeVariants = cva(
  "label-caps inline-flex items-center gap-1.5 rounded-[3px] px-2 py-[3px] text-[0.6875rem] font-semibold tracking-[0.12em] whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "bg-forest-100 text-forest-950",
        soon: "bg-cream-200 text-ink-soft",
        gold: "border border-forest-950/25 text-forest-950",
        live: "bg-forest-900 text-cream-50",
        outline: "border border-border text-ink-soft",
        dark: "border border-cream-50/30 text-cream-50",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

function Badge({ className, variant, ...props }: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return <span data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
