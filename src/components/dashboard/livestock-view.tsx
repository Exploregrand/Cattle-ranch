import { AnimalCard } from "@/components/dashboard/animal-card";
import { EmptyHerd } from "@/components/dashboard/empty-herd";
import { PageHeader } from "@/components/dashboard/page-header";
import type { Animal } from "@/lib/livestock/types";

export function LivestockView({ animals, base }: { animals: Animal[]; base: string }) {
  return (
    <>
      <PageHeader
        eyebrow={animals.length ? `${animals.length} ${animals.length === 1 ? "animal" : "animals"}` : undefined}
        title="My livestock"
      />
      {animals.length === 0 ? (
        <EmptyHerd base={base} />
      ) : (
        <div className="space-y-3">
          {animals.map((animal) => (
            <AnimalCard key={animal.id} animal={animal} base={base} />
          ))}
        </div>
      )}
    </>
  );
}
