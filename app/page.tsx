import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Feitenstrook } from "@/components/Feitenstrook";
import { Services } from "@/components/Services";
import { OverMijKort } from "@/components/Bento";
import { Projects } from "@/components/Projects";
import { Pakketten } from "@/components/Pakketten";
import { VeelgesteldHome } from "@/components/VeelgesteldHome";
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
        <Projects />
        <Pakketten />
        <OverMijKort />
        <VeelgesteldHome />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
