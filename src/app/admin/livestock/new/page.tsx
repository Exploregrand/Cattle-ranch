import { Suspense } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { RegisterForm } from "@/app/admin/livestock/new/register-form";
import { AdminPageHeader, AdminSkeleton } from "@/components/admin/admin-shell";
import { Panel } from "@/components/admin/fields";
import { pageStaff } from "@/lib/admin/auth";
import { listProgrammes } from "@/lib/admin/livestock";

export const metadata = { title: "Register animal" };

async function NewAnimalContent() {
  if (!(await pageStaff("/admin/livestock/new"))) return null;
  const programmes = await listProgrammes();
  return (
    <>
      <Link href="/admin/livestock" className="-ml-1 mb-4 inline-flex items-center gap-1 text-sm text-ink-soft hover:text-forest-900">
        <ChevronLeft className="size-4" aria-hidden="true" /> Livestock
      </Link>
      <AdminPageHeader title="Register animal" description="Record the animal at intake. Everything else builds from here." />
      <Panel title="Animal details" className="max-w-4xl">
        <RegisterForm programmes={programmes} />
      </Panel>
    </>
  );
}

export default function NewAnimalPage() {
  return (
    <Suspense fallback={<AdminSkeleton />}>
      <NewAnimalContent />
    </Suspense>
  );
}
