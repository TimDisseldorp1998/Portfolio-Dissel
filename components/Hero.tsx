"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { site } from "@/lib/content";
import { cn } from "@/lib/cn";
import { AuroraBackground } from "./AuroraBackground";
import { Container } from "./ui/Container";
import { Button } from "./ui/Button";
import { Typewriter } from "./ui/Typewriter";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  // One review shows at a time; it crossfades to the next every ~7s.
  // With reduced motion we skip the timer and stack both statically instead.
  const [activeReview, setActiveReview] = useState(0);
  useEffect(() => {
    if (prefersReducedMotion) return;
    const id = window.setInterval(() => {
      setActiveReview((i) => (i + 1) % site.hero.reviews.length);
    }, 7000);
    return () => window.clearInterval(id);
  }, [prefersReducedMotion]);

  const reviewCardClass =
    "rounded-2xl border border-white/10 bg-white/[0.05] p-5 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.85)] backdrop-blur-xl transition-colors duration-200 max-lg:hover:border-white/25 max-lg:hover:bg-white/[0.09] max-lg:active:border-white/25 max-lg:active:bg-white/[0.09]";
  const reviewBody = (review: (typeof site.hero.reviews)[number]) => (
    <>
      <blockquote className="text-[0.95rem] leading-relaxed text-white/65">
        {review.quote}
      </blockquote>
      <figcaption className="mt-3.5 flex items-center gap-2.5">
        {/* Logo overlays the monogram; if the file is missing, onError hides it
            and the initials fall back into view. */}
        <span className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/[0.06] text-sm font-semibold text-white/80">
          <span aria-hidden>{review.initials}</span>
          {review.logo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={review.logo}
              alt=""
              className="absolute inset-0 h-full w-full object-contain"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          )}
        </span>
        <span className="min-w-0">
          <span className="block text-[0.95rem] font-semibold text-white">
            {review.author}
          </span>
          {review.role && (
            <span className="mt-0.5 block text-[0.8125rem] text-white/50">
              {review.role}
            </span>
          )}
        </span>
      </figcaption>
    </>
  );

  const rise = (delay: number) =>
    prefersReducedMotion
      ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay },
        };

  // Split the fixed prefix into a head ("Digitale product") and its last word
  // ("designer"). On phones we force the head onto line 1 and the last word +
  // "voor" onto line 2, so the heading is a stable 3 lines at any phone width
  // (no orphaned "voor"). From tablet up the prefix sits on one line again.
  const prefixWords = site.hero.headlinePrefix.trim().split(" ");
  const prefixLast = prefixWords.pop() ?? "";
  const prefixHead = prefixWords.join(" ");

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

      <Container className="relative z-10 flex -translate-y-8 flex-col items-start text-left">
        <motion.p
          {...rise(0.1)}
          className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[0.625rem] font-medium uppercase leading-4 tracking-[0.16em] text-[#3EE68B] backdrop-blur"
        >
          <span
            aria-label="Beschikbaar voor werk"
            className="relative flex h-1.5 w-1.5 items-center justify-center"
          >
            <span className="absolute inset-0 rounded-full bg-[#3EE68B] opacity-70 motion-safe:animate-ping" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-[#3EE68B] shadow-[0_0_10px_2px_rgba(62,230,139,0.8)]" />
          </span>
          {site.hero.eyebrow}
        </motion.p>

        <motion.h1
          {...rise(0.2)}
          className="min-h-[3.75em] max-w-4xl font-heading text-[clamp(1.9375rem,8.6vw,2.75rem)] font-semibold leading-[1.25] tracking-tight text-white sm:min-h-0 sm:text-[2.75rem] md:text-[3.25rem] lg:text-[4.25rem]"
        >
          {/* Phones: 3 lines — "Digitale product" / "designer voor" / word.
              Tablet+ (sm): 2 lines — "Digitale product designer" / "voor" + word.
              "voor" is fixed text; only the rotating word types in and out. */}
          {prefixHead}{" "}
          <br className="sm:hidden" />
          {prefixLast}{" "}
          <br className="hidden sm:block" />
          {site.hero.headlineConnector}{" "}
          <br className="sm:hidden" />
          <span className="whitespace-nowrap">
            <Typewriter phrases={site.hero.headlineRotating} />
          </span>
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
          {/* DOM order unchanged (work first, contact second) — only the styles
              swap: contact is now the primary/filled CTA and carries the arrow. */}
          <Button href={site.hero.workCta.href} variant="outline" size="lg">
            {site.hero.workCta.label}
          </Button>
          <Button href={site.hero.contactCta.href} variant="primary" size="lg">
            {site.hero.contactCta.label}
            <ArrowRight size={18} />
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

        {/* Subtle client reviews — bottom-right on desktop, in flow below the
            logo strip on mobile. Dark glassmorphism over the aurora. One shows
            at a time and crossfades to the next every ~7s. */}
        <motion.div
          {...rise(0.8)}
          aria-label="Klantreviews"
          className="mt-12 w-full sm:max-w-md lg:absolute lg:bottom-0 lg:right-0 lg:mt-0 lg:w-[400px]"
        >
          {prefersReducedMotion ? (
            <div className="flex flex-col gap-3">
              {site.hero.reviews.map((review) => (
                <figure key={review.author} className={reviewCardClass}>
                  {reviewBody(review)}
                </figure>
              ))}
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.figure
                key={activeReview}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className={reviewCardClass}
              >
                {reviewBody(site.hero.reviews[activeReview])}
              </motion.figure>
            </AnimatePresence>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
