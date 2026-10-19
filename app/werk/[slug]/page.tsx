import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { ExternalLink } from "lucide-react";
import { reviews } from "@/lib/content";
import {
  DIENSTEN,
  alleCases,
  carouselSlides,
  heroBeeld,
  labelTekst,
  vindCase,
  volgendeCase,
  vorigeCase,
} from "@/lib/werk";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Kruimelpad } from "@/components/Kruimelpad";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal, RevealItem, RevealStagger } from "@/components/ui/Reveal";
import { CaseCarousel } from "@/components/werk/CaseCarousel";
import { CaseNavigatie } from "@/components/werk/CaseNavigatie";
import { KoffieIcoon } from "@/components/ui/KoffieIcoon";

/**
 * Casepagina, één per bestand in content/werk/. Volgorde volgens het
 * stramien uit het informatiestructuurplan: klant, vraag en label ·
 * uitgangssituatie · aanpak met beelden · wat ik opleverde · resultaat of
 * quote · ingezette diensten · volgende case en CTA. De middelste stukken
 * staan in het MDX-bestand zelf, de rest komt uit de meta.
 *
 * Vorm en beweging komen uit de oude case-popup: één leeskolom, de carousel
 * bovenaan met de feiten over het beeld, kleine sectiekopjes. De kop komt op
 * zoals de hero, de rest schuift in beeld bij het scrollen.
 */

/** Vertraging voor de entree-animatie (.mount-rise in globals.css). */
const vertraging = (s: number) => ({ "--rise-delay": `${s}s` }) as CSSProperties;

type Props = { params: { slug: string } };


// Geen `dynamicParams = false`: in Next 14.2 laat dat `npm run dev` met een
// statische export op elke casepagina een 500 geven. Het is ook niet nodig:
// de export bouwt alleen deze slugs, en een onbekende slug geeft notFound().
export async function generateStaticParams() {
  return (await alleCases()).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = await vindCase(params.slug);
  if (!c) return {};
  const url = `/werk/${c.slug}/`;
  return {
    title: c.seoTitel,
    description: c.kaarttekst,
    alternates: { canonical: url },
    openGraph: {
      title: c.seoTitel,
      description: c.kaarttekst,
      type: "website",
      locale: "nl_NL",
      url,
      images: [{ url: c.kaartbeeld, alt: c.klant }],
    },
    twitter: { title: c.seoTitel, description: c.kaarttekst },
  };
}

/** Zelfde klein kopje als de secties uit het MDX-bestand. */
const kicker = "text-xs font-medium uppercase tracking-[0.22em] text-white/60";

