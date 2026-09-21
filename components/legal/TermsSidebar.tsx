import type { TermsSection } from "@/lib/legal/load-terms";

export function TermsSidebar({ sections }: { sections: TermsSection[] }) {
  return (
    <nav
      aria-label="Terms contents"
      className="sticky top-[73px] max-h-[calc(100vh-6rem)] overflow-y-auto border border-border-subtle bg-bg-secondary p-5"
    >
      <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-text-muted">
        Contents
      </p>
      <ol className="mt-4 space-y-2 text-sm">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className="leading-snug text-text-secondary transition-colors hover:text-accent-orange"
            >
              {section.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
