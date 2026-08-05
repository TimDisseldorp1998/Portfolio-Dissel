import type { Metadata, Viewport } from "next";
import { Poppins, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { CookieConsent } from "@/components/CookieConsent";

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
  // De site is donker: laat native scrollbars, formuliercontrols en autofill
  // meekleuren in plaats van in lichte modus renderen.
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" className={`${poppins.variable} ${jakarta.variable}`}>
      <body className="min-h-screen bg-surface text-ink antialiased">
        {/* Eerste tabstop: laat toetsenbordgebruikers de navigatie overslaan. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:inline-flex focus:min-h-[48px] focus:items-center focus:rounded-full focus:bg-primary focus:px-6 focus:text-sm focus:font-semibold focus:text-ink focus:outline-none focus:ring-4 focus:ring-primary/40"
        >
          Naar hoofdinhoud
        </a>
        {/* Vóór {children}: de cookiekeuze is met Tab direct na de skip link
            bereikbaar in plaats van pas na de hele pagina. Hij staat fixed,
            dus de DOM-volgorde verandert niets aan de weergave. */}
        <CookieConsent />
        {children}
      </body>
    </html>
  );
}
