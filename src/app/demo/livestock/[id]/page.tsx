import { Suspense } from "react";
import { notFound } from "next/navigation";

import { DashboardSkeleton } from "@/app/dashboard/loading-skeleton";
import { AnimalProfile } from "@/components/dashboard/animal-profile";
import { demoPortfolio, getDemoAnimal } from "@/lib/livestock/demo-data";

export function generateStaticParams() {
  return demoPortfolio.animals.map((animal) => ({ id: animal.id }));
}

async function DemoAnimal({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const animal = getDemoAnimal(id);
  if (!animal) notFound();
  return <AnimalProfile animal={animal} base="/demo" asOf={demoPortfolio.asOf} isDemo />;
}

export default function DemoAnimalPage({ params }: PageProps<"/demo/livestock/[id]">) {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DemoAnimal params={params} />
    </Suspense>
  );
}
