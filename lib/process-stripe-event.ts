import type Stripe from "stripe";
import { getSupabaseAdmin } from "./supabase-admin";
import { provisionFoundingCustomer } from "./provision";
import { invalidateFoundingCache } from "./founding";

/**
 * Core business logic for a verified Stripe event. Shared by the live webhook
 * handler and the admin "Retry" action so both behave identically.
 * Throws on unrecoverable errors so callers can mark the event failed.
 */
export async function processStripeEvent(event: Stripe.Event): Promise<void> {
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const email =
        session.customer_details?.email || session.customer_email || null;

      if (!email) {
        throw new Error("checkout.session.completed had no email");
      }

      await provisionFoundingCustomer({
        email,
        stripeCustomerId:
          typeof session.customer === "string" ? session.customer : null,
        amountTotal: session.amount_total ?? null,
        currency: session.currency ?? null,
      });
      break;
    }

    case "charge.refunded": {
      const charge = event.data.object as Stripe.Charge;
      const email = charge.billing_details?.email?.toLowerCase() ?? null;
      const supabase = getSupabaseAdmin();
      if (supabase && email) {
        await supabase
          .from("customers")
          .update({ status: "refunded", refunded_at: new Date().toISOString() })
          .eq("email", email);
        invalidateFoundingCache();
      }
      break;
    }

    case "invoice.payment_failed": {
      console.warn("[webhook] invoice.payment_failed", event.id);
      break;
    }

    default:
      break;
  }
}
