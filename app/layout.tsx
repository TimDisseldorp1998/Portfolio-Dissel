import type { Metadata, Viewport } from "next";
import { Poppins, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tim Dissel — Digitale Product Designer | Dissel Design",
  description:
    "Freelance digitale product designer uit Nederland. Ik ontwerp en bouw conversiegerichte websites, web-apps en merkidentiteiten die ambitieuze merken laten groeien.",
  openGraph: {
    title: "Tim Disseldorp — Designer & Developer",
    description:
      "Selected work, experience, and services from a designer & developer building thoughtful digital products.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0F",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" className={`${poppins.variable} ${jakarta.variable}`}>
      <body className="min-h-screen bg-surface text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
