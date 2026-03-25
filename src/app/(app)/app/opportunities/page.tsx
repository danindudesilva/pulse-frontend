import { AppHeader } from "@/components/shell/app-header";

export default function OpportunitiesPage() {
  return (
    <>
      <AppHeader
        title="Opportunities"
        description="Track quotes and proposals without burying yourself in CRM-style complexity."
      />

      <main className="flex-1 px-6 py-6">
        <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-neutral-950">
                All opportunities
              </h2>
              <p className="mt-1 text-sm text-neutral-600">
                Filtering, create flow, and detail pages will land in the next
                PRs.
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-dashed border-neutral-200 px-6 py-16 text-center">
            <p className="text-sm font-medium text-neutral-900">
              No opportunities loaded yet
            </p>
            <p className="mt-2 text-sm text-neutral-600">
              This page will show real data once backend integration is added.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
