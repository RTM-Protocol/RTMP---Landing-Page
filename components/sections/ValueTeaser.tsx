import { LAUNCH_CONFIG } from "@/lib/launch-config";
import { spotsToneClass } from "@/lib/spots";

const ITEMS: { label: string; price: number }[] = [
  { label: "5 Protocols (134 missions)", price: 497 },
  { label: "Emergency Tools Kit (always free)", price: 147 },
  { label: "Field Notes + Progress Dashboard", price: 127 },
  { label: "Lifetime Updates — every new protocol", price: 197 },
  { label: "Founding Members Forum", price: 197 },
  { label: "PDF Workbook Companion (shipping soon)", price: 99 },
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

function ValueRow({
  label,
  price,
  strike = true,
  bold = false,
}: {
  label: string;
  price: string;
  strike?: boolean;
  bold?: boolean;
}) {
  return (
    <div className="flex items-end gap-2 font-mono text-sm">
      <span className={bold ? "text-text-primary" : "text-text-secondary"}>
        {label}
      </span>
      <span className="mb-1 flex-1 border-b border-dotted border-border-subtle" />
      <span
        className={`${strike ? "text-text-muted line-through" : "text-text-primary"} ${
          bold ? "font-bold" : ""
        }`}
      >
        {price}
      </span>
    </div>
  );
}

export function ValueTeaser({ remaining }: { remaining: number }) {
  return (
    <section className="section-pad border-b border-border-subtle bg-bg-secondary">
      <div className="mx-auto max-w-2xl px-5 text-center">
        <h2 className="font-mono text-2xl font-bold uppercase tracking-tight text-text-primary sm:text-3xl">
          Stacked Value: £{stackTotal.toLocaleString("en-GB")}
        </h2>

        <div className="mt-8 space-y-3 text-left">
          {ITEMS.map((item) => (
            <ValueRow
              key={item.label}
              label={item.label}
              price={`£${item.price.toLocaleString("en-GB")}`}
            />
          ))}
          <div className="pt-2">
            <ValueRow
              label="TOTAL VALUE"
              price={`£${stackTotal.toLocaleString("en-GB")}`}
              strike={false}
              bold
            />
          </div>
        </div>

        <p className="mt-8 font-mono text-base font-bold text-accent-orange sm:text-lg">
          FOUNDING OFFER: £{LAUNCH_CONFIG.FOUNDING_PRICE_GBP} ONE-TIME. ALL OF
          IT. FOREVER.
        </p>
        <p
          className={`mt-3 font-mono text-sm font-bold ${spotsToneClass(remaining)}`}
        >
          Only {LAUNCH_CONFIG.FOUNDING_SPOTS_TOTAL} founding spots. {remaining}{" "}
          remaining.
        </p>
      </div>
    </section>
  );
}
