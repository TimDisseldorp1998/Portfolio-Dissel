"use client";

import { about, site } from "@/lib/content";
import { Section } from "./ui/Section";
import { Container } from "./ui/Container";
import { Reveal, RevealStagger, RevealItem } from "./ui/Reveal";

export function About() {
  return (
    <Section id="about" variant="light">
      <Container>
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <Reveal>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-primary-700">
                About
              </p>
              <h2 className="mb-6 font-heading text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
                Hi, I&apos;m {site.name.split(" ")[0]}.{" "}
                <span className="text-gradient">Nice to meet you.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl border border-black/[0.06] bg-gradient-brand-soft shadow-soft">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(86,58,218,0.35),transparent_60%),radial-gradient(circle_at_80%_80%,rgba(255,131,61,0.35),transparent_60%)]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-white/60 backdrop-blur">
                      <span className="font-heading text-4xl font-semibold text-gradient">
                        {site.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </span>
                    </div>
                    <p className="font-heading text-sm font-medium text-ink">
                      Portrait placeholder
                    </p>
                    <p className="text-xs text-ink-muted">
                      Swap in /public/portrait.jpg
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-7">
            <Reveal delay={0.15}>
              <p className="text-lg leading-relaxed text-ink-muted md:text-xl">
                {about.paragraph}
              </p>
            </Reveal>

            <RevealStagger className="mt-10 grid gap-4 sm:grid-cols-3" delay={0.2}>
              {about.details.map((d) => (
                <RevealItem
                  key={d.title}
                  className="rounded-2xl border border-black/[0.06] bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
                >
                  <div className="mb-3 h-1 w-8 rounded-full bg-gradient-brand" />
                  <h3 className="mb-1 font-heading text-base font-semibold">
                    {d.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-ink-muted">
                    {d.body}
                  </p>
                </RevealItem>
              ))}
            </RevealStagger>

            <Reveal delay={0.35} className="mt-10">
              <dl className="grid grid-cols-2 gap-x-8 gap-y-4 border-t border-black/[0.08] pt-8 sm:grid-cols-3">
                <div>
                  <dt className="text-xs font-medium uppercase tracking-[0.18em] text-ink-soft">
                    Based in
                  </dt>
                  <dd className="mt-1 font-heading text-sm font-medium">
                    {site.location}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-[0.18em] text-ink-soft">
                    Availability
                  </dt>
                  <dd className="mt-1 font-heading text-sm font-medium">
                    Open to projects
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-[0.18em] text-ink-soft">
                    Focus
                  </dt>
                  <dd className="mt-1 font-heading text-sm font-medium">
                    Product · Web · Motion
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
