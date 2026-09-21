import Stripe from "stripe";

/**
 * Returns a configured Stripe client, or null if the secret key is missing.
 * Routes should return an informative error when null so the app runs with
 * empty env.
 */
let cached: Stripe | null = null;

export function getStripe(): Stripe | null {
  if (cached) return cached;

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key || key === "sk_live_replace_me") return null;

  cached = new Stripe(key, {
    apiVersion: "2024-06-20",
    typescript: true,
  });
  return cached;
}

export const STRIPE_PRICE_ID_FOUNDING = process.env.STRIPE_PRICE_ID_FOUNDING ?? "";
