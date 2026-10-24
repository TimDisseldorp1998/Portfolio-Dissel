import type { Metadata } from "next";
import { Artikel, Tabel, Vet, alinea, tussenkop } from "@/components/kennis/Artikel";

const PAD = "/website-laten-maken/hoe-snel-staat-mijn-website-live/";
const TITEL = "Hoe snel staat mijn website live? | DisselDesign";
const OMSCHRIJVING =
  "Een landingspagina staat meestal binnen een week live, een complete website in twee tot vier weken. Wat het sneller of langzamer maakt.";

export const metadata: Metadata = {
  title: TITEL,
  description: OMSCHRIJVING,
  alternates: { canonical: PAD },
  openGraph: { title: TITEL, description: OMSCHRIJVING, type: "article", locale: "nl_NL", url: PAD },
  twitter: { title: TITEL, description: OMSCHRIJVING },
};

const vragen = [
  {
    vraag: "Kan het ook sneller dan een week?",
    antwoord:
      "Bij een kleine klus soms wel. Vertel in het gesprek wanneer je live wilt, dan hoor je meteen of dat lukt.",
  },
  {
    vraag: "Wanneer weet ik de opleverdatum?",
    antwoord: "In het voorstel, voordat ik begin.",
  },
];

/** Kennisartikel: doorlooptijd. Teksten: docs/stap-4-kennis-teksten.md. */
export default function HoeSnelLive() {
  return (
    <Artikel
      pad={PAD}
      omschrijving={OMSCHRIJVING}
      kortAntwoord={
        <>
          Een landingspagina of kleine site staat meestal binnen een week live. Een complete website met
          meerdere pagina&apos;s duurt twee tot vier weken. Hoe snel het gaat, hangt vooral af van hoe snel de
          teksten en foto&apos;s er zijn en hoe snel je feedback geeft.
        </>
      }
      vragen={vragen}
      cta={{
        kop: "Wil je weten wanneer jouw site live kan?",
        tekst: "Vertel wanneer je live wilt. In een gratis gesprek van 20 minuten hoor je of dat lukt, en in het voorstel staat de datum.",
      }}
    >
      <h2 className={tussenkop}>Zo ziet de planning eruit</h2>
      <p className={alinea}>Voor een complete website:</p>
      <Tabel
        kop={["Stap", "Wat er gebeurt", "Hoe lang"]}
        rijen={[
          ["Gesprek", "20 minuten, gratis. Je vertelt wat je wilt.", "Zo snel als het jou uitkomt"],
          ["Voorstel", "Wat ik maak, wanneer het af is en wat het kost.", "Binnen 2 werkdagen"],
          ["Ontwerp", "Ik ontwerp de site. Jij geeft feedback (ronde 1).", "1 à 2 weken"],
          ["Bouwen", "Ik bouw de site. Jij geeft feedback (ronde 2).", "1 à 2 weken"],
          ["Live", "De site gaat online en ik meld hem aan bij Google.", "Eén dag"],
        ]}
      />
      <p className={alinea}>Bij een landingspagina gaan ontwerp en bouwen sneller, omdat het om één pagina gaat.</p>

      <h2 className={tussenkop}>Wat het sneller maakt</h2>
      <p className={alinea}>
        <Vet>Teksten en foto&apos;s op tijd.</Vet> Die lever jij aan. Ik vertel vooraf per pagina wat erop moet
        staan en hoe lang de tekst ongeveer is, zodat je weet wat je moet schrijven.
      </p>
      <p className={alinea}>
        <Vet>Snel feedback.</Vet> Er zijn twee feedbackrondes: na het ontwerp en na het bouwen. Hoe sneller je
        reageert, hoe sneller ik verder kan.
      </p>
      <p className={alinea}>
        <Vet>Je logo en kleuren al klaar.</Vet> Heb je nog geen huisstijl, dan maak ik die eerst. Dat voegt tijd
        toe.
      </p>

      <h2 className={tussenkop}>Wat het langzamer maakt</h2>
      <p className={alinea}>
        <Vet>Teksten die later komen dan gepland.</Vet> Dit is de meest voorkomende reden voor uitstel.
      </p>
      <p className={alinea}>
        <Vet>Extra pagina&apos;s of functies halverwege.</Vet> Dat kan, maar dan krijg je eerst een prijs en een
        nieuwe datum.
      </p>
      <p className={alinea}>
        <Vet>Een domeinnaam die nog bij een andere partij staat.</Vet> Een verhuizing duurt meestal een paar
        dagen.
      </p>
    </Artikel>
  );
}
