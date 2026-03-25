import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap rounded-full",
    "text-sm font-medium no-underline transition",
    "focus-visible:outline-none focus-visible:ring-2",
    "focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
  ].join(" "),
  {
    variants: {
      variant: {
        primary: [
          "bg-neutral-950 hover:bg-neutral-800",
          "!text-white hover:!text-white visited:!text-white",
        ].join(" "),
        secondary: [
          "border border-neutral-200 bg-white hover:bg-neutral-50",
          "!text-neutral-900 hover:!text-neutral-900 visited:!text-neutral-900",
        ].join(" "),
        ghost: [
          "hover:bg-neutral-100",
          "!text-neutral-700 hover:!text-neutral-950 visited:!text-neutral-700",
        ].join(" "),
      },
      size: {
        sm: "px-4 py-2",
        md: "px-5 py-2.5",
        lg: "px-5 py-3",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
