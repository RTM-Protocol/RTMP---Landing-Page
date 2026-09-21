"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const INTERVAL_SECONDS = 30;

/** Refreshes server data every 30s via router.refresh() and shows a countdown. */
export function AutoRefresh() {
  const router = useRouter();
  const [secondsLeft, setSecondsLeft] = useState(INTERVAL_SECONDS);

  useEffect(() => {
    const tick = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          router.refresh();
          return INTERVAL_SECONDS;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(tick);
  }, [router]);

  return (
    <span className="font-mono text-xs text-text-muted">
      Refreshing in {secondsLeft}s...
    </span>
  );
}
