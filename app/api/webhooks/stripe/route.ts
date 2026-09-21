import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { processStripeEvent } from "@/lib/process-stripe-event";
import {
  recordEventReceived,
  markEventProcessed,
  markEventFailed,
} from "@/lib/webhook-events";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripe || !webhookSecret || webhookSecret === "whsec_replace_me") {
    console.warn("[webhook] Stripe webhook not configured.");
    return NextResponse.json({ received: true, note: "not_configured" });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "missing_signature" }, { status: 400 });
  }

  const rawBody = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    console.error("[webhook] signature verification failed", err);
    return NextResponse.json({ error: "invalid_signature" }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();

  // Log the event as 'received' and dedupe before processing. Stripe retries
  // transient failures, so a previously seen id is ack'd without re-processing.
  if (supabase) {
    const { duplicate } = await recordEventReceived(supabase, {
      id: event.id,
      type: event.type,
      payload: event,
    });
    if (duplicate) {
      return NextResponse.json({ received: true, deduped: true });
    }
  }

  try {
    await processStripeEvent(event);
    if (supabase) await markEventProcessed(supabase, event.id);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[webhook] handler error", message);
    if (supabase) await markEventFailed(supabase, event.id, message);
    // Still return 200 so Stripe doesn't hammer retries on our app errors;
    // the failure is now visible in the admin webhook-health panel.
  }

  return NextResponse.json({ received: true });
}
