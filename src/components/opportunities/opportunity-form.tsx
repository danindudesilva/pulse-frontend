"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  createOpportunitySchema,
  type CreateOpportunityFormValues,
} from "@/lib/opportunities/create-schema";
import type { CreateOpportunityActionState } from "@/app/(app)/app/opportunities/new/actions";

type OpportunityFormProps = {
  action: (formData: FormData) => void;
  state?: CreateOpportunityActionState;
  isPending?: boolean;
};

const defaultValues: CreateOpportunityFormValues = {
  title: "",
  companyName: null,
  contactName: null,
  contactEmail: null,
  valueAmount: null,
  currency: "GBP",
  notes: null,
  status: "draft",
  quoteSentAt: undefined,
};

export function OpportunityForm({
  action,
  state,
  isPending = false,
}: OpportunityFormProps) {
  const {
    register,
    watch,
    formState: { errors },
    setValue,
  } = useForm<CreateOpportunityFormValues>({
    resolver: zodResolver(createOpportunitySchema),
    defaultValues,
  });

  const status = watch("status");

  useEffect(() => {
    if (status !== "sent") {
      setValue("quoteSentAt", undefined);
    }
  }, [setValue, status]);

  return (
    <form action={action} className="space-y-8">
      <div className="grid gap-6 xl:grid-cols-2">
        <div className="space-y-2 xl:col-span-2">
          <label htmlFor="title" className="text-sm font-medium text-neutral-900">
            Title
          </label>
          <input
            id="title"
            {...register("title")}
            className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-neutral-300"
            placeholder="Website redesign proposal"
          />
          <FieldError message={errors.title?.message} serverError={state?.fieldErrors?.title?.[0]} />
        </div>

        <div className="space-y-2">
          <label htmlFor="companyName" className="text-sm font-medium text-neutral-900">
            Company
          </label>
          <input
            id="companyName"
            {...register("companyName")}
            className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-neutral-300"
            placeholder="Acme Studio"
          />
          <FieldError
            message={errors.companyName?.message}
            serverError={state?.fieldErrors?.companyName?.[0]}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="contactName" className="text-sm font-medium text-neutral-900">
            Contact name
          </label>
          <input
            id="contactName"
            {...register("contactName")}
            className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-neutral-300"
            placeholder="Jane Smith"
          />
          <FieldError
            message={errors.contactName?.message}
            serverError={state?.fieldErrors?.contactName?.[0]}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="contactEmail" className="text-sm font-medium text-neutral-900">
            Contact email
          </label>
          <input
            id="contactEmail"
            type="email"
            {...register("contactEmail")}
            className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-neutral-300"
            placeholder="jane@acme.com"
          />
          <FieldError
            message={errors.contactEmail?.message}
            serverError={state?.fieldErrors?.contactEmail?.[0]}
          />
        </div>

        <div className="grid gap-6 xl:grid-cols-[1fr_10rem] xl:col-span-2">
          <div className="space-y-2">
            <label htmlFor="valueAmount" className="text-sm font-medium text-neutral-900">
              Value
            </label>
            <input
              id="valueAmount"
              {...register("valueAmount")}
              className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-neutral-300"
              placeholder="1500.00"
            />
            <FieldError
              message={errors.valueAmount?.message}
              serverError={state?.fieldErrors?.valueAmount?.[0]}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="currency" className="text-sm font-medium text-neutral-900">
              Currency
            </label>
            <select
              id="currency"
              {...register("currency")}
              className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-neutral-300"
            >
              <option value="">Select</option>
              <option value="GBP">GBP</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
            <FieldError
              message={errors.currency?.message}
              serverError={state?.fieldErrors?.currency?.[0]}
            />
          </div>
        </div>

        <div className="space-y-2 xl:col-span-2">
          <label htmlFor="status" className="text-sm font-medium text-neutral-900">
            Status
          </label>
          <select
            id="status"
            {...register("status")}
            className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-neutral-300"
          >
            <option value="draft">Draft</option>
            <option value="sent">Sent</option>
            <option value="replied">Replied</option>
            <option value="won">Won</option>
            <option value="lost">Lost</option>
            <option value="paused">Paused</option>
          </select>
          <FieldError message={errors.status?.message} serverError={state?.fieldErrors?.status?.[0]} />
        </div>

        {status === "sent" ? (
          <div className="space-y-2 xl:col-span-2">
            <label htmlFor="quoteSentAt" className="text-sm font-medium text-neutral-900">
              Quote sent date
            </label>
            <input
              id="quoteSentAt"
              type="datetime-local"
              {...register("quoteSentAt")}
              className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-neutral-300"
            />
            <FieldError
              message={errors.quoteSentAt?.message}
              serverError={state?.fieldErrors?.quoteSentAt?.[0]}
            />
          </div>
        ) : null}

        <div className="space-y-2 xl:col-span-2">
          <label htmlFor="notes" className="text-sm font-medium text-neutral-900">
            Notes
          </label>
          <textarea
            id="notes"
            {...register("notes")}
            rows={5}
            className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-neutral-300"
            placeholder="Key details, constraints, or context for this opportunity"
          />
          <FieldError message={errors.notes?.message} serverError={state?.fieldErrors?.notes?.[0]} />
        </div>
      </div>

      {state?.formError ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {state.formError}
        </div>
      ) : null}

      <div className="flex items-center gap-3">
        <Button type="submit" variant="primary" size="md" disabled={isPending}>
          {isPending ? "Creating..." : "Create opportunity"}
        </Button>
      </div>
    </form>
  );
}

function FieldError({
  message,
  serverError,
}: {
  message?: string;
  serverError?: string;
}) {
  const finalMessage = message ?? serverError;

  if (!finalMessage) {
    return null;
  }

  return <p className="text-sm text-rose-600">{finalMessage}</p>;
}
