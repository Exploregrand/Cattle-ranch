import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Fraunces, IBM_Plex_Mono, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT"],
});

const barlow = Barlow_Condensed({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "Tangama Livestock — Isinya, Kajiado",
    template: "%s · Tangama Livestock",
  },
  description:
    "Own sheep, goats and cattle raised on our own fodder in Isinya, Kajiado County — with every weigh-in, treatment and cost recorded for you. Register for early access.",
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
      className={`${inter.variable} ${fraunces.variable} ${plexMono.variable} ${barlow.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
