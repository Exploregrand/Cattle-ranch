import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";

import { ConceptSwitcher } from "@/components/concepts/switcher";
import { farm } from "@/content/site";

const sans = Geist({ subsets: ["latin"], variable: "--n-sans" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--n-mono" });

/* Palette — obsidian night, dawn amber light */
const C = {
  night: "#07090A",
  deep: "#0C1011",
  panel: "rgba(255,255,255,0.035)",
  line: "rgba(255,255,255,0.09)",
  text: "#EEF0EB",
  mute: "#8C948F",
  amber: "#F4B24A",
  dawn: "#F07B4F",
};

function Mark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <defs>
        <linearGradient id="n-mark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={C.amber} />
          <stop offset="1" stopColor={C.dawn} />
        </linearGradient>
      </defs>
      <rect x="4" y="5" width="24" height="5.5" rx="2.75" fill="url(#n-mark)" />
      <rect x="13.25" y="13" width="5.5" height="6" rx="2.75" fill="url(#n-mark)" opacity="0.85" />
      <rect x="13.25" y="21.5" width="5.5" height="6" rx="2.75" fill="url(#n-mark)" opacity="0.6" />
    </svg>
  );
}

function Logo() {
  return (
    <span className="inline-flex items-center gap-2.5">
      <Mark />
      <span className="text-[1.05rem] font-semibold tracking-[-0.02em]" style={{ color: C.text }}>
        Tangama
        <span className="font-normal" style={{ color: C.mute }}>
          {" "}
          Livestock
        </span>
      </span>
    </span>
  );
}

