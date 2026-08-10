"use client";

import { site } from "@/lib/content";

export type Review = (typeof site.hero.reviews)[number];

/**
 * Kaartopmaak van een klantreview. Staat los van de inhoud omdat de hero de
 * kaart zelf moet kunnen samenstellen: daar liggen alle reviews in dezelfde
 * grid-cel over elkaar heen om te kunnen crossfaden, en dan heeft elke `figure`
 * nog extra klassen nodig.
 */
export const testimonialCardClass =
  "rounded-2xl border border-white/10 bg-white/[0.05] p-5 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.85)] backdrop-blur-xl transition-colors duration-200 max-lg:hover:border-white/25 max-lg:hover:bg-white/[0.09] max-lg:active:border-white/25 max-lg:active:bg-white/[0.09]";

/**
 * De inhoud van een review: quote, logo en naam. Zonder `figure` eromheen,
 * zodat zowel de hero (die er een crossfade-laag van maakt) als het
 * contactblok (één losse kaart) hem kan gebruiken.
 */
export function TestimonialBody({ review }: { review: Review }) {
  return (
    <>
      <blockquote className="text-[0.875rem] leading-relaxed text-white/65 lg:text-[0.95rem]">
        {review.quote}
      </blockquote>
      <figcaption className="mt-3.5 flex items-center gap-2.5">
        {/* Het logo ligt over de initiaal heen; ontbreekt het bestand, dan
            verbergt onError het en komt de initiaal weer tevoorschijn. */}
        <span className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/[0.06] text-sm font-semibold text-white/80">
          <span aria-hidden>{review.initials}</span>
          {review.logo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={review.logo}
              alt=""
              className="absolute inset-0 h-full w-full object-contain"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          )}
        </span>
        <span className="min-w-0">
          <span className="block text-[0.95rem] font-semibold text-white">
            {review.author}
          </span>
          {review.role && (
            <span className="mt-0.5 block text-[0.8125rem] text-white/50">
              {review.role}
            </span>
          )}
        </span>
      </figcaption>
    </>
  );
}

/** Eén losse reviewkaart, voor plekken zonder rotatie. */
export function Testimonial({ review }: { review: Review }) {
  return (
    <figure className={testimonialCardClass}>
      <TestimonialBody review={review} />
    </figure>
  );
}