export default async function CasePagina({ params }: Props) {
  const c = await vindCase(params.slug);
  if (!c) notFound();
  const volgende = await volgendeCase(c.slug);
  const vorige = await vorigeCase(c.slug);
  const review = reviews.find((r) => r.case === c.slug);
  const { Inhoud } = c;

  return (
    <>
      <Navbar />
      <main id="main" className="bg-surface-dark text-white">
        {/* Grote foto over de volle breedte. Hier landt de overgang vanaf de
            vorige/volgende-kaart; de maten staan ook in CaseNavigatie. */}
        <div
          data-case-hero
          className="relative h-[75svh] min-h-[22rem] w-full"
          style={{ backgroundColor: c.kaart.kleur }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={heroBeeld(c)}
            alt=""
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div aria-hidden className="absolute inset-x-0 -bottom-px h-1/2 bg-[linear-gradient(to_top,#0a0a0f,rgba(10,10,15,0))]" />
        </div>
        <Container className="pb-20 pt-8 md:pb-24 lg:pt-12">
          <div className="mx-auto max-w-4xl">
            <Kruimelpad
              kruimels={[
                { naam: "Werk", href: "/werk/" },
                { naam: c.klant, href: `/werk/${c.slug}/` },
              ]}
            />

            {/* Klant, vraag en label. De live-site-knop staat naast de
                titel, zoals in de popup. */}
            <header className="mt-6 flex items-start justify-between gap-4">
              <div>
                {c.label && (
                  <p
                    style={vertraging(0.05)}
                    className="mount-rise mb-3 inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-white/80"
                  >
                    {labelTekst(c.label)}
                  </p>
                )}
                <h1
                  style={vertraging(0.1)}
                  className="mount-rise font-heading text-[clamp(1.875rem,6vw,3rem)] font-semibold leading-[1.15] tracking-tight"
                >
                  {c.klant}
                </h1>
                <p
                  style={vertraging(0.2)}
                  className="mount-rise mt-3 max-w-[60ch] leading-relaxed text-white/70"
                >
                  {c.kaarttekst}
                </p>
              </div>
              {c.liveUrl && (
                <a
                  href={c.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Bekijk de live site van ${c.klant} (opent in nieuw tabblad)`}
                  style={vertraging(0.25)}
                  className="mount-rise inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary transition-[background-color,color,transform] duration-200 hover:-translate-y-0.5 hover:bg-secondary hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary/40"
                >
                  <ExternalLink size={18} aria-hidden />
                </a>
              )}
            </header>

            <div style={vertraging(0.3)} className="mount-rise mt-8">
              <CaseCarousel
                klant={c.klant}
                slides={carouselSlides(c)}
                rol={c.rol}
                jaar={c.jaar}
                type={c.type}
              />
            </div>

            {/* Overzicht, uitdaging, aanpak, wat ik opleverde en resultaat:
                uit het MDX-bestand. */}
            <article className="mt-12">
              <Inhoud />

              {review && (
                <Reveal y={16} className="mt-8">
                  <figure className="rounded-[20px] bg-white/[0.045] p-[26px] md:p-8">
                    <blockquote className="text-lg leading-relaxed text-white/[0.85]">
                      <p>&ldquo;{review.quote}&rdquo;</p>
                    </blockquote>
                    <figcaption className="mt-5">
                      <span className="block font-heading text-sm font-semibold text-white">
                        {review.author ?? review.company}
                      </span>
                      {review.role && (
                        <span className="mt-0.5 block text-xs text-white/60">
                          {review.role}
                        </span>
                      )}
                    </figcaption>
                  </figure>
                </Reveal>
              )}
            </article>

            {/* Ingezette diensten. Fase 2 maakt hier links van naar de
                dienstpagina's; de sleutels in DIENSTEN worden dan de URL. */}
            <section aria-labelledby="diensten" className="mt-10">
              <Reveal y={16}>
                <h2 id="diensten" className={kicker}>
                  Ingezette diensten
                </h2>
              </Reveal>
              <RevealStagger className="mt-4 flex flex-wrap gap-2" stagger={0.06}>
                {c.diensten.map((d) => (
                  <RevealItem key={d} y={12}>
                    <span className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-sm text-white/80">
                      {DIENSTEN[d]}
                    </span>
                  </RevealItem>
                ))}
              </RevealStagger>
            </section>

            {/* CTA, zoals onderaan de popup */}
            <Reveal y={16} className="mt-12">
              <section
                aria-labelledby="zelf-zoiets"
                className="border-t border-white/10 pt-8"
              >
                <h2
                  id="zelf-zoiets"
                  className="font-heading text-xl font-semibold text-white md:text-2xl"
                >
                  Zelf zoiets?
                </h2>
                <p className="mt-3 max-w-[60ch] leading-relaxed text-white/75">
                  {c.cta}
                </p>
                <Button
                  href="/contact/"
                  variant="primary"
                  size="lg"
                  data-cta="plan_kennismaking"
                  className="group mt-6"
                >
                  <KoffieIcoon stoom="hover" />
                  Plan een gesprek
                </Button>
              </section>
            </Reveal>

            {/* Vorige en volgende case. Een klik trekt je de foto in. */}
            <Reveal y={16} className="mt-14">
              <CaseNavigatie
                vorige={{ slug: vorige.slug, klant: vorige.klant, kaartbeeld: heroBeeld(vorige) }}
                volgende={{ slug: volgende.slug, klant: volgende.klant, kaartbeeld: heroBeeld(volgende) }}
              />
            </Reveal>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
