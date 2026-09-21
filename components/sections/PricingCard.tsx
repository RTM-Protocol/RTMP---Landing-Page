import { LAUNCH_CONFIG } from "@/lib/launch-config";
import { spotsToneClass } from "@/lib/spots";
import { CheckoutButton } from "@/components/shared/CheckoutButton";
import { WaitlistForm } from "@/components/shared/WaitlistForm";

const BULLETS = [
  "Everything in the protocol, forever",
  "Lifetime updates included",
  "Founding member status",
  "Private Members Forum access",
  "14-day unconditional refund",
];

function Check() {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--accent-orange)"
      strokeWidth={3}
      strokeLinecap="square"
      className="mt-1 shrink-0"
      aria-hidden="true"
    >
      <path d="M4 12l5 5L20 6" />
    </svg>
  );
}

export function PricingCard({
  remaining,
  available,
}: {
  remaining: number;
  available: boolean;
}) {
  return (
    <section className="section-pad border-b border-border-subtle">
      <div className="container-narrow flex flex-col items-center">
        {available ? (
          <div className="relative w-full max-w-[480px] border border-border-subtle bg-bg-secondary p-7 sm:p-9">
            <div className="absolute right-0 top-0 bg-accent-orange px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-white">
              Best Value
            </div>

            <p className="text-center font-mono text-xs font-bold uppercase tracking-widest text-text-muted">
              Founding Member
            </p>

            <div className="mt-4 flex items-end justify-center gap-3">
              <span className="font-mono text-6xl font-bold leading-none text-text-primary">
                £{LAUNCH_CONFIG.FOUNDING_PRICE_GBP}
              </span>
            </div>
            <p className="mt-1 text-center font-mono text-sm text-text-muted">
              / ${LAUNCH_CONFIG.FOUNDING_PRICE_USD} USD
            </p>

            <ul className="mt-7 space-y-3">
              {BULLETS.map((b) => (
                <li key={b} className="flex gap-3 text-text-secondary">
                  <Check />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <CheckoutButton
                label={`Claim Your Founding Spot — £${LAUNCH_CONFIG.FOUNDING_PRICE_GBP}`}
              />
            </div>
            <p
              className={`mt-3 text-center font-mono text-sm font-bold ${spotsToneClass(remaining)}`}
            >
              {remaining} of {LAUNCH_CONFIG.FOUNDING_SPOTS_TOTAL} spots remaining
            </p>
          </div>
        ) : (
          <div className="w-full max-w-[480px] border border-border-subtle bg-bg-secondary p-7 sm:p-9">
            <p className="font-mono text-xs font-bold uppercase tracking-widest text-accent-orange">
              Founding Round Closed
            </p>
            <h3 className="mt-3 text-xl font-bold uppercase tracking-tight text-text-primary">
              All {LAUNCH_CONFIG.FOUNDING_SPOTS_TOTAL} founding spots are taken.
            </h3>
            <p className="mt-3 text-text-secondary">
              The next round opens at £{LAUNCH_CONFIG.STANDARD_PRICE_GBP}. Join
              the waitlist and we&apos;ll email you when it does.
            </p>
            <div className="mt-7">
              <WaitlistForm tag="founding-waitlist" />
            </div>
          </div>
        )}

        {available && (
          <p className="mt-6 text-center text-sm text-text-muted">
            Stripe will display the equivalent in your local currency at
            checkout.
          </p>
        )}
      </div>
    </section>
  );
}
