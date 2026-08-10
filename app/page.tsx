import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Bento } from "@/components/Bento";
import { Projects } from "@/components/Projects";
import { Testimonials } from "@/components/Testimonials";
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
        <Testimonials />
        <Bento />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
