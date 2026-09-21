import Link from "next/link";
import type { ReactNode } from "react";

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let i = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    const token = match[0];
    if (token.startsWith("**")) {
      nodes.push(
        <strong key={`${keyPrefix}-b-${i}`} className="font-bold text-text-primary">
          {token.slice(2, -2)}
        </strong>,
      );
    } else {
      const linkMatch = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(token);
      if (linkMatch) {
        const [, label, href] = linkMatch;
        const isInternal = href.startsWith("/");
        if (isInternal) {
          nodes.push(
            <Link
              key={`${keyPrefix}-l-${i}`}
              href={href}
              className="text-accent-orange underline transition-colors hover:text-accent-orange-hover"
            >
              {label}
            </Link>,
          );
        } else {
          nodes.push(
            <a
              key={`${keyPrefix}-l-${i}`}
              href={href}
              className="text-accent-orange underline transition-colors hover:text-accent-orange-hover"
              rel="noopener noreferrer"
              target="_blank"
            >
              {label}
            </a>,
          );
        }
      }
    }

    lastIndex = match.index + token.length;
    i += 1;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes.length > 0 ? nodes : [text];
}

function renderParagraph(text: string, key: string) {
  return (
    <p key={key} className="leading-relaxed text-text-secondary">
      {renderInline(text, key)}
    </p>
  );
}

function renderList(items: string[], key: string) {
  return (
    <ul key={key} className="list-disc space-y-2 pl-5 leading-relaxed text-text-secondary">
      {items.map((item, index) => (
        <li key={`${key}-${index}`}>{renderInline(item, `${key}-${index}`)}</li>
      ))}
    </ul>
  );
}

export function LegalMarkdown({ source }: { source: string }) {
  if (!source.trim()) return null;

  const blocks = source.split(/\n\n+/);
  const nodes: ReactNode[] = [];
  let listItems: string[] = [];

  function flushList(index: number) {
    if (listItems.length === 0) return;
    nodes.push(renderList(listItems, `list-${index}`));
    listItems = [];
  }

  blocks.forEach((block, index) => {
    const trimmed = block.trim();
    if (!trimmed) return;

    if (trimmed === "---") {
      flushList(index);
      nodes.push(
        <hr key={`hr-${index}`} className="border-border-subtle" />,
      );
      return;
    }

    const lines = trimmed.split("\n");
    const allListItems = lines.every((line) => line.startsWith("- "));

    if (allListItems) {
      listItems.push(...lines.map((line) => line.slice(2)));
      return;
    }

    flushList(index);

    if (lines.length === 1) {
      nodes.push(renderParagraph(lines[0], `p-${index}`));
      return;
    }

    lines.forEach((line, lineIndex) => {
      if (line.startsWith("- ")) {
        listItems.push(line.slice(2));
      } else if (line.trim()) {
        flushList(index * 100 + lineIndex);
        nodes.push(renderParagraph(line, `p-${index}-${lineIndex}`));
      }
    });
  });

  flushList(blocks.length);

  return <div className="space-y-4">{nodes}</div>;
}
