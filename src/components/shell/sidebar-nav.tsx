"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { appNavigation } from "@/config/navigation";
import { cn } from "@/lib/utils";
import { navItemVariants } from "@/components/shell/nav-item-variants";

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      {appNavigation.map((item) => {
        const Icon = item.icon;
        const isActive =
          item.href === "/app"
            ? pathname === item.href
            : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(navItemVariants({ active: isActive }))}
          >
            <Icon
              className={cn(
                "h-4 w-4",
                isActive ? "text-white" : "text-current",
              )}
            />
            <span className={cn(isActive ? "text-white" : "text-current")}>
              {item.title}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
