import { Suspense } from "react";
import { notFound } from "next/navigation";

import { DashboardSkeleton } from "@/app/dashboard/loading-skeleton";
import { AnimalProfile } from "@/components/dashboard/animal-profile";
import { getLivePortfolio } from "@/lib/livestock/live";

async function LiveAnimal({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const result = await getLivePortfolio(`/dashboard/livestock/${id}`);
  // Only animals the signed-in customer owns are ever loaded, so anything else is a 404.
  const animal = result.state === "ready" ? result.portfolio.animals.find((a) => a.id === id) : undefined;
  if (!animal || result.state !== "ready") notFound();
  return <AnimalProfile animal={animal} base="/dashboard" asOf={result.portfolio.asOf} />;
}

export default function DashboardAnimalPage({ params }: PageProps<"/dashboard/livestock/[id]">) {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <LiveAnimal params={params} />
    </Suspense>
  );
}
