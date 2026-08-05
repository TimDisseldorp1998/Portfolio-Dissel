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
          Kort en zonder juridisch jargon: wat ik van je bewaar, waarom, en
          wat jij daarover te zeggen hebt.
        </p>

        <Block heading="Wie ik ben">
          <p>
            DisselDesign is het bedrijf van Tim Disseldorp, digitale product
            designer uit Noord-Holland. Vragen over je gegevens? Mail naar{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-white underline underline-offset-4 transition-colors hover:text-primary"
            >
              {site.email}
            </a>
            .
          </p>
        </Block>

        <Block heading="Contactformulier">
          <p>
            Vul je het contactformulier in, dan bewaar ik je naam,
            e-mailadres, projecttype en bericht. Die gebruik ik om je aanvraag
            te beantwoorden, verder niets. Ze staan in een beveiligde database
            (Supabase) en komen per e-mail bij mij binnen. Ik deel ze niet met
            anderen en gebruik ze niet voor marketing.
          </p>
        </Block>

        <Block heading="Google Analytics">
          <p>
            Ik gebruik Google Analytics om te zien hoeveel mensen de site
            bezoeken en welke pagina&apos;s ze bekijken. Dat gebeurt alleen als
            je in de cookie-banner op Accepteren klikt. Google plaatst dan
            cookies waarvan de naam met _ga begint. Klik je op Weigeren, dan
            wordt er niets gemeten en komt er geen cookie.
          </p>
          <p>
            Je keuze aanpassen kan altijd: klik onderaan de site op
            &quot;Cookievoorkeuren&quot;.
          </p>
        </Block>

        <Block heading="Je rechten">
          <p>
            Wil je weten welke gegevens ik van je heb, of wil je dat ik ze
            verwijder? E&eacute;n mailtje naar{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-white underline underline-offset-4 transition-colors hover:text-primary"
            >
              {site.email}
            </a>{" "}
            is genoeg.
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
