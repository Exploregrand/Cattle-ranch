import { Instrument_Serif, Inter_Tight } from "next/font/google";
import Link from "next/link";

import { ConceptSwitcher } from "@/components/concepts/switcher";
import { Contours } from "@/components/concepts/contours";
import { farm } from "@/content/site";

const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--t-serif" });
const sans = Inter_Tight({ subsets: ["latin"], variable: "--t-sans" });

/* Palette — bone paper, ink, Kajiado red earth */
const C = {
  bone: "#F1ECE3",
  paper: "#F7F3EC",
  ink: "#191613",
  earth: "#A8482A",
  ochre: "#C68A3E",
  clay: "#4E2516",
  mute: "#776C61",
  rule: "#D9D0C2",
};

function HornMark({ size = 30, color = C.ink }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M24 20C14.5 20 6.5 17 6.5 9.5c0-3 2.6-4.6 5-3" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M24 20c9.5 0 17.5-3 17.5-10.5 0-3-2.6-4.6-5-3" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M24 20v22" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <circle cx="24" cy="20" r="2.6" fill={color} />
    </svg>
  );
}

function Logo({ light = false }: { light?: boolean }) {
  const color = light ? C.bone : C.ink;
  return (
    <span className="inline-flex items-center gap-3">
      <HornMark color={color} />
      <span className="leading-none">
        <span className="block font-[family-name:var(--t-serif)] text-[1.35rem] tracking-[0.16em]" style={{ color }}>
          TANGAMA
        </span>
        <span className="mt-1 block text-[0.56rem] font-medium tracking-[0.5em]" style={{ color: light ? C.ochre : C.earth }}>
          LIVESTOCK
        </span>
      </span>
    </span>
  );
}

const principles = [
  { n: "01", title: "Every animal, identified", body: "A permanent ear-tag ID, breed, age and origin — recorded on the day it arrives." },
  { n: "02", title: "Every weigh-in, kept", body: "Growth measured on a regular schedule and plotted from intake to outcome." },
  { n: "03", title: "Every treatment, dated", body: "Vaccinations, checks and care logged by the farm team, visible to the owner." },
  { n: "04", title: "Every shilling, itemised", body: "Purchase, feed and veterinary costs in KES. Records of what was spent — never promises." },
];

