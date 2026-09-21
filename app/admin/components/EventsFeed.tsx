import type { FeedEvent, FeedKind } from "@/lib/admin/events";
import { timeAgo, truncateEmail } from "@/lib/admin/format";

const META: Record<FeedKind, { label: string; color: string }> = {
  customer: { label: "CUSTOMER", color: "var(--accent-green)" },
  lead: { label: "LEAD", color: "var(--text-primary)" },
  waitlist: { label: "WAITLIST", color: "var(--protocol-so)" },
  refund: { label: "REFUND", color: "#E0791F" },
  webhook_fail: { label: "WEBHOOK FAIL", color: "var(--accent-emergency)" },
};

export function EventsFeed({ events }: { events: FeedEvent[] }) {
  return (
    <section>
      <h2 className="font-mono text-sm font-bold uppercase tracking-widest text-text-primary">
        Recent Activity
      </h2>

      <div className="mt-4 max-h-[400px] overflow-y-auto border border-border-subtle bg-bg-secondary">
        {events.length === 0 ? (
          <p className="p-5 font-mono text-sm text-text-muted">
            No recent activity.
          </p>
        ) : (
          <ul className="divide-y divide-border-subtle">
            {events.map((e, i) => {
              const meta = META[e.kind];
              return (
                <li
                  key={i}
                  className="flex items-center gap-3 px-4 py-2.5 font-mono text-xs"
                >
                  <span className="w-10 shrink-0 text-right text-text-muted">
                    {timeAgo(e.at)}
                  </span>
                  <span className="text-text-muted">•</span>
                  <span
                    className="w-28 shrink-0 font-bold"
                    style={{ color: meta.color }}
                  >
                    [{meta.label}]
                  </span>
                  <span className="shrink-0 text-text-primary">
                    {e.kind === "webhook_fail"
                      ? e.subject
                      : truncateEmail(e.subject)}
                  </span>
                  <span className="text-text-muted">•</span>
                  <span className="truncate text-text-secondary">{e.detail}</span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
