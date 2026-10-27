"use client";

import { useActionState } from "react";
import { CircleCheck } from "lucide-react";

import { registerInvestorInterest, type InvestorState } from "@/app/actions/investors";
import { counties, investorTypes, routes, tickets } from "@/content/investors";
import { cn } from "@/lib/utils";

const field =
  "h-12 w-full rounded-xl border border-input bg-white px-4 text-base text-ink outline-none transition-[border-color,box-shadow] placeholder:text-ink-muted/60 focus:border-clay focus:ring-4 focus:ring-gold-200/60 aria-invalid:border-destructive";

function Label({ htmlFor, children, hint }: { htmlFor: string; children: React.ReactNode; hint?: string }) {
  return (
    <label htmlFor={htmlFor} className="label-caps mb-2 block text-[0.85rem] text-forest-900">
      {children}
      {hint && <span className="ml-1.5 normal-case tracking-normal text-ink-muted">{hint}</span>}
    </label>
  );
}

function Err({ id, msg }: { id: string; msg?: string }) {
  return msg ? (
    <p id={id} className="mt-1.5 text-sm text-destructive">
      {msg}
    </p>
  ) : null;
}

export function InvestorForm() {
  const [state, action, pending] = useActionState<InvestorState, FormData>(registerInvestorInterest, { status: "idle" });

  if (state.status === "success") {
    return (
      <div role="status">
        <CircleCheck className="size-9 text-grass" aria-hidden="true" />
        <h3 className="mt-5 font-display text-[2rem] font-medium leading-tight text-forest-950">Thank you — we&apos;ll be in touch</h3>
        <p className="mt-3 max-w-md leading-relaxed text-ink-soft">
          A member of the Tangama team will contact you personally. Nothing is being offered or sold, and no payment is needed.
        </p>
      </div>
    );
  }

  const e = state.fieldErrors ?? {};
  const v = state.values ?? {};
  const err = (k: string) => ({ "aria-invalid": !!e[k], "aria-describedby": e[k] ? `${k}-error` : undefined });

  return (
    <form action={action} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="fullName">Full name</Label>
          <input id="fullName" name="fullName" autoComplete="name" defaultValue={v.fullName} className={field} {...err("fullName")} />
          <Err id="fullName-error" msg={e.fullName} />
        </div>
        <div>
          <Label htmlFor="phone">Mobile number</Label>
          <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="0712 345 678" defaultValue={v.phone} className={field} {...err("phone")} />
          <Err id="phone-error" msg={e.phone} />
        </div>
        <div>
          <Label htmlFor="county">County</Label>
          <select id="county" name="county" defaultValue={v.county ?? ""} className={cn(field, "appearance-none")} {...err("county")}>
            <option value="">
              Choose your county
            </option>
            {counties.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <Err id="county-error" msg={e.county} />
        </div>
        <div>
          <Label htmlFor="email" hint="(optional)">
            Email
          </Label>
          <input id="email" name="email" type="email" autoComplete="email" defaultValue={v.email} className={field} {...err("email")} />
          <Err id="email-error" msg={e.email} />
        </div>
      </div>

      {[
        { name: "investorType", label: "What describes you", options: investorTypes },
        { name: "route", label: "What interests you", options: routes },
      ].map((group) => (
        <fieldset key={group.name}>
          <legend className="label-caps mb-2.5 text-[0.85rem] text-forest-900">{group.label}</legend>
          <div className="flex flex-wrap gap-2">
            {group.options.map((o) => (
              <label key={o.value} className="cursor-pointer">
                <input type="radio" name={group.name} value={o.value} defaultChecked={v[group.name] === o.value} className="peer sr-only" />
                <span
                  className={cn(
                    "inline-flex h-11 items-center rounded-full border border-input bg-white px-4 text-sm text-ink-soft transition-colors",
                    "peer-checked:border-forest-950 peer-checked:bg-forest-950 peer-checked:font-medium peer-checked:text-cream-50 peer-focus-visible:ring-2 peer-focus-visible:ring-clay",
                  )}
                >
                  {o.label}
                </span>
              </label>
            ))}
          </div>
          <Err id={`${group.name}-error`} msg={e[group.name]} />
        </fieldset>
      ))}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="ticket" hint="(optional)">
            Indicative amount
          </Label>
          <select id="ticket" name="ticket" defaultValue={v.ticket ?? ""} className={cn(field, "appearance-none")}>
            <option value="">
              Choose a range
            </option>
            {tickets.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="message" hint="(optional)">
            Anything we should know
          </Label>
          <input id="message" name="message" maxLength={1500} defaultValue={v.message} className={field} />
        </div>
      </div>

      <div className="space-y-3 rounded-2xl bg-cream-100 p-5">
        {[
          {
            name: "acknowledgedNoOffer",
            text: "I understand this is an expression of interest only. No offer of shares, securities or investment is being made, and no returns are promised.",
          },
          { name: "consent", text: "Tangama may contact me by phone, WhatsApp or email about this." },
        ].map((c) => (
          <div key={c.name}>
            <label className="flex items-start gap-3 text-sm leading-relaxed text-ink-soft">
              <input type="checkbox" name={c.name} className="mt-0.5 size-5 shrink-0 accent-[#3a2a1f]" {...err(c.name)} />
              {c.text}
            </label>
            <Err id={`${c.name}-error`} msg={e[c.name]} />
          </div>
        ))}
      </div>

      {state.status === "error" && state.message && (
        <p role="alert" className="text-sm text-destructive">
          {state.message}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="label-caps inline-flex h-14 w-full items-center justify-center rounded-full bg-forest-950 px-9 text-[1.05rem] font-bold text-cream-50 transition-colors hover:bg-clay disabled:opacity-60 sm:w-auto"
      >
        {pending ? "Sending…" : "Register investor interest"}
      </button>
    </form>
  );
}