export default function TerraConcept() {
  return (
    <div
      className={`${serif.variable} ${sans.variable} min-h-screen overflow-x-hidden font-[family-name:var(--t-sans)] antialiased`}
      style={{ background: C.bone, color: C.ink }}
    >
      {/* Navigation */}
      <header className="mx-auto flex max-w-[1320px] items-center justify-between px-6 py-6 sm:px-10">
        <Logo />
        <nav className="hidden items-center gap-10 text-[0.8rem] tracking-[0.08em] md:flex" style={{ color: C.mute }}>
          <a href="#principle">Principle</a>
          <a href="#record">The record</a>
          <a href="#farm">The farm</a>
        </nav>
        <Link href="/early-access" className="text-[0.8rem] tracking-[0.08em] underline decoration-1 underline-offset-[6px]">
          Early access →
        </Link>
      </header>

      {/* Hero */}
      <section className="mx-auto grid max-w-[1320px] gap-12 px-6 pb-20 pt-8 sm:px-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:pb-28 lg:pt-14">
        <div className="flex flex-col justify-center">
          <div>
            <p className="flex items-center gap-4 text-[0.72rem] font-medium tracking-[0.3em]" style={{ color: C.earth }}>
              <span className="h-px w-10" style={{ background: C.earth }} />
              ISINYA · KAJIADO COUNTY · KENYA
            </p>
            <h1 className="mt-10 font-[family-name:var(--t-serif)] text-[3.6rem] leading-[0.95] tracking-[-0.02em] sm:text-[5.4rem] lg:text-[6.6rem]">
              Livestock,
              <br />
              <em className="italic" style={{ color: C.earth }}>
                owned
              </em>{" "}
              with
              <br />
              total clarity.
            </h1>
          </div>
          <div className="mt-12 max-w-md">
            <p className="text-[1.08rem] leading-relaxed" style={{ color: C.mute }}>
              Tangama Livestock is building a new way to own sheep, goats and cattle — raised on our own fodder in
              Isinya, with a complete, dated record of every animal in your hands.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-6">
              <Link href="/early-access" className="inline-flex h-14 items-center rounded-full px-8 text-[0.95rem] font-medium" style={{ background: C.ink, color: C.bone }}>
                Request early access
              </Link>
              <a href="#principle" className="text-[0.95rem] underline decoration-1 underline-offset-[6px]">
                How it works
              </a>
            </div>
          </div>
        </div>

        {/* Arched art panel */}
        <figure className="relative">
          <div
            className="relative aspect-[4/5] overflow-hidden rounded-t-[999px]"
            style={{ background: `radial-gradient(120% 90% at 50% 100%, ${C.clay} 0%, ${C.earth} 45%, ${C.ochre} 100%)` }}
          >
            <Contours stroke={C.bone} className="absolute inset-0 h-full w-full opacity-55 mix-blend-soft-light" />
            <div className="absolute inset-x-0 bottom-0 h-1/3" style={{ background: `linear-gradient(to top, ${C.clay}, transparent)` }} />
            <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between" style={{ color: C.bone }}>
              <p className="font-[family-name:var(--t-serif)] text-3xl leading-none sm:text-4xl">
                {farm.acres}
                <span className="ml-2 text-base tracking-[0.2em]">ACRES</span>
              </p>
              <p className="text-right text-[0.65rem] tracking-[0.28em] opacity-80">
                1°40′ S
                <br />
                36°51′ E
              </p>
            </div>
          </div>
          <figcaption className="mt-4 flex justify-between text-[0.7rem] tracking-[0.2em]" style={{ color: C.mute }}>
            <span>PL. I — THE LAND, IN CONTOUR</span>
            <span>ILLUSTRATION</span>
          </figcaption>
        </figure>
      </section>

      {/* Marquee */}
      <div className="overflow-hidden border-y py-6" style={{ borderColor: C.rule }}>
        <div className="flex w-max animate-[marquee_38s_linear_infinite] gap-14 whitespace-nowrap font-[family-name:var(--t-serif)] text-4xl italic sm:text-5xl">
          {[0, 1].map((k) =>
            ["Sugargraze", "Super Napier", "Alfalfa", "Desmodium", "Grown in Isinya", "Fed on the farm"].map((w) => (
              <span key={`${k}-${w}`} className="flex items-center gap-14">
                {w}
                <span className="inline-block size-2 rounded-full" style={{ background: C.earth }} />
              </span>
            )),
          )}
        </div>
      </div>

      {/* Principle */}
      <section id="principle" className="mx-auto grid max-w-[1320px] gap-14 px-6 py-24 sm:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:py-32">
        <div>
          <p className="text-[0.72rem] font-medium tracking-[0.3em]" style={{ color: C.earth }}>
            THE PRINCIPLE
          </p>
          <h2 className="mt-6 font-[family-name:var(--t-serif)] text-[2.8rem] leading-[1] tracking-[-0.01em] sm:text-[3.8rem]">
            Nothing about your animal is left to trust alone.
          </h2>
        </div>
        <ol className="border-t" style={{ borderColor: C.ink }}>
          {principles.map((p) => (
            <li key={p.n} className="grid grid-cols-[3.5rem_1fr] gap-4 border-b py-8 sm:grid-cols-[5rem_1fr_1.1fr] sm:gap-8" style={{ borderColor: C.rule }}>
              <span className="font-[family-name:var(--t-serif)] text-2xl italic" style={{ color: C.earth }}>
                {p.n}
              </span>
              <h3 className="font-[family-name:var(--t-serif)] text-[1.7rem] leading-tight">{p.title}</h3>
              <p className="col-start-2 leading-relaxed sm:col-start-auto" style={{ color: C.mute }}>
                {p.body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* The record — certificate specimen */}
      <section id="record" style={{ background: C.ink, color: C.bone }}>
        <div className="mx-auto grid max-w-[1320px] items-center gap-16 px-6 py-24 sm:px-10 lg:grid-cols-2 lg:py-32">
          <div>
            <p className="text-[0.72rem] font-medium tracking-[0.3em]" style={{ color: C.ochre }}>
              THE RECORD
            </p>
            <h2 className="mt-6 font-[family-name:var(--t-serif)] text-[2.8rem] leading-[1] sm:text-[3.8rem]">
              A passport for every animal.
            </h2>
            <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed opacity-70">
              Each animal carries a living document: identity, growth, health, feeding and costs — kept current by the
              farm, readable by you at any hour.
            </p>
          </div>
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-3 rotate-[-3deg] rounded-[6px]" style={{ background: C.earth }} />
            <article className="relative rounded-[6px] p-8 sm:p-10" style={{ background: C.paper, color: C.ink }}>
              <div className="flex items-start justify-between">
                <HornMark size={26} />
                <span className="rounded-full border px-3 py-1 text-[0.6rem] tracking-[0.2em]" style={{ borderColor: C.rule, color: C.mute }}>
                  SPECIMEN · SAMPLE DATA
                </span>
              </div>
              <p className="mt-8 text-[0.65rem] tracking-[0.3em]" style={{ color: C.mute }}>
                ANIMAL RECORD
              </p>
              <p className="mt-2 font-[family-name:var(--t-serif)] text-[2.6rem] leading-none">Dorper ram</p>
              <p className="mt-2 font-mono text-sm tracking-[0.15em]" style={{ color: C.earth }}>
                TGM–SH–0012
              </p>
              <dl className="mt-8 grid grid-cols-2 gap-x-6 border-t text-sm" style={{ borderColor: C.rule }}>
                {[
                  ["Intake", "22 Jun 2026"],
                  ["Intake weight", "28.4 kg"],
                  ["Latest weight", "46.8 kg"],
                  ["Vaccinations", "PPR · ET"],
                  ["Location", "Isinya · Pen 2"],
                  ["Costs to date", "KES 19,050"],
                ].map(([k, v]) => (
                  <div key={k} className="border-b py-3" style={{ borderColor: C.rule }}>
                    <dt className="text-[0.62rem] tracking-[0.22em]" style={{ color: C.mute }}>
                      {k.toUpperCase()}
                    </dt>
                    <dd className="mt-1 font-[family-name:var(--t-serif)] text-xl">{v}</dd>
                  </div>
                ))}
              </dl>
              <svg viewBox="0 0 300 60" className="mt-6 w-full" aria-hidden="true">
                <path d="M2 54 C 60 48, 90 40, 130 32 S 220 14, 298 6" fill="none" stroke={C.earth} strokeWidth="1.6" />
                {[2, 60, 130, 200, 298].map((x, i) => (
                  <circle key={x} cx={x} cy={[54, 47, 32, 19, 6][i]} r="3" fill={C.paper} stroke={C.earth} strokeWidth="1.4" />
                ))}
              </svg>
            </article>
          </div>
        </div>
      </section>

      {/* Farm */}
      <section id="farm" className="mx-auto max-w-[1320px] px-6 py-24 sm:px-10 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <p className="text-[0.72rem] font-medium tracking-[0.3em]" style={{ color: C.earth }}>
              THE FARM — WHERE WE ARE TODAY
            </p>
            <h2 className="mt-6 font-[family-name:var(--t-serif)] text-[2.8rem] leading-[1] sm:text-[3.8rem]">
              Feed first. <em style={{ color: C.earth }}>Then</em> the herd.
            </h2>
            <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed" style={{ color: C.mute }}>
              Before a single animal arrives, we are growing the feed that will raise it — energy grasses and
              protein legumes across 120 beds.
            </p>
          </div>
          <dl className="grid grid-cols-3 border-t" style={{ borderColor: C.ink }}>
            {[
              [`${farm.acres}`, "Acres"],
              [`${farm.beds}`, "Beds"],
              [`${farm.fodder.length}`, "Crops"],
            ].map(([v, k]) => (
              <div key={k} className="border-r py-6 pr-4 last:border-r-0 sm:pr-6" style={{ borderColor: C.rule }}>
                <dd className="font-[family-name:var(--t-serif)] text-[3.2rem] leading-none sm:text-[4.6rem]">{v}</dd>
                <dt className="mt-3 text-[0.68rem] tracking-[0.3em]" style={{ color: C.mute }}>
                  {k.toUpperCase()}
                </dt>
              </div>
            ))}
          </dl>
        </div>
        <div className="mt-16 grid grid-cols-3 gap-4 sm:gap-8">
          {farm.sections.map((s) => (
            <div key={s.id}>
              <div className="grid grid-cols-8 gap-[3px] sm:gap-1.5">
                {Array.from({ length: s.beds }).map((_, i) => (
                  <span key={i} className="aspect-[1/1.5] rounded-[1px] border" style={{ borderColor: C.ink }} />
                ))}
              </div>
              <p className="mt-3 text-[0.68rem] tracking-[0.3em]" style={{ color: C.mute }}>
                SECTION {s.id} · {s.beds}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Closing */}
      <section className="relative overflow-hidden" style={{ background: C.earth, color: C.bone }}>
        <Contours stroke={C.bone} rings={14} className="absolute inset-0 h-full w-full opacity-20" />
        <div className="relative mx-auto max-w-[1320px] px-6 py-24 text-center sm:px-10 lg:py-32">
          <div className="flex justify-center">
            <HornMark size={44} color={C.bone} />
          </div>
          <h2 className="mx-auto mt-8 max-w-3xl font-[family-name:var(--t-serif)] text-[2.8rem] leading-[1] sm:text-[4.4rem]">
            Be among the first owners.
          </h2>
          <p className="mx-auto mt-5 max-w-md opacity-80">
            Programmes open after legal review. No payment, no commitment — just your name on the list.
          </p>
          <Link href="/early-access" className="mt-10 inline-flex h-14 items-center rounded-full px-9 font-medium" style={{ background: C.bone, color: C.ink }}>
            Request early access
          </Link>
        </div>
      </section>
      <footer className="mx-auto flex max-w-[1320px] flex-col gap-4 px-6 py-10 text-[0.72rem] tracking-[0.12em] sm:flex-row sm:justify-between sm:px-10" style={{ color: C.mute }}>
        <Logo />
        <p className="max-w-md sm:text-right">
          Pre-launch. No livestock, investments or payments are offered. Tangama Farm, Isinya.
        </p>
      </footer>
      <ConceptSwitcher current="terra" />
    </div>
  );
}
