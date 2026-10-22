import type { Metadata } from "next";
import { FileText, Mail, Palette, PenTool, Printer, Share2 } from "lucide-react";
import { bedrag, euro } from "@/lib/content";
import { Dienstpagina, PrijsTekst } from "@/components/dienst/Dienstpagina";
import { PrijsTabel } from "@/components/dienst/onderdelen";

const PAD = "/huisstijl-laten-maken/";
const TITEL = "Huisstijl laten maken in Noord-Holland | DisselDesign";
const OMSCHRIJVING =
  "Huisstijl of logo laten maken? Logo, kleuren, lettertypen en een stijlgids, vanaf € 349 excl. btw. Ook samen met je website. Plan een gratis gesprek.";

export const metadata: Metadata = {
  title: TITEL,
  description: OMSCHRIJVING,
  alternates: { canonical: PAD },
  openGraph: { title: TITEL, description: OMSCHRIJVING, type: "website", locale: "nl_NL", url: PAD },
  twitter: { title: TITEL, description: OMSCHRIJVING },
};

const vragen = [
  {
    vraag: "Wat is het verschil tussen een logo en een huisstijl?",
    antwoord:
      "Een logo is het teken van je bedrijf. Een huisstijl is alles eromheen: kleuren, lettertypen en de afspraken over hoe je ze gebruikt. Daardoor ziet je bedrijf er op je site, je socials en je drukwerk hetzelfde uit.",
  },
  {
    vraag: "Wat krijg ik voor € 349?",
    antwoord:
      "Een logo met varianten voor licht en donker en voor klein formaat, je kleuren en lettertypen, en een stijlgids waarin alles is vastgelegd. Social-templates, drukwerk en een e-mailhandtekening kunnen erbij; die staan dan apart in het voorstel.",
  },
  {
    vraag: "Kan ik huisstijl en website samen laten maken?",
    antwoord: `Ja. Dan maak ik eerst de huisstijl en ontwerp ik de site daarmee. Een website met nieuwe huisstijl kost vanaf ${euro(bedrag.metHuisstijl)} excl. btw, dat is ${euro(bedrag.zonderHuisstijl + bedrag.huisstijlLos - bedrag.metHuisstijl)} voordeliger dan los.`,
  },
  {
    vraag: "Is het logo daarna van mij?",
    antwoord:
      "Ja. Na de oplevering is alles van jou: het logo, de bestanden en de stijlgids. Je mag ze gebruiken waar en zo vaak als je wilt.",
  },
];

