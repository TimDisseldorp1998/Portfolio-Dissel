"use client";

import { reviews } from "@/lib/content";

export type Review = (typeof reviews)[number];

/**
 * Quote-kaart in de lopende rij. Vaste breedte, want in een marquee bepaalt
 * de kaart de loopafstand; een meebuigende breedte maakt de animatie
 * onvoorspelbaar.
 */
/** Aria-hidden en inert voor de kopieën regelt de Marquee zelf. */
export function MarqueeCard({ review }: { review: Review }) {
  return (
    <figure
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
        &ldquo;{review.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-auto flex items-center gap-3">
        {review.author ? (
          <>
            {/* Rondje alleen als er een logo is; zonder logo staan alleen
                naam en bedrijf er. Het logo ligt over de initiaal heen;
                laadt het bestand niet, dan verbergt onError het en komt de
                initiaal tevoorschijn. */}
            {review.logo && (
              <span className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/[0.14] bg-white/[0.06] font-heading text-[10.5px] font-semibold text-white/60">
                <span aria-hidden>{review.initials}</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
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
              </span>
            )}
            <span className="min-w-0">
              <span className="block font-heading text-[13px] font-semibold leading-[1.2] text-white">
                {review.author}
              </span>
              {/* /50: met /45 was het 4,49:1 op de kaart, net onder de norm. */}
              <span className="mt-0.5 block truncate text-xs leading-[1.2] text-white/50">
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
        {/* Bewust klein: de review draagt de kaart, de bron staat erbij.
            Rechtsonder, op dezelfde basislijn als de onderste regel links. */}
        {review.google && (
          <a
            href={review.google}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto shrink-0 self-end rounded-sm text-[11px] leading-[1.2] text-white/60 transition-colors hover:text-white hover:underline hover:underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Bekijk op Google
            <span className="sr-only"> (opent in nieuw tabblad)</span>
          </a>
        )}
      </figcaption>
    </figure>
  );
}
