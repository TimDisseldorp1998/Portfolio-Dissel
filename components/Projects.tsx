import { ArrowRight } from "lucide-react";
import { alleCases } from "@/lib/werk";
import { Section } from "./ui/Section";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import { Marquee } from "./ui/Marquee";
import { CaseKaart } from "./werk/CaseKaart";
import { OudeCaseLinks } from "./werk/OudeCaseLinks";

/** De rij loopt van schermrand tot schermrand, maar de kaarten houden de
 *  maat van de content: drie per containerbreedte vanaf 1024px, twee vanaf
 *  768px. Containerbreedte = min(schermbreedte, 1200px) min 2x 2.5rem
 *  padding (zie .container-page); 1.5rem is de gap. Op mobiel 85% van het
 *  scherm, met een stukje van de volgende kaart. */
const KAARTBREEDTE =
  "w-[85cqw] md:w-[calc((min(100cqw,1200px)-5rem-1.5rem)/2)] lg:w-[calc((min(100cqw,1200px)-5rem-3rem)/3)]";
const SIZES = "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 85vw";

const alleProjectenLink =
  "inline-flex shrink-0 items-center gap-2 rounded-full text-sm font-medium text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";

/**
 * Werk op home: de casekaarten als eindeloos doorlopende rij, met een link
 * naar /werk/ (daar staan ze in een grid). Servercomponent: de cases komen
 * uit content/werk/, de kaarten worden hier gerenderd en aan de Marquee
 * meegegeven.
 */
export async function Projects() {
  const cases = await alleCases();

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
            <a href="/werk/" className={`hidden md:inline-flex ${alleProjectenLink}`}>
              Alle projecten
              <ArrowRight size={16} aria-hidden />
            </a>
          </div>
        </Reveal>
      </Container>

      {/* Buiten de Container: de rij loopt van rand tot rand. Twee keer de
          lijst per set, zodat één set ook op een heel breed scherm (tot zo'n
          4500px) breder is dan het scherm en er nooit een gat valt. */}
      <Marquee
        label="Projecten"
        herhaal={2}
        bedieningClassName="container-page"
        className="[-webkit-mask-image:linear-gradient(90deg,transparent,#000_5%,#000_95%,transparent)] [mask-image:linear-gradient(90deg,transparent,#000_5%,#000_95%,transparent)]"
        itemClassName={KAARTBREEDTE}
        setClassName="gap-6 pr-6"
        items={cases.map((c, i) => ({
          key: c.slug,
          node: (
            <CaseKaart
              caseMeta={c}
              laden={i < 3 ? "eager" : "lazy"}
              sizes={SIZES}
            />
            ),
          }))}
          onder={
            <a href="/werk/" className={`md:hidden ${alleProjectenLink}`}>
              Alle projecten
              <ArrowRight size={16} aria-hidden />
            </a>
          }
        />
    </Section>
  );
}
