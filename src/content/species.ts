import type { PhotoKey } from "@/content/photos";

/**
 * One page per animal. General breed and husbandry facts only — nothing here claims
 * Herd & Field already has these animals. Health notes describe the kind of care we plan,
 * always "as advised by our vet".
 */
export type SpeciesSlug = "sheep" | "goats" | "cattle";

export interface SpeciesPage {
  slug: SpeciesSlug;
  name: string;
  singular: string;
  swahili: string;
  photo: PhotoKey;
  /** One of our own farm photos, shown instead of the breed photo when set. */
  farmPhoto?: "cowPortrait";
  headline: string;
  intro: string;
  why: { title: string; body: string }[];
  breeds: { name: string; body: string }[];
  feeding: string;
  care: string[];
  ways: { title: string; body: string; href: string }[];
}

export const speciesPages: SpeciesPage[] = [
  {
    slug: "sheep",
    name: "Sheep",
    singular: "sheep",
    swahili: "Kondoo",
    photo: "sheep",
    headline: "Sheep, raised on our own fodder.",
    intro:
      "Hardy hair sheep that do well in Kajiado's dry climate and turn good fodder into steady growth. A natural first animal to own.",
    why: [
      { title: "Suited to Kajiado", body: "Hair sheep tolerate heat and dry spells, and thrive on the forage we grow." },
      { title: "A shorter cycle", body: "Sheep reach market weight sooner than cattle, so you see the full record from start to finish." },
      { title: "Steady demand", body: "Mutton has steady demand across Kenya, and sheep are a traditional choice for Qurbani." },
    ],
    breeds: [
      {
        name: "Dorper",
        body: "A meat breed from South Africa, recognisable by its black head and white body. Known for fast growth and tolerance of hot, dry conditions.",
      },
      {
        name: "Red Maasai",
        body: "An indigenous East African hair sheep, valued for hardiness and resistance to stomach worms common in the region.",
      },
      { name: "Crosses", body: "Dorper × Red Maasai crosses combine growth with local hardiness." },
    ],
    feeding:
      "Grazing and fresh-cut Super Napier and desmodium, with alfalfa for protein and Sugargraze silage through the dry months, all grown on our farms.",
    care: [
      "Weighed regularly, with every weigh-in on the animal's record",
      "Routine deworming and vaccinations such as PPR, as advised by our vet",
      "Daily checks of eyes, feet, coat and appetite",
      "Penned safely in the boma every night",
    ],
    ways: [
      { title: "Managed ownership", body: "Own a specific, ear-tagged sheep that we raise for you.", href: "/early-access?interest=sheep" },
      { title: "Qurbani", body: "Reserve a sheep ahead of Eid al-Adha.", href: "/qurbani" },
    ],
  },
  {
    slug: "goats",
    name: "Goats",
    singular: "goat",
    swahili: "Mbuzi",
    photo: "goat",
    headline: "Goats, hardy and in demand.",
    intro:
      "Resilient browsers that cope well with dry country. Goats are widely kept across Kenya and are in steady demand, including for Qurbani.",
    why: [
      { title: "Built for dry country", body: "Goats browse widely and tolerate heat, making good use of mixed forage." },
      { title: "Steady demand", body: "Goat meat is popular across Kenya, with seasonal peaks around Eid and the holidays." },
      { title: "Easy to follow", body: "A short growth cycle means regular, visible progress on your record." },
    ],
    breeds: [
      {
        name: "Galla",
        body: "A large white meat goat from northern Kenya, known for hardiness and good body size.",
      },
      {
        name: "Boer",
        body: "A meat breed from South Africa, recognised for fast growth and heavy build.",
      },
      {
        name: "Small East African",
        body: "The indigenous goat of the region: small, hardy and well adapted to local conditions.",
      },
    ],
    feeding:
      "Browse and fresh-cut fodder, with desmodium and alfalfa for protein and Sugargraze for energy, grown on our own farms.",
    care: [
      "Weighed regularly, with every weigh-in recorded",
      "Routine deworming and vaccinations such as PPR and CCPP, as advised by our vet",
      "Daily health checks, with anything unusual written down",
      "Safe housing every night",
    ],
    ways: [
      { title: "Managed ownership", body: "Own a specific, ear-tagged goat that we raise for you.", href: "/early-access?interest=goats" },
      { title: "Qurbani", body: "Reserve a goat ahead of Eid al-Adha.", href: "/qurbani" },
    ],
  },
  {
    slug: "cattle",
    name: "Cattle",
    singular: "cattle",
    swahili: "Ng'ombe",
    photo: "cattle",
    farmPhoto: "cowPortrait",
    headline: "Cattle, where good records matter most.",
    intro:
      "Cattle take longer to raise and cost more to feed, so careful feeding and complete records make the biggest difference to the outcome.",
    why: [
      { title: "Hardy zebu breeds", body: "Breeds developed for East African conditions cope with heat and dry seasons." },
      { title: "Feed is the difference", body: "Our own Sugargraze and Napier mean a steady, controlled diet through the year." },
      { title: "Every kilo recorded", body: "Over a longer cycle, regular weigh-ins show exactly how your animal is doing." },
    ],
    breeds: [
      {
        name: "Boran",
        body: "A Kenyan-developed zebu beef breed, known for hardiness, good temperament and quality beef.",
      },
      {
        name: "Sahiwal",
        body: "A heat-tolerant zebu breed originally from South Asia, widely kept in Kenya and valued for its hardiness.",
      },
      { name: "Crosses", body: "Crosses that combine local hardiness with good growth." },
    ],
    feeding:
      "Sugargraze and Super Napier for bulk and energy, with desmodium and alfalfa for protein, fed fresh or as silage, from our own farms.",
    care: [
      "Weighed regularly, with growth plotted from arrival",
      "Vaccinations such as foot-and-mouth and lumpy skin disease, as advised by our vet",
      "Tick control and daily health checks",
      "Every treatment dated on the animal's record",
    ],
    ways: [
      { title: "Managed ownership", body: "Own a specific, ear-tagged animal that we raise for you.", href: "/early-access?interest=cattle" },
      { title: "Qurbani", body: "Reserve an animal ahead of Eid al-Adha.", href: "/qurbani" },
    ],
  },
];

export function getSpeciesPage(slug: string) {
  return speciesPages.find((s) => s.slug === slug) ?? null;
}
