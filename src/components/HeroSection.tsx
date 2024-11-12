import { useRef } from "react";
import { motion } from "framer-motion";
import { useParticleBackground } from "../hooks/useParticleBackground";
import { useSpacemanModel } from "../hooks/useSpacemanModel";
import { ProfileSection } from "./ProfileSection";

export default function HeroSection() {
  const backgroundCanvasRef = useRef<HTMLCanvasElement>(null);
  const rightSideCanvasRef = useRef<HTMLCanvasElement>(null);

  useParticleBackground(backgroundCanvasRef);
  useSpacemanModel(rightSideCanvasRef);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.6
      }
    }
  };

  return (
    <motion.section 
      id="about" 
      className="relative h-screen flex overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div 
        className="fixed inset-0 w-full h-full bg-[url('/galaxy-bg.webp')] bg-cover bg-center bg-no-repeat"
        style={{ zIndex: -2 }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2 }}
      />
      
      <motion.canvas 
        ref={backgroundCanvasRef} 
        className="fixed inset-0 w-full h-full"
        style={{ opacity: 0.8, zIndex: -1, pointerEvents: 'none' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 1.5 }}
      />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex items-center w-1/2 h-full"
        style={{ padding: '0 20vw' }}
      >
        <ProfileSection />
      </motion.div>
      
      <motion.div 
        className="w-1/2 relative z-10"
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ 
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
          delay: 1,
        }}
        whileInView={{
          y: [0, -20, 0],
          transition: {
            repeat: Infinity,
            duration: 6,
            ease: "easeInOut",
            delay: 1.8
          }
        }}
      >
        <canvas ref={rightSideCanvasRef} className="absolute inset-0" />
      </motion.div>
    </motion.section>
  );
}
