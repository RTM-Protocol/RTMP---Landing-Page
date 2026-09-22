const PROTOCOLS: {
  name: string;
  code: string;
  color: string;
  tagline: string;
  phases: string[];
}[] = [
  {
    name: "REBUILD THE MAN PROTOCOL",
    code: "// PROTOCOL 01",
    color: "var(--protocol-rtm)",
    tagline:
      "The 14-day flagship. Complete mental reconstruction for men running on empty.",
    phases: [
      "Days 1–4: Assessment — foundation assessment, energy audit, non-negotiable standards, deliberate silence",
      "Days 5–9: Excavation — fear inventory, physical baseline, accountability reset, mental clarity, values alignment",
      "Days 10–13: Reconstruction — purpose statement, failure analysis, discipline practice, gratitude reframe",
      "Day 14: Lock-In — the rebuild commitment",
    ],
  },
  {
    name: "SYSTEM OVERLOAD PROTOCOL",
    code: "// PROTOCOL 02",
    color: "var(--protocol-so)",
    tagline: "For the stress eating your sleep, focus, and relationships.",
    phases: [
      "Days 1–7: Assessment — identify stressors, signals, brain dumps, boundaries",
      "Days 8–14: Reset — physical techniques, sleep, worry management, environment",
      "Days 15–21: Structure — diet, caffeine, cognitive load, work boundaries",
      "Days 22–30: System — connection, controlled exposure, personal stress system",
    ],
  },
  {
    name: "PRESSURE VALVE PROTOCOL",
    code: "// PROTOCOL 03",
    color: "var(--protocol-pv)",
    tagline: "For the anger you can't release in healthy ways.",
    phases: [
      "Days 1–7: Foundation — identify triggers, body signals, basic tools",
      "Days 8–14: Skills — communication, breathing, reframing, physical outlets",
      "Days 15–21: Application — boundaries, journaling, environmental changes",
      "Days 22–30: Integration — advanced techniques, stress testing, system building",
    ],
  },
  {
    name: "ENGINE RESTART PROTOCOL",
    code: "// PROTOCOL 04",
    color: "var(--protocol-er)",
    tagline:
      "For the low mood and flatness that won't lift. For when getting up is the hard part.",
    phases: [
      "Days 1–7: Minimum-viable-day protocol",
      "Days 8–14: Momentum stacks and micro-wins",
      "Days 15–21: Energy audit and identity recalibration",
      "Days 22–30: Daily operating system you can keep running",
    ],
  },
  {
    name: "REALITY CALIBRATION PROTOCOL",
    code: "// PROTOCOL 05",
    color: "var(--protocol-rc)",
    tagline:
      "For the voice that says you're a fraud, no matter what you've achieved.",
    phases: [
      "Days 1–7: Thought-vs-fact drills",
      "Days 8–14: Evidence logs and reframes",
      "Days 15–21: Imposter pattern audit",
      "Days 22–30: Emergency anchors and long-term integration",
    ],
  },
];

export function Protocols() {
  return (
    <section className="section-pad border-b border-border-subtle">
      <div className="container-narrow">
        <h2 className="text-center text-2xl font-bold uppercase tracking-tight text-text-primary sm:text-4xl">
          Five Protocols. One Operating System.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center leading-relaxed text-text-secondary">
          The flagship runs 14 days. Each supporting protocol offers 7, 14, or
          30-day options. 134 daily missions in total across all five.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {PROTOCOLS.map((p, i) => (
            <article
              key={p.name}
              className={`border border-border-subtle bg-bg-secondary p-6 sm:p-8 ${
                i === 0 ? "lg:col-span-2" : ""
              }`}
              style={{ borderLeft: `3px solid ${p.color}` }}
            >
              <p
                className="font-mono text-xs font-bold uppercase tracking-wide"
                style={{ color: p.color }}
              >
                {p.code}
              </p>
              <h3 className="mt-2 text-xl font-bold uppercase tracking-tight text-text-primary">
                {p.name}
              </h3>
              <p className="mt-2 text-text-secondary">{p.tagline}</p>
              <ul className="mt-5 space-y-2">
                {p.phases.map((phase) => (
                  <li
                    key={phase}
                    className="border-l border-border-subtle pl-3 font-mono text-xs leading-relaxed text-text-muted"
                  >
                    {phase}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
