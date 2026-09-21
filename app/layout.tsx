import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rebuild The Man Protocol — A tactical field manual for men",
  description:
    "You're not broken. You're untrained. A 4-protocol field manual built for men. Daily missions. Measurable progress. Zero fluff.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://rebuildthemanprotocol.com",
  ),
  openGraph: {
    title: "Rebuild The Man Protocol",
    description:
      "A 4-protocol field manual built for men. Daily missions. Measurable progress. Zero fluff.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
