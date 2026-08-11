"use client";

import { reviews } from "@/lib/content";

export type Review = (typeof reviews)[number];

/**
 * Quote-kaart in de lopende rij. Vaste breedte, want in een marquee bepaalt
 * de kaart de loopafstand; een meebuigende breedte maakt de animatie
 * onvoorspelbaar.
 */
export function MarqueeCard({
  review,
  decoratief,
}: {
  review: Review;
  /** Tweede set in de rij: staat er alleen om de loop rond te maken, dus een
   *  schermlezer hoeft die niet nog een keer te horen. */
  decoratief?: boolean;
}) {
  return (
    <figure
      aria-hidden={decoratief || undefined}
      // 440px is gemeten, niet gekozen: bij 376 loopt de langste quote uit tot
      // vijf regels, vanaf 400 wordt het er vier en pas vanaf 500 drie. 440 zit
      // midden in die band, dus een iets langere quote past er ook nog in.
      //
      // Geen rand: het vlak alleen draagt de kaart. Bij hover licht dat vlak op
      // van 0.045 naar 0.09. Dat is bewust een grotere stap dan eerst, want de
      // oranje rand deed vroeger het meeste werk; met alleen de oude 0.075 was
      // de hover nauwelijks nog te zien.
      className="flex w-[320px] flex-none flex-col gap-5 rounded-[20px] bg-white/[0.045] p-[26px] transition-colors duration-300 hover:bg-white/[0.09] sm:w-[440px]"
    >
      <blockquote className="text-[15px] leading-[1.6] text-white/[0.82] text-pretty">
        {review.quote}
      </blockquote>
      <figcaption className="mt-auto flex items-center gap-3">
        {review.author ? (
          <>
            {/* Het logo ligt over de initiaal heen; ontbreekt het bestand, dan
                verbergt onError het en komt de initiaal weer tevoorschijn. */}
            <span className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/[0.14] bg-white/[0.06] font-heading text-[10.5px] font-semibold text-white/60">
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
              <span className="block font-heading text-[13px] font-semibold leading-[1.2] text-white">
                {review.author}
              </span>
              <span className="mt-0.5 block truncate text-xs leading-[1.2] text-white/45">
                {review.role}
              </span>
            </span>
          </>
        ) : (
          <>
            {/* Geen persoon bekend: dan draagt het bedrijf de review. Het logo
                staat rechts, zoals in het ontwerp. `alt` blijft leeg omdat de
                bedrijfsnaam er al als tekst naast staat. */}
            <span className="min-w-0 font-heading text-[13px] font-semibold leading-[1.2] text-white">
              {review.company}
            </span>
            {review.logo && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={review.logo}
                alt=""
                loading="lazy"
                draggable={false}
                // brightness-0 + invert maakt elk logo wit; dit exemplaar is dat
                // al, maar zo klopt het ook als er ooit een gekleurd logo in gaat.
                className="ml-auto h-4 w-auto shrink-0 opacity-50 brightness-0 invert"
              />
            )}
          </>
        )}
      </figcaption>
    </figure>
  );
}
