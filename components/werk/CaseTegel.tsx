import { ArrowUpRight } from "lucide-react";
import type { Case } from "@/lib/werk";

/**
 * Casetegel op /werk/ (drie kolommen). Eén vorm voor elke case: het kaartbeeld over
 * de hele kaart, de tekst eroverheen tegen de onderrand. Geen rand en geen
 * lift bij hover: inzoomen en de oranje knop doen het werk.
 *
 * De link ligt als overlay over de hele kaart, met een korte naam. Was de
 * hele kaart de link, dan werd alle kaarttekst één lange linknaam.
 */
export function CaseTegel({
  caseMeta,
  kop: Kop = "h3",
  laden = "lazy",
  sizes,
}: {
  caseMeta: Pick<Case, "slug" | "klant" | "kaarttekst" | "tags" | "kaartbeeld" | "kaartSrcSet" | "kaartbeeldStijl">;
  /** h3 onder een H2 (home), h2 direct onder de H1 (/werk/). */
  kop?: "h2" | "h3";
  /** "eager" voor de kaarten die meteen in beeld staan. */
  laden?: "eager" | "lazy";
  /** Hoe breed de kaart is per breakpoint, zodat de browser de juiste
   *  variant uit srcset kiest. */
  sizes: string;
}) {
  const c = caseMeta;
  return (
    <article className="group relative flex h-full w-full flex-col overflow-hidden rounded-3xl text-left transition-[box-shadow] duration-300 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#ff833d] has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-surface-dark">
      {/* Container voor de uitsnede (focusStijl). */}
      <div aria-hidden className="absolute inset-0 overflow-hidden [container-type:size]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={c.kaartbeeld}
        srcSet={c.kaartSrcSet}
        sizes={sizes}
        alt=""
        aria-hidden
        loading={laden}
        decoding="async"
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.04]"
        style={c.kaartbeeldStijl}
      />
      </div>
      {/* Bij hover zakt de tint van 0.55 naar 0.45, waardoor de foto oplicht.
          Niet verder: op 0.35 zakt het oranje pijl-icoon naar 4,52:1. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-surface-dark opacity-[0.55] transition-opacity duration-500 ease-out group-hover:opacity-[0.45]"
      />
      {/* Onderste stop volledig dekkend: bij 0.95 schijnt de foto door en
          licht de onderrand van de kaart op als haarlijn. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(10,10,15,1)_0%,rgba(10,10,15,0.80)_38%,rgba(10,10,15,0)_78%)]"
      />
      {/* Houdt de kaarthoogte op de verhouding van het oude beeldblok; `grow`
          vangt de speling op als een buurkaart hoger uitvalt. */}
      <div aria-hidden className="w-full grow aspect-[16/11]" />

      <div className="relative flex flex-col gap-3 p-6">
        <div className="flex items-start justify-between gap-3">
          <Kop className="font-heading text-lg font-semibold leading-snug text-white">
            {c.klant}
          </Kop>
          <span
            aria-hidden
            className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary transition-[background-color,color] duration-300 group-hover:bg-secondary group-hover:text-white"
          >
            <ArrowUpRight size={16} />
          </span>
        </div>
        <p className="text-sm leading-relaxed text-white/60">{c.kaarttekst}</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {c.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-white/60"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <a
        href={`/werk/${c.slug}/`}
        className="absolute -inset-px z-10 rounded-3xl focus:outline-none"
      >
        <span className="sr-only">Bekijk case: {c.klant}</span>
      </a>
    </article>
  );
}
