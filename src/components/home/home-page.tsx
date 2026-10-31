import { AnimalsSection, Closing, FarmLive, Hero, HowPreview, Pathways } from "@/components/sections";
import { FarmCatCard, OrganicPractices } from "@/components/sections/farm-story";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

/** Home: a concise overview. Detail lives on its own pages. */
export function HomePage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-cream-50 text-ink">
      <SiteHeader />
      <main>
        <Hero />
        <Pathways />
        <HowPreview />
        <AnimalsSection />
        <OrganicPractices />
        <FarmLive />
        <FarmCatCard />
        <Closing />
      </main>
      <SiteFooter />
    </div>
  );
}
