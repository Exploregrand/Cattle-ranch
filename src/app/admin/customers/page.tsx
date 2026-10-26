import { Suspense } from "react";
import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";

import { AdminPageHeader, AdminSkeleton } from "@/components/admin/admin-shell";
import { Panel } from "@/components/admin/fields";
import { LeadStatusForm } from "@/components/admin/status-form";
import { Badge } from "@/components/ui/badge";
import { interestOptions } from "@/content/site";
import { pageStaff } from "@/lib/admin/auth";
import { listRegistrations, registrationCounts } from "@/lib/admin/crm";
import { listCustomers } from "@/lib/admin/livestock";
import { formatDate, TIME_ZONE } from "@/lib/format";
import { cn } from "@/lib/utils";

export const metadata = { title: "Customers" };

const interestLabel = Object.fromEntries(interestOptions.map((o) => [o.value, o.label]));
const statusFilters = [undefined, "new", "contacted", "closed"] as const;

function isoDate(d: Date) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: TIME_ZONE }).format(d);
}

async function CustomersContent({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  if (!(await pageStaff("/admin/customers", true))) return null;
  const sp = await searchParams;
  const status = typeof sp.status === "string" && ["new", "contacted", "closed"].includes(sp.status) ? sp.status : undefined;
  const [leads, counts, customers] = await Promise.all([listRegistrations(status), registrationCounts(), listCustomers()]);

  return (
    <>
      <AdminPageHeader title="Customers" description="Early-access interest and customer accounts" />

      <div className="mb-8 grid grid-cols-3 gap-3 sm:grid-cols-6">
        <div className="col-span-3 rounded-2xl bg-forest-900 p-4 text-cream-50 sm:col-span-1 sm:p-5">
          <p className="text-xs text-cream-100/70">Registrations</p>
          <p className="mt-1.5 font-display text-3xl font-medium tabular">{counts.total}</p>
        </div>
        {interestOptions.map((o) => (
          <div key={o.value} className="rounded-2xl border border-border bg-white p-4 sm:p-5">
            <p className="truncate text-xs text-ink-muted">{o.label}</p>
            <p className="mt-1.5 font-display text-2xl font-medium text-forest-950 tabular">{counts[o.value]}</p>
          </div>
        ))}
      </div>

      <Panel
        title="Early-access leads"
        description="Follow up, then mark each lead contacted or closed."
        action={
          <nav aria-label="Filter leads" className="hidden gap-1 sm:flex">
            {statusFilters.map((s) => (
              <Link
                key={s ?? "all"}
                href={s ? `/admin/customers?status=${s}` : "/admin/customers"}
                aria-current={status === s ? "page" : undefined}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm capitalize",
                  status === s ? "bg-forest-900 text-cream-50" : "text-ink-soft hover:bg-cream-100",
                )}
              >
                {s ?? "All"}
              </Link>
            ))}
          </nav>
        }
      >
        {leads.length === 0 ? (
          <p className="text-sm text-ink-muted">
            {status ? `No ${status} leads.` : "No registrations yet. They arrive here from the early-access page."}
          </p>
        ) : (
          <ul className="-my-5 divide-y divide-border">
            {leads.map((lead) => {
              const wa = lead.phone.replace("+", "");
              return (
                <li key={lead.id} className="flex flex-col gap-4 py-5 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-medium text-forest-950">{lead.fullName}</p>
                      <Badge variant={lead.status === "new" ? "gold" : "soon"} className="capitalize">
                        {lead.status}
                      </Badge>
                      <span className="text-xs text-ink-muted">{formatDate(isoDate(lead.createdAt))}</span>
                    </div>
                    <p className="mt-1 text-sm text-ink-soft">
                      {lead.phone}
                      {lead.email && ` · ${lead.email}`}
                      {lead.location && ` · ${lead.location}`}
                    </p>
                    <ul className="mt-2 flex flex-wrap gap-1.5">
                      {lead.interests.map((i) => (
                        <li key={i} className="rounded-full bg-cream-100 px-2.5 py-1 text-xs text-forest-900">
                          {interestLabel[i] ?? i}
                        </li>
                      ))}
                    </ul>
                    {lead.message && <p className="mt-2 max-w-2xl text-sm italic text-ink-soft">“{lead.message}”</p>}
                  </div>
                  <div className="flex flex-wrap items-end gap-2">
                    <a href={`tel:${lead.phone}`} className="inline-flex h-11 items-center gap-2 rounded-full border border-input px-4 text-sm text-forest-900 hover:bg-cream-100">
                      <Phone className="size-4" aria-hidden="true" /> Call
                    </a>
                    <a
                      href={`https://wa.me/${wa}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-11 items-center gap-2 rounded-full border border-input px-4 text-sm text-forest-900 hover:bg-cream-100"
                    >
                      <MessageCircle className="size-4" aria-hidden="true" /> WhatsApp
                    </a>
                    <LeadStatusForm id={lead.id} status={lead.status} />
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </Panel>

      <Panel title="Customer accounts" className="mt-6" description="People with a Cattle Buy account and their allocated animals.">
        {customers.length === 0 ? (
          <p className="text-sm text-ink-muted">
            No customer accounts yet. Accounts are created when a customer is onboarded to a programme; their animals are then assigned from
            each animal&apos;s page.
          </p>
        ) : (
          <ul className="-my-3 divide-y divide-border">
            {customers.map((c) => (
              <li key={c.id} className="flex justify-between gap-4 py-3 text-sm">
                <span>
                  <span className="font-medium text-forest-950">{c.full_name ?? "Unnamed"}</span>
                  <span className="text-ink-muted"> · {c.phone ?? "no phone"}</span>
                </span>
                <span className="text-ink-soft tabular">{c.animals} animals</span>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </>
  );
}

export default function CustomersPage({ searchParams }: PageProps<"/admin/customers">) {
  return (
    <Suspense fallback={<AdminSkeleton />}>
      <CustomersContent searchParams={searchParams} />
    </Suspense>
  );
}
