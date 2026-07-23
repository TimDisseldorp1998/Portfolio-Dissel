"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { Download, Mail, Minus, Plus } from "lucide-react";
import { bento, experience, site } from "@/lib/content";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import { LinkedinFilled, InstagramFilled } from "./ui/BrandIcons";
import { cn } from "@/lib/cn";

type BentoCardProps = {
  children: React.ReactNode;
  className?: string;
};

function BentoCard({ children, className }: BentoCardProps) {
  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-all duration-500 hover:border-white/20 hover:bg-white/[0.06]",
        className
      )}
    >
      {children}
    </div>
  );
}

function CardLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-white/40">
      {children}
    </p>
  );
}

function SocialIconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target={href.startsWith("mailto:") ? undefined : "_blank"}
      rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/70 transition-all hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/10 hover:text-white"
    >
      {children}
    </a>
  );
}

/** Common working-set rep targets for the 1RM calculator. */
const REP_OPTIONS = [2, 4, 6, 8, 12, 16, 20];

/** Per-unit plate increment and sensible min/max for the 1RM input. */
const LBS_PER_KG = 2.20462;
const UNITS = {
  kg: { inc: 2.5, min: 20, max: 400 },
  lbs: { inc: 5, min: 45, max: 900 },
} as const;
type Unit = keyof typeof UNITS;

/**
 * 1RM training calculator. From a one-rep max it estimates the working weight
 * for a chosen rep target using the Epley formula (1RM = w · (1 + reps/30), so
 * weight = 1RM / (1 + reps/30)), with a single rep pinned to exactly 100% (the
 * lift equals the 1RM). Epley stays realistic across the full 1–20 rep range.
 * Works in kg or lbs — switching converts the entered max. The working weight
 * is shown to one decimal (matching a standard 1RM percentage table); the input
 * steppers move by the unit's plate increment (2.5 kg / 5 lbs).
 */
function OneRepMaxCalculator() {
  const [unit, setUnit] = useState<Unit>("kg");
  const [oneRm, setOneRm] = useState(100);
  const [reps, setReps] = useState(8);

  const cfg = UNITS[unit];
  const clamp = (v: number, lo: number, hi: number) =>
    Math.min(hi, Math.max(lo, v));
  const snap = (v: number) => Math.round(v / cfg.inc) * cfg.inc;

  const pct = reps === 1 ? 1 : 1 / (1 + reps / 30);
  const weight = Math.max(0, oneRm * pct);
  const pctLabel = Math.round(pct * 100);

  const step = (delta: number) =>
    setOneRm((v) => clamp(snap(v + delta), cfg.min, cfg.max));

  const switchUnit = (next: Unit) => {
    if (next === unit) return;
    setOneRm((v) => {
      const converted = next === "lbs" ? v * LBS_PER_KG : v / LBS_PER_KG;
      const c = UNITS[next];
      return clamp(Math.round(converted / c.inc) * c.inc, c.min, c.max);
    });
    setUnit(next);
  };

  return (
    <>
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-white/40">
          1RM Calculator
        </p>
        {/* kg / lbs toggle */}
        <div className="flex items-center rounded-lg border border-white/10 bg-white/[0.03] p-0.5 text-xs font-medium">
          {(Object.keys(UNITS) as Unit[]).map((u) => (
            <button
              key={u}
              type="button"
              onClick={() => switchUnit(u)}
              aria-pressed={unit === u}
              className={cn(
                "rounded-md px-2 py-1 transition-colors",
                unit === u
                  ? "bg-secondary/15 text-secondary"
                  : "text-white/50 hover:text-white"
              )}
            >
              {u}
            </button>
          ))}
        </div>
      </div>

      {/* One-rep max input with unit-aware steppers */}
      <label htmlFor="orm-input" className="mb-1.5 block text-xs text-white/50">
        Jouw 1 rep max
      </label>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => step(-cfg.inc)}
          aria-label="Verlaag 1 rep max"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-white/70 transition-colors hover:bg-white/[0.08] hover:text-white"
        >
          <Minus size={15} aria-hidden />
        </button>
        <div className="flex flex-1 items-baseline justify-center gap-1 rounded-xl border border-white/10 bg-white/[0.03] py-2">
          <input
            id="orm-input"
            type="number"
            inputMode="numeric"
            value={oneRm}
            onChange={(e) =>
              setOneRm(clamp(Number(e.target.value) || 0, 0, cfg.max))
            }
            className="w-16 bg-transparent text-center text-lg font-semibold text-white outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          <span className="text-sm text-white/40">{unit}</span>
        </div>
        <button
          type="button"
          onClick={() => step(cfg.inc)}
          aria-label="Verhoog 1 rep max"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-white/70 transition-colors hover:bg-white/[0.08] hover:text-white"
        >
          <Plus size={15} aria-hidden />
        </button>
      </div>

      {/* Rep target */}
      <p className="mb-1.5 mt-4 text-xs text-white/50">Herhalingen per set</p>
      <div className="flex flex-wrap gap-1.5">
        {REP_OPTIONS.map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setReps(r)}
            aria-pressed={reps === r}
            className={cn(
              "min-w-[2.25rem] rounded-lg border px-2.5 py-1.5 text-sm font-medium transition-colors",
              reps === r
                ? "border-primary/50 bg-primary/15 text-primary"
                : "border-white/10 bg-white/[0.04] text-white/60 hover:border-white/25 hover:bg-white/[0.08] hover:text-white"
            )}
          >
            {r}
          </button>
        ))}
      </div>

      {/* Result */}
      <div className="mt-4 rounded-2xl border border-primary/20 bg-primary/[0.06] p-4">
        <p className="text-xs text-white/50">
          Werkgewicht voor {reps} {reps === 1 ? "rep" : "reps"}
        </p>
        <p className="mt-0.5 font-heading text-3xl font-semibold leading-none text-white">
          {weight.toFixed(1)}
          <span className="ml-1 text-lg font-normal text-white/50">{unit}</span>
        </p>
        <p className="mt-2 text-xs text-white/40">
          ≈ {pctLabel}% van je 1RM · ideaal voor 3 werksets van {reps}
        </p>
      </div>
    </>
  );
}

