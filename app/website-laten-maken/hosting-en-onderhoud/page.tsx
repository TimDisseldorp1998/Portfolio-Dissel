import type { Metadata } from "next";
import { Artikel, Tabel, alinea, inlineLink, tussenkop } from "@/components/kennis/Artikel";

const PAD = "/website-laten-maken/hosting-en-onderhoud/";
const TITEL = "Hosting en onderhoud van je website | DisselDesign";
const OMSCHRIJVING =
  "Hosting, updates, back-ups en kleine aanpassingen in één onderhoudspakket, maandelijks opzegbaar. Wat erin zit en hoe de prijs wordt bepaald.";

export const metadata: Metadata = {
  title: TITEL,
  description: OMSCHRIJVING,
  alternates: { canonical: PAD },
  openGraph: { title: TITEL, description: OMSCHRIJVING, type: "article", locale: "nl_NL", url: PAD },
  twitter: { title: TITEL, description: OMSCHRIJVING },
};

const vragen = [
  {
    vraag: "Kan ik het onderhoud opzeggen?",
    antwoord:
      "Ja, per maand. Er is geen looptijd. Stop je, dan zet ik je site en je bestanden voor je klaar, zodat je ergens anders verder kunt.",
  },
  {
    vraag: "Wat als mijn site plat ligt?",
    antwoord: "Monitoring meldt het mij. Ik kijk wat er mis is en los het op.",
  },
];

/** Kennisartikel: hosting en onderhoud. Teksten: docs/stap-4-kennis-teksten.md. */
export default function HostingEnOnderhoud() {
  return (
    <Artikel
      pad={PAD}
      omschrijving={OMSCHRIJVING}
      kortAntwoord={
        <>
          Ja. Hosting, updates, back-ups, monitoring, support en kleine aanpassingen zitten samen in één
          onderhoudspakket. De prijs hangt af van wat je site nodig heeft en staat in het voorstel. Je bent niet
          verplicht het af te nemen.
        </>
      }
      vragen={vragen}
      cta={{
        kop: "Wil je je site laten onderhouden?",
        tekst: "Vertel wat voor site je hebt of wilt. Na een gratis gesprek krijg je een voorstel met de prijs per maand.",
      }}
    >
      <h2 className={tussenkop}>Wat er in het onderhoudspakket zit</h2>
      <Tabel
        kop={["Onderdeel", "Wat het betekent"]}
        rijen={[
          ["Hosting", "Je site staat op een server en is bereikbaar."],
          ["Updates", "De techniek achter je site blijft bij."],
          ["Back-ups", "Gaat er iets mis, dan zet ik een eerdere versie terug."],
          ["Monitoring", "Ik zie het als je site onbereikbaar is."],
          ["Support", "Je mailt of appt je vraag naar mij. Binnen 2 werkdagen heb je antwoord."],
          [
            "Aanpassingen",
            "Kleine wijzigingen, zoals een nieuwe tekst of openingstijd. Wat er precies onder valt, staat in het voorstel.",
          ],
        ]}
      />
      <p className={alinea}>Het pakket is maandelijks opzegbaar.</p>

      <h2 className={tussenkop}>Wat kost onderhoud?</h2>
      <p className={alinea}>
        Dat hangt af van je site. Een landingspagina vraagt minder dan een site met een CMS en een
        reserveringssysteem. Daarom staat hier geen vast bedrag. Na het gesprek krijg je een voorstel waarin de
        prijs per maand staat.
      </p>

      <h2 className={tussenkop}>Je domeinnaam</h2>
      <p className={alinea}>
        Ik registreer je domeinnaam op jouw naam. De kosten betaal jij. Zo blijft het domein altijd van jou, ook
        als je later met een andere partij verder gaat.
      </p>

      <h2 className={tussenkop}>Moet ik het onderhoud bij jou afnemen?</h2>
      <p className={alinea}>
        Nee. De site is na oplevering{" "}
        <a href="/website-laten-maken/van-wie-is-de-website/" className={inlineLink}>
          van jou
        </a>
        , dus je kunt hem ook zelf laten hosten of bij een andere partij onderbrengen. Ik zet dan alles voor je
        klaar.
      </p>
    </Artikel>
  );
}
