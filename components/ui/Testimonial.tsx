"use client";

import { reviews } from "@/lib/content";
import { cn } from "@/lib/cn";

export type Review = (typeof reviews)[number];

/** Randkleur bij hover. Rij 1 loopt op oranje, rij 2 op cyaan. */
export type MarqueeAccent = "secondary" | "primary";

const accentHover: Record<MarqueeAccent, string> = {
  secondary: "hover:border-[rgba(255,131,61,0.35)]",
  primary: "hover:border-[rgba(92,221,255,0.35)]",
};

/**
 * Quote-kaart in de lopende rij. Vaste breedte, want in een marquee bepaalt
 * de kaart de loopafstand; een meebuigende breedte maakt de animatie
 * onvoorspelbaar.
 */
export function MarqueeCard({
  review,
  accent,
  decoratief,
}: {
  review: Review;
  accent: MarqueeAccent;
  /** Tweede set in de rij: staat er alleen om de loop rond te maken, dus een
   *  schermlezer hoeft die niet nog een keer te horen. */
  decoratief?: boolean;
}) {
  return (
    <figure
      aria-hidden={decoratief || undefined}
      className={cn(
        "flex w-[300px] flex-none flex-col gap-[18px] rounded-[20px] border border-white/[0.07] bg-white/[0.045] p-6 transition-[border-color,background-color] duration-300 hover:bg-white/[0.075] sm:w-[330px]",
        accentHover[accent]
      )}
    >
      <blockquote className="text-[14.5px] leading-[1.6] text-white/80 text-pretty">
        {review.quote}
      </blockquote>
      <figcaption className="mt-auto flex items-center gap-[11px]">
        {/* Het logo ligt over de initiaal heen; ontbreekt het bestand, dan
            verbergt onError het en komt de initiaal weer tevoorschijn. */}
        <span className="relative flex h-[34px] w-[34px] shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/[0.14] bg-white/[0.06] font-heading text-[10px] font-semibold text-white/60">
          <span aria-hidden>{review.initials}</span>
          {review.logo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={review.logo}
              alt=""
              loading="lazy"
              draggable={false}
              className="absolute inset-0 h-full w-full object-contain"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          )}
        </span>
        <span className="min-w-0">
          <span className="block font-heading text-[12.5px] font-semibold leading-[1.2] text-white">
            {review.author}
          </span>
          <span className="mt-0.5 block truncate text-[11.5px] leading-[1.2] text-white/45">
            {review.role}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
