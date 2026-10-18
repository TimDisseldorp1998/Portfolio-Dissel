"use client";

import {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  useEffect,
  useRef,
  type CSSProperties,
  type PropsWithChildren,
  type ReactElement,
} from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/cn";

/** Zelfde drempel als de viewport-margin die hier eerder gebruikt werd. */
const ROOT_MARGIN = "-80px";

/** Kaarten in een RevealStagger: de groep start ze allemaal tegelijk zodra
 *  de sectie 10% in beeld is, en de laatste staat binnen 400ms. */
const GROEP_DREMPEL = 0.1;
const GROEP_DUUR = 0.3; // s per kaart
const GROEP_SPREIDING = 0.1; // s tussen de eerste en de laatste start

/** True binnen een RevealStagger: dan observeert een RevealItem niet zelf. */
const InGroep = createContext(false);

/**
 * Zet `is-in` op het element zodra het in beeld komt. De animatie zelf staat
 * in CSS (zie `.reveal` in globals.css); hier gebeurt alleen het aan- en
 * uitzetten. Bij `prefers-reduced-motion` starten we geen observer en is het
 * element meteen zichtbaar.
 */
function useRevealOnScroll<T extends HTMLElement>(once: boolean, actief = true) {
  const ref = useRef<T>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !actief) return;

    if (prefersReducedMotion) {
      el.classList.add("is-in");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          if (once) observer.unobserve(entry.target);
        }
      },
      { rootMargin: ROOT_MARGIN }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [once, prefersReducedMotion, actief]);

  return ref;
}

interface RevealProps extends PropsWithChildren {
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  once = true,
}: RevealProps) {
  const ref = useRevealOnScroll<HTMLDivElement>(once);
  return (
    <div
      ref={ref}
      className={cn("reveal", className)}
      style={
        {
          "--reveal-y": `${y}px`,
          "--reveal-delay": `${delay}s`,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}

/**
 * Groep kaarten die samen opkomt. Eén observer op de sectie (of op de groep
 * zelf als die niet in een <section> staat): zodra 10% in beeld is, krijgen
 * alle kaarten tegelijk `is-in`. Elke kaart duurt 300ms en de starts liggen
 * samen binnen 100ms, dus alles staat binnen 400ms. Bij reduced motion is
 * alles meteen zichtbaar.
 *
 * `stagger` is de gewenste tijd tussen twee kaarten; bij veel kaarten wordt
 * hij kleiner, zodat de 400ms blijft gelden.
 */
export function RevealStagger({
  children,
  className,
  delay = 0,
  stagger = 0.08,
}: PropsWithChildren<{ className?: string; delay?: number; stagger?: number }>) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const aantal = Children.count(children);
  const stap = aantal > 1 ? Math.min(stagger, GROEP_SPREIDING / (aantal - 1)) : 0;

  useEffect(() => {
    const groep = ref.current;
    if (!groep) return;
    const toon = () =>
      groep.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-in"));
    if (prefersReducedMotion) {
      toon();
      return;
    }
    const doel = groep.closest("section") ?? groep;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        // 10% van de sectie, of bij een sectie die hoger is dan tien
        // schermen: een kwart scherm ervan in beeld.
        const genoeg =
          entry.intersectionRatio >= GROEP_DREMPEL ||
          entry.intersectionRect.height >= window.innerHeight * 0.25;
        if (!genoeg) return;
        toon();
        observer.disconnect();
      },
      { threshold: [0, 0.05, GROEP_DREMPEL] }
    );
    observer.observe(doel);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return (
    <InGroep.Provider value>
      <div ref={ref} className={className}>
        {Children.map(children, (child, index) => {
          if (!isValidElement(child)) return child;
          const element = child as ReactElement<{ style?: CSSProperties }>;
          const eigenDelay = prefersReducedMotion ? 0 : delay + index * stap;
          return cloneElement(element, {
            style: {
              ...element.props.style,
              "--reveal-delay": `${eigenDelay}s`,
              "--reveal-duration": `${GROEP_DUUR}s`,
            } as CSSProperties,
          });
        })}
      </div>
    </InGroep.Provider>
  );
}

export function RevealItem({
  children,
  className,
  y = 24,
  style,
}: PropsWithChildren<{
  className?: string;
  y?: number;
  /** Gezet door RevealStagger — bevat de eigen `--reveal-delay`. */
  style?: CSSProperties;
}>) {
  // In een RevealStagger start de groep de kaart; los observeert hij zelf.
  const inGroep = useContext(InGroep);
  const ref = useRevealOnScroll<HTMLDivElement>(true, !inGroep);
  return (
    <div
      ref={ref}
      className={cn("reveal", className)}
      style={
        {
          "--reveal-y": `${y}px`,
          "--reveal-duration": "0.6s",
          ...style,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
