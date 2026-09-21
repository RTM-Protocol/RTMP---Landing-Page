import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Records that a Stripe event was received (status: 'received') and returns
 * whether we've already seen this event id. Stripe retries on transient
 * failures, so callers should skip re-processing duplicates.
 */
export async function recordEventReceived(
  supabase: SupabaseClient,
  event: { id: string; type: string; payload: unknown },
): Promise<{ duplicate: boolean }> {
  const { data: existing } = await supabase
    .from("webhook_events")
    .select("id")
    .eq("stripe_event_id", event.id)
    .maybeSingle();

  if (existing) return { duplicate: true };

  const { error } = await supabase.from("webhook_events").insert({
    stripe_event_id: event.id,
    event_type: event.type,
    status: "received",
    payload: event.payload as object,
  });

  if (error) {
    // Unique-violation means a concurrent delivery beat us to it — treat as dup.
    if (error.code === "23505") return { duplicate: true };
    console.error("[webhook-events] failed to record received event", error);
  }

  return { duplicate: false };
}

export async function markEventProcessed(
  supabase: SupabaseClient,
  eventId: string,
): Promise<void> {
  const { error } = await supabase
    .from("webhook_events")
    .update({ status: "processed" })
    .eq("stripe_event_id", eventId);
  if (error) console.error("[webhook-events] failed to mark processed", error);
}

export async function markEventFailed(
  supabase: SupabaseClient,
  eventId: string,
  message: string,
): Promise<void> {
  const { error } = await supabase
    .from("webhook_events")
    .update({ status: "failed", error_message: message.slice(0, 1000) })
    .eq("stripe_event_id", eventId);
  if (error) console.error("[webhook-events] failed to mark failed", error);
}
