"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  User,
  FolderOpen,
  Sparkles,
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
  "#about": User,
  "#work": FolderOpen,
  "#skills": Sparkles,
};

const items = nav.map((n) => ({
  ...n,
  icon: iconMap[n.href] ?? Sparkles,
}));

const SECTION_IDS = items.map((i) => i.href.slice(1));

export function Navbar() {
  const prefersReducedMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  // rAF-throttled scroll listener with hysteresis.
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        setScrolled((prev) => (prev ? y > REST_AT : y >= SCROLLED_AT));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
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

    // Hero, contact and footer clear the highlight — none of them has a nav
    // item, so nothing should look active while they're in view.
    const clearObserver = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) setActive(null);
      });
    }, observerOptions);
    [
      document.getElementById("top"),
      document.getElementById("contact"),
      document.querySelector("footer"),
    ].forEach((el) => {
      if (el) clearObserver.observe(el);
    });

    return () => {
      observer.disconnect();
      clearObserver.disconnect();
    };
  }, []);

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
          "flex w-full items-center gap-1 rounded-full border border-white/10 px-2 py-1 text-white transition-all duration-[250ms] sm:w-auto sm:px-2.5",
          scrolled
            ? "bg-[#12121A]/85 shadow-[0_8px_32px_rgba(0,0,0,0.55)] backdrop-blur-[12px]"
            : "bg-[#12121A] shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
        )}
      >
        {/* Logo — mark only */}
        <a
          href="#top"
          aria-label="DisselDesign — terug naar boven"
          className="flex min-h-[44px] shrink-0 items-center rounded-full px-2 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/40"
        >
          <LogoMark className="h-7 w-auto" />
        </a>

        <ul className="flex flex-1 items-center justify-evenly gap-0.5 sm:flex-none sm:justify-normal sm:gap-1">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.href;
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-label={item.label}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "flex min-h-[44px] min-w-[44px] items-center justify-center gap-1.5 rounded-full px-3 text-[15px] font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/40 sm:min-w-0 sm:px-3.5",
                    isActive
                      ? "bg-white/10 text-white"
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

        {/* CTA — filled cyan, one shade darker for depth against the pill */}
        <a
          href="#contact"
          className="ml-1 flex min-h-[40px] shrink-0 items-center rounded-full bg-primary-700 px-4 text-[15px] font-medium text-white transition-all duration-200 hover:bg-primary-600 hover:text-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/40 sm:px-5"
        >
          Let&apos;s talk
        </a>
      </nav>
    </motion.header>
  );
}
