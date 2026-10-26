import type { WeightRecord } from "@/lib/livestock/types";

/** Static weight curve for marketing previews (no axes, no interaction). */
export function MiniChart({
  weights,
  width = 260,
  height = 84,
  id,
}: {
  weights: WeightRecord[];
  width?: number;
  height?: number;
  id: string;
}) {
  const pts = [...weights].sort((a, b) => a.date.localeCompare(b.date));
  const min = Math.min(...pts.map((p) => p.kg));
  const max = Math.max(...pts.map((p) => p.kg));
  const xy = pts.map((p, i) => [
    4 + (i / (pts.length - 1)) * (width - 8),
    height - 8 - ((p.kg - min) / (max - min || 1)) * (height - 20),
  ]);
  const line = xy.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const [lx, ly] = xy[xy.length - 1];
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#34603f" stopOpacity="0.22" />
          <stop offset="1" stopColor="#34603f" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((f) => (
        <line key={f} x1="0" x2={width} y1={height * f} y2={height * f} stroke="#ece5d6" strokeWidth="1" />
      ))}
      <path d={`${line} L${lx},${height} L4,${height} Z`} fill={`url(#${id})`} />
      <path d={line} fill="none" stroke="#26492f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={lx} cy={ly} r="4.5" fill="#b48a43" stroke="#fff" strokeWidth="2" />
    </svg>
  );
}
