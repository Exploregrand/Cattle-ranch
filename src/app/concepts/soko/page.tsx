import { Bricolage_Grotesque } from "next/font/google";
import Link from "next/link";

import { ConceptSwitcher } from "@/components/concepts/switcher";
import { farm } from "@/content/site";

const font = Bricolage_Grotesque({ subsets: ["latin"], variable: "--s-font" });

/* Palette — Kajiado soil, cream, cobalt, ear-tag yellow */
const C = {
  soil: "#8B3A22",
  soilDeep: "#5F2414",
  cream: "#FBF6EE",
  sand: "#F1E8DA",
  ink: "#1B1A17",
  mute: "#76705F",
  cobalt: "#2442B5",
  tag: "#F2B935",
  sage: "#DCE3D6",
  clay: "#EBD9C9",
};

/** Fine grain + mottling so the backdrop reads as earth, not flat colour. */
const soilTexture = {
  backgroundColor: C.soil,
  backgroundImage: `radial-gradient(60% 50% at 20% 10%, rgba(255,190,150,0.16), transparent 70%), radial-gradient(50% 60% at 85% 70%, rgba(40,10,0,0.35), transparent 70%), url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.15 0 0 0 0 0.05 0 0 0 0 0 0 0 0 0.35 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`,
};

function Mark({ size = 30, on = "soil" }: { size?: number; on?: "soil" | "cream" }) {
  const beads = [
    [0, 0, C.tag],
    [1, 0, on === "soil" ? C.cream : C.cobalt],
    [2, 0, C.tag],
    [3, 0, on === "soil" ? C.cream : C.cobalt],
    [4, 0, C.tag],
    [2, 1, on === "soil" ? C.cream : C.cobalt],
    [2, 2, C.tag],
    [2, 3, on === "soil" ? C.cream : C.cobalt],
  ] as const;
  return (
    <svg width={size} height={size} viewBox="0 0 50 42" aria-hidden="true">
      {beads.map(([x, y, c]) => (
        <circle key={`${x}-${y}`} cx={5 + x * 10} cy={5 + y * 10.5} r="4.4" fill={c} />
      ))}
    </svg>
  );
}

function Logo({ on = "soil" }: { on?: "soil" | "cream" }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <Mark on={on} />
      <span className="leading-none" style={{ color: on === "soil" ? C.cream : C.ink }}>
        <span className="block text-[1.3rem] font-extrabold tracking-[-0.04em]">tangama</span>
        <span className="mt-1.5 block text-[0.62rem] font-semibold uppercase tracking-[0.32em] opacity-70">livestock</span>
      </span>
    </span>
  );
}

/** Ear tag — the brand's stand-in for animal photography until real photos exist. */
function EarTag({ id, color = C.tag, size = "md" }: { id: string; color?: string; size?: "sm" | "md" | "lg" }) {
  const [prefix, no] = [id.slice(0, 6), id.slice(7)];
  const dims = size === "lg" ? "h-40 w-32 pt-6" : size === "md" ? "h-24 w-20 pt-3.5" : "h-16 w-14 pt-2.5";
  const text = size === "lg" ? "text-3xl" : size === "md" ? "text-lg" : "text-sm";
  return (
    <span
      className={`relative flex ${dims} flex-col items-center rounded-[45%_45%_22%_22%] shadow-[inset_0_-5px_0_rgba(0,0,0,0.08),0_14px_22px_-12px_rgba(60,30,0,0.55)]`}
      style={{ background: color }}
    >
      <span className="size-[18%] rounded-full shadow-[inset_0_2px_3px_rgba(0,0,0,0.35)]" style={{ background: C.cream }} />
      <span className="mt-[16%] font-mono text-[0.55em] font-semibold tracking-[0.1em] text-black/60">{prefix}</span>
      <span className={`font-mono ${text} font-bold tracking-wider text-black/80`}>{no}</span>
    </span>
  );
}

