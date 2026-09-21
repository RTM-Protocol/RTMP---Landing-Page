import { LAUNCH_CONFIG } from "@/lib/launch-config";
import { spotsToneClass } from "@/lib/spots";

const ITEMS: { label: string; price: string }[] = [
  { label: "4 Core Protocols (120 missions)", price: "£397" },
  { label: "Emergency Tools Kit (always free)", price: "£147" },
  { label: "Field Notes + Progress Dashboard", price: "£127" },
  { label: "Lifetime Updates — every new protocol", price: "£197" },
  { label: "Founding Members Forum", price: "£197" },
];

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
          Stacked Value: £1,065
        </h2>

        <div className="mt-8 space-y-3 text-left">
          {ITEMS.map((item) => (
            <ValueRow key={item.label} label={item.label} price={item.price} />
          ))}
          <div className="pt-2">
            <ValueRow
              label="TOTAL VALUE"
              price="£1,065"
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
