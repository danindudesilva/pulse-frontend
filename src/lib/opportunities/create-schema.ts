import { z } from "zod";

const emptyStringToUndefined = z
  .string()
  .trim()
  .transform((value) => {
    return value.length === 0 ? undefined : value;
  });

const emptyStringToNull = z
  .string()
  .trim()
  .transform((value) => {
    return value.length === 0 ? null : value;
  });

export const createOpportunitySchema = z
  .object({
    title: z.string().trim().min(1, "Title is required"),
    companyName: emptyStringToNull,
    contactName: emptyStringToNull,
    contactEmail: z
      .string()
      .trim()
      .transform((value) => (value.length === 0 ? null : value))
      .refine((value) => value === null || z.email().safeParse(value).success, {
        message: "Enter a valid email address",
      }),
    valueAmount: z
      .string()
      .trim()
      .transform((value) => (value.length === 0 ? null : value))
      .refine(
        (value) => value === null || /^(\d+)(\.\d{1,2})?$/.test(value),
        "Enter a valid amount"
      ),
    currency: emptyStringToNull,
    notes: emptyStringToNull,
    status: z.enum(["draft", "sent", "replied", "won", "lost", "paused"]),
    quoteSentAt: emptyStringToUndefined,
  })
  .superRefine((data, ctx) => {
    if (data.status === "sent" && !data.quoteSentAt) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["quoteSentAt"],
        message: "Quote sent date is required when status is sent",
      });
    }
  });

export type CreateOpportunityFormValues = z.infer<
  typeof createOpportunitySchema
>;
