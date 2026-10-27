/**
 * Linocut-style livestock portraits. Each is a symmetric front view: the right
 * half is drawn once and mirrored, then "carved" with light strokes.
 */
type Species = "cattle" | "sheep" | "goat";

const MIRROR = "translate(400 0) scale(-1 1)";

interface Art {
  /** Tight viewBox around the drawing. */
  box: string;
  shapes: string[]; // right-half fills
  carve: { d: string; w: number; o?: number }[]; // right-half carved strokes
  center: { d: string; w: number }[]; // strokes on the centre line (not mirrored)
  eye: string;
  nostril: string;
}

const art: Record<Species, Art> = {
  cattle: {
    box: "40 22 320 344",
    shapes: [
      "M214 112 C 250 104, 292 92, 318 56 C 332 36, 344 30, 350 34 C 348 52, 330 84, 300 112 C 280 130, 252 138, 228 138 Z",
      "M250 150 C 280 146, 318 150, 344 166 C 352 172, 348 182, 336 186 C 312 192, 280 188, 254 178 Z",
      "M200 104 C 226 104, 248 114, 258 136 C 266 156, 266 186, 258 214 C 252 238, 246 262, 244 286 C 243 306, 242 326, 232 340 C 222 352, 210 356, 200 356 Z",
    ],
    carve: [
      { d: "M232 124 C 262 118, 290 104, 312 76", w: 1.6 },
      { d: "M240 132 C 270 126, 300 110, 322 80", w: 1.2, o: 0.7 },
      { d: "M300 74 L 310 84 M 314 62 L 324 72 M 326 50 L 334 58", w: 1.4, o: 0.8 },
      { d: "M262 166 C 286 162, 316 166, 336 174", w: 2 },
      { d: "M266 174 C 290 172, 312 176, 330 180", w: 1.2, o: 0.6 },
      { d: "M206 176 C 220 170, 236 172, 250 182", w: 2.4 },
      { d: "M246 200 C 242 230, 234 262, 230 296", w: 1.8 },
      { d: "M236 206 C 232 236, 226 266, 222 296", w: 1.2, o: 0.6 },
      ...[126, 134, 142, 150, 158, 166].map((y, i) => ({ d: `M200 ${y} L ${212 + i * 2} ${y - 8}`, w: 1.6, o: 0.85 })),
    ],
    center: [
      { d: "M170 300 C 182 292, 218 292, 230 300", w: 2.4 },
      { d: "M178 342 C 190 350, 210 350, 222 342", w: 2 },
      { d: "M200 300 L200 312", w: 2 },
    ],
    eye: "M228 192 C 234 186, 244 187, 248 194 C 242 198, 234 198, 228 192Z",
    nostril: "M210 318 C 222 314, 226 330, 214 334",
  },
  sheep: {
    box: "46 84 308 258",
    shapes: [
      // wool cap
      "M200 96 C 222 92, 246 98, 262 112 C 276 124, 282 142, 276 156 C 262 150, 236 146, 200 146 Z",
      // ear, drooping outward
      "M256 162 C 284 160, 318 172, 338 194 C 344 202, 338 210, 328 208 C 302 204, 276 192, 256 184 Z",
      // head: broad, short muzzle
      "M200 132 C 230 132, 256 144, 262 170 C 268 196, 262 228, 254 254 C 248 276, 242 298, 232 314 C 222 328, 210 332, 200 332 Z",
    ],
    carve: [
      ...[
        "M212 108 C 220 102, 230 104, 232 112",
        "M236 112 C 244 106, 254 110, 254 120",
        "M218 124 C 226 118, 238 120, 240 128",
        "M244 126 C 252 122, 262 128, 262 138",
      ].map((d) => ({ d, w: 1.8 })),
      { d: "M266 176 C 290 178, 314 188, 330 200", w: 1.8 },
      { d: "M210 190 C 224 184, 240 186, 252 196", w: 2.2 },
      { d: "M248 214 C 244 240, 238 266, 230 292", w: 1.8 },
      { d: "M238 220 C 234 244, 228 268, 222 290", w: 1.2, o: 0.6 },
    ],
    center: [
      { d: "M176 292 C 188 286, 212 286, 224 292", w: 2.2 },
      { d: "M186 320 C 194 326, 206 326, 214 320", w: 2 },
      { d: "M200 150 L200 280", w: 3 },
    ],
    eye: "M226 204 C 232 198, 242 199, 246 206 C 240 210, 232 210, 226 204Z",
    nostril: "M208 302 C 218 298, 222 310, 212 314",
  },
  goat: {
    box: "62 36 276 368",
    shapes: [
      // horn sweeping back and out
      "M210 112 C 226 92, 244 70, 270 54 C 286 44, 300 44, 304 52 C 296 56, 282 62, 268 76 C 252 92, 238 110, 228 126 Z",
      // long drooping ear
      "M250 150 C 276 152, 304 166, 322 190 C 330 202, 328 214, 318 214 C 298 210, 272 192, 254 176 Z",
      // narrow long face
      "M200 108 C 222 108, 242 118, 250 140 C 258 164, 254 196, 246 228 C 240 254, 236 280, 232 304 C 228 324, 220 340, 200 342 Z",
      // beard
      "M200 340 C 212 340, 222 346, 222 360 C 220 376, 210 388, 200 396 Z",
    ],
    carve: [
      { d: "M226 104 C 240 86, 256 70, 276 58", w: 1.6 },
      { d: "M244 92 L 250 100 M 256 80 L 263 88 M 270 68 L 277 76", w: 1.4, o: 0.8 },
      { d: "M262 166 C 282 172, 300 186, 314 202", w: 1.8 },
      { d: "M208 170 C 220 164, 234 166, 244 176", w: 2.2 },
      { d: "M240 196 C 236 226, 230 258, 226 290", w: 1.8 },
      { d: "M206 350 L 210 380 M 214 346 L 216 368", w: 1.4, o: 0.8 },
    ],
    center: [
      { d: "M180 306 C 190 300, 210 300, 220 306", w: 2.2 },
      { d: "M200 124 L200 290", w: 3 },
    ],
    eye: "M222 186 C 228 180, 238 181, 242 188 C 236 192, 228 192, 222 186Z",
    nostril: "M208 316 C 216 312, 220 324, 212 328",
  },
};

