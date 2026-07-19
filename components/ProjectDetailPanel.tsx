"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Briefcase,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  MonitorSmartphone,
  X,
} from "lucide-react";
import type { Project } from "@/lib/content";
import { cn } from "@/lib/cn";
import { Button } from "./ui/Button";

/**
 * Shared design tokens for every project popup (spec: consistency).
 * Tweak here and all panels follow.
 */
const panelTokens = {
  "--panel-radius": "24px",
  "--panel-bg": "#0B0B11",
  "--panel-border": "rgba(255,255,255,0.10)",
  "--meta-bg": "rgba(255,255,255,0.04)",
  "--meta-border": "rgba(255,255,255,0.08)",
  "--meta-label": "rgba(255,255,255,0.6)",
  "--meta-value": "rgba(255,255,255,0.92)",
  "--meta-pill-text": "#B79FFF",
  "--meta-pill-border": "rgba(142,92,224,0.55)",
} as CSSProperties;

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface ProjectDetailPanelProps {
  project: Project;
  onClose: () => void;
}

export function ProjectDetailPanel({
  project,
  onClose,
}: ProjectDetailPanelProps) {
  const prefersReducedMotion = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [slide, setSlide] = useState(0);
  const [atScrollEnd, setAtScrollEnd] = useState(false);

  const { detail } = project;
  const titleId = "project-detail-title";
  const slideCount = detail.slides.length;

  const prevSlide = useCallback(
    () => setSlide((s) => (s - 1 + slideCount) % slideCount),
    [slideCount]
  );
  const nextSlide = useCallback(
    () => setSlide((s) => (s + 1) % slideCount),
    [slideCount]
  );

  // Keyboard: ESC closes, arrows drive the carousel, Tab is trapped inside.
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "Tab") {
        const focusables =
          panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
        if (!focusables?.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose, prevSlide, nextSlide]);

  // Body scroll lock while open + initial focus on the close button.
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  // Scroll affordance: hide the bottom fade once the user reaches the end.
  const onScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setAtScrollEnd(el.scrollTop + el.clientHeight >= el.scrollHeight - 8);
  }, []);

  useEffect(() => {
    onScroll();
  }, [onScroll]);

  return (
    <div className="fixed inset-0 z-[70]" style={panelTokens}>
      {/* Backdrop — click closes */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        aria-hidden
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Panel */}
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 48 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: prefersReducedMotion ? 0 : 48 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="absolute inset-y-0 right-0 flex w-full flex-col border-l border-[color:var(--panel-border)] bg-[color:var(--panel-bg)] text-white md:w-1/2"
      >
        <div
          ref={scrollRef}
          onScroll={onScroll}
          className="panel-scroll relative flex-1 overflow-y-auto p-6 md:p-10"
        >
          {/* Title row */}
          <div className="mb-6 flex items-center justify-between gap-4">
            <h2
              id={titleId}
              className="font-heading text-2xl font-semibold leading-tight md:text-3xl"
            >
              {project.title}
            </h2>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Sluit projectdetails"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white/90 transition-colors hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 xl:border-transparent xl:bg-transparent xl:text-white/70"
            >
              <X size={20} />
            </button>
          </div>

          {/* Meta — compact values on phone/tablet, labelled box on desktop (xl+) */}
          <div className="mb-5">
            {/* Phone + tablet: values only, no labels/icons, live-site icon at the edge */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm xl:hidden">
              <span className="font-medium text-[color:var(--meta-value)]">
                {detail.role ?? detail.company}
              </span>
              <span aria-hidden className="text-white/25">
                ·
              </span>
              <span className="font-medium text-[color:var(--meta-value)]">
                {detail.year}
              </span>
              <span aria-hidden className="text-white/25">
                ·
              </span>
              <span className="inline-flex items-center rounded-full border border-[color:var(--meta-pill-border)] px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-[color:var(--meta-pill-text)]">
                {detail.type}
              </span>

              {project.href && project.href !== "#" && (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Bekijk de live site van ${project.title} (opent in een nieuw tabblad)`}
                  className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-secondary/10 text-secondary transition-colors hover:bg-secondary hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary/40"
                >
                  <ExternalLink size={18} aria-hidden />
                </a>
              )}
            </div>

            {/* Desktop: labelled facts box (icons + labels + subtle bg) + live-site button */}
            <div className="hidden items-stretch gap-3 xl:flex">
              <dl className="flex flex-1 flex-wrap items-center gap-x-8 gap-y-3 rounded-xl border border-[color:var(--meta-border)] bg-[color:var(--meta-bg)] px-5 py-3">
                <div>
                  <dt className="mb-1 flex items-center gap-1.5 text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-[color:var(--meta-label)]">
                    <Briefcase size={13} aria-hidden />
                    {detail.role ? "Rol" : "Bedrijf"}
                  </dt>
                  <dd className="text-base font-semibold text-[color:var(--meta-value)]">
                    {detail.role ?? detail.company}
                  </dd>
                </div>
                <div
                  aria-hidden
                  className="w-px self-stretch bg-[color:var(--meta-border)]"
                />
                <div>
                  <dt className="mb-1 flex items-center gap-1.5 text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-[color:var(--meta-label)]">
                    <Calendar size={13} aria-hidden />
                    Jaar
                  </dt>
                  <dd className="text-base font-semibold text-[color:var(--meta-value)]">
                    {detail.year}
                  </dd>
                </div>
                <div
                  aria-hidden
                  className="w-px self-stretch bg-[color:var(--meta-border)]"
                />
                <div>
                  <dt className="mb-1 flex items-center gap-1.5 text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-[color:var(--meta-label)]">
                    <MonitorSmartphone size={13} aria-hidden />
                    Type
                  </dt>
                  <dd>
                    <span className="inline-flex items-center rounded-full border border-[color:var(--meta-pill-border)] px-3 py-0.5 text-sm font-semibold uppercase tracking-wide text-[color:var(--meta-pill-text)]">
                      {detail.type}
                    </span>
                  </dd>
                </div>
              </dl>

              {project.href && project.href !== "#" && (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Bekijk de live site van ${project.title} (opent in een nieuw tabblad)`}
                  className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-secondary/10 px-5 py-3 text-sm font-medium text-secondary transition-colors hover:bg-secondary hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary/40"
                >
                  Bekijk live site
                  <ExternalLink size={16} aria-hidden />
                </a>
              )}
            </div>
          </div>

          {/* Carousel */}
          <div
            role="group"
            aria-roledescription="carousel"
            aria-label={`${project.title} afbeeldingen`}
            className="relative"
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-black/40">
              {detail.slides.map((s, i) => (
                <div
                  key={s.label}
                  aria-hidden={i !== slide}
                  className={cn(
                    "absolute inset-0 flex items-end bg-gradient-to-br p-6 transition-opacity duration-500",
                    s.gradient,
                    i === slide ? "opacity-100" : "opacity-0"
                  )}
                >
                  <p className="text-sm font-medium uppercase tracking-[0.18em] text-white/80">
                    {s.label}
                  </p>
                </div>
              ))}

              {/* Award badge — labeled, keyboard-focusable */}
              {detail.award && (
                <a
                  href={detail.award.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group absolute right-4 top-4 flex h-11 items-center gap-0 rounded-full border border-white/15 bg-black/60 px-3 text-white backdrop-blur-md transition-all hover:gap-2 focus-visible:gap-2 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
                >
                  <Award size={18} aria-hidden />
                  <span className="max-w-0 overflow-hidden whitespace-nowrap text-xs font-medium transition-all duration-300 group-hover:max-w-[140px] group-focus-visible:max-w-[140px]">
                    {detail.award.label}
                  </span>
                </a>
              )}

              {slideCount > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prevSlide}
                    aria-label="Vorige afbeelding"
                    className="absolute left-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white transition-colors hover:bg-black/80 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={nextSlide}
                    aria-label="Volgende afbeelding"
                    className="absolute right-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white transition-colors hover:bg-black/80 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>

            {slideCount > 1 && (
              <div className="mt-4 flex justify-center gap-1.5">
                {detail.slides.map((s, i) => (
                  <button
                    key={s.label}
                    type="button"
                    onClick={() => setSlide(i)}
                    aria-label={`Ga naar afbeelding ${i + 1} van ${slideCount}`}
                    aria-current={i === slide || undefined}
                    className={cn(
                      "h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
                      i === slide
                        ? "w-5 bg-white"
                        : "w-2 bg-white/30 hover:bg-white/60"
                    )}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Overview */}
          <div className="mt-8">
            <h3 className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-white/60">
              Overzicht
            </h3>
            <p className="max-w-[68ch] leading-relaxed text-white/75">
              {detail.overview}
            </p>
          </div>

          {/* Full case sections (challenge / approach / result …), when present */}
          {detail.body?.map((section) => (
            <div key={section.heading} className="mt-8">
              <h3 className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-white/60">
                {section.heading}
              </h3>
              <div className="max-w-[68ch] space-y-4">
                {section.paragraphs.map((p, i) => (
                  <p key={i} className="leading-relaxed text-white/75">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          ))}

          {/* Contribution bullets — only when there's no full case body */}
          {!detail.body && detail.contribution && (
            <div className="mt-8">
              <h3 className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-white/60">
                Mijn bijdrage
              </h3>
              <ul className="max-w-[68ch] space-y-3">
                {detail.contribution.map((c) => (
                  <li
                    key={c.lead}
                    className="flex gap-3 text-sm leading-relaxed text-white/65"
                  >
                    <span
                      aria-hidden
                      className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                    />
                    <p>
                      <strong className="font-semibold text-white/90">
                        {c.lead}
                      </strong>
                      {c.rest}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-1.5 pb-4">
            {project.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-white/60"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Contact CTA — closes the drawer, then lands the visitor on the form */}
          <div className="mt-12 border-t border-white/10 pt-8">
            <h3 className="font-heading text-xl font-semibold text-white">
              Zoiets voor jou?
            </h3>
            <Button
              href="#contact-form"
              onClick={(e) => {
                e.preventDefault();
                onClose();
                // Wait for the drawer to close (exit anim + body-scroll unlock),
                // then scroll the form into view (respects its scroll-mt-24).
                window.setTimeout(() => {
                  document
                    .getElementById("contact-form")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                }, 320);
              }}
              variant="primary"
              size="lg"
              className="mt-5"
            >
              Plan een kennismaking
              <ArrowRight size={18} />
            </Button>
          </div>

          {/* Scroll affordance — fades out at scroll end */}
          <div
            aria-hidden
            className={cn(
              "pointer-events-none sticky bottom-0 -mx-6 -mb-6 h-16 bg-gradient-to-t from-[#0B0B11] to-transparent transition-opacity duration-300 md:-mx-10 md:-mb-10",
              atScrollEnd ? "opacity-0" : "opacity-100"
            )}
          />
        </div>
      </motion.div>
    </div>
  );
}
