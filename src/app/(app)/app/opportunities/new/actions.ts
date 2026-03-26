"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { ApiError } from "@/lib/api/errors";
import { apiRequest } from "@/lib/api/client";
import { createOpportunitySchema } from "@/lib/opportunities/create-schema";
import { toCreateOpportunityPayload } from "@/lib/opportunities/create-payload";

export type CreateOpportunityActionState = {
  formError?: string;
  fieldErrors?: Record<string, string[] | undefined>;
};

export async function createOpportunityAction(
  _prevState: CreateOpportunityActionState,
  formData: FormData
): Promise<CreateOpportunityActionState> {
  const { getToken } = await auth();
  const token = await getToken();

  if (!token) {
    return {
      formError: "You must be signed in to create an opportunity.",
    };
  }

  const parsed = createOpportunitySchema.safeParse({
    title: formData.get("title"),
    companyName: formData.get("companyName"),
    contactName: formData.get("contactName"),
    contactEmail: formData.get("contactEmail"),
    valueAmount: formData.get("valueAmount"),
    currency: formData.get("currency"),
    notes: formData.get("notes"),
    status: formData.get("status"),
    quoteSentAt: formData.get("quoteSentAt"),
  });

  if (!parsed.success) {
    return {
      fieldErrors: parsed.error.flatten().fieldErrors,
      formError: "Please correct the highlighted fields.",
    };
  }

  try {
    await apiRequest("/api/opportunities", {
      method: "POST",
      token,
      body: toCreateOpportunityPayload(parsed.data),
    });
  } catch (error) {
    if (error instanceof ApiError) {
      const message =
        typeof error.body === "object" &&
        error.body !== null &&
        "error" in error.body &&
        typeof (error.body as { error?: { message?: unknown } }).error
          ?.message === "string"
          ? (error.body as { error: { message: string } }).error.message
          : "We couldn’t create the opportunity. Please try again.";

      return {
        formError: message,
      };
    }

    return {
      formError: "An unexpected error occurred while creating the opportunity.",
    };
  }

  revalidatePath("/app");
  revalidatePath("/app/opportunities");
  redirect("/app/opportunities");
}
