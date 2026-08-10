"use client";

import { useState } from "react";
import { reviews } from "@/lib/content";
import { Section } from "./ui/Section";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import { PauseButton } from "./ui/PauseButton";
import { MarqueeCard } from "./ui/Testimonial";

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
          <p className="mb-3.5 text-xs font-medium uppercase tracking-[0.22em] text-secondary">
            Reviews
          </p>
          <h2 className="max-w-[640px] font-heading text-3xl font-semibold leading-tight tracking-[-0.02em] text-white sm:text-4xl md:text-[44px]">
            <span className="text-white/[0.55]">Geen verkooppraatje.</span>{" "}
            Dit zeggen klanten.
          </h2>
          <p className="mt-[18px] max-w-[460px] text-[15px] leading-[1.65] text-white/60">
            Van huisstijl tot livegang. Beweeg over de rij om hem te stoppen en
            rustig te lezen.
          </p>
          <PauseButton
            paused={gepauzeerd}
            onToggle={() => setGepauzeerd((p) => !p)}
            label="Reviews"
            className="mt-5"
          />
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
        {/* De reviews staan er twee keer in: op -50% begint kopie 2 precies
            waar kopie 1 begon, dus de loop is naadloos. De `pr-5` is even breed
            als de `gap-5`, anders valt die halve slag net naast de kaartgrens
            en zie je elke ronde een sprongetje. */}
        <div className="mq-row flex w-max gap-5 pr-5">
          {[...reviews, ...reviews].map((review, i) => (
            <MarqueeCard
              key={`${review.author}-${i}`}
              review={review}
              decoratief={i >= reviews.length}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
