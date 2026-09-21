import { LAUNCH_CONFIG } from "./launch-config";
import { getSupabaseAdmin } from "./supabase-admin";

type CacheEntry = {
  remaining: number;
  fetchedAt: number;
};

const CACHE_TTL_MS = 60 * 1000;
let cache: CacheEntry | null = null;

/** Drop the cached count so the next read hits the DB (call after a sale). */
export function invalidateFoundingCache(): void {
  cache = null;
}

/**
 * Reads the runtime round-open flag from the `site_state` table, falling back
 * to the compile-time constant. This lets the admin close the round without a
 * redeploy. Returns true if anything goes wrong (fail open to the configured
 * default).
 */
export async function isFoundingRoundOpen(): Promise<boolean> {
  if (!LAUNCH_CONFIG.FOUNDING_ROUND_OPEN) return false;

  const supabase = getSupabaseAdmin();
  if (!supabase) return LAUNCH_CONFIG.FOUNDING_ROUND_OPEN;

  const { data, error } = await supabase
    .from("site_state")
    .select("founding_round_open")
    .eq("id", "singleton")
    .maybeSingle();

  if (error || !data) return LAUNCH_CONFIG.FOUNDING_ROUND_OPEN;
  return data.founding_round_open !== false;
}

/**
 * Live count of founding spots remaining.
 * - Queries Supabase for the count of founding customers.
 * - Returns TOTAL - count, floored at 0.
 * - Caches for 60s to avoid hammering the DB on every render.
 *
 * If Supabase isn't configured, returns the full total so pages still render.
 */
export async function getFoundingSpotsRemaining(): Promise<number> {
  const now = Date.now();
  if (cache && now - cache.fetchedAt < CACHE_TTL_MS) {
    return cache.remaining;
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    // Empty-env fallback: show the full total.
    const remaining = LAUNCH_CONFIG.FOUNDING_SPOTS_TOTAL;
    cache = { remaining, fetchedAt: now };
    return remaining;
  }

  const { count, error } = await supabase
    .from("customers")
    .select("*", { count: "exact", head: true })
    .eq("customer_type", "founding");

  if (error || count === null) {
    // On error, don't pretend spots are gone — show full availability but
    // don't cache the failure for long.
    const remaining = LAUNCH_CONFIG.FOUNDING_SPOTS_TOTAL;
    cache = { remaining, fetchedAt: now - (CACHE_TTL_MS - 5000) };
    return remaining;
  }

  const remaining = Math.max(0, LAUNCH_CONFIG.FOUNDING_SPOTS_TOTAL - count);
  cache = { remaining, fetchedAt: now };
  return remaining;
}

/** Convenience: is the offer effectively available right now? */
export async function isFoundingAvailable(): Promise<boolean> {
  const [open, remaining] = await Promise.all([
    isFoundingRoundOpen(),
    getFoundingSpotsRemaining(),
  ]);
  return open && remaining > 0;
}
