"use client";

import { useActionState, useEffect, useRef } from "react";
import { CircleAlert, CircleCheck } from "lucide-react";

import type { ActionResult } from "@/app/admin/_actions/shared";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Server-action form with pending, success and error states. Resets on success. */
export function ActionForm({
  action,
  children,
  submitLabel,
  pendingLabel = "Saving…",
  reset = true,
  className,
  variant = "default",
}: {
  action: (state: ActionResult, formData: FormData) => Promise<ActionResult>;
  children: React.ReactNode;
  submitLabel: string;
  pendingLabel?: string;
  reset?: boolean;
  className?: string;
  variant?: "default" | "outline" | "gold";
}) {
  const [state, formAction, pending] = useActionState(action, { ok: false, message: "" });
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.ok && reset) ref.current?.reset();
  }, [state, reset]);

  return (
    <form ref={ref} action={formAction} className={cn("space-y-4", className)}>
      {children}
      <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center">
        <Button type="submit" variant={variant} disabled={pending} className="w-full sm:w-auto">
          {pending ? pendingLabel : submitLabel}
        </Button>
        {state.message && (
          <p
            key={state.at ?? state.message}
            role={state.ok ? "status" : "alert"}
            className={cn(
              "flex items-start gap-2 text-sm animate-in fade-in slide-in-from-left-1 duration-300",
              state.ok ? "text-forest-700" : "text-destructive",
            )}
          >
            {state.ok ? <CircleCheck className="mt-0.5 size-4 shrink-0" /> : <CircleAlert className="mt-0.5 size-4 shrink-0" />}
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}
