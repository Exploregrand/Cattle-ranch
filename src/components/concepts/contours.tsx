/**
 * Generative topographic contours (deterministic, no randomness), used as
 * the Terra direction's art: an abstract reading of the land around Isinya.
 */
function loop(cx: number, cy: number, r: number, seed: number, wobble: number) {
  const steps = 96;
  const pts: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const a = (i / steps) * Math.PI * 2;
    const k =
      1 +
      wobble *
        (0.55 * Math.sin(3 * a + seed) + 0.3 * Math.sin(5 * a + seed * 1.7) + 0.15 * Math.sin(9 * a + seed * 2.3));
    const x = cx + Math.cos(a) * r * k * 1.25;
    const y = cy + Math.sin(a) * r * k * 0.85;
    pts.push(`${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return pts.join(" ") + "Z";
}

export function Contours({
  stroke = "currentColor",
  className,
  rings = 22,
}: {
  stroke?: string;
  className?: string;
  rings?: number;
}) {
  const hills = [
    { cx: 330, cy: 420, seed: 0.6, scale: 1 },
    { cx: 690, cy: 250, seed: 2.1, scale: 0.72 },
    { cx: 760, cy: 760, seed: 4.2, scale: 0.6 },
  ];
  return (
    <svg viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
      {hills.map((h, hi) =>
        Array.from({ length: Math.round(rings * h.scale) }).map((_, i) => (
          <path
            key={`${hi}-${i}`}
            d={loop(h.cx, h.cy, 18 + i * 21 * h.scale, h.seed + i * 0.13, 0.08 + i * 0.006)}
            fill="none"
            stroke={stroke}
            strokeWidth={i % 5 === 0 ? 1.4 : 0.7}
            opacity={i % 5 === 0 ? 0.9 : 0.55}
          />
        )),
      )}
    </svg>
  );
}
