import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { AppHeader } from "@/components/shell/app-header";
import { Button } from "@/components/ui/button";
import { getDashboardSummary } from "@/lib/api/dashboard";

export default async function DashboardPage() {
  const { getToken } = await auth();
  const token = await getToken();

  if (!token) {
    throw new Error("Missing Clerk session token for dashboard request.");
  }

  const summary = await getDashboardSummary(token);

  const summaryCards = [
    { label: "Due today", value: summary.followUps.due },
    { label: "Upcoming", value: summary.followUps.upcoming },
    { label: "Sent", value: summary.opportunities.sent },
    { label: "Replied", value: summary.opportunities.replied },
  ];

  const hasAnyOpportunities = summary.opportunities.all > 0;

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
                  Follow-ups overview
                </h2>
                <p className="mt-1 text-sm text-neutral-600">
                  See what needs attention now and what is coming up next.
                </p>
              </div>

              <Button asChild variant="secondary" size="sm">
                <Link href="/app/opportunities">View all</Link>
              </Button>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-neutral-200 bg-white p-5">
                <p className="text-sm font-medium text-neutral-500">Due follow-ups</p>
                <p className="mt-3 text-2xl font-semibold tracking-tight text-neutral-950">
                  {summary.followUps.due}
                </p>
                <p className="mt-2 text-sm text-neutral-600">
                  Opportunities that likely need action now.
                </p>
              </div>

              <div className="rounded-2xl border border-neutral-200 bg-white p-5">
                <p className="text-sm font-medium text-neutral-500">Upcoming follow-ups</p>
                <p className="mt-3 text-2xl font-semibold tracking-tight text-neutral-950">
                  {summary.followUps.upcoming}
                </p>
                <p className="mt-2 text-sm text-neutral-600">
                  Opportunities that will need attention soon.
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
            <h2 className="text-lg font-semibold tracking-tight text-neutral-950">
              Pipeline snapshot
            </h2>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <dt className="text-neutral-600">All</dt>
                <dd className="font-medium text-neutral-950">
                  {summary.opportunities.all}
                </dd>
              </div>

              <div className="flex items-center justify-between text-sm">
                <dt className="text-neutral-600">Draft</dt>
                <dd className="font-medium text-neutral-950">
                  {summary.opportunities.draft}
                </dd>
              </div>

              <div className="flex items-center justify-between text-sm">
                <dt className="text-neutral-600">Sent</dt>
                <dd className="font-medium text-neutral-950">
                  {summary.opportunities.sent}
                </dd>
              </div>

              <div className="flex items-center justify-between text-sm">
                <dt className="text-neutral-600">Replied</dt>
                <dd className="font-medium text-neutral-950">
                  {summary.opportunities.replied}
                </dd>
              </div>

              <div className="flex items-center justify-between text-sm">
                <dt className="text-neutral-600">Won</dt>
                <dd className="font-medium text-neutral-950">
                  {summary.opportunities.won}
                </dd>
              </div>

              <div className="flex items-center justify-between text-sm">
                <dt className="text-neutral-600">Lost</dt>
                <dd className="font-medium text-neutral-950">
                  {summary.opportunities.lost}
                </dd>
              </div>

              <div className="flex items-center justify-between text-sm">
                <dt className="text-neutral-600">Paused</dt>
                <dd className="font-medium text-neutral-950">
                  {summary.opportunities.paused}
                </dd>
              </div>
            </dl>

            <div className="mt-6">
              <Button asChild variant="primary" size="md">
                <Link href="/app/opportunities">
                  {hasAnyOpportunities ? "Open opportunities" : "Track your first opportunity"}
                </Link>
              </Button>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
