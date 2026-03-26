import { apiRequest } from "@/lib/api/client";

export type DashboardSummary = {
  opportunities: {
    all: number;
    draft: number;
    sent: number;
    replied: number;
    won: number;
    lost: number;
    paused: number;
  };
  followUps: {
    due: number;
    upcoming: number;
  };
};

export async function getDashboardSummary(
  token: string
): Promise<DashboardSummary> {
  return apiRequest<DashboardSummary>("/api/dashboard/summary", {
    method: "GET",
    token,
  });
}
