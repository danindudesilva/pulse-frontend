import { z } from "zod";

const today = new Date();
today.setHours(0, 0, 0, 0);

function isValidDateInput(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const date = new Date(`${value}T00:00:00`);

  return !Number.isNaN(date.getTime());
}

function isFutureDateInput(value: string) {
  const date = new Date(`${value}T00:00:00`);
  date.setHours(0, 0, 0, 0);

  return date.getTime() > today.getTime();
}

export const createOpportunityFormSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1, "Title is required")
      .max(200, "Title is too long"),
    companyName: z.string().trim(),
    contactName: z.string().trim(),
    contactEmail: z
      .string()
      .trim()
      .refine(
        (value) => value.length === 0 || z.email().safeParse(value).success,
        "Please enter a valid email address"
      ),
    valueAmount: z
      .string()
      .trim()
      .refine(
        (value) => value.length === 0 || /^(\d+)(\.\d{1,2})?$/.test(value),
        "Please enter a valid amount"
      ),
    currency: z
      .string()
      .trim()
      .refine(
        (value) => value.length === 0 || value.length === 3,
        "Please enter a 3-letter currency code"
      ),
    notes: z.string().trim(),
    status: z.enum(["draft", "sent"]),
    quoteSentAt: z.string().trim().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.status !== "sent" && data.quoteSentAt?.trim()) {
      ctx.addIssue({
        code: "custom",
        path: ["quoteSentAt"],
        message: "Quote sent date is only allowed when status is sent",
      });
    }

    if (data.status === "sent" && !data.quoteSentAt?.trim()) {
      ctx.addIssue({
        code: "custom",
        path: ["quoteSentAt"],
        message: "Quote sent date is required when status is sent",
      });
    }

    if (data.status === "sent" && data.quoteSentAt?.trim()) {
      const value = data.quoteSentAt.trim();

      if (!isValidDateInput(value)) {
        ctx.addIssue({
          code: "custom",
          path: ["quoteSentAt"],
          message: "Please enter a valid date",
        });
        return;
      }

      if (isFutureDateInput(value)) {
        ctx.addIssue({
          code: "custom",
          path: ["quoteSentAt"],
          message: "Quote sent date cannot be in the future",
        });
      }
    }

    if (data.companyName.length > 0 && data.companyName.length > 200) {
      ctx.addIssue({
        code: "custom",
        path: ["companyName"],
        message: "Company name is too long",
      });
    }

    if (data.contactName.length > 0 && data.contactName.length > 120) {
      ctx.addIssue({
        code: "custom",
        path: ["contactName"],
        message: "Contact name is too long",
      });
    }

    if (data.notes.length > 0 && data.notes.length > 5000) {
      ctx.addIssue({
        code: "custom",
        path: ["notes"],
        message: "Notes are too long",
      });
    }
  });

export type CreateOpportunityFormInput = z.input<
  typeof createOpportunityFormSchema
>;
