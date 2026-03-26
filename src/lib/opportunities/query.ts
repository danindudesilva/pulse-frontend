import type {
  GetOpportunitiesParams,
  OpportunityListView,
  OpportunityStatus,
} from "@/lib/api/opportunities";
import {
  opportunityStatusOptions,
  opportunityViewOptions,
} from "@/config/opportunities";

export type OpportunitiesSearchParams = Record<
  string,
  string | string[] | undefined
>;

function readFirstParam(
  value: string | string[] | undefined
): string | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

export function parseOpportunitiesParams(
  searchParams: OpportunitiesSearchParams
): GetOpportunitiesParams {
  const rawView = readFirstParam(searchParams.view);
  const rawStatus = readFirstParam(searchParams.status);

  const allowedViews = new Set<OpportunityListView>(
    opportunityViewOptions.map((option) => option.value)
  );
  const allowedStatuses = new Set<OpportunityStatus>(
    opportunityStatusOptions.map((option) => option.value)
  );

  const view: OpportunityListView =
    rawView && allowedViews.has(rawView as OpportunityListView)
      ? (rawView as OpportunityListView)
      : "all";

  const status =
    rawStatus && allowedStatuses.has(rawStatus as OpportunityStatus)
      ? (rawStatus as OpportunityStatus)
      : undefined;

  return {
    view,
    status,
  };
}

export function buildOpportunitiesHref(params: GetOpportunitiesParams): string {
  const searchParams = new URLSearchParams();

  if (params.view && params.view !== "all") {
    searchParams.set("view", params.view);
  }

  if (params.status) {
    searchParams.set("status", params.status);
  }

  const query = searchParams.toString();
  return query.length > 0
    ? `/app/opportunities?${query}`
    : "/app/opportunities";
}
