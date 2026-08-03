import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "./Hero";
import About from "./About";
import Skills from "./Skills";
import ExperiencePage from "./Experience";
import Projects from "./Projects";
import Certificate from "./Certificate";
import Social from "./Social";
import Contact from "./Contact";

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash
      ? location.hash.replace("#", "")
      : location.pathname.replace("/", "");

    if (hash && hash !== "") {
      const element = document.getElementById(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  return (
    <main className="snap-container">
      <section id="hero" className="snap-section">
        <Hero />
      </section>
      <section id="about" className="snap-section">
        <About />
      </section>
      <section id="experience" className="snap-section">
        <ExperiencePage />
      </section>
      <section id="skills" className="snap-section">
        <Skills />
      </section>
      <section id="projects" className="snap-section">
        <Projects />
      </section>
      <section id="certificates" className="snap-section">
        <Certificate />
      </section>
      <section id="social" className="snap-section">
        <Social />
      </section>
      <section id="contact" className="snap-section">
        <Contact />
      </section>
    </main>
  );
};

export default Home;
