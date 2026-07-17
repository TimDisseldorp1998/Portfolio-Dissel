"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { site } from "@/lib/content";
import { cn } from "@/lib/cn";
import { AuroraBackground } from "./AuroraBackground";
import { Container } from "./ui/Container";
import { Button } from "./ui/Button";
import { Typewriter } from "./ui/Typewriter";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const rise = (delay: number) =>
    prefersReducedMotion
      ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay },
        };

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] w-full flex-col justify-center overflow-hidden bg-surface-dark pb-24 pt-28 text-white"
    >
      <AuroraBackground
        colors={{
          color1: "#5CDDFF",
          color2: "#7C5CFF",
          color3: "#2A34D8",
          color4: "",
          background: "#050508",
        }}
        speed={2}
        intensity={0.6}
        spread={0.5}
      />
      {/* Top fade so navbar contrast stays crisp */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/40 to-transparent" />

      <Container className="relative z-10 flex flex-col items-start text-left">
        <motion.p
          {...rise(0.1)}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-[#3EE68B] backdrop-blur"
        >
          <span
            aria-label="Beschikbaar voor werk"
            className="relative flex h-2 w-2 items-center justify-center"
          >
            <span className="absolute inset-0 rounded-full bg-[#3EE68B] opacity-70 motion-safe:animate-ping" />
            <span className="relative h-2 w-2 rounded-full bg-[#3EE68B] shadow-[0_0_10px_2px_rgba(62,230,139,0.8)]" />
          </span>
          {site.hero.eyebrow}
        </motion.p>

        <motion.h1
          {...rise(0.2)}
          className="max-w-4xl font-heading text-[2.5rem] font-semibold leading-[1.25] tracking-tight text-white sm:text-[3.25rem] md:text-[4rem] lg:text-[4.75rem]"
        >
          {site.hero.headlinePrefix}
          <br />
          <Typewriter phrases={site.hero.headlineRotating} />
        </motion.h1>

        <motion.p
          {...rise(0.35)}
          className="mt-6 max-w-xl text-base text-white/70 sm:text-lg"
        >
          {site.hero.subtitle}
        </motion.p>

        <motion.div
          {...rise(0.5)}
          className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4"
        >
          <Button href={site.hero.primaryCta.href} variant="primary" size="lg">
            {site.hero.primaryCta.label}
            <ArrowRight size={18} />
          </Button>
          <Button href={site.hero.secondaryCta.href} variant="outline" size="lg">
            {site.hero.secondaryCta.label}
          </Button>
        </motion.div>

        {/* Trusted-by logo strip */}
        <motion.div {...rise(0.65)} className="mt-14 w-full sm:mt-16">
          <p className="mb-5 text-sm text-white/40">
            {site.hero.trustedBy.label}
          </p>
          <ul className="flex flex-wrap items-center gap-x-8 gap-y-5 sm:gap-x-10 sm:gap-y-6">
            {site.hero.trustedBy.logos.map((logo) => (
              <li key={logo.src}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={logo.src}
                  alt={logo.alt}
                  loading="lazy"
                  className={cn(
                    "w-auto select-none opacity-50 transition-opacity duration-300 hover:opacity-100",
                    logo.size
                  )}
                />
              </li>
            ))}
          </ul>
        </motion.div>
      </Container>
    </section>
  );
}
