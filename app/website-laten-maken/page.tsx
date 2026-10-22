import type { Metadata } from "next";
import { Code2, KeyRound, Mail, PenTool, Search, Smartphone } from "lucide-react";
import { bedrag, euro } from "@/lib/content";
import { Dienstpagina, PrijsTekst } from "@/components/dienst/Dienstpagina";
import { PijlLink, PrijsTabel } from "@/components/dienst/onderdelen";

const PAD = "/website-laten-maken/";
const TITEL = "Website laten maken in Noord-Holland | DisselDesign";
const OMSCHRIJVING =
  "Website laten maken in Noord-Holland? Ik ontwerp sites voor ondernemers, vanaf € 499 excl. btw, met een vaste prijs vooraf. Plan een gratis gesprek.";

export const metadata: Metadata = {
  title: TITEL,
  description: OMSCHRIJVING,
  alternates: { canonical: PAD },
  openGraph: { title: TITEL, description: OMSCHRIJVING, type: "website", locale: "nl_NL", url: PAD },
  twitter: { title: TITEL, description: OMSCHRIJVING },
};

const voordelen = [
  {
    titel: "Ontwerp op maat",
    tekst:
      "Geen template. Ik ontwerp je site rond je bedrijf en je klanten, en rond wat die op je site moeten doen: bellen, reserveren of een aanvraag sturen. Het ontwerp zie je in Figma of als werkende versie via een link, gewoon op je eigen telefoon. Geen losse screenshots of PDF's.",
    icon: PenTool,
  },
  {
    titel: "Eerst voor de telefoon",
    tekst:
      "De meeste bezoekers komen binnen op hun telefoon, dus daar begin ik. Daarna test ik de site op tablet en desktop.",
    icon: Smartphone,
  },
  {
    titel: "Ontworpen én gebouwd",
    tekst:
      "Ik ontwerp je site en bouw hem zelf, en zet hem daarna live. Jij hebt één aanspreekpunt, van de eerste schets tot de oplevering.",
    icon: Code2,
  },
  {
    titel: "Vindbaar in Google",
    tekst:
      "Nette paginatitels en beschrijvingen, een sitemap, en je site aangemeld bij Google Search Console. Dat zit standaard in elk pakket.",
    icon: Search,
  },
  {
    titel: "Een formulier dat binnenkomt",
    tekst:
      "Aanvragen komen direct in je mailbox. Met Google Analytics en een cookiebanner zie je hoeveel bezoekers je hebt en waar ze vandaan komen.",
    icon: Mail,
  },
  {
    titel: "Van jou",
    tekst:
      "Na de oplevering is alles van jou: ontwerp, code, domein en content. Je domein staat op je eigen naam. Wil je ooit naar een andere partij, dan krijg je alles mee.",
    icon: KeyRound,
  },
];

/** De drie cases uit de informatiestructuur, met een eigen zin per case. */
const werk: { slug: string; tekst: string }[] = [
  {
    slug: "kleintjes-van-alkmaar",
    tekst:
      "Van een idee zonder naam naar een merk en een oppasplatform met twee kanten: huisstijl, UX en alle schermen voor ouders en oppassers.",
  },
  {
    slug: "de-stock",
    tekst:
      "Van alleen een logo naar een complete huisstijl en website, gebouwd rond één stap: bedrijven die hun restvoorraad aanbieden.",
  },
  {
    slug: "marktzicht",
    tekst:
      "Een restaurantsite opnieuw ontworpen vanaf de telefoon, met reserveren overal binnen handbereik en een beheerscherm om zelf de kaart bij te werken.",
  },
];

const stappen = [
  {
    titel: "Gesprek",
    tekst: "20 minuten, gratis. Online of, als het uitkomt, op de koffie. Je vertelt wat je wilt bereiken.",
  },
  { titel: "Voorstel", tekst: "Wat ik maak, wanneer het af is en wat het kost. Een vaste prijs." },
  {
    titel: "Ontwerp en bouwen",
    tekst:
      "Eerst het ontwerp, in Figma of via een link die je op je telefoon opent. Daarna de site. Na allebei geef je feedback, voordat we verder gaan.",
  },
  {
    titel: "Live",
    tekst:
      "Ik zet de site live en meld hem aan bij Google. Daarna kun je onderhoud en hosting bij mij afnemen.",
  },
];

