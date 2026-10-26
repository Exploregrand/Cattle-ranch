import type { WeightRecord } from "@/lib/livestock/types";

/** Tiny decorative trend line; the adjacent text carries the actual values. */
export function Sparkline({ weights, className }: { weights: WeightRecord[]; className?: string }) {
  if (weights.length < 2) return null;
  const pts = [...weights].sort((a, b) => a.date.localeCompare(b.date));
  const w = 96;
  const h = 32;
  const min = Math.min(...pts.map((p) => p.kg));
  const max = Math.max(...pts.map((p) => p.kg));
  const d = pts
    .map((p, i) => {
      const x = (i / (pts.length - 1)) * (w - 4) + 2;
      const y = h - 3 - ((p.kg - min) / (max - min || 1)) * (h - 6);
      return `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  const last = d.split(" ").pop()!.slice(1).split(",");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} aria-hidden="true" className={className}>
      <path d={d} fill="none" stroke="#34603f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={last[0]} cy={last[1]} r="3" fill="#b48a43" stroke="#fff" strokeWidth="1.5" />
    </svg>
  );
}
