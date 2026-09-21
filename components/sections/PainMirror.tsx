const PAINS = [
  {
    title: "You wake up already exhausted.",
    body: "Not from sleep — from the weight of pretending you're fine.",
  },
  {
    title: "You've lost the edge.",
    body: "The drive that used to get you out of bed is gone, and \u201cself-care\u201d articles aren't bringing it back.",
  },
  {
    title: "You can't say it out loud.",
    body: "Your mates don't get it. Your partner is tired of it. The doctor wants to prescribe you something.",
  },
  {
    title: "You're sick of talking.",
    body: "You don't need another therapy session telling you what you already know. You need something to do.",
  },
];

export function PainMirror() {
  return (
    <section className="section-pad border-b border-border-subtle">
      <div className="container-narrow">
        <h2 className="text-center text-2xl font-bold uppercase tracking-tight text-text-primary sm:text-4xl">
          If Any Of This Is You, Keep Reading.
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-px bg-border-subtle sm:grid-cols-2">
          {PAINS.map((p) => (
            <div key={p.title} className="bg-bg-primary p-6 sm:p-8">
              <h3 className="text-lg font-bold text-text-primary">{p.title}</h3>
              <p className="mt-3 leading-relaxed text-text-secondary">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
