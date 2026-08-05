import { Section } from "./ui/Section";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import { Button } from "./ui/Button";
import { site } from "@/lib/content";

export function Cta() {
  return (
    <Section id="call-to-action" variant="dark">
      <Container>
        <Reveal>
          <h2 className="font-heading text-3xl text-white">{site.cta.kop}</h2>
          <p className="mt-6 max-w-[40ch] text-lg leading-relaxed text-white/70">{site.cta.intro}</p>
          <Button variant="primary" size="md" href="/werk" className="mt-10">
            {site.cta.knop}
          </Button>
        </Reveal>
      </Container>
    </Section>
  );
}
