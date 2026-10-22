import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { site, socials } from "@/lib/content";
import { alleCases } from "@/lib/werk";
import { Container } from "./ui/Container";
import { Logo } from "./Logo";
import { CookieVoorkeurenKnop } from "./footer/CookieVoorkeurenKnop";
import { FooterKolommenOpen } from "./footer/FooterKolommenOpen";
import { KoffieIcoon } from "./ui/KoffieIcoon";

/**
 * Footer volgens het informatiestructuurplan: DisselDesign, Werk, Diensten,
 * Populair en Contact, plus de onderbalk. Regio en Kennis komen erbij zodra
 * die pagina's bestaan; de footer linkt nooit naar een pagina die er nog
 * niet is.
 *
 * Servercomponent: de Werk-kolom komt rechtstreeks uit content/werk/, dus een
 * nieuwe case staat hier vanzelf.
 */

type FooterLink = {
  naam: string;
  href: string;
  extern?: boolean;
  cta?: boolean;
};

const linkStijl =
  "rounded text-sm text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30";
// white/50, niet /45: op #0a0a0f haalt /45 maar 4,48:1 en zakt net onder 4,5.
const onderbalkStijl =
  "rounded text-xs text-white/50 underline-offset-4 transition-colors hover:text-white/70 hover:underline focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30";

function Kolom({
  titel,
  links,
  extra,
}: {
  titel: string;
  links: FooterLink[];
  extra?: React.ReactNode;
}) {
  return (
    <details
      data-footer-kolom
      className="group border-b border-white/10 md:border-0 [&_summary::-webkit-details-marker]:hidden"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 md:cursor-default md:py-0">
        {titel}
        <ChevronDown
          size={18}
          aria-hidden
          className="text-white/50 transition-transform duration-300 group-open:rotate-180 md:hidden"
        />
      </summary>
      <ul className="space-y-3 pb-5 md:mt-5 md:pb-0">
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className={linkStijl}
              {...(l.cta ? { "data-cta": "plan_kennismaking" } : {})}
              {...(l.extern
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {l.cta && <KoffieIcoon size="sm" className="mr-2 inline-block align-[-3px]" />}
              {l.naam}
              {l.extern && <span className="sr-only"> (opent in nieuw tabblad)</span>}
            </a>
          </li>
        ))}
        {extra}
      </ul>
    </details>
  );
}

export async function Footer() {
  const cases = await alleCases();

  const werk: FooterLink[] = [
    ...cases.map((c) => ({
      naam: c.korteNaam ?? c.klant,
      href: `/werk/${c.slug}/`,
    })),
    { naam: "Alle projecten", href: "/werk/" },
  ];

  // Website laten maken staat onder Populair, dus hier niet nog een keer.
  const diensten: FooterLink[] = [
    { naam: "Huisstijl laten maken", href: "/huisstijl-laten-maken/" },
    { naam: "UX/UI design", href: "/ux-ui-design/" },
    { naam: "Website verbeteren", href: "/website-verbeteren/" },
    { naam: "Voor bureaus", href: "/voor-bureaus/" },
    { naam: "Alle diensten", href: "/diensten/" },
  ];

  // Populair: de pagina's waar de meeste ondernemers op zoeken. Groeit mee
  // met stap 4 (regiopagina's), alleen pagina's die live staan.
  const populair: FooterLink[] = [
    { naam: "Website laten maken", href: "/website-laten-maken/" },
    { naam: "Wat kost een website?", href: "/website-laten-maken/wat-kost-een-website/" },
  ];

  const contact: FooterLink[] = [
    { naam: site.email, href: `mailto:${site.email}` },
    { naam: "WhatsApp", href: site.whatsapp.href, extern: true },
    { naam: "Plan een gesprek", href: "/contact/", cta: true },
    ...socials.map((s) => ({ naam: s.label, href: s.href, extern: true })),
  ];

  return (
    <footer className="relative border-t border-white/10 bg-surface-dark text-white">
      <FooterKolommenOpen />
      <Container className="grid gap-10 py-14 md:gap-12 lg:grid-cols-[1fr_3fr]">
        <div className="max-w-sm">
          <Link
            href="/"
            aria-label="DisselDesign, naar de homepage"
            className="inline-flex rounded text-white transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
          >
            <Logo className="h-11 w-auto" />
          </Link>
          <p className="mt-6 text-sm leading-relaxed text-white/70">
            Digitale Product Designer. Websites, huisstijlen en interfaces, van
            eerste schets tot live site.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-white/70">
            Gevestigd in Heiloo. Werkt voor opdrachtgevers in de regio Alkmaar
            en daarbuiten.
          </p>
        </div>

        {/* Op mobiel één grens boven de uitklapblokken; de kolommen hebben
            er elk een onder. Vanaf tablet vier kolommen naast elkaar. */}
        <nav
          aria-label="Footer"
          className="border-t border-white/10 md:grid md:grid-cols-4 md:gap-8 md:border-0"
        >
          <Kolom titel="Werk" links={werk} />
          <Kolom titel="Diensten" links={diensten} />
          <Kolom titel="Populair" links={populair} />
          <Kolom
            titel="Contact"
            links={contact}
            extra={<li className="text-sm text-white/50">Heiloo, Noord-Holland</li>}
          />
        </nav>
      </Container>

      {/* Extra ruimte onderin tot lg: daar staat de navigatie vast onderaan het
          scherm en viel hij anders over de laatste regel. */}
      <Container className="flex flex-col items-center gap-3 border-t border-white/10 pb-32 pt-8 md:flex-row md:justify-between lg:pb-8">
        <p className="text-center text-xs text-white/50">
          © {process.env.NEXT_PUBLIC_BUILD_YEAR} {site.name} · KvK {site.kvk} · btw-id {site.btw}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <Link href="/privacy/" className={onderbalkStijl}>
            Privacy &amp; cookies
          </Link>
          <Link href="/voor-ai/" className={onderbalkStijl}>
            Alles over DisselDesign
          </Link>
          <CookieVoorkeurenKnop className={onderbalkStijl} />
        </div>
      </Container>
    </footer>
  );
}
