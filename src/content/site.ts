/**
 * Public site content. Facts about the farm are Tangama's own; everything about
 * livestock describes plans, not live services. Keep it that way until launch.
 */

export const farm = {
  name: "Tangama Farm",
  location: "Isinya, Kajiado County",
  acres: 2.17,
  beds: 120,
  sections: [
    { id: "A", beds: 40 },
    { id: "B", beds: 40 },
    { id: "C", beds: 40 },
  ],
  fodder: [
    {
      name: "Sugargraze",
      note: "A high-sugar forage sorghum grown for bulk green feed and silage.",
    },
    {
      name: "Super Napier",
      note: "A fast-regrowing perennial grass suited to repeated cutting.",
    },
    {
      name: "Alfalfa",
      note: "A protein-rich legume, also known as lucerne.",
    },
    {
      name: "Desmodium",
      note: "A nitrogen-fixing legume that adds protein and improves soil.",
    },
  ],
} as const;

export type Species = "sheep" | "goats" | "cattle";

export const categories: {
  id: Species;
  name: string;
  swahili: string;
  summary: string;
  breeds: string[];
}[] = [
  {
    id: "sheep",
    name: "Sheep",
    swahili: "Kondoo",
    summary:
      "Hardy, efficient converters of fodder, well suited to the climate of Kajiado.",
    breeds: ["Dorper", "Red Maasai", "Crosses"],
  },
  {
    id: "goats",
    name: "Goats",
    swahili: "Mbuzi",
    summary:
      "Resilient browsers with steady demand across Kenya, including for Qurbani.",
    breeds: ["Galla", "Boer", "Small East African"],
  },
  {
    id: "cattle",
    name: "Cattle",
    swahili: "Ng'ombe",
    summary:
      "Longer-cycle animals where careful feeding and records matter most.",
    breeds: ["Boran", "Sahiwal", "Crosses"],
  },
];

export const steps = [
  {
    title: "Explore a programme",
    body: "Browse livestock programmes once they open, each with clear terms, costs and timelines.",
  },
  {
    title: "Review the animal and terms",
    body: "See the animal's ID, breed, age, weight and health record, and the management terms, before committing.",
  },
  {
    title: "Follow its progress",
    body: "Weights, health treatments, feeding and photos are recorded by the farm team and shown in your dashboard.",
  },
  {
    title: "Receive the agreed outcome",
    body: "Collect the animal, receive documented sale proceeds, or another outcome set out in your contract.",
  },
];

export type ProgramId = "farm-owned" | "customer-owned" | "fattening" | "qurbani";

export const programs: {
  id: ProgramId;
  name: string;
  summary: string;
}[] = [
  {
    id: "customer-owned",
    name: "Managed ownership",
    summary:
      "Own an animal outright while we feed, house and care for it under a written service agreement.",
  },
  {
    id: "fattening",
    name: "Fattening programme",
    summary:
      "Animals are fed for a defined period on our own fodder, with every cost and the final sale documented.",
  },
  {
    id: "qurbani",
    name: "Qurbani services",
    summary:
      "Seasonal reservation, preparation and delivery of animals for Eid al-Adha.",
  },
  {
    id: "farm-owned",
    name: "Farm livestock sales",
    summary:
      "Animals bred or finished at Tangama Farm, sold directly with full records.",
  },
];

export const interestOptions = [
  { value: "sheep", label: "Sheep" },
  { value: "goats", label: "Goats" },
  { value: "cattle", label: "Cattle" },
  { value: "managed", label: "Managed ownership" },
  { value: "qurbani", label: "Qurbani" },
] as const;

export type Interest = (typeof interestOptions)[number]["value"];
