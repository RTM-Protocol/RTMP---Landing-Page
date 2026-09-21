"use client";

import { useState } from "react";

export function ResendButton({ sessionId }: { sessionId: string }) {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );
  const [message, setMessage] = useState<string | null>(null);

  async function resend() {
    setState("loading");
    setMessage(null);
    try {
      const res = await fetch("/api/resend-welcome", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId }),
      });
      if (res.status === 429) {
        setState("error");
        setMessage("Too many resends. Try again later.");
        return;
      }
      if (!res.ok) {
        setState("error");
        setMessage("Couldn't resend. Try again in a moment.");
        return;
      }
      setState("done");
      setMessage("Sent again. Give it 2 minutes.");
    } catch {
      setState("error");
      setMessage("Couldn't resend. Try again in a moment.");
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={resend}
        disabled={state === "loading" || state === "done"}
        className="font-mono text-sm text-accent-orange underline transition-colors hover:text-accent-orange-hover disabled:opacity-60"
      >
        {state === "loading"
          ? "Working..."
          : "Didn't get the email? Resend it"}
      </button>
      {message && (
        <p
          className={`mt-2 font-mono text-xs ${
            state === "error" ? "text-accent-emergency" : "text-accent-green"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
