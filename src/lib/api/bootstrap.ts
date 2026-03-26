import { apiRequest } from "@/lib/api/client";

export type BootstrapResponse = {
  user: {
    id: string;
  };
  workspace: {
    id: string;
  };
};

export async function bootstrapBackendIdentity(
  token: string
): Promise<BootstrapResponse> {
  return apiRequest<BootstrapResponse>("/api/auth/bootstrap", {
    method: "POST",
    token,
  });
}
