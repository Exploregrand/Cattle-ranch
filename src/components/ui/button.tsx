import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-[background-color,color,box-shadow,transform] duration-200 disabled:pointer-events-none disabled:opacity-50 active:translate-y-px [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[0_1px_0_rgba(255,255,255,0.08)_inset,0_8px_20px_-12px_rgba(20,42,29,0.7)] hover:bg-forest-700",
        gold: "bg-gold-400 text-forest-950 hover:bg-gold-500 hover:text-cream-50",
        outline:
          "border border-input bg-transparent text-forest-900 hover:bg-cream-100",
        ghost: "text-forest-900 hover:bg-cream-100",
        light:
          "bg-cream-50 text-forest-900 hover:bg-white shadow-[0_8px_24px_-12px_rgba(0,0,0,0.5)]",
        "outline-light":
          "border border-cream-50/40 text-cream-50 hover:bg-cream-50/10",
        link: "text-forest-800 underline-offset-4 hover:underline rounded-none px-0",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-4",
        lg: "h-12 px-7 text-[0.95rem]",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
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
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
