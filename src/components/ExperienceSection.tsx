import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Briefcase, Calendar, MapPin, ArrowRight } from "lucide-react";
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
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/3 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-primary/2 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            viewport={{ once: true }}
          >
            {/* Pre-title */}
            <motion.div
              className="flex items-center gap-4 mb-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <span className="w-12 h-px bg-primary/50" />
              <span className="text-sm font-mono text-primary uppercase tracking-widest">
                Career Journey
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.h2
              className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <span className="text-foreground">Professional </span>
              <span className="text-primary italic">Experience</span>
            </motion.h2>

            {/* Description */}
            <motion.p
              className="text-lg text-muted-foreground max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Building innovative solutions across technology and finance.
            </motion.p>
          </motion.div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-20">
              <motion.div
                className="flex flex-col items-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="w-12 h-12 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                <p className="text-muted-foreground font-mono text-sm">Loading experiences...</p>
              </motion.div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">Failed to load experiences. Please try again later.</p>
            </div>
          )}

          {/* Timeline */}
          {experiences && experiences.length > 0 && (
            <div className="max-w-6xl mx-auto relative">
              {/* Vertical Timeline Line */}
              <div className="absolute left-8 md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-px z-10">
                {/* Base line */}
                <div className="absolute inset-0 bg-border/50" />
                {/* Animated progress line */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-primary via-primary to-primary/50 origin-top"
                  style={{ scaleY: lineHeight }}
                />
              </div>

              {/* Experience Cards */}
              <div className="space-y-16 md:space-y-24">
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
            className="text-center mt-24"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.a
              href={resumeUrl}
              download
              className="group inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Shimmer effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <Briefcase className="w-5 h-5 relative z-10" />
              <span className="relative z-10">Download Resume</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
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
      {/* MOBILE: Bubble column */}
      <div className="md:hidden flex-shrink-0 w-16 flex justify-center relative z-30">
        <TimelineBubble isInView={isInView} />
      </div>

      {/* DESKTOP: Three-column layout */}
      <div className="hidden md:flex flex-1 items-center">
        {/* Left side */}
        <div className="flex-1 pr-12">
          {isLeft && <ExperienceCardContent exp={exp} isInView={isInView} isLeft={isLeft} />}
        </div>

        {/* Center bubble */}
        <div className="flex-shrink-0 w-16 flex justify-center relative z-30">
          <TimelineBubble isInView={isInView} />
        </div>

        {/* Right side */}
        <div className="flex-1 pl-12">
          {!isLeft && <ExperienceCardContent exp={exp} isInView={isInView} isLeft={isLeft} />}
        </div>
      </div>

      {/* MOBILE: Card content */}
      <div className="md:hidden flex-1 pl-4">
        <ExperienceCardContent exp={exp} isInView={isInView} isLeft={false} />
      </div>
    </div>
  );
};

// Timeline Bubble
const TimelineBubble = ({ isInView }) => (
  <motion.div
    className="w-4 h-4 relative"
    initial={{ scale: 0 }}
    animate={isInView ? { scale: 1 } : { scale: 0 }}
    transition={{
      duration: 0.5,
      delay: 0.2,
      type: "spring",
      stiffness: 200,
    }}
  >
    {/* Outer ring */}
    <div className="absolute inset-0 rounded-full border-2 border-primary bg-background" />
    {/* Inner dot */}
    <motion.div
      className="absolute inset-1 rounded-full bg-primary"
      initial={{ scale: 0 }}
      animate={isInView ? { scale: 1 } : { scale: 0 }}
      transition={{ duration: 0.3, delay: 0.4 }}
    />
    {/* Glow effect */}
    <div className="absolute inset-0 rounded-full bg-primary/30 blur-md -z-10" />
  </motion.div>
);

// Card Content Component
const ExperienceCardContent = ({ exp, isInView, isLeft }) => (
  <motion.div
    initial={{ opacity: 0, y: 40, x: isLeft ? -20 : 20 }}
    animate={isInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: 40, x: isLeft ? -20 : 20 }}
    transition={{
      duration: 0.7,
      delay: 0.3,
      ease: [0.4, 0, 0.2, 1]
    }}
  >
    <motion.div
      className="card-luxe p-6 lg:p-8 group"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      {/* Company Logo */}
      <motion.div
        className="w-14 h-14 rounded-xl bg-background-subtle border border-border/50 p-2.5 mb-5 flex items-center justify-center overflow-hidden"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.5, delay: 0.5, type: "spring" }}
      >
        {exp.logo ? (
          <img
            src={exp.logo}
            alt={`${exp.company} logo`}
            className="w-full h-full object-contain"
          />
        ) : (
          <Briefcase className="w-6 h-6 text-primary" />
        )}
      </motion.div>

      {/* Role & Company */}
      <div className="mb-4">
        <h3 className="font-display text-xl lg:text-2xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300 mb-1">
          {exp.role}
        </h3>
        <h4 className="text-primary font-medium">
          {exp.company}
        </h4>
      </div>

      {/* Meta Info */}
      <div className="flex flex-wrap gap-3 mb-5">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4 text-primary/70" />
          <span className="font-mono text-xs">{exp.duration}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4 text-primary/70" />
          <span className="font-mono text-xs">{exp.location}</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-muted-foreground text-sm leading-relaxed mb-5">
        {exp.description}
      </p>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2">
        {exp.technologies.slice(0, 5).map((tech, techIndex) => (
          <motion.span
            key={tech}
            className="px-2.5 py-1 text-xs font-mono text-muted-foreground bg-background-subtle rounded-md border border-border/50 hover:border-primary/30 hover:text-primary transition-colors duration-300"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, delay: 0.7 + techIndex * 0.05 }}
          >
            {tech}
          </motion.span>
        ))}
        {exp.technologies.length > 5 && (
          <span className="px-2.5 py-1 text-xs font-mono text-primary bg-primary/10 rounded-md">
            +{exp.technologies.length - 5}
          </span>
        )}
      </div>
    </motion.div>
  </motion.div>
);

export default ExperienceSection;
