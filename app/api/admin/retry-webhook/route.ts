import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { processStripeEvent } from "@/lib/process-stripe-event";
import { markEventProcessed, markEventFailed } from "@/lib/webhook-events";

export const runtime = "nodejs";

/**
 * Re-processes a previously failed Stripe event on our side. We re-fetch the
 * event from Stripe by id (source of truth) and run the same handler the live
 * webhook uses, then update the webhook_events row.
 */
export async function POST(request: Request) {
  let key: string | undefined;
  let eventId: string | undefined;
  try {
    const body = await request.json();
    key = body?.key;
    eventId = body?.stripe_event_id;
  } catch {
    // fall through
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword || key !== adminPassword) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  if (!eventId) {
    return NextResponse.json({ error: "missing_event_id" }, { status: 400 });
  }

  const stripe = getStripe();
  const supabase = getSupabaseAdmin();
  if (!stripe || !supabase) {
    return NextResponse.json(
      { error: "Stripe or Supabase not configured." },
      { status: 500 },
    );
  }

  try {
    const event = await stripe.events.retrieve(eventId);
    await processStripeEvent(event);
    await markEventProcessed(supabase, eventId);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[retry-webhook] failed", message);
    await markEventFailed(supabase, eventId, message);
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
