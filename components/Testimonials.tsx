"use client";

import { reviews } from "@/lib/content";
import { Section } from "./ui/Section";
import { Container } from "./ui/Container";
import { Reveal, RevealStagger, RevealItem } from "./ui/Reveal";
import { Testimonial } from "./ui/Testimonial";

/**
 * Klantreviews, direct na het werk: wie de cases net heeft gezien, leest hier
 * dat de klanten erachter tevreden zijn. Beide quotes staan er tegelijk en
 * statisch — geen rotatie, dus ook geen pauzeknop nodig.
 */
export function Testimonials() {
  return (
    <Section id="reviews" variant="dark">
      <Container>
        <Reveal>
          <div className="mb-6 md:mb-12">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-primary">
              Reviews
            </p>
            <h2 className="font-heading text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl">
              <span className="text-white/[0.55]">Geen verkooppraatje.</span>{" "}
              Dit zeggen klanten.
            </h2>
          </div>
        </Reveal>

        <RevealStagger className="grid gap-4 md:gap-5 sm:grid-cols-2">
          {reviews.map((review) => (
            <RevealItem key={review.author}>
              <Testimonial review={review} />
            </RevealItem>
          ))}
        </RevealStagger>
      </Container>
    </Section>
  );
}