function Phone({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`w-[262px] shrink-0 rounded-[2.6rem] border border-white/25 p-2 sm:w-[286px] ${className}`}>
      <div className="relative h-[560px] overflow-hidden rounded-[2.15rem] shadow-[0_40px_80px_-30px_rgba(30,8,0,0.8)] sm:h-[600px]" style={{ background: C.cream, color: C.ink }}>
        <div className="flex items-center justify-between px-6 pt-3.5 text-[11px] font-semibold">
          <span>9:41</span>
          <span className="h-[18px] w-16 rounded-full bg-black" />
          <span className="h-2 w-4 rounded-[2px] border border-black/60" />
        </div>
        {children}
      </div>
    </div>
  );
}

function BrowseScreen() {
  return (
    <>
      <div className="px-5 pb-5 pt-4" style={{ background: C.cobalt, color: C.cream }}>
        <p className="text-[10px] opacity-70">Your farm</p>
        <p className="text-sm font-semibold">Isinya, Kajiado ▾</p>
        <div className="mt-3 rounded-full bg-white/95 px-4 py-2.5 text-[11px]" style={{ color: C.mute }}>
          Search sheep, goats or cattle
        </div>
      </div>
      <div className="px-4 pt-4">
        <div className="relative overflow-hidden rounded-2xl p-4" style={{ background: C.ink, color: C.cream }}>
          <p className="text-[10px] uppercase tracking-[0.18em]" style={{ color: C.tag }}>
            Coming for Eid al-Adha
          </p>
          <p className="mt-1 text-[1.05rem] font-bold leading-tight">Qurbani,
            <br />
            reserved early.
          </p>
          <span className="absolute -right-3 -top-2 rotate-12">
            <EarTag id="TGM-GT-0101" size="sm" />
          </span>
        </div>
        <div className="mt-4 flex gap-1.5 text-[11px]">
          {["All", "Sheep", "Goats", "Cattle"].map((c, i) => (
            <span key={c} className="rounded-full px-3 py-1.5" style={i === 0 ? { background: C.ink, color: C.cream } : { background: C.sand }}>
              {c}
            </span>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          {[
            { id: "TGM-SH-0012", breed: "Dorper", kind: "Sheep", bg: C.sage, tag: C.tag },
            { id: "TGM-GT-0007", breed: "Galla", kind: "Goat", bg: C.clay, tag: "#E7E1D4" },
          ].map((a) => (
            <div key={a.id} className="overflow-hidden rounded-2xl bg-white">
              <div className="flex h-28 items-center justify-center" style={{ background: a.bg }}>
                <EarTag id={a.id} size="sm" color={a.tag} />
              </div>
              <div className="p-2.5">
                <p className="text-[11px] font-semibold">{a.breed} {a.kind.toLowerCase()}</p>
                <p className="text-[10px]" style={{ color: C.mute }}>
                  Sample listing
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <TabBar active={0} />
    </>
  );
}

function AnimalScreen() {
  return (
    <>
      <div className="relative mx-3 mt-3 flex h-56 items-center justify-center rounded-[1.6rem]" style={{ background: C.sage }}>
        <EarTag id="TGM-SH-0012" size="lg" />
        <span className="absolute left-4 top-4 text-sm">‹</span>
        <span className="absolute bottom-3 rounded-full bg-white/80 px-2.5 py-1 text-[9px]" style={{ color: C.mute }}>
          Animal photo · coming at launch
        </span>
      </div>
      <div className="px-5 pt-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-lg font-extrabold leading-tight tracking-[-0.03em]">Dorper ram</p>
            <p className="text-[11px]" style={{ color: C.mute }}>
              Tangama Farm · Isinya
            </p>
          </div>
          <span className="rounded-full px-2 py-1 text-[9px] font-semibold" style={{ background: C.sand }}>
            SAMPLE
          </span>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {[
            ["Weight", "46.8 kg"],
            ["Age", "8 months"],
            ["Breed", "Dorper"],
            ["Gained", "+18.4 kg"],
          ].map(([k, v]) => (
            <div key={k} className="rounded-xl px-3 py-2.5" style={{ background: C.sand }}>
              <p className="text-[9.5px]" style={{ color: C.mute }}>
                {k}
              </p>
              <p className="text-[13px] font-semibold">{v}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-3 rounded-xl border px-3 py-2.5" style={{ borderColor: C.sand }}>
          <span className="flex size-8 items-center justify-center rounded-full" style={{ background: C.cobalt }}>
            <Mark size={16} />
          </span>
          <div className="text-[10.5px] leading-tight">
            <p className="font-semibold">Managed by Tangama</p>
            <p style={{ color: C.mute }}>Vet records · regular weigh-ins</p>
          </div>
        </div>
        <div className="mt-4 rounded-full py-3 text-center text-[12px] font-semibold" style={{ background: C.ink, color: C.cream }}>
          Reserve · opens at launch
        </div>
      </div>
    </>
  );
}

function ReserveScreen() {
  return (
    <>
      <div className="px-5 pt-4">
        <p className="text-center text-sm font-semibold">Reservation</p>
        <div className="mt-4 flex items-center gap-3 rounded-2xl bg-white p-3">
          <span className="flex h-16 w-14 items-center justify-center rounded-xl" style={{ background: C.sage }}>
            <EarTag id="TGM-SH-0012" size="sm" />
          </span>
          <div className="text-[11px] leading-relaxed">
            <p className="font-semibold">Dorper ram · TGM-SH-0012</p>
            <p style={{ color: C.mute }}>Managed ownership · 6 months</p>
          </div>
        </div>
        <p className="mt-5 text-[11px] font-semibold">What you pay for</p>
        <dl className="mt-2 divide-y rounded-2xl bg-white px-3 text-[11px]" style={{ borderColor: C.sand }}>
          {[
            ["Animal", "Itemised at launch"],
            ["Feed & care", "Itemised monthly"],
            ["Veterinary", "As recorded"],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between py-2.5" style={{ borderColor: C.sand }}>
              <dt style={{ color: C.mute }}>{k}</dt>
              <dd className="font-medium">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-5 text-[11px] font-semibold">Pay with</p>
        <div className="mt-2 flex items-center justify-between rounded-2xl border-2 bg-white px-3 py-3" style={{ borderColor: "#3BA935" }}>
          <span className="text-[12px] font-bold" style={{ color: "#3BA935" }}>
            M-PESA
          </span>
          <span className="text-[10px]" style={{ color: C.mute }}>
            Available at launch
          </span>
        </div>
        <p className="mt-4 rounded-xl px-3 py-2.5 text-[10px] leading-snug" style={{ background: C.sand, color: C.mute }}>
          No payments are taken before launch. Tangama never promises returns.
        </p>
        <div className="mt-4 rounded-full py-3 text-center text-[12px] font-semibold" style={{ background: C.cobalt, color: C.cream }}>
          Join the waitlist
        </div>
      </div>
    </>
  );
}

function TabBar({ active }: { active: number }) {
  return (
    <div className="absolute inset-x-0 bottom-0 grid grid-cols-4 border-t bg-white px-2 pb-5 pt-2.5 text-center text-[9.5px]" style={{ borderColor: C.sand, color: C.mute }}>
      {["Home", "My herd", "Updates", "Account"].map((t, i) => (
        <span key={t} style={i === active ? { color: C.cobalt, fontWeight: 700 } : undefined}>
          <span className="mx-auto mb-1 block size-1.5 rounded-full" style={{ background: i === active ? C.cobalt : "transparent" }} />
          {t}
        </span>
      ))}
    </div>
  );
}

export default function SokoConcept() {
  return (
    <div className={`${font.variable} min-h-screen font-[family-name:var(--s-font)] antialiased`} style={{ background: C.cream, color: C.ink }}>
      {/* Hero on red earth */}
      <section className="relative overflow-hidden" style={soilTexture}>
        <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <Logo />
          <nav className="hidden gap-8 text-sm font-medium md:flex" style={{ color: `${C.cream}cc` }}>
            <a href="#browse">Browse</a>
            <a href="#qurbani">Qurbani</a>
            <a href="#how">How it works</a>
          </nav>
          <Link href="/early-access" className="rounded-full px-5 py-2.5 text-sm font-bold" style={{ background: C.tag, color: C.ink }}>
            Get early access
          </Link>
        </header>

        <div className="relative z-10 mx-auto max-w-7xl px-6 pb-0 pt-10 text-center sm:pt-16">
          <p className="mx-auto inline-flex rounded-full bg-black/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: C.tag }}>
            Isinya · Kajiado · Kenya
          </p>
          <h1 className="mx-auto mt-6 max-w-4xl text-[3.2rem] font-extrabold leading-[0.92] tracking-[-0.055em] sm:text-[5.6rem] lg:text-[7rem]" style={{ color: C.cream }}>
            Your herd,
            <br />
            in your pocket.
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed" style={{ color: `${C.cream}cc` }}>
            Browse, own and follow sheep, goats and cattle raised on Tangama&apos;s own fodder — every weigh-in and vet
            visit, right on your phone.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/early-access" className="inline-flex h-14 items-center justify-center rounded-full px-8 text-base font-bold" style={{ background: C.cream, color: C.ink }}>
              Join the waitlist
            </Link>
            <a href="#how" className="inline-flex h-14 items-center justify-center rounded-full border-2 px-8 text-base font-semibold" style={{ borderColor: `${C.cream}66`, color: C.cream }}>
              How it works
            </a>
          </div>

          {/* Phone trio */}
          <div className="relative mt-16 flex justify-center gap-5 overflow-x-auto pb-0 [scrollbar-width:none] sm:overflow-visible lg:gap-8">
            <Phone className="hidden translate-y-16 -rotate-[4deg] md:block">
              <BrowseScreen />
            </Phone>
            <Phone className="z-10">
              <AnimalScreen />
            </Phone>
            <Phone className="hidden translate-y-16 rotate-[4deg] md:block">
              <ReserveScreen />
            </Phone>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 z-20 h-24" style={{ background: `linear-gradient(to top, ${C.cream}, transparent)` }} />
      </section>
      <p className="relative z-30 -mt-6 text-center text-xs" style={{ color: C.mute }}>
        App preview · sample data · photography to come
      </p>

      {/* Browse */}
      <section id="browse" className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-end">
          <h2 className="text-[2.6rem] font-extrabold leading-[0.95] tracking-[-0.05em] sm:text-[4rem]">
            Browse like you shop.
            <br />
            <span style={{ color: C.cobalt }}>Own like a farmer.</span>
          </h2>
          <p className="max-w-lg text-lg leading-relaxed lg:justify-self-end" style={{ color: C.mute }}>
            Every animal will have its own page: real photos, ID, weight, age, breed and health — so you choose with
            facts, not promises.
          </p>
        </div>
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {[
            { name: "Sheep", sw: "Kondoo", id: "TGM-SH-0001", bg: C.sage, tag: C.tag, breeds: "Dorper · Red Maasai" },
            { name: "Goats", sw: "Mbuzi", id: "TGM-GT-0001", bg: C.clay, tag: "#ECE6DA", breeds: "Galla · Boer" },
            { name: "Cattle", sw: "Ng'ombe", id: "TGM-CT-0001", bg: "#D9DDF0", tag: C.tag, breeds: "Boran · Sahiwal" },
          ].map((c) => (
            <Link key={c.name} href={`/early-access?interest=${c.name.toLowerCase()}`} className="group overflow-hidden rounded-[2rem]" style={{ background: c.bg }}>
              <div className="flex h-64 items-center justify-center transition-transform duration-500 group-hover:scale-[1.04]">
                <EarTag id={c.id} size="lg" color={c.tag} />
              </div>
              <div className="flex items-end justify-between bg-white/55 px-6 py-5 backdrop-blur">
                <div>
                  <p className="text-2xl font-extrabold tracking-[-0.04em]">{c.name}</p>
                  <p className="text-sm" style={{ color: C.mute }}>
                    {c.sw} · {c.breeds}
                  </p>
                </div>
                <span className="rounded-full px-3 py-1.5 text-xs font-bold" style={{ background: C.ink, color: C.cream }}>
                  Coming soon
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Qurbani */}
      <section id="qurbani" className="px-4 sm:px-6">
        <div className="relative mx-auto grid max-w-7xl overflow-hidden rounded-[2.5rem] px-8 py-14 sm:px-14 sm:py-20 lg:grid-cols-[1.2fr_1fr] lg:items-center" style={{ background: C.cobalt, color: C.cream }}>
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em]" style={{ color: C.tag }}>
              Seasonal · planned
            </p>
            <h2 className="mt-4 text-[2.6rem] font-extrabold leading-[0.95] tracking-[-0.05em] sm:text-[4rem]">Qurbani, done properly.</h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed opacity-85">
              Reserve a healthy, well-fed animal ahead of Eid al-Adha, with preparation and delivery handled by our team.
            </p>
            <Link href="/early-access?interest=qurbani" className="mt-8 inline-flex h-14 items-center rounded-full px-8 font-bold" style={{ background: C.tag, color: C.ink }}>
              Notify me for Qurbani
            </Link>
          </div>
          <div className="mt-12 flex justify-center gap-4 lg:mt-0">
            <span className="-rotate-12">
              <EarTag id="TGM-GT-0101" size="lg" />
            </span>
            <span className="mt-10 rotate-6">
              <EarTag id="TGM-SH-0102" size="lg" color={C.cream} />
            </span>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
        <h2 className="text-[2.6rem] font-extrabold tracking-[-0.05em] sm:text-[4rem]">Four taps from curious to owner.</h2>
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Browse", "Find an animal or programme that suits you."],
            ["Check", "See its ID, weight, health and full terms."],
            ["Follow", "Weigh-ins, vet visits and photos, as they happen."],
            ["Receive", "Collect it, sell it, or take the agreed outcome."],
          ].map(([t, b], i) => (
            <li key={t} className="rounded-[2rem] p-7" style={{ background: i === 3 ? C.ink : C.sand, color: i === 3 ? C.cream : C.ink }}>
              <span className="text-6xl font-extrabold tracking-[-0.06em]" style={{ color: i === 3 ? C.tag : C.cobalt }}>
                {i + 1}
              </span>
              <p className="mt-10 text-2xl font-extrabold tracking-[-0.04em]">{t}</p>
              <p className="mt-2 leading-relaxed opacity-75">{b}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Farm */}
      <section className="relative overflow-hidden" style={soilTexture}>
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-24 sm:py-28 lg:grid-cols-[1fr_1.2fr] lg:items-center" style={{ color: C.cream }}>
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em]" style={{ color: C.tag }}>
              Today on the farm
            </p>
            <h2 className="mt-4 text-[2.6rem] font-extrabold leading-[0.95] tracking-[-0.05em] sm:text-[4rem]">We grow the feed first.</h2>
            <p className="mt-5 max-w-md text-lg opacity-85">
              Sugargraze, Super Napier, alfalfa and desmodium are being established now — so every animal is raised on
              feed we control.
            </p>
          </div>
          <dl className="grid grid-cols-3 gap-3">
            {[
              [`${farm.acres}`, "acres"],
              [`${farm.beds}`, "beds"],
              ["4", "fodder crops"],
            ].map(([v, k]) => (
              <div key={k} className="rounded-[1.75rem] bg-black/20 p-5 sm:p-7">
                <dd className="text-4xl font-extrabold tracking-[-0.05em] sm:text-6xl">{v}</dd>
                <dt className="mt-2 text-sm opacity-75">{k}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <footer className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-10 text-sm sm:flex-row sm:items-center sm:justify-between" style={{ color: C.mute }}>
        <Logo on="cream" />
        <p>Pre-launch. No livestock, investments or payments are offered yet.</p>
      </footer>
      <ConceptSwitcher current="soko" />
    </div>
  );
}
