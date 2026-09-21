import type { Metadata } from "next";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — Rebuild The Man Protocol",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="container-narrow section-pad">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-3xl font-bold uppercase tracking-tight text-text-primary sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-6 leading-relaxed text-text-secondary">
            In short: we collect only what&apos;s needed to give you access —
            your email and payment record. Your field notes and check-ins are
            yours and can be deleted at any time.
          </p>
          <p className="mt-4 text-sm text-text-muted">
            Questions? Email support@rebuildthemanprotocol.com
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
