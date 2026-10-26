import type { Species } from "@/content/site";

export type AnimalStatus = "active" | "sold" | "transferred" | "deceased";
export type HealthKind = "vaccination" | "treatment" | "check";

export interface WeightRecord {
  date: string;
  kg: number;
}

export interface HealthRecord {
  date: string;
  kind: HealthKind;
  title: string;
  detail?: string;
}

export interface FeedingRecord {
  date: string;
  ration: string;
  notes?: string;
}

export interface CostRecord {
  date: string;
  category: "purchase" | "feed" | "veterinary" | "other";
  label: string;
  amountKes: number;
}

export interface Animal {
  id: string;
  tag: string;
  species: Species;
  breed: string;
  sex: "male" | "female";
  dateOfBirth?: string;
  estimatedAgeMonthsAtIntake?: number;
  intakeDate: string;
  location: string;
  status: AnimalStatus;
  programme: string;
  ownership: { holder: string; since: string; agreement?: string };
  weights: WeightRecord[];
  health: HealthRecord[];
  feeding: FeedingRecord[];
  costs: CostRecord[];
  photos: { date: string; caption: string }[];
}

export interface FarmUpdate {
  id: string;
  date: string;
  title: string;
  body: string;
}

export interface DocumentRecord {
  id: string;
  title: string;
  kind: "agreement" | "certificate" | "statement" | "receipt";
  date: string;
}

export interface CustomerProfile {
  fullName: string;
  email?: string;
  phone?: string;
  county?: string;
  memberSince?: string;
}

export interface Portfolio {
  customer: CustomerProfile;
  animals: Animal[];
  updates: FarmUpdate[];
  documents: DocumentRecord[];
  /** The date the records are "as of" — today for live data, fixed for the demo. */
  asOf: string;
}
