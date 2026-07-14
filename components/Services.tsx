import { Section } from "./ui/Section";
import { Container } from "./ui/Container";

/**
 * Services section (server component — no "use client", so the headings and
 * lists are rendered straight into the static HTML for SEO). Left: heading +
 * intro. Right: four service columns. Stacks on mobile, four across on desktop.
 */

const serviceColumns = [
  {
    title: "Webdesign & UX/UI",
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
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Left — heading + intro */}
          <div className="lg:col-span-4">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-primary">
              Diensten
            </p>
            <h2 className="font-heading text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-[2.75rem]">
              Van klik tot klant, met design dat converteert
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-white/70">
              <p>
                Een mooie website is pas het halve werk. Ik ontwerp en bouw
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
          </div>

          {/* Right — four service columns */}
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-4">
            {serviceColumns.map((column) => (
              <div key={column.title}>
                <h3 className="mb-4 border-b border-white/10 pb-3 font-heading text-base font-semibold text-white">
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
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
