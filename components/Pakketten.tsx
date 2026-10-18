import { ArrowRight, Check } from "lucide-react";
import { bedrag, euro, pakketten, type Pakket } from "@/lib/content";
import { cn } from "@/lib/cn";
import { Section } from "./ui/Section";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import { Button } from "./ui/Button";
import { InfoKnop } from "./ui/InfoKnop";
import { KoffieIcoon } from "./ui/KoffieIcoon";

const [landingspagina, website, websiteHuisstijl, huisstijl] = pakketten;
const kaarten = [landingspagina, website, websiteHuisstijl];
const aanrader = websiteHuisstijl.slug;
// Website + huisstijl los gekocht tegenover het pakket: € 999 + € 349 − € 1.199.
const voordeel = bedrag.zonderHuisstijl + bedrag.huisstijlLos - bedrag.metHuisstijl;

const inbegrepenKort = ["Ontwerp op maat", "Getest op elk scherm", "SEO-basis", "Analytics"];
const inbegrepenLang = [
  "Ontwerp op maat, geen template",
  "Getest op telefoon, tablet en desktop",
  "Basis-SEO: paginatitels, beschrijvingen, een sitemap en aanmelding bij Google",
  "Een contactformulier dat in je mail binnenkomt",
  "Google Analytics met cookiebanner",
];

/** Link naar het formulier op home, met het pakket in de URL. ContactForm
 *  vangt de klik op (`data-pakket`) en vult projecttype en bericht in. */
const aanvraag = (p: Pakket) => ({
  href: `/?pakket=${p.slug}#contact-form`,
  "data-pakket": p.slug,
  "data-cta": `pakket_${p.slug.replace("-", "_")}`,
});

const tekstLink =
  "inline-flex min-h-[44px] items-center gap-1.5 rounded-sm font-medium text-white underline decoration-white/30 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";

/** Pakketten met vanaf-prijzen op home, direct na de diensten. */
export function Pakketten() {
  return (
    <Section id="prijzen" variant="dark">
      <Container>
        <Reveal>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-primary">
            Investering
          </p>
          <h2 className="font-heading text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl">
            Jouw investering.
          </h2>
          {/* De enige plek in de sectie waar "excl. btw" staat. */}
          <p className="mt-5 text-base leading-relaxed text-white/70">
            Vaste prijs vooraf. Alle prijzen excl. btw.
          </p>
        </Reveal>

        {/* Eén Reveal voor alles onder de kop: elke Reveal houdt een transform
            en wordt zo een eigen laag. Met losse Reveals zou een open
            info-wolk achter de rij eronder vallen. */}
        <Reveal>
          {/* Vanaf 1024px drie kolommen; elke kaart is een subgrid van vier
              rijen, zodat titel, prijs, regel en knop overal op één lijn
              staan. Van 640 tot 1023px compacte rijen: links titel en regel,
              rechts prijs en knop. */}
          <ul className="mt-10 grid gap-4 md:mt-12 lg:grid-cols-3 lg:gap-5">
            {kaarten.map((p) => {
              const isAanrader = p.slug === aanrader;
              return (
                <li
                  key={p.slug}
                  className={cn(
                    "relative flex flex-col gap-4 rounded-3xl border bg-white/[0.04] p-6 sm:p-7",
                    isAanrader ? "border-primary" : "border-transparent",
                    "sm:max-lg:grid sm:max-lg:grid-cols-[1fr_auto] sm:max-lg:items-center sm:max-lg:gap-x-8 sm:max-lg:gap-y-2",
                    "lg:row-span-4 lg:grid lg:grid-rows-subgrid lg:gap-4"
                  )}
                >
                  {isAanrader && (
                    <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-ink">
                      Aanrader
                    </span>
                  )}

                  <div className="relative flex flex-wrap items-start justify-between gap-x-3 sm:max-lg:col-start-1 sm:max-lg:row-start-1 sm:max-lg:justify-start">
                    <h3 className="font-heading text-lg font-semibold leading-snug text-white">
                      {p.naam}
                    </h3>
                    <InfoKnop label={`Meer over ${p.naam}`}>
                      <p>{p.info}</p>
                    </InfoKnop>
                  </div>

                  <div className="sm:max-lg:col-start-2 sm:max-lg:row-start-1 sm:max-lg:text-right">
                    <p className="flex items-baseline gap-2 sm:max-lg:justify-end">
                      <span className="text-sm text-white/60">vanaf</span>
                      <span className="font-heading text-4xl font-semibold tracking-tight text-white">
                        {euro(p.bedrag)}
                      </span>
                    </p>
                    {isAanrader && (
                      <p className="mt-1.5 text-sm text-primary">
                        {euro(voordeel)} voordeliger dan los
                      </p>
                    )}
                  </div>

                  <p className="text-[15px] leading-relaxed text-white/70 sm:max-lg:col-start-1 sm:max-lg:row-start-2">
                    {p.regel}
                  </p>

                  <div className="sm:max-lg:col-start-2 sm:max-lg:row-start-2 sm:max-lg:justify-self-end lg:self-end">
                    <Button {...aanvraag(p)} variant={isAanrader ? "primary" : "outline"} size="md" className="h-11">
                      Vraag aan
                      <ArrowRight size={16} aria-hidden />
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Huisstijl is geen website: geen vierde kaart, wel één regel. */}
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-3xl bg-white/[0.04] px-6 py-4 sm:px-7 lg:mt-5">
            <p className="text-[15px] leading-relaxed text-white/70">
              <span className="font-heading font-semibold text-white">Alleen een huisstijl?</span>{" "}
              {huisstijl.regel}
            </p>
            <div className="relative flex flex-wrap items-center gap-x-5 sm:ml-auto">
              <p className="flex items-baseline gap-2">
                <span className="text-sm text-white/60">vanaf</span>
                <span className="font-heading text-xl font-semibold text-white">{euro(huisstijl.bedrag)}</span>
              </p>
              <InfoKnop label={`Meer over ${huisstijl.naam}`}>
                <p>{huisstijl.info}</p>
              </InfoKnop>
              <a {...aanvraag(huisstijl)} className={tekstLink}>
                Vraag aan
                <ArrowRight size={16} aria-hidden />
              </a>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/[0.08] pt-6">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {inbegrepenKort.map((item) => (
                <li key={item} className="flex items-center gap-2 text-[15px] text-white/75">
                  <Check size={16} strokeWidth={2.5} aria-hidden className="shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="relative flex flex-wrap items-center sm:ml-auto">
              <InfoKnop label="Wat zit er in elk pakket?" tekst="Wat zit erin?">
                <ul className="space-y-1.5">
                  {inbegrepenLang.map((item) => (
                    <li key={item} className="flex gap-2">
                      <Check size={14} strokeWidth={2.5} aria-hidden className="mt-1 shrink-0 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 border-t border-white/10 pt-3 text-white/70">
                  Niet standaard: onderhoud en hosting (op maat), en zelf teksten aanpassen met een
                  CMS (op aanvraag).
                </p>
              </InfoKnop>
            </div>
          </div>

          <p className="mt-8 text-base leading-relaxed text-white/70">
            Twijfel je welk pakket past?{" "}
            <a href="#contact-form" data-cta="plan_kennismaking" className={tekstLink}>
              <KoffieIcoon size="sm" />
              Plan een kennismaking
            </a>
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
