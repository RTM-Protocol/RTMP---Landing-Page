import { LAUNCH_CONFIG } from "@/lib/launch-config";
import type { QuickStats as Stats } from "@/lib/admin/stats";

function StatCard({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: string;
  tone?: "default" | "red" | "orange" | "green";
}) {
  const valueColor =
    tone === "red"
      ? "text-accent-emergency"
      : tone === "orange"
        ? "text-accent-orange"
        : tone === "green"
        ? "text-accent-green"
        : "text-text-primary";
  return (
    <div className="bg-bg-secondary p-5">
      <p className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
        {label}
      </p>
      <p className={`mt-2 font-mono text-2xl font-bold ${valueColor}`}>
        {value}
      </p>
    </div>
  );
}

type Tone = "default" | "red" | "orange" | "green";

export function QuickStats({ stats }: { stats: Stats }) {
  const cards: { label: string; value: string; tone: Tone }[] = [
    {
      label: "Founding Sold",
      value: `${stats.foundingSold} / ${LAUNCH_CONFIG.FOUNDING_SPOTS_TOTAL}`,
      tone: stats.foundingSold > 0 ? "orange" : "default",
    },
    {
      label: "Founding Revenue",
      value: `£${stats.foundingRevenue.toLocaleString()}`,
      tone: stats.foundingRevenue > 0 ? "green" : "default",
    },
    { label: "Waitlist", value: `${stats.waitlist}`, tone: "default" },
    {
      label: "Leads (24h)",
      value: `${stats.leads24h}`,
      tone: "default",
    },
    {
      label: "Refunds",
      value: `${stats.refunds}`,
      tone: stats.refunds > 0 ? "red" : "default",
    },
    {
      label: "Avg Time To Buy",
      value:
        stats.avgTimeToBuyMinutes == null
          ? "—"
          : `${stats.avgTimeToBuyMinutes}m`,
      tone: "default",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-px bg-border-subtle sm:grid-cols-3 lg:grid-cols-6">
      {cards.map((c) => (
        <StatCard key={c.label} label={c.label} value={c.value} tone={c.tone} />
      ))}
    </div>
  );
}
