import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * One button system for the whole product: squared corners, condensed caps,
 * charcoal primary. Pills read as consumer-app; these read as an established company.
 */
const buttonVariants = cva(
  "label-caps inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-md text-[0.8125rem] font-semibold transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-forest-900 text-cream-50 hover:bg-forest-950",
        outline: "border border-forest-950/80 bg-transparent text-forest-950 hover:bg-forest-950 hover:text-cream-50",
        light: "bg-cream-50 text-forest-950 hover:bg-white",
        "outline-light": "border border-cream-50/60 text-cream-50 hover:bg-cream-50 hover:text-forest-950",
        ghost: "text-forest-950 hover:bg-cream-100",
        gold: "bg-forest-900 text-cream-50 hover:bg-forest-950",
        link: "h-auto px-0 text-forest-950 underline underline-offset-4",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4 text-[0.8125rem]",
        lg: "h-13 px-8",
        icon: "size-11",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";
  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
