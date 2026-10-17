"use client";

import { useCallback, useRef, useState } from "react";
import { Briefcase, Calendar, ChevronLeft, ChevronRight, MonitorSmartphone } from "lucide-react";
import type { Slide } from "@/lib/werk";
import { cn } from "@/lib/cn";

/** Minimale veegafstand in px voordat een swipe als wissel telt. */
const VEEG = 40;

/**
 * Carousel bovenaan de casepagina, in de vorm van de oude case-popup: de
 * projectfeiten over de bovenkant van het beeld, pijlen opzij, bolletjes
 * eronder. Beelden faden in elkaar over en zoomen daarbij licht uit.
 *
 * Alle beelden staan in de server-HTML (met alt-tekst); alleen het eerste
 * laadt meteen, de rest lazy. Geen autoplay: de bezoeker bepaalt het tempo.
 */
export function CaseCarousel({
  klant,
  slides,
  rol,
  jaar,
  type,
}: {
  klant: string;
  slides: Slide[];
  rol: string;
  jaar: string | null;
  type: string;
}) {
  const [actief, setActief] = useState(0);
  const aantal = slides.length;
  const startX = useRef<number | null>(null);

  const vorige = useCallback(() => setActief((i) => (i - 1 + aantal) % aantal), [aantal]);
  const volgende = useCallback(() => setActief((i) => (i + 1) % aantal), [aantal]);

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label={`${klant}: beelden`}
      onKeyDown={(e) => {
        if (aantal < 2) return;
        if (e.key === "ArrowLeft") vorige();
        if (e.key === "ArrowRight") volgende();
      }}
    >
      <div
        className="relative aspect-[4/3] touch-pan-y overflow-hidden rounded-3xl bg-white/[0.04] md:aspect-[16/10]"
        onPointerDown={(e) => {
          startX.current = e.clientX;
        }}
        onPointerUp={(e) => {
          if (startX.current === null || aantal < 2) return;
          const dx = e.clientX - startX.current;
          startX.current = null;
          if (dx > VEEG) vorige();
          if (dx < -VEEG) volgende();
        }}
      >
        {slides.map((s, i) => (
          <div
            key={s.src}
            aria-hidden={i !== actief}
            className={cn(
              "absolute inset-0 transition-opacity duration-700 ease-out motion-reduce:transition-none",
              i === actief ? "opacity-100" : "opacity-0"
            )}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={s.src}
              alt={s.alt}
              draggable={false}
              decoding="async"
              loading={i === 0 ? "eager" : "lazy"}
              {...(i === 0 ? { fetchpriority: "high" } : {})}
              className={cn(
                "h-full w-full select-none object-cover transition-transform duration-[1200ms] ease-out motion-reduce:transition-none motion-reduce:scale-100",
                i === actief ? "scale-100" : "scale-[1.06]"
              )}
            />
          </div>
        ))}

        {/* Scrims: houden de feiten bovenin en het label onderin leesbaar,
            ook op een licht beeld. */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/60 via-black/25 to-transparent" />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/70 to-transparent" />

        {/* Projectfeiten over de bovenkant van het beeld */}
        <dl className="absolute inset-x-0 top-0 flex flex-wrap items-start gap-x-6 gap-y-2 p-5 md:gap-x-10 md:p-6">
          <Feit label="Rol" icoon={<Briefcase size={12} aria-hidden />}>
            {rol}
          </Feit>
          {jaar && (
            <Feit label="Jaar" icoon={<Calendar size={12} aria-hidden />}>
              {jaar}
            </Feit>
          )}
          <Feit label="Type" icoon={<MonitorSmartphone size={12} aria-hidden />}>
            <span className="inline-flex items-center rounded-full border border-white/40 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide md:text-sm">
              {type}
            </span>
          </Feit>
        </dl>

        {/* Label en teller van het huidige beeld */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between p-5 md:p-6">
          <p key={actief} className="mount-rise text-sm font-medium uppercase tracking-[0.18em] text-white/85">
            {slides[actief].label}
          </p>
          {aantal > 1 && (
            <p aria-hidden className="text-xs font-medium tabular-nums tracking-[0.18em] text-white/70">
              {String(actief + 1).padStart(2, "0")} / {String(aantal).padStart(2, "0")}
            </p>
          )}
        </div>

        {aantal > 1 && (
          <>
            <button
              type="button"
              onClick={vorige}
              aria-label="Vorige afbeelding"
              className="absolute left-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm transition-[background-color,transform] duration-200 hover:scale-105 hover:bg-black/80 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
            >
              <ChevronLeft size={20} aria-hidden />
            </button>
            <button
              type="button"
              onClick={volgende}
              aria-label="Volgende afbeelding"
              className="absolute right-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm transition-[background-color,transform] duration-200 hover:scale-105 hover:bg-black/80 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
            >
              <ChevronRight size={20} aria-hidden />
            </button>
          </>
        )}
      </div>

      {/* Kondigt de wissel aan; pijlen en bolletjes geven anders geen
          hoorbare terugkoppeling. */}
      <p aria-live="polite" className="sr-only">
        Afbeelding {actief + 1} van {aantal}: {slides[actief].label}
      </p>

      {aantal > 1 && (
        // Elke knop is 24x24 met het bolletje erin, zonder ruimte ertussen:
        // zo is het tikvlak groot genoeg (WCAG 2.5.8) en overlapt het niet met
        // dat van de buren. Met kleine stipjes en 6px tussenruimte faalde dat.
        <div className="mt-3 flex justify-center">
          {slides.map((s, i) => (
            <button
              key={s.src}
              type="button"
              onClick={() => setActief(i)}
              aria-label={`Ga naar afbeelding ${i + 1} van ${aantal}: ${s.label}`}
              aria-current={i === actief || undefined}
              className="group/stip flex h-6 w-6 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            >
              <span
                aria-hidden
                className={cn(
                  "h-2 rounded-full transition-[width,background-color] duration-300",
                  i === actief ? "w-5 bg-white" : "w-2 bg-white/30 group-hover/stip:bg-white/60"
                )}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Feit({
  label,
  icoon,
  children,
}: {
  label: string;
  icoon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* Op mobiel alleen het icoon als label, vanaf md ook het woord. */}
      <dt className="sr-only md:not-sr-only md:mb-1 md:flex md:items-center md:gap-1.5 md:text-[11px] md:font-medium md:uppercase md:tracking-[0.14em] md:text-white/60">
        {icoon}
        {label}
      </dt>
      <dd className="flex items-center gap-1.5 text-sm font-semibold text-white md:text-base">
        <span className="shrink-0 text-white/60 md:hidden">{icoon}</span>
        {children}
      </dd>
    </div>
  );
}
