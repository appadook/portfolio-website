'use client';
import Navbar from "@/components/Navbar";
import ProjectSlider from "@/components/ProjectSlider";
import HeroSection from "@/components/HeroSection";
import Skills from "@/components/Skills";
import ProgrammingLanguages from "@/components/ProgrammingLanguages"; 
import ContactForm from "@/components/ContactForm"; // Assuming you've added the contact form as well

export default function Home() {
  return (
    <div>
      <Navbar />
      <main className="pt-20">
        <HeroSection />
        <ProjectSlider />
        <Skills />
        <ProgrammingLanguages />
        <ContactForm />
      </main>
    </div>
  );
}
