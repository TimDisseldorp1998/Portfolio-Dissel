import { Layers, Pencil, Search, Smartphone, Users, Zap, type LucideIcon } from "lucide-react";
import { Section } from "./ui/Section";
import { Container } from "./ui/Container";
import { Reveal, RevealItem, RevealStagger } from "./ui/Reveal";

/** Bewust beschreven als wat Tim doet, niet als resultaat dat hij belooft. */
const voordelen: { titel: string; tekst: string; icon: LucideIcon }[] = [
  {
    titel: "Snel",
    tekst: "Ik bouw zonder pagebuilder of zware plugins. Pagina's laden daardoor vlot, ook op een telefoon.",
    icon: Zap,
  },
  {
    titel: "Werkt op mobiel",
    tekst: "Ik ontwerp eerst voor de telefoon, want daar komen de meeste bezoekers binnen. Daarna test ik op tablet en desktop.",
    icon: Smartphone,
  },
  {
    titel: "Vindbaar in Google",
    tekst: "Nette paginatitels en beschrijvingen, een sitemap, en je site aangemeld bij Google Search Console.",
    icon: Search,
  },
  {
    titel: "Zelf aanpassen kan",
    tekst: "Wil je zelf teksten of foto's wijzigen, dan komt er een CMS bij. Dat spreken we af in het voorstel.",
    icon: Pencil,
  },
  {
    titel: "Ontworpen voor jouw klanten",
    tekst: "Ik begin bij je bezoekers: wie ze zijn en wat ze op je site moeten doen. Bellen, reserveren of een aanvraag sturen.",
    icon: Users,
  },
  {
    titel: "Klaar om mee te groeien",
    tekst: "Een nieuwe pagina of dienst erbij? De site is zo opgezet dat dat kan zonder opnieuw te beginnen.",
    icon: Layers,
  },
];

/** "Wat er in elke website zit" op /over-mij/, boven de werkwijze. */
export function Voordelen() {
  return (
    <Section id="waarom" variant="dark">
      <Container>
        <Reveal>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-primary">
            Waarom DisselDesign
          </p>
          <h2 className="font-heading text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl">
            Wat er in elke website zit.
          </h2>
        </Reveal>

        <RevealStagger className="mt-8 grid gap-4 sm:grid-cols-2 md:mt-12 lg:grid-cols-3 lg:gap-5">
          {voordelen.map(({ titel, tekst, icon: Icon }) => (
            <RevealItem key={titel}>
              <div className="group flex h-full flex-col rounded-3xl bg-white/[0.04] p-7 transition-colors duration-300 hover:bg-white/[0.06]">
                <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.12] to-white/[0.02] text-secondary transition-colors duration-300 group-hover:text-primary">
                  <Icon size={22} strokeWidth={1.75} aria-hidden />
                </span>
                <h3 className="font-heading text-lg font-semibold text-white">{titel}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/70">{tekst}</p>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
      </Container>
    </Section>
  );
}
