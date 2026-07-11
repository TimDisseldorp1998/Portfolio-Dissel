"use client";

import { experience } from "@/lib/content";
import { Section } from "./ui/Section";
import { Container } from "./ui/Container";
import { Reveal, RevealStagger, RevealItem } from "./ui/Reveal";

export function Experience() {
  return (
    <Section id="experience" variant="alt">
      <Container>
        <Reveal>
          <div className="mb-14">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-primary">
              Experience
            </p>
            <h2 className="max-w-2xl font-heading text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
              A decade of{" "}
              <span className="text-gradient">shipping</span>.
            </h2>
          </div>
        </Reveal>

        <div className="relative mx-auto max-w-3xl">
          {/* Vertical line */}
          <div
            aria-hidden
            className="absolute left-3 top-0 h-full w-px bg-gradient-to-b from-primary/30 via-black/[0.08] to-secondary/30 md:left-4"
          />

          <RevealStagger className="space-y-10" stagger={0.1}>
            {experience.map((item) => (
              <RevealItem key={item.role + item.period}>
                <div className="relative pl-10 md:pl-14">
                  {/* Dot */}
                  <div className="absolute left-0 top-1.5 flex h-6 w-6 items-center justify-center md:left-1 md:top-1">
                    <div className="absolute h-6 w-6 rounded-full bg-primary/15" />
                    <div className="relative h-2.5 w-2.5 rounded-full bg-gradient-brand shadow-[0_0_0_3px_#FAFAFA]" />
                  </div>

                  <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-8">
                    <h3 className="font-heading text-lg font-semibold">
                      {item.role}{" "}
                      <span className="text-ink-muted font-medium">
                        · {item.company}
                      </span>
                    </h3>
                    <span className="shrink-0 text-xs font-medium uppercase tracking-[0.18em] text-ink-soft">
                      {item.period}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted md:text-base">
                    {item.body}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </Container>
    </Section>
  );
}
