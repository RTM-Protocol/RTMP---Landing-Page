import type { Metadata } from "next";
import { Header } from "@/components/shared/Header";
import { TrackOnLoad } from "@/components/shared/TrackOnLoad";

export const metadata: Metadata = {
  title: "Emergency Tools — Free, No Signup",
  description: "Free crisis tools. No signup. No payment. Use what you need.",
  robots: { index: true, follow: true },
};

const TOOLS: { name: string; slug: string; body: string }[] = [
  {
    name: "ANXIETY ATTACK",
    slug: "anxiety-attack",
    body: "When the wave hits and you can't breathe.",
  },
  {
    name: "ANGER SPIKE",
    slug: "anger-spike",
    body: "When you're about to do something you'll regret.",
  },
  {
    name: "URGE CONTROL",
    slug: "urge-control",
    body: "When the urge is louder than you are.",
  },
  {
    name: "OVERWHELM",
    slug: "overwhelm-breaker",
    body: "When everything is too much at once.",
  },
  {
    name: "CONFLICT DE-ESCALATION",
    slug: "conflict-deescalation",
    body: "When it's about to blow up with someone you love.",
  },
  {
    name: "CAN'T SLEEP",
    slug: "sleep-emergency",
    body: "When 3am won't end.",
  },
];

export default function EmergencyPage() {
  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL || "https://app.rebuildthemanprotocol.com";
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://rebuildthemanprotocol.com";

  return (
    <>
      <Header minimal />
      {/* Owner explicitly requested this funnel event in the ops add-on.
          Vercel Analytics is cookieless/anonymous and collects no PII. */}
      <TrackOnLoad event="emergency_page_view" />
      <main className="container-narrow section-pad">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold uppercase tracking-tight text-accent-emergency sm:text-5xl">
            Emergency Tools
          </h1>
          <p className="mt-4 text-base text-text-secondary sm:text-lg">
            Free. No signup. No payment. Use what you need.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {TOOLS.map((tool) => (
              <a
                key={tool.slug}
                href={`${appUrl}/emergency-tools/${tool.slug}`}
                className="block border border-border-subtle bg-bg-secondary p-6 transition-colors hover:border-accent-emergency sm:p-8"
              >
                <h2 className="text-xl font-bold uppercase tracking-tight text-text-primary sm:text-2xl">
                  {tool.name}
                </h2>
                <p className="mt-2 text-text-secondary">{tool.body}</p>
              </a>
            ))}
          </div>

          <a
            href={`${appUrl}/emergency-tools`}
            className="mt-6 inline-block font-mono text-sm font-bold uppercase tracking-wide text-accent-emergency underline underline-offset-4 transition-opacity hover:opacity-90"
          >
            See all emergency tools
          </a>

          <div className="mt-12 border-l-2 border-accent-emergency bg-bg-secondary p-6 sm:p-8">
            <p className="leading-relaxed text-text-primary">
              If you are in immediate danger to yourself or others, contact
              emergency services right now:
            </p>
            <ul className="mt-4 space-y-2 font-mono text-sm text-text-secondary">
              <li>
                <span className="font-bold text-text-primary">UK</span> —
                Samaritans: 116 123 (free, 24/7)
              </li>
              <li>
                <span className="font-bold text-text-primary">UK</span> — NHS
                Emergency: 999
              </li>
              <li>
                <span className="font-bold text-text-primary">US</span> — 988
                Suicide &amp; Crisis Lifeline
              </li>
              <li>
                <span className="font-bold text-text-primary">International</span>{" "}
                —{" "}
                <a
                  href="https://findahelpline.com"
                  className="underline transition-colors hover:text-text-primary"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  findahelpline.com
                </a>
              </li>
            </ul>
          </div>

          <p className="mt-16 text-center text-lg font-medium leading-relaxed text-text-secondary">
            When you&apos;re safe, the full{" "}
            <a
              href={baseUrl}
              className="text-accent-orange underline transition-colors hover:text-accent-orange-hover"
            >
              Rebuild The Man Protocol
            </a>{" "}
            is here when you&apos;re ready.
          </p>
        </div>
      </main>
    </>
  );
}
