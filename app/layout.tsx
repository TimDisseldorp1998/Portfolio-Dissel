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

const SITE_URL = "https://disseldesign.com";

// Eén bron voor de titel en omschrijving. Ze staan op drie plekken (page, OG en
// Twitter) en liepen eerder uit elkaar: de OG-tags waren nog Engels en noemden
// een andere positionering dan de pagina zelf.
const TITEL = "Tim Disseldorp | Digitale product designer in Noord-Holland";
const OMSCHRIJVING =
  "Websites voor lokale ondernemers in Noord-Holland, van huisstijl tot live site. Strak design, snel opgeleverd, meer bezoekers die klant worden.";

export const metadata: Metadata = {
  title: TITEL,
  description: OMSCHRIJVING,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: TITEL,
    description: OMSCHRIJVING,
    type: "website",
    locale: "nl_NL",
    url: SITE_URL,
  },
  twitter: {
    title: TITEL,
    description: OMSCHRIJVING,
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
