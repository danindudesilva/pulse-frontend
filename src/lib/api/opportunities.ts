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

export type GetOpportunitiesParams = {
  view?: OpportunityListView;
  status?: OpportunityStatus;
};

function buildOpportunitiesQuery(params: GetOpportunitiesParams): string {
  const searchParams = new URLSearchParams();

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
): Promise<Opportunity[]> {
  const query = buildOpportunitiesQuery(params);

  return apiRequest<Opportunity[]>(`/api/opportunities${query}`, {
    method: "GET",
    token,
  });
}
