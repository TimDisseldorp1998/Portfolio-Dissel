import { ArrowRight } from "lucide-react";
import { casesVoorHome } from "@/lib/werk";
import { Section } from "./ui/Section";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import { Button } from "./ui/Button";
import { CaseOverzicht } from "./werk/CaseOverzicht";
import { OudeCaseLinks } from "./werk/OudeCaseLinks";

const alleProjectenLink =
  "inline-flex shrink-0 items-center gap-2 rounded-full text-sm font-medium text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";

/**
 * Werk op home: twee grote casekaarten (AANTAL_OP_HOME in lib/werk.ts), met
 * een link naar /werk/. Welke cases: eerst `uitgelicht`, daarna de nieuwste
 * op `datum`. Een nieuwe case in content/werk/ komt hier dus vanzelf bij.
 */
export async function Projects() {
  const cases = await casesVoorHome();

  return (
    <Section id="work" variant="dark">
      <OudeCaseLinks />
      <Container>
        <Reveal>
          <div className="mb-6 flex items-end justify-between gap-4 md:mb-12">
            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-primary">
                Recent werk
              </p>
              <h2 className="font-heading text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl">
                Zo ziet het eruit als{" "}
                <span className="whitespace-nowrap text-white/[0.55]">het werkt.</span>
              </h2>
            </div>
            <a href="/werk/" className={`hidden lg:inline-flex ${alleProjectenLink}`}>
              Alle projecten
              <ArrowRight size={16} aria-hidden />
            </a>
          </div>
        </Reveal>

        <Reveal>
          <CaseOverzicht items={cases} layout="grid" />
        </Reveal>

        {/* Onder 1024px onder de kaarten, als volle-breedte-knop. */}
        <Button href="/werk/" variant="outline" size="lg" className="mt-6 w-full lg:hidden">
          Alle projecten
          <ArrowRight size={18} aria-hidden />
        </Button>
      </Container>
    </Section>
  );
}
