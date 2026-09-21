import Link from "next/link";
import { LAUNCH_CONFIG } from "@/lib/launch-config";
import { spotsToneClass } from "@/lib/spots";

export function LandingCTA({
  remaining,
  available,
}: {
  remaining: number;
  available: boolean;
}) {
  return (
    <section className="grid-texture section-pad border-b border-border-subtle">
      <div className="container-narrow flex flex-col items-center text-center">
        <h2 className="max-w-2xl text-2xl font-bold uppercase tracking-tight text-text-primary sm:text-4xl">
          Ready To Stop Talking And Start Doing?
        </h2>

        {available ? (
          <>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg">
              £{LAUNCH_CONFIG.FOUNDING_PRICE_GBP} one-time. Lifetime access.
              Founding member status. 14-day unconditional refund.
            </p>
            <Link
              href="/join"
              className="btn-pulse mt-8 w-full max-w-md bg-accent-orange px-6 py-5 text-lg font-bold uppercase tracking-wide text-white transition-colors hover:bg-accent-orange-hover"
            >
              Claim A Founding Spot — £{LAUNCH_CONFIG.FOUNDING_PRICE_GBP}
            </Link>
            <p className="mt-4 font-mono text-sm text-text-muted">
              <span className={`font-bold ${spotsToneClass(remaining)}`}>
                {remaining} of {LAUNCH_CONFIG.FOUNDING_SPOTS_TOTAL} spots
                remaining.
              </span>
              <br />
              Price increases when the founding round closes.
            </p>
            <p className="mt-[1in] font-['cursive'] text-xl italic text-white sm:text-2xl">
              &ldquo;The man who moves a mountain begins by carrying away small
              stones.&rdquo;
              <br />~ Confucius
            </p>
          </>
        ) : (
          <>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg">
              All {LAUNCH_CONFIG.FOUNDING_SPOTS_TOTAL} founding spots are taken.
              The next round opens at £{LAUNCH_CONFIG.STANDARD_PRICE_GBP}.
            </p>
            <Link
              href="/waitlist"
              className="mt-8 w-full max-w-md bg-accent-orange px-6 py-5 text-base font-bold uppercase tracking-wide text-white transition-colors hover:bg-accent-orange-hover"
            >
              Founding Round Closed — Join Waitlist
            </Link>
          </>
        )}
      </div>
    </section>
  );
}
