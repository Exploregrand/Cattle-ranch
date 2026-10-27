import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, Check } from "lucide-react";

import { InvestorForm } from "@/app/investors/investor-form";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { marketFacts, sources } from "@/content/investors";
import { photos } from "@/content/photos";
import { farm } from "@/content/site";

export const metadata: Metadata = {
  title: "Investors",
  description:
    "Tangama Livestock is building a transparent livestock ownership and management business in Isinya, Kajiado. Register your interest as a Kenyan investor.",
};

const chapters = [
  { id: "opportunity", n: "01", title: "The opportunity" },
  { id: "model", n: "02", title: "The model" },
  { id: "today", n: "03", title: "Where we are" },
  { id: "roadmap", n: "04", title: "Roadmap" },
  { id: "governance", n: "05", title: "Governance" },
  { id: "interest", n: "06", title: "Register interest" },
];

const today = [
  { status: "In place", title: "Farm in Isinya, Kajiado County", body: `${farm.acres} acres dedicated to fodder and future livestock.` },
  { status: "In place", title: "120 fodder beds laid out", body: "Three sections of 40 beds, managed and recorded bed by bed." },
  { status: "In progress", title: "Four fodder crops being established", body: "Sugargraze, Super Napier, alfalfa and desmodium — our own feed base." },
  { status: "In place", title: "Operating platform built", body: "Fodder records, animal registers, health, weights, costs and owner dashboards." },
  { status: "Planned", title: "Livestock pilot", body: "A farm-owned herd to prove care, growth and cost records in practice." },
  { status: "Planned", title: "Legal and regulatory review", body: "Before any external capital or ownership programme opens." },
];

const roadmap = [
  { phase: "Phase 1", title: "Feed", body: "Establish fodder across all 120 beds and build the operating system.", now: true },
  { phase: "Phase 2", title: "Farm herd", body: "Bring in a first farm-owned herd and run the full record cycle on it." },
  { phase: "Phase 3", title: "Managed ownership", body: "Open ownership programmes to Kenyan customers, after legal review." },
  { phase: "Phase 4", title: "Scale & seasons", body: "Grow capacity and add seasonal services such as Qurbani." },
];

const governance = [
  { title: "Legal review first", body: "Advice on Kenyan law, including Capital Markets Authority rules, before any capital or ownership programme opens." },
  { title: "Written agreements", body: "Every investment or animal ownership documented in a signed agreement with clear terms." },
  { title: "Know-your-investor checks", body: "Identity and source-of-funds checks before accepting any money." },
  { title: "Independent accounts", body: "Annual accounts prepared and reviewed by independent accountants." },
  { title: "Live records", body: "Animals, feed, health and costs visible on the platform as they happen — not quarterly." },
  { title: "No promised returns", body: "We report what actually happened. We never forecast or guarantee profits." },
];

function Chapter({ id, n, title, children }: { id: string; n: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-border py-20 sm:py-24">
      <p className="label-caps text-[0.95rem] text-clay">
        {n} · {title}
      </p>
      {children}
    </section>
  );
}

