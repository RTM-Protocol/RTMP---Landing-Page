import type { Metadata } from "next";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { WaitlistForm } from "@/components/shared/WaitlistForm";
import { LAUNCH_CONFIG } from "@/lib/launch-config";

export const metadata: Metadata = {
  title: "Join the Waitlist — Rebuild The Man Protocol",
};

export default function WaitlistPage() {
  return (
    <>
      <Header />
      <main className="container-narrow section-pad">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-bold uppercase tracking-tight text-text-primary sm:text-5xl">
            Founding Round Closed.
          </h1>
          <p className="mt-4 text-lg text-text-secondary">
            All {LAUNCH_CONFIG.FOUNDING_SPOTS_TOTAL} founding spots are taken.
            The next round opens at £{LAUNCH_CONFIG.STANDARD_PRICE_GBP}.
          </p>
          <p className="mt-2 text-text-muted">
            Leave your email and we&apos;ll tell you the moment it opens.
          </p>

          <div className="mx-auto mt-8 max-w-md text-left">
            <WaitlistForm tag="founding-waitlist" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
