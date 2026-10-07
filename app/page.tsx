import NavBar from "./navbar/NavBar";
import Hero from "./hero-section/Hero";
import About from "./about-section/About";
import Services from "./services-section/Services";
import Works from "./works-section/Works";
import Contact from "./contact-section/Contact";
import Footer from "./footer/Footer";
import Reveal from "./components/Reveal";

export default function Home() {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <Reveal>
          <About />
        </Reveal>
        <Reveal>
          <Services />
        </Reveal>
        <Reveal>
          <Works />
        </Reveal>
        <Reveal>
          <Contact />
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
