import type { Animal, Portfolio } from "@/lib/livestock/types";

/**
 * SAMPLE DATA FOR DEMO MODE ONLY.
 * None of these animals, people, documents or figures are real Tangama records.
 * They exist so the dashboard design can be evaluated before livestock launches.
 */

const DEMO_LOCATION = "Tangama Farm, Isinya · Pen 2";

const sheep: Animal = {
  id: "demo-sheep-1",
  tag: "TGM-SH-0012",
  species: "sheep",
  breed: "Dorper",
  sex: "male",
  estimatedAgeMonthsAtIntake: 5,
  intakeDate: "2026-06-22",
  location: DEMO_LOCATION,
  status: "active",
  programme: "Managed ownership",
  coverPhoto: "/images/sheep.jpg",
  ownership: { holder: "Amina W.", since: "2026-06-22", agreement: "MA-2026-014" },
  weights: [
    { date: "2026-06-22", kg: 28.4 },
    { date: "2026-07-06", kg: 30.9 },
    { date: "2026-07-20", kg: 33.1 },
    { date: "2026-08-03", kg: 35.8 },
    { date: "2026-08-17", kg: 37.6 },
    { date: "2026-08-31", kg: 40.2 },
    { date: "2026-09-14", kg: 42.5 },
    { date: "2026-09-28", kg: 44.1 },
    { date: "2026-10-12", kg: 46.8 },
  ],
  health: [
    { date: "2026-06-22", kind: "check", title: "Intake examination", detail: "Body condition 2.5 / 5. No abnormalities found." },
    { date: "2026-06-23", kind: "treatment", title: "Deworming", detail: "Broad-spectrum anthelmintic, oral drench." },
    { date: "2026-07-01", kind: "vaccination", title: "PPR vaccination" },
    { date: "2026-07-15", kind: "vaccination", title: "Enterotoxaemia vaccination" },
    { date: "2026-09-02", kind: "check", title: "Routine check", detail: "Body condition 3.5 / 5. Healthy." },
  ],
  feeding: [
    { date: "2026-06-22", ration: "Chopped Super Napier and desmodium", notes: "Adaptation period, 10 days." },
    { date: "2026-07-02", ration: "Napier, desmodium and lucerne hay", notes: "Lucerne introduced at 15% of ration." },
    { date: "2026-08-15", ration: "Sugargraze silage, lucerne and mineral lick", notes: "Finishing ration." },
  ],
  costs: [
    { date: "2026-06-22", category: "purchase", label: "Animal purchase", amountKes: 14500 },
    { date: "2026-07-31", category: "feed", label: "Feed — July", amountKes: 1150 },
    { date: "2026-08-31", category: "feed", label: "Feed — August", amountKes: 1240 },
    { date: "2026-09-30", category: "feed", label: "Feed — September", amountKes: 1310 },
    { date: "2026-07-15", category: "veterinary", label: "Vaccinations and deworming", amountKes: 850 },
  ],
  photos: [
    { date: "2026-06-22", caption: "Intake day" },
    { date: "2026-08-17", caption: "Week 8" },
    { date: "2026-10-12", caption: "Latest weigh-in" },
  ],
};

const goat: Animal = {
  id: "demo-goat-1",
  tag: "TGM-GT-0007",
  species: "goats",
  breed: "Galla",
  sex: "male",
  dateOfBirth: "2026-01-10",
  intakeDate: "2026-07-06",
  location: DEMO_LOCATION,
  status: "active",
  programme: "Managed ownership",
  coverPhoto: "/images/goat.jpg",
  ownership: { holder: "Amina W.", since: "2026-07-06", agreement: "MA-2026-014" },
  weights: [
    { date: "2026-07-06", kg: 21.6 },
    { date: "2026-07-20", kg: 22.9 },
    { date: "2026-08-03", kg: 24.0 },
    { date: "2026-08-17", kg: 25.4 },
    { date: "2026-08-31", kg: 26.3 },
    { date: "2026-09-14", kg: 27.9 },
    { date: "2026-09-28", kg: 29.0 },
    { date: "2026-10-12", kg: 30.4 },
  ],
  health: [
    { date: "2026-07-06", kind: "check", title: "Intake examination", detail: "Healthy, alert. Body condition 3 / 5." },
    { date: "2026-07-07", kind: "treatment", title: "Deworming" },
    { date: "2026-07-14", kind: "vaccination", title: "CCPP vaccination" },
    { date: "2026-07-21", kind: "vaccination", title: "PPR vaccination" },
  ],
  feeding: [
    { date: "2026-07-06", ration: "Browse, Napier and desmodium" },
    { date: "2026-08-10", ration: "Desmodium, lucerne and mineral lick", notes: "Higher-protein ration." },
  ],
  costs: [
    { date: "2026-07-06", category: "purchase", label: "Animal purchase", amountKes: 11800 },
    { date: "2026-07-31", category: "feed", label: "Feed — July", amountKes: 720 },
    { date: "2026-08-31", category: "feed", label: "Feed — August", amountKes: 860 },
    { date: "2026-09-30", category: "feed", label: "Feed — September", amountKes: 880 },
    { date: "2026-07-21", category: "veterinary", label: "Vaccinations and deworming", amountKes: 700 },
  ],
  photos: [
    { date: "2026-07-06", caption: "Intake day" },
    { date: "2026-10-12", caption: "Latest weigh-in" },
  ],
};

