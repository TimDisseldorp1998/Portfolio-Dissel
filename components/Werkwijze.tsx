import { Section } from "./ui/Section";
import { Container } from "./ui/Container";
import { Reveal, RevealItem, RevealStagger } from "./ui/Reveal";
import { Button } from "./ui/Button";
import { KoffieIcoon } from "./ui/KoffieIcoon";

const stappen = [
  { titel: "Kennismaking", tekst: "20 minuten, gratis. Je vertelt wat je wilt bereiken." },
  { titel: "Voorstel", tekst: "Wat ik maak, wanneer het af is en wat het kost. Een vaste prijs." },
  { titel: "Ontwerp", tekst: "Ik ontwerp in Figma en jij geeft feedback, voordat er code komt." },
  { titel: "Bouwen", tekst: "Ik bouw de site en test hem op mobiel. Daarna kijk jij hem na en geef je je tweede ronde feedback." },
  { titel: "Live", tekst: "Ik zet de site live en meld hem aan bij Google." },
  { titel: "Onderhoud", tekst: "Wil je dat ik hosting, updates en aanpassingen regel, dan kan dat. Op maat." },
];

/** "Zo werk ik" op /over-mij/, onder "Wat er in elke website zit". */
export function Werkwijze() {
  return (
    <Section id="werkwijze" variant="dark">
      <Container>
        <Reveal>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-primary">
            Werkwijze
          </p>
          <h2 className="font-heading text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl">
            Zo werk ik.
          </h2>
        </Reveal>

        <RevealStagger className="mt-8 grid gap-4 sm:grid-cols-2 md:mt-12 lg:grid-cols-3 lg:gap-5">
          {stappen.map((stap, i) => (
            <RevealItem key={stap.titel}>
              {/* Een geordende lijst zou semantisch mooier zijn, maar
                  RevealStagger zet om elk item een div; de nummers staan
                  daarom als tekst in de kaart. */}
              <div className="flex h-full flex-col rounded-3xl bg-white/[0.04] p-7 transition-colors duration-300 hover:bg-white/[0.06]">
                {/* Stap 1 is de kennismaking: daar staat het koffiekopje bij. */}
                <span className="flex items-center gap-2 font-heading text-sm font-semibold text-primary">
                  {String(i + 1).padStart(2, "0")}
                  {i === 0 && <KoffieIcoon size="sm" />}
                </span>
                <h3 className="mt-3 font-heading text-lg font-semibold text-white">
                  {stap.titel}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/70">{stap.tekst}</p>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>

        <Reveal className="mt-10">
          <Button href="/contact/" variant="primary" size="lg" data-cta="plan_kennismaking" className="group">
            <KoffieIcoon stoom="hover" />
            Plan een kennismaking
          </Button>
        </Reveal>
      </Container>
    </Section>
  );
}
