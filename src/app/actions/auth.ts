"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export type SignInState = { status: "idle" | "sent" | "error"; message?: string };

/** Only allow same-site relative redirects after sign-in. */
function safeNext(value: FormDataEntryValue | null) {
  const next = typeof value === "string" ? value : "";
  return /^\/(dashboard|admin)(\/|$)/.test(next) ? next : "/dashboard";
}

export async function requestSignInLink(_prev: SignInState, formData: FormData): Promise<SignInState> {
  const email = z.email().safeParse(String(formData.get("email") ?? "").trim());
  if (!email.success) return { status: "error", message: "Enter a valid email address." };

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return { status: "error", message: "Customer accounts are not connected yet." };
  }

  const origin = (await headers()).get("origin") ?? "";
  const next = safeNext(formData.get("next"));
  const { error } = await supabase.auth.signInWithOtp({
    email: email.data,
    options: {
      // Accounts are created by Tangama when a customer is onboarded, never by self sign-up.
      shouldCreateUser: false,
      emailRedirectTo: `${origin}/auth/callback?next=${encodeURIComponent(next)}`,
    },
  });

  // Same response whether or not the account exists, so emails can't be probed.
  if (error && error.status !== 400 && error.status !== 422) {
    return { status: "error", message: "We couldn't send a link right now. Please try again." };
  }
  return { status: "sent" };
}

export async function signOut() {
  const supabase = await createSupabaseServerClient();
  await supabase?.auth.signOut();
  redirect("/");
}
