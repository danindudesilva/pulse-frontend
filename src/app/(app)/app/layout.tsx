import { auth } from "@clerk/nextjs/server";
import { AppShell } from "@/components/shell/app-shell";
import { BootstrapFailureState } from "@/components/app/bootstrap-failure-state";
import { bootstrapBackendIdentity } from "@/lib/api/bootstrap";
import { ApiError } from "@/lib/api/errors";

export default async function ProtectedAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, getToken } = await auth();

  if (!isAuthenticated) {
    return <BootstrapFailureState message="Please sign in to access Pulse." />;
  }

  const token = await getToken();

  if (!token) {
    return (
      <BootstrapFailureState message="We couldn’t obtain your session token for backend initialization." />
    );
  }

  try {
    await bootstrapBackendIdentity(token);
  } catch (error) {
    if (error instanceof ApiError) {
      return (
        <BootstrapFailureState
          message={`Pulse couldn’t initialize your backend account context. Backend responded with status ${error.status}.`}
        />
      );
    }

    return (
      <BootstrapFailureState message="An unexpected error occurred while initializing Pulse." />
    );
  }

  return <AppShell>{children}</AppShell>;
}
