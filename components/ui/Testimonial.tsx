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
      className="flex w-[320px] flex-none flex-col gap-5 rounded-[20px] border border-white/[0.07] bg-white/[0.045] p-[26px] transition-[border-color,background-color] duration-300 hover:border-[rgba(255,131,61,0.35)] hover:bg-white/[0.075] sm:w-[440px]"
    >
      <blockquote className="text-[15px] leading-[1.6] text-white/[0.82] text-pretty">
        {review.quote}
      </blockquote>
      <figcaption className="mt-auto flex items-center gap-3">
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
      </figcaption>
    </figure>
  );
}
