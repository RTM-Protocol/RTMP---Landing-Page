import type { SupabaseClient } from "@supabase/supabase-js";

export type HourBucket = {
  /** Start of the hour (local) this bucket represents. */
  hourStart: string;
  count: number;
};

export type SalesVelocity = {
  /** 24 buckets, oldest first, newest last. */
  buckets: HourBucket[];
  total: number;
  latestSaleAt: string | null;
  peak: { count: number; hourStart: string } | null;
};

const HOURS = 24;
const HOUR_MS = 60 * 60 * 1000;

function emptyBuckets(): HourBucket[] {
  const now = new Date();
  now.setMinutes(0, 0, 0);
  const buckets: HourBucket[] = [];
  for (let i = HOURS - 1; i >= 0; i--) {
    buckets.push({
      hourStart: new Date(now.getTime() - i * HOUR_MS).toISOString(),
      count: 0,
    });
  }
  return buckets;
}

export async function getSalesVelocity(
  supabase: SupabaseClient | null,
): Promise<SalesVelocity> {
  const buckets = emptyBuckets();
  if (!supabase) {
    return { buckets, total: 0, latestSaleAt: null, peak: null };
  }

  const since = new Date(Date.now() - HOURS * HOUR_MS).toISOString();
  const { data } = await supabase
    .from("customers")
    .select("created_at")
    .eq("customer_type", "founding")
    .gte("created_at", since)
    .order("created_at", { ascending: false });

  const rows = (data as { created_at: string }[]) ?? [];

  const firstHourMs = new Date(buckets[0].hourStart).getTime();
  for (const row of rows) {
    const t = new Date(row.created_at).getTime();
    const idx = Math.floor((t - firstHourMs) / HOUR_MS);
    if (idx >= 0 && idx < HOURS) buckets[idx].count += 1;
  }

  let peak: SalesVelocity["peak"] = null;
  for (const b of buckets) {
    if (b.count > 0 && (!peak || b.count > peak.count)) {
      peak = { count: b.count, hourStart: b.hourStart };
    }
  }

  return {
    buckets,
    total: rows.length,
    latestSaleAt: rows.length > 0 ? rows[0].created_at : null,
    peak,
  };
}
