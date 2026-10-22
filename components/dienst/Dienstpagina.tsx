import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { alleCases } from "@/lib/werk";
import { dienstSchema, faqSchema } from "@/lib/structured-data";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Kruimelpad } from "@/components/Kruimelpad";
import { JsonLd } from "@/components/JsonLd";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal, RevealItem, RevealStagger } from "@/components/ui/Reveal";
import { Veelgesteld } from "@/components/Veelgesteld";
import { CaseTegel } from "@/components/werk/CaseTegel";
import {
  Blok,
  DienstCta,
  GesprekKnop,
  PastHetBijJe,
  PijlLink,
  Stappen,
  Voordeelblokken,
  h2,
  kicker,
} from "./onderdelen";

export type DienstpaginaInhoud = {
  pad: string;
  /** Naam in kruimelpad, schema en klein label boven de H1. */
  naam: string;
  h1: string;
  intro: string[];
  /** Hero-beeld rechts. Weglaten = alleen tekst (max. 2-3 beelden per pagina,
   *  zie docs/beelden.md). */
  beeld?: {
    src: string;
    alt: string;
    breedte: number;
    hoogte: number;
    /** Groot: het beeld krijgt meer ruimte dan de tekst (7 van 12 kolommen)
     *  en houdt zijn eigen verhouding, zonder uitsnede. Voor een brandboard
     *  of mockup waar detail in zit. */
    groot?: boolean;
  };
  /** Tweede knop naast "Plan een gesprek". */
  tweedeKnop?: { label: string; href: string };
  /** Extra blok direct onder de hero (bijv. de gratis websitecheck). */
  naHero?: ReactNode;
  voordelen: { kicker: string; kop: string; items: { titel: string; tekst: string; icon: LucideIcon }[] };
  /** Optionele regel onder de voordeelblokken. */
  naVoordelen?: ReactNode;
  werk: { kop: string; cases: { slug: string; tekst: string }[] };
  past?: { wel: string[]; niet: string[] };
  stappen: { kop: string; items: { titel: string; tekst: string }[]; link?: { label: string; href: string } };
  prijzen: { kop: string; inhoud: ReactNode };
  vragen: { vraag: string; antwoord: string }[];
  cta: { kop: string; tekst: string };
  schema: { omschrijving: string; vanaf?: number };
};

/**
 * Eén dienstpagina volgens het stramien uit de informatiestructuur: hero ·
 * wat je krijgt · werk · past het · werkwijze · kosten · FAQ · CTA. Alle
 * dienstpagina's gebruiken dit sjabloon, dus ze zien er gelijk uit.
 */
export async function Dienstpagina({ inhoud: d }: { inhoud: DienstpaginaInhoud }) {
  const cases = await alleCases();
  const werkCases = d.werk.cases.flatMap(({ slug, tekst }) => {
    const c = cases.find((x) => x.slug === slug);
    return c ? [{ ...c, kaarttekst: tekst }] : [];
  });

  return (
    <>
      <JsonLd
        data={dienstSchema({ pad: d.pad, naam: d.naam, omschrijving: d.schema.omschrijving, vanaf: d.schema.vanaf })}
      />
      <JsonLd data={faqSchema(d.vragen)} />
      <Navbar />
      <main id="main" className="bg-surface-dark text-white">
        <Container className="pb-20 pt-12 md:pb-28 lg:pt-36">
          <Kruimelpad
            kruimels={[
              { naam: "Diensten", href: "/diensten/" },
              { naam: d.naam, href: d.pad },
            ]}
          />

          <div className="mt-8 grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className={!d.beeld ? "lg:col-span-9" : d.beeld.groot ? "lg:col-span-5" : "lg:col-span-7"}>
              <p className={kicker}>{d.naam}</p>
              <h1 className="font-heading text-[clamp(2rem,7vw,3.5rem)] font-semibold leading-[1.1] tracking-tight">
                {d.h1}
              </h1>
              {d.intro.map((alinea, i) => (
                <p key={i} className={`${i === 0 ? "mt-6" : "mt-4"} text-lg leading-relaxed text-white/70`}>
                  {alinea}
                </p>
              ))}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <GesprekKnop />
                {d.tweedeKnop && (
                  <Button href={d.tweedeKnop.href} variant="outline" size="lg">
                    {d.tweedeKnop.label}
                  </Button>
                )}
              </div>
            </div>
            {d.beeld && (
              <div className={d.beeld.groot ? "lg:col-span-7" : "lg:col-span-5"}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={d.beeld.src}
                  alt={d.beeld.alt}
                  width={d.beeld.breedte}
                  height={d.beeld.hoogte}
                  fetchPriority="high"
                  decoding="async"
                  className={`w-full rounded-3xl object-cover ${d.beeld.groot ? "h-auto" : "aspect-[4/3]"}`}
                />
              </div>
            )}
          </div>

          {d.naHero}

          <Blok id="wat-je-krijgt" className="mt-6">
            <Reveal>
              <p className={kicker}>{d.voordelen.kicker}</p>
              <h2 className={h2}>{d.voordelen.kop}</h2>
            </Reveal>
            <Voordeelblokken items={d.voordelen.items} />
            {d.naVoordelen}
          </Blok>

          {werkCases.length > 0 && (
            <Blok id="werk">
              <Reveal>
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p className={kicker}>Werk</p>
                    <h2 className={h2}>{d.werk.kop}</h2>
                  </div>
                  <PijlLink href="/werk/">Alle projecten</PijlLink>
                </div>
              </Reveal>
              <RevealStagger className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {werkCases.map((c) => (
                  <RevealItem key={c.slug}>
                    <CaseTegel caseMeta={c} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
                  </RevealItem>
                ))}
              </RevealStagger>
            </Blok>
          )}

          {d.past && (
            <Blok id="past-het">
              <Reveal>
                <p className={kicker}>Past het bij je?</p>
                <h2 className={h2}>Voor wie dit is, en voor wie niet.</h2>
              </Reveal>
              <PastHetBijJe wel={d.past.wel} niet={d.past.niet} />
            </Blok>
          )}

          <Blok id="zo-werkt-het">
            <Reveal>
              <p className={kicker}>Werkwijze</p>
              <h2 className={h2}>{d.stappen.kop}</h2>
            </Reveal>
            <Stappen items={d.stappen.items} />
            {d.stappen.link && (
              <p className="mt-6">
                <PijlLink href={d.stappen.link.href}>{d.stappen.link.label}</PijlLink>
              </p>
            )}
          </Blok>

          <Blok id="prijzen">
            <Reveal>
              <p className={kicker}>Prijzen</p>
              <h2 className={h2}>{d.prijzen.kop}</h2>
            </Reveal>
            {d.prijzen.inhoud}
          </Blok>

          <Blok id="veelgestelde-vragen">
            <div className="grid gap-10 lg:grid-cols-12">
              <Reveal className="lg:col-span-4">
                <p className={kicker}>FAQ</p>
                <h2 className={h2}>Veelgestelde vragen.</h2>
              </Reveal>
              <Reveal className="lg:col-span-8">
                <Veelgesteld vragen={d.vragen} />
              </Reveal>
            </div>
          </Blok>

          <div className="mt-6">
            <DienstCta kop={d.cta.kop} tekst={d.cta.tekst} />
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

/** Tekstblok voor in de prijzensectie. */
export function PrijsTekst({ children }: { children: ReactNode }) {
  return <p className="mt-6 max-w-3xl text-[15px] leading-relaxed text-white/70">{children}</p>;
}
