"use client";

import { Info } from "lucide-react";
import { useEffect, useId, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Er staat er steeds maar één open: een nieuwe sluit de vorige. */
const SLUIT_ANDERE = "dd:info-open";

/**
 * ⓘ-knop met een info-wolk. De wolk staat altijd in de HTML en wordt alleen
 * met `hidden` verborgen, dus Google en AI-assistenten lezen de tekst mee.
 *
 * Vanaf 768px zweeft de wolk onder de knop (absoluut, dus de kaart verschuift
 * niet). Daaronder klapt hij in de kaart open: de ouder moet dan `flex-wrap`
 * zijn, de wolk neemt een volle regel (`basis-full`).
 *
 * Openen met klik of tik; met een muis ook bij hover. Sluiten met Esc, een
 * klik erbuiten of een tweede klik. Na Esc of een tweede klik staat de focus
 * weer op de knop. De wolk bevat bewust geen links of knoppen.
 */
export function InfoKnop({
  label,
  tekst,
  children,
  className,
}: {
  /** Voor schermlezers, bijv. "Meer over Website". */
  label: string;
  /** Zichtbare tekst naast het icoon, bijv. "Wat zit erin?". Optioneel. */
  tekst?: string;
  children: ReactNode;
  className?: string;
}) {
  const id = useId();
  const paneelId = `info-${id}`;
  const knopRef = useRef<HTMLButtonElement>(null);
  const paneelRef = useRef<HTMLDivElement>(null);
  // Vastgezet met een klik blijft hij open als de muis weggaat.
  const [vast, setVast] = useState(false);
  const [hover, setHover] = useState(false);
  const open = vast || hover;
  // Past de wolk niet meer onder de knop, dan opent hij erboven.
  const [omhoog, setOmhoog] = useState(false);
  useLayoutEffect(() => {
    const paneel = paneelRef.current;
    const knop = knopRef.current;
    if (!open || !paneel || !knop || !window.matchMedia("(min-width: 768px)").matches) {
      setOmhoog(false);
      return;
    }
    const k = knop.getBoundingClientRect();
    const hoogte = paneel.offsetHeight + 16;
    setOmhoog(k.bottom + hoogte > window.innerHeight && k.top > hoogte);
  }, [open]);
  // Kleine vertraging bij weggaan, zodat de muis van knop naar wolk kan.
  const hoverTimer = useRef<number>();
  const hoverAan = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    window.clearTimeout(hoverTimer.current);
    setHover(true);
  };
  const hoverUit = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    hoverTimer.current = window.setTimeout(() => setHover(false), 150);
  };

  function sluit(focusTerug: boolean) {
    window.clearTimeout(hoverTimer.current);
    setVast(false);
    setHover(false);
    if (focusTerug) knopRef.current?.focus();
  }

  useEffect(() => {
    if (!open) return;
    window.dispatchEvent(new CustomEvent(SLUIT_ANDERE, { detail: paneelId }));
    const opToets = (e: KeyboardEvent) => {
      if (e.key === "Escape") sluit(true);
    };
    const opKlik = (e: PointerEvent) => {
      const doel = e.target as Node;
      if (knopRef.current?.contains(doel) || paneelRef.current?.contains(doel)) return;
      sluit(false);
    };
    document.addEventListener("keydown", opToets);
    document.addEventListener("pointerdown", opKlik);
    return () => {
      document.removeEventListener("keydown", opToets);
      document.removeEventListener("pointerdown", opKlik);
    };
  }, [open, paneelId]);

  useEffect(() => () => window.clearTimeout(hoverTimer.current), []);

  useEffect(() => {
    const opAndere = (e: Event) => {
      if ((e as CustomEvent<string>).detail !== paneelId) sluit(false);
    };
    window.addEventListener(SLUIT_ANDERE, opAndere);
    return () => window.removeEventListener(SLUIT_ANDERE, opAndere);
  }, [paneelId]);

  return (
    <>
      <button
        ref={knopRef}
        type="button"
        aria-label={tekst ? undefined : label}
        aria-expanded={open}
        aria-controls={paneelId}
        onClick={() => (vast ? sluit(true) : setVast(true))}
        onPointerEnter={hoverAan}
        onPointerLeave={hoverUit}
        className={cn(
          // 44px klikvlak; het icoon zelf is 18px.
          "-m-2.5 inline-flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center gap-1.5 rounded-full px-2.5 text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary aria-expanded:text-primary",
          tekst && "text-sm font-medium",
          className
        )}
      >
        {tekst}
        <Info size={18} strokeWidth={2} aria-hidden />
      </button>
      <div
        ref={paneelRef}
        id={paneelId}
        role="region"
        aria-label={label}
        hidden={!open}
        onPointerEnter={hoverAan}
        onPointerLeave={hoverUit}
        className={cn(
          "info-wolk mt-3 basis-full rounded-2xl bg-[#1c1c24] p-4 text-sm leading-relaxed text-white/80 max-md:order-last md:absolute md:right-0 md:z-30 md:w-72 md:max-w-[calc(100vw-2rem)] md:shadow-[0_12px_40px_rgba(0,0,0,0.5)] md:ring-1 md:ring-white/10",
          omhoog ? "md:bottom-full md:mb-2 md:mt-0" : "md:top-full md:mt-2"
        )}
      >
        {children}
      </div>
    </>
  );
}
