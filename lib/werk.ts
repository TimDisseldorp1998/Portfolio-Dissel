import fs from "node:fs";
import path from "node:path";
import type { ComponentType } from "react";

/**
 * Cases uit content/werk/*.mdx. Een nieuwe case is alleen een nieuw .mdx-
 * bestand in die map: /werk/, de casepagina, de homepage, de footer en de
 * sitemap lezen de map zelf uit.
 *
 * Alleen voor servercode (leest het bestandssysteem tijdens de build).
 */

/** "opdracht" = eigen klus als DisselDesign; "in-dienst" = gemaakt in
 *  loondienst; "concept" = geen echte opdracht. */
export type CaseLabel =
  | "opdracht"
  | "concept"
  | { type: "in-dienst"; werkgever: string };

/** Diensten zoals ze in fase 2 een eigen pagina krijgen. De sleutel wordt dan
 *  de URL; nu staat alleen de naam als tekst op de casepagina. */
export const DIENSTEN = {
  "website-laten-maken": "Website laten maken",
  "huisstijl-laten-maken": "Huisstijl laten maken",
  "ux-ui-design": "UX/UI design",
  "website-verbeteren": "Website verbeteren",
  "voor-bureaus": "Voor bureaus",
} as const;

export type Dienst = keyof typeof DIENSTEN;

export type CaseMeta = {
  slug: string;
  klant: string;
  /** Kortere naam voor de footer, als de volledige naam te lang is. */
  korteNaam?: string;
  volgorde: number;
  /** Max. 60 tekens, inclusief " | DisselDesign". */
  seoTitel: string;
  /** Max. 120 tekens. Kaart op home en /werk/, en de meta-description. */
  kaarttekst: string;
  /** Verplicht veld. `null` = nog in te vullen (TODO), dan staat er geen label. */
  label: CaseLabel | null;
  rol: string;
  /** `null` = nog te bevestigen, dan wordt het jaar niet getoond. */
  jaar: string | null;
  type: string;
  tags: string[];
  liveUrl: string | null;
  kaartbeeld: string;
  diensten: Dienst[];
  /** Tekst bij "Zelf zoiets?" onderaan de case. */
  cta: string;
};

export type Case = CaseMeta & { Inhoud: ComponentType };

const MAP = path.join(process.cwd(), "content", "werk");
const MAX_TITEL = 60;
const MAX_KAARTTEKST = 120;

const VERPLICHT: (keyof CaseMeta)[] = [
  "slug", "klant", "volgorde", "seoTitel", "kaarttekst", "label", "rol",
  "jaar", "type", "tags", "liveUrl", "kaartbeeld", "diensten", "cta",
];

/** Faalt de build hard bij een fout in een casebestand, zodat een kapotte of
 *  half ingevulde case nooit stil online komt. */
function controleer(bestand: string, meta: unknown): CaseMeta {
  const fout = (msg: string): never => {
    throw new Error(`content/werk/${bestand}.mdx: ${msg}`);
  };
  if (!meta || typeof meta !== "object") fout("geen `export const meta`");
  const m = meta as CaseMeta;
  for (const veld of VERPLICHT) {
    if (!(veld in m)) fout(`verplicht veld "${veld}" ontbreekt`);
  }
  if (m.slug !== bestand) fout(`slug "${m.slug}" moet gelijk zijn aan de bestandsnaam`);
  if (m.seoTitel.length > MAX_TITEL)
    fout(`seoTitel is ${m.seoTitel.length} tekens, max. ${MAX_TITEL}`);
  if (m.kaarttekst.length > MAX_KAARTTEKST)
    fout(`kaarttekst is ${m.kaarttekst.length} tekens, max. ${MAX_KAARTTEKST}`);
  for (const d of m.diensten) {
    if (!(d in DIENSTEN)) fout(`onbekende dienst "${d}"`);
  }
  if (!fs.existsSync(path.join(process.cwd(), "public", m.kaartbeeld)))
    fout(`kaartbeeld ${m.kaartbeeld} bestaat niet in public/`);
  return m;
}

async function laad(bestand: string): Promise<Case> {
  // Een import met een variabel stuk maakt webpack een bundel van alle .mdx
  // in deze map. Zo is er geen lijst om bij te werken bij een nieuwe case.
  const mod = await import(`../content/werk/${bestand}.mdx`);
  return { ...controleer(bestand, mod.meta), Inhoud: mod.default };
}

let cache: Promise<Case[]> | null = null;

/** Alle cases, gesorteerd op `volgorde`. */
export function alleCases(): Promise<Case[]> {
  if (!cache) {
    const bestanden = fs
      .readdirSync(MAP)
      .filter((f) => f.endsWith(".mdx"))
      .map((f) => f.replace(/\.mdx$/, ""));
    cache = Promise.all(bestanden.map(laad)).then((cases) => {
      const volgordes = new Set(cases.map((c) => c.volgorde));
      if (volgordes.size !== cases.length)
        throw new Error("content/werk: twee cases hebben dezelfde `volgorde`");
      return cases.sort((a, b) => a.volgorde - b.volgorde);
    });
  }
  return cache;
}

export async function vindCase(slug: string): Promise<Case | undefined> {
  return (await alleCases()).find((c) => c.slug === slug);
}

/** De case na deze, en na de laatste weer de eerste. */
export async function volgendeCase(slug: string): Promise<Case> {
  const cases = await alleCases();
  const i = cases.findIndex((c) => c.slug === slug);
  return cases[(i + 1) % cases.length];
}

export function labelTekst(label: CaseLabel): string {
  if (label === "opdracht") return "Opdracht";
  if (label === "concept") return "Concept";
  return `In dienst bij ${label.werkgever}`;
}
