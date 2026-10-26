"use client";

import { useActionState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Check, CircleCheck } from "lucide-react";

import { registerEarlyAccess, type EarlyAccessState } from "@/app/actions/early-access";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { interestOptions } from "@/content/site";
import { cn } from "@/lib/utils";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="text-sm text-destructive">
      {message}
    </p>
  );
}

export function EarlyAccessForm() {
  const searchParams = useSearchParams();
  const [state, formAction, pending] = useActionState<EarlyAccessState, FormData>(registerEarlyAccess, {
    status: "idle",
  });

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-2xl border border-border bg-white p-6 sm:p-8">
        <CircleCheck className="size-8 text-forest-600" aria-hidden="true" />
        <h2 className="mt-4 font-display text-2xl font-medium text-forest-950">Asante — you&apos;re on the list</h2>
        <p className="mt-2 leading-relaxed text-ink-soft">
          We&apos;ll contact you when the programmes you chose are ready to open. There is nothing
          to pay and no commitment.
        </p>
        <Button asChild variant="outline" className="mt-6">
          <Link href="/">Back to the homepage</Link>
        </Button>
      </div>
    );
  }

  const errors = state.fieldErrors ?? {};
  const v = state.values ?? {};
  const preselected = searchParams.get("interest");
  const selected = new Set<string>(
    Array.isArray(v.interests) ? v.interests : preselected ? [preselected] : [],
  );
  const text = (key: string) => (typeof v[key] === "string" ? (v[key] as string) : "");

  return (
    <form action={formAction} noValidate className="space-y-6">
      <fieldset className="space-y-3">
        <legend className="text-sm font-medium text-forest-900">I&apos;m interested in</legend>
        <div className="flex flex-wrap gap-2">
          {interestOptions.map((option) => (
            <label key={option.value} className="cursor-pointer">
              <input
                type="checkbox"
                name="interests"
                value={option.value}
                defaultChecked={selected.has(option.value)}
                className="peer sr-only"
                aria-describedby={errors.interests ? "interests-error" : undefined}
              />
              <span
                className={cn(
                  "inline-flex h-11 items-center gap-2 rounded-full border border-input bg-white px-4 text-sm text-ink-soft transition-colors",
                  "peer-checked:border-forest-800 peer-checked:bg-forest-800 peer-checked:text-cream-50",
                  "peer-focus-visible:ring-4 peer-focus-visible:ring-gold-200",
                  "[&>svg]:hidden peer-checked:[&>svg]:block",
                )}
              >
                <Check className="size-4" aria-hidden="true" />
                {option.label}
              </span>
            </label>
          ))}
        </div>
        <FieldError id="interests-error" message={errors.interests} />
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="fullName">Full name</Label>
          <Input
            id="fullName"
            name="fullName"
            autoComplete="name"
            defaultValue={text("fullName")}
            aria-invalid={!!errors.fullName}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
          />
          <FieldError id="fullName-error" message={errors.fullName} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Mobile number</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="0712 345 678"
            defaultValue={text("phone")}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
          <FieldError id="phone-error" message={errors.phone} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">
            Email <span className="font-normal text-ink-muted">(optional)</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            defaultValue={text("email")}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          <FieldError id="email-error" message={errors.email} />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="location">
            Town or county <span className="font-normal text-ink-muted">(optional)</span>
          </Label>
          <Input id="location" name="location" autoComplete="address-level2" placeholder="e.g. Nairobi" defaultValue={text("location")} />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="message">
            Anything you&apos;d like us to know? <span className="font-normal text-ink-muted">(optional)</span>
          </Label>
          <Textarea id="message" name="message" maxLength={1000} defaultValue={text("message")} />
        </div>
      </div>

      <div className="space-y-2">
        <label className="flex items-start gap-3 text-sm leading-relaxed text-ink-soft">
          <input
            type="checkbox"
            name="consent"
            className="mt-0.5 size-5 shrink-0 rounded accent-forest-800"
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? "consent-error" : undefined}
          />
          <span>
            Cattle Buy may contact me by phone, SMS or email about the programmes I selected. I
            understand nothing is being sold or reserved by registering.
          </span>
        </label>
        <FieldError id="consent-error" message={errors.consent} />
      </div>

      {state.status === "error" && state.message && (
        <p role="alert" className="rounded-xl bg-destructive/8 px-4 py-3 text-sm text-destructive">
          {state.message}
        </p>
      )}

      <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={pending}>
        {pending ? "Registering…" : "Register interest"}
      </Button>
    </form>
  );
}
