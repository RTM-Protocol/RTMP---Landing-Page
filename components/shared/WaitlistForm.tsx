"use client";

import { useState } from "react";

export function WaitlistForm({ tag = "founding-waitlist" }: { tag?: string }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) {
      setState("error");
      return;
    }
    setState("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, tag }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <p className="font-mono text-sm text-accent-green">
        You're on the list. We'll email you when the next round opens.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="flex w-full flex-col gap-3 sm:flex-row">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@email.com"
        className="flex-1 border border-border-subtle bg-bg-tertiary px-4 py-3 font-mono text-sm text-text-primary placeholder:text-text-muted focus:border-accent-orange focus:outline-none"
      />
      <button
        type="submit"
        disabled={state === "loading"}
        className="bg-accent-orange px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-accent-orange-hover disabled:opacity-60"
      >
        {state === "loading" ? "Working..." : "Join Waitlist"}
      </button>
      {state === "error" && (
        <p className="font-mono text-xs text-accent-emergency sm:hidden">
          Enter a valid email and try again.
        </p>
      )}
    </form>
  );
}
