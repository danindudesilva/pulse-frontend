import { apiRequest } from "@/lib/api/client";

export type OpportunityStatus =
  | "draft"
  | "sent"
  | "replied"
  | "won"
  | "lost"
  | "paused";

export type OpportunityListView = "all" | "due" | "upcoming";

export type Opportunity = {
  id: string;
  workspaceId: string;
  createdByUserId: string;
  title: string;
  companyName: string | null;
  contactName: string | null;
  contactEmail: string | null;
  valueAmount: string | null;
  currency: string | null;
  notes: string | null;
  status: OpportunityStatus;
  quoteSentAt: string | null;
  nextFollowUpAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type OpportunitiesPagination = {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};

export type PaginatedOpportunitiesResponse = {
  items: Opportunity[];
  pagination: OpportunitiesPagination;
};

export type GetOpportunitiesParams = {
  page?: number;
  pageSize?: number;
  view?: OpportunityListView;
  status?: OpportunityStatus;
};

function buildOpportunitiesQuery(params: GetOpportunitiesParams): string {
  const searchParams = new URLSearchParams();

  if (params.page && params.page > 1) {
    searchParams.set("page", String(params.page));
  }

  if (params.pageSize) {
    searchParams.set("pageSize", String(params.pageSize));
  }

  if (params.view && params.view !== "all") {
    searchParams.set("view", params.view);
  }

  if (params.status) {
    searchParams.set("status", params.status);
  }

  const query = searchParams.toString();
  return query.length > 0 ? `?${query}` : "";
}

export async function getOpportunities(
  token: string,
  params: GetOpportunitiesParams = {}
): Promise<PaginatedOpportunitiesResponse> {
  const query = buildOpportunitiesQuery(params);

  return apiRequest<PaginatedOpportunitiesResponse>(
    `/api/opportunities${query}`,
    {
      method: "GET",
      token,
    }
  );
}
