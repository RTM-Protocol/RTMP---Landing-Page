import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border-subtle bg-bg-primary">
      <div className="container-narrow py-8">
        <p className="mx-auto max-w-3xl text-center text-xs leading-relaxed text-text-primary">
          <span className="font-bold text-accent-orange">Disclaimer:</span> This
          app is not a substitute for professional mental health care. Results
          vary based on individual circumstances and commitment. If you&apos;re
          experiencing a mental health crisis, thoughts of self-harm, or symptoms
          interfering with daily functioning, seek immediate professional help
          from a qualified mental health professional or call emergency services.
        </p>
      </div>
      <div className="container-narrow flex flex-col gap-4 border-t border-border-subtle py-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="font-mono text-xs text-text-primary">
          <p>© {year} Rebuild The Man Protocol. All rights reserved.</p>
          <p className="mt-2 text-text-muted">
            [COMPANY_NAME] · Registered in England and Wales · Company No.{" "}
            [COMPANY_NUMBER]
          </p>
        </div>
        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-text-muted">
          <Link href="/privacy" className="transition-colors hover:text-text-secondary">
            Privacy
          </Link>
          <Link href="/terms" className="transition-colors hover:text-text-secondary">
            Terms
          </Link>
          <Link
            href="/emergency"
            className="text-accent-emergency transition-opacity hover:opacity-90"
          >
            Emergency
          </Link>
          <a
            href="mailto:support@rebuildthemanprotocol.com"
            className="text-accent-green transition-opacity hover:opacity-90"
          >
            support@rebuildthemanprotocol.com
          </a>
        </nav>
      </div>
    </footer>
  );
}
