import { TIME_ZONE } from "@/lib/format";
import type { Portfolio } from "@/lib/livestock/types";

/** What a brand-new customer sees: no animals, no updates, no documents. */
export function emptyPortfolio(): Portfolio {
  return {
    asOf: new Intl.DateTimeFormat("en-CA", { timeZone: TIME_ZONE }).format(new Date()),
    customer: { fullName: "" },
    animals: [],
    updates: [],
    documents: [],
  };
}
