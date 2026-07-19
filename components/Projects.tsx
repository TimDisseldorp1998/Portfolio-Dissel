"use client";

import { useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/lib/content";
import { Section } from "./ui/Section";
import { Container } from "./ui/Container";
import { Reveal, RevealStagger, RevealItem } from "./ui/Reveal";
import { ProjectDetailPanel } from "./ProjectDetailPanel";
import { cn } from "@/lib/cn";

// Radial-gradient accents tuned for the dark surface. Cyan is the brand
// primary; secondary orange and their mix provide variety across cards.
const accentBg: Record<Project["accent"], string> = {
  primary:
    "bg-[radial-gradient(circle_at_20%_20%,rgba(92,221,255,0.45),transparent_60%),radial-gradient(circle_at_80%_80%,rgba(92,221,255,0.14),transparent_60%)]",
  secondary:
    "bg-[radial-gradient(circle_at_20%_20%,rgba(255,131,61,0.45),transparent_60%),radial-gradient(circle_at_80%_80%,rgba(255,131,61,0.14),transparent_60%)]",
  mix: "bg-[radial-gradient(circle_at_25%_20%,rgba(92,221,255,0.42),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(255,131,61,0.4),transparent_60%)]",
};

export function Projects() {
  const [active, setActive] = useState<Project | null>(null);
  // Card that opened the panel — focus returns here on close (a11y).
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  function openProject(
    project: Project,
    e: React.MouseEvent<HTMLButtonElement>
  ) {
    triggerRef.current = e.currentTarget;
    setActive(project);
  }

  function closeProject() {
    setActive(null);
    triggerRef.current?.focus();
  }

  return (
    <Section id="work" variant="dark">
      <Container>
        <Reveal>
          <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-primary">
                Geselecteerd werk
              </p>
              <h2 className="max-w-2xl font-heading text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl">
                Een paar dingen die ik met plezier heb{" "}
                <span className="text-gradient">gemaakt</span>.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-white/60">
              Een korte selectie. Vraag gerust naar de volledige cases en de
              verhalen erachter.
            </p>
          </div>
        </Reveal>

        <RevealStagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <RevealItem key={p.title}>
              <button
                type="button"
                onClick={(e) => openProject(p, e)}
                aria-haspopup="dialog"
                className="group relative block w-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] text-left backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
              >
                <div
                  className={cn(
                    "relative aspect-[16/11] overflow-hidden",
                    accentBg[p.accent]
                  )}
                >
                  <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
                    <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.08)_100%)]" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-heading text-4xl font-semibold text-white/70 mix-blend-overlay">
                        {p.title}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-heading text-lg font-semibold leading-snug text-white">
                      {p.title}
                    </h3>
                    <span className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary transition-all duration-300 group-hover:bg-secondary group-hover:text-white">
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
              </button>
            </RevealItem>
          ))}
        </RevealStagger>
      </Container>

      <AnimatePresence>
        {active && (
          <ProjectDetailPanel project={active} onClose={closeProject} />
        )}
      </AnimatePresence>
    </Section>
  );
}
