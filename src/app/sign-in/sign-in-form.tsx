"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { MailCheck } from "lucide-react";

import { requestSignInLink, type SignInState } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SignInForm() {
  const searchParams = useSearchParams();
  const [state, formAction, pending] = useActionState<SignInState, FormData>(requestSignInLink, { status: "idle" });
  const linkError = searchParams.get("error") === "link";

  if (state.status === "sent") {
    return (
      <div role="status" className="rounded-2xl bg-forest-100 p-5 text-forest-900">
        <MailCheck className="size-5" aria-hidden="true" />
        <p className="mt-3 font-medium">Check your email</p>
        <p className="mt-1 text-sm leading-relaxed text-forest-900/80">
          If an account exists for that address, a sign-in link is on its way.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4" noValidate>
      <input type="hidden" name="next" value={searchParams.get("next") ?? "/dashboard"} />
      <div className="space-y-2">
        <Label htmlFor="email">Email address</Label>
        <Input id="email" name="email" type="email" autoComplete="email" inputMode="email" required />
      </div>
      {(state.status === "error" || linkError) && (
        <p role="alert" className="text-sm text-destructive">
          {state.message ?? "That sign-in link has expired. Request a new one."}
        </p>
      )}
      <Button type="submit" size="lg" className="w-full" disabled={pending}>
        {pending ? "Sending…" : "Email me a sign-in link"}
      </Button>
    </form>
  );
}
