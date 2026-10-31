import { AnimalsSection, CareDay, Closing, FarmLive, Hero, HowItWorks, Pathways, Questions, RecordSection } from "@/components/sections";
import { FarmCatCard, OrganicPractices } from "@/components/sections/farm-story";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

/**
 * Homepage order follows the buyer's decision path:
 * hook → trust (organic farm) → offer → animals → process and agreement → daily care → the record
 * → live proof → objections → personality → action.
 */
export function HomePage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-cream-50 text-ink">
      <SiteHeader />
      <main id="main">
        <Hero />
        <OrganicPractices />
        <Pathways />
        <AnimalsSection />
        <HowItWorks />
        <CareDay />
        <RecordSection />
        <FarmLive />
        <Questions />
        <FarmCatCard />
        <Closing />
      </main>
      <SiteFooter />
    </div>
  );
}
