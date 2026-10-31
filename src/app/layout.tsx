import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Instrument_Sans, Newsreader } from "next/font/google";
import { Suspense } from "react";

import { ScrollToTop } from "@/components/site/scroll-to-top";
import "./globals.css";

/** Headings: Newsreader — an editorial serif with optical sizing; calm and established. */
const serif = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  axes: ["opsz"],
  style: ["normal", "italic"],
});

/** Text, interface and labels: Instrument Sans — warm, precise, less generic than Inter. */
const sans = Instrument_Sans({
  variable: "--font-ui",
  subsets: ["latin"],
  axes: ["wdth"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://herdandfield.co.ke";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  openGraph: { type: "website", locale: "en_KE", siteName: "Herd & Field" },
  twitter: { card: "summary_large_image" },
  title: {
    default: "Herd & Field · Isinya, Kajiado",
    template: "%s · Herd & Field",
  },
  description:
    "Own sheep, goats and cattle raised on our own fodder in Isinya, Kajiado County, with every weigh-in, treatment and cost recorded for you. Register for early access.",
};

export const viewport: Viewport = {
  themeColor: "#2b2622",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-KE"
      data-scroll-behavior="smooth"
      className={`${serif.variable} ${sans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Suspense fallback={null}>
          <ScrollToTop />
        </Suspense>
        <a
          href="#main"
          className="sr-only z-[200] rounded-md bg-forest-900 px-4 py-3 text-sm font-medium text-cream-50 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          // Organisation details for search engines. Only confirmed facts.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Herd & Field",
              url: SITE_URL,
              logo: `${SITE_URL}/icon.png`,
              parentOrganization: { "@type": "Organization", name: "Tangama Farm" },
              address: { "@type": "PostalAddress", addressLocality: "Isinya", addressRegion: "Kajiado County", addressCountry: "KE" },
              description: "Livestock ownership and management from our farms in Isinya, Kajiado County, Kenya.",
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