/** Deterministic pseudo-random in [0,1). */
const rand = (i: number) => {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

/** The farm's 120 beds as a field of light, in perspective. */
function LightField() {
  return (
    <div className="pointer-events-none relative mx-auto h-[280px] w-full max-w-5xl [perspective:900px] sm:h-[400px]" aria-hidden="true">
      <div className="absolute inset-x-0 top-6 mx-auto flex w-[150%] -translate-x-[16.5%] justify-center gap-5 [transform:rotateX(58deg)] [transform-style:preserve-3d] sm:w-full sm:translate-x-0 sm:gap-8">
        {farm.sections.map((s, si) => (
          <div key={s.id} className="grid grid-cols-5 gap-1.5 sm:gap-2.5">
            {Array.from({ length: s.beds }).map((_, i) => {
              const v = rand(si * 40 + i + 3);
              const lit = v > 0.35;
              return (
                <span
                  key={i}
                  className="h-7 w-9 rounded-[5px] sm:h-11 sm:w-14"
                  style={{
                    background: lit ? `rgba(244,178,74,${0.25 + v * 0.6})` : "rgba(255,255,255,0.05)",
                    boxShadow: lit && v > 0.8 ? `0 0 28px rgba(244,178,74,0.55)` : undefined,
                    animation: lit && v > 0.88 ? `pulse-soft ${3 + v * 3}s ease-in-out infinite` : undefined,
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-0 h-40" style={{ background: `linear-gradient(to top, ${C.night}, transparent)` }} />
    </div>
  );
}

function Panel({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={`rounded-[22px] border p-6 sm:p-8 ${className}`}
      style={{ borderColor: C.line, background: `linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.015))` }}
    >
      {children}
    </div>
  );
}

export default function NightfallConcept() {
  return (
    <div
      className={`${sans.variable} ${mono.variable} relative min-h-screen overflow-hidden font-[family-name:var(--n-sans)] antialiased`}
      style={{ background: C.night, color: C.text }}
    >
      {/* Ambient dawn */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-280px] h-[720px] w-[1100px] -translate-x-1/2 rounded-full opacity-60 blur-[120px]"
        style={{ background: `radial-gradient(closest-side, ${C.dawn}55, ${C.amber}22, transparent)` }}
      />

      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Logo />
        <nav className="hidden items-center gap-8 text-sm md:flex" style={{ color: C.mute }}>
          <a href="#record" className="hover:text-white">
            The record
          </a>
          <a href="#how" className="hover:text-white">
            How it works
          </a>
          <a href="#farm" className="hover:text-white">
            Farm
          </a>
        </nav>
        <Link href="/early-access" className="rounded-full bg-white px-4 py-2 text-sm font-medium text-black">
          Early access
        </Link>
      </header>

      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pt-12 text-center sm:pt-16">
        <p
          className="mx-auto inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-[family-name:var(--n-mono)] text-[0.7rem] uppercase tracking-[0.14em]"
          style={{ borderColor: C.line, color: C.mute }}
        >
          <span className="size-1.5 animate-[pulse-soft_2.4s_ease-in-out_infinite] rounded-full" style={{ background: C.amber }} />
          Pre-launch · Isinya, Kenya
        </p>
        <h1 className="mx-auto mt-8 max-w-4xl text-[3rem] font-semibold leading-[0.98] tracking-[-0.045em] sm:text-[5rem] lg:text-[6rem]">
          Livestock ownership,
          <br />
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: `linear-gradient(90deg, ${C.text} 0%, ${C.amber} 55%, ${C.dawn} 100%)` }}
          >
            engineered for trust.
          </span>
        </h1>
        <p className="mx-auto mt-7 max-w-xl text-[1.08rem] leading-relaxed" style={{ color: C.mute }}>
          Own sheep, goats and cattle raised on our own fodder. Every weigh-in, treatment and shilling recorded —
          live on your phone.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/early-access" className="inline-flex h-12 items-center justify-center rounded-full bg-white px-7 text-[0.95rem] font-medium text-black">
            Join early access
          </Link>
          <a
            href="#how"
            className="inline-flex h-12 items-center justify-center rounded-full border px-7 text-[0.95rem]"
            style={{ borderColor: C.line, color: C.text }}
          >
            See how it works
          </a>
        </div>
      </section>

      {/* Signature visual */}
      <section id="farm" className="relative z-10 mt-6 overflow-hidden px-4 sm:mt-4">
        <LightField />
        <div className="relative mx-auto -mt-40 flex max-w-5xl flex-col items-center gap-4 sm:-mt-56 sm:flex-row sm:items-end sm:justify-center">
          <div
            className="w-full max-w-sm animate-[drift_7s_ease-in-out_infinite] rounded-[22px] border p-5 backdrop-blur-xl"
            style={{ borderColor: C.line, background: "rgba(12,16,17,0.72)" }}
          >
            <div className="flex items-center justify-between font-[family-name:var(--n-mono)] text-[0.68rem] uppercase tracking-[0.12em]" style={{ color: C.mute }}>
              <span>TGM-SH-0012</span>
              <span>Sample data</span>
            </div>
            <p className="mt-3 text-xl font-semibold tracking-[-0.02em]">Dorper ram</p>
            <div className="mt-4 flex items-end justify-between">
              <div>
                <p className="text-xs" style={{ color: C.mute }}>
                  Latest weight
                </p>
                <p className="font-[family-name:var(--n-mono)] text-3xl tracking-[-0.03em]">46.8 kg</p>
              </div>
              <p className="font-[family-name:var(--n-mono)] text-sm" style={{ color: C.amber }}>
                +18.4 kg
              </p>
            </div>
            <svg viewBox="0 0 300 70" className="mt-4 w-full" aria-hidden="true">
              <defs>
                <linearGradient id="n-line" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor={C.amber} stopOpacity="0.2" />
                  <stop offset="1" stopColor={C.amber} />
                </linearGradient>
              </defs>
              <path d="M2 64 C 50 58, 80 52, 120 42 S 210 22, 298 8" fill="none" stroke="url(#n-line)" strokeWidth="2.2" strokeLinecap="round" />
              <circle cx="298" cy="8" r="4" fill={C.amber} />
            </svg>
          </div>
          <dl className="grid w-full max-w-sm grid-cols-3 gap-2 sm:max-w-none sm:w-auto">
            {[
              [`${farm.acres}`, "acres"],
              [`${farm.beds}`, "beds"],
              ["4", "crops"],
            ].map(([v, k]) => (
              <div key={k} className="rounded-2xl border px-4 py-3 backdrop-blur-xl" style={{ borderColor: C.line, background: "rgba(12,16,17,0.72)" }}>
                <dd className="font-[family-name:var(--n-mono)] text-xl">{v}</dd>
                <dt className="text-[0.7rem]" style={{ color: C.mute }}>
                  {k}
                </dt>
              </div>
            ))}
          </dl>
        </div>
        <p className="mx-auto mt-6 max-w-5xl text-center font-[family-name:var(--n-mono)] text-[0.65rem] uppercase tracking-[0.16em]" style={{ color: C.mute }}>
          Our 120 fodder beds, Sections A–C · Interface preview with sample data
        </p>
      </section>

      {/* Record bento */}
      <section id="record" className="relative z-10 mx-auto max-w-6xl px-6 py-28 sm:py-36">
        <p className="font-[family-name:var(--n-mono)] text-[0.72rem] uppercase tracking-[0.16em]" style={{ color: C.amber }}>
          The record
        </p>
        <h2 className="mt-4 max-w-2xl text-[2.4rem] font-semibold leading-[1.02] tracking-[-0.04em] sm:text-[3.4rem]">
          Everything about your animal. Nothing hidden.
        </h2>
        <div className="mt-14 grid gap-4 lg:grid-cols-6">
          <Panel className="lg:col-span-4">
            <p className="text-sm" style={{ color: C.mute }}>
              Growth
            </p>
            <p className="mt-1 text-2xl font-semibold tracking-[-0.03em]">Weigh-ins from intake to outcome</p>
            <svg viewBox="0 0 640 160" className="mt-8 w-full" aria-hidden="true">
              {[40, 80, 120].map((y) => (
                <line key={y} x1="0" x2="640" y1={y} y2={y} stroke="rgba(255,255,255,0.06)" />
              ))}
              <path d="M0 150 C 120 140, 200 120, 300 96 S 500 40, 640 18" fill="none" stroke={C.amber} strokeWidth="2.5" />
              <path d="M0 150 C 120 140, 200 120, 300 96 S 500 40, 640 18 L640 160 L0 160Z" fill={C.amber} opacity="0.07" />
            </svg>
          </Panel>
          <Panel className="lg:col-span-2">
            <p className="text-sm" style={{ color: C.mute }}>
              Identity
            </p>
            <p className="mt-1 text-2xl font-semibold tracking-[-0.03em]">One ID for life</p>
            <p className="mt-10 font-[family-name:var(--n-mono)] text-[2rem] tracking-[0.04em]" style={{ color: C.amber }}>
              TGM-CT-0003
            </p>
          </Panel>
          <Panel className="lg:col-span-3">
            <p className="text-sm" style={{ color: C.mute }}>
              Health
            </p>
            <p className="mt-1 text-2xl font-semibold tracking-[-0.03em]">Every treatment, dated</p>
            <ol className="mt-6 space-y-3 font-[family-name:var(--n-mono)] text-sm">
              {["24 Jun  Foot-and-mouth vaccine", "08 Jul  Lumpy skin vaccine", "10 Sep  Tick control"].map((r) => (
                <li key={r} className="flex items-center gap-3" style={{ color: C.mute }}>
                  <span className="size-1.5 rounded-full" style={{ background: C.amber }} />
                  {r}
                </li>
              ))}
            </ol>
          </Panel>
          <Panel className="lg:col-span-3">
            <p className="text-sm" style={{ color: C.mute }}>
              Ledger
            </p>
            <p className="mt-1 text-2xl font-semibold tracking-[-0.03em]">Costs, never projections</p>
            <dl className="mt-6 divide-y font-[family-name:var(--n-mono)] text-sm" style={{ borderColor: C.line }}>
              {[
                ["Purchase", "KES 14,500"],
                ["Feed", "KES 3,700"],
                ["Veterinary", "KES 850"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between py-2.5" style={{ borderColor: C.line }}>
                  <dt style={{ color: C.mute }}>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </Panel>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="relative z-10 border-y" style={{ borderColor: C.line, background: C.deep }}>
        <div className="mx-auto max-w-6xl px-6 py-24">
          <h2 className="text-[2.2rem] font-semibold tracking-[-0.04em] sm:text-[3rem]">Four steps. Fully recorded.</h2>
          <ol className="mt-12 grid gap-px overflow-hidden rounded-[22px] border sm:grid-cols-2 lg:grid-cols-4" style={{ borderColor: C.line, background: C.line }}>
            {[
              ["Choose", "Pick a programme with clear terms and costs."],
              ["Review", "See the animal's ID, breed, age and health first."],
              ["Follow", "Weights, care and photos arrive in your app."],
              ["Receive", "The animal, documented proceeds, or agreed outcome."],
            ].map(([t, b], i) => (
              <li key={t} className="p-7" style={{ background: C.deep }}>
                <span className="font-[family-name:var(--n-mono)] text-xs" style={{ color: C.amber }}>
                  0{i + 1}
                </span>
                <p className="mt-6 text-xl font-semibold tracking-[-0.02em]">{t}</p>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: C.mute }}>
                  {b}
                </p>
              </li>
            ))}
          </ol>
          <p className="mt-6 font-[family-name:var(--n-mono)] text-[0.7rem] uppercase tracking-[0.14em]" style={{ color: C.mute }}>
            Planned · opens after legal review · no guaranteed returns
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 px-6 py-28 text-center sm:py-36">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[380px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-[100px]"
          style={{ background: `radial-gradient(closest-side, ${C.amber}55, transparent)` }}
        />
        <div className="relative flex justify-center">
          <Mark size={44} />
        </div>
        <h2 className="relative mx-auto mt-8 max-w-2xl text-[2.6rem] font-semibold leading-[1] tracking-[-0.045em] sm:text-[4rem]">
          Be first when the herd arrives.
        </h2>
        <Link href="/early-access" className="relative mt-10 inline-flex h-12 items-center rounded-full bg-white px-7 font-medium text-black">
          Join early access
        </Link>
      </section>
      <footer className="relative z-10 mx-auto flex max-w-6xl flex-col gap-3 border-t px-6 py-8 text-xs sm:flex-row sm:justify-between" style={{ borderColor: C.line, color: C.mute }}>
        <Logo />
        <p>Pre-launch. No livestock, investments or payments are offered.</p>
      </footer>
      <ConceptSwitcher current="nightfall" />
    </div>
  );
}
