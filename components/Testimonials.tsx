import { reviews } from "@/lib/content";
import { Section } from "./ui/Section";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import { Marquee } from "./ui/Marquee";
import { MarqueeCard } from "./ui/Testimonial";

// Staat op home, direct na het werk. De quotes per case staan los daarvan
// op de casepagina's.

/** Kaartbreedte (desktop) plus de gap. Alleen nodig om uit te rekenen hoe
 *  vaak de reviews in één set moeten staan. */
const KAART_PX = 440 + 20;
/** Het scherm waar één set nog breder dan moet zijn, zodat er ook op een
 *  ultrawide monitor geen leeg gat achter de laatste kaart valt. */
const BREEDSTE_SCHERM_PX = 3840;
const HERHAAL = Math.max(1, Math.ceil(BREEDSTE_SCHERM_PX / (reviews.length * KAART_PX)));

/**
 * Reviews als één doorlopende rij. De rij loopt van rand tot rand (buiten de
 * Container) en vervaagt aan beide kanten.
 */
export function Testimonials() {
  return (
    <Section id="reviews" variant="dark">
      <Container>
        <Reveal>
          <p className="mb-3.5 text-xs font-medium uppercase tracking-[0.22em] text-primary">
            Reviews
          </p>
          {/* Twee `block`-spans: de regelovergang staat vast in plaats van
              dat hij afhangt van de kolombreedte. */}
          <h2 className="font-heading text-3xl font-semibold leading-tight tracking-[-0.02em] text-white sm:text-4xl md:text-[44px]">
            <span className="block text-white/[0.55]">Lokale bedrijven aan het woord.</span>
            <span className="block">Dit zeggen ze.</span>
          </h2>
        </Reveal>
      </Container>

      <div className="mt-10 md:mt-[52px]">
        <Marquee
          label="Reviews"
          herhaal={HERHAAL}
          bedieningClassName="container-page"
          className="[-webkit-mask-image:linear-gradient(90deg,transparent,#000_7%,#000_93%,transparent)] [mask-image:linear-gradient(90deg,transparent,#000_7%,#000_93%,transparent)]"
          items={reviews.map((review) => ({
            key: review.quote.slice(0, 40),
            node: <MarqueeCard review={review} />,
          }))}
        />
      </div>
    </Section>
  );
}
