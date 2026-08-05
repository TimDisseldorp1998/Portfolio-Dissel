"use client";

import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Kleine pauzeknop voor content die uit zichzelf blijft doorlopen.
 * WCAG 2.2.2 vraagt om een manier om beweging die langer dan vijf seconden
 * duurt te stoppen. Bewust alleen een icoon met een toegankelijke naam, zodat
 * het de compositie niet breekt; het tikbare vlak is 24x24.
 */
export function PauseButton({
  paused,
  onToggle,
  label,
  className,
}: {
  paused: boolean;
  onToggle: () => void;
  /** Wat er pauzeert, bijv. "Reviews". Komt terug in het aria-label. */
  label: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={paused ? `${label} hervatten` : `${label} pauzeren`}
      className={cn(
        "inline-flex h-6 w-6 items-center justify-center rounded-full text-white/40 transition-colors hover:bg-white/10 hover:text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
        className
      )}
    >
      {paused ? <Play size={12} aria-hidden /> : <Pause size={12} aria-hidden />}
    </button>
  );
}
