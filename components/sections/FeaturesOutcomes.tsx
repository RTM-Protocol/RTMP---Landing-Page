import type { ReactNode } from "react";

const ROWS: { feature: string; outcome: ReactNode }[] = [
  {
    feature: "DAILY MISSIONS",
    outcome: (
      <>
        You stop wondering {"\u201c"}what should I be doing about{" "}
        <em className="text-text-primary">this</em>?{"\u201d"} Every morning, the next move is engineered for
        your progress.
      </>
    ),
  },
  {
    feature: "PRE / POST CHECK-INS",
    outcome:
      "You start seeing your patterns in real numbers, true data — not wishy-washy vibes. The fog lifts because you can finally measure it.",
  },
  {
    feature: "4 SPECIALISED PROTOCOLS",
    outcome:
      "Anger, stress, motivation collapse, dark thinking — each has its own field manual. Not one generic plan.",
  },
  {
    feature: "EMERGENCY TOOLS",
    outcome: (
      <>
        When the wave hits at 2am, you&apos;ve got a tactical response built in.{" "}
        <span className="text-text-primary">FREE</span> for everyone —{" "}
        <span className="text-text-primary">ALWAYS</span>.
      </>
    ),
  },
  {
    feature: "FIELD NOTES JOURNAL",
    outcome:
      "A private log of what you tried, what worked, what didn't. Your own data, not a therapist's notes that you'll never see.",
  },
  {
    feature: "STREAK + PROGRESS TRACKING",
    outcome:
      "The dopamine of consistency. You'll see the streak rebuild before you feel the change.",
  },
  {
    feature: "LIFETIME UPDATES",
    outcome: (
      <>
        Every new future protocol and program that gets built — All Yours, (Zero
        Extra Cost) Free, Forever. Your access{" "}
        <span className="text-text-primary">NEVER</span> expires...
      </>
    ),
  },
];

export function FeaturesOutcomes() {
  return (
    <section className="section-pad border-b border-border-subtle">
      <div className="container-narrow">
        <h2 className="text-center text-2xl font-bold uppercase tracking-tight text-text-primary sm:text-4xl">
          Here&apos;s How It Helps
          <br />
          &amp;
          <br />
          What You Get
        </h2>

        <div className="mt-10 overflow-hidden border border-border-subtle">
          {ROWS.map((row) => (
            <div
              key={row.feature}
              className="grid grid-cols-1 gap-2 border-b border-border-subtle p-5 last:border-b-0 sm:grid-cols-[280px_1fr] sm:gap-6 sm:p-6"
            >
              <div className="font-mono text-sm font-bold uppercase tracking-wide text-accent-orange">
                {row.feature}
              </div>
              <div className="leading-relaxed text-text-secondary">
                {row.outcome}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
