"use server";

import { investorSchema, saveInvestorInterest } from "@/lib/investor-interest";

export type InvestorState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<string, string>>;
  values?: Record<string, string>;
};

export async function registerInvestorInterest(_prev: InvestorState, formData: FormData): Promise<InvestorState> {
  const values = Object.fromEntries(
    ["fullName", "phone", "email", "county", "investorType", "route", "ticket", "message"].map((k) => [k, String(formData.get(k) ?? "")]),
  );
  const parsed = investorSchema.safeParse({
    ...values,
    acknowledgedNoOffer: formData.get("acknowledgedNoOffer") === "on",
    consent: formData.get("consent") === "on",
  });
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) fieldErrors[String(issue.path[0])] ??= issue.message;
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors, values };
  }
  try {
    await saveInvestorInterest(parsed.data);
  } catch (error) {
    console.error("Investor interest failed", error);
    return { status: "error", message: "We couldn't save your details right now. Please try again shortly.", values };
  }
  return { status: "success" };
}
