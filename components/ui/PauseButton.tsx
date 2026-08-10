"use client";

import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/cn";

/** Vlak en icoon horen bij elkaar, dus ze staan hier samen. Zou je het vlak
 *  via `className` overschrijven, dan botst dat met de basisklasse: `cn` is
 *  clsx zonder tailwind-merge, dus beide blijven staan en de CSS-volgorde
 *  beslist. */
const maten = {
  /** Klein, voor een hoekje van een kaart of slider. */
  sm: { vlak: "h-6 w-6", icoon: 12 },
  /** Groot genoeg om zelf een plek in de compositie te hebben, en meteen een
   *  tikdoel van 44px. */
  md: { vlak: "h-11 w-11", icoon: 18 },
};

/**
 * Kleine pauzeknop voor content die uit zichzelf blijft doorlopen.
 * WCAG 2.2.2 vraagt om een manier om beweging die langer dan vijf seconden
 * duurt te stoppen. Bewust alleen een icoon met een toegankelijke naam, zodat
 * het de compositie niet breekt.
 */
export function PauseButton({
  paused,
  onToggle,
  label,
  className,
  size = "sm",
}: {
  paused: boolean;
  onToggle: () => void;
  /** Wat er pauzeert, bijv. "Reviews". Komt terug in het aria-label. */
  label: string;
  className?: string;
  size?: keyof typeof maten;
}) {
  const maat = maten[size];
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={paused ? `${label} hervatten` : `${label} pauzeren`}
      className={cn(
        "inline-flex items-center justify-center rounded-full text-white/40 transition-colors hover:bg-white/10 hover:text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
        maat.vlak,
        className
      )}
    >
      {paused ? (
        <Play size={maat.icoon} aria-hidden />
      ) : (
        <Pause size={maat.icoon} aria-hidden />
      )}
    </button>
  );
}
