/**
 * Traffic-light state for the founding-spots counter, by spots remaining:
 * - green  : 40 → 30 remaining (healthy)
 * - amber  : 29 → 10 remaining (counting down)
 * - red    : 9 → 0 remaining (almost gone)
 */
function spotsTone(remaining: number): "green" | "amber" | "red" {
  if (remaining < 10) return "red";
  if (remaining < 30) return "amber";
  return "green";
}

/** Text colour class for the spots-remaining counter. */
export function spotsToneClass(remaining: number): string {
  const tone = spotsTone(remaining);
  return tone === "red"
    ? "text-accent-emergency"
    : tone === "amber"
      ? "text-amber-400"
      : "text-accent-green";
}

/** Background colour class for the progress-bar fill, same thresholds. */
export function spotsBarClass(remaining: number): string {
  const tone = spotsTone(remaining);
  return tone === "red"
    ? "bg-accent-emergency"
    : tone === "amber"
      ? "bg-amber-400"
      : "bg-accent-green";
}
