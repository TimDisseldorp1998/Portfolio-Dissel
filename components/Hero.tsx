"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { site } from "@/lib/content";
import { AuroraBackground } from "./AuroraBackground";
import { Container } from "./ui/Container";
import { Button } from "./ui/Button";

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
      className="relative flex min-h-[100svh] w-full flex-col justify-end overflow-hidden bg-surface-dark pb-20 pt-32 text-white md:pb-28"
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
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-white/70 backdrop-blur"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-secondary shadow-[0_0_12px_2px_rgba(255,131,61,0.7)]" />
          {site.hero.eyebrow}
        </motion.p>

        <motion.h1
          {...rise(0.2)}
          className="max-w-4xl font-heading text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {site.hero.headline}
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
      </Container>
    </section>
  );
}
