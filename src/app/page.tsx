'use client';
import Navbar from "@/components/Navbar";
import ProjectSlider from "@/components/ProjectSlider";
import HeroSection from "@/components/HeroSection";
import ContactForm from "@/components/ContactForm"; 
import Skills from "@/components/Skills";
import SlideRight from "@/components/ui/SlideRight";
import WorkExperience from "@/components/WorkExperience";
import ParticleBackground from "@/components/ParticleBackground";

export default function Home() {
  return (
    <div className="min-h-screen">
      <ParticleBackground />
      <Navbar />
      <main className="pt-20">
        <HeroSection />
        <ProjectSlider />
        <SlideRight />
        <Skills />
        <SlideRight />
        <WorkExperience />
        <SlideRight />
        <ContactForm />
      </main>
    </div>
  );
}
