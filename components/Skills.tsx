"use client";

import {
  Sparkles,
  Layers,
  Code2,
  Palette,
  Wand2,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { skills } from "@/lib/content";
import { Section } from "./ui/Section";
import { Container } from "./ui/Container";
import { Reveal, RevealStagger, RevealItem } from "./ui/Reveal";

const iconMap: Record<string, LucideIcon> = {
  Sparkles,
  Layers,
  Code2,
  Palette,
  Wand2,
  Zap,
};

export function Skills() {
  return (
    <Section id="skills" variant="dark">
      <Container>
        <Reveal>
          <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-primary">
                Skills & services
              </p>
              <h2 className="max-w-2xl font-heading text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl">
                What I bring to the table.
              </h2>
            </div>
          </div>
        </Reveal>

        <RevealStagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((s) => {
            const Icon = iconMap[s.icon] ?? Sparkles;
            return (
              <RevealItem key={s.title}>
                <div className="group relative flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06]">
                  <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand-soft text-primary transition-colors duration-300 group-hover:text-secondary">
                    <Icon size={20} strokeWidth={1.75} />
                  </div>
                  <h3 className="mb-2 font-heading text-lg font-semibold text-white">
                    {s.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/65">
                    {s.body}
                  </p>
                </div>
              </RevealItem>
            );
          })}
        </RevealStagger>
      </Container>
    </Section>
  );
}
