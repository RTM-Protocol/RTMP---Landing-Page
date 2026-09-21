import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { BackToTop } from "@/components/legal/BackToTop";
import { LegalMarkdown } from "@/components/legal/LegalMarkdown";
import { TermsSidebar } from "@/components/legal/TermsSidebar";
import { loadTermsDocument } from "@/lib/legal/load-terms";

export const metadata: Metadata = {
  title: "Terms of Service — Rebuild The Man Protocol",
};

export default function TermsPage() {
  const { intro, sections } = loadTermsDocument();

  return (
    <>
      <Header />
      <main className="container-narrow section-pad">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/"
            className="font-mono text-xs uppercase tracking-wide text-text-muted transition-colors hover:text-text-secondary"
          >
            ← Back to home
          </Link>

          <p className="mt-6 font-mono text-[10px] font-bold uppercase tracking-widest text-accent-orange">
            Legal / Terms
          </p>

          <h1 className="mt-3 text-3xl font-bold uppercase tracking-tight text-text-primary sm:text-4xl">
            Terms of Service
          </h1>

          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-12">
            <aside className="hidden lg:block">
              <TermsSidebar sections={sections} />
            </aside>

            <article className="min-w-0">
              <div className="lg:hidden">
                <TermsSidebar sections={sections} />
              </div>

              {intro && (
                <div className="mt-8 lg:mt-0">
                  <LegalMarkdown source={intro} />
                </div>
              )}

              {sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-24 border-t border-border-subtle pt-10 first:border-t-0 first:pt-0"
                >
                  <h2 className="text-xl font-bold uppercase tracking-tight text-text-primary">
                    {section.title}
                  </h2>
                  <div className="mt-4">
                    <LegalMarkdown source={section.body} />
                  </div>
                </section>
              ))}
            </article>
          </div>
        </div>
      </main>
      <BackToTop />
      <Footer />
    </>
  );
}