const steer: Animal = {
  id: "demo-cattle-1",
  tag: "TGM-CT-0003",
  species: "cattle",
  breed: "Boran",
  sex: "male",
  estimatedAgeMonthsAtIntake: 18,
  intakeDate: "2026-06-15",
  location: "Tangama Farm, Isinya · Paddock 1",
  status: "active",
  programme: "Fattening programme",
  coverPhoto: "/images/cattle.jpg",
  ownership: { holder: "Amina W.", since: "2026-06-15", agreement: "FP-2026-003" },
  weights: [
    { date: "2026-06-15", kg: 212 },
    { date: "2026-07-06", kg: 226 },
    { date: "2026-07-27", kg: 241 },
    { date: "2026-08-17", kg: 255 },
    { date: "2026-09-07", kg: 268 },
    { date: "2026-09-28", kg: 283 },
    { date: "2026-10-19", kg: 297 },
  ],
  health: [
    { date: "2026-06-15", kind: "check", title: "Intake examination", detail: "Body condition 2.5 / 5." },
    { date: "2026-06-16", kind: "treatment", title: "Deworming and tick control" },
    { date: "2026-06-24", kind: "vaccination", title: "Foot-and-mouth vaccination" },
    { date: "2026-07-08", kind: "vaccination", title: "Lumpy skin disease vaccination" },
    { date: "2026-09-10", kind: "treatment", title: "Tick control", detail: "Routine acaricide spray." },
  ],
  feeding: [
    { date: "2026-06-15", ration: "Sugargraze and Napier, free access" },
    { date: "2026-07-01", ration: "Sugargraze silage, desmodium and maize bran", notes: "Fattening ration." },
  ],
  costs: [
    { date: "2026-06-15", category: "purchase", label: "Animal purchase", amountKes: 58000 },
    { date: "2026-06-30", category: "feed", label: "Feed — June", amountKes: 2100 },
    { date: "2026-07-31", category: "feed", label: "Feed — July", amountKes: 4600 },
    { date: "2026-08-31", category: "feed", label: "Feed — August", amountKes: 4750 },
    { date: "2026-09-30", category: "feed", label: "Feed — September", amountKes: 4800 },
    { date: "2026-07-08", category: "veterinary", label: "Vaccinations and parasite control", amountKes: 2400 },
  ],
  photos: [
    { date: "2026-06-15", caption: "Intake day" },
    { date: "2026-08-17", caption: "Week 9" },
    { date: "2026-10-19", caption: "Latest weigh-in" },
  ],
};

export const demoPortfolio: Portfolio = {
  asOf: "2026-10-20",
  customer: {
    fullName: "Amina Wanjiru",
    email: "amina@example.com",
    phone: "+254 700 000 000",
    county: "Nairobi",
    memberSince: "2026-06-15",
  },
  animals: [sheep, goat, steer],
  updates: [
    {
      id: "u3",
      date: "2026-10-19",
      title: "Monthly weigh-in complete",
      body: "All animals in Pen 2 and Paddock 1 were weighed this week. Records are updated in your dashboard.",
    },
    {
      id: "u2",
      date: "2026-10-05",
      title: "Sugargraze harvest from Section B",
      body: "Fresh Sugargraze was cut and ensiled, securing finishing feed for the coming weeks.",
    },
    {
      id: "u1",
      date: "2026-09-10",
      title: "Routine tick control",
      body: "Cattle in Paddock 1 received a scheduled acaricide spray. No issues observed.",
    },
  ],
  documents: [
    { id: "d1", title: "Managed ownership agreement", kind: "agreement", date: "2026-06-22" },
    { id: "d2", title: "Fattening programme agreement", kind: "agreement", date: "2026-06-15" },
    { id: "d3", title: "Statement — September 2026", kind: "statement", date: "2026-10-01" },
  ],
};

export function getDemoAnimal(id: string) {
  return demoPortfolio.animals.find((a) => a.id === id) ?? null;
}
