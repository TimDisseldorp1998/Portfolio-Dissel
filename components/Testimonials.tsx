"use client";

import { useState, type CSSProperties } from "react";
import { reviews } from "@/lib/content";
import { Section } from "./ui/Section";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import { PauseButton } from "./ui/PauseButton";
import { MarqueeCard } from "./ui/Testimonial";

/** Kaartbreedte plus de tussenruimte, in pixels. Alleen nodig om de duur uit
 *  te rekenen, dus de desktopmaat volstaat. */
const KAART_PX = 376 + 20;
/** Hoe snel de rij loopt. Hoger is sneller. */
const SNELHEID_PX_PER_S = 30;
/** Het scherm waar de rij nog vullend voor moet zijn. Ruim genomen, zodat er
 *  ook op een ultrawide monitor nooit een leeg gat achter de laatste kaart
 *  valt. */
const BREEDSTE_SCHERM_PX = 3840;

/**
 * De rij bestaat uit twee identieke helften; op -50% begint de tweede helft
 * precies waar de eerste begon, en daar is de loop naadloos. Eén helft moet
 * daarom zelf al breder zijn dan het scherm, anders zie je het einde van de
 * rij voorbijkomen met zwart erachter. Bij drie reviews is één set maar
 * ~1200px, dus die wordt net zo vaak herhaald tot hij breed genoeg is.
 */
const HERHALINGEN = Math.max(
  2,
  Math.ceil(BREEDSTE_SCHERM_PX / (reviews.length * KAART_PX))
);

const helft = Array.from({ length: HERHALINGEN }, () => reviews).flat();
const rij = [...helft, ...helft];
const duurSeconden = Math.round((helft.length * KAART_PX) / SNELHEID_PX_PER_S);

/**
 * Reviews als één doorlopende rij, direct na het werk. De rij stopt zodra de
 * muis erop komt; de knop doet hetzelfde voor toetsenbord en touch, want
 * beweging die langer dan vijf seconden doorloopt moet te stoppen zijn
 * (WCAG 2.2.2).
 */
export function Testimonials() {
  const [gepauzeerd, setGepauzeerd] = useState(false);

  return (
    <Section id="reviews" variant="dark">
      <Container>
        <Reveal>
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="mb-3.5 text-xs font-medium uppercase tracking-[0.22em] text-primary">
                Reviews
              </p>
              <h2 className="max-w-[640px] font-heading text-3xl font-semibold leading-tight tracking-[-0.02em] text-white sm:text-4xl md:text-[44px]">
                <span className="text-white/[0.55]">Geen verkooppraatje.</span>{" "}
                Dit zeggen klanten.
              </h2>
            </div>
            <PauseButton
              paused={gepauzeerd}
              onToggle={() => setGepauzeerd((p) => !p)}
              label="Reviews"
              size="md"
              className="shrink-0 border border-white/10 text-white/60"
            />
          </div>
        </Reveal>
      </Container>

      {/* Buiten de Container: de rij loopt van rand tot rand. De mask laat hem
          aan beide zijden uitfaden, maar knipt niets af — zonder
          `overflow-hidden` steekt de rij buiten de pagina en krijgt het hele
          document een horizontale scrollbalk. Onder reduced motion zet
          globals.css dit terug naar `overflow-x:auto`, zodat de reviews dan
          met de hand bereikbaar blijven. */}
      <div
        className="mq-wrap mt-10 overflow-hidden md:mt-[52px] [mask-image:linear-gradient(90deg,transparent,#000_7%,#000_93%,transparent)] [-webkit-mask-image:linear-gradient(90deg,transparent,#000_7%,#000_93%,transparent)]"
        data-paused={gepauzeerd}
      >
        {/* De `pr-5` is even breed als de `gap-5`, anders valt de halve slag
            net naast de kaartgrens en zie je elke ronde een sprongetje. */}
        <div
          className="mq-row flex w-max gap-5 pr-5"
          style={{ "--mq-duur": `${duurSeconden}s` } as CSSProperties}
        >
          {rij.map((review, i) => (
            <MarqueeCard
              key={`${review.author}-${i}`}
              review={review}
              // Alleen de eerste set is er voor de inhoud; de rest staat er om
              // de rij te vullen en de loop rond te maken.
              decoratief={i >= reviews.length}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
