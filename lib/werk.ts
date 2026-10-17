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

/** Een beeld in de carousel bovenaan de casepagina. */
export type Slide = { src: string; alt: string; label: string };

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
  /** Beelden voor de carousel, in volgorde. Leeg = alleen het kaartbeeld. */
  slides: Slide[];
  diensten: Dienst[];
  /** Tekst bij "Zelf zoiets?" onderaan de case. */
  cta: string;
};

export type Case = CaseMeta & {
  Inhoud: ComponentType;
  /** srcset voor het kaartbeeld: de 640px-variant plus het origineel. */
  kaartSrcSet: string;
};

/** Breedte van een JPEG uit de SOF-header, zonder extra library. */
function jpegBreedte(bestand: string): number {
  const b = fs.readFileSync(bestand);
  let i = 2;
  while (i < b.length) {
    const marker = b[i + 1];
    const lengte = b.readUInt16BE(i + 2);
    // SOF0-SOF15, behalve DHT (C4), JPG (C8) en DAC (CC)
    if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
      return b.readUInt16BE(i + 7);
    }
    i += 2 + lengte;
  }
  throw new Error(`${bestand}: geen JPEG-breedte gevonden`);
}

/**
 * Elk kaartbeeld heeft een kleinere variant naast zich: `naam-640.jpg`. Die
 * maak je met: sips -Z 640 -s format jpeg -s formatOptions 78 naam.jpg --out naam-640.jpg
 */
function kaartSrcSet(kaartbeeld: string): string {
  const klein = kaartbeeld.replace(/\.jpg$/, "-640.jpg");
  const pub = (src: string) => path.join(process.cwd(), "public", src);
  if (!fs.existsSync(pub(klein)))
    throw new Error(`${klein} ontbreekt. Maak hem met sips (zie lib/werk.ts).`);
  return `${klein} 640w, ${kaartbeeld} ${jpegBreedte(pub(kaartbeeld))}w`;
}

const MAP = path.join(process.cwd(), "content", "werk");
const MAX_TITEL = 60;
const MAX_KAARTTEKST = 120;

const VERPLICHT: (keyof CaseMeta)[] = [
  "slug", "klant", "volgorde", "seoTitel", "kaarttekst", "label", "rol",
  "jaar", "type", "tags", "liveUrl", "kaartbeeld", "slides", "diensten", "cta",
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
  // Hoofdletters tellen: de server van Hostinger is hoofdlettergevoelig, de
  // Mac niet. existsSync op de Mac zou "Iconen" en "iconen" allebei goedkeuren.
  const bestaat = (src: string) => {
    const vol = path.join(process.cwd(), "public", src);
    return fs.existsSync(vol) && fs.readdirSync(path.dirname(vol)).includes(path.basename(vol));
  };
  if (!bestaat(m.kaartbeeld)) fout(`kaartbeeld ${m.kaartbeeld} bestaat niet in public/`);
  for (const slide of m.slides) {
    if (!bestaat(slide.src)) fout(`slide ${slide.src} bestaat niet in public/`);
    if (!slide.alt) fout(`slide ${slide.src} heeft geen alt-tekst`);
  }
  return m;
}

async function laad(bestand: string): Promise<Case> {
  // Een import met een variabel stuk maakt webpack een bundel van alle .mdx
  // in deze map. Zo is er geen lijst om bij te werken bij een nieuwe case.
  const mod = await import(`../content/werk/${bestand}.mdx`);
  const meta = controleer(bestand, mod.meta);
  return { ...meta, Inhoud: mod.default, kaartSrcSet: kaartSrcSet(meta.kaartbeeld) };
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

/** De case voor deze, en voor de eerste weer de laatste. */
export async function vorigeCase(slug: string): Promise<Case> {
  const cases = await alleCases();
  const i = cases.findIndex((c) => c.slug === slug);
  return cases[(i - 1 + cases.length) % cases.length];
}

/** Wat de carousel toont: de slides, of het kaartbeeld als er nog geen zijn. */
export function carouselSlides(c: CaseMeta): Slide[] {
  if (c.slides.length > 0) return c.slides;
  return [{ src: c.kaartbeeld, alt: "", label: c.klant }];
}

export function labelTekst(label: CaseLabel): string {
  if (label === "opdracht") return "Opdracht";
  if (label === "concept") return "Concept";
  return `In dienst bij ${label.werkgever}`;
}
