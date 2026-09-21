const PROTOCOLS: {
  name: string;
  code: string;
  color: string;
  tagline: string;
  phases: string[];
}[] = [
  {
    name: "PRESSURE VALVE",
    code: "// PROTOCOL 01",
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
    name: "SYSTEM OVERLOAD",
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
    name: "ENGINE RESTART",
    code: "// PROTOCOL 03",
    color: "var(--protocol-er)",
    tagline: "For the motivation that disappeared and never came back.",
    phases: [
      "Days 1–7: Minimum-viable-day protocol",
      "Days 8–14: Momentum stacks and micro-wins",
      "Days 15–21: Energy audit and identity recalibration",
      "Days 22–30: Daily operating system you can keep running",
    ],
  },
  {
    name: "REALITY CALIBRATION",
    code: "// PROTOCOL 04",
    color: "var(--protocol-rc)",
    tagline: "For the dark thinking that's started to feel normal.",
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
          Four Protocols. One Operating System.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center leading-relaxed text-text-secondary">
          Each protocol is a structured 30-day mission. 120 daily missions in
          total across all four. Daily check-ins, daily actions, daily wins.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {PROTOCOLS.map((p) => (
            <article
              key={p.name}
              className="border border-border-subtle bg-bg-secondary p-6 sm:p-8"
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
