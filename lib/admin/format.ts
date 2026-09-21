/** Compact "time ago" string, e.g. "3m", "2h", "1d". */
export function timeAgo(date: Date | string | null | undefined): string {
  if (!date) return "—";
  const d = typeof date === "string" ? new Date(date) : date;
  const seconds = Math.floor((Date.now() - d.getTime()) / 1000);
  if (seconds < 5) return "just now";
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  return `${days}d`;
}

/** Short HH:MM local clock label for chart axes. */
export function clockLabel(date: Date): string {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

/** Truncate an email for the events feed: keeps it scannable on one line. */
export function truncateEmail(email: string, max = 26): string {
  if (email.length <= max) return email;
  return `${email.slice(0, max - 1)}…`;
}