const vragen = [
  {
    vraag: "Hoe lang duurt het om een website te laten maken?",
    antwoord:
      "Een landingspagina is meestal binnen een week klaar. Een complete website duurt twee tot vier weken, afhankelijk van de omvang. De planning spreken we vooraf samen af.",
  },
  {
    vraag: "Moet ik zelf teksten en foto's aanleveren?",
    antwoord:
      "Ja. De teksten en foto's lever jij aan. Ik denk mee over wat er op elke pagina moet staan en hoe lang het moet zijn, zodat je weet wat je moet schrijven.",
  },
  {
    vraag: "Kan ik de site daarna zelf aanpassen?",
    antwoord:
      "Ja, als er een CMS bij komt. Daarmee wijzig je zelf teksten en foto's, zoals Marktzicht zelf de menukaart bijhoudt. Een CMS zit niet standaard in een pakket; wat het kost, staat in het voorstel.",
  },
  {
    vraag: "Wie regelt hosting en het domein?",
    antwoord:
      "Ik registreer je domeinnaam op jouw naam; de kosten betaal jij. Hosting, updates, back-ups en kleine aanpassingen kun je bij mij afnemen in één onderhoudspakket. Wat dat kost, hangt af van wat er nodig is.",
  },
  {
    vraag: "Werk je alleen in Noord-Holland?",
    antwoord:
      "Nee. Ik zit in Heiloo en werk veel voor ondernemers in de regio Alkmaar, maar het gesprek kan ook online. Opdrachtgevers van buiten Noord-Holland zijn welkom.",
  },
];

/** Dienstpagina "website laten maken". Teksten: docs/stap-3a-teksten.md. */
export default function WebsiteLatenMaken() {
  return (
    <Dienstpagina
      inhoud={{
        pad: PAD,
        naam: "Website laten maken",
        h1: "Website laten maken in Noord-Holland",
        intro: [
          "Je hebt een bedrijf, maar online is het nog niet goed geregeld. Misschien heb je nog geen site, of een site die je klanten liever niet laat zien. Je zoekt iemand die het in één keer goed neerzet, zonder dat je zelf alles over techniek hoeft te weten.",
          "Ik ben Tim Disseldorp, Digitale Product Designer uit Heiloo. Ik ontwerp websites voor ondernemers in Noord-Holland en daarbuiten, van de eerste schets tot de site live staat. Je weet vooraf wat het kost en wanneer hij af is.",
        ],
        // Voorlopige foto (bento). Vervangen door
        // public/diensten/website-laten-maken.webp, zie docs/beelden.md.
        beeld: { src: "/bento/focus.webp", alt: "Tim Disseldorp aan het werk achter zijn scherm", breedte: 1200, hoogte: 900 },
        tweedeKnop: { label: "Bekijk de prijzen", href: "#prijzen" },
        voordelen: { kicker: "Wat je krijgt", kop: "Wat er in je website zit.", items: voordelen },
        werk: { kop: "Websites die ik eerder maakte.", cases: werk },
        past: {
          wel: [
            "Je bent ondernemer of starter en wilt een website die laat zien wat je doet.",
            "Je wilt huisstijl en website bij één persoon onderbrengen.",
            "Je wilt direct praten met de persoon die je site ontwerpt.",
            "Je wilt binnen een paar weken live staan.",
          ],
          niet: [
            "Je zoekt een groot bureau met een team en een vaste accountmanager.",
            "Je zoekt iemand die je Google Ads of social-advertenties beheert.",
            "Je wilt een garantie op een plek bovenaan in Google. Die geeft niemand eerlijk, en ik ook niet.",
          ],
        },
        stappen: { kop: "Zo werkt het.", items: stappen, link: { label: "Lees hoe ik werk", href: "/over-mij/#werkwijze" } },
        prijzen: {
          kop: "Wat kost een website laten maken?",
          inhoud: (
            <>
              <PrijsTabel
                rijen={[
                  { pakket: "Landingspagina of compacte site", prijs: euro(bedrag.compact) },
                  { pakket: "Website, tot 8 pagina's, rond je bestaande logo", prijs: euro(bedrag.zonderHuisstijl) },
                  { pakket: "Website + nieuwe huisstijl", prijs: euro(bedrag.metHuisstijl) },
                ]}
              />
              <PrijsTekst>
                Wat jouw site precies kost, hangt af van het aantal pagina&apos;s, of er een nieuwe huisstijl bij
                komt en of je zelf teksten wilt kunnen aanpassen. Na het gesprek krijg je een voorstel met een
                vaste prijs.
              </PrijsTekst>
              <p className="mt-4">
                <PijlLink href="/website-laten-maken/wat-kost-een-website/">
                  Wat kost een website? Zo is de prijs opgebouwd
                </PijlLink>
              </p>
            </>
          ),
        },
        vragen,
        cta: {
          kop: "Zelf een website laten maken?",
          tekst:
            "Vertel kort wat je wilt. Dan plannen we een gratis gesprek van 20 minuten, en daarna krijg je een voorstel met een vaste prijs.",
        },
        schema: {
          omschrijving:
            "Websites op maat voor ondernemers in Noord-Holland: ontwerp, bouw en livegang door Tim Disseldorp, met een vaste prijs vooraf.",
          vanaf: bedrag.compact,
        },
      }}
    />
  );
}
