"use client";

import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/lib/content";
import { Section } from "./ui/Section";
import { Container } from "./ui/Container";
import { Reveal, RevealStagger, RevealItem } from "./ui/Reveal";
import { cn } from "@/lib/cn";

const accentBg: Record<Project["accent"], string> = {
  primary:
    "bg-[radial-gradient(circle_at_20%_20%,rgba(86,58,218,0.55),transparent_60%),radial-gradient(circle_at_80%_80%,rgba(86,58,218,0.15),transparent_60%)]",
  secondary:
    "bg-[radial-gradient(circle_at_20%_20%,rgba(255,131,61,0.55),transparent_60%),radial-gradient(circle_at_80%_80%,rgba(255,131,61,0.15),transparent_60%)]",
  mix: "bg-[radial-gradient(circle_at_25%_20%,rgba(86,58,218,0.55),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(255,131,61,0.5),transparent_60%)]",
};

export function Projects() {
  return (
    <Section id="work" variant="alt">
      <Container>
        <Reveal>
          <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-primary-700">
                Selected work
              </p>
              <h2 className="max-w-2xl font-heading text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
                A few things I&apos;ve had the pleasure of{" "}
                <span className="text-gradient">making</span>.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-ink-muted">
              A short selection — reach out for the full case studies and
              the stories behind each one.
            </p>
          </div>
        </Reveal>

        <RevealStagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <RevealItem key={p.title}>
              <a
                href={p.href}
                className="group relative block overflow-hidden rounded-3xl border border-black/[0.06] bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
              >
                <div
                  className={cn(
                    "relative aspect-[16/11] overflow-hidden",
                    accentBg[p.accent]
                  )}
                >
                  <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
                    <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.15)_100%)]" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-heading text-4xl font-semibold text-white/85 mix-blend-overlay">
                        {p.title}
                      </span>
                    </div>
                  </div>
                  {/* subtle gradient border on hover */}
                  <div className="pointer-events-none absolute inset-0 rounded-3xl ring-0 ring-primary/0 transition-all duration-300 group-hover:ring-2 group-hover:ring-primary/20" />
                </div>

                <div className="flex flex-col gap-3 p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-heading text-lg font-semibold leading-snug">
                      {p.title}
                    </h3>
                    <span className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black/[0.04] text-ink-muted transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                      <ArrowUpRight size={16} />
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-ink-muted">
                    {p.description}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-black/[0.06] bg-black/[0.03] px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-ink-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            </RevealItem>
          ))}
        </RevealStagger>
      </Container>
    </Section>
  );
}
