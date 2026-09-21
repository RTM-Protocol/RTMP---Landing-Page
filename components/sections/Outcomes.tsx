import type { ReactNode } from "react";

const ROWS: { now: string; day30: ReactNode }[] = [
  {
    now: "You wake up dreading the day.",
    day30: "You wake up with a clear next actions, goals and purpose.",
  },
  {
    now: "Your anger leaks out at the wrong people, at the wrong time, in the wrong place.",
    day30:
      "Your anger now has a structured outlet — and a Repair Script, if or when it slips.",
  },
  {
    now: "You haven't slept properly in weeks or months.",
    day30: (
      <>
        You&apos;ve now got a 4-Step &apos;<em>Decompress Tactic</em>&apos; that
        actually works for you.
      </>
    ),
  },
  {
    now: "You don't know what's \u201cnormal\u201d anymore.",
    day30:
      "You've got 30 days of your own data showing exactly what's normal for you.",
  },
  {
    now: "You're waiting for a therapist appointment that's six weeks out.",
    day30:
      "You've already run 30 missions and you have evidence of change to bring to the session.",
  },
  {
    now: "You feel like you're failing at being a man.",
    day30:
      "You've got cast-iron proof — in writing — that you've shown up for yourself for 30 days straight.",
  },
];

export function Outcomes() {
  return (
    <section className="section-pad border-b border-border-subtle">
      <div className="container-narrow">
        <h2 className="text-center text-2xl font-bold uppercase tracking-tight text-text-primary sm:text-4xl">
          In 30 Days, Here&apos;s What Changes.
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden border border-border-subtle bg-border-subtle sm:grid-cols-2">
          <div className="bg-bg-secondary p-4 sm:p-5">
            <p className="text-center font-mono text-lg font-bold uppercase tracking-wide text-accent-orange">
              Day 0
            </p>
          </div>
          <div className="bg-bg-secondary p-4 sm:p-5">
            <p className="text-center font-mono text-lg font-bold uppercase tracking-wide text-accent-orange">
              Day 30
            </p>
          </div>

          {ROWS.map((row) => (
            <div key={row.now} className="contents">
              <div className="bg-bg-primary p-5 sm:p-6">
                <p className="leading-relaxed text-text-primary">{row.now}</p>
              </div>
              <div className="border-l-2 border-accent-orange bg-bg-primary p-5 sm:p-6">
                <p className="leading-relaxed text-accent-green">{row.day30}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
