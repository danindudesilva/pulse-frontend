import {
  createOpportunityPayloadSchema,
  type CreateOpportunityFormInput,
  type CreateOpportunityPayload,
} from "@/lib/opportunities/create-schema";

export function toCreateOpportunityPayload(
  values: CreateOpportunityFormInput
): CreateOpportunityPayload {
  return createOpportunityPayloadSchema.parse(values);
}
