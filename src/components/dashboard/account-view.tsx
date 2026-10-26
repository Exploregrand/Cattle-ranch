import Link from "next/link";

import { PageHeader, SectionTitle } from "@/components/dashboard/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatDate } from "@/lib/format";
import type { CustomerProfile } from "@/lib/livestock/types";

function Initials({ name }: { name: string }) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
  return (
    <div className="flex size-14 items-center justify-center rounded-full bg-forest-800 font-display text-lg text-cream-50">
      {initials || "T"}
    </div>
  );
}

export function AccountView({
  customer,
  action,
}: {
  customer: CustomerProfile;
  /** Sign-out form for live accounts, exit link for the demo. */
  action: React.ReactNode;
}) {
  const rows: [string, string | undefined][] = [
    ["Name", customer.fullName],
    ["Email", customer.email],
    ["Phone", customer.phone],
    ["County", customer.county],
    ["Member since", customer.memberSince ? formatDate(customer.memberSince) : undefined],
  ];
  return (
    <>
      <PageHeader title="Account" />
      <div className="space-y-10">
        <Card className="flex items-center gap-4 p-5 sm:p-6">
          <Initials name={customer.fullName} />
          <div className="min-w-0">
            <p className="truncate font-display text-xl font-medium text-forest-950">{customer.fullName}</p>
            {customer.email && <p className="truncate text-sm text-ink-muted">{customer.email}</p>}
          </div>
        </Card>

        <section>
          <SectionTitle title="Profile" />
          <Card>
            <dl className="divide-y divide-border">
              {rows.map(([label, value]) => (
                <div key={label} className="flex justify-between gap-4 px-5 py-3.5 sm:px-6">
                  <dt className="text-sm text-ink-muted">{label}</dt>
                  <dd className="truncate text-right text-sm font-medium text-forest-950">{value ?? "Not provided"}</dd>
                </div>
              ))}
            </dl>
          </Card>
        </section>

        <div className="flex flex-col gap-3 sm:flex-row">{action}</div>
      </div>
    </>
  );
}

export function AccountsNotConnected() {
  return (
    <>
      <PageHeader title="Account" />
      <Card className="p-6 sm:p-8">
        <h2 className="font-display text-xl font-medium text-forest-950">Customer accounts open at launch</h2>
        <p className="mt-2 max-w-lg text-sm leading-relaxed text-ink-soft">
          Sign-in isn&apos;t connected yet. Register for early access and we&apos;ll invite you to
          create an account when livestock programmes open.
        </p>
        <Button asChild className="mt-6">
          <Link href="/early-access">Register for early access</Link>
        </Button>
      </Card>
    </>
  );
}
