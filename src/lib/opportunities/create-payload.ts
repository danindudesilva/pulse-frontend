import type { CreateOpportunityFormValues } from "@/lib/opportunities/create-schema";

export type CreateOpportunityPayload = {
  title: string;
  companyName?: string | null;
  contactName?: string | null;
  contactEmail?: string | null;
  valueAmount?: string | null;
  currency?: string | null;
  notes?: string | null;
  status: "draft" | "sent" | "replied" | "won" | "lost" | "paused";
  quoteSentAt?: string;
};

export function toCreateOpportunityPayload(
  values: CreateOpportunityFormValues
): CreateOpportunityPayload {
  return {
    title: values.title,
    companyName: values.companyName ?? null,
    contactName: values.contactName ?? null,
    contactEmail: values.contactEmail ?? null,
    valueAmount: values.valueAmount ?? null,
    currency: values.currency ?? null,
    notes: values.notes ?? null,
    status: values.status,
    ...(values.quoteSentAt ? { quoteSentAt: values.quoteSentAt } : {}),
  };
}
