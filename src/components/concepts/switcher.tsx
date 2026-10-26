import Link from "next/link";

const concepts = [
  { id: "terra", label: "I · Terra" },
  { id: "nightfall", label: "II · Nightfall" },
  { id: "soko", label: "III · Soko" },
];

/** Floating control for comparing the three design directions. */
export function ConceptSwitcher({ current }: { current: string }) {
  return (
    <nav
      aria-label="Design directions"
      className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 gap-1 rounded-full bg-black/80 p-1 text-[0.72rem] text-white shadow-2xl backdrop-blur"
    >
      {concepts.map((c) => (
        <Link
          key={c.id}
          href={`/concepts/${c.id}`}
          aria-current={c.id === current ? "page" : undefined}
          className={c.id === current ? "rounded-full bg-white px-3.5 py-2 font-medium text-black" : "rounded-full px-3.5 py-2 text-white/75 hover:text-white"}
        >
          {c.label}
        </Link>
      ))}
    </nav>
  );
}
