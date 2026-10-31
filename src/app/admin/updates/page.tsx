import { Suspense } from "react";

import { publishUpdate } from "@/app/admin/_actions/crm-finance";
import { CopyForWhatsApp } from "@/app/admin/updates/copy-button";
import { ActionForm } from "@/components/admin/action-form";
import { AdminPageHeader, AdminSkeleton } from "@/components/admin/admin-shell";
import { Field, Panel } from "@/components/admin/fields";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { pageStaff } from "@/lib/admin/auth";
import { draftUpdate, listUpdates } from "@/lib/admin/updates";
import { formatDate } from "@/lib/format";

export const metadata = { title: "Farm updates" };

async function UpdatesContent() {
  if (!(await pageStaff("/admin/updates"))) return null;
  const [draft, updates] = await Promise.all([draftUpdate(), listUpdates()]);
  return (
    <>
      <AdminPageHeader title="Farm updates" description="Share what happened on the farm, straight from your records." />
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <Panel title="This month's update" description="Drafted from the last 30 days of records. Edit freely before sharing.">
          {!draft.hasActivity && (
            <p className="mb-4 rounded-lg bg-cream-100 px-4 py-3 text-sm text-ink-soft">
              No field records in the last 30 days yet. Log plantings, irrigation and harvests in Fodder and the draft fills itself in.
            </p>
          )}
          <div>
            <ActionForm id="update-form" action={publishUpdate} submitLabel="Publish to customers" reset={false}>
              <Field label="Title">
                <Input name="title" defaultValue={draft.title} required maxLength={120} />
              </Field>
              <Field label="Update">
                <Textarea name="body" defaultValue={draft.body} required maxLength={2000} className="min-h-40" />
              </Field>
            </ActionForm>
          </div>
          <div className="mt-3">
            <CopyForWhatsApp formId="update-form" />
          </div>
        </Panel>
        <Panel title="Published" description="Shown on customers' dashboards, newest first.">
          {updates.length === 0 ? (
            <p className="text-sm text-ink-muted">Nothing published yet.</p>
          ) : (
            <ol className="-my-3 divide-y divide-border">
              {updates.map((u) => (
                <li key={u.id} className="py-3">
                  <p className="text-xs text-ink-muted">{formatDate(u.published_on)}</p>
                  <p className="mt-0.5 font-medium text-forest-950">{u.title}</p>
                  <p className="mt-1 line-clamp-3 text-sm text-ink-soft">{u.body}</p>
                </li>
              ))}
            </ol>
          )}
        </Panel>
      </div>
    </>
  );
}

export default function UpdatesPage() {
  return (
    <Suspense fallback={<AdminSkeleton />}>
      <UpdatesContent />
    </Suspense>
  );
}
