"use client";

import { useRouter } from "next/navigation";
import { useRef, type CSSProperties, type MouseEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { datumLabel, type CaseKaartData, type CaseLabel } from "@/lib/werk-gedeeld";
import { trekIn } from "./trekIn";

/** Alleen gewone data: dit is een client component, dus geen functies. */
export type CaseKaartProps = {
  slug: string;
  klant: string;
  datum: string;
  label: CaseLabel | null;
  /** De tags uit `meta.tags`, als kleine pillen onderin. */
  tags: string[];
  kaart: CaseKaartData;
  /** Het beeld van de kaart, gelijk aan de hero van de case (heroBeeld). */
  beeld: { src: string; alt: string; stijl?: CSSProperties };
};

/**
 * De grote casekaart op home. Weet niets van grid of slider: vaste
 * verhouding (3:4), geen marges naar buiten. De indeling regelt CaseOverzicht.
 *
 * Het beeld vult de hele kaart; de kopbalk ligt er bovenin overheen, kop en
 * tags onderin op een gradient. Een klik trekt je de case in, met dezelfde
 * duik als de vorige/volgende-kaarten (./trekIn.ts). Zonder JavaScript, bij
 * reduced motion of met cmd/ctrl-klik is het een gewone link.
 *
 * De toegankelijke naam is klantnaam plus kop (aria-labelledby), anders
 * werden datum en tags er ook in voorgelezen.
 */
export function CaseKaart({
  caseMeta: c,
  kop: Kop = "h3",
}: {
  caseMeta: CaseKaartProps;
  /** h3 onder een H2 (home). */
  kop?: "h2" | "h3";
}) {
  const router = useRouter();
  const imgRef = useRef<HTMLImageElement>(null);
  const k = c.kaart;
  const id = `kaart-${c.slug}`;
  const href = `/werk/${c.slug}/`;

  function klik(e: MouseEvent<HTMLAnchorElement>) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const img = imgRef.current;
    if (!img || typeof img.animate !== "function") return;
    e.preventDefault();
    trekIn(img, href, (url) => router.push(url), { waas: 0 });
  }

  return (
    <a
      href={href}
      onClick={klik}
      onMouseEnter={() => router.prefetch(href)}
      onFocus={() => router.prefetch(href)}
      aria-labelledby={`${id}-klant ${id}-kop`}
      className="group relative block aspect-[3/4] overflow-hidden rounded-[20px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-dark"
      style={{ backgroundColor: k.kleur }}
    >
      {/* trekIn neemt de rechthoek en hoeken van de ouder van het beeld als
          startpunt; deze laag vult de kaart en erft de hoeken. Hij is ook de
          container voor de uitsnede (focusStijl). Zelfde bestand als de hero
          van de case. */}
      <div className="absolute inset-0 overflow-hidden rounded-[inherit] [container-type:size]">
        {/* Gewone img: next/image met `fill` staat geen eigen maat toe, en
            die heeft focusStijl nodig. De beelden zijn toch unoptimized. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          src={c.beeld.src}
          alt={c.beeld.alt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-200 ease-out motion-safe:group-hover:scale-[1.02] motion-safe:group-focus-visible:scale-[1.02]"
          style={c.beeld.stijl}
          data-focus={c.beeld.stijl ? "" : undefined}
        />
      </div>

      {/* Kopbalk, als doorschijnende balk over het beeld. Alleen de
          achtergrond is doorschijnend, de tekst houdt volle dekking. 62% is
          het minimum voor 4,5:1 op een helemaal witte foto (Ziggo Dome):
          naam 5,6:1, jaartal (wit op 85%) 4,6:1. */}
      <div className="absolute inset-x-3 top-3 flex items-center justify-between gap-3 rounded-xl bg-[rgba(10,10,15,0.62)] px-5 py-3.5 backdrop-blur-sm">
        <span id={`${id}-klant`} className="font-heading text-base font-semibold text-white">
          {c.klant}
        </span>
        <span className="flex shrink-0 items-center gap-2">
          {c.label === "concept" && (
            <span className="rounded-full bg-white/[0.08] px-2 py-0.5 text-[11px] font-medium uppercase tracking-wider text-white/85">
              Concept
            </span>
          )}
          <span className="text-sm tabular-nums text-white/85">
            {datumLabel(c.datum)}
          </span>
        </span>
      </div>

      {/* Zachte gradient onderin, zodat de tekst op elk beeld leesbaar is. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-[linear-gradient(to_top,rgba(10,10,15,0.92)_0%,rgba(10,10,15,0.6)_45%,rgba(10,10,15,0)_100%)]"
      />
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
        <Kop
          id={`${id}-kop`}
          className="max-w-[30ch] font-heading text-[22px] font-semibold leading-[1.2] text-white sm:text-2xl lg:text-[30px]"
        >
          {k.kop}
        </Kop>
        {k.subtitel && <p className="mt-1.5 text-base italic text-white/85">{k.subtitel}</p>}
        {/* Tags links, de oranje pijl rechts, verticaal gecentreerd. De pijl
            is decoratief: de hele kaart is de link. Hover en focus op de
            kaart zetten zijn hover aan. */}
        <div className="mt-4 flex items-center justify-between gap-3">
          {c.tags.length > 0 && (
            <ul className="flex flex-wrap gap-1.5">
              {c.tags.map((t) => (
                <li
                  key={t}
                  className="rounded-full bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-white/60"
                >
                  {t}
                </li>
              ))}
            </ul>
          )}
          <span
            aria-hidden="true"
            className="ml-auto inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary transition-[background-color,color] duration-300 group-hover:bg-secondary group-hover:text-white group-focus-visible:bg-secondary group-focus-visible:text-white"
          >
            <ArrowUpRight size={16} />
          </span>
        </div>
      </div>
    </a>
  );
}
