"use client";

import {
  Children,
  cloneElement,
  isValidElement,
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

/**
 * Zet `is-in` op het element zodra het in beeld komt. De animatie zelf staat
 * in CSS (zie `.reveal` in globals.css); hier gebeurt alleen het aan- en
 * uitzetten. Bij `prefers-reduced-motion` starten we geen observer en is het
 * element meteen zichtbaar.
 */
function useRevealOnScroll<T extends HTMLElement>(once: boolean) {
  const ref = useRef<T>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

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
  }, [once, prefersReducedMotion]);

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
 * Wrapper zonder eigen animatie: hij geeft elk kind een oplopende
 * `--reveal-delay` mee, de kinderen regelen hun eigen zichtbaarheid.
 */
export function RevealStagger({
  children,
  className,
  delay = 0,
  stagger = 0.08,
}: PropsWithChildren<{ className?: string; delay?: number; stagger?: number }>) {
  const prefersReducedMotion = useReducedMotion();
  return (
    <div className={className}>
      {Children.map(children, (child, index) => {
        if (!isValidElement(child)) return child;
        const element = child as ReactElement<{ style?: CSSProperties }>;
        const eigenDelay = prefersReducedMotion ? 0 : delay + index * stagger;
        return cloneElement(element, {
          style: {
            ...element.props.style,
            "--reveal-delay": `${eigenDelay}s`,
          } as CSSProperties,
        });
      })}
    </div>
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
  const ref = useRevealOnScroll<HTMLDivElement>(true);
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
