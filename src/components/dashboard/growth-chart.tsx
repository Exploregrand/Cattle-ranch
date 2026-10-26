"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { formatDate, formatKg, formatShortDate } from "@/lib/format";
import type { WeightRecord } from "@/lib/livestock/types";

const HEIGHT = 230;
const PAD = { top: 28, right: 16, bottom: 30, left: 44 };

function niceTicks(min: number, max: number, count = 4) {
  const span = max - min || 1;
  const raw = span / count;
  const mag = 10 ** Math.floor(Math.log10(raw));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => s >= raw) ?? raw;
  const lo = Math.floor(min / step) * step;
  const hi = Math.ceil(max / step) * step;
  const ticks: number[] = [];
  for (let v = lo; v <= hi + step / 2; v += step) ticks.push(Number(v.toFixed(6)));
  return ticks;
}

/** Single-series weight-over-time line with a hover/touch crosshair. */
export function GrowthChart({ weights }: { weights: WeightRecord[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(640);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const model = useMemo(() => {
    const points = [...weights].sort((a, b) => a.date.localeCompare(b.date));
    const times = points.map((p) => Date.parse(p.date));
    const kgs = points.map((p) => p.kg);
    const pad = (Math.max(...kgs) - Math.min(...kgs)) * 0.12 || 1;
    const ticks = niceTicks(Math.min(...kgs) - pad, Math.max(...kgs) + pad);
    const y0 = ticks[0];
    const y1 = ticks[ticks.length - 1];
    const t0 = times[0];
    const t1 = times[times.length - 1] === t0 ? t0 + 1 : times[times.length - 1];
    const innerW = Math.max(10, width - PAD.left - PAD.right);
    const innerH = HEIGHT - PAD.top - PAD.bottom;
    const x = (t: number) => PAD.left + ((t - t0) / (t1 - t0)) * innerW;
    const y = (v: number) => PAD.top + (1 - (v - y0) / (y1 - y0)) * innerH;
    const xy = points.map((p, i) => ({ ...p, cx: x(times[i]), cy: y(p.kg) }));
    // Show at most ~4 date labels so they never collide.
    const every = Math.max(1, Math.ceil(points.length / Math.max(2, Math.floor(innerW / 110))));
    return { xy, ticks, y, every };
  }, [weights, width]);

  if (weights.length === 0) return null;

  const { xy, ticks, y, every } = model;
  const line = xy.map((p, i) => `${i ? "L" : "M"}${p.cx},${p.cy}`).join(" ");
  const area = `${line} L${xy[xy.length - 1].cx},${HEIGHT - PAD.bottom} L${xy[0].cx},${HEIGHT - PAD.bottom} Z`;
  const point = active === null ? null : xy[active];

  function onMove(e: React.PointerEvent<SVGSVGElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left;
    let best = 0;
    xy.forEach((p, i) => {
      if (Math.abs(p.cx - px) < Math.abs(xy[best].cx - px)) best = i;
    });
    setActive(best);
  }

  return (
    <div ref={ref} className="relative w-full select-none">
      <svg
        width={width}
        height={HEIGHT}
        role="img"
        aria-label={`Weight from ${formatKg(xy[0].kg)} on ${formatDate(xy[0].date)} to ${formatKg(xy[xy.length - 1].kg)} on ${formatDate(xy[xy.length - 1].date)}`}
        onPointerMove={onMove}
        onPointerDown={onMove}
        onPointerLeave={() => setActive(null)}
        className="touch-pan-y overflow-visible"
      >
        <defs>
          <linearGradient id="growth-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#26492f" stopOpacity="0.14" />
            <stop offset="1" stopColor="#26492f" stopOpacity="0" />
          </linearGradient>
        </defs>

        {ticks.map((t) => (
          <g key={t}>
            <line x1={PAD.left} x2={width - PAD.right} y1={y(t)} y2={y(t)} stroke="#ece5d6" strokeWidth="1" />
            <text x={PAD.left - 10} y={y(t)} dy="0.32em" textAnchor="end" className="fill-ink-muted text-[11px] tabular">
              {t}
            </text>
          </g>
        ))}
        <text x={PAD.left - 10} y={10} textAnchor="end" className="fill-ink-muted text-[10px]">
          kg
        </text>

        {xy.map((p, i) =>
          i % every === 0 || i === xy.length - 1 ? (
            <text
              key={p.date}
              x={p.cx}
              y={HEIGHT - 8}
              textAnchor={i === 0 ? "start" : i === xy.length - 1 ? "end" : "middle"}
              className="fill-ink-muted text-[11px]"
            >
              {formatShortDate(p.date)}
            </text>
          ) : null,
        )}

        <path d={area} fill="url(#growth-area)" />
        <path d={line} fill="none" stroke="#26492f" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />

        {point && (
          <line x1={point.cx} x2={point.cx} y1={PAD.top} y2={HEIGHT - PAD.bottom} stroke="#b48a43" strokeWidth="1" strokeDasharray="3 3" />
        )}
        {xy.map((p, i) => (
          <circle
            key={p.date}
            cx={p.cx}
            cy={p.cy}
            r={i === active ? 5.5 : 4}
            fill={i === active ? "#b48a43" : "#26492f"}
            stroke="#ffffff"
            strokeWidth="2"
          />
        ))}
      </svg>

      {point && (
        <div
          className="pointer-events-none absolute top-0 rounded-lg bg-forest-950 px-3 py-2 text-xs text-cream-50 shadow-lg"
          style={{
            left: Math.min(Math.max(point.cx, 70), width - 70),
            transform: "translate(-50%, -110%)",
          }}
        >
          <p className="font-medium tabular">{formatKg(point.kg)}</p>
          <p className="text-cream-100/70">{formatDate(point.date)}</p>
        </div>
      )}
    </div>
  );
}
