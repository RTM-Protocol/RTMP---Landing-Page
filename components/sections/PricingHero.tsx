import { LAUNCH_CONFIG } from "@/lib/launch-config";
import { spotsToneClass, spotsBarClass } from "@/lib/spots";

export function PricingHero({ remaining }: { remaining: number }) {
  const total = LAUNCH_CONFIG.FOUNDING_SPOTS_TOTAL;
  const filled = Math.max(0, total - remaining);
  const pct = Math.min(100, Math.round((filled / total) * 100));

  return (
    <section className="grid-texture section-pad border-b border-border-subtle">
      <div className="container-narrow flex flex-col items-center text-center">
        <h1 className="text-3xl font-bold uppercase tracking-tight text-text-primary sm:text-5xl">
          You&apos;ve Made The Right Call.
        </h1>
        <p className="mt-5 text-base text-text-secondary sm:text-lg">
          One payment. Lifetime access. 14-day refund. Founding member status.
        </p>

        <div className="mt-8 w-full max-w-md">
          <div
            className="h-4 w-full overflow-hidden bg-bg-tertiary"
            role="progressbar"
            aria-valuenow={filled}
            aria-valuemin={0}
            aria-valuemax={total}
            aria-label={`${remaining} of ${total} founding spots remaining`}
          >
            <div
              className={`h-full transition-all ${spotsBarClass(remaining)}`}
              style={{ width: `${pct}%` }}
            />
          </div>
          <p
            className={`mt-3 font-mono text-sm font-bold ${spotsToneClass(remaining)}`}
          >
            {remaining} of {total} founding spots remaining
          </p>
        </div>
      </div>
    </section>
  );
}
