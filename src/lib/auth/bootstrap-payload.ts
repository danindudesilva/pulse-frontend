import type { User } from "@clerk/nextjs/server";

export type BootstrapPayload = {
  email: string;
  name?: string;
};

export function getPrimaryEmailAddress(clerkUser: User | null): string | null {
  if (!clerkUser) {
    return null;
  }

  const primaryEmail =
    clerkUser.emailAddresses.find(
      (email) => email.id === clerkUser.primaryEmailAddressId
    ) ?? clerkUser.emailAddresses[0];

  return primaryEmail?.emailAddress ?? null;
}

export function getDisplayName(clerkUser: User | null): string | undefined {
  if (!clerkUser) {
    return undefined;
  }

  if (clerkUser.fullName && clerkUser.fullName.trim().length > 0) {
    return clerkUser.fullName;
  }

  const parts = [clerkUser.firstName, clerkUser.lastName].filter(Boolean);
  return parts.length > 0 ? parts.join(" ") : undefined;
}

export function buildBootstrapPayload(
  clerkUser: User | null
): BootstrapPayload | null {
  const email = getPrimaryEmailAddress(clerkUser);

  if (!email) {
    return null;
  }

  return {
    email,
    name: getDisplayName(clerkUser),
  };
}
