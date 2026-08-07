"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import {
  User,
  Eye,
  LayoutGrid,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";
import { nav } from "@/lib/content";
import { cn } from "@/lib/cn";
import { isProgrammaticScroll, scrollToSection } from "@/lib/scroll";
import { LogoMark } from "./Logo";

/**
 * Scroll thresholds (hysteresis) for the scrolled pill state: extra blur and
 * a deeper shadow past SCROLLED_AT, back to the resting style above REST_AT.
 */
const SCROLLED_AT = 80;
const REST_AT = 40;

const iconMap: Record<string, LucideIcon> = {
  "#services": LayoutGrid,
  "#about": User,
  "#work": Eye,
  "#contact": MessageCircle,
};

const items = [...nav, { label: "Contact", href: "#contact" }].map((n) => ({
  ...n,
  icon: iconMap[n.href] ?? LayoutGrid,
}));

const SECTION_IDS = items.map((i) => i.href.slice(1));

/** Idle delay (ms) before the mobile nav grows back to its resting size. */
const IDLE_AFTER = 220;

export function Navbar() {
  const prefersReducedMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const scrollingRef = useRef(false);

  // rAF-throttled scroll listener with hysteresis, plus an idle debounce that
  // drives the mobile grow/shrink: compact while scrolling, larger at rest.
  useEffect(() => {
    let raf = 0;
    let idleTimer = 0;
    const onScroll = () => {
      // Blur/shadow state tracks scroll position regardless of what moved it.
      if (!raf) {
        raf = requestAnimationFrame(() => {
          raf = 0;
          const y = window.scrollY;
          setScrolled((prev) => (prev ? y > REST_AT : y >= SCROLLED_AT));
        });
      }

      // The grow/shrink is a finger-scroll affordance only: tapping a nav item
      // scrolls programmatically, and the pill must stay at its resting size.
      if (isProgrammaticScroll()) return;

      if (!scrollingRef.current) {
        scrollingRef.current = true;
        setIsScrolling(true);
      }
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        scrollingRef.current = false;
        setIsScrolling(false);
      }, IDLE_AFTER);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(idleTimer);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Active-section highlighting: the section crossing the upper-middle band
  // of the viewport wins; the hero clears the highlight.
  useEffect(() => {
    const observerOptions = { rootMargin: "-35% 0px -55% 0px" };

    const sections = SECTION_IDS.map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) setActive(`#${e.target.id}`);
      });
    }, observerOptions);
    sections.forEach((s) => observer.observe(s));

    // Only the hero clears the highlight — every other section has a nav item.
    const clearObserver = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) setActive(null);
      });
    }, observerOptions);
    const hero = document.getElementById("top");
    if (hero) clearObserver.observe(hero);

    return () => {
      observer.disconnect();
      clearObserver.disconnect();
    };
  }, []);

  return (
    <header className="mount-fade fixed inset-x-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-50 flex justify-center lg:inset-x-0 lg:bottom-auto lg:top-4">
      <nav
        aria-label="Main"
        className={cn(
          "flex w-auto origin-bottom items-center gap-1 rounded-full border border-white/10 px-2.5 py-1.5 text-white transition-[transform,background-color,box-shadow] duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform sm:py-1 lg:origin-top",
          scrolled
            ? "bg-[#12121A]/85 shadow-[0_8px_32px_rgba(0,0,0,0.55)] backdrop-blur-[12px]"
            : "bg-[#12121A] shadow-[0_4px_24px_rgba(0,0,0,0.4)]",
          // Mobile reading comfort: grow at rest, compact while scrolling.
          // Desktop (lg+) keeps a fixed size.
          !prefersReducedMotion && !isScrolling
            ? "scale-[1.15] lg:scale-100"
            : "scale-100"
        )}
      >
        {/* Logo — mark only */}
        <a
          href="#top"
          onClick={(e) => scrollToSection(e, "#top", prefersReducedMotion)}
          aria-label="DisselDesign — terug naar boven"
          className="flex min-h-[50px] shrink-0 items-center rounded-full px-2 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/40 sm:min-h-[44px]"
        >
          <LogoMark className="h-8 w-auto sm:h-7" />
        </a>

        <ul className="flex items-center gap-0.5 sm:gap-1">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.href;
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) =>
                    scrollToSection(e, item.href, prefersReducedMotion)
                  }
                  aria-label={item.label}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "flex min-h-[50px] min-w-[50px] items-center justify-center gap-1.5 rounded-full px-3.5 text-[15px] font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/40 sm:min-h-[44px] sm:min-w-0 sm:px-3.5",
                    isActive
                      ? "bg-primary/15 text-primary ring-1 ring-primary/30"
                      : "text-white/60 hover:bg-white/[0.07] hover:text-white"
                  )}
                >
                  <Icon
                    size={20}
                    strokeWidth={2}
                    aria-hidden
                    className="sm:h-[17px] sm:w-[17px]"
                  />
                  {/* On mobile only the active section shows its name; from sm up
                      every item shows its label. */}
                  <span className={cn(isActive ? "inline" : "hidden sm:inline")}>
                    {item.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>

      </nav>
    </header>
  );
}
