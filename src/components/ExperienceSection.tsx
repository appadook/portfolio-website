import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useExperiences } from "@/hooks/useSanityData";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import AnimatedSection from "./AnimatedSection";

const ExperienceSection = () => {
  const { data: experiences, isLoading, error } = useExperiences();
  const { data: siteSettings } = useSiteSettings();

  // Use Sanity resume if available, fallback to public folder
  const resumeUrl = siteSettings?.resume?.asset?.url || '/Kurtik Resume.pdf';

  return (
    <AnimatedSection id="experience" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="gradient-text">Professional Experience</span>
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            My journey through various roles in technology and finance
          </motion.p>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
            <p className="mt-4 text-muted-foreground">Loading experiences...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-destructive">Failed to load experiences. Please try again later.</p>
          </div>
        )}

        {/* Timeline */}
        {experiences && experiences.length > 0 && (
          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Enhanced Timeline Line with Glow */}
              <motion.div
                className="absolute left-6 md:left-1/2 md:transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-accent to-primary/20 rounded-full"
                initial={{ scaleY: 0, opacity: 0 }}
                whileInView={{ scaleY: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.1 }}
                style={{
                  transformOrigin: "top",
                  boxShadow: "0 0 20px hsl(var(--primary) / 0.4), 0 0 40px hsl(var(--primary) / 0.2)"
                }}
              />

              {/* Animated Timeline Glow Effect */}
              <motion.div
                className="absolute left-6 md:left-1/2 md:transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/60 via-accent/60 to-transparent rounded-full blur-sm"
                initial={{ scaleY: 0, opacity: 0 }}
                whileInView={{ scaleY: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                viewport={{ once: true, amount: 0.1 }}
                style={{ transformOrigin: "top" }}
              />

              {experiences.map((exp, index) => (
              <motion.div
                key={exp._id}
                className={`relative flex items-center mb-16 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.2,
                  ease: [0.25, 0.25, 0.25, 0.75]
                }}
                viewport={{ once: true, amount: 0.3 }}
              >
                {/* Enhanced Timeline Bubble with Zoom Effect - Properly Centered */}
                <motion.div 
                  className="absolute left-6 md:left-1/2 md:transform md:-translate-x-1/2 top-1/2 transform -translate-y-1/2 z-20"
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.2 + 0.3,
                    type: "spring",
                    stiffness: 200,
                    damping: 15
                  }}
                  viewport={{ once: true, amount: 0.3 }}
                  whileHover={{ 
                    scale: 1.2,
                    transition: { duration: 0.2 }
                  }}
                >
                  {/* Outer Glow Ring */}
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent p-0.5 animate-pulse">
                    <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                      {/* Inner Glowing Dot */}
                      <div 
                        className="w-4 h-4 rounded-full bg-gradient-to-r from-primary to-accent"
                        style={{
                          boxShadow: `
                            0 0 10px hsl(var(--primary) / 0.8),
                            0 0 20px hsl(var(--primary) / 0.6),
                            0 0 30px hsl(var(--primary) / 0.4),
                            inset 0 0 10px hsl(var(--accent) / 0.3)
                          `
                        }}
                      />
                    </div>
                  </div>
                  
                  {/* Pulsing Outer Ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-primary/30"
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [0.8, 0, 0.8]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>

                {/* Enhanced Content Card */}
                <motion.div
                  className={`ml-16 md:ml-0 md:w-5/12 ${
                    index % 2 === 0
                      ? "md:mr-auto md:pr-12"
                      : "md:ml-auto md:pl-12"
                  }`}
                  initial={{ 
                    opacity: 0, 
                    x: index % 2 === 0 ? -50 : 50,
                    scale: 0.9
                  }}
                  whileInView={{ 
                    opacity: 1, 
                    x: 0,
                    scale: 1
                  }}
                  transition={{ 
                    duration: 0.7, 
                    delay: index * 0.2 + 0.4,
                    ease: [0.25, 0.25, 0.25, 0.75]
                  }}
                  viewport={{ once: true, amount: 0.3 }}
                  whileHover={{ 
                    y: -8,
                    scale: 1.02,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                >
                  <div 
                    className="p-8 rounded-xl group cursor-pointer relative overflow-hidden"
                    style={{
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(var(--border) / 0.3)",
                      boxShadow: `
                        0 8px 32px rgba(0, 0, 0, 0.3),
                        0 0 0 1px rgba(var(--primary) / 0.1),
                        inset 0 1px 0 rgba(255, 255, 255, 0.1)
                      `
                    }}
                  >
                    {/* Hover Glow Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.3 }}
                    />

                    {/* Company Logo with Enhanced Styling */}
                    <motion.div 
                      className="w-16 h-16 bg-gradient-to-br from-white to-gray-100 rounded-xl mb-6 flex items-center justify-center p-3 shadow-lg relative overflow-hidden"
                      initial={{ scale: 0, rotate: -90 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{ 
                        duration: 0.6, 
                        delay: index * 0.2 + 0.6,
                        type: "spring",
                        stiffness: 200
                      }}
                      whileHover={{ 
                        scale: 1.1, 
                        rotate: 5,
                        transition: { duration: 0.2 }
                      }}
                      viewport={{ once: true }}
                      style={{
                        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)"
                      }}
                    >
                      {exp.logo ? (
                        <img 
                          src={exp.logo} 
                          alt={`${exp.company} logo`}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <Briefcase className="w-8 h-8 text-primary" />
                      )}
                      
                      {/* Logo Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.div>

                    {/* Role and Company with Staggered Animation */}
                    <motion.h3 
                      className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors mb-2"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.2 + 0.7 }}
                      viewport={{ once: true }}
                    >
                      {exp.role}
                    </motion.h3>
                    
                    <motion.h4 
                      className="text-xl font-semibold text-accent mb-4"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.2 + 0.8 }}
                      viewport={{ once: true }}
                    >
                      {exp.company}
                    </motion.h4>

                    {/* Duration and Location with Icons */}
                    <motion.div 
                      className="flex flex-wrap gap-6 text-sm text-muted-foreground mb-6"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.2 + 0.9 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-primary" />
                        {exp.duration}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-accent" />
                        {exp.location}
                      </div>
                    </motion.div>

                    {/* Description - Only visible on hover */}
                    <motion.div
                      className="overflow-hidden max-h-0 group-hover:max-h-96 transition-all duration-500 ease-in-out"
                    >
                      <motion.p 
                        className="text-muted-foreground mb-6 leading-relaxed text-base opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-100"
                      >
                        {exp.description}
                      </motion.p>
                    </motion.div>

                    {/* Technologies with Staggered Badge Animation */}
                    <motion.div 
                      className="flex flex-wrap gap-2"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.2 + 1.1 }}
                      viewport={{ once: true }}
                    >
                      {exp.technologies.map((tech, techIndex) => (
                        <motion.div
                          key={tech}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ 
                            duration: 0.3, 
                            delay: index * 0.2 + 1.2 + (techIndex * 0.1) 
                          }}
                          whileHover={{ 
                            scale: 1.05,
                            transition: { duration: 0.2 }
                          }}
                          viewport={{ once: true }}
                        >
                          <Badge
                            variant="secondary"
                            className="text-xs px-3 py-1 bg-primary/10 hover:bg-primary/20 border border-primary/20 transition-colors"
                          >
                            {tech}
                          </Badge>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </motion.div>

                {/* Spacer for opposite side */}
                <div className="hidden md:block w-5/12"></div>
              </motion.div>
            ))}
            </div>
          </div>
        )}

        {/* Enhanced Resume Download Button */}
        <motion.div 
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.a
            href={resumeUrl}
            download
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold text-lg relative overflow-hidden group"
            whileHover={{ 
              scale: 1.05, 
              y: -2,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
            style={{
              boxShadow: `
                0 10px 30px rgba(var(--primary) / 0.3),
                0 0 0 1px rgba(var(--primary) / 0.2),
                inset 0 1px 0 rgba(255, 255, 255, 0.2)
              `
            }}
          >
            {/* Button Glow Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.3 }}
            />
            
            <motion.div
              whileHover={{ rotate: 5, scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <Briefcase className="w-6 h-6 mr-3" />
            </motion.div>
            Download Resume
          </motion.a>
        </motion.div>
      </div>
    </AnimatedSection>
  );
};

export default ExperienceSection;
