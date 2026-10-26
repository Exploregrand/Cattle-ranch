/** Kenya-focused formatting. All dates render in Africa/Nairobi. */

export const TIME_ZONE = "Africa/Nairobi";
const LOCALE = "en-KE";

const kes = new Intl.NumberFormat(LOCALE, { maximumFractionDigits: 0 });

/** Always "KES 14,500" — Intl's en-KE currency style renders "Ksh". */
export function formatKES(amount: number) {
  return `KES ${kes.format(amount)}`;
}

const kg = new Intl.NumberFormat(LOCALE, { maximumFractionDigits: 1 });

export function formatKg(value: number) {
  return `${kg.format(value)} kg`;
}

export function formatSignedKg(value: number) {
  const sign = value > 0 ? "+" : value < 0 ? "−" : "";
  return `${sign}${kg.format(Math.abs(value))} kg`;
}

/** Accepts ISO date strings (YYYY-MM-DD) or full timestamps. */
function toDate(value: string) {
  // Date-only strings are anchored to noon Nairobi time so they never shift a day.
  return /^\d{4}-\d{2}-\d{2}$/.test(value)
    ? new Date(`${value}T12:00:00+03:00`)
    : new Date(value);
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat(LOCALE, {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: TIME_ZONE,
  }).format(toDate(value));
}

export function formatShortDate(value: string) {
  return new Intl.DateTimeFormat(LOCALE, {
    day: "numeric",
    month: "short",
    timeZone: TIME_ZONE,
  }).format(toDate(value));
}

/** Age in whole months between two ISO dates. */
export function monthsBetween(from: string, to: string) {
  const a = toDate(from);
  const b = toDate(to);
  return (
    (b.getUTCFullYear() - a.getUTCFullYear()) * 12 +
    (b.getUTCMonth() - a.getUTCMonth()) -
    (b.getUTCDate() < a.getUTCDate() ? 1 : 0)
  );
}

export function formatAge(months: number) {
  if (months < 12) return `${months} months`;
  const years = Math.floor(months / 12);
  const rest = months % 12;
  return rest ? `${years} yr ${rest} mo` : `${years} yr${years > 1 ? "s" : ""}`;
}

/** Normalises Kenyan mobile numbers to +2547XXXXXXXX / +2541XXXXXXXX. */
export function normaliseKenyanPhone(input: string): string | null {
  const digits = input.replace(/[^\d+]/g, "");
  const match = digits.match(/^(?:\+?254|0)?([71]\d{8})$/);
  return match ? `+254${match[1]}` : null;
}

/** Whole days from `from` to `to` (both YYYY-MM-DD). */
export function daysBetween(from: string, to: string) {
  return Math.round((Date.parse(`${to}T00:00:00Z`) - Date.parse(`${from}T00:00:00Z`)) / 86_400_000);
}

export function formatDaysAgo(iso: string, today: string) {
  const d = daysBetween(iso, today);
  return d <= 0 ? "Today" : d === 1 ? "Yesterday" : `${d} days ago`;
}
