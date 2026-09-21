import type { SalesVelocity as Velocity } from "@/lib/admin/velocity";
import { timeAgo, clockLabel } from "@/lib/admin/format";

const W = 480;
const H = 120;
const GAP = 3;

export function SalesVelocity({ velocity }: { velocity: Velocity }) {
  const { buckets, total, latestSaleAt, peak } = velocity;
  const maxCount = Math.max(1, ...buckets.map((b) => b.count));
  const barW = (W - GAP * (buckets.length - 1)) / buckets.length;

  return (
    <section>
      <h2 className="font-mono text-sm font-bold uppercase tracking-widest text-text-primary">
        Sales Velocity — Last 24 Hours
      </h2>

      <div className="mt-4 border border-border-subtle bg-bg-secondary p-5">
        {total === 0 ? (
          <p className="font-mono text-sm text-text-muted">
            No sales in the last 24 hours.
          </p>
        ) : (
          <>
            <svg
              viewBox={`0 0 ${W} ${H}`}
              width="100%"
              height={H}
              preserveAspectRatio="none"
              role="img"
              aria-label="Sales per hour over the last 24 hours"
            >
              {buckets.map((b, i) => {
                const h = (b.count / maxCount) * (H - 4);
                const x = i * (barW + GAP);
                const y = H - h;
                return (
                  <rect
                    key={b.hourStart}
                    x={x}
                    y={y}
                    width={barW}
                    height={Math.max(b.count > 0 ? 2 : 1, h)}
                    fill={b.count > 0 ? "var(--accent-orange)" : "var(--bg-tertiary)"}
                  >
                    <title>
                      {clockLabel(new Date(b.hourStart))} — {b.count} sale
                      {b.count === 1 ? "" : "s"}
                    </title>
                  </rect>
                );
              })}
            </svg>
            <p className="mt-4 font-mono text-xs text-text-secondary">
              Latest sale: {timeAgo(latestSaleAt)} ago.
              {peak
                ? ` Peak hour: ${peak.count} ${
                    peak.count === 1 ? "sale" : "sales"
                  } at ${clockLabel(new Date(peak.hourStart))}.`
                : ""}
            </p>
          </>
        )}
      </div>
    </section>
  );
}
