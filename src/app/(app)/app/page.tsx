import Link from "next/link";
import { AppHeader } from "@/components/shell/app-header";
import { Button } from "@/components/ui/button";

const summaryCards = [
  { label: "Due today", value: "0" },
  { label: "Upcoming", value: "0" },
  { label: "Sent", value: "0" },
  { label: "Replied", value: "0" },
];

export default function DashboardPage() {
  return (
    <>
      <AppHeader
        title="Dashboard"
        description="A clear view of follow-ups that need attention and opportunities in motion."
      />

      <main className="flex-1 px-6 py-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {summaryCards.map((card) => (
            <section
              key={card.label}
              className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm"
            >
              <p className="text-sm font-medium text-neutral-500">{card.label}</p>
              <p className="mt-3 text-3xl font-semibold tracking-tight text-neutral-950">
                {card.value}
              </p>
            </section>
          ))}
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold tracking-tight text-neutral-950">
                  Needs attention
                </h2>
                <p className="mt-1 text-sm text-neutral-600">
                  Follow-ups due soon will appear here.
                </p>
              </div>

              <Button asChild variant="secondary" size="sm">
                <Link href="/app/opportunities">View all</Link>
              </Button>
            </div>

            <div className="mt-10 rounded-2xl border border-dashed border-neutral-200 px-6 py-12 text-center">
              <p className="text-sm font-medium text-neutral-900">
                No follow-ups yet
              </p>
              <p className="mt-2 text-sm text-neutral-600">
                Once opportunities are created, due and upcoming follow-ups will
                show here.
              </p>
            </div>
          </section>

          <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
            <h2 className="text-lg font-semibold tracking-tight text-neutral-950">
              Start clean
            </h2>
            <p className="mt-2 text-sm leading-6 text-neutral-600">
              Keep Pulse focused: track active quotes, follow up on time, and
              avoid turning it into a cluttered CRM.
            </p>

            <div className="mt-6">
              <Button asChild variant="primary" size="md">
                <Link href="/app/opportunities">Open opportunities</Link>
              </Button>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
