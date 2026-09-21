import { CloseRoundButton } from "@/components/admin/AdminControls";

export function Actions({
  adminKey,
  roundOpen,
}: {
  adminKey: string;
  roundOpen: boolean;
}) {
  return (
    <section>
      <h2 className="font-mono text-sm font-bold uppercase tracking-widest text-text-primary">
        Actions
      </h2>
      <div className="mt-4 border border-border-subtle bg-bg-secondary p-5">
        <CloseRoundButton adminKey={adminKey} initialOpen={roundOpen} />
        <p className="mt-4 font-mono text-xs text-text-muted">
          CSV exports for customers and leads are in their section headers above.
        </p>
      </div>
    </section>
  );
}
