import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Briefcase, Calendar, MapPin, ArrowRight, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useExperiences } from "@/hooks/useSanityData";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import AnimatedSection from "./AnimatedSection";
import { useRef } from "react";

const ExperienceSection = () => {
  const { data: experiences, isLoading, error } = useExperiences();
  const { data: siteSettings } = useSiteSettings();
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 0.5], ["0%", "100%"]);

  // Use Sanity resume if available, fallback to public folder
  const resumeUrl = siteSettings?.resume?.asset?.url || '/Kurtik Resume.pdf';

  return (
    <div ref={sectionRef}>
      <AnimatedSection id="experience" className="py-32 relative overflow-hidden">
        {/* Atmospheric background */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/[0.02] to-background pointer-events-none" />

        {/* Radial gradient accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-50 pointer-events-none blur-3xl">
          <div className="w-full h-full bg-gradient-to-r from-primary/20 via-transparent to-transparent rounded-full" />
        </div>

        <div className="container mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <motion.div
            className="text-center mb-24"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Floating badge */}
            <motion.div
              className="inline-block mb-6"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/15 via-accent/15 to-primary/15 border border-primary/30 backdrop-blur-sm relative group">
                <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                <span className="text-sm font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Career Journey
                </span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
              </div>
            </motion.div>

            <motion.h2
              className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
            >
              <span className="gradient-text">Professional Experience</span>
            </motion.h2>

            <motion.p
              className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
            >
              Building innovative solutions across technology and finance
            </motion.p>
          </motion.div>

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-20">
              <motion.div
                className="inline-block h-12 w-12 rounded-full border-4 border-primary/30 border-t-primary"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <p className="mt-6 text-muted-foreground font-medium">Loading experiences...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-20">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-destructive/10 border border-destructive/30">
                <div className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
                <p className="text-destructive font-medium">Failed to load experiences</p>
              </div>
            </div>
          )}

          {/* Timeline */}
          {experiences && experiences.length > 0 && (
            <div className="max-w-7xl mx-auto relative">
              {/* Vertical Timeline Line - positioned at left-8 (mobile) or center (desktop) */}
              {/* Uses -translate-x-1/2 to center the line at the left-8 / left-1/2 position */}
              <div className="absolute left-8 md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-[3px] z-10">
                {/* Base line */}
                <div className="absolute inset-0 bg-gradient-to-b from-border/40 via-border/60 to-border/40 rounded-full" />

                {/* Animated progress line */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-primary via-accent to-primary rounded-full origin-top shadow-[0_0_20px_rgba(var(--primary),0.3)]"
                  style={{ scaleY: lineHeight }}
                />
              </div>

              {/* Experience Cards with integrated bubbles */}
              <div className="space-y-24 md:space-y-32">
                {experiences.map((exp, index) => (
                  <ExperienceCard
                    key={exp._id}
                    experience={exp}
                    index={index}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Resume CTA */}
          <motion.div
            className="text-center mt-32"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.a
              href={resumeUrl}
              download
              className="group inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-primary via-accent to-primary text-white rounded-2xl font-bold text-base relative overflow-hidden shadow-2xl shadow-primary/30"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                animate={{
                  translateX: ['-100%', '100%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />

              <Briefcase className="w-5 h-5 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
              <span className="relative z-10">Download Full Resume</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.a>
          </motion.div>
        </div>
      </AnimatedSection>
    </div>
  );
};

// Individual Experience Card Component
const ExperienceCard = ({ experience: exp, index }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  const isLeft = index % 2 === 0;

  return (
    <div ref={cardRef} className="flex items-center">
      {/* MOBILE: Bubble column - fixed width at left-8 (32px) position */}
      {/* The bubble sits at the timeline position, card content comes after */}
      {/* z-30 ensures bubbles render above the timeline line (z-10) */}
      <div className="md:hidden flex-shrink-0 w-16 flex justify-center relative z-30">
        <TimelineBubble isInView={isInView} isLeft={isLeft} />
      </div>

      {/* DESKTOP: Three-column flex layout for perfect centering */}
      {/* Left column | Center bubble | Right column */}
      <div className="hidden md:flex flex-1 items-center">
        {/* Left side - card if isLeft, empty otherwise */}
        <div className="flex-1 pr-8">
          {isLeft && <ExperienceCardContent exp={exp} isInView={isInView} isLeft={isLeft} />}
        </div>

        {/* Center bubble column - always at 50% */}
        {/* z-30 ensures bubbles render above the timeline line (z-10) */}
        <div className="flex-shrink-0 w-20 flex justify-center relative z-30">
          <TimelineBubble isInView={isInView} isLeft={isLeft} />
        </div>

        {/* Right side - card if !isLeft, empty otherwise */}
        <div className="flex-1 pl-8">
          {!isLeft && <ExperienceCardContent exp={exp} isInView={isInView} isLeft={isLeft} />}
        </div>
      </div>

      {/* MOBILE: Card content after the bubble */}
      <div className="md:hidden flex-1 pl-4">
        <ExperienceCardContent exp={exp} isInView={isInView} isLeft={isLeft} />
      </div>
    </div>
  );
};

// Timeline Bubble - rendered in the flex layout for perfect alignment
const TimelineBubble = ({ isInView, isLeft }) => (
  <motion.div
    className="w-10 h-10 relative"
    initial={{ scale: 0, rotate: -180 }}
    animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
    transition={{
      duration: 0.7,
      delay: 0.2,
      type: "spring",
      stiffness: 200,
      damping: 15
    }}
  >
    {/* Main bubble with gradient ring */}
    <motion.div
      className="relative w-10 h-10 rounded-full bg-gradient-to-br from-primary via-accent to-primary p-[3px] shadow-2xl shadow-primary/50"
      whileHover={{ scale: 1.25, rotate: 180 }}
      transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
    >
      {/* Inner white ring */}
      <div className="w-full h-full rounded-full bg-background p-[3px]">
        {/* Gradient core */}
        <div
          className="w-full h-full rounded-full bg-gradient-to-br from-primary via-accent to-primary relative overflow-hidden"
          style={{
            boxShadow: `
              inset 0 2px 8px rgba(255, 255, 255, 0.3),
              0 0 20px hsl(var(--primary) / 0.6),
              0 0 40px hsl(var(--primary) / 0.3)
            `
          }}
        >
          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          {/* Center dot */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/90 shadow-inner" />
        </div>
      </div>
    </motion.div>

    {/* Connection line to card (desktop only) */}
    <motion.div
      className={`hidden md:block absolute top-1/2 -translate-y-1/2 h-[2px] ${
        isLeft ? 'left-full ml-2' : 'right-full mr-2'
      }`}
      initial={{ width: 0, opacity: 0 }}
      animate={isInView ? { width: '40px', opacity: 1 } : { width: 0, opacity: 0 }}
      transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={`h-full rounded-full ${
        isLeft
          ? 'bg-gradient-to-r from-primary/60 to-transparent'
          : 'bg-gradient-to-l from-primary/60 to-transparent'
      }`} />
    </motion.div>
  </motion.div>
);

// Card Content Component - shared between mobile and desktop
const ExperienceCardContent = ({ exp, isInView, isLeft }) => (
  <motion.div
    initial={{ opacity: 0, y: 60, rotateX: 15 }}
    animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 60, rotateX: 15 }}
    transition={{
      duration: 0.8,
      delay: 0.3,
      ease: [0.16, 1, 0.3, 1]
    }}
    whileHover={{
      y: -8,
      scale: 1.02,
      rotateY: isLeft ? -2 : 2,
      transition: { duration: 0.3 }
    }}
    style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
  >
    <div className="group relative">
      {/* Main Card */}
      <div
        className="relative p-6 lg:p-8 rounded-3xl bg-gradient-to-br from-background via-background to-primary/5 border-2 border-border/50 shadow-2xl shadow-black/10 overflow-hidden transition-all duration-500 group-hover:border-primary/30 group-hover:shadow-primary/20"
        style={{
          backdropFilter: 'blur(20px)',
          transform: 'translateZ(0)',
        }}
      >
        {/* Animated gradient overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"
        />

        {/* Geometric corner accents */}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-30">
          <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-primary/40 rounded-tr-3xl" />
          <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-accent/40 rounded-tr-3xl" />
        </div>

        <div className="absolute bottom-0 left-0 w-32 h-32 opacity-30">
          <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-primary/40 rounded-bl-3xl" />
          <div className="absolute bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-accent/40 rounded-bl-3xl" />
        </div>

        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/40 rounded-full"
              style={{
                left: `${20 + i * 30}%`,
                top: `${30 + i * 20}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Company Logo */}
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-600 rounded-2xl mb-5 p-3 shadow-xl relative overflow-hidden border-2 border-white/50 dark:border-gray-600/50"
            initial={{ scale: 0, rotate: -90 }}
            animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -90 }}
            transition={{
              duration: 0.6,
              delay: 0.5,
              type: "spring",
              stiffness: 200
            }}
            whileHover={{
              scale: 1.15,
              rotate: [0, -5, 5, 0],
              transition: { duration: 0.5 }
            }}
          >
            {exp.logo ? (
              <img
                src={exp.logo}
                alt={`${exp.company} logo`}
                className="w-full h-full object-contain relative z-10"
              />
            ) : (
              <Briefcase className="w-8 h-8 text-primary relative z-10" />
            )}

            {/* Logo glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
          </motion.div>

          {/* Role & Company */}
          <motion.div
            className="space-y-1.5 mb-5"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className="text-xl lg:text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 leading-tight">
              {exp.role}
            </h3>
            <h4 className="text-lg font-bold bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent">
              {exp.company}
            </h4>
          </motion.div>

          {/* Meta Info */}
          <motion.div
            className="flex flex-wrap gap-3 mb-5"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20">
              <Calendar className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-semibold text-foreground">{exp.duration}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-accent/10 border border-accent/20">
              <MapPin className="w-3.5 h-3.5 text-accent" />
              <span className="text-xs font-semibold text-foreground">{exp.location}</span>
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            className="text-muted-foreground leading-relaxed mb-5 text-sm"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {exp.description}
          </motion.p>

          {/* Technologies */}
          <motion.div
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            {exp.technologies.slice(0, 6).map((tech, techIndex) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                transition={{
                  duration: 0.4,
                  delay: 1 + (techIndex * 0.05)
                }}
                whileHover={{ scale: 1.1, y: -2 }}
              >
                <Badge
                  variant="secondary"
                  className="px-3 py-1.5 text-xs font-bold bg-gradient-to-r from-primary/15 to-accent/15 hover:from-primary/25 hover:to-accent/25 border border-primary/30 hover:border-primary/50 text-primary transition-all duration-200"
                >
                  {tech}
                </Badge>
              </motion.div>
            ))}
            {exp.technologies.length > 6 && (
              <Badge
                variant="secondary"
                className="px-3 py-1.5 text-xs font-bold bg-muted/50 hover:bg-muted border border-border"
              >
                +{exp.technologies.length - 6}
              </Badge>
            )}
          </motion.div>
        </div>

        {/* Hover shine effect */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-600 rounded-3xl bg-gradient-to-br from-transparent via-white/5 to-transparent"
        />
      </div>

      {/* 3D Shadow layer */}
      <div
        className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 to-accent/5 -z-10 blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"
        style={{
          transform: 'translateZ(-50px) scale(0.95)',
        }}
      />
    </div>
  </motion.div>
);

export default ExperienceSection;
