function WarningIcon() {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="square"
      strokeLinejoin="miter"
      className="mt-0.5 shrink-0"
      aria-hidden="true"
    >
      <path d="M12 3 2 20h20L12 3Z" />
      <path d="M12 10v4M12 17h.01" />
    </svg>
  );
}

export function StaleBanner({ hoursSinceLast }: { hoursSinceLast: number }) {
  const hours = Math.floor(hoursSinceLast);
  return (
    <div className="flex items-start gap-3 border border-accent-emergency bg-bg-secondary p-4 text-accent-emergency">
      <WarningIcon />
      <div className="font-mono text-xs leading-relaxed">
        <p className="font-bold uppercase tracking-widest">
          Webhook Stale — Last Stripe event was {hours} hour
          {hours === 1 ? "" : "s"} ago.
        </p>
        <p className="mt-1 text-text-secondary">
          Confirm the webhook URL is correct in the Stripe Dashboard.
        </p>
      </div>
    </div>
  );
}
