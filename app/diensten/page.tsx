import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Kruimelpad } from "@/components/Kruimelpad";
import { Services } from "@/components/Services";
import { Testimonials } from "@/components/Testimonials";
import { OG_BEELD } from "@/lib/structured-data";

const TITEL = "Diensten | Webdesign, huisstijl en UX/UI | DisselDesign";
const OMSCHRIJVING =
  "Websites ontwerpen en bouwen, huisstijl en branding, UX/UI design en optimalisatie. Voor ondernemers, merken en bureaus in Noord-Holland.";
// Korter voor de deelkaart: maximaal 125 tekens.
const OG_OMSCHRIJVING =
  "Websites, huisstijl, UX/UI design en optimalisatie voor ondernemers, merken en bureaus in Noord-Holland.";

export const metadata: Metadata = {
  title: TITEL,
  description: OMSCHRIJVING,
  alternates: { canonical: "/diensten/" },
  openGraph: { images: [OG_BEELD], title: TITEL, description: OG_OMSCHRIJVING, type: "website", locale: "nl_NL", url: "/diensten/" },
  twitter: { card: "summary_large_image", title: TITEL, description: OG_OMSCHRIJVING },
};

/** Overzicht van de diensten. In fase 2 komt per dienst een eigen pagina. */
export default function DienstenPagina() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Services
          kop="h1"
          boven={
            <div className="mb-8">
              <Kruimelpad kruimels={[{ naam: "Diensten", href: "/diensten/" }]} />
            </div>
          }
        />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
