"use client";

import { useEffect, useState } from "react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 480);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-40 border border-border-subtle bg-bg-secondary px-4 py-2 font-mono text-xs font-bold uppercase tracking-wide text-text-primary transition-colors hover:border-accent-orange hover:text-accent-orange"
      aria-label="Back to top"
    >
      Top
    </button>
  );
}
