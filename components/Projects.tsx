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
              <article
                className="group relative block w-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] text-left backdrop-blur-sm transition-[transform,background-color,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06] has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-primary/30"
              >
                <div
                  className={cn(
                    "relative aspect-[16/11] overflow-hidden",
                    accentBg[p.accent]
                  )}
                >
                  <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
                    {p.detail.slides[0]?.src ? (
                      // First slide image doubles as the card thumbnail — the
                      // card and the case open on the same visual.
                      <img
                        src={p.detail.slides[0].src}
                        alt=""
                        loading="lazy"
                        draggable={false}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.08)_100%)]" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="font-heading text-4xl font-semibold text-white/70 mix-blend-overlay">
                            {p.title}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-3 p-6">
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
