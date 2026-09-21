import fs from "fs";
import path from "path";
import { slugifyHeading } from "./slugify";

export type TermsSection = {
  id: string;
  title: string;
  body: string;
};

export type TermsDocument = {
  intro: string;
  sections: TermsSection[];
};

const TERMS_PATH = path.join(process.cwd(), "content/legal/terms.md");

export function loadTermsDocument(): TermsDocument {
  const raw = fs.readFileSync(TERMS_PATH, "utf8");
  const chunks = raw.split(/\n(?=## )/);

  const introChunk = chunks[0] ?? "";
  const intro = introChunk.replace(/^#\s+Terms of Service\s*\n?/i, "").trim();

  const sections = chunks.slice(1).map((chunk) => {
    const newline = chunk.indexOf("\n");
    const title =
      newline === -1
        ? chunk.replace(/^##\s+/, "").trim()
        : chunk.slice(0, newline).replace(/^##\s+/, "").trim();
    const body = newline === -1 ? "" : chunk.slice(newline + 1).trim();

    return {
      id: slugifyHeading(title),
      title,
      body,
    };
  });

  return { intro, sections };
}
