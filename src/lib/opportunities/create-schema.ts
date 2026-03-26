import { z } from "zod";

const optionalTrimmedString = z.string().trim();
const optionalNullableString = z
  .string()
  .trim()
  .transform((value) => (value.length === 0 ? null : value));

const optionalEmailString = z
  .string()
  .trim()
  .refine(
    (value) => value.length === 0 || z.email().safeParse(value).success,
    "Enter a valid email address"
  )
  .transform((value) => (value.length === 0 ? null : value));

const optionalMoneyString = z
  .string()
  .trim()
  .refine(
    (value) => value.length === 0 || /^(\d+)(\.\d{1,2})?$/.test(value),
    "Enter a valid amount"
  )
  .transform((value) => (value.length === 0 ? null : value));

export const createOpportunityFormSchema = z
  .object({
    title: z.string().trim().min(1, "Title is required"),
    companyName: optionalTrimmedString,
    contactName: optionalTrimmedString,
    contactEmail: z
      .string()
      .trim()
      .refine(
        (value) => value.length === 0 || z.email().safeParse(value).success,
        "Enter a valid email address"
      ),
    valueAmount: z
      .string()
      .trim()
      .refine(
        (value) => value.length === 0 || /^(\d+)(\.\d{1,2})?$/.test(value),
        "Enter a valid amount"
      ),
    currency: z.string().trim(),
    notes: optionalTrimmedString,
    status: z.enum(["draft", "sent"]),
    quoteSentAt: z.string().trim().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.status === "sent" && !data.quoteSentAt?.trim()) {
      ctx.addIssue({
        code: "custom",
        path: ["quoteSentAt"],
        message: "Quote sent date is required when status is sent",
      });
    }
  });

export const createOpportunityPayloadSchema =
  createOpportunityFormSchema.transform((values) => ({
    title: values.title,
    companyName: values.companyName.trim() || null,
    contactName: values.contactName.trim() || null,
    contactEmail: values.contactEmail.trim() || null,
    valueAmount: values.valueAmount.trim() || null,
    currency: values.currency.trim() || null,
    notes: values.notes.trim() || null,
    status: values.status,
    ...(values.quoteSentAt?.trim()
      ? { quoteSentAt: values.quoteSentAt.trim() }
      : {}),
  }));

export type CreateOpportunityFormInput = z.input<
  typeof createOpportunityFormSchema
>;
export type CreateOpportunityPayload = z.output<
  typeof createOpportunityPayloadSchema
>;
