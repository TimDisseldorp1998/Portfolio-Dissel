import type { Metadata } from "next";
import { Artikel, Tabel, alinea, tussenkop } from "@/components/kennis/Artikel";

const PAD = "/website-laten-maken/van-wie-is-de-website/";
const TITEL = "Van wie is de website na oplevering? | DisselDesign";
const OMSCHRIJVING =
  "Na de oplevering is alles van jou: ontwerp, code, domein en content. Wat dat betekent als je later naar een andere partij wilt.";

export const metadata: Metadata = {
  title: TITEL,
  description: OMSCHRIJVING,
  alternates: { canonical: PAD },
  openGraph: { title: TITEL, description: OMSCHRIJVING, type: "article", locale: "nl_NL", url: PAD },
  twitter: { title: TITEL, description: OMSCHRIJVING },
};

const vragen = [
  {
    vraag: "Mag ik het logo ook op drukwerk en kleding gebruiken?",
    antwoord: "Ja. Na de oplevering is het van jou.",
  },
  {
    vraag: "Wat gebeurt er als jij stopt?",
    antwoord:
      "Dan heb je alles al: de code, de bestanden en je domein op je eigen naam. Een andere partij kan zo verder.",
  },
];

/** Kennisartikel: eigendom na oplevering. Teksten: docs/stap-4-kennis-teksten.md. */
export default function VanWieIsDeWebsite() {
  return (
    <Artikel
      pad={PAD}
      omschrijving={OMSCHRIJVING}
      kortAntwoord={
        <>
          Van jou. Na de oplevering zijn het ontwerp, de code, de domeinnaam en de content van jou. Het domein
          staat op je eigen naam. Wil je later met een andere partij verder, dan draag ik alles aan je over.
        </>
      }
      vragen={vragen}
      cta={{
        kop: "Een site die van jou is?",
        tekst: "Vertel kort wat je wilt laten maken. Na een gratis gesprek krijg je een voorstel met een vaste prijs.",
      }}
    >
      <h2 className={tussenkop}>Wat er precies van jou is</h2>
      <Tabel
        kop={["Onderdeel", "Wat je krijgt"]}
        rijen={[
          ["Ontwerp", "Het ontwerp van je site, als export (PDF en afbeeldingen)."],
          ["Code", "De volledige code van je website, als zip-bestand."],
          ["Domeinnaam", "Staat vanaf het begin op jouw naam."],
          ["Content", "Je teksten en foto's. Die waren al van jou."],
          [
            "Huisstijl",
            "Als ik die maakte: je logo, de bestanden en de stijlgids. Gebruik ze waar en zo vaak je wilt.",
          ],
        ]}
      />

      <h2 className={tussenkop}>Waarom dat belangrijk is</h2>
      <p className={alinea}>
        Bij sommige partijen huur je je website. Stop je, dan ben je hem kwijt, of moet je betalen om je eigen
        domein terug te krijgen. Bij mij niet: je hoeft niemand toestemming te vragen om over te stappen.
      </p>

      <h2 className={tussenkop}>Overstappen naar een andere partij</h2>
      <p className={alinea}>
        Je laat het weten, en ik zet de code, de ontwerpbestanden en de toegang tot je domein voor je klaar. Dat
        kost niets.
      </p>
    </Artikel>
  );
}
