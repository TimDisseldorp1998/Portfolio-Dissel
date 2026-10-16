import { ArrowRight } from "lucide-react";
import { alleCases } from "@/lib/werk";
import { Section } from "./ui/Section";
import { Container } from "./ui/Container";
import { Reveal, RevealStagger, RevealItem } from "./ui/Reveal";
import { CaseKaart } from "./werk/CaseKaart";
import { OudeCaseLinks } from "./werk/OudeCaseLinks";

/**
 * Werk op home: elke case als kaart met een link naar /werk/<slug>/, plus een
 * link naar het overzicht. Servercomponent: de cases komen uit content/werk/.
 */
export async function Projects() {
  const cases = await alleCases();

  return (
    <Section id="work" variant="dark">
      <OudeCaseLinks />
      <Container>
        <Reveal>
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between md:mb-12">
            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-primary">
                Recent werk
              </p>
              <h2 className="font-heading text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl">
                Zo ziet het eruit als{" "}
                <span className="whitespace-nowrap text-white/[0.55]">het werkt.</span>
              </h2>
            </div>
            <a
              href="/werk/"
              className="inline-flex shrink-0 items-center gap-2 rounded-full text-sm font-medium text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Alle projecten
              <ArrowRight size={16} aria-hidden />
            </a>
          </div>
        </Reveal>

        <RevealStagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((c) => (
            <RevealItem key={c.slug}>
              <CaseKaart caseMeta={c} />
            </RevealItem>
          ))}
        </RevealStagger>
      </Container>
    </Section>
  );
}
