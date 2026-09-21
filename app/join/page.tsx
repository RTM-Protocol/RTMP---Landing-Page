import type { Metadata } from "next";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { PricingHero } from "@/components/sections/PricingHero";
import { ValueStack } from "@/components/sections/ValueStack";
import { PricingCard } from "@/components/sections/PricingCard";
import { Guarantee } from "@/components/sections/Guarantee";
import { FAQ } from "@/components/sections/FAQ";
import { getFoundingSpotsRemaining, isFoundingAvailable } from "@/lib/founding";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Join the Founding Round — Rebuild The Man Protocol",
  description:
    "One payment. Lifetime access. 14-day refund. Founding member status.",
};

export default async function JoinPage() {
  const [remaining, available] = await Promise.all([
    getFoundingSpotsRemaining(),
    isFoundingAvailable(),
  ]);

  return (
    <>
      <Header />
      <main>
        <PricingHero remaining={remaining} />
        <ValueStack />
        <PricingCard remaining={remaining} available={available} />
        <Guarantee />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
