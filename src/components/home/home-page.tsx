import Link from "next/link";

import { Woodcut } from "@/components/brand/woodcut";
import { BrandMark } from "@/components/brand/wordmark";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { farm } from "@/content/site";


/* Palette — lime plaster, red clay, dry grass, pasture, acacia bark, hide */
const C = {
  plaster: "#F0E6D4",
  straw: "#E2D1AE",
  clay: "#B0502C",
  bark: "#3A2A1F",
  hide: "#1E1A16",
  grass: "#626C37",
  gold: "#CC9A42",
  mute: "#6F6253",
};

const L = "label-caps";
const D = "font-display";

/** Kraal rails — a fence-line divider. */
function Rails({ color = C.bark }: { color?: string }) {
  return (
    <svg viewBox="0 0 1200 40" preserveAspectRatio="none" className="h-8 w-full" aria-hidden="true">
      <path d="M0 12 H1200 M0 28 H1200" stroke={color} strokeWidth="3" opacity="0.8" />
      {Array.from({ length: 25 }).map((_, i) => (
        <rect key={i} x={i * 50 + 22} y="2" width="6" height="36" rx="2" fill={color} />
      ))}
    </svg>
  );
}

const day = [
  { time: "Dawn", title: "Water and a once-over", body: "Every animal counted, watered and looked over before the day begins." },
  { time: "Morning", title: "Fresh-cut fodder", body: "Sugargraze, Napier and legumes cut from our own beds and fed the same day." },
  { time: "Midday", title: "Shade and rest", body: "Out of the Kajiado sun, with water on hand." },
  { time: "Afternoon", title: "Health rounds", body: "Eyes, coat, feet and appetite checked; anything unusual goes on the record." },
  { time: "Dusk", title: "Into the boma", body: "Safely penned for the night." },
];

const species = [
  { id: "sheep", art: "sheep" as const, name: "Sheep", sw: "Kondoo", breeds: "Dorper · Red Maasai", bg: C.straw, ink: C.hide, paper: C.straw },
  { id: "goats", art: "goat" as const, name: "Goats", sw: "Mbuzi", breeds: "Galla · Boer", bg: C.grass, ink: C.plaster, paper: C.grass },
  { id: "cattle", art: "cattle" as const, name: "Cattle", sw: "Ng'ombe", breeds: "Boran · Sahiwal", bg: C.bark, ink: C.gold, paper: C.bark },
];

