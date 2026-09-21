import Link from "next/link";
import { LAUNCH_CONFIG } from "@/lib/launch-config";
import { spotsToneClass } from "@/lib/spots";

export function Hero({ remaining }: { remaining: number }) {
  return (
    <section className="grid-texture relative flex min-h-[calc(100vh-57px)] items-center border-b border-border-subtle">
      <div className="container-narrow flex flex-col items-center py-16 text-center">
        <h1 className="max-w-3xl text-4xl font-bold uppercase leading-[1.05] tracking-tight text-text-primary sm:text-6xl">
          You&apos;re Not Broken.
          <br />
          You&apos;re Untrained.
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
          A 4-protocol field manual built for men who are done with therapy
          chairs, motivational quotes, and being told to &ldquo;just talk about
          it.&rdquo; Daily missions. Measurable progress. Zero fluff.
        </p>

        <div className="mt-10 flex w-full max-w-sm flex-col items-center gap-5">
          <Link
            href="/join"
            className="btn-pulse w-full bg-accent-orange px-6 py-4 text-base font-bold uppercase tracking-wide text-white transition-colors hover:bg-accent-orange-hover"
          >
            See What&apos;s Inside
          </Link>

          <Link
            href="/emergency"
            className="w-full border border-border-subtle px-6 py-4 text-sm font-bold uppercase tracking-wide text-text-secondary transition-colors hover:border-accent-orange hover:text-text-primary"
          >
            Need Support Right Now?
          </Link>
        </div>

        <p
          className={`mt-12 font-mono text-sm font-bold ${spotsToneClass(remaining)}`}
        >
          Only {LAUNCH_CONFIG.FOUNDING_SPOTS_TOTAL} founding spots. {remaining}{" "}
          remaining.
        </p>
      </div>
    </section>
  );
}
