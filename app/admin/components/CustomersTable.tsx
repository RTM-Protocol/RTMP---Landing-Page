import { ExportCsvButton } from "@/components/admin/AdminControls";

export type Customer = {
  email: string;
  amount_paid: number | null;
  currency: string | null;
  customer_type: string;
  status: string;
  created_at: string;
};

export function CustomersTable({ customers }: { customers: Customer[] }) {
  return (
    <section>
      <div className="flex items-center justify-between">
        <h2 className="font-mono text-sm font-bold uppercase tracking-widest text-text-primary">
          Customers ({customers.length})
        </h2>
        <ExportCsvButton rows={customers} filename="customers.csv" />
      </div>
      <div className="mt-4 overflow-x-auto border border-border-subtle">
        <table className="w-full border-collapse font-mono text-xs">
          <thead>
            <tr className="border-b border-border-subtle bg-bg-tertiary text-left text-text-muted">
              <th className="p-3">Email</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Type</th>
              <th className="p-3">Status</th>
              <th className="p-3">Created</th>
            </tr>
          </thead>
          <tbody>
            {customers.length === 0 ? (
              <tr>
                <td className="p-3 text-text-muted" colSpan={5}>
                  No customers yet.
                </td>
              </tr>
            ) : (
              customers.map((c, i) => (
                <tr
                  key={i}
                  className="border-b border-border-subtle text-text-secondary last:border-b-0"
                >
                  <td className="p-3 text-text-primary">{c.email}</td>
                  <td className="p-3">
                    {c.amount_paid != null
                      ? `${(c.amount_paid / 100).toFixed(2)} ${(c.currency ?? "gbp").toUpperCase()}`
                      : "—"}
                  </td>
                  <td className="p-3">{c.customer_type}</td>
                  <td className="p-3">{c.status}</td>
                  <td className="p-3">{new Date(c.created_at).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
