"use client";

import { useState } from "react";
import { reviews } from "@/lib/content";
import { cn } from "@/lib/cn";
import { Section } from "./ui/Section";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import { PauseButton } from "./ui/PauseButton";
import { MarqueeCard, type MarqueeAccent, type Review } from "./ui/Testimonial";

/** Rij 2 begint halverwege de lijst, zodat er niet twee keer dezelfde kaart
 *  recht boven elkaar staat. */
function verschoven<T>(lijst: T[]): T[] {
  const n = Math.ceil(lijst.length / 2);
  return [...lijst.slice(n), ...lijst.slice(0, n)];
}

function Rij({
  items,
  accent,
  omgekeerd,
  verbergVoorSchermlezer,
}: {
  items: Review[];
  accent: MarqueeAccent;
  omgekeerd?: boolean;
  /** Rij 2 toont dezelfde reviews als rij 1; die hoeft een schermlezer niet
   *  nog een keer te horen. */
  verbergVoorSchermlezer?: boolean;
}) {
  return (
    <div
      aria-hidden={verbergVoorSchermlezer || undefined}
      className={cn(
        "flex w-max gap-5 pr-5",
        omgekeerd ? "mq-row-rev" : "mq-row"
      )}
    >
      {[...items, ...items].map((review, i) => (
        <MarqueeCard
          key={`${review.author}-${i}`}
          review={review}
          accent={accent}
          decoratief={i >= items.length}
        />
      ))}
    </div>
  );
}

/**
 * Reviews als twee tegengesteld lopende rijen, direct na het werk. De rijen
 * stoppen zodra de muis erop komt; de knop doet hetzelfde voor toetsenbord en
 * touch, want bewegende content langer dan vijf seconden moet te stoppen zijn
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
            Van huisstijl tot livegang. Beweeg over de rijen om ze te stoppen en
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

      {/* Buiten de Container: de rijen lopen van rand tot rand. De mask laat ze
          aan beide zijden uitfaden, maar knipt niets af — zonder
          `overflow-hidden` steken de rijen buiten de pagina en krijgt het hele
          document een horizontale scrollbalk. Onder reduced motion zet
          globals.css dit terug naar `overflow-x:auto`, zodat de reviews dan
          met de hand bereikbaar blijven. */}
      <div
        className="mq-wrap mt-10 flex flex-col gap-5 overflow-hidden md:mt-[52px] [mask-image:linear-gradient(90deg,transparent,#000_7%,#000_93%,transparent)] [-webkit-mask-image:linear-gradient(90deg,transparent,#000_7%,#000_93%,transparent)]"
        data-paused={gepauzeerd}
      >
        <Rij items={reviews} accent="secondary" />
        <Rij
          items={verschoven(reviews)}
          accent="primary"
          omgekeerd
          verbergVoorSchermlezer
        />
      </div>
    </Section>
  );
}
