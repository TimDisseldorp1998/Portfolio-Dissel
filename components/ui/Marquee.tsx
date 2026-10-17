"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { PauseButton } from "./PauseButton";

export type MarqueeItem = { key: string; node: ReactNode };

/** Standaardsnelheid, gelijk aan die van de oude reviews-carrousel. */
const PX_PER_SECONDE = 30;

/** Maakt een element onbereikbaar voor toetsenbord en schermlezer. React 18
 *  kent `inert` nog niet als prop; als lege string komt hij wel als attribuut
 *  in de HTML. */
const verborgen = { "aria-hidden": true, inert: "" } as Record<string, unknown>;

/**
 * Eindeloos doorlopende rij voor reviews en projecten.
 *
 * De items staan twee keer in één track; de track schuift met CSS van 0 naar
 * -50% (`.mq-row` in globals.css). Op -50% begint de tweede set precies waar
 * de eerste begon, dus de loop is naadloos. Elke set heeft rechts dezelfde
 * ruimte als tussen de items, anders valt de halve slag net naast een
 * kaartgrens en zie je elke ronde een sprongetje.
 *
 * Snelheid in px/s: een ResizeObserver meet de breedte van één set (bij
 * laden en bij elke resize) en zet de duur als CSS-variabele. Verder draait
 * er geen JavaScript per frame.
 *
 * Alleen de eerste keer dat een item voorkomt is bereikbaar. De kopie, en bij
 * `herhaal` ook de herhalingen binnen de eerste set, krijgen aria-hidden en
 * inert: zo staan links niet dubbel in de tabvolgorde of de toegankelijkheids-
 * boom.
 *
 * Pauze bij hover en focus erbinnen (CSS), zolang een vinger het scherm raakt,
 * met de pauzeknop (WCAG 2.2.2) en zodra de rij uit beeld is. Bij
 * prefers-reduced-motion beweegt er niets: de kopieën verdwijnen via CSS en
 * je scrollt zelf, met scroll-snap.
 */
export function Marquee({
  items,
  label,
  pxPerSeconde = PX_PER_SECONDE,
  herhaal = 1,
  className,
  itemClassName,
  setClassName = "gap-5 pr-5",
  onder,
  bedieningClassName,
}: {
  items: MarqueeItem[];
  /** Wat er beweegt, bijv. "Projecten". Gebruikt in de pauzeknop. */
  label: string;
  pxPerSeconde?: number;
  /** Hoe vaak de lijst binnen één set staat. Nodig als één set anders
   *  smaller is dan het scherm (drie reviews op een breed scherm). */
  herhaal?: number;
  /** Klassen op de buitenste rand (breedte, fade). */
  className?: string;
  /** Klassen op elk item (breedte per breakpoint). */
  itemClassName?: string;
  /** Gap tussen items én dezelfde ruimte rechts van de set. */
  setClassName?: string;
  /** Inhoud links naast de pauzeknop, onder de rij. */
  onder?: ReactNode;
  /** Klassen op de rij met de pauzeknop, bijv. `container-page` als de
   *  carrousel zelf van rand tot rand loopt. */
  bedieningClassName?: string;
}) {
  const randRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLDivElement>(null);
  const [duur, setDuur] = useState<number | null>(null);
  const [knopPauze, setKnopPauze] = useState(false);
  const [aanraking, setAanraking] = useState(false);
  const [inBeeld, setInBeeld] = useState(true);

  // Duur uit de gemeten breedte van één set: zelfde tempo op elk scherm.
  useEffect(() => {
    const set = setRef.current;
    if (!set) return;
    const meet = () => setDuur(set.getBoundingClientRect().width / pxPerSeconde);
    meet();
    const ro = new ResizeObserver(meet);
    ro.observe(set);
    return () => ro.disconnect();
  }, [pxPerSeconde]);

  // Buiten beeld stilzetten: geen animatie die niemand ziet.
  useEffect(() => {
    const rand = randRef.current;
    if (!rand) return;
    const io = new IntersectionObserver(([e]) => setInBeeld(e.isIntersecting));
    io.observe(rand);
    return () => io.disconnect();
  }, []);

  const herhaald = Array.from({ length: herhaal }, (_, r) =>
    items.map((item) => ({ ...item, kopie: r > 0, sleutel: `${r}-${item.key}` }))
  ).flat();

  const set = (kopie: boolean) => (
    <div
      ref={kopie ? undefined : setRef}
      className={cn("flex shrink-0 items-stretch", setClassName, kopie && "mq-kopie")}
      {...(kopie ? verborgen : {})}
    >
      {herhaald.map((item) => (
        <div
          key={item.sleutel}
          className={cn("mq-item flex shrink-0", itemClassName, item.kopie && "mq-kopie")}
          {...(item.kopie && !kopie ? verborgen : {})}
        >
          {item.node}
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <div
        ref={randRef}
        // py-1.5: ruimte voor de focusring (2px + 2px offset) rond een kaart,
        // anders snijdt overflow-hidden hem boven en onder af.
        className={cn("mq-wrap overflow-hidden py-1.5", className)}
        data-paused={knopPauze || aanraking || !inBeeld}
        onTouchStart={() => setAanraking(true)}
        onTouchEnd={() => setAanraking(false)}
        onTouchCancel={() => setAanraking(false)}
      >
        <div
          className="mq-row flex w-max"
          style={duur ? ({ "--mq-duur": `${duur}s` } as CSSProperties) : undefined}
        >
          {set(false)}
          {set(true)}
        </div>
      </div>
      <div className={cn("mt-6 flex items-center justify-between gap-4", bedieningClassName)}>
        <div>{onder}</div>
        <PauseButton
          paused={knopPauze}
          onToggle={() => setKnopPauze((p) => !p)}
          label={label}
          size="md"
          className="shrink-0 border border-white/10 text-white/60"
        />
      </div>
    </div>
  );
}
