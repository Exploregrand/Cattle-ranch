import Link from "next/link";

const directions = [
  { id: "terra", n: "I", name: "Terra", line: "Editorial luxury — bone, ink and Kajiado red earth. A printed monograph.", bg: "#F1ECE3", fg: "#191613", accent: "#A8482A" },
  { id: "nightfall", n: "II", name: "Nightfall", line: "Precision technology — obsidian and dawn amber. The farm as a field of light.", bg: "#07090A", fg: "#EEF0EB", accent: "#F4B24A" },
  { id: "soko", n: "III", name: "Soko", line: "App-first market — red soil, cream, cobalt and ear-tag yellow.", bg: "#8B3A22", fg: "#FBF6EE", accent: "#F2B935" },
];

export default function ConceptsIndex() {
  return (
    <main className="min-h-screen bg-neutral-100 px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm text-neutral-500">Tangama Livestock</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-neutral-900">Three design directions</h1>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {directions.map((d) => (
            <Link key={d.id} href={`/concepts/${d.id}`} className="flex min-h-72 flex-col justify-between rounded-3xl p-7" style={{ background: d.bg, color: d.fg }}>
              <span className="text-sm" style={{ color: d.accent }}>
                Direction {d.n}
              </span>
              <span>
                <span className="block text-4xl font-semibold tracking-tight">{d.name}</span>
                <span className="mt-3 block text-sm leading-relaxed opacity-75">{d.line}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
