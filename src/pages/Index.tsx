import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import ExperienceSection from '@/components/ExperienceSection';
import SkillsSection from '@/components/SkillsSection';
import TechnologiesSection from '@/components/TechnologiesSection';
import ContactSection from '@/components/ContactSection';
import AnimatedSection from '@/components/AnimatedSection';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

const Index = () => {
  useSmoothScroll();

  return (
    <motion.div 
      className="min-h-screen bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      
      <AnimatedSection className="scroll-section">
        <ExperienceSection />
      </AnimatedSection>
      
      <AnimatedSection className="scroll-section" delay={0.2}>
        <SkillsSection />
      </AnimatedSection>
      
      <AnimatedSection className="scroll-section" delay={0.1}>
        <TechnologiesSection />
      </AnimatedSection>
      
      <AnimatedSection className="scroll-section" delay={0.3}>
        <ContactSection />
      </AnimatedSection>
      
      {/* Footer */}
      <AnimatedSection>
        <motion.footer 
          className="py-8 border-t border-border"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-4 text-center">
            <motion.p 
              className="text-muted-foreground"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              © 2025 Kurtik Appadoo. Built with React, TypeScript, and Tailwind CSS.
            </motion.p>
          </div>
        </motion.footer>
      </AnimatedSection>
    </motion.div>
  );
};

export default Index;
