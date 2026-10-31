import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { BrandMark } from "@/components/brand/wordmark";
import { Button } from "@/components/ui/button";
import { FaqList } from "@/components/home/faq-list";
import { LiveProgress } from "@/components/home/live-progress";
import { agreementCovers, buyerFaqs, howItWorks, pathways } from "@/content/buyer";
import { contact, hasContact } from "@/content/contact";
import { farmPhotos } from "@/content/farm-story";
import { photos } from "@/content/photos";
import { farm } from "@/content/site";

const day = [
  { time: "Dawn", title: "Water and a once-over", body: "Every animal counted, watered and looked over before the day begins." },
  { time: "Morning", title: "Fresh-cut fodder", body: "Sugargraze, Napier and legumes cut fresh on our farms and fed the same day." },
  { time: "Midday", title: "Shade and rest", body: "Out of the Kajiado sun, with water on hand." },
  { time: "Afternoon", title: "Health rounds", body: "Eyes, coat, feet and appetite checked; anything unusual goes on the record." },
  { time: "Dusk", title: "Into the boma", body: "Safely penned for the night." },
];

const species = [
  { id: "sheep", photo: "sheep" as const, name: "Sheep", sw: "Kondoo", breeds: "Dorper · Red Maasai" },
  { id: "goats", photo: "goat" as const, name: "Goats", sw: "Mbuzi", breeds: "Galla · Boer" },
  { id: "cattle", photo: "cattle" as const, name: "Cattle", sw: "Ng'ombe", breeds: "Boran · Sahiwal" },
];

const record = [
  ["Ear tag", "A permanent ID from the day the animal arrives."],
  ["Weigh-ins", "Weighed regularly, so you can see it grow."],
  ["Health", "Every vaccination and treatment, dated."],
  ["Costs", "Feed, veterinary and purchase in KES — what was spent, never promises."],
];

const farmFigures = [
  [`${farm.farms.length}`, "Farms"],
  [`${farm.totalAcres}`, "Acres"],
  [`${farm.fodder.length}`, "Fodder crops"],
];


/** Shared page container: one width and gutter for every section. */
export const wrap = "mx-auto w-full max-w-7xl px-6 sm:px-8";


