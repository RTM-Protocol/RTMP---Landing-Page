import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { TrackOnLoad } from "@/components/shared/TrackOnLoad";

export const metadata: Metadata = {
  title: "Payment Cancelled — Rebuild The Man Protocol",
  robots: { index: false, follow: false },
};

export default function CancelledPage() {
  return (
    <>
      <Header />
      <TrackOnLoad event="checkout_abandoned" />
      <main className="container-narrow section-pad">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-bold uppercase tracking-tight text-text-primary sm:text-5xl">
            Payment Cancelled.
          </h1>
          <p className="mt-4 text-lg text-text-secondary">No charge was made.</p>

          <Link
            href="/join"
            className="mt-8 inline-block bg-accent-red px-8 py-4 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-accent-red-hover"
          >
            Try Again
          </Link>

          <p className="mt-10 text-sm text-text-muted">
            Support: support@rebuildthemanprotocol.com
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
