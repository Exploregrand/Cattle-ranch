import { AnimalsSection, Closing, FarmLive, Hero, HowPreview, Pathways, Questions } from "@/components/sections";
import { FarmCatCard, OrganicPractices } from "@/components/sections/farm-story";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

/**
 * Homepage order follows the buyer's decision path:
 * 1. Hook        — the promise and a clear call to action
 * 2. Trust       — a real, working organic farm (our own photos)
 * 3. Offer       — the three ways in
 * 4. Product     — the animals
 * 5. Process     — simple steps, everything in writing
 * 6. Proof       — live figures from farm records
 * 7. Objections  — straight answers
 * 8. Personality — the farm cat, something memorable to share
 * 9. Action      — register interest
 */
export function HomePage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-cream-50 text-ink">
      <SiteHeader />
      <main>
        <Hero />
        <OrganicPractices />
        <Pathways />
        <AnimalsSection />
        <HowPreview />
        <FarmLive />
        <Questions />
        <FarmCatCard />
        <Closing />
      </main>
      <SiteFooter />
    </div>
  );
}
