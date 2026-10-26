import { Categories } from "@/components/home/categories";
import { EarlyAccessBand } from "@/components/home/early-access-band";
import { Faq } from "@/components/home/faq";
import { Features } from "@/components/home/features";
import { Hero } from "@/components/home/hero";
import { HowItWorks } from "@/components/home/how-it-works";
import { OurFarm } from "@/components/home/our-farm";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

export default function HomePage() {
  return (
    <>
      <SiteHeader variant="overlay" />
      <main>
        <Hero />
        <Features />
        <Categories />
        <HowItWorks />
        <OurFarm />
        <Faq />
        <EarlyAccessBand />
      </main>
      <SiteFooter />
    </>
  );
}
