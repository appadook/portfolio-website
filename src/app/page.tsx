'use client';
import Navbar from "@/components/Navbar";
import ProjectSlider from "@/components/ProjectSlider";
import HeroSection from "@/components/HeroSection";
import Skills from "@/components/Skills";
import Technologies from "@/components/Technologies"; 
import ContactForm from "@/components/ContactForm"; // Assuming you've added the contact form as well

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        <HeroSection />
        <ProjectSlider />
        <Skills />
        <Technologies />
        <ContactForm />
      </main>
    </div>
  );
}
