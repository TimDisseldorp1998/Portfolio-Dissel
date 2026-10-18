import { ArrowRight, Check } from "lucide-react";
import { prijs } from "@/lib/content";
import { Section } from "./ui/Section";
import { Container } from "./ui/Container";
import { Reveal, RevealItem, RevealStagger } from "./ui/Reveal";
import { Button } from "./ui/Button";

const pakketten = [
  {
    naam: "Landingspagina of compacte site",
    prijs: prijs.compact,
    tekst: "Eén pagina of een kleine site. Voor een nieuw bedrijf, een actie of één dienst die je los wilt laten zien.",
  },
  {
    naam: "Website",
    prijs: prijs.zonderHuisstijl,
    tekst: "Tot 8 pagina's, ontworpen rond je bestaande logo en kleuren.",
  },
  {
    naam: "Website + huisstijl",
    prijs: prijs.metHuisstijl,
    tekst: "Tot 8 pagina's plus een nieuw logo en huisstijl. Merk en site ontstaan in één traject en passen bij elkaar.",
  },
  {
    naam: "Huisstijl",
    prijs: prijs.huisstijlLos,
    tekst: "Logo, kleuren en lettertypen, vastgelegd in een stijlgids die je aan je drukker of socialmediabeheerder kunt geven.",
  },
];

const inbegrepen = [
  "Ontwerp op maat, geen template",
  "Getest op telefoon, tablet en desktop",
  "Basis-SEO: paginatitels, beschrijvingen, een sitemap en aanmelding bij Google",
  "Een contactformulier dat in je mail binnenkomt, en Google Analytics met cookiebanner",
];

/** Pakketten met vanaf-prijzen op home, direct na de diensten. */
export function Pakketten() {
  return (
    <Section id="prijzen" variant="dark">
      <Container>
        <Reveal>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-primary">
            Prijzen
          </p>
          <h2 className="font-heading text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl">
            Wat het kost.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70">
            Dit zijn vanaf-prijzen, exclusief btw. Na de kennismaking krijg je
            een voorstel met een vaste prijs, dus je weet vooraf waar je aan
            toe bent.
          </p>
        </Reveal>

        <RevealStagger className="mt-10 grid gap-4 sm:grid-cols-2 md:mt-14 lg:grid-cols-4 lg:gap-5">
          {pakketten.map((p) => (
            <RevealItem key={p.naam}>
              <div className="flex h-full flex-col rounded-3xl bg-white/[0.04] p-7 transition-colors duration-300 hover:bg-white/[0.06]">
                <h3 className="font-heading text-lg font-semibold leading-snug text-white">
                  {p.naam}
                </h3>
                {/* "excl. btw" bij elk bedrag, zoals op /voor-ai/. */}
                <p className="mt-4 flex flex-wrap items-baseline gap-x-2">
                  <span className="text-sm text-white/60">vanaf</span>
                  <span className="font-heading text-3xl font-semibold text-white">{p.prijs}</span>
                  <span className="text-sm text-white/60">excl. btw</span>
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-white/70">{p.tekst}</p>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>

        <Reveal className="mt-5">
          <div className="rounded-3xl bg-white/[0.04] p-7 md:p-8">
            <h3 className="font-heading text-lg font-semibold text-white">Altijd inbegrepen</h3>
            <ul className="mt-5 grid gap-3 md:grid-cols-2 md:gap-x-10">
              {inbegrepen.map((item) => (
                <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-white/75">
                  <Check size={18} strokeWidth={2.5} aria-hidden className="mt-0.5 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-white/[0.08] pt-5 text-sm leading-relaxed text-white/60">
              Onderhoud en hosting: op maat, afhankelijk van wat er nodig is.
              Zelf teksten aanpassen met een CMS: op aanvraag.
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-10">
          <Button href="#contact-form" variant="primary" size="lg" data-cta="plan_kennismaking">
            Plan een kennismaking
            <ArrowRight size={18} aria-hidden />
          </Button>
        </Reveal>
      </Container>
    </Section>
  );
}
