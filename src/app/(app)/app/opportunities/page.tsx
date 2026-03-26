import { auth } from "@clerk/nextjs/server";
import { AppHeader } from "@/components/shell/app-header";
import { OpportunitiesFilters } from "@/components/opportunities/opportunities-filters";
import { getOpportunities } from "@/lib/api/opportunities";
import {
  parseOpportunitiesParams,
  type OpportunitiesSearchParams,
} from "@/lib/opportunities/query";
import { formatCurrency, formatDateTime } from "@/lib/format";
import { opportunityStatusLabels } from "@/config/opportunities";

type OpportunitiesPageProps = {
  searchParams?: Promise<OpportunitiesSearchParams>;
};

export default async function OpportunitiesPage({
  searchParams,
}: OpportunitiesPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const params = parseOpportunitiesParams(resolvedSearchParams);

  const { getToken } = await auth();
  const token = await getToken();

  if (!token) {
    throw new Error("Missing Clerk session token for opportunities request.");
  }

  const opportunities = await getOpportunities(token, params);

  return (
    <>
      <AppHeader
        title="Opportunities"
        description="Track quotes and proposals without burying yourself in CRM-style complexity."
      />

      <main className="flex-1 px-6 py-6">
        <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
              <div>
                <h2 className="text-lg font-semibold tracking-tight text-neutral-950">
                  All opportunities
                </h2>
                <p className="mt-1 text-sm text-neutral-600">
                  A focused view of active quotes, replies, and follow-up timing.
                </p>
              </div>

              <OpportunitiesFilters
                activeView={params.view ?? "all"}
                activeStatus={params.status}
              />
            </div>

            <div className="space-y-4">
              {opportunities.map((opportunity) => (
                <article
                  key={opportunity.id}
                  className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-base font-semibold tracking-tight text-neutral-950">
                          {opportunity.title}
                        </h3>
                        <span className="rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-xs font-medium text-neutral-700">
                          {opportunityStatusLabels[opportunity.status]}
                        </span>
                      </div>

                      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-neutral-600">
                        <span>{opportunity.companyName ?? "No company"}</span>
                        {opportunity.contactName ? (
                          <span>Contact: {opportunity.contactName}</span>
                        ) : null}
                        {opportunity.contactEmail ? (
                          <span>{opportunity.contactEmail}</span>
                        ) : null}
                      </div>

                      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-neutral-500">
                        {opportunity.quoteSentAt ? (
                          <span>
                            Quote sent: {formatDateTime(opportunity.quoteSentAt)}
                          </span>
                        ) : (
                          <span>Quote not sent yet</span>
                        )}

                        {opportunity.nextFollowUpAt ? (
                          <span>
                            Next follow-up:{" "}
                            {formatDateTime(opportunity.nextFollowUpAt)}
                          </span>
                        ) : null}

                        <span>Updated: {formatDateTime(opportunity.updatedAt)}</span>
                      </div>
                    </div>

                    <div className="shrink-0">
                      <p className="text-right text-lg font-semibold tracking-tight text-neutral-950">
                        {formatCurrency(
                          opportunity.valueAmount,
                          opportunity.currency,
                        )}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
