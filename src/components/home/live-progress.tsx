import { cropName } from "@/components/admin/fodder-ui";
import { farm } from "@/content/site";
import { formatDate, formatKg } from "@/lib/format";
import { getFarmProgress } from "@/lib/public-stats";

/**
 * "Live from the farm" — aggregate figures straight from Farm Ops records.
 * Falls back to the fixed farm facts when no database is connected.
 */
export async function LiveProgress({ tone = "light" }: { tone?: "light" | "dark" }) {
  const p = await getFarmProgress();
  const dark = tone === "dark";
  const rule = dark ? "border-cream-50/15" : "border-ink/15";
  const label = dark ? "eyebrow !text-[0.75rem] !text-cream-50/60" : "eyebrow !text-[0.75rem]";

  const figures: [string, string][] = p
    ? [
        [`${p.crops.length}`, "Fodder crops in the ground"],
        [formatKg(Math.round(p.harvestKgTotal)), "Fodder harvested to date"],
        [`${p.workLogged30d}`, "Field records, last 30 days"],
        [`${p.animalsOnFarm}`, "Animals on the farm"],
      ]
    : [
        [`${farm.acres}`, "Acres in Isinya"],
        [`${farm.fodder.length}`, "Fodder crops"],
        [`+${farm.expansion.acres}`, `Acres from ${farm.expansion.timing}`],
        ["0", "Animals — opening after launch"],
      ];

  return (
    <div>
      <dl className={`grid grid-cols-2 border-t lg:grid-cols-4 ${rule}`}>
        {figures.map(([v, k], i) => (
          <div
            key={k}
            className={`border-b py-6 pr-4 lg:border-b-0 ${rule} ${i % 2 === 1 ? "pl-5 border-l" : ""} ${i > 0 ? "lg:border-l lg:pl-6" : ""}`}
          >
            <dd className="t-figure text-[2.25rem] sm:text-[2.75rem]">{v}</dd>
            <dt className={`${label} mt-3`}>{k}</dt>
          </div>
        ))}
      </dl>
      {p && (
        <p className={`mt-5 text-[0.8125rem] ${dark ? "text-cream-50/55" : "text-ink-muted"}`}>
          Live from our Farm Ops records
          {p.lastRecordedOn && <> · last entry {formatDate(p.lastRecordedOn)}</>}
          {p.crops.length > 0 && <> · growing {p.crops.map((c) => cropName(c.crop)).join(", ")}</>}
          {p.harvestKg30d > 0 && <> · {formatKg(Math.round(p.harvestKg30d))} harvested in the last 30 days</>}
        </p>
      )}
    </div>
  );
}
