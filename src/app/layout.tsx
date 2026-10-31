import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Instrument_Sans, Newsreader } from "next/font/google";
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

export const metadata: Metadata = {
  title: {
    default: "Herd & Field — Isinya, Kajiado",
    template: "%s · Herd & Field",
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
      className={`${serif.variable} ${sans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
