import type { Metadata } from "next";
import { Code2, Layers, LayoutTemplate, MapPin, Search, Users } from "lucide-react";
import { Dienstpagina, PrijsTekst } from "@/components/dienst/Dienstpagina";

const PAD = "/voor-bureaus/";
const TITEL = "Freelance UX/UI designer voor bureaus | DisselDesign";
const OMSCHRIJVING =
  "Freelance UX/UI designer voor bureaus en digitale teams. Ervaring bij ShopCommerce en Touch Creative. Remote of op locatie. Plan een gesprek.";

export const metadata: Metadata = {
  title: TITEL,
  description: OMSCHRIJVING,
  alternates: { canonical: PAD },
  openGraph: { title: TITEL, description: OMSCHRIJVING, type: "website", locale: "nl_NL", url: PAD },
  twitter: { title: TITEL, description: OMSCHRIJVING },
};

const vragen = [
  {
    vraag: "Werk je remote of op locatie?",
    antwoord:
      "Allebei. Ik werk remote, en kom ook op locatie als dat beter werkt, bijvoorbeeld voor een kick-off of een workshop met de klant.",
  },
  {
    vraag: "Hoeveel uur per week ben je beschikbaar?",
    antwoord:
      "Dat bespreken we per project. Vertel wat er speelt en wanneer het moet starten, dan hoor je meteen of en hoeveel ik kan.",
  },
  {
    vraag: "Hoe spreken we de prijs af?",
    antwoord: "Per opdracht. Na het gesprek krijg je een voorstel, zodat je vooraf weet waar je aan toe bent.",
  },
];

/** Pagina voor bureaus en digitale teams die een freelance UX/UI designer zoeken. */
export default function VoorBureaus() {
  return (
    <Dienstpagina
      inhoud={{
        pad: PAD,
        naam: "Voor bureaus",
        h1: "Freelance UX/UI designer voor je bureau of team",
        intro: [
          "Je hebt een project dat loopt, of er komt er een aan, en je team mist een designer. Of je zoekt iemand die naast je developers het ontwerp oppakt.",
          "Ik werk sinds 2023 als UX/UI designer bij bureaus: eerst bij Touch Creative in Amsterdam, nu bij ShopCommerce in Alkmaar. Ik ken de manier van werken, van briefing tot overdracht aan development.",
        ],
        // Voorlopige foto (bento), zie docs/beelden.md.
        beeld: { src: "/bento/werkplek.webp", alt: "De werkplek van Tim Disseldorp", breedte: 1200, hoogte: 900 },
        tweedeKnop: { label: "Bekijk het werk", href: "#werk" },
        voordelen: {
          kicker: "Wat ik doe",
          kop: "Waar ik je team mee help.",
          items: [
            {
              titel: "UX-onderzoek",
              tekst: "Gebruikersgesprekken, Hotjar en data om keuzes te onderbouwen richting je klant.",
              icon: Search,
            },
            {
              titel: "Wireframes en UI",
              tekst: "Van flows en wireframes tot het uitgewerkte ontwerp in Figma, voor telefoon, tablet en desktop.",
              icon: LayoutTemplate,
            },
            {
              titel: "Design systemen",
              tekst: "Componenten, staten en tokens vastgelegd, zodat het team er zelf mee verder kan.",
              icon: Layers,
            },
            {
              titel: "Overdracht aan development",
              tekst: "Ontwerpen en een styleguide waar je developers direct mee bouwen. Ik bouw ook zelf frontend in Next.js en React.",
              icon: Code2,
            },
            {
              titel: "Onderdeel van je team",
              tekst: "Ik werk in jullie tools en sluit aan bij stand-ups, reviews en overleggen met de klant.",
              icon: Users,
            },
            {
              titel: "Remote of op locatie",
              tekst: "Ik werk remote, en kom langs als dat beter werkt, bijvoorbeeld voor een kick-off of workshop.",
              icon: MapPin,
            },
          ],
        },
        werk: {
          kop: "Werk dat ik bij een bureau maakte.",
          cases: [
            {
              slug: "ziggo-dome",
              tekst:
                "Mobile-first herontwerp van de Ziggo Dome-site: de agenda vooraan en de belangrijkste acties onder je duim. Gemaakt in dienst bij Touch Creative.",
            },
            {
              slug: "new-edition",
              tekst:
                "Een B2B-website met een directe route naar de Order Portal, met gebruikersonderzoek, wireframes en een styleguide. Gemaakt in dienst bij Touch Creative.",
            },
          ],
        },
        stappen: {
          kop: "Zo werkt het.",
          items: [
            {
              titel: "Gesprek",
              tekst: "20 minuten, gratis. Je vertelt over het project, de planning en wat je van een designer nodig hebt.",
            },
            {
              titel: "Afspraken",
              tekst: "We spreken af wat ik doe, wanneer ik beschikbaar ben en wat het kost.",
            },
            {
              titel: "Aan de slag",
              tekst: "Ik sluit aan bij je team, remote of op locatie, en werk in jullie tools en ritme.",
            },
            {
              titel: "Overdracht",
              tekst: "Je krijgt de ontwerpen, het design systeem en een styleguide, zodat het team zelf verder kan.",
            },
          ],
        },
        prijzen: {
          kop: "Wat kost een freelance UX/UI designer?",
          inhoud: (
            <PrijsTekst>
              Dat spreken we per opdracht af, afhankelijk van de omvang en de planning. Na het gesprek krijg je een
              voorstel, zodat je vooraf weet waar je aan toe bent.
            </PrijsTekst>
          ),
        },
        vragen,
        cta: {
          kop: "Een designer nodig voor je team?",
          tekst: "Vertel kort over het project en de planning. Dan plannen we een gesprek van 20 minuten.",
        },
        schema: {
          omschrijving:
            "Freelance UX/UI designer voor bureaus en digitale teams: onderzoek, wireframes, UI-ontwerp, design systemen en overdracht aan development. Remote of op locatie.",
        },
      }}
    />
  );
}
