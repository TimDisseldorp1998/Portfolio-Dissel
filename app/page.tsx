import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { OverMijKort } from "@/components/Bento";
import { Projects } from "@/components/Projects";
import { Werkwijze } from "@/components/Werkwijze";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Services />
        <Projects />
        <Werkwijze />
        <OverMijKort />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
