import type { Metadata } from "next";
import { ArrowLeft, Check } from "lucide-react";
import { bedrag, euro } from "@/lib/content";
import { faqSchema } from "@/lib/structured-data";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Kruimelpad } from "@/components/Kruimelpad";
import { JsonLd } from "@/components/JsonLd";
import { Container } from "@/components/ui/Container";
import { Veelgesteld } from "@/components/Veelgesteld";
import { DienstCta, PrijsTabel, tekstLink } from "@/components/dienst/onderdelen";

const PAD = "/website-laten-maken/wat-kost-een-website/";
const TITEL = "Wat kost een website laten maken? | DisselDesign";
const OMSCHRIJVING =
  "Een website bij DisselDesign kost vanaf € 499 excl. btw. Lees wat de prijs bepaalt, wat er altijd in zit en wat er na de oplevering bij komt.";

export const metadata: Metadata = {
  title: TITEL,
  description: OMSCHRIJVING,
  alternates: { canonical: PAD },
  openGraph: { title: TITEL, description: OMSCHRIJVING, type: "article", locale: "nl_NL", url: PAD },
  twitter: { title: TITEL, description: OMSCHRIJVING },
};

const vragen = [
  { vraag: "Zijn de prijzen inclusief btw?", antwoord: "Nee. Alle bedragen op deze pagina zijn exclusief btw." },
  {
    vraag: "Is het gesprek gratis?",
    antwoord: "Ja. Het gesprek van 20 minuten is gratis en je zit daarna nergens aan vast.",
  },
  {
    vraag: "Wat kost onderhoud per maand?",
    antwoord:
      "Dat hangt af van wat er nodig is: alleen hosting en updates, of ook regelmatig aanpassingen. Je krijgt er een prijs voor in het voorstel.",
  },
];

const inbegrepen = [
  "Ontwerp op maat, geen template",
  "Getest op telefoon, tablet en desktop",
  "Basis-SEO: paginatitels, beschrijvingen, een sitemap en aanmelding bij Google",
  "Een contactformulier dat in je mail binnenkomt",
  "Google Analytics met cookiebanner",
];

const tussenkop = "mt-14 font-heading text-2xl font-semibold text-white sm:text-3xl";
const alinea = "mt-4 text-lg leading-relaxed text-white/75";

/** Kostenartikel bij /website-laten-maken/. Bewust zonder beeld: een
 *  prijsartikel moet snel scanbaar zijn (docs/beelden.md). */
