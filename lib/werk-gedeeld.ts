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

/** Soort tag op de casekaart. Bepaalt de kleur, overal op de site gelijk. */
export type TagSoort = "research" | "design" | "development" | "branding";

/** Randkleur per soort, uit het merkpalet. Allemaal minstens 3:1 tegen de
 *  donkere achtergrond (#0a0a0f): groen 12,1:1, cyaan 12,5:1, paars 4,5:1,
 *  oranje 8,1:1. De tags staan onderin het beeldvlak op een donkere gradient,
 *  dus ook op een lichte kaartkleur blijft het contrast boven 3:1. */
export const TAG_KLEUR: Record<TagSoort, string> = {
  research: "#3ee68b",
  design: "#5cddff",
  development: "#7c5cff",
  branding: "#ff833d",
};

/** De grote kaart op home (components/werk/CaseKaart.tsx). */
export type CaseKaartData = {
  /** Eén zin over wat de case opleverde. Het grootste tekstelement. */
  kop: string;
  subtitel?: string;
  tags: { label: string; soort: TagSoort }[];
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
