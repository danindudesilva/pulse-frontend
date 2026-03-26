import { AppLogo } from "@/components/shell/app-logo";
import { SidebarNav } from "@/components/shell/sidebar-nav";

export function AppSidebar() {
  return (
    <aside className="hidden w-72 shrink-0 border-r border-[var(--border)] bg-[var(--surface)] lg:flex lg:flex-col">
      <div className="flex min-h-28 items-center border-b border-[var(--border)] px-6">
        <AppLogo />
      </div>

      <div className="flex flex-1 flex-col px-4 py-6">
        <SidebarNav />

        <div className="mt-auto rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm">
          <p className="text-sm font-medium text-neutral-900">
            Calm pipeline visibility
          </p>
          <p className="mt-1 text-sm leading-6 text-neutral-600">
            Stay on top of sent quotes and follow-ups without CRM overload.
          </p>
        </div>
      </div>
    </aside>
  );
}
