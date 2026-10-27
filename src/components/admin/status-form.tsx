import { setInvestorStatus, setRegistrationStatus } from "@/app/admin/_actions/crm-finance";
import { ActionForm } from "@/components/admin/action-form";
import { Select } from "@/components/admin/fields";

export function LeadStatusForm({ id, status, kind = "customer" }: { id: string; status: string; kind?: "customer" | "investor" }) {
  return (
    <ActionForm action={kind === "investor" ? setInvestorStatus : setRegistrationStatus} submitLabel="Update" reset={false} variant="outline" className="flex flex-wrap items-end gap-3 space-y-0">
      <input type="hidden" name="id" value={id} />
      <div className="w-40">
        <Select name="status" defaultValue={status} aria-label="Lead status" className="h-11">
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="closed">Closed</option>
        </Select>
      </div>
    </ActionForm>
  );
}
