import type { SupabaseClient } from "@supabase/supabase-js";

export type FailedEvent = {
  stripeEventId: string;
  eventType: string;
  errorMessage: string | null;
  createdAt: string;
};

export type WebhookHealth = {
  lastEvent: { eventType: string; createdAt: string } | null;
  /** 0–100, or null when there are no events in the window. */
  successRate: number | null;
  processed24h: number;
  total24h: number;
  failures24h: number;
  recentFailures: FailedEvent[];
  /** True when the last event is more than an hour old (or there are none). */
  stale: boolean;
  /** Hours since the last event (null if none ever). */
  hoursSinceLast: number | null;
};

const DAY_MS = 24 * 60 * 60 * 1000;
const HOUR_MS = 60 * 60 * 1000;

export async function getWebhookHealth(
  supabase: SupabaseClient | null,
): Promise<WebhookHealth> {
  const empty: WebhookHealth = {
    lastEvent: null,
    successRate: null,
    processed24h: 0,
    total24h: 0,
    failures24h: 0,
    recentFailures: [],
    stale: false,
    hoursSinceLast: null,
  };
  if (!supabase) return empty;

  const since = new Date(Date.now() - DAY_MS).toISOString();

  const [last, total24h, processed24h, failures24h, failuresList] =
    await Promise.all([
      supabase
        .from("webhook_events")
        .select("event_type, created_at")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle(),
      supabase
        .from("webhook_events")
        .select("*", { count: "exact", head: true })
        .gte("created_at", since),
      supabase
        .from("webhook_events")
        .select("*", { count: "exact", head: true })
        .eq("status", "processed")
        .gte("created_at", since),
      supabase
        .from("webhook_events")
        .select("*", { count: "exact", head: true })
        .eq("status", "failed")
        .gte("created_at", since),
      supabase
        .from("webhook_events")
        .select("stripe_event_id, event_type, error_message, created_at")
        .eq("status", "failed")
        .order("created_at", { ascending: false })
        .limit(5),
    ]);

  const lastEvent = last.data
    ? {
        eventType: (last.data as { event_type: string }).event_type,
        createdAt: (last.data as { created_at: string }).created_at,
      }
    : null;

  const total = total24h.count ?? 0;
  const processed = processed24h.count ?? 0;
  const successRate = total > 0 ? Math.round((processed / total) * 100) : null;

  const hoursSinceLast = lastEvent
    ? (Date.now() - new Date(lastEvent.createdAt).getTime()) / HOUR_MS
    : null;

  const recentFailures: FailedEvent[] = (
    (failuresList.data as {
      stripe_event_id: string;
      event_type: string;
      error_message: string | null;
      created_at: string;
    }[]) ?? []
  ).map((f) => ({
    stripeEventId: f.stripe_event_id,
    eventType: f.event_type,
    errorMessage: f.error_message,
    createdAt: f.created_at,
  }));

  return {
    lastEvent,
    successRate,
    processed24h: processed,
    total24h: total,
    failures24h: failures24h.count ?? 0,
    recentFailures,
    stale: hoursSinceLast === null ? false : hoursSinceLast > 1,
    hoursSinceLast,
  };
}