export function Woodcut({
  species,
  ink = "#1E1A16",
  paper = "#EFE5D3",
  className,
  title,
}: {
  species: Species;
  ink?: string;
  paper?: string;
  className?: string;
  /** Accessible description; omit for decorative use. */
  title?: string;
}) {
  const a = art[species];
  const clipId = `woodcut-${species}`;
  const fills = a.shapes.flatMap((d, i) => [
    <path key={`r${i}`} d={d} />,
    <path key={`l${i}`} d={d} transform={MIRROR} />,
  ]);
  return (
    <svg viewBox={a.box} className={className} role={title ? "img" : undefined} aria-hidden={title ? undefined : true}>
      {title && <title>{title}</title>}
      <defs>
        <clipPath id={clipId}>{fills}</clipPath>
      </defs>
      <g fill={ink}>{fills}</g>
      <g clipPath={`url(#${clipId})`} stroke={paper} fill="none" strokeLinecap="round">
        {a.carve.flatMap((c, i) => [
          <path key={`cr${i}`} d={c.d} strokeWidth={c.w} opacity={c.o ?? 0.9} />,
          <path key={`cl${i}`} d={c.d} strokeWidth={c.w} opacity={c.o ?? 0.9} transform={MIRROR} />,
        ])}
        {a.center.map((c, i) => (
          <path key={`cc${i}`} d={c.d} strokeWidth={c.w} opacity={0.9} />
        ))}
      </g>
      <g fill={paper}>
        <path d={a.eye} />
        <path d={a.eye} transform={MIRROR} />
      </g>
      <g fill="none" stroke={paper} strokeWidth="2" strokeLinecap="round">
        <path d={a.nostril} />
        <path d={a.nostril} transform={MIRROR} />
      </g>
    </svg>
  );
}
