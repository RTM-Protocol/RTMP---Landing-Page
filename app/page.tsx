import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { Hero } from "@/components/sections/Hero";
import { PainMirror } from "@/components/sections/PainMirror";
import { EmergencyCallout } from "@/components/sections/EmergencyCallout";
import { FounderStory } from "@/components/sections/FounderStory";
import { FeaturesOutcomes } from "@/components/sections/FeaturesOutcomes";
import { Protocols } from "@/components/sections/Protocols";
import { Outcomes } from "@/components/sections/Outcomes";
import { ValueTeaser } from "@/components/sections/ValueTeaser";
import { LandingCTA } from "@/components/sections/LandingCTA";
import { getFoundingSpotsRemaining, isFoundingAvailable } from "@/lib/founding";

export const dynamic = "force-dynamic";

export default async function LandingPage() {
  const [remaining, available] = await Promise.all([
    getFoundingSpotsRemaining(),
    isFoundingAvailable(),
  ]);

  return (
    <>
      <Header />
      <main>
        <Hero remaining={remaining} />
        <PainMirror />
        <EmergencyCallout />
        <FounderStory />
        <FeaturesOutcomes />
        <Protocols />
        <Outcomes />
        <ValueTeaser remaining={remaining} />
        <LandingCTA remaining={remaining} available={available} />
      </main>
      <Footer />
    </>
  );
}
