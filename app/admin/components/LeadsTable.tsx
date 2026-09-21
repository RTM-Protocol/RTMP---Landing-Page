import { ExportCsvButton } from "@/components/admin/AdminControls";

export type Lead = {
  email: string;
  tag: string;
  created_at: string;
  mailchimp_synced: boolean;
};

export function LeadsTable({ leads }: { leads: Lead[] }) {
  return (
    <section>
      <div className="flex items-center justify-between">
        <h2 className="font-mono text-sm font-bold uppercase tracking-widest text-text-primary">
          Leads / Waitlist ({leads.length})
        </h2>
        <ExportCsvButton rows={leads} filename="leads.csv" />
      </div>
      <div className="mt-4 overflow-x-auto border border-border-subtle">
        <table className="w-full border-collapse font-mono text-xs">
          <thead>
            <tr className="border-b border-border-subtle bg-bg-tertiary text-left text-text-muted">
              <th className="p-3">Email</th>
              <th className="p-3">Tag</th>
              <th className="p-3">Synced</th>
              <th className="p-3">Created</th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 ? (
              <tr>
                <td className="p-3 text-text-muted" colSpan={4}>
                  No leads yet.
                </td>
              </tr>
            ) : (
              leads.map((l, i) => (
                <tr
                  key={i}
                  className="border-b border-border-subtle text-text-secondary last:border-b-0"
                >
                  <td className="p-3 text-text-primary">{l.email}</td>
                  <td className="p-3">{l.tag}</td>
                  <td className="p-3">{l.mailchimp_synced ? "yes" : "no"}</td>
                  <td className="p-3">{new Date(l.created_at).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
