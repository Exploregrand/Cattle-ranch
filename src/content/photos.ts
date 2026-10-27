/**
 * Breed and category photography. These illustrate each kind of animal; they are not
 * photographs of specific Tangama animals and must never be presented as available stock.
 */
export type PhotoKey = "cattle" | "goat" | "sheep";

export const photos: Record<PhotoKey, { src: string; alt: string; width: number; height: number; position: string }> = {
  cattle: {
    src: "/images/cattle.jpg",
    alt: "A red zebu cow grazing on open grassland beside a fence line",
    width: 1086,
    height: 1448,
    position: "50% 45%",
  },
  goat: {
    src: "/images/goat.jpg",
    alt: "A white goat standing in pasture with a herd grazing behind",
    width: 1536,
    height: 1024,
    position: "62% 50%",
  },
  sheep: {
    src: "/images/sheep.jpg",
    alt: "A black-headed Dorper sheep grazing in a green field",
    width: 1122,
    height: 1402,
    position: "40% 55%",
  },
};

export function photoForSpecies(species: "sheep" | "goats" | "cattle"): PhotoKey {
  return species === "goats" ? "goat" : species;
}
