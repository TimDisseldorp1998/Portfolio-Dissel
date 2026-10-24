import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { kennisArtikelen } from "@/lib/kennis";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Kruimelpad } from "@/components/Kruimelpad";
import { Container } from "@/components/ui/Container";
import { RevealItem, RevealStagger } from "@/components/ui/Reveal";
import { DienstCta } from "@/components/dienst/onderdelen";

const TITEL = "Kennis: vragen over een website laten maken | DisselDesign";
const OMSCHRIJVING =
  "Antwoorden op de vragen die ondernemers stellen voordat ze een website laten maken: kosten, doorlooptijd, zelf aanpassen, hosting en eigendom.";

export const metadata: Metadata = {
  title: TITEL,
  description: OMSCHRIJVING,
  alternates: { canonical: "/kennis/" },
  openGraph: { title: TITEL, description: OMSCHRIJVING, type: "website", locale: "nl_NL", url: "/kennis/" },
  twitter: { title: TITEL, description: OMSCHRIJVING },
};

/** Overzicht van alle kennisartikelen (lib/kennis.ts). */
export default function KennisPagina() {
  return (
    <>
      <Navbar />
      <main id="main" className="bg-surface-dark text-white">
        <Container className="pb-20 pt-12 md:pb-28 lg:pt-36">
          <Kruimelpad kruimels={[{ naam: "Kennis", href: "/kennis/" }]} />

          <div className="mt-8 max-w-3xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-primary">Kennis</p>
            <h1 className="font-heading text-[clamp(2rem,7vw,3.5rem)] font-semibold leading-[1.1] tracking-tight">
              Vragen over een website laten maken
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/70">
              Voordat iemand een website laat maken, krijg ik bijna altijd dezelfde vijf vragen. Hier staan de
              antwoorden, zoals ik ze ook in een gesprek geef.
            </p>
          </div>

          <RevealStagger className="mt-12 grid gap-5 md:grid-cols-2">
            {kennisArtikelen.map((a) => (
              <RevealItem key={a.pad}>
                <a
                  href={a.pad}
                  className="group flex h-full flex-col rounded-3xl bg-white/[0.04] p-7 transition-colors hover:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:p-8"
                >
                  <h2 className="font-heading text-xl font-semibold leading-snug text-white sm:text-2xl">{a.vraag}</h2>
                  <p className="mt-3 leading-relaxed text-white/70">{a.kort}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-white group-hover:text-primary">
                    Lees het antwoord
                    <ArrowRight size={16} aria-hidden className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </a>
              </RevealItem>
            ))}
          </RevealStagger>

          <div className="mt-16">
            <DienstCta
              kop="Staat jouw vraag er niet bij?"
              tekst="Stel hem in een gratis gesprek van 20 minuten. Je zit daarna nergens aan vast."
            />
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