export default function WatKostEenWebsite() {
  const voordeel = bedrag.zonderHuisstijl + bedrag.huisstijlLos - bedrag.metHuisstijl;
  return (
    <>
      <JsonLd data={faqSchema(vragen)} />
      <Navbar />
      <main id="main" className="bg-surface-dark text-white">
        <Container className="pb-20 pt-12 md:pb-28 lg:pt-36">
          <Kruimelpad
            kruimels={[
              { naam: "Diensten", href: "/diensten/" },
              { naam: "Website laten maken", href: "/website-laten-maken/" },
              { naam: "Wat kost een website?", href: PAD },
            ]}
          />

          <article className="mt-8 max-w-3xl">
            <h1 className="font-heading text-[clamp(2rem,7vw,3.25rem)] font-semibold leading-[1.15] tracking-tight">
              Wat kost een website?
            </h1>
            {/* Het korte antwoord eerst: dat pikken Google en AI-assistenten op. */}
            <p className={alinea}>
              <strong className="font-semibold text-white">Het korte antwoord.</strong> Bij
              DisselDesign kost een landingspagina vanaf {euro(bedrag.compact)}. Een website met meerdere
              pagina&apos;s kost vanaf {euro(bedrag.zonderHuisstijl)}, of vanaf {euro(bedrag.metHuisstijl)}{" "}
              met een nieuwe huisstijl erbij. Alle bedragen zijn exclusief btw. Na een gratis gesprek
              krijg je een voorstel met een vaste prijs.
            </p>

            <h2 className={tussenkop}>De pakketten</h2>
            <PrijsTabel
              metOmschrijving
              rijen={[
                {
                  pakket: "Landingspagina",
                  omschrijving: "Eén pagina of een kleine site, voor een nieuw bedrijf, een actie of één dienst",
                  prijs: euro(bedrag.compact),
                },
                {
                  pakket: "Website",
                  omschrijving: "Tot 8 pagina's, ontworpen rond je bestaande logo en kleuren",
                  prijs: euro(bedrag.zonderHuisstijl),
                },
                {
                  pakket: "Website + huisstijl",
                  omschrijving: "Tot 8 pagina's plus een nieuw logo en huisstijl, in één traject",
                  prijs: euro(bedrag.metHuisstijl),
                },
                {
                  pakket: "Alleen een huisstijl",
                  omschrijving: "Logo, kleuren en lettertypen, vastgelegd in een stijlgids",
                  prijs: euro(bedrag.huisstijlLos),
                },
              ]}
            />

            <h2 className={tussenkop}>Wat bepaalt de prijs?</h2>
            <p className={alinea}>
              <strong className="font-semibold text-white">Het aantal pagina&apos;s.</strong> Een
              landingspagina is één pagina. Een website heeft er tot 8, bijvoorbeeld home, diensten,
              over ons, werk en contact. Heb je er meer nodig, dan staat dat in het voorstel.
            </p>
            <p className={alinea}>
              <strong className="font-semibold text-white">Bestaand logo of een nieuwe huisstijl.</strong>{" "}
              Heb je al een logo en kleuren, dan ontwerp ik de site daaromheen. Begin je opnieuw, dan
              maak ik eerst de huisstijl. Samen in één traject is {euro(voordeel)} voordeliger dan los.
            </p>
            <p className={alinea}>
              <strong className="font-semibold text-white">Zelf aanpassen.</strong> Wil je zelf teksten
              en foto&apos;s kunnen wijzigen, dan komt er een CMS bij. Dat zit niet standaard in een
              pakket en staat apart in het voorstel.
            </p>
            <p className={alinea}>
              <strong className="font-semibold text-white">Extra functies.</strong> Denk aan online
              reserveren of afspraken maken, een formulier met meerdere stappen, of een site in meer
              talen. Hoe meer de site moet kunnen, hoe meer werk het is.
            </p>

            <h2 className={tussenkop}>Wat zit er altijd in?</h2>
            <ul className="mt-4 space-y-3">
              {inbegrepen.map((t) => (
                <li key={t} className="flex gap-3 text-lg leading-relaxed text-white/75">
                  <Check size={20} strokeWidth={2.5} aria-hidden className="mt-1 shrink-0 text-primary" />
                  {t}
                </li>
              ))}
            </ul>

            <h2 className={tussenkop}>Wat komt er na de oplevering bij?</h2>
            <p className={alinea}>
              <strong className="font-semibold text-white">Je domeinnaam.</strong> Ik registreer hem op
              jouw naam, zodat hij van jou is. De kosten van het domein betaal jij.
            </p>
            <p className={alinea}>
              <strong className="font-semibold text-white">Onderhoud en hosting.</strong> Hosting,
              updates, back-ups, support en aanpassingen zitten bij mij in één pakket. Wat het kost, hangt
              af van wat er nodig is en staat in het voorstel.
            </p>

            <h2 className={tussenkop}>Een voorbeeld</h2>
            <div className="mt-4 rounded-3xl bg-white/[0.04] p-7">
              <p className="text-lg leading-relaxed text-white/75">
                Een kapsalon wil een site met vijf pagina&apos;s: home, behandelingen, prijzen, over ons
                en contact. Er is al een logo. Dat is het pakket Website: vanaf{" "}
                {euro(bedrag.zonderHuisstijl)} excl. btw.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-white/75">
                Wil de salon zelf de prijzen kunnen aanpassen, dan komt er een CMS bij. Dat staat apart in
                het voorstel. Na de oplevering kiest de salon of ik de hosting en het onderhoud regel.
              </p>
              <p className="mt-4 text-sm italic text-white/60">Dit is een voorbeeld, geen offerte.</p>
            </div>

            <h2 className={tussenkop}>Waarom een vaste prijs?</h2>
            <p className={alinea}>
              Je weet vooraf waar je aan toe bent. In het voorstel staat wat ik maak, wanneer het af is en
              wat het kost. Wil je halverwege iets extra&apos;s, dan krijg je eerst een prijs voordat ik
              eraan begin.
            </p>

            <h2 className={tussenkop}>Veelgestelde vragen</h2>
            <div className="mt-4">
              <Veelgesteld vragen={vragen} />
            </div>
          </article>

          <div className="mt-16">
            <DienstCta
              kop="Wil je weten wat jouw site kost?"
              tekst="Vertel kort wat je wilt laten maken. Na een gratis gesprek krijg je een voorstel met een vaste prijs."
              onder={
                <a href="/website-laten-maken/" className={tekstLink}>
                  <ArrowLeft size={16} aria-hidden />
                  Terug naar Website laten maken
                </a>
              }
            />
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
