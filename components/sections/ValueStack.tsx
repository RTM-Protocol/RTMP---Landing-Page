import { LAUNCH_CONFIG } from "@/lib/launch-config";

const ITEMS: { label: string; price: number }[] = [
  {
    label:
      "The 5 Protocols — Rebuild The Man Protocol (flagship) plus 4 supporting protocols (134 daily missions across burnout, anger, stress, depression, imposter syndrome)",
    price: 497,
  },
  {
    label:
      "Emergency Tools Kit (panic, anger spike, dark-thought ladder — always free for everyone)",
    price: 147,
  },
  {
    label: "Field Notes journal + progress dashboard + streak tracking",
    price: 127,
  },
  {
    label: "Lifetime updates — every new protocol I build, yours forever",
    price: 197,
  },
  {
    label: "Founding Members Forum (private, founding 40 only)",
    price: 197,
  },
  {
    label:
      "Printable PDF Workbook Companion (shipping soon) — all 5 protocols condensed into one field manual, yours to keep and print",
    price: 99,
  },
];

const stackTotal = ITEMS.reduce((sum, item) => sum + item.price, 0);

// STACK_VALUE_GBP is the denominator for the advertised discounts, so it must
// stay equal to the summed line items. Surface any drift loudly in dev/build.
if (
  process.env.NODE_ENV !== "production" &&
  stackTotal !== LAUNCH_CONFIG.STACK_VALUE_GBP
) {
  console.error(
    `Value stack mismatch: line items sum to £${stackTotal} but STACK_VALUE_GBP is £${LAUNCH_CONFIG.STACK_VALUE_GBP}. Update the constant to match, or fix the line items.`,
  );
}

export function ValueStack() {
  const discount = Math.round(
    (1 - LAUNCH_CONFIG.FOUNDING_PRICE_GBP / LAUNCH_CONFIG.STACK_VALUE_GBP) *
      100,
  );
  const standardDiscount = Math.round(
    (1 - LAUNCH_CONFIG.STANDARD_PRICE_GBP / LAUNCH_CONFIG.STACK_VALUE_GBP) *
      100,
  );

  return (
    <section className="section-pad border-b border-border-subtle bg-bg-secondary">
      <div className="container-narrow">
        <h2 className="text-center text-2xl font-bold uppercase tracking-tight text-accent-orange sm:text-3xl">
          What&apos;s Inside — Stacked Value{" "}
          <span className="text-accent-green">
            £{stackTotal.toLocaleString("en-GB")}
          </span>
        </h2>

        <div className="mx-auto mt-10 max-w-3xl overflow-hidden border border-border-subtle">
          {ITEMS.map((row) => (
            <div
              key={row.label}
              className="flex items-start justify-between gap-4 border-b border-border-subtle p-4 sm:p-5"
            >
              <span className="font-mono text-xs leading-relaxed text-text-secondary sm:text-sm">
                {row.label}
              </span>
              <span className="shrink-0 font-mono text-sm text-text-muted line-through">
                £{row.price.toLocaleString("en-GB")}
              </span>
            </div>
          ))}
          <div className="flex items-center justify-between gap-4 bg-bg-tertiary p-4 sm:p-5">
            <span className="font-mono text-sm font-bold uppercase tracking-wide text-accent-green">
              Total Value
            </span>
            <span className="shrink-0 font-mono text-lg font-bold text-accent-green">
              £{stackTotal.toLocaleString("en-GB")}
            </span>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-3xl border border-accent-orange bg-bg-primary p-6 text-center sm:p-8">
          <p className="font-mono text-xl font-bold text-text-primary sm:text-2xl">
            FOUNDING OFFER: £{LAUNCH_CONFIG.FOUNDING_PRICE_GBP}
          </p>
          <p className="mt-2 font-mono text-sm uppercase tracking-wide text-text-secondary">
            One payment. Lifetime access.
          </p>
          <p className="mt-5 font-mono text-base font-bold text-accent-orange">
            That&apos;s {discount}% off the £
            {stackTotal.toLocaleString("en-GB")} founding value.
          </p>
          <p className="mt-1 font-mono text-xs text-text-muted">
            After the founding round closes, the price rises to £
            {LAUNCH_CONFIG.STANDARD_PRICE_GBP} (still {standardDiscount}% off).
          </p>
        </div>
      </div>
    </section>
  );
}
