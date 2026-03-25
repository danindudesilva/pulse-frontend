import type { LucideIcon } from "lucide-react";
import { LayoutDashboard, BriefcaseBusiness } from "lucide-react";

export type AppNavItem = {
  title: string;
  href: string;
  icon: LucideIcon;
};

export const appNavigation: AppNavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Opportunities",
    href: "/opportunities",
    icon: BriefcaseBusiness,
  },
];
