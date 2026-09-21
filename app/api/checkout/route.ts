import { NextResponse } from "next/server";
import { getStripe, STRIPE_PRICE_ID_FOUNDING } from "@/lib/stripe";
import { isFoundingAvailable } from "@/lib/founding";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const available = await isFoundingAvailable();
  if (!available) {
    return NextResponse.json(
      { error: "founding_round_closed" },
      { status: 410 },
    );
  }

  const stripe = getStripe();
  if (!stripe || !STRIPE_PRICE_ID_FOUNDING || STRIPE_PRICE_ID_FOUNDING === "price_replace_me") {
    return NextResponse.json(
      { error: "Stripe is not configured." },
      { status: 500 },
    );
  }

  let email: string | undefined;
  try {
    const body = await request.json();
    if (body && typeof body.email === "string") email = body.email;
  } catch {
    // No body is fine for v1 (single product).
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://rebuildthemanprotocol.com";

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: STRIPE_PRICE_ID_FOUNDING, quantity: 1 }],
      metadata: { customer_type: "founding" },
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cancelled`,
      allow_promotion_codes: true,
      billing_address_collection: "auto",
      ...(email ? { customer_email: email } : {}),
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[checkout] failed to create session", err);
    return NextResponse.json(
      { error: "Couldn't reach Stripe. Try again in a moment." },
      { status: 502 },
    );
  }
}
