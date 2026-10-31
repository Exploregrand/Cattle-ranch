import { Closing, FarmLive, Hero, Pathways, Questions, WhyUs } from "@/components/sections";
import { FarmCatCard } from "@/components/sections/farm-story";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

/**
 * Homepage, in the order of a buyer's decision:
 * hook → why trust us → the three ways in → live proof → objections → personality → action.
 * Every section here appears on this page only; detail lives on its own page.
 */
export function HomePage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-cream-50 text-ink">
      <SiteHeader />
      <main>
        <Hero />
        <WhyUs />
        <Pathways />
        <FarmLive />
        <Questions />
        <FarmCatCard />
        <Closing />
      </main>
      <SiteFooter />
    </div>
  );
}
