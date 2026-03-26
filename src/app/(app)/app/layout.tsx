import { auth, currentUser } from "@clerk/nextjs/server";
import { AppShell } from "@/components/shell/app-shell";
import { BootstrapFailureState } from "@/components/app/bootstrap-failure-state";
import { bootstrapBackendIdentity } from "@/lib/api/bootstrap";
import { buildBootstrapPayload } from "@/lib/auth/bootstrap-payload";
import { ApiError } from "@/lib/api/errors";

export default async function ProtectedAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, getToken } = await auth();

  if (!isAuthenticated) {
    return <BootstrapFailureState message="You need to sign in to access Pulse." />;
  }

  const [token, clerkUser] = await Promise.all([getToken(), currentUser()]);

  if (!token || token.trim().length === 0) {
    return (
      <BootstrapFailureState message="We couldn’t obtain your session token for backend initialization." />
    );
  }

  if (!clerkUser) {
    return (
      <BootstrapFailureState message="We couldn’t load your signed-in Clerk profile." />
    );
  }

  const payload = buildBootstrapPayload(clerkUser);

  if (!payload) {
    return (
      <BootstrapFailureState message="We couldn’t determine your primary email address from Clerk." />
    );
  }

  try {
    await bootstrapBackendIdentity(token, payload);
  } catch (error) {
    if (error instanceof ApiError) {
      console.error("Bootstrap API error", {
        status: error.status,
        body: error.body,
      });

      const details =
        typeof error.body === "string"
          ? error.body
          : error.body
            ? JSON.stringify(error.body, null, 2)
            : "No response body";

      return (
        <BootstrapFailureState
          message={`Pulse couldn’t initialize your backend account context. Backend responded with status ${error.status}. Details: ${details}`}
        />
      );
    }

    console.error("Unexpected bootstrap error", error);

    return (
      <BootstrapFailureState message="An unexpected error occurred while initializing Pulse." />
    );
  }

  return <AppShell>{children}</AppShell>;
}
