import type { Metadata } from "next";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { ResendButton } from "@/components/shared/ResendButton";
import { TrackOnLoad } from "@/components/shared/TrackOnLoad";
import { getStripe } from "@/lib/stripe";
import { LAUNCH_CONFIG } from "@/lib/launch-config";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Payment Confirmed — Rebuild The Man Protocol",
  robots: { index: false, follow: false },
};

async function getSession(sessionId: string | undefined) {
  if (!sessionId) return null;
  const stripe = getStripe();
  if (!stripe) return null;
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== "paid") return null;
    return {
      email:
        session.customer_details?.email ||
        session.customer_email ||
        "your email",
    };
  } catch {
    return null;
  }
}

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  const sessionId = searchParams.session_id;
  const session = await getSession(sessionId);

  return (
    <>
      <Header />
      <main className="container-narrow section-pad">
        <div className="mx-auto max-w-xl text-center">
          {session ? (
            <>
              <TrackOnLoad
                event="purchase_completed"
                props={{ value: LAUNCH_CONFIG.FOUNDING_PRICE_GBP }}
              />
              <h1 className="text-3xl font-bold uppercase tracking-tight text-text-primary sm:text-5xl">
                Payment Confirmed.
              </h1>
              <p className="mt-4 text-lg text-text-secondary">
                Welcome to the founding round.
              </p>

              <div className="mx-auto mt-10 max-w-md border border-border-subtle bg-bg-secondary p-6 text-left font-mono text-sm leading-relaxed text-text-secondary">
                <p className="text-text-muted">WE&apos;VE JUST SENT YOUR ACCESS LINK TO:</p>
                <p className="mt-1 break-all text-text-primary">{session.email}</p>
                <p className="mt-5 text-text-muted">
                  CHECK YOUR INBOX. CHECK SPAM TOO.
                  <br />
                  THE EMAIL LANDS IN ~2 MINUTES.
                </p>
              </div>

              {sessionId && (
                <div className="mt-8 flex justify-center">
                  <ResendButton sessionId={sessionId} />
                </div>
              )}

              <p className="mt-10 text-sm text-text-muted">
                Need help? Email support@rebuildthemanprotocol.com
              </p>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold uppercase tracking-tight text-text-primary sm:text-4xl">
                We couldn&apos;t confirm this payment.
              </h1>
              <p className="mt-4 text-text-secondary">
                If you were charged, your access email is on its way. Check your
                inbox in a few minutes.
              </p>
              <p className="mt-10 text-sm text-text-muted">
                Need help? Email support@rebuildthemanprotocol.com
              </p>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
