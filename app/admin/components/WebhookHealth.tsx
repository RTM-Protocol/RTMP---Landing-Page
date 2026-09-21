"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { WebhookHealth as Health } from "@/lib/admin/webhook-health";
import { timeAgo } from "@/lib/admin/format";

function Card({
  label,
  children,
  tone = "default",
  onClick,
  expandable = false,
  expanded = false,
}: {
  label: string;
  children: React.ReactNode;
  tone?: "default" | "red" | "green";
  onClick?: () => void;
  expandable?: boolean;
  expanded?: boolean;
}) {
  const color =
    tone === "red"
      ? "text-accent-emergency"
      : tone === "green"
        ? "text-accent-green"
        : "text-text-primary";
  return (
    <div
      onClick={onClick}
      className={`bg-bg-secondary p-5 ${
        expandable ? "cursor-pointer transition-colors hover:bg-bg-tertiary" : ""
      }`}
    >
      <p className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-text-muted">
        <span>{label}</span>
        {expandable && <span className="text-accent-orange">{expanded ? "−" : "+"}</span>}
      </p>
      <div className={`mt-2 font-mono text-lg font-bold ${color}`}>{children}</div>
    </div>
  );
}

export function WebhookHealth({
  health,
  adminKey,
}: {
  health: Health;
  adminKey: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [retrying, setRetrying] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const lastTone =
    health.hoursSinceLast == null
      ? "default"
      : health.hoursSinceLast > 1
        ? "red"
        : health.hoursSinceLast * 60 < 5
          ? "green"
          : "default";

  const rateTone =
    health.successRate == null
      ? "default"
      : health.successRate < 95
        ? "red"
        : "green";

  async function retry(eventId: string) {
    setRetrying(eventId);
    setError(null);
    try {
      const res = await fetch("/api/admin/retry-webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: adminKey, stripe_event_id: eventId }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(`Retry failed: ${data.error ?? res.status}`);
      } else {
        router.refresh();
      }
    } catch {
      setError("Retry failed: network error.");
    } finally {
      setRetrying(null);
    }
  }

  return (
    <section>
      <h2 className="font-mono text-sm font-bold uppercase tracking-widest text-text-primary">
        Stripe Webhook Health
      </h2>

      <div className="mt-4 grid grid-cols-1 gap-px bg-border-subtle sm:grid-cols-3">
        <Card label="Last Event" tone={lastTone}>
          {health.lastEvent ? (
            <span>
              {health.lastEvent.eventType} — {timeAgo(health.lastEvent.createdAt)}
            </span>
          ) : (
            <span className="text-text-muted">No events yet.</span>
          )}
        </Card>

        <Card label="24h Success Rate" tone={rateTone}>
          {health.successRate == null ? (
            <span className="text-text-muted">—</span>
          ) : (
            <span>
              {health.successRate}% — {health.processed24h} / {health.total24h}
            </span>
          )}
        </Card>

        <Card
          label="24h Failures"
          tone={health.failures24h > 0 ? "red" : "green"}
          expandable={health.failures24h > 0}
          expanded={open}
          onClick={
            health.failures24h > 0 ? () => setOpen((o) => !o) : undefined
          }
        >
          {health.failures24h}
        </Card>
      </div>

      {open && (
        <div className="mt-px border border-border-subtle bg-bg-secondary p-5">
          {health.recentFailures.length === 0 ? (
            <p className="font-mono text-sm text-text-muted">No failures.</p>
          ) : (
            <ul className="space-y-3">
              {health.recentFailures.map((f) => (
                <li
                  key={f.stripeEventId}
                  className="flex flex-col gap-2 border-b border-border-subtle pb-3 font-mono text-xs last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <p className="text-text-primary">
                      {f.eventType}{" "}
                      <span className="text-text-muted">
                        — {timeAgo(f.createdAt)} ago
                      </span>
                    </p>
                    <p className="truncate text-accent-emergency">
                      Webhook failed: {f.errorMessage ?? "unknown error"}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => retry(f.stripeEventId)}
                    disabled={retrying === f.stripeEventId}
                    className="shrink-0 border border-border-subtle px-3 py-1.5 uppercase tracking-wide text-text-secondary transition-colors hover:border-accent-emergency hover:text-text-primary disabled:opacity-50"
                  >
                    {retrying === f.stripeEventId ? "Working..." : "Retry"}
                  </button>
                </li>
              ))}
            </ul>
          )}
          {error && (
            <p className="mt-3 font-mono text-xs text-accent-emergency">{error}</p>
          )}
        </div>
      )}
    </section>
  );
}
