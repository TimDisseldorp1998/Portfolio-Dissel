import type { CSSProperties } from "react";

/**
 * Case-types en -helpers die ook in de browser mogen (client components).
 * Alles wat het bestandssysteem leest, staat in lib/werk.ts; dat bestand
 * exporteert deze dingen opnieuw, dus servercode kan ze daar ook halen.
 */

/** "opdracht" = eigen klus als DisselDesign; "in-dienst" = gemaakt in
 *  loondienst; "concept" = geen echte opdracht. */
export type CaseLabel =
  | "opdracht"
  | "concept"
  | { type: "in-dienst"; werkgever: string };

/** De grote kaart op home (components/werk/CaseKaart.tsx). */
export type CaseKaartData = {
  /** Eén zin over wat de case opleverde. Het grootste tekstelement. */
  kop: string;
  subtitel?: string;
  /** Achtergrond achter het beeld (kaart en hero), zichtbaar tijdens het
   *  laden en rond een transparante mockup. */
  kleur: string;
  /** Device-mockup, WebP met transparante achtergrond, min. 1600px breed.
   *  Staat op de kaart én in de hero van de case. Ontbreekt het bestand,
   *  dan tonen beide het gewone kaartbeeld. */
  beeld?: { src: string; alt: string };
};

/** Waar het onderwerp in een foto staat, als fractie van de breedte en
 *  hoogte (0 = links/boven, 1 = rechts/onder). `y` standaard 0,5.
 *  `inzoomen: false` voor een schermontwerp: dan blijft het hele beeld in
 *  de breedte staan en schuift het alleen zo ver als kan. */
export type BeeldFocus = { x: number; y?: number; inzoomen?: boolean };

/**
 * Plaatst een foto zo dat het focuspunt in het midden van het element staat,
 * bij elke verhouding: dezelfde foto staat staand op de kaart en breed in de
 * hero. Het beeld krijgt een eigen maat en positie (in plaats van
 * object-fit), want in een breed element moet het soms iets inzoomen om het
 * punt in het midden te krijgen. Het vult het element altijd helemaal.
 *
 * Rekent met containereenheden (cqw/cqh), dus de directe ouder van het beeld
 * moet `container-type: size` en `overflow: hidden` hebben. Zonder focus:
 * undefined, dan geldt gewoon object-cover.
 */
export function focusStijl(focus: BeeldFocus | undefined, verhouding: number): CSSProperties | undefined {
  if (!focus) return undefined;
  const fy = focus.y ?? 0.5;
  // Hoeveel breder dan het element het beeld minstens moet zijn om het punt
  // in het midden te krijgen zonder lege rand.
  const zoom = (0.5 / Math.min(focus.x, 1 - focus.x)).toFixed(4);
  const ar = verhouding.toFixed(4);
  const breed = focus.inzoomen === false
    ? `max(100cqw, 100cqh * ${ar})`
    : `max(100cqw, 100cqh * ${ar}, 100cqw * ${zoom})`;
  const hoog = `calc(${breed} / ${ar})`;
  return {
    position: "absolute",
    width: breed,
    height: hoog,
    maxWidth: "none",
    right: "auto",
    bottom: "auto",
    left: `clamp(100cqw - ${breed}, 50cqw - ${breed} * ${focus.x}, 0px)`,
    top: `clamp(100cqh - ${hoog}, 50cqh - ${hoog} * ${fy}, 0px)`,
  };
}

const MAANDEN = ["JAN", "FEB", "MRT", "APR", "MEI", "JUN", "JUL", "AUG", "SEP", "OKT", "NOV", "DEC"];

/** "2024-06" → "JUN 2024", "2024" → "2024". */
export function datumLabel(datum: string): string {
  const [jaar, maand] = datum.split("-");
  return maand ? `${MAANDEN[Number(maand) - 1]} ${jaar}` : jaar;
}
