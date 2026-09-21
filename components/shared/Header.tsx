import Link from "next/link";
import { Shield } from "./Shield";

type HeaderProps = {
  /** Emergency page uses a minimal header: wordmark only, no nav links. */
  minimal?: boolean;
};

export function Header({ minimal = false }: HeaderProps) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://app.rebuildthemanprotocol.com";

  return (
    <header className="sticky top-0 z-50 border-b border-border-subtle bg-bg-primary/95 backdrop-blur">
      <div className="container-narrow flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <Shield size={24} />
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-text-primary sm:text-xs">
            Rebuild The Man Protocol
          </span>
        </Link>

        {!minimal && (
          <nav className="flex items-center gap-4 sm:gap-6">
            <Link
              href="/emergency"
              className="text-xs font-medium uppercase tracking-wide text-accent-emergency transition-opacity hover:opacity-90 sm:text-sm"
            >
              Emergency Tools
            </Link>
            <a
              href={`${appUrl}/login`}
              className="text-xs font-medium uppercase tracking-wide text-text-secondary transition-colors hover:text-text-primary sm:text-sm"
            >
              Members Login
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
