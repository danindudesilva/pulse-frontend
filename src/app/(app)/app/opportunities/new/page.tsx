import { AppHeader } from "@/components/shell/app-header";
import { CreateOpportunityFormShell } from "@/components/opportunities/create-opportunity-form-shell";

export default function NewOpportunityPage() {
  return (
    <>
      <AppHeader
        title="New opportunity"
        description="Capture a quote or proposal cleanly so Pulse can help you follow up on time."
      />

      <main className="flex-1 px-6 py-6">
        <section className="max-w-4xl rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
          <div className="mb-8">
            <h2 className="text-lg font-semibold tracking-tight text-neutral-950">
              Create opportunity
            </h2>
            <p className="mt-1 text-sm text-neutral-600">
              Keep it lightweight. Add only what helps you track momentum and follow up well.
            </p>
          </div>

          <CreateOpportunityFormShell />
        </section>
      </main>
    </>
  );
}
