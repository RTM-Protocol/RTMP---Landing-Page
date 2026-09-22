export const LAUNCH_CONFIG = {
  // Total spots in the founding round
  FOUNDING_SPOTS_TOTAL: 40,
  // Set this to false once 40 spots are sold to trigger sold-out UI.
  // Note: the admin "Mark founding round CLOSED" button overrides this at
  // runtime via the `site_state` row in Supabase (no redeploy needed).
  FOUNDING_ROUND_OPEN: true,
  // Standard post-founding price (used in marketing copy and after sellout)
  STANDARD_PRICE_GBP: 397,
  // Founding price
  FOUNDING_PRICE_GBP: 149,
  // Total stated value of the stack, used to derive advertised discounts.
  STACK_VALUE_GBP: 1264,
} as const;

export type LaunchConfig = typeof LAUNCH_CONFIG;
