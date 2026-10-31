import type { Metadata } from "next";

import { AnimalsSection, Closing, PageIntro } from "@/components/sections";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { farmPhotos } from "@/content/farm-story";

export const metadata: Metadata = {
  title: "Livestock",
  description: "Sheep, goats and cattle Herd & Field is preparing to raise in Kajiado — breeds, feeding, care and how to own them.",
};

export default function LivestockPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-cream-50 text-ink">
        <PageIntro
          eyebrow="Livestock"
          title="The animals we'll raise."
          lead="Breeds that thrive in Kajiado, fed on fodder from our own farms. Choose an animal to see its breeds, feeding, care and how to own one."
          photo={{ ...farmPhotos.herdCurious, position: "50% 35%" }}
        />
        <AnimalsSection />
        <Closing
          title="Tell us which animal you want."
          body="Register for sheep, goats or cattle and we'll contact you first when they become available."
        />
      </main>
      <SiteFooter />
    </>
  );
}
