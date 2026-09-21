import { LAUNCH_CONFIG } from "@/lib/launch-config";

const ITEMS: { item: string; value: string }[] = [
  {
    item: "The 4 Core Protocols (120 daily missions across anger, stress, motivation, dark thinking)",
    value: "£397",
  },
  {
    item: "Emergency Tools Kit (panic, anger spike, dark-thought ladder — always free for everyone)",
    value: "£147",
  },
  {
    item: "Field Notes journal + progress dashboard + streak tracking",
    value: "£127",
  },
  {
    item: "Lifetime updates — every new protocol I build, yours forever",
    value: "£197",
  },
  {
    item: "Founding Members Forum (private, founding 40 only)",
    value: "£197",
  },
];

export function ValueStack() {
  const discount = Math.round(
    (1 - LAUNCH_CONFIG.FOUNDING_PRICE_GBP / 1065) * 100,
  );

  return (
    <section className="section-pad border-b border-border-subtle bg-bg-secondary">
      <div className="container-narrow">
        <h2 className="text-center text-2xl font-bold uppercase tracking-tight text-accent-orange sm:text-3xl">
          What&apos;s Inside — Stacked Value{" "}
          <span className="text-accent-green">£1,065</span>
        </h2>

        <div className="mx-auto mt-10 max-w-3xl overflow-hidden border border-border-subtle">
          {ITEMS.map((row) => (
            <div
              key={row.item}
              className="flex items-start justify-between gap-4 border-b border-border-subtle p-4 sm:p-5"
            >
              <span className="font-mono text-xs leading-relaxed text-text-secondary sm:text-sm">
                {row.item}
              </span>
              <span className="shrink-0 font-mono text-sm text-text-muted line-through">
                {row.value}
              </span>
            </div>
          ))}
          <div className="flex items-center justify-between gap-4 bg-bg-tertiary p-4 sm:p-5">
            <span className="font-mono text-sm font-bold uppercase tracking-wide text-accent-green">
              Total Value
            </span>
            <span className="shrink-0 font-mono text-lg font-bold text-accent-green">
              £1,065
            </span>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-3xl border border-accent-orange bg-bg-primary p-6 text-center sm:p-8">
          <p className="font-mono text-xl font-bold text-text-primary sm:text-2xl">
            FOUNDING OFFER: £{LAUNCH_CONFIG.FOUNDING_PRICE_GBP} / $
            {LAUNCH_CONFIG.FOUNDING_PRICE_USD} USD
          </p>
          <p className="mt-2 font-mono text-sm uppercase tracking-wide text-text-secondary">
            One payment. Lifetime access.
          </p>
          <p className="mt-5 font-mono text-base font-bold text-accent-orange">
            That&apos;s an {discount}% discount.
          </p>
          <p className="mt-1 font-mono text-xs text-text-muted">
            After the founding round closes, the price returns to £
            {LAUNCH_CONFIG.STANDARD_PRICE_GBP}.
          </p>
        </div>
      </div>
    </section>
  );
}
