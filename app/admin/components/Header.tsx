import { AutoRefresh } from "./AutoRefresh";

// External dashboards. Update these to your real project URLs as needed —
// they intentionally live here so future-you has one place to change them.
const LINKS: { label: string; href: string }[] = [
  { label: "Stripe", href: "https://dashboard.stripe.com" },
  { label: "Resend", href: "https://resend.com/emails" },
  { label: "Mailchimp", href: "https://login.mailchimp.com" },
  { label: "Vercel Analytics", href: "https://vercel.com/dashboard" },
];

export function AdminHeader({ lastUpdated }: { lastUpdated: string }) {
  return (
    <header className="border-b border-border-subtle pb-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-mono text-sm font-bold uppercase tracking-widest text-accent-orange sm:text-base">
          RTMP Launch Ops — Last Updated: {lastUpdated}
        </h1>
        <AutoRefresh />
      </div>
      <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-text-muted">
        <span className="text-text-muted">External:</span>
        {LINKS.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary transition-colors hover:text-accent-orange"
          >
            {l.label} ↗
          </a>
        ))}
      </p>
    </header>
  );
}
