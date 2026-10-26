import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.72rem] font-medium tracking-wide whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "bg-forest-100 text-forest-800",
        soon: "bg-cream-200 text-ink-soft",
        gold: "bg-gold-200/70 text-forest-950",
        live: "bg-forest-800 text-cream-50",
        outline: "border border-border text-ink-soft",
        dark: "bg-cream-50/10 text-cream-100 ring-1 ring-cream-50/15",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
