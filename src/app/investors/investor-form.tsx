"use client";

import { useActionState } from "react";
import { CircleCheck } from "lucide-react";

import { registerInvestorInterest, type InvestorState } from "@/app/actions/investors";
import { counties, investorTypes, routes, tickets } from "@/content/investors";
import { cn } from "@/lib/utils";

const field =
  "h-13 w-full rounded-xl border border-cream-50/15 bg-cream-50/[0.06] px-4 text-base text-cream-50 outline-none transition-colors placeholder:text-cream-100/35 focus:border-gold-400 aria-invalid:border-[#e0866a]";

function Label({ htmlFor, children, hint }: { htmlFor: string; children: React.ReactNode; hint?: string }) {
  return (
    <label htmlFor={htmlFor} className="label-caps mb-2 block text-[0.85rem] text-cream-100/75">
      {children}
      {hint && <span className="ml-1.5 normal-case tracking-normal text-cream-100/40">{hint}</span>}
    </label>
  );
}

function Err({ id, msg }: { id: string; msg?: string }) {
  return msg ? (
    <p id={id} className="mt-1.5 text-sm text-[#f0a48b]">
      {msg}
    </p>
  ) : null;
}

export function InvestorForm() {
  const [state, action, pending] = useActionState<InvestorState, FormData>(registerInvestorInterest, { status: "idle" });

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-[1.75rem] border border-cream-50/15 bg-cream-50/[0.05] p-8 sm:p-10">
        <CircleCheck className="size-9 text-gold-400" aria-hidden="true" />
        <h3 className="mt-5 font-display text-[2rem] font-medium leading-tight text-cream-50">Thank you — we&apos;ll be in touch</h3>
        <p className="mt-3 max-w-md leading-relaxed text-cream-100/70">
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
            <option value="" className="text-black">
              Choose your county
            </option>
            {counties.map((c) => (
              <option key={c} value={c} className="text-black">
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
          <legend className="label-caps mb-2.5 text-[0.85rem] text-cream-100/75">{group.label}</legend>
          <div className="flex flex-wrap gap-2">
            {group.options.map((o) => (
              <label key={o.value} className="cursor-pointer">
                <input type="radio" name={group.name} value={o.value} defaultChecked={v[group.name] === o.value} className="peer sr-only" />
                <span
                  className={cn(
                    "inline-flex h-11 items-center rounded-full border border-cream-50/20 px-4 text-sm text-cream-100/80 transition-colors",
                    "peer-checked:border-gold-400 peer-checked:bg-gold-400 peer-checked:font-medium peer-checked:text-forest-950 peer-focus-visible:ring-2 peer-focus-visible:ring-gold-400",
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
            <option value="" className="text-black">
              Choose a range
            </option>
            {tickets.map((t) => (
              <option key={t.value} value={t.value} className="text-black">
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

      <div className="space-y-3 rounded-2xl bg-cream-50/[0.04] p-5">
        {[
          {
            name: "acknowledgedNoOffer",
            text: "I understand this is an expression of interest only. No offer of shares, securities or investment is being made, and no returns are promised.",
          },
          { name: "consent", text: "Tangama may contact me by phone, WhatsApp or email about this." },
        ].map((c) => (
          <div key={c.name}>
            <label className="flex items-start gap-3 text-sm leading-relaxed text-cream-100/80">
              <input type="checkbox" name={c.name} className="mt-0.5 size-5 shrink-0 accent-[#cc9a42]" {...err(c.name)} />
              {c.text}
            </label>
            <Err id={`${c.name}-error`} msg={e[c.name]} />
          </div>
        ))}
      </div>

      {state.status === "error" && state.message && (
        <p role="alert" className="text-sm text-[#f0a48b]">
          {state.message}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="label-caps inline-flex h-14 w-full items-center justify-center rounded-full bg-gold-400 px-9 text-[1.05rem] font-bold text-forest-950 transition-colors hover:bg-cream-50 disabled:opacity-60 sm:w-auto"
      >
        {pending ? "Sending…" : "Register investor interest"}
      </button>
    </form>
  );
}
