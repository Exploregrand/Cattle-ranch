import type { MetadataRoute } from "next";

import { speciesPages } from "@/content/species";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tangamalivestock.co.ke";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/how-it-works", "/livestock", "/qurbani", "/farm", "/investors", "/early-access", "/privacy"];
  return [
    ...pages.map((p) => ({ url: `${BASE}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.7 })),
    ...speciesPages.map((s) => ({ url: `${BASE}/livestock/${s.slug}`, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
