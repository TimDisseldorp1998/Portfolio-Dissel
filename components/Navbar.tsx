"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { ArrowRight, ChevronDown, User, Eye, LayoutGrid, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import { isProgrammaticScroll, scrollToSection } from "@/lib/scroll";
import { LogoMark } from "./Logo";
import { KoffieIcoon } from "./ui/KoffieIcoon";

/**
 * Scroll thresholds (hysteresis) for the scrolled pill state: extra blur and
 * a deeper shadow past SCROLLED_AT, back to the resting style above REST_AT.
 */
const SCROLLED_AT = 80;
const REST_AT = 40;

/** Elk item is een eigen pagina; home bereik je via het logo en de footer. */
const items: { label: string; href: string; icon: LucideIcon }[] = [
  { label: "Werk", href: "/werk/", icon: Eye },
  { label: "Diensten", href: "/diensten/", icon: LayoutGrid },
  { label: "Over mij", href: "/over-mij/", icon: User },
];

/** Uitklapmenu onder Diensten (alleen vanaf lg; op mobiel gaat Diensten
 *  gewoon naar /diensten/). Op deze pagina's staat Diensten ook actief. */
const dienstLinks = [
  { naam: "Website laten maken", href: "/website-laten-maken/", tekst: "Op maat ontworpen en gebouwd" },
  { naam: "Huisstijl laten maken", href: "/huisstijl-laten-maken/", tekst: "Logo, kleuren en een stijlgids" },
  { naam: "UX/UI design", href: "/ux-ui-design/", tekst: "Voor je product of platform" },
  { naam: "Website verbeteren", href: "/website-verbeteren/", tekst: "Met een gratis websitecheck" },
  { naam: "Voor bureaus", href: "/voor-bureaus/", tekst: "Freelance UX/UI designer" },
];

/** Zonder slash aan het eind, zodat "/werk" en "/werk/" hetzelfde zijn. */
const kaal = (pad: string) => pad.replace(/\/+$/, "") || "/";

/** Idle delay (ms) before the mobile nav grows back to its resting size. */
const IDLE_AFTER = 220;