/** Dienstpagina "huisstijl laten maken". */
export default function HuisstijlLatenMaken() {
  return (
    <Dienstpagina
      inhoud={{
        pad: PAD,
        naam: "Huisstijl laten maken",
        h1: "Huisstijl laten maken",
        intro: [
          "Een logo heb je misschien al, of nog helemaal niet. Maar zonder vaste kleuren, lettertypen en afspraken ziet je bedrijf er op je site, je socials en je visitekaartje steeds anders uit.",
          "Ik ontwerp een huisstijl die je overal gebruikt, en leg hem vast in een stijlgids. Zo blijft alles herkenbaar, ook als iemand anders er later mee werkt.",
        ],
        beeld: {
          // Uitsnede van public/mockup/KvA-mockup-screens-styleguide-slider4.webp,
          // zonder de donkere rand, zodat het board zelf groot staat.
          src: "/diensten/huisstijl-brandboard.webp",
          alt: "Het brandboard van Kleintjes van Alkmaar met kleursysteem, typografie en logoregels",
          breedte: 2072,
          hoogte: 1944,
          groot: true,
        },
        tweedeKnop: { label: "Bekijk de prijzen", href: "#prijzen" },
        voordelen: {
          kicker: "Wat je krijgt",
          kop: "Wat er in je huisstijl zit.",
          items: [
            {
              titel: "Logo en varianten",
              tekst: "Je logo, met versies voor een lichte en een donkere achtergrond en een klein formaat voor je socials en browsertab.",
              icon: PenTool,
            },
            {
              titel: "Kleuren en lettertypen",
              tekst: "Een vast kleurenpalet en lettertypen voor koppen en tekst, gekozen zodat ze op scherm en op papier goed leesbaar zijn.",
              icon: Palette,
            },
            {
              titel: "Een stijlgids",
              tekst: "Alles vastgelegd in één document, dat je aan je drukker of socialmediabeheerder kunt geven.",
              icon: FileText,
            },
            {
              titel: "Social-templates",
              tekst: "Sjablonen voor je posts, zodat elke post meteen in je huisstijl staat. Op aanvraag.",
              icon: Share2,
            },
            {
              titel: "Drukwerk",
              tekst: "Een visitekaartje, briefpapier of een menukaart in je nieuwe huisstijl. Op aanvraag.",
              icon: Printer,
            },
            {
              titel: "E-mailhandtekening",
              tekst: "Een nette handtekening onder je mails, met logo en contactgegevens. Op aanvraag.",
              icon: Mail,
            },
          ],
        },
        werk: {
          kop: "Huisstijlen die ik eerder maakte.",
          cases: [
            {
              slug: "kleintjes-van-alkmaar",
              tekst:
                "Van een idee zonder naam naar een merk: typografie, kleuren en knoppen, met een eigen kleur voor ouders en voor oppassers.",
            },
            {
              slug: "de-stock",
              tekst: "Van één logo naar een volledige huisstijl: kleur, typografie, knoppen en de hele look.",
            },
            {
              slug: "16-08-streetwear",
              tekst:
                "Een merkidentiteit vastgelegd in een huisstijlhandboek: logo, kleurgebruik, typografie, iconen en web-elementen.",
            },
          ],
        },
        past: {
          wel: [
            "Je start een bedrijf en wilt er vanaf dag één verzorgd uitzien.",
            "Je hebt een logo, maar geen vaste kleuren of lettertypen.",
            "Je wilt huisstijl en website in één traject laten maken.",
          ],
          niet: [
            "Je zoekt een reclamebureau dat ook campagnes, fotografie en video maakt.",
            "Je wilt alleen een snelle aanpassing aan een bestaand logo.",
          ],
        },
        stappen: {
          kop: "Zo werkt het.",
          items: [
            {
              titel: "Gesprek",
              tekst: "20 minuten, gratis. Online of, als het uitkomt, op de koffie. Je vertelt wat je bedrijf doet en voor wie.",
            },
            { titel: "Voorstel", tekst: "Wat ik maak, wanneer het af is en wat het kost. Een vaste prijs." },
            {
              titel: "Ontwerp",
              tekst: "Ik ontwerp het logo en de huisstijl en laat ze zien. Jij geeft feedback voordat ik alles vastleg.",
            },
            {
              titel: "Oplevering",
              tekst: "Je krijgt de bestanden en de stijlgids. Daarmee kun je meteen aan de slag, of maken we samen je website.",
            },
          ],
        },
        prijzen: {
          kop: "Wat kost een huisstijl laten maken?",
          inhoud: (
            <>
              <PrijsTabel
                rijen={[
                  { pakket: "Huisstijl: logo, kleuren, lettertypen en stijlgids", prijs: euro(bedrag.huisstijlLos) },
                  { pakket: "Website + nieuwe huisstijl", prijs: euro(bedrag.metHuisstijl) },
                ]}
              />
              <PrijsTekst>
                Social-templates, drukwerk en een e-mailhandtekening komen er op aanvraag bij en staan apart in het
                voorstel. Na het gesprek krijg je een voorstel met een vaste prijs.
              </PrijsTekst>
            </>
          ),
        },
        vragen,
        cta: {
          kop: "Een huisstijl laten maken?",
          tekst: "Vertel kort over je bedrijf. Dan plannen we een gratis gesprek van 20 minuten, en daarna krijg je een voorstel met een vaste prijs.",
        },
        schema: {
          omschrijving:
            "Huisstijl en logo laten maken: logo met varianten, kleuren, lettertypen en een stijlgids, door Tim Disseldorp in Heiloo.",
          vanaf: bedrag.huisstijlLos,
        },
      }}
    />
  );
}
