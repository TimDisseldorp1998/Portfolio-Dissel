"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Download, Mail, Play } from "lucide-react";
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
    <div className="relative min-h-[220px] flex-1 overflow-hidden rounded-2xl bg-black/40">
      {bento.slider.map((slide, idx) => (
        <div
          key={idx}
          aria-hidden={idx !== i}
          className={cn(
            "absolute inset-0 flex items-end bg-gradient-to-br p-6 transition-opacity duration-1000",
            slide.gradient,
            idx === i ? "opacity-100" : "opacity-0"
          )}
        >
          <div>
            <p className="text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-white/70">
              {String(idx + 1).padStart(2, "0")} /{" "}
              {String(bento.slider.length).padStart(2, "0")}
            </p>
            <p className="mt-1 text-xl font-medium text-white">{slide.label}</p>
          </div>
        </div>
      ))}
      <div className="absolute bottom-4 right-4 flex gap-1.5">
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

export function Bento() {
  return (
    <section
      id="about"
      className="relative bg-surface-dark py-24 text-white md:py-32"
    >
      <Container>
        <Reveal>
          <div className="mb-12 flex items-end justify-between gap-6">
            <div>
              <p className="mb-3 text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-white/40">
                About
              </p>
              <h2 className="max-w-2xl font-heading text-3xl font-semibold leading-tight md:text-4xl">
                Wie ik ben, waar ik vandaan kom, en waarmee ik werk.
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
              <CardLabel>My Background</CardLabel>
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
                <div className="absolute bottom-6 left-6 flex flex-col items-start gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full bg-black/40 px-3 py-1 text-xs text-white/90 backdrop-blur-md">
                    {bento.portrait.greeting}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-black/40 px-3 py-1 text-xs text-white/90 backdrop-blur-md">
                    {bento.portrait.line1}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-black/40 px-3 py-1 text-xs text-white/90 backdrop-blur-md">
                    {bento.portrait.line2}
                  </span>
                </div>
              </div>
            </BentoCard>

            {/* Spotify card */}
            <BentoCard>
              <CardLabel>Favorite Tracks</CardLabel>
              <ul className="space-y-1">
                {bento.tracks.map((track) => (
                  <li key={track.title}>
                    <button
                      type="button"
                      className="group/track flex w-full items-center gap-3 rounded-xl p-2 transition-colors hover:bg-white/5"
                    >
                      <div
                        className={cn(
                          "h-10 w-10 shrink-0 rounded-lg bg-gradient-to-br shadow-sm",
                          track.color
                        )}
                      />
                      <div className="min-w-0 flex-1 text-left">
                        <p className="truncate text-sm font-medium">
                          {track.title}
                        </p>
                        <p className="truncate text-xs text-white/50">
                          {track.artist}
                        </p>
                      </div>
                      <span
                        aria-hidden
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black opacity-0 transition-all group-hover/track:opacity-100"
                      >
                        <Play size={12} fill="currentColor" />
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </BentoCard>
          </div>

          {/* Column 3 — full-width on tablet (2-col grid), stacked column on desktop */}
          <div className="flex flex-col gap-4 md:col-span-2 md:grid md:grid-cols-2 md:gap-5 lg:col-span-1 lg:flex lg:flex-col">
            {/* Experience card */}
            <BentoCard>
              <CardLabel>Experience</CardLabel>
              <ul className="space-y-5">
                {experience.map((exp) => (
                  <li
                    key={exp.company}
                    className="grid grid-cols-[110px_1fr] items-baseline gap-3"
                  >
                    <span className="text-xs text-white/40">{exp.period}</span>
                    <div>
                      <p className="text-sm font-medium leading-tight">
                        {exp.role}
                      </p>
                      <p className="mt-0.5 text-xs text-white/50">
                        {exp.company}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </BentoCard>

            {/* Tools card — full-width bottom row on tablet, middle of the stack on desktop */}
            <BentoCard className="md:order-last md:col-span-2 lg:order-none">
              <CardLabel>Tool Stack</CardLabel>
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
              <CardLabel>Education</CardLabel>
              <ul className="space-y-4">
                {bento.education.map((ed) => (
                  <li
                    key={ed.degree}
                    className="grid grid-cols-[110px_1fr] items-baseline gap-3"
                  >
                    <span className="text-xs text-white/40">{ed.period}</span>
                    <div>
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