export default function InvestorsPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-cream-50 text-forest-950">
        {/* Hero */}
        <section className="mx-auto max-w-7xl px-6 pt-12 sm:pt-16">
          <div className="grid items-end gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
            <div className="pb-2">
              <p className="label-caps text-[0.95rem] text-clay">Investor brief · Kenya</p>
              <h1 className="mt-6 font-display text-[3rem] font-medium leading-[1] tracking-[-0.025em] sm:text-[4.4rem] lg:text-[5rem]">
                Kenyan livestock,
                <br />
                managed in the open.
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-soft">
                Tangama is building a livestock ownership and management business from its farm in Isinya, Kajiado — with
                every animal, feed and cost on record. We are speaking with Kenyan investors and chamas ahead of launch.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href="#interest" className="label-caps inline-flex h-14 items-center justify-center rounded-full bg-forest-950 px-8 text-[1.05rem] font-bold text-cream-50 hover:bg-clay">
                  Register investor interest
                </a>
                <a href="#opportunity" className="label-caps inline-flex h-14 items-center justify-center gap-2 rounded-full border-2 border-forest-950 px-8 text-[1.05rem] font-bold">
                  Read the brief <ArrowDown className="size-4" aria-hidden="true" />
                </a>
              </div>
            </div>
            <figure>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem]">
                <Image
                  src={photos.cattle.src}
                  alt={photos.cattle.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover object-[50%_68%]"
                />
              </div>
            </figure>
          </div>
          <dl className="mt-14 grid grid-cols-1 border-y border-forest-950 sm:grid-cols-3">
            {[
              ["Stage", "Pre-launch · building the feed base"],
              ["Farm", `${farm.acres} acres · ${farm.beds} fodder beds · Isinya`],
              ["Offer", "None open — expressions of interest only"],
            ].map(([k, v]) => (
              <div key={k} className="border-border py-5 sm:border-l sm:px-8 sm:first:border-l-0 sm:first:pl-0 [&:not(:first-child)]:border-t sm:[&:not(:first-child)]:border-t-0">
                <dt className="label-caps text-[0.8rem] text-ink-muted">{k}</dt>
                <dd className="mt-1 text-[0.98rem] text-forest-950">{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[220px_1fr] lg:gap-20">
          {/* Chapter index */}
          <nav aria-label="Brief chapters" className="hidden lg:block">
            <ol className="sticky top-28 space-y-3 py-20">
              {chapters.map((c) => (
                <li key={c.id}>
                  <a href={`#${c.id}`} className="label-caps flex gap-3 text-[0.9rem] text-ink-muted transition-colors hover:text-forest-950">
                    <span className="text-clay">{c.n}</span>
                    {c.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="min-w-0">
            <Chapter id="opportunity" n="01" title="The opportunity">
              <h2 className="mt-6 max-w-3xl font-display text-[2.4rem] font-medium leading-[1.05] tracking-[-0.025em] sm:text-[3.4rem]">
                Livestock is central to Kenya&apos;s economy. Owning it well is still hard.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
                Many Kenyans want to own animals but lack the land, time or expertise to raise them — and informal arrangements
                rarely come with records anyone can check. Tangama combines a working fodder farm with a platform that keeps
                every animal&apos;s history visible to its owner.
              </p>
              <dl className="mt-12 grid border-y border-forest-950 sm:grid-cols-2">
                {marketFacts.map((f) => (
                  <div key={f.value} className="py-8 sm:px-8 sm:first:pl-0 sm:[&:not(:first-child)]:border-l sm:[&:not(:first-child)]:border-border">
                    <dd className="font-display text-[3.4rem] font-medium leading-none tracking-[-0.02em] text-forest-950 sm:text-[4.4rem]">
                      {f.value}
                    </dd>
                    <dt className="mt-4 max-w-xs leading-relaxed text-ink-soft">
                      {f.label}
                      <sup className="ml-1 text-clay">
                        <a href={`#source-${f.source}`}>[{f.source}]</a>
                      </sup>
                    </dt>
                  </div>
                ))}
              </dl>
            </Chapter>

            <Chapter id="model" n="02" title="The model">
              <h2 className="mt-6 max-w-3xl font-display text-[2.4rem] font-medium leading-[1.05] tracking-[-0.025em] sm:text-[3.4rem]">
                Grow the feed. Raise the animals. Record everything.
              </h2>
              <ol className="mt-12 grid gap-4 sm:grid-cols-4">
                {[
                  ["Feed", "Fodder grown on our own beds controls the largest cost of raising livestock."],
                  ["Animals", "Sheep, goats and cattle suited to Kajiado, cared for by our team."],
                  ["Records", "ID, weigh-ins, health, feeding and every shilling, logged as it happens."],
                  ["Outcome", "Sale, collection or other documented result — reported, never promised."],
                ].map(([t, b], i) => (
                  <li key={t} className="rounded-[1.25rem] border border-border bg-paper p-6">
                    <span className="label-caps text-[0.85rem] text-clay">Step {i + 1}</span>
                    <p className="mt-6 font-display text-2xl font-medium">{t}</p>
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">{b}</p>
                  </li>
                ))}
              </ol>

              <h3 className="label-caps mt-16 text-[0.95rem] text-ink-muted">Two ways to take part — interest only today</h3>
              <div className="mt-5 grid gap-4 lg:grid-cols-2">
                {[
                  {
                    photo: photos.sheep,
                    title: "Back the company",
                    body: "For investors who want to own part of Tangama itself and share in building the business. Any raise would be a private, documented process.",
                  },
                  {
                    photo: photos.goat,
                    title: "Own managed livestock",
                    body: "For individuals and chamas who want to own specific, identified animals that we feed and care for under a written agreement.",
                  },
                ].map((r) => (
                  <article key={r.title} className="overflow-hidden rounded-[1.5rem] border border-border bg-paper">
                    <div className="relative h-56">
                      <Image src={r.photo.src} alt={r.photo.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" style={{ objectPosition: r.photo.position }} />
                    </div>
                    <div className="p-7">
                      <p className="font-display text-[1.8rem] font-medium">{r.title}</p>
                      <p className="mt-2 leading-relaxed text-ink-soft">{r.body}</p>
                    </div>
                  </article>
                ))}
              </div>
            </Chapter>

            <Chapter id="today" n="03" title="Where we are">
              <h2 className="mt-6 max-w-3xl font-display text-[2.4rem] font-medium leading-[1.05] tracking-[-0.025em] sm:text-[3.4rem]">
                Honest about our stage.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
                We have no animals for sale and no investors yet. Here is exactly what exists today and what comes next.
              </p>
              <ul className="mt-10 divide-y divide-border border-y border-forest-950">
                {today.map((t) => (
                  <li key={t.title} className="grid gap-2 py-5 sm:grid-cols-[140px_1fr_1.2fr] sm:gap-8">
                    <span
                      className={`label-caps text-[0.85rem] ${t.status === "In place" ? "text-grass" : t.status === "In progress" ? "text-clay" : "text-ink-muted"}`}
                    >
                      {t.status === "In place" && <Check className="mr-1 inline size-3.5" aria-hidden="true" />}
                      {t.status}
                    </span>
                    <span className="font-display text-xl">{t.title}</span>
                    <span className="text-ink-soft">{t.body}</span>
                  </li>
                ))}
              </ul>
            </Chapter>

            <Chapter id="roadmap" n="04" title="Roadmap">
              <h2 className="mt-6 max-w-3xl font-display text-[2.4rem] font-medium leading-[1.05] tracking-[-0.025em] sm:text-[3.4rem]">
                Feed first. Then the herd.
              </h2>
              <ol className="mt-12 grid gap-4 md:grid-cols-4">
                {roadmap.map((r) => (
                  <li key={r.phase} className={`rounded-[1.25rem] p-6 ${r.now ? "bg-forest-900 text-cream-50" : "border border-border bg-paper"}`}>
                    <span className="label-caps text-[0.85rem]">{r.now ? `${r.phase} · now` : r.phase}</span>
                    <p className="mt-8 font-display text-[1.8rem] font-medium leading-none">{r.title}</p>
                    <p className={`mt-3 text-[0.95rem] leading-relaxed ${r.now ? "text-cream-100/80" : "text-ink-soft"}`}>{r.body}</p>
                  </li>
                ))}
              </ol>
            </Chapter>

            <Chapter id="governance" n="05" title="Governance">
              <h2 className="mt-6 max-w-3xl font-display text-[2.4rem] font-medium leading-[1.05] tracking-[-0.025em] sm:text-[3.4rem]">
                Before we accept a single shilling.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
                These are the safeguards we intend to put in place. They are proposed and subject to legal advice.
              </p>
              <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {governance.map((g) => (
                  <li key={g.title} className="rounded-[1.25rem] border border-border bg-paper p-6">
                    <p className="font-display text-xl font-medium">{g.title}</p>
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">{g.body}</p>
                  </li>
                ))}
              </ul>
            </Chapter>

            <Chapter id="interest" n="06" title="Register interest">
              <div className="mt-6 grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
                <div>
                  <h2 className="font-display text-[2.4rem] font-medium leading-[1.05] tracking-[-0.025em] sm:text-[3.2rem]">
                    Talk to us early.
                  </h2>
                  <p className="mt-6 leading-relaxed text-ink-soft">
                    Leave your details and a member of the team will contact you personally. Registering is free, commits you to
                    nothing, and does not reserve anything.
                  </p>
                  <p className="mt-6 text-sm leading-relaxed text-ink-muted">
                    Looking to own animals for yourself rather than invest?{" "}
                    <Link href="/early-access" className="font-medium text-clay underline underline-offset-4">
                      Register as a customer
                    </Link>
                    .
                  </p>
                </div>
                <div className="rounded-[1.75rem] border border-border bg-paper p-6 sm:p-9">
                  <InvestorForm />
                </div>
              </div>
            </Chapter>

            <section aria-label="Sources and notices" className="border-t border-border py-12 text-sm leading-relaxed text-ink-muted">
              <ol className="space-y-1.5">
                {sources.map((s) => (
                  <li key={s.n} id={`source-${s.n}`}>
                    [{s.n}] {s.text}{" "}
                    <a href={s.href} target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-forest-950">
                      Source
                    </a>
                  </li>
                ))}
              </ol>
              <p className="mt-6 max-w-3xl">
                This page is for information only. It is not an offer to sell, or a solicitation of an offer to buy, any shares,
                securities or investment product. No offer will be made except through formal documentation after legal and
                regulatory review. Livestock values can fall as well as rise; no returns are promised.
              </p>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
