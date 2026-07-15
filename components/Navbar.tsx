"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  User,
  Eye,
  LayoutGrid,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";
import { nav } from "@/lib/content";
import { cn } from "@/lib/cn";
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

/**
 * Custom rAF smooth-scroll. Scrolls each frame with `behavior: "instant"`, so
 * it bypasses the CSS `scroll-behavior: smooth` on <html> — the native
 * `scrollTo({ behavior: "smooth" })` silently fails over long distances when
 * both are set, which made "back to top" feel broken. Fixed duration keeps it
 * fast and consistent regardless of how far the target is.
 */
let scrollRAF = 0;
function animateScrollTo(targetY: number, duration = 600) {
  cancelAnimationFrame(scrollRAF);
  const startY = window.scrollY;
  const distance = targetY - startY;
  if (Math.abs(distance) < 2) {
    window.scrollTo({ top: targetY, behavior: "instant" as ScrollBehavior });
    return;
  }
  const startTime = performance.now();
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
  function step(now: number) {
    const t = Math.min(1, (now - startTime) / duration);
    window.scrollTo({
      top: startY + distance * easeOutCubic(t),
      behavior: "instant" as ScrollBehavior,
    });
    if (t < 1) scrollRAF = requestAnimationFrame(step);
  }
  scrollRAF = requestAnimationFrame(step);
}

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
      if (!scrollingRef.current) {
        scrollingRef.current = true;
        setIsScrolling(true);
      }
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        scrollingRef.current = false;
        setIsScrolling(false);
      }, IDLE_AFTER);

      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        setScrolled((prev) => (prev ? y > REST_AT : y >= SCROLLED_AT));
      });
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

  /**
   * Smooth-scroll a nav target into view: center the section when it fits the
   * viewport, otherwise put its heading just below the top (40px on mobile
   * where the pill sits at the bottom, ~90px on desktop to clear the top pill).
   * This keeps the previous section (e.g. the blue hero) from peeking in.
   */
  function scrollToSection(
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) {
    if (!href.startsWith("#")) return;
    const id = href.slice(1);
    const goTo = (y: number) =>
      prefersReducedMotion
        ? window.scrollTo({ top: y, behavior: "instant" as ScrollBehavior })
        : animateScrollTo(y);

    if (id === "top") {
      e.preventDefault();
      goTo(0);
      history.replaceState(null, "", window.location.pathname);
      return;
    }

    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();

    const rect = el.getBoundingClientRect();
    const absoluteTop = window.scrollY + rect.top;
    const vh = window.innerHeight;
    const isDesktop = window.innerWidth >= 1024;
    const topClearance = isDesktop ? 90 : 40;

    let target: number;
    if (rect.height <= vh) {
      // Fits — center the block in the viewport.
      target = absoluteTop - (vh - rect.height) / 2;
    } else {
      // Taller than the viewport — heading near the top.
      const heading = el.querySelector("h2") ?? el;
      const headingTop = window.scrollY + heading.getBoundingClientRect().top;
      target = headingTop - topClearance;
    }

    goTo(Math.max(0, target));
    history.replaceState(null, "", href);
  }

  return (
    <motion.header
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className="fixed inset-x-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-50 flex justify-center lg:inset-x-0 lg:bottom-auto lg:top-4"
    >
      <nav
        aria-label="Main"
        className={cn(
          "flex w-auto origin-bottom items-center gap-1 rounded-full border border-white/10 px-2 py-1 text-white transition-all duration-[250ms] sm:px-2.5 lg:origin-top",
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
          onClick={(e) => scrollToSection(e, "#top")}
          aria-label="DisselDesign — terug naar boven"
          className="flex min-h-[44px] shrink-0 items-center rounded-full px-2 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/40"
        >
          <LogoMark className="h-7 w-auto" />
        </a>

        <ul className="flex items-center gap-0.5 sm:gap-1">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.href;
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  aria-label={item.label}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "flex min-h-[44px] min-w-[44px] items-center justify-center gap-1.5 rounded-full px-3 text-[15px] font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/40 sm:min-w-0 sm:px-3.5",
                    isActive
                      ? "bg-primary/15 text-primary ring-1 ring-primary/30"
                      : "text-white/60 hover:bg-white/[0.07] hover:text-white"
                  )}
                >
                  <Icon size={17} strokeWidth={2} aria-hidden />
                  <span className="hidden sm:inline">{item.label}</span>
                </a>
              </li>
            );
          })}
        </ul>

      </nav>
    </motion.header>
  );
}
