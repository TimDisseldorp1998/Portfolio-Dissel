import { bedrag, euro } from "./content";

/**
 * De kennisartikelen: antwoorden op de vragen die klanten Tim het vaakst
 * stellen voordat ze een website laten maken. Eén lijst voor /kennis/, het
 * blok "Meer vragen" onder elk artikel en op /website-laten-maken/, en
 * llms.txt. Teksten: docs/stap-4-kennis-teksten.md.
 *
 * Een nieuw artikel: een pagina onder de dienst (app/[dienst]/[artikel]/)
 * en een regel hier.
 */
export type KennisArtikel = {
  pad: string;
  /** De vraag zoals de klant hem stelt; ook de H1. */
  vraag: string;
  /** Eén zin uit het korte antwoord, voor de kaart op /kennis/. */
  kort: string;
  /** Publicatiedatum, JJJJ-MM-DD. */
  datum: string;
};

export const kennisArtikelen: KennisArtikel[] = [
  {
    pad: "/website-laten-maken/wat-kost-een-website/",
    vraag: "Wat kost een website?",
    kort: `Een landingspagina kost vanaf ${euro(bedrag.compact)}, een website met meerdere pagina's vanaf ${euro(bedrag.zonderHuisstijl)}, excl. btw.`,
    datum: "2026-10-22",
  },
  {
    pad: "/website-laten-maken/hoe-snel-staat-mijn-website-live/",
    vraag: "Hoe snel staat mijn website live?",
    kort: "Een landingspagina meestal binnen een week, een complete website in twee tot vier weken.",
    datum: "2026-10-24",
  },
  {
    pad: "/website-laten-maken/website-zelf-aanpassen/",
    vraag: "Kan ik mijn website straks zelf aanpassen?",
    kort: "Ja, met een CMS pas je zelf teksten en foto's aan, zonder iets van code te weten.",
    datum: "2026-10-24",
  },
  {
    pad: "/website-laten-maken/hosting-en-onderhoud/",
    vraag: "Verzorg je ook hosting en onderhoud?",
    kort: "Ja, in één onderhoudspakket: hosting, updates, back-ups, monitoring, support en kleine aanpassingen.",
    datum: "2026-10-24",
  },
  {
    pad: "/website-laten-maken/van-wie-is-de-website/",
    vraag: "Van wie is de website na oplevering?",
    kort: "Van jou: het ontwerp, de code, de domeinnaam en de content.",
    datum: "2026-10-24",
  },
];
