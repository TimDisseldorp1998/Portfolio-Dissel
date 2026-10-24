import type { ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { kennisArtikelen } from "@/lib/kennis";
import { artikelSchema, faqSchema } from "@/lib/structured-data";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Kruimelpad } from "@/components/Kruimelpad";
import { JsonLd } from "@/components/JsonLd";
import { Container } from "@/components/ui/Container";
import { Veelgesteld } from "@/components/Veelgesteld";
import { DienstCta, tekstLink } from "@/components/dienst/onderdelen";

export const tussenkop = "mt-14 font-heading text-2xl font-semibold text-white sm:text-3xl";
export const alinea = "mt-4 text-lg leading-relaxed text-white/75";
/** Link midden in een alinea. */
export const inlineLink =
  "rounded-sm font-medium text-white underline decoration-white/30 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";

/** Vetgedrukt begin van een alinea. */
export function Vet({ children }: { children: ReactNode }) {
  return <strong className="font-semibold text-white">{children}</strong>;
}

/**
 * Tabel in een artikel: eerste kolom als rijkop, zelfde vorm als PrijsTabel.
 * Op een telefoon staat elke rij gestapeld; bij drie of meer kolommen krijgt
 * elke cel daar het kolomlabel erboven, anders worden de kolommen te smal.
 */
export function Tabel({ kop, rijen }: { kop: string[]; rijen: ReactNode[][] }) {
  const labels = kop.length > 2;
  return (
    <div className="mt-6 overflow-hidden rounded-3xl bg-white/[0.04]">
      <table className="w-full text-left text-[15px] max-sm:block">
        <thead className="max-sm:hidden">
          <tr className="border-b border-white/[0.08] text-xs uppercase tracking-[0.14em] text-white/60">
            {kop.map((k) => (
              <th key={k} scope="col" className="px-6 py-4 font-medium">
                {k}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="max-sm:block">
          {rijen.map(([eerste, ...rest], i) => (
            <tr key={i} className="border-b border-white/[0.06] align-top last:border-0 max-sm:block max-sm:px-5 max-sm:py-4">
              <th scope="row" className="px-6 py-4 font-medium text-white max-sm:block max-sm:p-0">
                {eerste}
              </th>
              {rest.map((cel, j) => (
                <td
                  key={j}
                  data-label={labels ? kop[j + 1] : undefined}
                  className={`px-6 py-4 text-white/70 max-sm:block max-sm:px-0 max-sm:pb-0 ${
                    labels
                      ? "max-sm:pt-3 max-sm:before:block max-sm:before:text-[11px] max-sm:before:uppercase max-sm:before:tracking-[0.14em] max-sm:before:text-white/50 max-sm:before:content-[attr(data-label)]"
                      : "max-sm:pt-1"
                  }`}
                >
                  {cel}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Lijst met de andere kennisartikelen, onder een artikel en op /website-laten-maken/. */
export function MeerVragen({ behalve, className = "" }: { behalve?: string; className?: string }) {
  const andere = kennisArtikelen.filter((a) => a.pad !== behalve);
  return (
    <ul className={`grid gap-3 sm:grid-cols-2 ${className}`}>
      {andere.map((a) => (
        <li key={a.pad}>
          <a
            href={a.pad}
            className="group flex h-full items-center justify-between gap-4 rounded-2xl bg-white/[0.04] px-5 py-4 text-white transition-colors hover:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <span className="font-medium">{a.vraag}</span>
            <ArrowRight
              size={18}
              aria-hidden
              className="shrink-0 text-white/50 transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
            />
          </a>
        </li>
      ))}
    </ul>
  );
}

/**
 * Eén kennisartikel: de vraag als H1, eerst het korte antwoord (dat pakken
 * Google en AI-assistenten op), dan de uitleg, FAQ, de andere vragen en de
 * gesprek-knop. Bewust zonder beeld: deze pagina's moeten snel scanbaar zijn
 * (docs/beelden.md). Hangt in de URL onder de dienst.
 */
export function Artikel({
  pad,
  omschrijving,
  kortAntwoord,
  vragen,
  cta,
  children,
}: {
  pad: string;
  /** Meta-description; ook in het Article-schema. */
  omschrijving: string;
  kortAntwoord: ReactNode;
  vragen: { vraag: string; antwoord: string }[];
  cta: { kop: string; tekst: string };
  children: ReactNode;
}) {
  const artikel = kennisArtikelen.find((a) => a.pad === pad);
  if (!artikel) throw new Error(`${pad} staat niet in lib/kennis.ts`);

  return (
    <>
      <JsonLd data={artikelSchema({ pad, titel: artikel.vraag, omschrijving, datum: artikel.datum })} />
      <JsonLd data={faqSchema(vragen)} />
      <Navbar />
      <main id="main" className="bg-surface-dark text-white">
        <Container className="pb-20 pt-12 md:pb-28 lg:pt-36">
          {/* Kruimels volgen de URL (onder de dienst), niet /kennis/. */}
          <Kruimelpad
            kruimels={[
              { naam: "Diensten", href: "/diensten/" },
              { naam: "Website laten maken", href: "/website-laten-maken/" },
              { naam: artikel.vraag, href: pad },
            ]}
          />

          <article className="mt-8 max-w-3xl">
            <h1 className="font-heading text-[clamp(2rem,7vw,3.25rem)] font-semibold leading-[1.15] tracking-tight">
              {artikel.vraag}
            </h1>
            <p className={alinea}>
              <Vet>Het korte antwoord.</Vet> {kortAntwoord}
            </p>

            {children}

            <h2 className={tussenkop}>Veelgestelde vragen</h2>
            <div className="mt-4">
              <Veelgesteld vragen={vragen} />
            </div>
          </article>

          <section aria-labelledby="meer-vragen" className="mt-16 max-w-3xl">
            <h2 id="meer-vragen" className="font-heading text-2xl font-semibold text-white">
              Meer vragen over een website laten maken
            </h2>
            <MeerVragen behalve={pad} className="mt-6" />
            <p className="mt-6">
              <a href="/kennis/" className={tekstLink}>
                Alle vragen op een rij
                <ArrowRight size={16} aria-hidden />
              </a>
            </p>
          </section>

          <div className="mt-16">
            <DienstCta
              kop={cta.kop}
              tekst={cta.tekst}
              onder={
                <a href="/website-laten-maken/" className={tekstLink}>
                  <ArrowLeft size={16} aria-hidden />
                  Naar Website laten maken
                </a>
              }
            />
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
