"use client";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { appNavigation } from "@/config/navigation";
import { cn } from "@/lib/utils";

export function AppMobileNav() {
  const pathname = usePathname();

  return (
    <div className="border-b border-[var(--border)] bg-[var(--surface)] px-4 py-4 lg:hidden">
      <div className="flex items-center justify-between gap-4">
        <Link href="/app" className="text-base font-semibold tracking-tight text-neutral-950">
          Pulse
        </Link>

        <div className="rounded-full border border-neutral-200 bg-white p-1 shadow-sm">
          <UserButton />
        </div>
      </div>

      <nav className="mt-4 flex flex-wrap gap-2">
        {appNavigation.map((item) => {
          const isActive =
            item.href === "/app"
              ? pathname === item.href
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition",
                isActive
                  ? "bg-neutral-950 text-white"
                  : "border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50",
              )}
            >
              {item.title}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
