import { prijs } from "@/lib/content";
import { Section } from "./ui/Section";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import { Veelgesteld, type Vraag } from "./Veelgesteld";

const vragen: Vraag[] = [
  {
    vraag: "Wat kost een website?",
    antwoord: `Een landingspagina of compacte site kost vanaf ${prijs.compact}. Een website met meerdere pagina's kost vanaf ${prijs.zonderHuisstijl}, of vanaf ${prijs.metHuisstijl} met een nieuwe huisstijl erbij. Alleen een huisstijl kan vanaf ${prijs.huisstijlLos}. Alle prijzen zijn exclusief btw. Na het gesprek krijg je een voorstel met een vaste prijs.`,
  },
  {
    vraag: "Hoe lang duurt het?",
    antwoord:
      "Kleine klussen zijn meestal binnen een week klaar. Een complete website duurt twee tot vier weken, afhankelijk van de omvang. De planning spreken we vooraf samen af.",
  },
  {
    vraag: "Hoeveel pagina's krijg ik?",
    antwoord:
      "Een website met meerdere pagina's heeft er tot 8, bijvoorbeeld home, diensten, over ons, werk en contact. Heb je er meer nodig, dan zetten we dat in het voorstel.",
  },
  {
    vraag: "Kan ik mijn website zelf aanpassen?",
    antwoord:
      "Ja, als er een CMS bij komt. Daarmee wijzig je zelf teksten en foto's. Marktzicht werkt zo zelf hun menukaart bij. Een CMS zit niet standaard in een pakket; wat het kost, staat in het voorstel.",
  },
  {
    vraag: "Wie regelt hosting en onderhoud?",
    antwoord:
      "Dat kan ik doen. Hosting, updates, back-ups, support en aanpassingen zitten in één pakket. Wat het kost, hangt af van wat er nodig is en staat in het voorstel.",
  },
  {
    vraag: "Van wie is de website?",
    antwoord:
      "Van jou. Ontwerp, code, domein en content zijn na oplevering helemaal van jou, en je domein staat op je eigen naam. Wil je ooit naar een andere partij, dan krijg je alles mee.",
  },
];

/** Veelgestelde vragen op home, tussen Over Tim en Contact. */
export function VeelgesteldHome() {
  return (
    <Section id="veelgestelde-vragen" variant="dark">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-primary">
              FAQ
            </p>
            <h2 className="font-heading text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl">
              Veelgestelde vragen.
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-8">
            <Veelgesteld vragen={vragen} />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
