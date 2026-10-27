import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Tangama Livestock",
    short_name: "Tangama",
    description: "Own livestock raised on our land in Isinya — every weigh-in, treatment and cost on record.",
    start_url: "/dashboard",
    display: "standalone",
    background_color: "#f7f5f1",
    theme_color: "#2b2622",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
