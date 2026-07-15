import { PenTool, Code2, Sparkles, TrendingUp, type LucideIcon } from "lucide-react";
import { Section } from "./ui/Section";
import { Container } from "./ui/Container";

/**
 * Services section (server component — no "use client", so the headings, icons
 * and lists render straight into the static HTML for SEO). Subheading + heading
 * span the top; below sits the intro (left) with the four service cards in a
 * 2×2 grid (right), each in its own bordered frame. Stacks on mobile.
 */

const serviceColumns: {
  title: string;
  icon: LucideIcon;
  items: string[];
}[] = [
  {
    title: "Webdesign & UX/UI",
    icon: PenTool,
    items: [
      "UX/UI design",
      "Webdesign",
      "Landingspagina's",
      "Prototyping",
      "Design systemen",
      "Responsive design",
    ],
  },
  {
    title: "Webdevelopment",
    icon: Code2,
    items: [
      "Websites laten maken",
      "Web-apps",
      "Frontend-development",
      "Maatwerk development",
      "Onderhoud & support",
      "Performance-optimalisatie",
    ],
  },
  {
    title: "Merk & huisstijl",
    icon: Sparkles,
    items: [
      "Merkidentiteit",
      "Logo-ontwerp",
      "Huisstijl",
      "Brand guidelines",
      "Visuele stijl",
      "Iconografie",
    ],
  },
  {
    title: "Vindbaarheid & conversie",
    icon: TrendingUp,
    items: [
      "SEO",
      "Conversie-optimalisatie",
      "Snelheid & Core Web Vitals",
      "Analytics & tracking",
      "A/B-testen",
      "Toegankelijkheid",
    ],
  },
];

export function Services() {
  return (
    <Section id="services" variant="dark">
      <Container>
        {/* Subheading + heading on top */}
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-primary">
          Diensten
        </p>
        <h2 className="max-w-3xl font-heading text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
          <span className="text-white/35">Van klik tot klant,</span>{" "}
          <span className="text-white">met design dat converteert</span>
        </h2>

        {/* Intro left, service cards (2×2) right */}
        <div className="mt-14 grid items-start gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="space-y-4 text-base leading-relaxed text-white/70 lg:col-span-4">
            <p>
              Een mooie website is pas het halve werk.{" "}
              <span className="whitespace-nowrap">Ik ontwerp</span> en bouw
              digitale producten die er professioneel uitzien én meetbaar meer
              opleveren. Voor merken die willen groeien, van startups tot
              corporate bedrijven.
            </p>
            <p>
              Design en development onder één dak, korte lijnen en snelle
              oplevering. Geen eindeloze trajecten of losse eindjes. Gewoon
              design en development dat je bezoekers omzet in klanten.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:col-span-8">
            {serviceColumns.map((column) => {
              const Icon = column.icon;
              return (
                <div
                  key={column.title}
                  className="group flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06]"
                >
                  <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.12] to-white/[0.02] text-secondary transition-colors duration-300 group-hover:text-primary">
                    <Icon size={22} strokeWidth={1.75} aria-hidden />
                  </span>
                  <h3 className="mb-4 font-heading text-lg font-semibold text-white">
                    {column.title}
                  </h3>
                  <ul className="space-y-2.5">
                    {column.items.map((item) => (
                      <li
                        key={item}
                        className="text-sm leading-snug text-white/60"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
