"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/lib/content";
import { Section } from "./ui/Section";
import { Container } from "./ui/Container";
import { Reveal, RevealStagger, RevealItem } from "./ui/Reveal";
import { cn } from "@/lib/cn";

// De drawer en framer-motion worden pas opgehaald zodra iemand een case
// opent. Ze stonden in de HTML toch nooit (de drawer is dicht bij het laden),
// dus `ssr: false` kost hier niets aan vindbaarheid.
const ProjectDetailOverlay = dynamic(() => import("./ProjectDetailOverlay"), {
  ssr: false,
});

// Radial-gradient accents tuned for the dark surface. Cyan is the brand
// primary; secondary orange and their mix provide variety across cards.
const accentBg: Record<Project["accent"], string> = {
  primary:
    "bg-[radial-gradient(circle_at_20%_20%,rgba(92,221,255,0.45),transparent_60%),radial-gradient(circle_at_80%_80%,rgba(92,221,255,0.14),transparent_60%)]",
  secondary:
    "bg-[radial-gradient(circle_at_20%_20%,rgba(255,131,61,0.45),transparent_60%),radial-gradient(circle_at_80%_80%,rgba(255,131,61,0.14),transparent_60%)]",
  mix: "bg-[radial-gradient(circle_at_25%_20%,rgba(92,221,255,0.42),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(255,131,61,0.4),transparent_60%)]",
};

const CASE_PARAM = "case";

function caseFromUrl(): Project | null {
  const slug = new URLSearchParams(window.location.search).get(CASE_PARAM);
  if (!slug) return null;
  return projects.find((p) => p.slug === slug) ?? null;
}

export function Projects() {
  const [active, setActive] = useState<Project | null>(null);
  // Blijft `true` zodra er één keer een case open is geweest: het overlay moet
  // gemount blijven, anders kan AnimatePresence de sluit-animatie niet draaien.
  const [hasOpened, setHasOpened] = useState(false);
  // Card that opened the panel — focus returns here on close (a11y).
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  // Hebben wij zelf een history-entry gepusht voor deze case? Zo niet (iemand
  // kwam binnen via een gedeelde link), dan is er niets om naar terug te gaan.
  const pushedRef = useRef(false);

  // Directe binnenkomst met ?case=<slug> opent meteen de juiste case.
  useEffect(() => {
    const fromUrl = caseFromUrl();
    if (fromUrl) {
      setActive(fromUrl);
      setHasOpened(true);
    }
  }, []);

  // Back en Forward bedienen de drawer. Alles blijft client-side op dezelfde
  // pagina (static export), dus de scrollpositie eronder verandert niet.
  useEffect(() => {
    const onPopState = () => {
      const fromUrl = caseFromUrl();
      setActive(fromUrl);
      if (fromUrl) setHasOpened(true);
      pushedRef.current = fromUrl !== null;
      if (!fromUrl) triggerRef.current?.focus({ preventScroll: true });
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  function openProject(
    project: Project,
    e: React.MouseEvent<HTMLButtonElement>
  ) {
    triggerRef.current = e.currentTarget;
    setActive(project);
    setHasOpened(true);
    window.history.pushState(null, "", `?${CASE_PARAM}=${project.slug}`);
    pushedRef.current = true;
  }

  function closeProject() {
    if (pushedRef.current) {
      // Onze eigen entry terugdraaien; de popstate-handler sluit de drawer en
      // zet de focus terug op de kaart.
      pushedRef.current = false;
      window.history.back();
      return;
    }
    // Binnengekomen via een gedeelde link: alleen de param opruimen.
    window.history.replaceState(null, "", window.location.pathname);
    setActive(null);
    triggerRef.current?.focus({ preventScroll: true });
  }

  return (
    <Section id="work" variant="dark">
      <Container>
        <Reveal>
          <div className="mb-6 md:mb-12">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-primary">
              Recent werk
            </p>
            <h2 className="font-heading text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl">
              Zo ziet het eruit als{" "}
              <span className="whitespace-nowrap text-white/[0.55]">het werkt.</span>
            </h2>
          </div>
        </Reveal>

        <RevealStagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <RevealItem key={p.title}>
              {/* De kaart zelf is geen knop meer: anders wordt de complete
                  kaarttekst één lange toegankelijke naam en telt de h3 niet
                  als kop. De knop is nu een overlay die de hele kaart bedekt,
                  met een korte naam. Visueel en qua klikgebied identiek. */}
              {/* Alle kaarten hebben dezelfde vorm: achtergrond over de hele
                  kaart, tekst eroverheen tegen de onderrand. Geen rand en geen
                  vlak over de achtergrond, want die zouden als lijn of waas
                  zichtbaar zijn. Ook tilt de kaart niet op bij hover: de
                  achtergrond loopt door tot de rand, en een verschuivende rand
                  tegen de donkere pagina trekt de aandacht naar de kaartcontour
                  in plaats van naar het beeld. Inzoomen en de oranje knop doen
                  het werk. */}
              <article className="group relative flex h-full w-full flex-col overflow-hidden rounded-3xl text-left transition-[box-shadow] duration-300 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#ff833d] has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-surface-dark">
                {p.cardImage ? (
                  <img
                    src={p.cardImage}
                    alt=""
                    aria-hidden
                    loading="lazy"
                    draggable={false}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.04]"
                  />
                ) : (
                  // Plaatshouder tot er een foto is: het kleurvlak van de case.
                  // Eén regel `cardImage` in lib/content.ts vervangt hem.
                  <div
                    aria-hidden
                    className={cn(
                      "absolute inset-0 transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.04]",
                      accentBg[p.accent]
                    )}
                  />
                )}

                {/* Vlakke tint alleen onder een foto: die kan overal fel zijn.
                    Het kleurvlak van een plaatshouder is al donker, en de tint
                    zou de kleur er volledig uit drukken. */}
                {p.cardImage && (
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-[rgba(10,10,15,0.55)]"
                  />
                )}
                {/* De gradient onderlangs maakt de tekst leesbaar, wat de
                    achtergrond ook is. De onderste stop is volledig dekkend, niet
                    0.95: bij 0.95 schijnt 2,25% door en werd de onderrand van de
                    kaart een paar waarden lichter dan de pagina, wat de contour
                    als haarlijn liet oplichten. */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(10,10,15,1)_0%,rgba(10,10,15,0.80)_38%,rgba(10,10,15,0)_78%)]"
                />

                {/* Lege ruimte met de verhouding van het oude beeldblok, zodat de
                    kaarthoogte op dezelfde manier wordt berekend als voorheen,
                    zonder vaste pixelwaarde. `grow` vangt de speling op als een
                    buurkaart hoger uitvalt, zodat de tekst tegen de onderrand
                    blijft staan. */}
                <div aria-hidden className="w-full grow aspect-[16/11]" />

                <div className="relative flex flex-col gap-3 p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-heading text-lg font-semibold leading-snug text-white">
                      {p.title}
                    </h3>
                    <span
                      aria-hidden
                      className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary transition-[background-color,color] duration-300 group-hover:bg-secondary group-hover:text-white"
                    >
                      <ArrowUpRight size={16} />
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-white/60">
                    {p.description}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-white/60"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => openProject(p, e)}
                  aria-haspopup="dialog"
                  className="absolute -inset-px z-10 cursor-pointer rounded-3xl focus:outline-none"
                >
                  <span className="sr-only">Bekijk case: {p.title}</span>
                </button>
              </article>
            </RevealItem>
          ))}
        </RevealStagger>
      </Container>

      {hasOpened && (
        <ProjectDetailOverlay project={active} onClose={closeProject} />
      )}
    </Section>
  );
}
