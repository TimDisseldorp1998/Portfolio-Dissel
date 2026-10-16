import { Mail } from "lucide-react";
import { site, socials } from "@/lib/content";
import { Section } from "./ui/Section";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import { LinkedinFilled, InstagramFilled } from "./ui/BrandIcons";
import { ContactForm } from "./ContactForm";

const brandIcons: Record<string, (props: { size?: number }) => JSX.Element> = {
  Linkedin: LinkedinFilled,
  Instagram: InstagramFilled,
};

/** Contactsectie op home: intro en socials links, het formulier rechts. Het
 *  formulier zelf is gedeeld met /contact/. */
export function Contact() {
  return (
    <Section id="contact" variant="dark">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12">
          {/* Left column: intro + socials */}
          <div className="lg:col-span-5">
            <Reveal>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-primary">
                Contact
              </p>
              <h2 className="mb-6 font-heading text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
                <span className="text-white/[0.55]">Klaar om te groeien?</span>{" "}
                <span className="text-white">Plan een gesprek.</span>
              </h2>
              <p className="mb-8 text-lg leading-relaxed text-white/70">
                Plan een vrijblijvend gesprek van 20 minuten.
                <br />
                Vertel me waar je naartoe wilt met je merk of product. Ik denk
                direct met je mee over hoe we daar sneller komen. Geen
                verplichtingen, gewoon een goed gesprek.
              </p>

              {/* Socials */}
              <div className="mt-10">
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-white/50">
                  Socials
                </p>
                <div className="flex gap-2">
                  {socials.map((s) => {
                    const Icon = brandIcons[s.icon];
                    if (!Icon) return null;
                    return (
                      <a
                        key={s.label}
                        href={s.href}
                        aria-label={`${s.a11yLabel}, opent in nieuw tabblad`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 transition-[background-color,border-color,color,box-shadow] duration-200 hover:border-primary/40 hover:bg-white/[0.06] hover:text-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/25"
                      >
                        <Icon size={18} />
                      </a>
                    );
                  })}
                  <a
                    href={`mailto:${site.email}`}
                    aria-label={`Mail naar ${site.email}`}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 transition-[background-color,border-color,color,box-shadow] duration-200 hover:border-primary/40 hover:bg-white/[0.06] hover:text-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/25"
                  >
                    <Mail size={18} aria-hidden />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Rechterkolom: het formulier. Op mobiel staat het onder de intro;
              `#contact-form` is het doel van de kennismakingsknoppen. */}
          <ContactForm className="lg:col-span-7" />
        </div>
      </Container>
    </Section>
  );
}
