import { useRef } from "react";
import { useParticleBackground } from "../hooks/useParticleBackground";
import { useSpacemanModel } from "../hooks/useSpacemanModel";
import { ProfileSection } from "./ProfileSection";

export default function HeroSection() {
  const backgroundCanvasRef = useRef<HTMLCanvasElement>(null);
  const rightSideCanvasRef = useRef<HTMLCanvasElement>(null);

  useParticleBackground(backgroundCanvasRef);
  useSpacemanModel(rightSideCanvasRef);

  return (
    <section id="about" className="relative h-screen flex overflow-hidden">
      <div 
        className="fixed inset-0 w-full h-full bg-[url('/galaxy-bg.webp')] bg-cover bg-center bg-no-repeat"
        style={{ zIndex: -2 }}
      />
      
      <canvas 
        ref={backgroundCanvasRef} 
        className="fixed inset-0 w-full h-full"
        style={{ opacity: 0.8, zIndex: -1, pointerEvents: 'none' }} 
      />
      
      <ProfileSection />
      
      <div className="w-1/2 relative z-10">
        <canvas ref={rightSideCanvasRef} className="absolute inset-0" />
      </div>
    </section>
  );
}
