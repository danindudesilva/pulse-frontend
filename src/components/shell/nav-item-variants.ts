import { cva } from "class-variance-authority";

export const navItemVariants = cva(
  "flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition",
  {
    variants: {
      active: {
        true: "bg-neutral-950 text-white hover:bg-neutral-900",
        false: "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950",
      },
    },
    defaultVariants: {
      active: false,
    },
  }
);
