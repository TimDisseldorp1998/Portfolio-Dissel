import type { Metadata } from "next";
import { Gauge, MousePointerClick, ScanEye, Search } from "lucide-react";
import { Dienstpagina, PrijsTekst } from "@/components/dienst/Dienstpagina";
import { Blok, h2, kicker } from "@/components/dienst/onderdelen";
import { WebsiteCheck } from "@/components/dienst/WebsiteCheck";
import { Reveal } from "@/components/ui/Reveal";

const PAD = "/website-verbeteren/";
const TITEL = "Website laten verbeteren | DisselDesign";
const OMSCHRIJVING =
  "Website laten verbeteren? Snelheid, vindbaarheid en conversie. Vraag een gratis websitecheck aan: binnen 3 werkdagen drie verbeterpunten in je mail.";

export const metadata: Metadata = {
  title: TITEL,
  description: OMSCHRIJVING,
  alternates: { canonical: PAD },
  openGraph: { title: TITEL, description: OMSCHRIJVING, type: "website", locale: "nl_NL", url: PAD },
  twitter: { title: TITEL, description: OMSCHRIJVING },
};

const vragen = [
  {
    vraag: "Is de websitecheck echt gratis?",
    antwoord:
      "Ja. Je vult je website in en binnen 3 werkdagen krijg je drie verbeterpunten in je mail. Je zit daarna nergens aan vast.",
  },
  {
    vraag: "Wat staat er in de websitecheck?",
    antwoord:
      "Drie concrete punten waar je site op vooruit kan, met per punt wat er nu gebeurt en wat je eraan kunt doen. Ik kijk zelf naar je site, het is geen automatisch rapport.",
  },
  {
    vraag: "Wat kost het om mijn website te laten verbeteren?",
    antwoord:
      "Dat hangt af van wat er moet gebeuren: snelheid oplossen is iets anders dan een nieuwe indeling. Na de websitecheck of het gesprek krijg je een voorstel met een vaste prijs.",
  },
];

/** Dienstpagina "website verbeteren", met de gratis websitecheck. */
export default function WebsiteVerbeteren() {
  return (
    <Dienstpagina
      inhoud={{
        pad: PAD,
        naam: "Website verbeteren",
        h1: "Website laten verbeteren",
        intro: [
          "Je hebt al een site, maar hij doet niet wat je wilt. Hij is traag, je wordt slecht gevonden, of bezoekers komen wel maar nemen geen contact op.",
          "Ik kijk waar het misgaat en pak eerst aan wat het zwaarst weegt, zonder dat je opnieuw hoeft te beginnen.",
        ],
        tweedeKnop: { label: "Vraag de gratis check aan", href: "#websitecheck" },
        naHero: (
          <Blok id="websitecheck" className="mt-6">
            <Reveal>
              <div className="grid gap-10 rounded-3xl bg-white/[0.04] p-7 md:p-10 lg:grid-cols-12">
                <div className="lg:col-span-5">
                  <p className={kicker}>Gratis websitecheck</p>
                  <h2 className={h2}>Drie verbeterpunten, binnen 3 werkdagen.</h2>
                  <p className="mt-4 text-lg leading-relaxed text-white/70">
                    Vul je website in. Ik kijk er zelf naar en stuur je binnen 3 werkdagen drie concrete
                    verbeterpunten. Gratis, en je zit nergens aan vast.
                  </p>
                </div>
                <div className="lg:col-span-7">
                  <WebsiteCheck />
                </div>
              </div>
            </Reveal>
          </Blok>
        ),
        voordelen: {
          kicker: "Wat ik verbeter",
          kop: "Waar ik naar kijk.",
          items: [
            {
              titel: "Snelheid",
              tekst: "Hoe snel je pagina's laden, vooral op een telefoon. Ik meet het met Google Lighthouse en los op wat het traag maakt.",
              icon: Gauge,
            },
            {
              titel: "Vindbaarheid",
              tekst: "Paginatitels, beschrijvingen, de opbouw van je pagina's en je sitemap, zodat Google begrijpt waar je site over gaat.",
              icon: Search,
            },
            {
              titel: "Conversie en UX",
              tekst: "Hoe bezoekers door je site gaan en waar ze afhaken. Daarna verbeter ik de route naar bellen, reserveren of een aanvraag.",
              icon: MousePointerClick,
            },
            {
              titel: "Hotjar-onderzoek",
              tekst: "Heatmaps en opnames van echte bezoeken laten zien wat mensen doen, in plaats van wat je denkt dat ze doen.",
              icon: ScanEye,
            },
          ],
        },
        werk: {
          kop: "Een site die ik eerder verbeterde.",
          cases: [
            {
              slug: "16-08-streetwear",
              tekst:
                "Een webshop opnieuw ingedeeld rond zoeken, kiezen en afrekenen, met heldere categorieën, een kortere checkout en een huisstijlhandboek.",
            },
          ],
        },
        past: {
          wel: [
            "Je hebt een website, maar er komen weinig aanvragen of reserveringen binnen.",
            "Je site is traag of ziet er op een telefoon rommelig uit.",
            "Je wilt eerst weten waar het aan ligt, voordat je geld uitgeeft.",
          ],
          niet: [
            "Je zoekt iemand die je advertenties beheert.",
            "Je wilt een garantie op meer bezoekers. Die geef ik niet, wel een eerlijk advies.",
          ],
        },
        stappen: {
          kop: "Zo werkt het.",
          items: [
            {
              titel: "Websitecheck of gesprek",
              tekst: "Gratis. Je krijgt drie verbeterpunten in je mail, of we bespreken je site in 20 minuten.",
            },
            { titel: "Voorstel", tekst: "Wat ik verbeter, wanneer het af is en wat het kost. Een vaste prijs." },
            {
              titel: "Verbeteren",
              tekst: "Ik pak de punten aan. Je ziet de wijzigingen via een link voordat ze live gaan.",
            },
            {
              titel: "Meten",
              tekst: "Na de wijzigingen kijken we samen in Google Analytics en Search Console wat er veranderd is.",
            },
          ],
        },
        prijzen: {
          kop: "Wat kost website verbeteren?",
          inhoud: (
            <PrijsTekst>
              Dat hangt af van wat er moet gebeuren: snelheid oplossen is iets anders dan een nieuwe indeling.
              Daarom staat hier geen vast bedrag. Na de websitecheck of het gesprek krijg je een voorstel met een
              vaste prijs. Is een nieuwe site de betere keuze, dan hoor je dat ook.
            </PrijsTekst>
          ),
        },
        vragen,
        cta: {
          kop: "Je website laten verbeteren?",
          tekst: "Vraag de gratis websitecheck aan, of plan meteen een gesprek van 20 minuten.",
        },
        schema: {
          omschrijving:
            "Bestaande websites verbeteren: snelheid, vindbaarheid, conversie en UX, met Hotjar-onderzoek. Met een gratis websitecheck.",
        },
      }}
    />
  );
}
