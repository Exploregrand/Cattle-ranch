import { monthsBetween } from "@/lib/format";
import type { Animal } from "@/lib/livestock/types";

export function sortedWeights(animal: Animal) {
  return [...animal.weights].sort((a, b) => a.date.localeCompare(b.date));
}

export function weightSummary(animal: Animal) {
  const weights = sortedWeights(animal);
  const first = weights[0];
  const latest = weights[weights.length - 1];
  if (!first || !latest) return null;
  const days = Math.max(
    1,
    Math.round((Date.parse(latest.date) - Date.parse(first.date)) / 86_400_000),
  );
  const gain = latest.kg - first.kg;
  return {
    initial: first,
    latest,
    gain,
    /** Average daily gain in grams across the recorded period. */
    adgGrams: weights.length > 1 ? Math.round((gain * 1000) / days) : null,
  };
}

/** Age in months on a given date, from date of birth or intake estimate. */
export function ageMonths(animal: Animal, onDate: string) {
  if (animal.dateOfBirth) return monthsBetween(animal.dateOfBirth, onDate);
  if (animal.estimatedAgeMonthsAtIntake !== undefined) {
    return animal.estimatedAgeMonthsAtIntake + monthsBetween(animal.intakeDate, onDate);
  }
  return null;
}

export function totalCosts(animal: Animal) {
  return animal.costs.reduce((sum, c) => sum + c.amountKes, 0);
}

export const speciesLabel: Record<Animal["species"], string> = {
  sheep: "Sheep",
  goats: "Goat",
  cattle: "Cattle",
};