export function Hero() {
  return (
    <>
    {/* Hero */}
    <section>
      {/*
        Phone: the photo gets its own band (cow's head in view) and the copy sits below on a dark ground.
        Tablet and up: one full-bleed photo with the copy over it.
      */}
      <div className="relative isolate flex flex-col overflow-hidden bg-[#1c1b19] lg:min-h-[calc(100svh-4.5rem)] lg:flex-row lg:items-end">
        <div className="relative h-[52svh] min-h-[340px] w-full sm:h-[60svh] lg:absolute lg:inset-0 lg:-z-10 lg:h-auto">
          <Image
            src={farmPhotos.herdGrazing.src}
            alt={farmPhotos.herdGrazing.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[22%_62%] sm:object-[25%_58%] lg:object-[35%_55%]"
          />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#1c1b19] to-transparent lg:hidden" />
        </div>
        <div className="absolute inset-0 -z-10 hidden bg-gradient-to-t from-[#1c1b19]/85 via-transparent to-transparent lg:block" />
        <div className="absolute inset-0 -z-10 hidden bg-gradient-to-l from-[#1c1b19]/85 via-[#1c1b19]/35 to-transparent lg:block" />

        <div className="relative mx-auto -mt-10 w-full max-w-7xl px-6 pb-12 text-cream-50 sm:px-8 sm:pb-16 lg:mt-0 lg:flex lg:justify-end lg:pb-20 lg:pt-40">
          <div className="lg:max-w-[38rem]">
          <p className="eyebrow !text-cream-50/75">Isinya · Kajiado County · Kenya</p>
          <h1 className="t-display mt-5 max-w-[13ch]">Own livestock, raised on our land.</h1>
          <p className="t-lead mt-6 max-w-xl text-cream-50/85">
            Sheep, goats and cattle fed on fodder we grow ourselves and cared for by our own team — with every weigh-in,
            treatment and shilling recorded for you to see.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="light" size="lg">
              <Link href="/early-access">Register interest</Link>
            </Button>
            <Button asChild variant="outline-light" size="lg">
              <Link href="/how-it-works">How it works</Link>
            </Button>
          </div>
          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-cream-50/20 pt-6">
            {farmFigures.map(([v, k]) => (
              <div key={k}>
                <dd className="t-figure text-[2rem]">{v}</dd>
                <dt className="eyebrow mt-2 !text-[0.75rem] !text-cream-50/65">{k}</dt>
              </div>
            ))}
          </dl>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}


export function Pathways() {
  return (
    <>
    {/* Three ways in */}
    <section className={`${wrap} section-y`}>
      <p className="eyebrow">Three ways to work with us</p>
      <h2 className="t-h1 mt-4 max-w-[18ch]">Find the right place to start.</h2>
      <div className="mt-12 grid gap-4 md:grid-cols-3 lg:gap-5">
        {pathways.map((p) => {
          const photo = photos[p.photo];
          return (
            <Link key={p.id} href={p.href} className="group flex flex-col overflow-hidden rounded-xl border border-border bg-white transition-colors hover:border-ink/40">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={photo.src}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  style={{ objectPosition: photo.position }}
                />
              </div>
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <h3 className="t-h2">{p.title}</h3>
                <p className="t-body mt-3 flex-1 text-ink-soft">{p.body}</p>
                <span className="label-caps mt-6 inline-flex items-center gap-2 text-[0.8125rem] text-ink">
                  {p.cta} <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
    </>
  );
}


export function HowItWorks() {
  return (
    <>
    {/* How it works + what the agreement covers */}
    <section id="how" className="scroll-mt-20 border-y border-border bg-white">
      <div className={`${wrap} section-y`}>
        <p className="eyebrow">How it works</p>
        <h2 className="t-h1 mt-4 max-w-[20ch]">Simple steps. Everything in writing.</h2>
        <ol className="mt-12 grid border-t border-ink/15 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorks.map((step, i) => (
            <li key={step.title} className="border-b border-ink/10 py-7 sm:pr-8 lg:border-b-0 lg:border-r lg:px-7 lg:first:pl-0 lg:last:border-r-0">
              <span className="t-figure text-[1.75rem] text-ink-muted">{i + 1}</span>
              <p className="t-h3 mt-5">{step.title}</p>
              <p className="t-body mt-2 text-ink-soft">{step.body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-14 grid gap-10 rounded-xl bg-cream-50 p-7 sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <h3 className="t-h2">Before you pay anything, your agreement will set out:</h3>
            <p className="t-body mt-4 text-ink-soft">
              No surprises later. If it isn&apos;t written down and signed, it doesn&apos;t apply.
            </p>
          </div>
          <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {agreementCovers.map((item) => (
              <li key={item} className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink">
                <Check className="mt-1 size-4 shrink-0 text-ink-muted" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-6 text-[0.8125rem] text-ink-muted">
          Programmes open only after commercial and legal review. Herd & Field never promises returns.
        </p>
      </div>
    </section>
    </>
  );
}


export function AnimalsSection() {
  return (
    <>
    {/* Animals */}
    <section id="animals" className={`${wrap} section-y scroll-mt-20`}>
      <div className="grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-end">
        <div>
          <p className="eyebrow">The animals</p>
          <h2 className="t-h1 mt-4 max-w-[16ch]">Three animals. One standard of care.</h2>
        </div>
        <p className="t-body max-w-sm text-ink-soft md:justify-self-end">
          We&apos;re preparing to raise breeds that thrive in Kajiado. Register for the ones you want and we&apos;ll call you
          first.
        </p>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-3 lg:gap-5">
        {species.map((s) => {
          const photo = photos[s.photo];
          return (
            <Link
              key={s.id}
              href={`/livestock/${s.id}`}
              className="group relative isolate flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-xl p-6 text-cream-50 sm:p-7"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="-z-10 object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                style={{ objectPosition: photo.position }}
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#1c1b19]/85 via-[#1c1b19]/10 to-transparent" />
              <span className="label-caps self-start rounded-[3px] bg-[#1c1b19]/55 px-2 py-1 text-[0.6875rem] tracking-[0.14em] backdrop-blur-sm">
                Opening after launch
              </span>
              <div>
                <div className="flex items-end justify-between gap-4">
                  <p className="t-h1 !text-[2.5rem] !leading-none">{s.name}</p>
                  <ArrowRight className="mb-1 size-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </div>
                <p className="eyebrow mt-3 !text-[0.75rem] !text-cream-50/75">
                  {s.sw} · {s.breeds}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
      <p className="mt-4 text-[0.8125rem] text-ink-muted">Breed photography for illustration. Animals are not yet available.</p>
    </section>
    </>
  );
}


export function CareDay() {
  return (
    <>
    {/* A day on the farm */}
    <section id="care" className="scroll-mt-20 bg-forest-900 text-cream-50">
      <div className={`${wrap} section-y`}>
        <p className="eyebrow !text-cream-50/60">How every animal will be cared for</p>
        <h2 className="t-h1 mt-4">A day on the farm.</h2>
        <ol className="mt-14 grid border-t border-cream-50/15 sm:grid-cols-2 lg:grid-cols-5">
          {day.map((d, i) => (
            <li
              key={d.time}
              className="border-b border-cream-50/15 py-7 sm:pr-8 lg:border-b-0 lg:border-r lg:px-7 lg:first:pl-0 lg:last:border-r-0"
            >
              <span className="eyebrow !text-[0.75rem] !text-cream-50/55">
                {String(i + 1).padStart(2, "0")} · {d.time}
              </span>
              <p className="t-h3 mt-6">{d.title}</p>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-cream-50/70">{d.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
    </>
  );
}


export function RecordSection() {
  return (
    <>
    {/* The record */}
    <section className={`${wrap} section-y grid items-center gap-14 lg:grid-cols-2 lg:gap-20`}>
      <div>
        <p className="eyebrow">Your animal&apos;s record</p>
        <h2 className="t-h1 mt-4 max-w-[14ch]">Written down. Every time.</h2>
        <dl className="mt-10 border-t border-ink/15">
          {record.map(([t, b]) => (
            <div key={t} className="grid grid-cols-[7.5rem_1fr] gap-6 border-b border-ink/10 py-4">
              <dt className="label-caps pt-0.5 text-[0.8125rem] text-ink">{t}</dt>
              <dd className="t-body text-ink-soft">{b}</dd>
            </div>
          ))}
        </dl>
      </div>

      <article className="mx-auto w-full max-w-lg rounded-xl border border-border bg-white p-7 shadow-[0_30px_60px_-40px_rgba(28,27,25,0.35)] sm:p-9">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow !text-[0.75rem]">Stock card</p>
            <p className="t-h2 mt-2 !leading-none">Dorper ram</p>
          </div>
          <span className="label-caps rounded-[3px] border border-ink/30 px-2 py-1 text-[0.6875rem] text-ink-soft">Sample</span>
        </div>
        <dl className="mt-7 grid grid-cols-3 gap-4 border-y border-ink/10 py-4">
          {[
            ["ID", "TGM-SH-0012"],
            ["Arrived", "22 Jun 2026"],
            ["Pen", "Isinya · 2"],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="eyebrow !text-[0.6875rem]">{k}</dt>
              <dd className={k === "ID" ? "mt-1 font-mono text-[0.8125rem] text-ink" : "mt-1 text-[0.9375rem] text-ink"}>{v}</dd>
            </div>
          ))}
        </dl>
        <table className="mt-5 w-full text-left">
          <thead>
            <tr className="eyebrow !text-[0.6875rem]">
              <th className="pb-2 font-semibold">Date</th>
              <th className="pb-2 font-semibold">Entry</th>
              <th className="pb-2 text-right font-semibold">Weight</th>
            </tr>
          </thead>
          <tbody className="text-[0.9375rem]">
            {[
              ["22 Jun", "Arrived · dewormed", "28.4 kg"],
              ["01 Jul", "PPR vaccination", "—"],
              ["17 Aug", "Weigh-in", "37.6 kg"],
              ["12 Oct", "Weigh-in · healthy", "46.8 kg"],
            ].map(([d, e, w]) => (
              <tr key={d} className="border-t border-ink/10">
                <td className="py-2.5 text-ink-muted">{d}</td>
                <td className="py-2.5 text-ink">{e}</td>
                <td className="tabular py-2.5 text-right text-ink">{w}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-5 border-t border-ink/10 pt-4 text-right text-[0.875rem] text-ink-soft">
          Gained <span className="tabular font-medium text-ink">+18.4 kg</span> since arrival
        </p>
      </article>
    </section>
    </>
  );
}


export function FarmLive() {
  return (
    <>
    {/* The farm, live */}
    <section id="farm" className="scroll-mt-20 border-y border-border bg-white">
      <div className={`${wrap} section-y`}>
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <p className="eyebrow">The farm, live</p>
            <h2 className="t-h1 mt-4">Feed first. Then the herd.</h2>
          </div>
          <p className="t-lead text-ink-soft">
            We&apos;re growing the feed that will raise every animal — Sugargraze, Super Napier, alfalfa and desmodium across our two
            farms, with {farm.expansion.acres} more acres planned for {farm.expansion.timing}. These figures come straight from our
            farm records.
          </p>
        </div>
        <div className="mt-12">
          <Suspense fallback={<div className="h-32 border-t border-ink/15" />}>
            <LiveProgress />
          </Suspense>
        </div>
        <Link href="/farm" className="label-caps mt-8 inline-flex items-center gap-2 text-[0.8125rem] text-ink underline-offset-4 hover:underline">
          More about the farm <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
    </>
  );
}


export function Questions() {
  return (
    <>
    {/* Questions */}
    <section id="questions" className={`${wrap} section-y scroll-mt-20 grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20`}>
      <div>
        <p className="eyebrow">Questions buyers ask</p>
        <h2 className="t-h1 mt-4">Straight answers.</h2>
        <p className="t-body mt-5 max-w-sm text-ink-soft">
          The things we&apos;d want to know before trusting a farm with our money.
        </p>
      </div>
      <FaqList items={buyerFaqs} />
    </section>
    </>
  );
}


export function Closing() {
  return (
    <>
    {/* Closing */}
    <section className="border-t border-border bg-white">
      <div className={`${wrap} section-y text-center`}>
        <div className="flex justify-center text-ink">
          <BrandMark size={44} />
        </div>
        <h2 className="t-h1 mx-auto mt-7 max-w-[18ch]">Be first in line when the herd arrives.</h2>
        <p className="t-body mx-auto mt-5 max-w-md text-ink-soft">
          No payment, no commitment. We&apos;ll call you when programmes open.
        </p>
        <Button asChild size="lg" className="mt-9">
          <Link href="/early-access">Register interest</Link>
        </Button>
        {hasContact && (
          <p className="mt-8 text-[0.9375rem] text-ink-soft">
            Prefer to talk?{" "}
            {contact.phone && (
              <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="font-medium text-ink underline underline-offset-4">
                {contact.phone}
              </a>
            )}
            {contact.whatsapp && (
              <>
                {contact.phone && " · "}
                <a href={`https://wa.me/${contact.whatsapp}`} className="font-medium text-ink underline underline-offset-4">
                  WhatsApp us
                </a>
              </>
            )}
            {contact.email && (
              <>
                {" · "}
                <a href={`mailto:${contact.email}`} className="font-medium text-ink underline underline-offset-4">
                  {contact.email}
                </a>
              </>
            )}
          </p>
        )}
      </div>
    </section>
    </>
  );
}

/** Home: the four steps in brief, linking to the full page. */
export function HowPreview() {
  return (
    <section className="border-y border-border bg-white">
      <div className={`${wrap} section-y`}>
        <div className="grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-end">
          <div>
            <p className="eyebrow">How it works</p>
            <h2 className="t-h1 mt-4 max-w-[20ch]">Simple steps. Everything in writing.</h2>
          </div>
          <Link href="/how-it-works" className="label-caps inline-flex items-center gap-2 text-[0.8125rem] text-ink hover:underline md:justify-self-end">
            The full process <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <ol className="mt-12 grid border-t border-ink/15 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorks.map((step, i) => (
            <li key={step.title} className="border-b border-ink/10 py-7 sm:pr-8 lg:border-b-0 lg:border-r lg:px-7 lg:first:pl-0 lg:last:border-r-0">
              <span className="t-figure text-[1.75rem] text-ink-muted">{i + 1}</span>
              <p className="t-h3 mt-5">{step.title}</p>
              <p className="t-body mt-2 text-ink-soft">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Opening block for inner pages: label, title, lead and an optional photograph. */
export function PageIntro({
  eyebrow,
  title,
  lead,
  photo,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  photo?: { src: string; alt: string; position: string };
}) {
  return (
    <section className={`${wrap} grid items-end gap-10 pt-12 sm:pt-16 ${photo ? "lg:grid-cols-[1.05fr_1fr] lg:gap-16" : ""}`}>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="t-display mt-5 max-w-[14ch]">{title}</h1>
        <p className="t-lead mt-6 max-w-xl text-ink-soft">{lead}</p>
      </div>
      {photo && (
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
          <Image src={photo.src} alt={photo.alt} fill priority sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" style={{ objectPosition: photo.position }} />
        </div>
      )}
    </section>
  );
}