export function Navbar() {
  const prefersReducedMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
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

  const pad = kaal(usePathname() ?? "/");
  const opHome = pad === "/";

  /** "page" op de pagina zelf, "true" op een onderliggende pagina (een case
   *  onder Werk). */
  function huidig(href: string): "page" | "true" | undefined {
    const doel = kaal(href);
    if (pad === doel) return "page";
    if (pad.startsWith(`${doel}/`)) return "true";
    if (doel === "/diensten" && dienstLinks.some((d) => pad === kaal(d.href) || pad.startsWith(d.href)))
      return "true";
    return undefined;
  }

  // Diensten-uitklapmenu: openen met klik op het pijltje of met de muis
  // erboven; dicht met Escape, een klik ernaast of als de focus eruit gaat.
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLLIElement>(null);
  const knopRef = useRef<HTMLButtonElement>(null);
  const sluitTimer = useRef(0);

  useEffect(() => {
    if (!menuOpen) return;
    const opKlik = (e: PointerEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    const opToets = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMenuOpen(false);
      knopRef.current?.focus();
    };
    document.addEventListener("pointerdown", opKlik);
    document.addEventListener("keydown", opToets);
    return () => {
      document.removeEventListener("pointerdown", opKlik);
      document.removeEventListener("keydown", opToets);
    };
  }, [menuOpen]);

  useEffect(() => () => window.clearTimeout(sluitTimer.current), []);

  const muisErin = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    window.clearTimeout(sluitTimer.current);
    setMenuOpen(true);
  };
  const muisEruit = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    sluitTimer.current = window.setTimeout(() => setMenuOpen(false), 180);
  };

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
        {/* Logo — mark only. Op home scrolt hij terug naar boven, elders gaat
            hij naar home. */}
        <a
          href="/"
          onClick={(e) => {
            if (opHome) scrollToSection(e, "#top", prefersReducedMotion);
          }}
          aria-label={
            opHome ? "DisselDesign, terug naar boven" : "DisselDesign, naar de homepage"
          }
          className="flex min-h-[50px] shrink-0 items-center rounded-full px-2 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/40 sm:min-h-[44px]"
        >
          <LogoMark className="h-8 w-auto sm:h-7" />
        </a>

        <ul className="flex items-center gap-0.5 sm:gap-1">
          {items.map((item) => {
            const Icon = item.icon;
            const stand = huidig(item.href);
            const isActive = stand !== undefined;
            return (
              <li
                key={item.href}
                {...(item.href === "/diensten/"
                  ? {
                      ref: menuRef,
                      className: "relative flex items-center",
                      onPointerEnter: muisErin,
                      onPointerLeave: muisEruit,
                      onBlur: (e: React.FocusEvent) => {
                        if (!e.currentTarget.contains(e.relatedTarget as Node)) setMenuOpen(false);
                      },
                    }
                  : {})}
              >
                <a
                  href={item.href}
                  onClick={(e) =>
                    scrollToSection(e, item.href, prefersReducedMotion)
                  }
                  aria-label={item.label}
                  aria-current={stand}
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
                  {/* On mobile only the active item shows its name; from sm up
                      every item shows its label. */}
                  <span className={cn(isActive ? "inline" : "hidden sm:inline")}>
                    {item.label}
                  </span>
                </a>
                {item.href === "/diensten/" && (
                  <>
                    <button
                      ref={knopRef}
                      type="button"
                      aria-expanded={menuOpen}
                      aria-controls="diensten-menu"
                      aria-label="Diensten-menu"
                      onClick={() => setMenuOpen((o) => !o)}
                      className="-ml-1 hidden h-[44px] w-7 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/[0.07] hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/40 lg:flex"
                    >
                      <ChevronDown
                        size={16}
                        aria-hidden
                        className={cn("transition-transform duration-200", menuOpen && "rotate-180")}
                      />
                    </button>
                    {/* pt-3 is een onzichtbare brug, zodat de muis van de pil
                        naar het paneel kan zonder dat het dichtgaat. */}
                    <div
                      id="diensten-menu"
                      className={cn(
                        "absolute left-1/2 top-full hidden w-[22rem] -translate-x-1/2 pt-3",
                        menuOpen && "lg:block"
                      )}
                    >
                      <div className="rounded-3xl border border-white/10 bg-[#12121A] p-2 shadow-[0_16px_48px_rgba(0,0,0,0.55)]">
                        <ul>
                          {dienstLinks.map((d) => (
                            <li key={d.href}>
                              <a
                                href={d.href}
                                aria-current={pad === kaal(d.href) ? "page" : undefined}
                                className="block rounded-2xl px-4 py-3 transition-colors hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/40 aria-[current=page]:bg-primary/10"
                              >
                                <span className="block text-[15px] font-medium text-white">{d.naam}</span>
                                <span className="mt-0.5 block text-sm text-white/60">{d.tekst}</span>
                              </a>
                            </li>
                          ))}
                        </ul>
                        <a
                          href="/diensten/"
                          className="mt-1 flex items-center gap-1.5 rounded-2xl border-t border-white/10 px-4 py-3 text-sm font-medium text-white/70 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/40"
                        >
                          Alle diensten
                          <ArrowRight size={16} aria-hidden />
                        </a>
                      </div>
                    </div>
                  </>
                )}
              </li>
            );
          })}
        </ul>

        {/* Kennismakingsknop. Volledige tekst pas vanaf lg: daaronder staat de
            pil onderin en is hij in rust 1,15x geschaald, dan past de tekst
            er naast de drie items niet in. Daar een gevuld icoon met dezelfde
            toegankelijke naam. */}
        <a
          href="/contact/"
          data-cta="plan_kennismaking"
          aria-label="Plan een gesprek"
          aria-current={huidig("/contact/") === "page" ? "page" : undefined}
          className="group ml-1 flex min-h-[50px] min-w-[50px] items-center justify-center gap-2 rounded-full bg-primary px-3.5 text-[15px] font-semibold text-ink transition-colors duration-200 hover:bg-primary-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/40 sm:min-h-[44px] lg:px-4"
        >
          {/* Koffiekopje = kennismaking. Onder lg alleen het kopje; de knop
              houdt dan zijn aria-label als naam. */}
          <KoffieIcoon stoom="hover" />
          <span className="hidden lg:inline">Plan een gesprek</span>
        </a>
      </nav>
    </header>
  );
}
