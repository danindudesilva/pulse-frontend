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

export const DEFAULT_OPPORTUNITIES_PAGE = 1;
export const DEFAULT_OPPORTUNITIES_PAGE_SIZE = 20;

function readFirstParam(
  value: string | string[] | undefined
): string | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

function parsePositiveInteger(
  value: string | undefined,
  fallback: number
): number {
  if (!value) {
    return fallback;
  }

  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed < 1) {
    return fallback;
  }

  return parsed;
}

export function parseOpportunitiesParams(
  searchParams: OpportunitiesSearchParams
): GetOpportunitiesParams {
  const rawView = readFirstParam(searchParams.view);
  const rawStatus = readFirstParam(searchParams.status);
  const rawPage = readFirstParam(searchParams.page);
  const rawPageSize = readFirstParam(searchParams.pageSize);

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

  const page = parsePositiveInteger(rawPage, DEFAULT_OPPORTUNITIES_PAGE);
  const pageSize = parsePositiveInteger(
    rawPageSize,
    DEFAULT_OPPORTUNITIES_PAGE_SIZE
  );

  return {
    page,
    pageSize,
    view,
    status,
  };
}

export function buildOpportunitiesHref(params: GetOpportunitiesParams): string {
  const searchParams = new URLSearchParams();

  if (params.page && params.page > 1) {
    searchParams.set("page", String(params.page));
  }

  if (params.pageSize && params.pageSize !== DEFAULT_OPPORTUNITIES_PAGE_SIZE) {
    searchParams.set("pageSize", String(params.pageSize));
  }

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
