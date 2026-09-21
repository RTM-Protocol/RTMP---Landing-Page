"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

type AllowedValue = string | number | boolean | null;

/**
 * Fires a single Vercel Analytics event once on mount. Used by server-rendered
 * pages (success, cancelled, emergency) that need an explicit conversion/funnel
 * event without becoming client components themselves.
 */
export function TrackOnLoad({
  event,
  props,
}: {
  event: string;
  props?: Record<string, AllowedValue>;
}) {
  useEffect(() => {
    track(event, props);
    // Fire exactly once per mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
