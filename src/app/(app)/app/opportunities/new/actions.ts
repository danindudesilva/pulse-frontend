"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { apiRequest } from "@/lib/api/client";
import { ApiError } from "@/lib/api/errors";
import {
  createOpportunityFormSchema,
  type CreateOpportunityFormInput,
} from "@/lib/opportunities/create-schema";
import { toCreateOpportunityPayload } from "@/lib/opportunities/create-payload";

export type CreateOpportunityActionState = {
  formError?: string;
  fieldErrors?: Record<string, string[] | undefined>;
  values?: CreateOpportunityFormInput;
};

function getString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

export async function createOpportunityAction(
  _prevState: CreateOpportunityActionState,
  formData: FormData
): Promise<CreateOpportunityActionState> {
  const { getToken } = await auth();
  const token = await getToken();

  const values: CreateOpportunityFormInput = {
    title: getString(formData, "title"),
    companyName: getString(formData, "companyName"),
    contactName: getString(formData, "contactName"),
    contactEmail: getString(formData, "contactEmail"),
    valueAmount: getString(formData, "valueAmount"),
    currency: getString(formData, "currency"),
    notes: getString(formData, "notes"),
    status:
      (getString(formData, "status") as CreateOpportunityFormInput["status"]) ||
      "draft",
    quoteSentAt: getString(formData, "quoteSentAt") || undefined,
  };

  if (!token) {
    return {
      formError: "You must be signed in to create an opportunity.",
      values,
    };
  }

  const parsed = createOpportunityFormSchema.safeParse(values);

  if (!parsed.success) {
    return {
      fieldErrors: parsed.error.flatten().fieldErrors,
      formError: "Please correct the highlighted fields.",
      values,
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
      const fieldErrors =
        typeof error.body === "object" &&
        error.body !== null &&
        "error" in error.body &&
        typeof (
          error.body as { error?: { details?: { fieldErrors?: unknown } } }
        ).error?.details?.fieldErrors === "object"
          ? (
              error.body as {
                error?: {
                  details?: { fieldErrors?: Record<string, string[]> };
                };
              }
            ).error?.details?.fieldErrors ?? undefined
          : undefined;

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
        fieldErrors,
        values,
      };
    }

    return {
      formError: "An unexpected error occurred while creating the opportunity.",
      values,
    };
  }

  revalidatePath("/app");
  revalidatePath("/app/opportunities");
  redirect("/app/opportunities");
}
