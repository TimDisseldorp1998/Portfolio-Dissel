import type { Metadata } from "next";
import { Code2, Layers, LayoutTemplate, MousePointerClick, Search, Workflow } from "lucide-react";
import { Dienstpagina, PrijsTekst } from "@/components/dienst/Dienstpagina";
import { PijlLink } from "@/components/dienst/onderdelen";

const PAD = "/ux-ui-design/";
const TITEL = "UX/UI designer voor je product of platform | DisselDesign";
const OMSCHRIJVING =
  "UX/UI designer nodig? Onderzoek, wireframes, UI-ontwerp en design systemen in Figma, en als het moet ook de frontend. Plan een gratis gesprek.";

export const metadata: Metadata = {
  title: TITEL,
  description: OMSCHRIJVING,
  alternates: { canonical: PAD },
  openGraph: { title: TITEL, description: OMSCHRIJVING, type: "website", locale: "nl_NL", url: PAD },
  twitter: { title: TITEL, description: OMSCHRIJVING },
};

const vragen = [
  {
    vraag: "Werk je in Figma?",
    antwoord:
      "Ja. Wireframes, ontwerpen en design systemen maak ik in Figma. Een ontwerp laat ik ook zien als werkende versie via een link, zodat je het op je eigen telefoon test.",
  },
  {
    vraag: "Kun je het ontwerp ook bouwen?",
    antwoord:
      "Ja. Ik bouw de frontend zelf in Next.js en React. Werk je met eigen developers, dan lever ik het ontwerp en een styleguide aan waar zij direct mee bouwen.",
  },
  {
    vraag: "Wat kost UX/UI design?",
    antwoord:
      "Dat hangt af van de omvang: een paar schermen verbeteren is iets anders dan een heel platform ontwerpen. Na het gesprek krijg je een voorstel met een vaste prijs.",
  },
  {
    vraag: "Werk je ook voor bureaus?",
    antwoord:
      "Ja. Voor bureaus en digitale teams werk ik als freelance UX/UI designer, remote of op locatie. Kijk op de pagina voor bureaus.",
  },
];

/** Dienstpagina "UX/UI design", voor bedrijven met een product of platform. */
export default function UxUiDesign() {
  return (
    <Dienstpagina
      inhoud={{
        pad: PAD,
        naam: "UX/UI design",
        h1: "UX/UI design voor je product of platform",
        intro: [
          "Je hebt een platform, webshop of app, en gebruikers lopen vast of haken af. Of je bouwt iets nieuws en wilt dat het vanaf het begin logisch werkt.",
          "Ik ben UX/UI designer met meer dan zes jaar ervaring, bij bureaus en voor eigen klanten. Ik onderzoek hoe je gebruikers werken, ontwerp de schermen en leg alles vast, zodat er direct mee gebouwd kan worden.",
        ],
        beeld: {
          src: "/mockup/zd-mockup-slider2-itereren-3screens.webp",
          alt: "Drie schermen van de Ziggo Dome-agenda, van wireframe tot definitief ontwerp",
          breedte: 3840,
          hoogte: 2740,
        },
        tweedeKnop: { label: "Bekijk het werk", href: "#werk" },
        voordelen: {
          kicker: "Wat ik doe",
          kop: "Van onderzoek tot overdracht.",
          items: [
            {
              titel: "Gebruikersonderzoek",
              tekst: "Gesprekken met gebruikers en je team, en met Hotjar kijken wat bezoekers echt doen. Zo weet je waar het misgaat voordat je iets verandert.",
              icon: Search,
            },
            {
              titel: "Flows en wireframes",
              tekst: "De route die een gebruiker aflegt, en per scherm wat er moet staan. Eerst de structuur, dan pas de vorm.",
              icon: Workflow,
            },
            {
              titel: "UI-ontwerp",
              tekst: "De schermen zelf in Figma, voor telefoon, tablet en desktop. Te bekijken als werkende versie via een link.",
              icon: LayoutTemplate,
            },
            {
              titel: "Prototypes en testen",
              tekst: "Klikbare prototypes om keuzes te toetsen bij gebruikers en je team, voordat er gebouwd wordt.",
              icon: MousePointerClick,
            },
            {
              titel: "Design systemen",
              tekst: "Kleuren, typografie, componenten en hun staten vastgelegd in één systeem, zodat nieuwe schermen er vanzelf bij passen.",
              icon: Layers,
            },
            {
              titel: "Frontend of overdracht",
              tekst: "Ik bouw de frontend zelf in Next.js en React, of lever het ontwerp aan je eigen developers met een styleguide erbij.",
              icon: Code2,
            },
          ],
        },
        werk: {
          kop: "Interfaces die ik eerder ontwierp.",
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
            {
              slug: "kleintjes-van-alkmaar",
              tekst: "Een oppasplatform met twee kanten: alle schermen voor ouders en oppassers, elk met een eigen kleur.",
            },
          ],
        },
        past: {
          wel: [
            "Je hebt een digitaal product of platform met echte gebruikers.",
            "Je wilt keuzes onderbouwen met onderzoek, niet met smaak.",
            "Je team heeft developers, maar geen designer.",
          ],
          niet: [
            "Je zoekt een full-service bureau voor strategie, marketing en development.",
            "Je wilt alleen een nieuw kleurtje, zonder te kijken hoe het werkt.",
          ],
        },
        stappen: {
          kop: "Zo werkt het.",
          items: [
            {
              titel: "Gesprek",
              tekst: "20 minuten, gratis. Je vertelt over je product, je gebruikers en waar het nu schuurt.",
            },
            {
              titel: "Onderzoek",
              tekst: "Ik kijk hoe gebruikers je product nu gebruiken: gesprekken, data en Hotjar.",
            },
            {
              titel: "Ontwerp en testen",
              tekst: "Wireframes, daarna het UI-ontwerp en prototypes. Je ziet alles via een link en geeft feedback.",
            },
            {
              titel: "Bouwen of overdracht",
              tekst: "Ik bouw de frontend zelf, of lever alles aan je developers met een styleguide erbij.",
            },
          ],
        },
        prijzen: {
          kop: "Wat kost UX/UI design?",
          inhoud: (
            <>
              <PrijsTekst>
                Dat hangt af van de omvang: een paar schermen verbeteren is iets anders dan een heel platform
                ontwerpen. Daarom staat hier geen vast bedrag. Na het gesprek krijg je een voorstel met een vaste
                prijs.
              </PrijsTekst>
              <p className="mt-4">
                <PijlLink href="/voor-bureaus/">Ben je een bureau? Zo werk ik met bureaus</PijlLink>
              </p>
            </>
          ),
        },
        vragen,
        cta: {
          kop: "Een UX/UI designer nodig?",
          tekst: "Vertel kort over je product. Dan plannen we een gratis gesprek van 20 minuten, en daarna krijg je een voorstel met een vaste prijs.",
        },
        schema: {
          omschrijving:
            "UX/UI design voor digitale producten en platforms: onderzoek, wireframes, UI-ontwerp, prototypes, design systemen en frontend in Next.js en React.",
        },
      }}
    />
  );
}
