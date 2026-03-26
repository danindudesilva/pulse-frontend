import { apiRequest } from "@/lib/api/client";
import type { BootstrapPayload } from "@/lib/auth/bootstrap-payload";

export type BootstrapResponse = {
  user: {
    id: string;
    clerkUserId: string;
    email: string;
    name: string | null;
  };
  workspace: {
    id: string;
    name: string;
  };
  membership: {
    role: string;
  };
};

export async function bootstrapBackendIdentity(
  token: string,
  body: BootstrapPayload
): Promise<BootstrapResponse> {
  return apiRequest<BootstrapResponse>("/api/auth/bootstrap", {
    method: "POST",
    token,
    body,
  });
}
