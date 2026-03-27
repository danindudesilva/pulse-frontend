import type { CreateOpportunityFormInput } from "@/lib/opportunities/create-schema";

export type CreateOpportunityPayload = {
  title: string;
  status: "draft" | "sent";
  companyName?: string;
  contactName?: string;
  contactEmail?: string;
  valueAmount?: string;
  currency?: string;
  notes?: string;
  quoteSentAt?: string;
};

function toIsoDateTimeFromDateInput(value: string): string {
  const [year, month, day] = value.split("-").map(Number);
  const localDate = new Date(year, month - 1, day, 0, 0, 0, 0);

  return localDate.toISOString();
}

export function toCreateOpportunityPayload(
  values: CreateOpportunityFormInput
): CreateOpportunityPayload {
  return {
    title: values.title.trim(),
    status: values.status,
    ...(values.companyName?.trim()
      ? { companyName: values.companyName.trim() }
      : {}),
    ...(values.contactName?.trim()
      ? { contactName: values.contactName.trim() }
      : {}),
    ...(values.contactEmail?.trim()
      ? { contactEmail: values.contactEmail.trim() }
      : {}),
    ...(values.valueAmount?.trim()
      ? { valueAmount: values.valueAmount.trim() }
      : {}),
    ...(values.currency?.trim()
      ? { currency: values.currency.trim().toUpperCase() }
      : {}),
    ...(values.notes?.trim() ? { notes: values.notes.trim() } : {}),
    ...(values.quoteSentAt?.trim()
      ? { quoteSentAt: toIsoDateTimeFromDateInput(values.quoteSentAt.trim()) }
      : {}),
  };
}
