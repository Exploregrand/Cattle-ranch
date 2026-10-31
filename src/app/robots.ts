import type { MetadataRoute } from "next";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tangamalivestock.co.ke";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/dashboard", "/demo", "/auth", "/sign-in"] },
    sitemap: `${BASE}/sitemap.xml`,
  };
}
