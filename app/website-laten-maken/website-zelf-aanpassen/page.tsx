import type { Metadata } from "next";
import { Artikel, Tabel, alinea, inlineLink, tussenkop } from "@/components/kennis/Artikel";

const PAD = "/website-laten-maken/website-zelf-aanpassen/";
const TITEL = "Kan ik mijn website zelf aanpassen? | DisselDesign";
const OMSCHRIJVING =
  "Ja, met een CMS pas je zelf teksten en foto's aan. Wanneer dat handig is, wat het kost en wat je ook zonder CMS kunt laten aanpassen.";

export const metadata: Metadata = {
  title: TITEL,
  description: OMSCHRIJVING,
  alternates: { canonical: PAD },
  openGraph: { title: TITEL, description: OMSCHRIJVING, type: "article", locale: "nl_NL", url: PAD },
  twitter: { title: TITEL, description: OMSCHRIJVING },
};

const vragen = [
  {
    vraag: "Kan er later nog een CMS bij?",
    antwoord:
      "Ja. Het is wel iets duurder dan meteen, omdat de site er dan op aangepast moet worden. Twijfel je, bespreek het dan in het gesprek.",
  },
  {
    vraag: "Moet ik iets kunnen van code?",
    antwoord: "Nee. In het beheerscherm zie je tekstvakken en knoppen om een foto te kiezen.",
  },
];

/** Kennisartikel: zelf aanpassen met een CMS. Teksten: docs/stap-4-kennis-teksten.md. */
export default function ZelfAanpassen() {
  return (
    <Artikel
      pad={PAD}
      omschrijving={OMSCHRIJVING}
      kortAntwoord={
        <>
          Ja, als er een CMS bij komt. Dat is een beheerscherm waarin je zelf teksten en foto&apos;s wijzigt,
          zonder iets van code te weten. Een CMS zit niet standaard in een pakket; welk systeem het wordt en wat
          het kost, staat in het voorstel. Zonder CMS laat je aanpassingen door mij doen.
        </>
      }
      vragen={vragen}
      cta={{
        kop: "Wil je je site zelf bijhouden?",
        tekst: "Vertel wat je zelf wilt kunnen aanpassen. In een gratis gesprek van 20 minuten kijken we of een CMS past.",
      }}
    >
      <h2 className={tussenkop}>Wat een CMS is</h2>
      <p className={alinea}>
        Een CMS is een beheerscherm achter je website. Je logt in, past een tekst of foto aan en slaat op. De
        opmaak blijft hetzelfde, dus de site ziet er na jouw wijziging nog net zo uit.
      </p>
      <p className={alinea}>
        <a href="/werk/marktzicht/" className={inlineLink}>
          Marktzicht
        </a>{" "}
        houdt zo zelf de menukaart bij. Verandert er een gerecht of een prijs, dan passen ze het aan zonder mij
        te bellen.
      </p>

      <h2 className={tussenkop}>Heb je een CMS nodig?</h2>
      <Tabel
        kop={["Je situatie", "Advies"]}
        rijen={[
          ["Je wijzigt iets een paar keer per jaar", "Geen CMS. Laat het mij doen."],
          ["Je hebt een menukaart, prijslijst of agenda die vaak verandert", "Een CMS voor dat deel."],
          ["Je wilt zelf nieuws of blogs plaatsen", "Een CMS."],
        ]}
      />

      <h2 className={tussenkop}>Wat je zelf kunt aanpassen</h2>
      <p className={alinea}>
        Met een CMS pas je de teksten en foto&apos;s op je pagina&apos;s aan. Ook onderdelen die vaak veranderen,
        zoals een menukaart, een prijslijst of nieuwsberichten, beheer je zelf. De indeling van de pagina&apos;s
        blijft zoals hij ontworpen is; een nieuwe pagina of een ander soort blok laat je door mij maken.
      </p>
      <p className={alinea}>
        Welk CMS ik gebruik, kies ik per project. Dat hangt af van wat je wilt aanpassen en hoe vaak. In het
        voorstel staat welk systeem het wordt.
      </p>

      <h2 className={tussenkop}>Zonder CMS</h2>
      <p className={alinea}>
        Kleine aanpassingen, zoals een nieuwe openingstijd of een andere foto, zitten in het{" "}
        <a href="/website-laten-maken/hosting-en-onderhoud/" className={inlineLink}>
          onderhoudspakket
        </a>
        . Neem je dat niet af, dan krijg je per aanpassing eerst een prijs.
      </p>
    </Artikel>
  );
}
