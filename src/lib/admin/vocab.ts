/** Shared labels and colours for Farm Ops. Crop colours are CVD-validated (dataviz validator). */

export const crops = [
  { id: "sugargraze", label: "Sugargraze", code: "SG", color: "#1f7a3f" },
  { id: "super_napier", label: "Super Napier", code: "SN", color: "#8f9f1f" },
  { id: "alfalfa", label: "Alfalfa", code: "AL", color: "#7a55b0" },
  { id: "desmodium", label: "Desmodium", code: "DS", color: "#b8741a" },
] as const;

export type CropId = (typeof crops)[number]["id"];
export const cropById = Object.fromEntries(crops.map((c) => [c.id, c])) as Record<CropId, (typeof crops)[number]>;

export const activityKinds = [
  { id: "irrigation", label: "Irrigation" },
  { id: "harvest", label: "Harvest" },
  { id: "fertiliser", label: "Fertiliser / manure" },
  { id: "weeding", label: "Weeding" },
  { id: "pest_control", label: "Pest control" },
  { id: "note", label: "Note" },
] as const;
export type ActivityKind = (typeof activityKinds)[number]["id"];
export const activityLabel = Object.fromEntries(activityKinds.map((a) => [a.id, a.label])) as Record<ActivityKind, string>;

export const stockForms = [
  { id: "fresh", label: "Fresh" },
  { id: "silage", label: "Silage" },
  { id: "hay", label: "Hay" },
] as const;

export const stockReasons = {
  in: [
    { id: "harvest", label: "Harvested" },
    { id: "purchased", label: "Purchased" },
    { id: "adjustment", label: "Stock adjustment" },
  ],
  out: [
    { id: "fed", label: "Fed to livestock" },
    { id: "sold", label: "Sold" },
    { id: "spoiled", label: "Spoiled / lost" },
    { id: "adjustment", label: "Stock adjustment" },
  ],
} as const;

export const ledgerCategories = {
  income: [
    { id: "livestock_sale", label: "Livestock sale" },
    { id: "fodder_sale", label: "Fodder sale" },
    { id: "other_income", label: "Other income" },
  ],
  expense: [
    { id: "fodder_inputs", label: "Fodder inputs (seed, fertiliser)" },
    { id: "labour", label: "Labour" },
    { id: "equipment", label: "Equipment" },
    { id: "water", label: "Water" },
    { id: "transport", label: "Transport" },
    { id: "other_expense", label: "Other expense" },
  ],
} as const;

export const animalCostCategories = [
  { id: "purchase", label: "Purchase" },
  { id: "feed", label: "Feed" },
  { id: "veterinary", label: "Veterinary" },
  { id: "other", label: "Other" },
] as const;

export const allCategoryLabels: Record<string, string> = Object.fromEntries(
  [...ledgerCategories.income, ...ledgerCategories.expense, ...animalCostCategories].map((c) => [c.id, c.label]),
);

export const sections = ["A", "B", "C"] as const;
