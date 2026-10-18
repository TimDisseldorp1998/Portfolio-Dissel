import { ArrowRight, Code2, PenTool, Sparkles, type LucideIcon } from "lucide-react";
import { Section } from "./ui/Section";
import { Container } from "./ui/Container";

/**
 * Services section (server component — no "use client", so the headings, icons
 * and lists render straight into the static HTML for SEO). Drie blokken; in
 * fase 2 krijgt elk blok een link naar zijn eigen dienstpagina.
 */

const serviceColumns: {
  title: string;
  intro: string;
  icon: LucideIcon;
  items: string[];
  /** Linktekst onderaan de kolom. Tot de dienstpagina's er zijn (stap 3)
   *  gaan alle drie naar /diensten/; dan krijgt elke kolom zijn eigen URL. */
  link: { label: string; href: string };
}[] = [
  {
    title: "Websites",
    intro:
      "Een professionele website die laat zien wat je doet en hoe klanten je bereiken.",
    icon: Code2,
    items: [
      "Webdesign",
      "Landingspagina's",
      "Websites laten maken",
      "Web-apps",
      "Onderhoud & hosting",
    ],
    link: { label: "Meer over websites", href: "/diensten/" },
  },
  {
    title: "Huisstijl",
    intro: "Een herkenbare visuele identiteit die past bij jouw bedrijf.",
    icon: Sparkles,
    items: ["Merkidentiteit", "Logo-ontwerp", "Huisstijl", "Brand guidelines"],
    link: { label: "Meer over huisstijl", href: "/diensten/" },
  },
  {
    title: "UX/UI design",
    intro: "Digitale ervaringen die logisch werken en prettig aanvoelen.",
    icon: PenTool,
    items: [
      "UX/UI design",
      "Prototyping",
      "Design systemen",
      "SEO",
      "Conversie-optimalisatie",
      "Snelheid",
    ],
    link: { label: "Meer over UX/UI design", href: "/diensten/" },
  },
];

/**
 * Op home een sectie met H2; op /diensten/ de hoofdinhoud met H1 en een
 * kruimelpad erboven (`boven`).
 */
export function Services({
  kop: Kop = "h2",
  boven,
}: {
  kop?: "h1" | "h2";
  boven?: React.ReactNode;
} = {}) {
  return (
    <Section id="services" variant="dark" className={Kop === "h1" ? "lg:pt-32" : undefined}>
      <Container>
        {boven}
        {/* Subheading + heading on top */}
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-primary">
          Diensten
        </p>
        <Kop className="max-w-3xl font-heading text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
          Wat ik voor je maak.
        </Kop>

        {/* Intro onder de kop, de drie blokken daaronder over de volle
            breedte: naast de intro werden ze te smal en liepen de titels
            over drie regels. */}
        <div className="mt-6 md:mt-12">
          <div className="grid max-w-5xl gap-4 text-base leading-relaxed text-white/70 md:grid-cols-2 md:gap-10">
            <p>
              Ik ontwerp en bouw websites, huisstijlen en interfaces voor
              ondernemers die net beginnen of al jaren draaien. Je praat met de
              persoon die het ook maakt, van de eerste schets tot de site live
              staat.
            </p>
            <p>
              Ontwerp en development liggen bij één persoon. Dat houdt de lijnen
              kort: je vraag gaat niet via een accountmanager, en wat we
              afspreken, bouw ik zelf.
            </p>
          </div>

          <div className="mt-10 md:mt-14">
            <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3">
              {serviceColumns.map((column) => {
                const Icon = column.icon;
                return (
                  <div
                    key={column.title}
                    className="group flex h-full flex-col rounded-3xl bg-white/[0.04] p-7 backdrop-blur-sm transition-[transform,background-color] duration-300 hover:-translate-y-1 hover:bg-white/[0.06]"
                  >
                    <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.12] to-white/[0.02] text-secondary transition-colors duration-300 group-hover:text-primary">
                      <Icon size={22} strokeWidth={1.75} aria-hidden />
                    </span>
                    <h3 className="font-heading text-lg font-semibold leading-snug text-white">
                      {column.title}
                    </h3>
                    <p className="mb-5 mt-2 text-sm leading-relaxed text-white/70">
                      {column.intro}
                    </p>
                    <ul className="mb-6 space-y-2.5">
                      {column.items.map((item) => (
                        <li
                          key={item}
                          className="text-sm leading-snug text-white/60"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                    {/* Op /diensten/ zelf (kop = h1) zou de link naar
                        dezelfde pagina wijzen; daar laten we hem weg. */}
                    {Kop === "h2" && (
                      <a
                        href={column.link.href}
                        className="mt-auto inline-flex items-center gap-1.5 self-start rounded-sm text-sm font-medium text-white underline decoration-white/30 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      >
                        {column.link.label}
                        <ArrowRight size={16} aria-hidden />
                      </a>
                    )}
                  </div>
                );
              })}
            </div>

            <p className="mt-8 text-base leading-relaxed text-white/70">
              Bureau of digitaal team? Ik werk als Freelance Product Designer.{" "}
              <a
                href="/contact/"
                className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-sm font-medium text-white underline decoration-white/30 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Neem contact op
                <ArrowRight size={16} aria-hidden />
              </a>
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
