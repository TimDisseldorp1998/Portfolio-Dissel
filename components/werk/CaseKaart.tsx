"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, type MouseEvent } from "react";
import { TAG_KLEUR, datumLabel, type CaseKaartData, type CaseLabel } from "@/lib/werk-gedeeld";
import { trekIn } from "./trekIn";

/** Alleen gewone data: dit is een client component, dus geen functies. */
export type CaseKaartProps = {
  slug: string;
  klant: string;
  datum: string;
  label: CaseLabel | null;
  kaart: CaseKaartData;
  /** Het beeld van de kaart, gelijk aan de hero van de case (heroBeeld). */
  beeld: { src: string; alt: string };
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
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: {
  caseMeta: CaseKaartProps;
  /** h3 onder een H2 (home). */
  kop?: "h2" | "h3";
  sizes?: string;
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
      className="group relative block aspect-[3/4] overflow-hidden rounded-[28px] border border-white/10 transition-colors duration-200 hover:border-white/30 focus-visible:border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-dark"
      style={{ backgroundColor: k.kleur }}
    >
      {/* Direct kind van de link: trekIn neemt de rechthoek en hoeken van de
          ouder als startpunt. Zelfde bestand als de hero van de case. */}
      <Image
        ref={imgRef}
        src={c.beeld.src}
        alt={c.beeld.alt}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-200 ease-out motion-safe:group-hover:scale-[1.02] motion-safe:group-focus-visible:scale-[1.02]"
      />

      {/* Kopbalk, als doorschijnende balk over het beeld. */}
      <div className="absolute inset-x-3 top-3 flex items-center justify-between gap-3 rounded-2xl bg-[rgba(10,10,15,0.55)] px-5 py-3.5 backdrop-blur-md">
        <span id={`${id}-klant`} className="font-heading text-base font-semibold text-white">
          {c.klant}
        </span>
        <span className="flex shrink-0 items-center gap-2">
          {c.label === "concept" && (
            <span className="rounded-full border border-white/25 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wider text-white/80">
              Concept
            </span>
          )}
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-white/75">
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
        {k.tags.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {k.tags.map((t) => (
              <li
                key={t.label}
                className="inline-flex h-9 items-center rounded-full border-[1.5px] bg-black/25 px-3.5 text-[15px] text-white"
                style={{ borderColor: TAG_KLEUR[t.soort] }}
              >
                {t.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </a>
  );
}
