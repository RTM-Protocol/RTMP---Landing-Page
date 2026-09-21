"use client";

import { useState } from "react";
import Link from "next/link";
import { track } from "@vercel/analytics";

export function CheckoutButton({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [agreed, setAgreed] = useState(false);

  async function startCheckout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });

      if (res.status === 410) {
        setError("Founding round is closed.");
        setLoading(false);
        return;
      }

      const data = await res.json();
      if (!res.ok || !data.url) {
        setError("Couldn't reach Stripe. Try again in a moment.");
        setLoading(false);
        return;
      }
      track("checkout_started", { plan: "founding" });
      window.location.href = data.url;
    } catch {
      setError("Couldn't reach Stripe. Try again in a moment.");
      setLoading(false);
    }
  }

  return (
    <div className="w-full">
      <label className="mb-4 flex cursor-pointer items-start gap-3 text-left text-sm leading-relaxed text-text-secondary">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-1 h-4 w-4 shrink-0 border border-border-subtle bg-bg-tertiary accent-accent-orange"
        />
        <span>
          I agree to the{" "}
          <Link
            href="/terms"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-orange underline transition-colors hover:text-accent-orange-hover"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-orange underline transition-colors hover:text-accent-orange-hover"
          >
            Privacy Policy
          </Link>
          , and I consent to immediate access to the App. I understand this
          affects my statutory right to cancel. RTMP&apos;s 14-day money-back
          guarantee still applies.
        </span>
      </label>

      <button
        type="button"
        onClick={startCheckout}
        disabled={loading || !agreed}
        className={`btn-pulse w-full bg-accent-orange px-6 py-4 text-center text-base font-bold uppercase tracking-wide text-white transition-colors hover:bg-accent-orange-hover disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      >
        {loading ? "Working..." : label}
      </button>
      {error && (
        <p className="mt-2 text-center font-mono text-xs text-accent-emergency">
          {error}
        </p>
      )}
    </div>
  );
}