function Slider() {
  const [i, setI] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const id = window.setInterval(() => {
      setI((v) => (v + 1) % bento.slider.length);
    }, 4200);
    return () => window.clearInterval(id);
  }, [prefersReducedMotion]);

  return (
    <div className="group/slider relative min-h-[220px] flex-1 overflow-hidden rounded-2xl bg-black/40">
      {bento.slider.map((slide, idx) => (
        <div
          key={idx}
          aria-hidden={idx !== i}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            idx === i ? "opacity-100" : "opacity-0"
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={slide.src}
            alt={slide.alt}
            loading="lazy"
            className="h-full w-full object-cover"
          />
          {/* Caption overlay — only on hover, over a soft gradient */}
          <div className="absolute inset-0 flex items-end p-6 opacity-0 transition-opacity duration-300 group-hover/slider:opacity-100">
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="relative">
              <p className="text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-white/70">
                {String(idx + 1).padStart(2, "0")} /{" "}
                {String(bento.slider.length).padStart(2, "0")}
              </p>
              <p className="mt-1 text-xl font-medium text-white">
                {slide.label}
              </p>
            </div>
          </div>
        </div>
      ))}
      <div className="absolute bottom-4 right-4 z-10 flex gap-1.5">
        {bento.slider.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setI(idx)}
            aria-label={`Ga naar slide ${idx + 1}`}
            className={cn(
              "h-1.5 rounded-full transition-all",
              idx === i ? "w-6 bg-white" : "w-3 bg-white/30 hover:bg-white/60"
            )}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Chat-style intro that plays when the About section scrolls into view:
 * messages appear one by one, all three hold together, then clear and the
 * cycle repeats. Respects prefers-reduced-motion by showing them statically.
 */
function ChatMessages() {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const messages = bento.portrait.messages;
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) {
      setVisibleCount(messages.length);
      return;
    }
    if (!inView) {
      setVisibleCount(0);
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    let cancelled = false;

    const runCycle = () => {
      if (cancelled) return;
      // Reveal messages one by one (~900ms apart).
      messages.forEach((_, idx) => {
        timers.push(
          setTimeout(() => setVisibleCount(idx + 1), 400 + idx * 900)
        );
      });
      // Hold all three for ~3.5s, then clear.
      const clearAt = 400 + messages.length * 900 + 3500;
      timers.push(setTimeout(() => setVisibleCount(0), clearAt));
      // Restart after a short pause.
      timers.push(setTimeout(runCycle, clearAt + 1200));
    };

    runCycle();
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [inView, prefersReducedMotion, messages]);

  return (
    <div
      ref={ref}
      className="absolute bottom-6 left-6 right-6 flex flex-col items-start gap-2"
    >
      <AnimatePresence>
        {messages.slice(0, visibleCount).map((msg, idx) => (
          <motion.span
            key={msg}
            layout
            initial={
              prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 0, y: 10, scale: 0.9 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 8, transition: { duration: 0.25 } }
            }
            transition={{
              type: "spring",
              stiffness: 420,
              damping: 28,
              delay: idx === visibleCount - 1 ? 0 : 0,
            }}
            className="max-w-[85%] rounded-2xl rounded-bl-md bg-black/50 px-3.5 py-2 text-xs text-white/90 shadow-lg backdrop-blur-md"
          >
            {msg}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}

export function Bento() {
  return (
    <section
      id="about"
      className="relative bg-surface-dark py-24 text-white md:py-32"
    >
      <Container>
        <Reveal>
          <div className="mb-6 flex items-end justify-between gap-6 md:mb-12">
            <div>
              <p className="mb-3 text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-primary">
                About
              </p>
              <h2 className="max-w-2xl font-heading text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
                Even voorstellen
              </h2>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {/* Column 1 */}
          <div className="flex flex-col gap-4 md:gap-5">
            {/* Intro card */}
            <BentoCard>
              <p className="text-base leading-relaxed text-white/90 md:text-lg">
                {bento.intro.title}
              </p>
              <div className="mt-6 flex items-center justify-between gap-3">
                <div className="flex gap-2">
                  <SocialIconLink
                    href={`mailto:${site.email}`}
                    label="Email"
                  >
                    <Mail size={14} />
                  </SocialIconLink>
                  <SocialIconLink
                    href="https://www.linkedin.com/in/timdisseldorp/"
                    label="LinkedIn"
                  >
                    <LinkedinFilled size={14} />
                  </SocialIconLink>
                  <SocialIconLink
                    href="https://www.instagram.com/timdisseldorp/"
                    label="Instagram"
                  >
                    <InstagramFilled size={14} />
                  </SocialIconLink>
                </div>
                <a
                  href={bento.intro.resumeHref}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/10"
                >
                  <Download size={14} />
                  Resume
                </a>
              </div>
            </BentoCard>

            {/* Background card */}
            <BentoCard>
              <CardLabel>Zo werk ik</CardLabel>
              {bento.background.paragraphs.map((p, idx) => (
                <p
                  key={idx}
                  className={cn(
                    "text-sm leading-relaxed text-white/70",
                    idx > 0 && "mt-3"
                  )}
                >
                  {p}
                </p>
              ))}
            </BentoCard>

            {/* Slider card — grows to close any height gap in this column */}
            <BentoCard className="flex-1 p-0">
              <Slider />
            </BentoCard>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-4 md:gap-5">
            {/* Portrait card — grows to close any height gap in this column */}
            <BentoCard className="min-h-[460px] flex-1 p-0">
              <div className="relative flex-1 overflow-hidden rounded-3xl bg-gradient-to-br from-neutral-800 via-neutral-900 to-black">
                {/* Placeholder portrait — swap with real image at /public/portrait.jpg */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-64 w-64 rounded-full bg-gradient-to-br from-primary/40 to-secondary/30 blur-3xl" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="font-heading text-[10rem] font-semibold leading-none text-white/[0.06]">
                    T
                  </p>
                </div>
                <ChatMessages />
              </div>
            </BentoCard>

            {/* 1RM strength calculator card */}
            <BentoCard>
              <OneRepMaxCalculator />
            </BentoCard>
          </div>

          {/* Column 3 — full-width on tablet (2-col grid), stacked column on desktop */}
          <div className="flex flex-col gap-4 md:col-span-2 md:grid md:grid-cols-2 md:gap-5 lg:col-span-1 lg:flex lg:flex-col">
            {/* Experience card */}
            <BentoCard>
              <CardLabel>Werkervaring</CardLabel>
              <ul className="space-y-5">
                {experience.map((exp) => (
                  <li
                    key={exp.company}
                    className="grid grid-cols-[90px_1fr] items-baseline gap-3"
                  >
                    <span className="text-xs text-white/40">{exp.period}</span>
                    <div>
                      <p className="text-sm font-medium leading-tight">
                        {exp.role}
                      </p>
                      <p className="mt-0.5 text-xs text-white/50">
                        {exp.company}
                      </p>
                      <p className="mt-0.5 text-xs text-white/40">
                        {exp.location}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </BentoCard>

            {/* Tools card — full-width bottom row on tablet, middle of the stack on desktop */}
            <BentoCard className="md:order-last md:col-span-2 lg:order-none">
              <CardLabel>Toolstack</CardLabel>
              <div className="grid grid-cols-5 gap-2.5">
                {bento.tools.map((tool) => (
                  <div
                    key={tool.name}
                    title={tool.name}
                    className={cn(
                      "flex aspect-square items-center justify-center rounded-xl bg-gradient-to-br text-[0.6875rem] font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5",
                      tool.gradient
                    )}
                  >
                    {tool.label}
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-white/40">
                Van Figma-mock tot production-code.
              </p>
            </BentoCard>

            {/* Education card — next to Experience on tablet, bottom of the stack on desktop */}
            <BentoCard>
              <CardLabel>Opleidingen</CardLabel>
              <ul className="space-y-4">
                {bento.education.map((ed) => (
                  <li
                    key={ed.degree}
                    className="grid grid-cols-[110px_1fr] items-baseline gap-3"
                  >
                    <span className="text-xs text-white/40">{ed.period}</span>
                    <div>
                      {ed.type ? (
                        <p className="text-xs text-white/40">{ed.type}</p>
                      ) : null}
                      <p className="text-sm font-medium leading-tight">
                        {ed.degree}
                      </p>
                      <p className="mt-0.5 text-xs text-white/50">{ed.school}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </BentoCard>
          </div>
        </div>
      </Container>
    </section>
  );
}
