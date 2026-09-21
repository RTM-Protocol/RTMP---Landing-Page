export function Shield({
  size = 24,
  pulse = true,
}: {
  size?: number;
  /** The app's pulsing orange shield. Disable for static contexts. */
  pulse?: boolean;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--accent-orange)"
      strokeWidth={2}
      strokeLinecap="square"
      strokeLinejoin="miter"
      className={pulse ? "shield-pulse" : undefined}
      aria-hidden="true"
    >
      <path
        d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5l-8-3Z"
        fill="var(--accent-orange)"
        fillOpacity={0.12}
      />
      <path d="M12 8v6M9 11h6" />
    </svg>
  );
}
