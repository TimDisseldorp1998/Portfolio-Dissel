import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Kruimelpad } from "@/components/Kruimelpad";
import { Container } from "@/components/ui/Container";
import { OverMijVolledig } from "@/components/Bento";
import { Voordelen } from "@/components/Voordelen";
import { Werkwijze } from "@/components/Werkwijze";

const TITEL = "Over Tim Disseldorp | Digitale Product Designer";
const OMSCHRIJVING =
  "Tim Disseldorp, Digitale Product Designer in Heiloo. Werkervaring, opleidingen, toolstack en hoe ik werk, sinds 2024 als DisselDesign.";

export const metadata: Metadata = {
  title: TITEL,
  description: OMSCHRIJVING,
  alternates: { canonical: "/over-mij/" },
  openGraph: {
    title: TITEL,
    description: OMSCHRIJVING,
    type: "profile",
    locale: "nl_NL",
    url: "/over-mij/",
  },
  twitter: { title: TITEL, description: OMSCHRIJVING },
};

export default function OverMijPagina() {
  return (
    <>
      <Navbar />
      <main id="main" className="bg-surface-dark text-white">
        <Container className="pb-20 pt-12 md:pb-28 lg:pt-36">
          <Kruimelpad kruimels={[{ naam: "Over mij", href: "/over-mij/" }]} />

          <header className="mb-10 mt-8 max-w-3xl md:mb-12">
            <p className="mb-3 text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-primary">
              Over mij
            </p>
            <h1 className="font-heading text-[clamp(2rem,7vw,3.25rem)] font-semibold leading-[1.15] tracking-tight">
              Even voorstellen.
            </h1>
          </header>

          <OverMijVolledig />
        </Container>
        <Voordelen />
        <Werkwijze />
      </main>
      <Footer />
    </>
  );
}
