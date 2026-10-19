import type { Metadata } from "next";
import { alleCases } from "@/lib/werk";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Kruimelpad } from "@/components/Kruimelpad";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CaseKaart } from "@/components/werk/CaseKaart";
import { RevealItem, RevealStagger } from "@/components/ui/Reveal";
import { KoffieIcoon } from "@/components/ui/KoffieIcoon";

const TITEL = "Werk van Tim Disseldorp | DisselDesign";
const OMSCHRIJVING =
  "Cases van Tim Disseldorp: huisstijlen, websites en interfaces voor onder meer Kleintjes van Alkmaar, De-Stock, Marktzicht en Ziggo Dome.";

export const metadata: Metadata = {
  title: TITEL,
  description: OMSCHRIJVING,
  alternates: { canonical: "/werk/" },
  openGraph: {
    title: TITEL,
    description: OMSCHRIJVING,
    type: "website",
    locale: "nl_NL",
    url: "/werk/",
  },
  twitter: { title: TITEL, description: OMSCHRIJVING },
};

/** Overzicht van alle cases. Linkt naar elke casepagina. */
export default async function WerkPagina() {
  const cases = await alleCases();

  return (
    <>
      <Navbar />
      <main id="main" className="bg-surface-dark text-white">
        <Container className="pb-20 pt-12 md:pb-28 lg:pt-36">
          <Kruimelpad kruimels={[{ naam: "Werk", href: "/werk/" }]} />

          <header className="mt-8 max-w-3xl">
            <h1 className="font-heading text-[clamp(2rem,7vw,3.25rem)] font-semibold leading-[1.15] tracking-tight">
              Zo ziet het eruit als{" "}
              <span className="whitespace-nowrap text-white/[0.55]">
                het werkt.
              </span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/75">
              Per project de vraag, de aanpak en het resultaat.
            </p>
          </header>

          {/* Zelfde gestaffelde entree als het werk op home. */}
          <RevealStagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cases.map((c, i) => (
              <RevealItem key={c.slug}>
                <CaseKaart
                  caseMeta={c}
                  kop="h2"
                  laden={i < 3 ? "eager" : "lazy"}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
              </RevealItem>
            ))}
          </RevealStagger>

          <section
            aria-labelledby="zelf-zoiets"
            className="mt-20 rounded-3xl bg-white/[0.04] p-8 md:mt-28 md:p-12"
          >
            <h2
              id="zelf-zoiets"
              className="font-heading text-2xl font-semibold leading-tight text-white sm:text-3xl"
            >
              Zelf zoiets?
            </h2>
            <p className="mt-4 max-w-[60ch] leading-relaxed text-white/75">
              Plan een vrijblijvend gesprek van 20 minuten.
            </p>
            <div className="mt-8">
              <Button
                href="/contact/"
                variant="primary"
                size="lg"
                data-cta="plan_kennismaking"
                className="group"
              >
                <KoffieIcoon stoom="hover" />
                Plan een gesprek
              </Button>
            </div>
          </section>
        </Container>
      </main>
      <Footer />
    </>
  );
}
