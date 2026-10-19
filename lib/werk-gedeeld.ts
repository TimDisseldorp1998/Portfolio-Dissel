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

const MAANDEN = ["JAN", "FEB", "MRT", "APR", "MEI", "JUN", "JUL", "AUG", "SEP", "OKT", "NOV", "DEC"];

/** "2024-06" → "JUN 2024", "2024" → "2024". */
export function datumLabel(datum: string): string {
  const [jaar, maand] = datum.split("-");
  return maand ? `${MAANDEN[Number(maand) - 1]} ${jaar}` : jaar;
}
