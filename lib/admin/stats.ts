import type { SupabaseClient } from "@supabase/supabase-js";
import { LAUNCH_CONFIG } from "@/lib/launch-config";

export type QuickStats = {
  foundingSold: number;
  foundingRevenue: number;
  waitlist: number;
  leads24h: number;
  refunds: number;
  /** Null when not computable (no public Vercel Analytics API on free tier). */
  avgTimeToBuyMinutes: number | null;
};

const DAY_MS = 24 * 60 * 60 * 1000;

export async function getQuickStats(
  supabase: SupabaseClient | null,
): Promise<QuickStats> {
  const empty: QuickStats = {
    foundingSold: 0,
    foundingRevenue: 0,
    waitlist: 0,
    leads24h: 0,
    refunds: 0,
    avgTimeToBuyMinutes: null,
  };
  if (!supabase) return empty;

  const since = new Date(Date.now() - DAY_MS).toISOString();

  const [foundingActive, refunded, waitlist, leads24h] = await Promise.all([
    supabase
      .from("customers")
      .select("*", { count: "exact", head: true })
      .eq("customer_type", "founding")
      .neq("status", "refunded"),
    supabase
      .from("customers")
      .select("*", { count: "exact", head: true })
      .eq("status", "refunded"),
    supabase
      .from("leads")
      .select("*", { count: "exact", head: true })
      .eq("tag", "founding-waitlist"),
    supabase
      .from("leads")
      .select("*", { count: "exact", head: true })
      .gte("created_at", since),
  ]);

  const foundingSold = foundingActive.count ?? 0;

  return {
    foundingSold,
    foundingRevenue: foundingSold * LAUNCH_CONFIG.FOUNDING_PRICE_GBP,
    waitlist: waitlist.count ?? 0,
    leads24h: leads24h.count ?? 0,
    refunds: refunded.count ?? 0,
    // Time-from-first-/join-view-to-purchase lives in Vercel Analytics, which
    // has no public read API on the free tier. We have no server-side record of
    // the first view, so this is intentionally unavailable here.
    avgTimeToBuyMinutes: null,
  };
}
