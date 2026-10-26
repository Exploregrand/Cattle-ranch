import { cn } from "@/lib/utils";

/**
 * Illustrated stand-ins for photography. Each scene fills its container
 * (object-cover behaviour). Swap for real Tangama photos via src/content/media.ts.
 */

type Scene = "dusk" | "day" | "fodder";

function Acacia({
  x,
  y,
  s = 1,
  fill,
}: {
  x: number;
  y: number;
  s?: number;
  fill: string;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill={fill}>
      {/* trunk and branches */}
      <path d="M-3 0 L-2 -38 L-16 -62 L-13 -64 L-1 -46 L1 -70 L4 -70 L4 -48 L17 -66 L20 -63 L5 -38 L4 0 Z" />
      {/* flat umbrella canopy */}
      <ellipse cx="-2" cy="-72" rx="46" ry="9" />
      <ellipse cx="-22" cy="-68" rx="22" ry="7" />
      <ellipse cx="18" cy="-69" rx="26" ry="7.5" />
      <ellipse cx="0" cy="-78" rx="30" ry="6" />
    </g>
  );
}

export function Landscape({
  scene = "dusk",
  id,
  className,
}: {
  scene?: Scene;
  /** Unique id prefix for gradient defs when several scenes share a page. */
  id: string;
  className?: string;
}) {
  const g = (name: string) => `${id}-${name}`;

  if (scene === "fodder") {
    // Perspective rows of fodder beds receding toward a low horizon.
    const rows = 22;
    const vx = 600;
    const horizon = 300;
    return (
      <svg
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        className={cn("h-full w-full", className)}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={g("sky")} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#c9dccf" />
            <stop offset="0.7" stopColor="#efe2c4" />
            <stop offset="1" stopColor="#f3dfb5" />
          </linearGradient>
          <linearGradient id={g("soil")} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#8f7a58" />
            <stop offset="1" stopColor="#5a4630" />
          </linearGradient>
          <linearGradient id={g("fade")} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#efe2c4" stopOpacity="0.7" />
            <stop offset="0.35" stopColor="#efe2c4" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width="1200" height="800" fill={`url(#${g("sky")})`} />
        <path
          d="M0 300 C140 262 260 250 420 270 C560 288 650 246 800 252 C930 258 1060 280 1200 268 L1200 320 L0 320 Z"
          fill="#9fb3a2"
          opacity="0.75"
        />
        <rect y={horizon} width="1200" height={800 - horizon} fill={`url(#${g("soil")})`} />
        {Array.from({ length: rows }).map((_, i) => {
          const spread = 3400;
          const left = -1100 + (spread / rows) * i;
          const right = left + (spread / rows) * 0.8;
          const tone = ["#3d6a3c", "#4a7a43", "#447240"][i % 3];
          return (
            <path
              key={i}
              d={`M${vx - 40 + i * 3.6} ${horizon} L${vx - 37 + i * 3.6} ${horizon} L${right} 800 L${left} 800 Z`}
              fill={tone}
            />
          );
        })}
        <Acacia x={430} y={302} s={0.7} fill="#5a7360" />
        <Acacia x={790} y={300} s={0.45} fill="#6b8270" />
        <rect y={horizon} width="1200" height="260" fill={`url(#${g("fade")})`} />
      </svg>
    );
  }

  const isDusk = scene === "dusk";
  return (
    <svg
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      className={cn("h-full w-full", className)}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={g("sky")} x1="0" y1="0" x2="0" y2="1">
          {isDusk ? (
            <>
              <stop offset="0" stopColor="#10251a" />
              <stop offset="0.42" stopColor="#45583a" />
              <stop offset="0.66" stopColor="#c08f4f" />
              <stop offset="0.8" stopColor="#f0c784" />
            </>
          ) : (
            <>
              <stop offset="0" stopColor="#bcd3cf" />
              <stop offset="0.6" stopColor="#efe4cb" />
              <stop offset="0.9" stopColor="#f4dcae" />
            </>
          )}
        </linearGradient>
        <radialGradient id={g("sun")} cx="0.68" cy="0.66" r="0.32">
          <stop offset="0" stopColor={isDusk ? "#ffe2a6" : "#fff6dc"} stopOpacity="0.95" />
          <stop offset="0.25" stopColor={isDusk ? "#f2c27a" : "#fbe9bf"} stopOpacity="0.45" />
          <stop offset="1" stopColor="#f2c27a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={g("ground")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={isDusk ? "#5b5a33" : "#a49a5f"} />
          <stop offset="1" stopColor={isDusk ? "#142a1d" : "#5f6b3c"} />
        </linearGradient>
        <filter id={g("grain")}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.06 0" />
        </filter>
      </defs>

      <rect width="1600" height="900" fill={`url(#${g("sky")})`} />
      <rect width="1600" height="900" fill={`url(#${g("sun")})`} />
      <circle cx="1088" cy="590" r="34" fill={isDusk ? "#ffe7b3" : "#fff8e6"} opacity={isDusk ? 0.9 : 0.8} />

      {/* Distant ridge, then nearer hills */}
      <path
        d="M0 560 C120 520 210 470 330 488 C430 503 470 452 560 440 C650 428 720 492 820 500 C930 508 1010 470 1120 486 C1250 505 1380 540 1600 520 L1600 640 L0 640 Z"
        fill={isDusk ? "#55583c" : "#9fae9a"}
        opacity="0.75"
      />
      <path
        d="M0 610 C180 580 320 600 480 586 C640 572 760 606 940 598 C1120 590 1290 560 1600 586 L1600 700 L0 700 Z"
        fill={isDusk ? "#3c4a2c" : "#8d9a6a"}
      />

      {/* Plains */}
      <path d="M0 640 C300 622 620 650 900 640 C1180 630 1400 640 1600 632 L1600 900 L0 900 Z" fill={`url(#${g("ground")})`} />

      <Acacia x={250} y={650} s={1.6} fill={isDusk ? "#1c2b1d" : "#3e5140"} />
      <Acacia x={560} y={636} s={0.8} fill={isDusk ? "#2a3624" : "#56684f"} />
      <Acacia x={1380} y={654} s={1.25} fill={isDusk ? "#1f2d20" : "#45574a"} />
      <Acacia x={1200} y={638} s={0.55} fill={isDusk ? "#344029" : "#62735a"} />

      {/* Foreground grass band */}
      <path
        d="M0 790 C200 770 380 800 620 786 C860 772 1100 800 1340 784 C1460 776 1540 782 1600 778 L1600 900 L0 900 Z"
        fill={isDusk ? "#0e1d14" : "#4b5a33"}
        opacity="0.9"
      />
      <rect width="1600" height="900" filter={`url(#${g("grain")})`} />
    </svg>
  );
}
