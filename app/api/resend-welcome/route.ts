import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { generateWelcomeLink } from "@/lib/provision";
import { sendWelcomeEmail } from "@/lib/resend";

export const runtime = "nodejs";

// Simple in-memory rate limiter: 3 resends per hour per session_id.
const RATE_LIMIT = 3;
const WINDOW_MS = 60 * 60 * 1000;
const hits = new Map<string, number[]>();

function rateLimited(sessionId: string): boolean {
  const now = Date.now();
  const recent = (hits.get(sessionId) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    hits.set(sessionId, recent);
    return true;
  }
  recent.push(now);
  hits.set(sessionId, recent);
  return false;
}

export async function POST(request: Request) {
  let sessionId: string | undefined;
  try {
    const body = await request.json();
    sessionId = body?.session_id;
  } catch {
    // fall through
  }

  if (!sessionId) {
    return NextResponse.json({ error: "missing_session_id" }, { status: 400 });
  }

  if (rateLimited(sessionId)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json(
      { error: "Stripe is not configured." },
      { status: 500 },
    );
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== "paid") {
      return NextResponse.json({ error: "not_paid" }, { status: 402 });
    }

    const email =
      session.customer_details?.email || session.customer_email || null;
    if (!email) {
      return NextResponse.json({ error: "no_email" }, { status: 422 });
    }

    const link = await generateWelcomeLink(email);
    if (!link) {
      return NextResponse.json(
        { error: "Couldn't generate link. Try again in a moment." },
        { status: 500 },
      );
    }

    const sent = await sendWelcomeEmail(email, link);
    if (!sent.ok) {
      return NextResponse.json(
        { error: "Couldn't resend. Try again in a moment." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[resend-welcome] error", err);
    return NextResponse.json(
      { error: "Couldn't resend. Try again in a moment." },
      { status: 502 },
    );
  }
}
