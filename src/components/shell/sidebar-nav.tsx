"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { appNavigation } from "@/config/navigation";
import { cn } from "@/lib/utils";

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
            className={cn(
              "flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition",
              isActive
                ? "bg-neutral-950 text-white hover:bg-neutral-900"
                : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950",
            )}
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
