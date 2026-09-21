import Link from "next/link";
import type { ReactNode } from "react";

const FAQS: { q: string; a: ReactNode }[] = [
  {
    q: "Is this therapy?",
    a: "No. RTMP is a structured set of daily protocols. It complements therapy. It does not replace clinical care for severe conditions.",
  },
  {
    q: "What is \u201cfounding member\u201d?",
    a: "The first 40 men to buy at the founding price (£149). You get a private forum with other founding members, direct access to me for product input, and lifetime price-locked access — even when the price increases to £249 later.",
  },
  {
    q: "How does access work after I pay?",
    a: "You'll receive an email within 2 minutes with a one-click link to set your password and access the app. No separate signup required.",
  },
  {
    q: "How long until I see results?",
    a: "Most men report meaningful shifts within 7-14 days of consistent daily missions. Full protocol cycles are 30 days.",
  },
  {
    q: "What if it doesn't work for me?",
    a: "We offer a 14-day money-back guarantee. If you try the app and it's not for you, email support@rebuildthemanprotocol.com within 14 days of purchase and we'll refund you in full. No questions asked.",
  },
  {
    q: "Are the Emergency Tools really free?",
    a: (
      <>
        Yes. Always. No signup, no payment, no card. They&apos;re available at{" "}
        <Link
          href="/emergency"
          className="underline transition-colors hover:text-text-primary"
        >
          Emergency Tools
        </Link>{" "}
        to anyone, paid member or not.
      </>
    ),
  },
  {
    q: "What if I'm in crisis right now?",
    a: "RTMP is not an emergency service. If you're in immediate danger, contact the Samaritans on 116 123 (UK) or your local emergency line. Then use the Emergency Tools at /emergency. Come back to the protocol when you're safe.",
  },
  {
    q: "Do you store my data?",
    a: "Only what's needed to give you access. Field notes and check-ins are yours, in your account, and you can delete them any time.",
  },
  {
    q: "What if the founding round is full when I get here?",
    a: "You can join the waitlist for the next round at the standard price (£249).",
  },
];

export function FAQ() {
  return (
    <section className="section-pad">
      <div className="container-narrow">
        <h2 className="text-center text-2xl font-bold uppercase tracking-tight text-text-primary sm:text-3xl">
          Questions
        </h2>

        <div className="mx-auto mt-10 max-w-2xl divide-y divide-border-subtle border-y border-border-subtle">
          {FAQS.map((f) => (
            <details key={f.q} className="group">
              <summary className="flex items-center justify-between gap-4 py-5 text-text-primary">
                <span className="font-bold">{f.q}</span>
                <span className="font-mono text-accent-orange transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="pb-5 leading-relaxed text-text-secondary">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
