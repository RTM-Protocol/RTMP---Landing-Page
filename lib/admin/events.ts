import type { SupabaseClient } from "@supabase/supabase-js";
import { LAUNCH_CONFIG } from "@/lib/launch-config";

export type FeedKind =
  | "customer"
  | "lead"
  | "waitlist"
  | "refund"
  | "webhook_fail";

export type FeedEvent = {
  kind: FeedKind;
  at: string;
  /** Email for people-events; event_type for webhook failures. */
  subject: string;
  detail: string;
};

function gbp(amountPence: number | null, fallback: number): string {
  if (amountPence == null) return `£${fallback}`;
  return `£${Math.round(amountPence / 100)}`;
}

/**
 * Unified recent-activity feed: pulls the last `limit` from each source,
 * merges, sorts by timestamp desc, and returns the top `limit`.
 */
export async function getRecentEvents(
  supabase: SupabaseClient | null,
  limit = 20,
): Promise<FeedEvent[]> {
  if (!supabase) return [];

  const [customersRes, leadsRes, failuresRes] = await Promise.all([
    supabase
      .from("customers")
      .select("email, amount_paid, customer_type, status, created_at, refunded_at")
      .order("created_at", { ascending: false })
      .limit(limit),
    supabase
      .from("leads")
      .select("email, tag, created_at")
      .order("created_at", { ascending: false })
      .limit(limit),
    supabase
      .from("webhook_events")
      .select("event_type, error_message, created_at")
      .eq("status", "failed")
      .order("created_at", { ascending: false })
      .limit(limit),
  ]);

  const events: FeedEvent[] = [];

  for (const c of (customersRes.data as {
    email: string;
    amount_paid: number | null;
    customer_type: string;
    status: string;
    created_at: string;
    refunded_at: string | null;
  }[]) ?? []) {
    events.push({
      kind: "customer",
      at: c.created_at,
      subject: c.email,
      detail: `${gbp(c.amount_paid, LAUNCH_CONFIG.FOUNDING_PRICE_GBP)} ${c.customer_type}`,
    });
    if (c.status === "refunded" && c.refunded_at) {
      events.push({
        kind: "refund",
        at: c.refunded_at,
        subject: c.email,
        detail: gbp(c.amount_paid, LAUNCH_CONFIG.FOUNDING_PRICE_GBP),
      });
    }
  }

  for (const l of (leadsRes.data as {
    email: string;
    tag: string;
    created_at: string;
  }[]) ?? []) {
    const isWaitlist = l.tag === "founding-waitlist";
    events.push({
      kind: isWaitlist ? "waitlist" : "lead",
      at: l.created_at,
      subject: l.email,
      detail: l.tag,
    });
  }

  for (const f of (failuresRes.data as {
    event_type: string;
    error_message: string | null;
    created_at: string;
  }[]) ?? []) {
    events.push({
      kind: "webhook_fail",
      at: f.created_at,
      subject: f.event_type,
      detail: f.error_message ?? "unknown error",
    });
  }

  return events
    .sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime())
    .slice(0, limit);
}
