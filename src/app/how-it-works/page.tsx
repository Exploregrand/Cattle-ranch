import type { Metadata } from "next";

import { CareDay, Closing, HowItWorks, PageIntro, Questions, RecordSection } from "@/components/sections";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { photos } from "@/content/photos";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "How owning livestock with Tangama will work: register, choose your animal, sign a clear agreement, then follow its weigh-ins, health and costs.",
};

export default function HowItWorksPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-cream-50 text-ink">
        <PageIntro
          eyebrow="How it works"
          title="Clear steps. Every record kept."
          lead="From registering your interest to collecting your animal: what happens at each step, what your agreement will cover, how your animal is cared for and what you'll see."
          photo={photos.sheep}
        />
        <div className="h-[clamp(3rem,2rem+3vw,5rem)]" />
        <HowItWorks />
        <CareDay />
        <RecordSection />
        <Questions />
        <Closing />
      </main>
      <SiteFooter />
    </>
  );
}
