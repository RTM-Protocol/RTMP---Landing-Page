import Link from "next/link";

function CrossShield() {
  return (
    <svg
      width={48}
      height={48}
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--accent-emergency)"
      strokeWidth={1.8}
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
    >
      <path
        d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5l-8-3Z"
        fill="var(--accent-emergency)"
        fillOpacity={0.1}
      />
      <path d="M12 7.5v7M8.5 11h7" />
    </svg>
  );
}

export function EmergencyCallout() {
  return (
    <section className="section-pad border-b border-border-subtle bg-bg-secondary">
      <div className="mx-auto flex max-w-story flex-col items-center px-5 text-center">
        <CrossShield />

        <h2 className="mt-6 text-2xl font-bold uppercase tracking-tight text-text-primary sm:text-4xl">
          Need Help Right Now? This Part Is Free.
        </h2>

        <p className="mt-6 text-base leading-relaxed text-text-primary sm:text-lg">
          Some moments don&apos;t wait for a payment. If you&apos;re in crisis —
          panic spiking, anger about to spill over, dark thoughts you can&apos;t
          shake — the Emergency Tools are free. No signup. No card. Just tools.
          They&apos;ll always be free.
        </p>

        <Link
          href="/emergency"
          className="mt-8 w-full max-w-md bg-accent-emergency px-6 py-4 text-base font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-90"
        >
          Open Emergency Tools
        </Link>

        <p className="mt-4 whitespace-nowrap text-sm text-accent-green">
          If you&apos;re in immediate danger, call the Samaritans on 116 123 (UK)
          or your local emergency line.
        </p>
      </div>
    </section>
  );
}