export function HomePage() {
  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{ background: C.plaster, color: C.hide }}
    >
      <SiteHeader />

      {/* Hero */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-6 pb-16 pt-6 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:pb-24">
        <div>
          <p className={`${L} text-[0.95rem] font-semibold`} style={{ color: C.clay }}>
            Isinya · Kajiado County · Kenya
          </p>
          <h1 className={`${D} mt-6 text-[3.3rem] font-medium leading-[0.98] tracking-[-0.03em] [font-variation-settings:'SOFT'_100] sm:text-[4.8rem] lg:text-[5.6rem]`}>
            Own livestock,
            <br />
            raised on{" "}
            <em className="font-normal" style={{ color: C.clay }}>
              our land.
            </em>
          </h1>
          <p className="mt-7 max-w-lg text-[1.1rem] leading-relaxed" style={{ color: C.mute }}>
            Sheep, goats and cattle fed on fodder we grow ourselves, cared for by our own team — and every weigh-in,
            treatment and shilling written down for you to see.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/early-access" className={`${L} inline-flex h-14 items-center justify-center rounded-full px-8 text-[1.05rem] font-bold`} style={{ background: C.clay, color: C.plaster }}>
              Register interest
            </Link>
            <a href="#care" className={`${L} inline-flex h-14 items-center justify-center rounded-full border-2 px-8 text-[1.05rem] font-bold`} style={{ borderColor: C.hide }}>
              How we care for them
            </a>
          </div>
        </div>

        <figure className="relative">
          <div className="relative aspect-square overflow-hidden rounded-[2.5rem]" style={{ background: C.clay }}>
            <div className="absolute left-1/2 top-[14%] size-[62%] -translate-x-1/2 rounded-full" style={{ background: C.gold, opacity: 0.9 }} />
            <Woodcut species="cattle" ink={C.hide} paper={C.clay} className="absolute inset-x-[10%] bottom-[8%] top-[12%] m-auto" title="Linocut of a zebu bull" />
            <div className="absolute inset-x-0 bottom-0 h-1/4" style={{ background: `linear-gradient(to top, ${C.bark}aa, transparent)` }} />
            <p className={`${L} absolute bottom-6 left-7 text-[0.9rem] font-semibold`} style={{ color: C.plaster }}>
              Ng&apos;ombe · Zebu
            </p>
            <span className={`${L} absolute right-6 top-6 rounded-full px-3 py-1 text-[0.8rem] font-bold`} style={{ background: C.plaster, color: C.clay }}>
              Opening after launch
            </span>
          </div>
        </figure>
      </section>

      <div className="px-6">
        <Rails />
      </div>

      {/* Animals */}
      <section id="animals" className="mx-auto max-w-7xl px-6 py-24">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className={`${D} max-w-2xl text-[2.6rem] font-medium leading-[1] tracking-[-0.025em] sm:text-[3.8rem]`}>
            Three animals. One standard of care.
          </h2>
          <p className="max-w-sm leading-relaxed" style={{ color: C.mute }}>
            We&apos;re preparing to raise breeds that thrive in Kajiado. Register for the ones you want and we&apos;ll call you first.
          </p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {species.map((s) => (
            <Link key={s.id} href={`/early-access?interest=${s.id}`} className="group flex flex-col overflow-hidden rounded-[2rem]" style={{ background: s.bg }}>
              <div className="flex h-80 items-center justify-center px-10 pt-10">
                <Woodcut species={s.art} ink={s.ink} paper={s.paper} className="h-full max-w-full transition-transform duration-500 group-hover:-translate-y-1.5" />
              </div>
              <div className="flex items-end justify-between gap-4 px-7 pb-7 pt-2" style={{ color: s.id === "sheep" ? C.hide : C.plaster }}>
                <div>
                  <p className={`${D} text-[2.2rem] font-medium leading-none`}>{s.name}</p>
                  <p className={`${L} mt-2 text-[0.9rem] font-semibold opacity-80`}>
                    {s.sw} · {s.breeds}
                  </p>
                </div>
                <span className={`${L} shrink-0 text-[0.85rem] font-bold underline underline-offset-4`}>Register →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* A day at Tangama */}
      <section id="care" style={{ background: C.bark, color: C.plaster }}>
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
          <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-[10px]" style={{ background: C.clay }} />
          <article className="relative rounded-[10px] p-7 sm:p-9" style={{ background: "#FBF5EA", boxShadow: "0 1px 0 rgba(0,0,0,0.05)" }}>
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
              <span className="flex h-16 w-14 flex-col items-center rounded-[45%_45%_20%_20%] pt-2" style={{ background: "#F2B935" }}>
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
      <section id="farm" className="relative overflow-hidden" style={{ background: C.grass, color: C.plaster }}>
        <svg viewBox="0 0 1200 400" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-[30%] w-full opacity-[0.16]" aria-hidden="true">
          {Array.from({ length: 18 }).map((_, i) => (
            <path key={i} d={`M${600 + (i - 9) * 8} 0 L${-400 + i * 118} 400 L${-350 + i * 118} 400 Z`} fill={C.plaster} />
          ))}
        </svg>
        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 pb-36 pt-24 sm:pb-44 sm:pt-28 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <div>
            <p className={`${L} text-[0.95rem] font-semibold`} style={{ color: C.gold }}>
              Where we are today
            </p>
            <h2 className={`${D} mt-5 text-[2.6rem] font-medium leading-[1] tracking-[-0.025em] sm:text-[3.8rem]`}>
              Feed first. Then the herd.
            </h2>
            <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed opacity-85">
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
                <dt className={`${L} mt-2 text-[0.9rem] font-semibold opacity-75`}>{k}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Qurbani */}
      <section id="qurbani" className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid items-center gap-10 overflow-hidden rounded-[2.5rem] px-8 py-12 sm:px-14 lg:grid-cols-[1.2fr_1fr]" style={{ background: C.straw }}>
          <div>
            <p className={`${L} text-[0.95rem] font-semibold`} style={{ color: C.clay }}>
              Seasonal · planned
            </p>
            <h2 className={`${D} mt-4 text-[2.6rem] font-medium leading-[1] tracking-[-0.025em] sm:text-[3.6rem]`}>Qurbani, from a farm you know.</h2>
            <p className="mt-5 max-w-md leading-relaxed" style={{ color: C.mute }}>
              Healthy, well-fed goats and sheep reserved ahead of Eid al-Adha, prepared and delivered by our team.
            </p>
            <Link href="/early-access?interest=qurbani" className={`${L} mt-8 inline-flex h-14 items-center rounded-full px-8 text-[1.05rem] font-bold`} style={{ background: C.hide, color: C.plaster }}>
              Notify me for Qurbani
            </Link>
          </div>
          <div className="flex justify-center gap-2">
            <Woodcut species="goat" ink={C.bark} paper={C.straw} className="h-56 w-auto sm:h-72" />
            <Woodcut species="sheep" ink={C.hide} paper={C.straw} className="h-40 w-auto self-end sm:h-52" />
          </div>
        </div>
      </section>

      {/* Closing */}
      <section style={{ background: C.clay, color: C.plaster }}>
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <div className="flex justify-center">
            <BrandMark size={56} />
          </div>
          <h2 className={`${D} mx-auto mt-8 max-w-3xl text-[2.8rem] font-medium leading-[1] tracking-[-0.025em] sm:text-[4.4rem]`}>
            Be first in line when the herd arrives.
          </h2>
          <p className="mx-auto mt-5 max-w-md opacity-85">No payment, no commitment. We&apos;ll call you when programmes open.</p>
          <Link href="/early-access" className={`${L} mt-10 inline-flex h-14 items-center rounded-full px-9 text-[1.05rem] font-bold`} style={{ background: C.plaster, color: C.hide }}>
            Register interest
          </Link>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
