import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { reviews } from "@/lib/content";
import {
  DIENSTEN,
  alleCases,
  labelTekst,
  vindCase,
  volgendeCase,
} from "@/lib/werk";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Kruimelpad } from "@/components/Kruimelpad";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

/**
 * Casepagina, één per bestand in content/werk/. Volgorde volgens het
 * stramien uit het informatiestructuurplan: klant, vraag en label ·
 * uitgangssituatie · aanpak met beelden · wat ik opleverde · resultaat of
 * quote · ingezette diensten · volgende case en CTA. De middelste stukken
 * staan in het MDX-bestand zelf, de rest komt uit de meta.
 */

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

const kop =
  "font-heading text-2xl font-semibold leading-tight text-white sm:text-3xl";

export default async function CasePagina({ params }: Props) {
  const c = await vindCase(params.slug);
  if (!c) notFound();
  const volgende = await volgendeCase(c.slug);
  const review = reviews.find((r) => r.case === c.slug);
  const { Inhoud } = c;

  return (
    <>
      <Navbar />
      <main id="main" className="bg-surface-dark text-white">
        <Container className="pb-20 pt-12 md:pb-28 lg:pt-36">
          <Kruimelpad
            kruimels={[
              { naam: "Werk", href: "/werk/" },
              { naam: c.klant, href: `/werk/${c.slug}/` },
            ]}
          />

          {/* Klant, vraag en label */}
          <header className="mt-8 max-w-3xl">
            {c.label && (
              <p className="mb-4 inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-white/80">
                {labelTekst(c.label)}
              </p>
            )}
            <h1 className="font-heading text-[clamp(2rem,7vw,3.25rem)] font-semibold leading-[1.15] tracking-tight">
              {c.klant}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/75">
              {c.kaarttekst}
            </p>
            <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4 text-sm">
              <div>
                <dt className="text-xs font-medium uppercase tracking-[0.22em] text-primary">
                  Rol
                </dt>
                <dd className="mt-1 text-white/80">{c.rol}</dd>
              </div>
              {c.jaar && (
                <div>
                  <dt className="text-xs font-medium uppercase tracking-[0.22em] text-primary">
                    Jaar
                  </dt>
                  <dd className="mt-1 text-white/80">{c.jaar}</dd>
                </div>
              )}
              <div>
                <dt className="text-xs font-medium uppercase tracking-[0.22em] text-primary">
                  Type
                </dt>
                <dd className="mt-1 text-white/80">{c.type}</dd>
              </div>
            </dl>
            {c.liveUrl && (
              <a
                href={c.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-sm text-sm font-medium text-white underline decoration-white/30 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Bekijk de live site van {c.klant}
                <ArrowUpRight size={16} aria-hidden />
                <span className="sr-only">(opent in nieuw tabblad)</span>
              </a>
            )}
          </header>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={c.kaartbeeld}
            alt=""
            width={1254}
            height={1254}
            decoding="async"
            {...{ fetchpriority: "high" }}
            className="mt-12 aspect-[4/3] w-full rounded-3xl bg-white/[0.04] object-cover sm:aspect-[16/9]"
          />

          {/* Uitgangssituatie, aanpak, wat ik opleverde en resultaat: uit het
              MDX-bestand. */}
          <article className="mt-16 max-w-4xl md:mt-20">
            <Inhoud />

            {review && (
              <figure className="mt-10 rounded-[20px] bg-white/[0.045] p-[26px] md:p-8">
                <blockquote className="text-lg leading-relaxed text-white/[0.85]">
                  <p>{review.quote}</p>
                </blockquote>
                <figcaption className="mt-5">
                  <span className="block font-heading text-sm font-semibold text-white">
                    {review.author ?? review.company}
                  </span>
                  {review.role && (
                    <span className="mt-0.5 block text-xs text-white/50">
                      {review.role}
                    </span>
                  )}
                </figcaption>
              </figure>
            )}
          </article>

          {/* Ingezette diensten. Fase 2 maakt hier links van naar de
              dienstpagina's; de sleutels in DIENSTEN worden dan de URL. */}
          <section aria-labelledby="diensten" className="mt-16 md:mt-20">
            <h2 id="diensten" className={kop}>
              Ingezette diensten
            </h2>
            <ul className="mt-6 flex flex-wrap gap-2">
              {c.diensten.map((d) => (
                <li
                  key={d}
                  className="rounded-full bg-white/[0.06] px-4 py-2 text-sm text-white/80"
                >
                  {DIENSTEN[d]}
                </li>
              ))}
            </ul>
          </section>

          <section
            aria-labelledby="zelf-zoiets"
            className="mt-16 rounded-3xl bg-white/[0.04] p-8 md:mt-20 md:p-12"
          >
            <h2 id="zelf-zoiets" className={kop}>
              Zelf zoiets?
            </h2>
            <p className="mt-4 max-w-[60ch] leading-relaxed text-white/75">
              {c.cta}
            </p>
            <div className="mt-8">
              <Button
                href="/contact/"
                variant="primary"
                size="lg"
                data-cta="plan_kennismaking"
              >
                Plan een kennismaking
                <ArrowRight size={18} aria-hidden />
              </Button>
            </div>
          </section>

          <nav aria-label="Volgende case" className="mt-16 md:mt-20">
            <a
              href={`/werk/${volgende.slug}/`}
              className="group flex items-center justify-between gap-6 border-y border-white/[0.08] py-8 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <span>
                <span className="block text-xs font-medium uppercase tracking-[0.22em] text-white/50">
                  Volgende case
                </span>
                <span className="mt-2 block font-heading text-2xl font-semibold text-white transition-colors group-hover:text-primary sm:text-3xl">
                  {volgende.klant}
                </span>
              </span>
              <span
                aria-hidden
                className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary transition-[background-color,color,transform] duration-300 group-hover:translate-x-1 group-hover:bg-secondary group-hover:text-white"
              >
                <ArrowRight size={20} />
              </span>
            </a>
          </nav>
        </Container>
      </main>
      <Footer />
    </>
  );
}
