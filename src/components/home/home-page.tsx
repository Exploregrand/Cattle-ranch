import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { BrandMark } from "@/components/brand/wordmark";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { Button } from "@/components/ui/button";
import { photos } from "@/content/photos";
import { farm } from "@/content/site";

const day = [
  { time: "Dawn", title: "Water and a once-over", body: "Every animal counted, watered and looked over before the day begins." },
  { time: "Morning", title: "Fresh-cut fodder", body: "Sugargraze, Napier and legumes cut from our own beds and fed the same day." },
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
  [`${farm.acres}`, "Acres in Isinya"],
  [`${farm.beds}`, "Fodder beds"],
  [`${farm.fodder.length}`, "Feed crops"],
];

/** Shared page container: one width and gutter for every section. */
const wrap = "mx-auto w-full max-w-7xl px-6 sm:px-8";

export function HomePage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-cream-50 text-ink">
      <SiteHeader />

      {/* Hero */}
      <section className="px-3 pt-3 sm:px-4 sm:pt-4">
        <div className="relative isolate flex min-h-[620px] items-end overflow-hidden rounded-xl sm:min-h-[700px] lg:min-h-[calc(100svh-6.5rem)]">
          <Image
            src={photos.cattle.src}
            alt={photos.cattle.alt}
            fill
            priority
            sizes="100vw"
            className="-z-10 object-cover object-[50%_45%] lg:object-[50%_70%]"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#1c1b19]/90 via-[#1c1b19]/30 to-transparent" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#1c1b19]/65 via-[#1c1b19]/15 to-transparent" />

          <div className="w-full px-6 pb-10 pt-40 text-cream-50 sm:px-12 sm:pb-14 lg:px-16 lg:pb-16">
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
                <a href="#animals">See the animals</a>
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
      </section>

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
                href={`/early-access?interest=${s.id}`}
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

      {/* A day at Tangama */}
      <section id="care" className="scroll-mt-20 bg-forest-900 text-cream-50">
        <div className={`${wrap} section-y`}>
          <p className="eyebrow !text-cream-50/60">How every animal will be cared for</p>
          <h2 className="t-h1 mt-4">A day at Tangama.</h2>
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

      {/* Feed first */}
      <section id="farm" className="scroll-mt-20 border-y border-border bg-white">
        <div className={`${wrap} section-y grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-20`}>
          <div>
            <p className="eyebrow">Where we are today</p>
            <h2 className="t-h1 mt-4">Feed first. Then the herd.</h2>
            <p className="t-lead mt-6 max-w-lg text-ink-soft">
              Before any animal arrives, we&apos;re growing the feed that will raise it: Sugargraze, Super Napier, alfalfa and
              desmodium on our farm in Isinya.
            </p>
          </div>
          <dl className="grid grid-cols-3 border-t border-ink/15">
            {farmFigures.map(([v, k]) => (
              <div key={k} className="border-r border-ink/10 pt-6 pr-4 last:border-r-0 [&:not(:first-child)]:pl-5">
                <dd className="t-figure text-[2.75rem] sm:text-[3.75rem]">{v}</dd>
                <dt className="eyebrow mt-3 !text-[0.75rem]">{k}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Qurbani */}
      <section id="qurbani" className={`${wrap} section-y scroll-mt-20`}>
        <div className="grid overflow-hidden rounded-xl border border-border bg-white lg:grid-cols-2">
          <div className="relative min-h-[300px] lg:min-h-[480px]">
            <Image
              src={photos.goat.src}
              alt={photos.goat.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              style={{ objectPosition: photos.goat.position }}
            />
          </div>
          <div className="flex flex-col justify-center px-7 py-12 sm:px-14">
            <p className="eyebrow">Seasonal · planned</p>
            <h2 className="t-h1 mt-4 max-w-[13ch]">Qurbani, from a farm you know.</h2>
            <p className="t-body mt-5 max-w-md text-ink-soft">
              Healthy, well-fed goats and sheep reserved ahead of Eid al-Adha, prepared and delivered by our team.
            </p>
            <Button asChild size="lg" className="mt-8 self-start">
              <Link href="/early-access?interest=qurbani">Notify me for Qurbani</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Investors */}
      <section className={`${wrap} pb-[clamp(4.5rem,3rem+5vw,7.5rem)]`}>
        <div className="grid gap-8 border-t border-ink pt-10 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <div>
            <p className="eyebrow">For Kenyan investors and chamas</p>
            <h2 className="t-h1 mt-4">Build Tangama with us.</h2>
            <p className="t-body mt-5 max-w-lg text-ink-soft">
              Our investor brief sets out the opportunity, the model, exactly where we are today, and how capital will be
              governed.
            </p>
          </div>
          <Button asChild size="lg" variant="outline" className="self-start lg:justify-self-end">
            <Link href="/investors">
              Read the investor brief <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>

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
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
