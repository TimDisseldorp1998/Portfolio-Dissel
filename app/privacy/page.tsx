import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { site } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/Logo";

export const metadata: Metadata = {
  title: "Privacy & cookies | Dissel Design",
  description:
    "Hoe DisselDesign omgaat met je gegevens: contactformulier, Google Analytics en je rechten.",
};

/** Kopje + lopende tekst, in de donkere site-stijl. */
function Block({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="mb-3 font-heading text-xl font-semibold text-white">
        {heading}
      </h2>
      <div className="max-w-[68ch] space-y-4 leading-relaxed text-white/75">
        {children}
      </div>
    </section>
  );
}

/** Mail-link in de lopende tekst. */
function Mail() {
  return (
    <a
      href={`mailto:${site.email}`}
      className="text-white underline underline-offset-4 transition-colors hover:text-primary"
    >
      {site.email}
    </a>
  );
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-surface-dark text-white">
      <Container className="py-12 md:py-16">
        <a
          href="/"
          className="inline-flex items-center rounded transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
          aria-label="DisselDesign, terug naar de homepage"
        >
          <Logo className="h-10 w-auto" />
        </a>

        <h1 className="mt-10 font-heading text-3xl font-semibold leading-tight sm:text-4xl">
          Privacy &amp; cookies
        </h1>
        <p className="mt-4 max-w-[68ch] leading-relaxed text-white/75">
          Kort en zonder juridisch jargon: wat ik van je bewaar, waarom, hoe
          lang, en wat jij daarover te zeggen hebt.
        </p>

        <Block heading="Wie ik ben">
          <p>
            DisselDesign is het bedrijf van Tim Disseldorp, digitale product
            designer uit Noord-Holland
            {site.kvk ? `, ingeschreven bij de Kamer van Koophandel onder nummer ${site.kvk}` : ""}
            . Ik bepaal wat er met de gegevens op deze site gebeurt. Vragen
            daarover? Mail naar <Mail />.
          </p>
        </Block>

        <Block heading="Contactformulier">
          <p>
            Vul je het contactformulier in, dan bewaar ik je naam, e-mailadres,
            projecttype en bericht. Die gebruik ik om je aanvraag te
            beantwoorden en een eventuele samenwerking voor te bereiden. Dat is
            ook de grondslag: je gegevens zijn nodig om op je verzoek te
            reageren.
          </p>
          <p>
            Je bericht komt terecht in een database van Supabase, met servers
            in Ierland en dus binnen de Europese Unie. De e-mail zelf wordt
            bezorgd via de dienst FormSubmit. Beide partijen verwerken je
            gegevens alleen om dit formulier te laten werken. Ik verkoop je
            gegevens niet en gebruik ze niet voor reclame.
          </p>
          <p>
            Ik bewaar een inzending maximaal een jaar. Daarna verwijder ik hem,
            tenzij er inmiddels een opdracht uit is gekomen en ik de gegevens
            nodig heb voor de administratie.
          </p>
          <p>
            Het formulier invullen hoeft niet. Doe je het niet, dan kan ik
            alleen niet reageren, want zonder e-mailadres heb ik geen manier om
            je te bereiken.
          </p>
        </Block>

        <Block heading="Google Analytics">
          <p>
            Ik gebruik Google Analytics om te zien hoeveel mensen de site
            bezoeken en welke pagina&apos;s ze bekijken. Dat gebeurt alleen als
            je in de cookie-banner op Accepteren klikt. Jouw toestemming is
            daarvoor de grondslag, en die kun je op elk moment weer intrekken.
          </p>
          <p>
            Klik je op Accepteren, dan plaatst Google cookies waarvan de naam
            met _ga begint. Die blijven maximaal twee jaar staan. Google kan
            deze gegevens ook buiten de Europese Unie verwerken, onder meer in
            de Verenigde Staten. Klik je op Weigeren, dan wordt er niets
            gemeten en komt er geen cookie.
          </p>
          <p>
            Je keuze aanpassen kan altijd: klik onderaan de site op
            &quot;Cookievoorkeuren&quot;.
          </p>
        </Block>

        <Block heading="Je rechten">
          <p>Je mag me altijd vragen om:</p>
          <ul className="ml-5 list-disc space-y-1.5">
            <li>de gegevens die ik van je heb in te zien</li>
            <li>ze te laten corrigeren als er iets niet klopt</li>
            <li>ze te laten verwijderen</li>
            <li>het gebruik ervan tijdelijk te beperken</li>
            <li>bezwaar te maken tegen het gebruik</li>
            <li>ze in een leesbaar bestand aan je over te dragen</li>
            <li>je toestemming voor Google Analytics in te trekken</li>
          </ul>
          <p>
            Eén mailtje naar <Mail /> is genoeg. Ik reageer binnen een maand.
          </p>
        </Block>

        <Block heading="Klacht indienen">
          <p>
            Vind je dat ik niet zorgvuldig met je gegevens omga, laat het me
            weten, dan los ik het op. Kom je er met mij niet uit, dan mag je
            een klacht indienen bij de Autoriteit Persoonsgegevens via{" "}
            <a
              href="https://www.autoriteitpersoonsgegevens.nl"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline underline-offset-4 transition-colors hover:text-primary"
            >
              autoriteitpersoonsgegevens.nl
            </a>
            .
          </p>
        </Block>

        <Block heading="Geen geautomatiseerde besluitvorming">
          <p>
            Ik neem geen besluiten over je op basis van geautomatiseerde
            verwerking of profilering. Alles wat je me stuurt lees ik zelf.
          </p>
        </Block>

        <p className="mt-10 text-sm text-white/45">
          Laatst bijgewerkt: augustus 2026.
        </p>

        <a
          href="/"
          className="mt-10 inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/20 px-5 text-sm font-medium text-white transition-colors hover:border-white/50 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
        >
          <ArrowLeft size={16} aria-hidden />
          Terug naar de site
        </a>
      </Container>
    </main>
  );
}
