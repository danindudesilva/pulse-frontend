import { auth } from "@clerk/nextjs/server";
import { AppHeader } from "@/components/shell/app-header";
import { OpportunitiesEmptyState } from "@/components/opportunities/opportunities-empty-state";
import { OpportunitiesFilters } from "@/components/opportunities/opportunities-filters";
import { OpportunityList } from "@/components/opportunities/opportunity-list";
import { getOpportunities } from "@/lib/api/opportunities";
import {
  parseOpportunitiesParams,
  type OpportunitiesSearchParams,
} from "@/lib/opportunities/query";

import Link from "next/link";
import { Button } from "@/components/ui/button";

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
  const hasFilters = (params.view && params.view !== "all") || !!params.status;

  return (
    <>
      <AppHeader
        title="Opportunities"
        description="Track quotes and proposals without burying yourself in CRM-style complexity."
      />

      <main className="flex-1 px-6 py-6">
        <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between xl:gap-8">
              <div>
                <h2 className="text-lg font-semibold tracking-tight text-neutral-950">
                  All opportunities
                </h2>
                <p className="mt-1 text-sm text-neutral-600">
                  A focused view of active quotes, replies, and follow-up timing.
                </p>
              </div>

              <div className="flex flex-col gap-4 xl:items-end">
                <Button asChild variant="primary" size="sm">
                  <Link href="/app/opportunities/new">New opportunity</Link>
                </Button>

                <div className="w-full min-w-0 xl:max-w-[42rem]">
                  <OpportunitiesFilters
                    activeView={params.view ?? "all"}
                    activeStatus={params.status}
                  />
                </div>
              </div>
            </div>
            <div className="max-w-4xl">
              {opportunities.length === 0 ? (
                <OpportunitiesEmptyState hasFilters={hasFilters} />
              ) : (
                <OpportunityList opportunities={opportunities} />
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
