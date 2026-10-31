/** Herd & Field's own farm photography (Isinya). All images are of our farms, team and animals. */
export const farmPhotos = {
  rowsGreen: { src: "/images/farm/rows-green.jpg", alt: "Young fodder rows on drip irrigation, with a line of windbreak trees beyond" },
  rowsTrees: { src: "/images/farm/rows-trees.jpg", alt: "Green fodder rows seen through the trees at the edge of the field" },
  tending: { src: "/images/farm/tending.jpg", alt: "A member of the farm team tending young legume rows" },
  prepWorker: { src: "/images/farm/prep-worker.jpg", alt: "A farm worker watering freshly prepared beds laid with drip lines" },
  prepDusk: { src: "/images/farm/prep-dusk.jpg", alt: "Prepared beds and drip lines at dusk under a cloudy sky" },
  bedsCattle: { src: "/images/farm/beds-cattle.jpg", alt: "Composted beds with drip lines, cattle grazing beyond the fence" },
  manure: { src: "/images/farm/manure.jpg", alt: "A handful of aged livestock manure ready to go back into the soil" },
  cowPortrait: { src: "/images/farm/cow-portrait.jpg", alt: "A tan zebu cow resting on the farm" },
  cowResting: { src: "/images/farm/cow-resting.jpg", alt: "A tan zebu cow lying beside a heap of compost" },
  rowsSun: { src: "/images/farm/rows-sun.jpg", alt: "Sunlit fodder rows on drip lines beneath a line of windbreak trees" },
  napierCut: { src: "/images/farm/napier-cut.jpg", alt: "Freshly cut Napier grass ready to feed" },
  napierStand: { src: "/images/farm/napier-stand.jpg", alt: "A mature stand of Napier grass beside cut fodder" },
  herdCurious: { src: "/images/farm/herd-curious.jpg", alt: "A curious tan cow looks into the camera, with the herd grazing behind under a cloudy sky" },
  herdGrazing: { src: "/images/farm/herd-grazing.jpg", alt: "Red zebu cattle grazing beside the windbreak trees and Napier on our farm" },
  cat: { src: "/images/farm/cat.jpg", alt: "A tabby farm cat standing up against the wire fence" },
} as const;

/** How we farm. Stated as practice, not certification. */
export const organicPractices = [
  {
    title: "Manure back into the soil",
    body: "Livestock manure is aged and composted, then worked into every bed before planting — feeding the soil instead of buying it in.",
    photo: "manure" as const,
  },
  {
    title: "Water where it's needed",
    body: "Drip lines run along every row, putting water at the roots and wasting little in the Kajiado dry season.",
    photo: "prepDusk" as const,
  },
  {
    title: "Trees on the boundary",
    body: "Windbreak trees shelter the crops from wind and sun and give the farm shade and habitat.",
    photo: "rowsSun" as const,
  },
];

/** The planting season, start to finish. */
export const plantingStory = [
  { step: "Prepare", title: "Composted beds and drip lines", photo: "prepWorker" as const },
  { step: "Plant", title: "Seed into moist, fed soil", photo: "bedsCattle" as const },
  { step: "Tend", title: "Rows checked and cared for by hand", photo: "tending" as const },
  { step: "Grow", title: "Green fodder, weeks later", photo: "rowsTrees" as const },
  { step: "Harvest", title: "Cut fresh and fed the same day", photo: "napierCut" as const },
];
