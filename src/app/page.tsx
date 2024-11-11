'use client';
import Navbar from "@/components/Navbar";
import ProjectSlider from "@/components/ProjectSlider";
import HeroSection from "@/components/HeroSection";
import ProgrammingLanguages from "@/components/ProgrammingLanguages";
import Technologies from "@/components/Technologies"; 
import ContactForm from "@/components/ContactForm"; 
import Skills from "@/components/Skills";


export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        <HeroSection />
        <ProjectSlider />
        <Skills />
        <ContactForm />
      </main>
    </div>
  );
}
