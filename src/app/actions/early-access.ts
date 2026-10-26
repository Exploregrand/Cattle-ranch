"use server";

import { registrationSchema, saveRegistration } from "@/lib/early-access";

export type EarlyAccessState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<string, string>>;
  values?: Record<string, string | string[]>;
};

export async function registerEarlyAccess(
  _prev: EarlyAccessState,
  formData: FormData,
): Promise<EarlyAccessState> {
  const values = {
    fullName: String(formData.get("fullName") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    email: String(formData.get("email") ?? ""),
    location: String(formData.get("location") ?? ""),
    interests: formData.getAll("interests").map(String),
    message: String(formData.get("message") ?? ""),
  };
  const parsed = registrationSchema.safeParse({ ...values, consent: formData.get("consent") === "on" });

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0]);
      fieldErrors[key] ??= issue.message;
    }
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors, values };
  }

  try {
    await saveRegistration(parsed.data);
  } catch (error) {
    console.error("Early access registration failed", error);
    return {
      status: "error",
      message: "We couldn't save your registration right now. Please try again shortly.",
      values,
    };
  }
  return { status: "success" };
}
