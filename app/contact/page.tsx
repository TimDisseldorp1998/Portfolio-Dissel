import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle } from "lucide-react";
import { LinkedinFilled, InstagramFilled } from "@/components/ui/BrandIcons";
import { site, socials } from "@/lib/content";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Kruimelpad } from "@/components/Kruimelpad";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/ContactForm";
import { KoffieIcoon } from "@/components/ui/KoffieIcoon";

const TITEL = "Contact | Plan een kennismaking met DisselDesign";
const OMSCHRIJVING =
  "Plan een gratis kennismaking van 20 minuten of mail info@disseldesign.com. Gevestigd in Heiloo, Noord-Holland. Reactie binnen twee werkdagen.";

export const metadata: Metadata = {
  title: TITEL,
  description: OMSCHRIJVING,
  alternates: { canonical: "/contact/" },
  openGraph: {
    title: TITEL,
    description: OMSCHRIJVING,
    type: "website",
    locale: "nl_NL",
    url: "/contact/",
  },
  twitter: { title: TITEL, description: OMSCHRIJVING },
};

// Dezelfde merkiconen als in de footer en op home.
const socialIcoon: Record<string, typeof LinkedinFilled> = {
  Linkedin: LinkedinFilled,
  Instagram: InstagramFilled,
};

const linkStijl =
  "rounded-sm text-white underline decoration-white/30 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";

/** Contactpagina: hetzelfde formulier als op home (ContactForm), plus de
 *  gegevens om zelf contact op te nemen. */
export default function ContactPagina() {
  return (
    <>
      <Navbar />
      <main id="main" className="bg-surface-dark text-white">
        <Container className="pb-20 pt-12 md:pb-28 lg:pt-36">
          <Kruimelpad kruimels={[{ naam: "Contact", href: "/contact/" }]} />

          <div className="mt-8 grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-primary">
                Contact
              </p>
              <h1 className="font-heading text-[clamp(2rem,7vw,3.25rem)] font-semibold leading-[1.15] tracking-tight">
                <span className="text-white/[0.55]">Klaar om te groeien?</span>{" "}
                <span className="text-white">Plan een kennismaking.</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-white/70">
                <KoffieIcoon size="sm" className="mr-2 inline-block align-[-2px] text-primary" />
                Plan een vrijblijvende kennismaking van 20 minuten. Vertel me waar je
                naartoe wilt met je merk of product. Ik denk direct met je mee
                over hoe we daar sneller komen. Geen verplichtingen, gewoon een
                goed gesprek.
              </p>

              <ul className="mt-10 space-y-4 text-white/80">
                <li className="flex items-center gap-3">
                  <Mail size={18} aria-hidden className="shrink-0 text-primary" />
                  <a href={`mailto:${site.email}`} className={linkStijl}>
                    {site.email}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <MessageCircle size={18} aria-hidden className="shrink-0 text-primary" />
                  <a
                    href={site.whatsapp.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkStijl}
                  >
                    WhatsApp
                  </a>
                </li>
                {socials.map((s) => {
                  const Icoon = socialIcoon[s.icon];
                  return (
                    <li key={s.label} className="flex items-center gap-3">
                      {Icoon && (
                        <span aria-hidden className="shrink-0 text-primary">
                          <Icoon size={18} />
                        </span>
                      )}
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={linkStijl}
                      >
                        {s.label}
                        <span className="sr-only"> van Tim Disseldorp (opent in nieuw tabblad)</span>
                      </a>
                    </li>
                  );
                })}
                <li className="flex items-center gap-3">
                  <MapPin size={18} aria-hidden className="shrink-0 text-primary" />
                  Gevestigd in Heiloo, Noord-Holland
                </li>
                <li className="flex items-center gap-3">
                  <Clock size={18} aria-hidden className="shrink-0 text-primary" />
                  Reactie binnen twee werkdagen
                </li>
              </ul>
            </div>

            <ContactForm className="lg:col-span-7" />
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
