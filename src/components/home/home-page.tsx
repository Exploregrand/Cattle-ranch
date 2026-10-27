import Image from "next/image";
import Link from "next/link";

import { BrandMark } from "@/components/brand/wordmark";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { photos } from "@/content/photos";
import { farm } from "@/content/site";


/* Palette — lime plaster, red clay, dry grass, pasture, acacia bark, hide */
const C = {
  plaster: "#F7F5F1", // ivory canvas
  straw: "#FFFFFF", // white paper panels
  clay: "#75706A", // quiet grey for labels
  bark: "#2B2622", // the one dark accent
  hide: "#1C1B19", // ink
  grass: "#F7F5F1",
  gold: "#C9C1B3", // soft stone on dark / over photos
  mute: "#6B6660",
};

const L = "label-caps";
const D = "font-display";

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

export function HomePage() {
  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{ background: C.plaster, color: C.hide }}
    >
      <SiteHeader />

      {/* Hero — photograph-led */}
      <section className="px-3 pt-3 sm:px-5 sm:pt-5">
        <div className="relative isolate flex min-h-[640px] items-end overflow-hidden rounded-[2rem] sm:min-h-[720px] sm:rounded-[2.5rem] lg:min-h-[calc(100svh-7rem)]">
          <Image
            src={photos.cattle.src}
            alt={photos.cattle.alt}
            fill
            priority
            sizes="100vw"
            className="-z-10 object-cover object-[50%_45%] lg:object-[50%_70%]"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#1e1a16]/90 via-[#1e1a16]/35 to-transparent" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#1e1a16]/70 via-[#1e1a16]/20 to-transparent" />

          <div className="w-full px-6 pb-10 pt-40 sm:px-12 sm:pb-14 lg:px-16 lg:pb-16" style={{ color: C.plaster }}>
            <p className={`${L} text-[0.95rem]`} style={{ color: C.gold }}>
              Isinya · Kajiado County · Kenya
            </p>
            <h1 className={`${D} mt-5 max-w-3xl text-[3.2rem] font-medium leading-[0.98] tracking-[-0.03em] sm:text-[4.8rem] lg:text-[6rem]`}>
              Own livestock,
              <br />
              raised on <em className="font-normal" style={{ color: C.gold }}>our land.</em>
            </h1>
            <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <p className="max-w-lg text-[1.1rem] leading-relaxed opacity-90">
                Sheep, goats and cattle fed on fodder we grow ourselves and cared for by our own team — with every
                weigh-in, treatment and shilling recorded for you to see.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="/early-access" className={`${L} inline-flex h-14 items-center justify-center rounded-full px-8 text-[1.05rem] font-bold`} style={{ background: C.plaster, color: C.hide }}>
                  Register interest
                </Link>
                <a href="#animals" className={`${L} inline-flex h-14 items-center justify-center rounded-full border-2 px-8 text-[1.05rem] font-bold`} style={{ borderColor: `${C.plaster}80` }}>
                  See the animals
                </a>
              </div>
            </div>
            <dl className={`${L} mt-12 grid max-w-xl grid-cols-3 gap-6 border-t pt-6 text-[0.85rem]`} style={{ borderColor: `${C.plaster}33` }}>
              {[
                [`${farm.acres}`, "Acres in Isinya"],
                [`${farm.beds}`, "Fodder beds"],
                ["4", "Feed crops"],
              ].map(([v, k]) => (
                <div key={k}>
                  <dd className="text-[2rem] font-bold leading-none tracking-normal">{v}</dd>
                  <dt className="mt-1.5 opacity-75">{k}</dt>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Animals */}
      <section id="animals" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-24 sm:py-28">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className={`${D} max-w-2xl text-[2.6rem] font-medium leading-[1] tracking-[-0.025em] sm:text-[3.8rem]`}>
            Three animals. One standard of care.
          </h2>
          <p className="max-w-sm leading-relaxed" style={{ color: C.mute }}>
            We&apos;re preparing to raise breeds that thrive in Kajiado. Register for the ones you want and we&apos;ll call you first.
          </p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {species.map((s) => {
            const photo = photos[s.photo];
            return (
              <Link
                key={s.id}
                href={`/early-access?interest=${s.id}`}
                className="group relative isolate flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-[2rem] p-6 sm:p-7"
                style={{ color: C.plaster }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="-z-10 object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  style={{ objectPosition: photo.position }}
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#1e1a16]/85 via-[#1e1a16]/10 to-transparent" />
                <span className={`${L} self-start rounded-full px-3 py-1.5 text-[0.8rem] font-bold`} style={{ background: C.plaster, color: C.hide }}>
                  Opening after launch
                </span>
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className={`${D} text-[2.6rem] font-medium leading-none`}>{s.name}</p>
                    <p className={`${L} mt-2 text-[0.9rem] opacity-85`}>
                      {s.sw} · {s.breeds}
                    </p>
                  </div>
                  <span className={`${L} shrink-0 text-[0.9rem] font-bold underline underline-offset-4`}>Register →</span>
                </div>
              </Link>
            );
          })}
        </div>
        <p className="mt-4 text-xs" style={{ color: C.mute }}>
          Breed photography for illustration. Animals are not yet available.
        </p>
      </section>

      {/* A day at Tangama */}
      <section id="care" className="scroll-mt-24" style={{ background: C.bark, color: C.plaster }}>
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-28">
          <p className={`${L} text-[0.95rem] font-semibold`} style={{ color: C.gold }}>
            How every animal will be cared for
          </p>
          <h2 className={`${D} mt-5 max-w-3xl text-[2.6rem] font-medium leading-[1] tracking-[-0.025em] sm:text-[3.8rem]`}>
            A day at Tangama.
          </h2>
          <ol className="mt-14 grid gap-px overflow-hidden rounded-[2rem] sm:grid-cols-2 lg:grid-cols-5" style={{ background: `${C.plaster}22` }}>
            {day.map((d, i) => (
              <li key={d.time} className="p-7" style={{ background: C.bark }}>
                <span className={`${L} text-[0.95rem] font-bold`} style={{ color: C.gold }}>
                  {String(i + 1).padStart(2, "0")} · {d.time}
                </span>
                <p className={`${D} mt-8 text-[1.6rem] font-medium leading-tight`}>{d.title}</p>
                <p className="mt-3 text-[0.95rem] leading-relaxed opacity-70">{d.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* The record card */}
      <section className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-24 sm:py-32 lg:grid-cols-2">
        <div>
          <p className={`${L} text-[0.95rem] font-semibold`} style={{ color: C.clay }}>
            Your animal&apos;s record
          </p>
          <h2 className={`${D} mt-5 text-[2.6rem] font-medium leading-[1] tracking-[-0.025em] sm:text-[3.8rem]`}>
            Written down. Every time.
          </h2>
          <ul className="mt-8 space-y-5">
            {[
              ["Ear tag", "A permanent ID from the day the animal arrives."],
              ["Weigh-ins", "Weighed regularly, so you see it grow."],
              ["Health", "Every vaccination and treatment, dated."],
              ["Costs", "Feed, vet and purchase in KES — what was spent, never promises."],
            ].map(([t, b]) => (
              <li key={t} className="flex gap-5 border-t pt-5" style={{ borderColor: `${C.hide}22` }}>
                <span className={`${L} w-28 shrink-0 text-[1rem] font-bold`}>{t}</span>
                <span className="leading-relaxed" style={{ color: C.mute }}>
                  {b}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-lg">
          
          <article className="relative rounded-[10px] p-7 sm:p-9" style={{ background: "#FFFFFF", border: "1px solid #E3DFD7", boxShadow: "0 24px 48px -32px rgba(28,27,25,0.25)" }}>
            <div className="flex items-start justify-between">
              <div>
                <p className={`${L} text-[0.8rem] font-bold`} style={{ color: C.mute }}>
                  Stock card
                </p>
                <p className={`${D} mt-1 text-[2rem] font-medium leading-none`}>Dorper ram</p>
              </div>
              <span className={`${L} -rotate-6 rounded-md border-2 px-2.5 py-1 text-[0.8rem] font-bold`} style={{ borderColor: C.clay, color: C.clay }}>
                Sample
              </span>
            </div>
            <div className="mt-6 flex items-center gap-4">
              <span className="flex h-16 w-14 flex-col items-center rounded-[45%_45%_20%_20%] pt-2" style={{ background: "#ECE8E1" }}>
                <span className="size-2.5 rounded-full" style={{ background: "#FBF5EA" }} />
                <span className="mt-1.5 font-mono text-[0.55rem] font-semibold text-black/60">TGM-SH</span>
                <span className="font-mono text-sm font-bold text-black/80">0012</span>
              </span>
              <dl className={`${L} grid flex-1 grid-cols-2 gap-y-1 text-[0.85rem] font-semibold`} style={{ color: C.mute }}>
                <dt>Arrived</dt>
                <dd style={{ color: C.hide }}>22 Jun 2026</dd>
                <dt>Pen</dt>
                <dd style={{ color: C.hide }}>Isinya · 2</dd>
              </dl>
            </div>
            <table className="mt-6 w-full text-left">
              <thead>
                <tr className={`${L} text-[0.8rem] font-bold`} style={{ color: C.mute }}>
                  <th className="border-b-2 py-2 font-bold" style={{ borderColor: C.hide }}>
                    Date
                  </th>
                  <th className="border-b-2 py-2 font-bold" style={{ borderColor: C.hide }}>
                    Entry
                  </th>
                  <th className="border-b-2 py-2 text-right font-bold" style={{ borderColor: C.hide }}>
                    Weight
                  </th>
                </tr>
              </thead>
              <tbody className={`${D} text-[1.05rem]`}>
                {[
                  ["22 Jun", "Arrived · dewormed", "28.4 kg"],
                  ["01 Jul", "PPR vaccination", "—"],
                  ["17 Aug", "Weigh-in", "37.6 kg"],
                  ["12 Oct", "Weigh-in · healthy", "46.8 kg"],
                ].map(([d, e, w]) => (
                  <tr key={d} className="border-b" style={{ borderColor: `${C.hide}1f` }}>
                    <td className="py-2.5 italic" style={{ color: C.mute }}>
                      {d}
                    </td>
                    <td className="py-2.5">{e}</td>
                    <td className="py-2.5 text-right">{w}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className={`${L} mt-5 text-right text-[0.85rem] font-bold`} style={{ color: C.clay }}>
              Gained +18.4 kg since arrival
            </p>
          </article>
        </div>
      </section>

      {/* Feed first */}
      <section id="farm" className="relative scroll-mt-24 overflow-hidden border-y" style={{ background: C.grass, color: C.hide, borderColor: "#E3DFD7" }}>
        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-24 sm:py-28 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <div>
            <p className={`${L} text-[0.95rem] font-semibold`} style={{ color: C.clay }}>
              Where we are today
            </p>
            <h2 className={`${D} mt-5 text-[2.6rem] font-medium leading-[1] tracking-[-0.025em] sm:text-[3.8rem]`}>
              Feed first. Then the herd.
            </h2>
            <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed ">
              Before any animal arrives, we&apos;re growing the feed that will raise it: Sugargraze, Super Napier, alfalfa
              and desmodium on our farm in Isinya.
            </p>
          </div>
          <dl className="grid grid-cols-3 gap-6">
            {[
              [`${farm.acres}`, "Acres"],
              [`${farm.beds}`, "Fodder beds"],
              ["4", "Feed crops"],
            ].map(([v, k]) => (
              <div key={k}>
                <dd className={`${L} text-[3.6rem] font-bold leading-none tracking-[0] sm:text-[5rem]`}>{v}</dd>
                <dt className={`${L} mt-2 text-[0.9rem] font-semibold `}>{k}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Qurbani */}
      <section id="qurbani" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-24">
        <div className="grid overflow-hidden rounded-[2rem] border lg:grid-cols-2" style={{ background: C.straw, borderColor: "#E3DFD7" }}>
          <div className="relative min-h-[320px] lg:min-h-[520px]">
            <Image
              src={photos.goat.src}
              alt={photos.goat.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              style={{ objectPosition: photos.goat.position }}
            />
          </div>
          <div className="flex flex-col justify-center px-8 py-12 sm:px-14">
            <p className={`${L} text-[0.95rem]`} style={{ color: C.clay }}>
              Seasonal · planned
            </p>
            <h2 className={`${D} mt-4 text-[2.6rem] font-medium leading-[1] tracking-[-0.025em] sm:text-[3.6rem]`}>Qurbani, from a farm you know.</h2>
            <p className="mt-5 max-w-md leading-relaxed" style={{ color: C.mute }}>
              Healthy, well-fed goats and sheep reserved ahead of Eid al-Adha, prepared and delivered by our team.
            </p>
            <Link href="/early-access?interest=qurbani" className={`${L} mt-8 inline-flex h-14 items-center self-start rounded-full px-8 text-[1.05rem] font-bold`} style={{ background: C.hide, color: C.plaster }}>
              Notify me for Qurbani
            </Link>
          </div>
        </div>
      </section>

      {/* Investors */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid items-center gap-10 border-y py-14 lg:grid-cols-[1.3fr_1fr]" style={{ borderColor: C.hide }}>
          <div>
            <p className={`${L} text-[0.95rem]`} style={{ color: C.clay }}>
              For Kenyan investors and chamas
            </p>
            <h2 className={`${D} mt-4 max-w-2xl text-[2.6rem] font-medium leading-[1] tracking-[-0.025em] sm:text-[3.4rem]`}>
              Build Tangama with us.
            </h2>
            <p className="mt-5 max-w-lg leading-relaxed" style={{ color: C.mute }}>
              Our investor brief sets out the opportunity, the model, exactly where we are today, and how capital will be
              governed.
            </p>
          </div>
          <Link
            href="/investors"
            className={`${L} inline-flex h-14 items-center justify-center self-start rounded-full px-8 text-[1.05rem] font-bold lg:justify-self-end`}
            style={{ background: C.hide, color: C.plaster }}
          >
            Read the investor brief
          </Link>
        </div>
      </section>

      {/* Closing */}
      <section className="border-t" style={{ background: C.plaster, color: C.hide, borderColor: "#E3DFD7" }}>
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <div className="flex justify-center">
            <BrandMark size={56} />
          </div>
          <h2 className={`${D} mx-auto mt-8 max-w-3xl text-[2.8rem] font-medium leading-[1] tracking-[-0.025em] sm:text-[4.4rem]`}>
            Be first in line when the herd arrives.
          </h2>
          <p className="mx-auto mt-5 max-w-md opacity-85">No payment, no commitment. We&apos;ll call you when programmes open.</p>
          <Link href="/early-access" className={`${L} mt-10 inline-flex h-14 items-center rounded-full px-9 text-[1.05rem] font-bold`} style={{ background: C.bark, color: C.plaster }}>
            Register interest
          </Link>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
