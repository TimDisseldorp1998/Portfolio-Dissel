import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Feitenstrook } from "@/components/Feitenstrook";
import { Services } from "@/components/Services";
import { OverMijKort } from "@/components/Bento";
import { Projects } from "@/components/Projects";
import { Testimonials } from "@/components/Testimonials";
import { Pakketten } from "@/components/Pakketten";
import { Voordelen } from "@/components/Voordelen";
import { VeelgesteldHome } from "@/components/VeelgesteldHome";
import { Werkwijze } from "@/components/Werkwijze";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Feitenstrook />
        <Services />
        <Pakketten />
        <Projects />
        <Testimonials />
        <Voordelen />
        <Werkwijze />
        <OverMijKort />
        <VeelgesteldHome />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
