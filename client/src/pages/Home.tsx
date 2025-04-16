import { useEffect } from "react";
import Hero from "@/sections/Hero";
import Projects from "@/sections/Projects";
import About from "@/sections/About";
import Skills from "@/sections/Skills";
import Contact from "@/sections/Contact";
import ThreeScene from "@/components/ThreeScene";

const Home = () => {
  useEffect(() => {
    // Initialize reveal animations on scroll
    const revealElements = document.querySelectorAll(".reveal");
    
    const revealOnScroll = () => {
      revealElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add("active");
        }
      });
    };
    
    window.addEventListener("scroll", revealOnScroll);
    // Initial check in case elements are already in view
    revealOnScroll();
    
    return () => {
      window.removeEventListener("scroll", revealOnScroll);
    };
  }, []);
  
  return (
    <>
      <ThreeScene />
      <Hero />
      <Projects />
      <About />
      <Skills />
      <Contact />
    </>
  );
};

export default Home;
