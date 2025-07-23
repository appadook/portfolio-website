<<<<<<< HEAD

import React, { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Experience from '@/components/sections/Experience';
import Skills from '@/components/sections/Skills';
import Contact from '@/components/sections/Contact';

const Index = () => {
  useEffect(() => {
    // On page load, reset scroll position to top
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Contact />
      </main>
      
      <Footer />
=======
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import ExperienceSection from '@/components/ExperienceSection';
import SkillsSection from '@/components/SkillsSection';
import TechnologiesSection from '@/components/TechnologiesSection';
import ContactSection from '@/components/ContactSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ExperienceSection />
      <SkillsSection />
      <TechnologiesSection />
      <ContactSection />
      
      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © 2025 Kurtik Appadoo. Built with React, TypeScript, and Tailwind CSS.
          </p>
        </div>
      </footer>
>>>>>>> dev
    </div>
  );
};

export default Index;
