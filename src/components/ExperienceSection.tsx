import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Briefcase, Calendar, MapPin, ChevronRight, Sparkles, TrendingUp, ChevronLeft } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useExperiences } from "@/hooks/useSanityData";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import AnimatedSection from "./AnimatedSection";
import { useRef, useMemo, useState, useCallback, useEffect } from "react";
import type { Experience } from "@/lib/sanity.types";
import { useBreakpoint } from "@/hooks/use-mobile";

// ===== TYPES =====
interface ExperienceGroup {
  id: string;
  company: string;
  logo?: string;
  location: string;
  experiences: Experience[];
  side: 'left' | 'right';
}

// Group consecutive experiences by company into unified groups
function createExperienceGroups(experiences: Experience[]): ExperienceGroup[] {
  if (!experiences || experiences.length === 0) return [];

  const groups: ExperienceGroup[] = [];
  let currentGroup: Experience[] = [];
  let currentCompany = '';

  const normalizeCompany = (company: string) => company?.trim().toLowerCase();

  experiences.forEach((exp, index) => {
    const expCompany = normalizeCompany(exp.company);

    if (index === 0) {
      currentCompany = expCompany;
      currentGroup = [exp];
    } else if (expCompany === currentCompany) {
      currentGroup.push(exp);
    } else {
      // Save previous group
      groups.push({
        id: currentGroup[0]._id,
        company: currentGroup[0].company,
        logo: currentGroup[0].logo,
        location: currentGroup[0].location,
        experiences: currentGroup,
        side: (groups.length % 2 === 0 ? 'left' : 'right') as 'left' | 'right',
      });
      // Start new group
      currentCompany = expCompany;
      currentGroup = [exp];
    }
  });

  // Don't forget the last group
  if (currentGroup.length > 0) {
    groups.push({
      id: currentGroup[0]._id,
      company: currentGroup[0].company,
      logo: currentGroup[0].logo,
      location: currentGroup[0].location,
      experiences: currentGroup,
      side: (groups.length % 2 === 0 ? 'left' : 'right') as 'left' | 'right',
    });
  }

  return groups;
}

// ===== MOBILE EXPERIENCE CAROUSEL =====
const MobileExperienceCarousel = ({ 
  groups, 
  resumeUrl 
}: { 
  groups: ExperienceGroup[];
  resumeUrl: string;
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    containScroll: false,
    dragFree: false,
    loop: false,
  });
  
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);
  
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);
  
  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative">
      {/* Horizontal Timeline Indicator */}
      <div className="flex items-center justify-center gap-1 mb-6 px-4">
        <div className="flex items-center gap-1">
          {groups.map((group, i) => (
            <button
              key={group.id}
              onClick={() => scrollTo(i)}
              className="flex items-center gap-1 group"
            >
              {/* Timeline dot */}
              <motion.div
                className={`rounded-full transition-all duration-300 ${
                  i === selectedIndex 
                    ? 'w-3 h-3 bg-primary shadow-lg shadow-primary/30' 
                    : 'w-2 h-2 bg-border hover:bg-primary/50'
                }`}
                animate={{
                  scale: i === selectedIndex ? 1.2 : 1,
                }}
                transition={{ duration: 0.2 }}
              />
              {/* Timeline connector line */}
              {i < groups.length - 1 && (
                <div className={`w-6 h-0.5 transition-colors duration-300 ${
                  i < selectedIndex ? 'bg-primary' : 'bg-border/50'
                }`} />
              )}
            </button>
          ))}
        </div>
      </div>
      
      {/* Carousel Container */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4 px-4">
          {groups.map((group, index) => {
            // Calculate distance from center for dock effect
            const distance = Math.abs(index - selectedIndex);
            
            return (
              <motion.div
                key={group.id}
                className="flex-shrink-0 w-[85%] min-w-0"
                animate={{
                  scale: distance === 0 ? 1.05 : distance === 1 ? 0.95 : 0.9,
                  opacity: distance === 0 ? 1 : distance === 1 ? 0.8 : 0.6,
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <MobileExperienceCard group={group} isActive={index === selectedIndex} />
              </motion.div>
            );
          })}
        </div>
      </div>
      
      {/* Navigation Buttons */}
      <div className="flex justify-center gap-4 mt-6">
        <motion.button
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          className={`p-2.5 rounded-full border transition-all duration-200 ${
            canScrollPrev 
              ? 'border-primary/50 text-primary hover:bg-primary/10' 
              : 'border-border/30 text-muted-foreground/30'
          }`}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft className="w-5 h-5" />
        </motion.button>
        <motion.button
          onClick={scrollNext}
          disabled={!canScrollNext}
          className={`p-2.5 rounded-full border transition-all duration-200 ${
            canScrollNext 
              ? 'border-primary/50 text-primary hover:bg-primary/10' 
              : 'border-border/30 text-muted-foreground/30'
          }`}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>
      
      {/* Position indicator */}
      <div className="text-center mt-4">
        <span className="text-xs text-muted-foreground font-mono">
          {selectedIndex + 1} / {groups.length}
        </span>
      </div>
    </div>
  );
};

// ===== MOBILE EXPERIENCE CARD =====
const MobileExperienceCard = ({ 
  group, 
  isActive 
}: { 
  group: ExperienceGroup;
  isActive: boolean;
}) => {
  const [expandedRoleId, setExpandedRoleId] = useState<string | null>(null);
  const isGrouped = group.experiences.length > 1;
  
  return (
    <div className={`rounded-2xl bg-card border transition-all duration-300 overflow-hidden ${
      isActive ? 'border-primary/30 shadow-lg shadow-primary/5' : 'border-border/50'
    }`}>
      {/* Company Header */}
      <div className="p-4 border-b border-border/30">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-background border border-border/50 p-2 flex items-center justify-center overflow-hidden flex-shrink-0">
            {group.logo ? (
              <img
                src={group.logo}
                alt={`${group.company} logo`}
                className="w-full h-full object-contain"
              />
            ) : (
              <Briefcase className="w-5 h-5 text-primary" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-base font-semibold text-foreground truncate">
              {group.company}
            </h3>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="w-3 h-3 text-primary/50 flex-shrink-0" />
              <span className="text-xs truncate">{group.location}</span>
            </div>
          </div>
          {isGrouped && (
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-primary/10 border border-primary/20 flex-shrink-0">
              <TrendingUp className="w-3 h-3 text-primary" />
              <span className="text-[10px] font-medium text-primary">
                {group.experiences.length}
              </span>
            </div>
          )}
        </div>
      </div>
      
      {/* Roles */}
      <div className="max-h-[280px] overflow-y-auto">
        {group.experiences.map((exp, expIndex) => {
          const isExpanded = expandedRoleId === exp._id;
          const isFirst = expIndex === 0;
          
          return (
            <div
              key={exp._id}
              className={`p-4 transition-colors duration-200 cursor-pointer ${
                expIndex > 0 ? 'border-t border-border/20' : ''
              } ${isExpanded ? 'bg-card-hover/30' : ''}`}
              onClick={() => setExpandedRoleId(isExpanded ? null : exp._id)}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className={`font-semibold leading-tight truncate ${
                      isFirst && isGrouped ? 'text-sm text-foreground' : 'text-xs text-foreground/90'
                    }`}>
                      {exp.role}
                    </h4>
                    {isFirst && isGrouped && (
                      <span className="px-1.5 py-0.5 text-[8px] font-mono font-medium text-primary bg-primary/10 rounded-full border border-primary/20 flex-shrink-0">
                        Current
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 text-primary/50 flex-shrink-0" />
                    <span className="text-[10px] font-mono text-muted-foreground">{exp.duration}</span>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                  isExpanded ? 'rotate-90 border-primary/50 bg-primary/10' : 'border-border/50'
                }`}>
                  <ChevronRight className={`w-3 h-3 ${isExpanded ? 'text-primary' : 'text-muted-foreground'}`} />
                </div>
              </div>
              
              {/* Tech tags - always visible but fewer on mobile */}
              <div className="flex flex-wrap gap-1 mb-2">
                {exp.technologies.slice(0, isExpanded ? 6 : 3).map((tech) => (
                  <span
                    key={tech}
                    className="px-1.5 py-0.5 text-[9px] font-mono text-muted-foreground bg-background rounded border border-border/50"
                  >
                    {tech}
                  </span>
                ))}
                {!isExpanded && exp.technologies.length > 3 && (
                  <span className="px-1.5 py-0.5 text-[9px] font-mono text-primary bg-primary/10 rounded">
                    +{exp.technologies.length - 3}
                  </span>
                )}
              </div>
              
              {/* Expandable description */}
              <div className={`grid transition-all duration-300 ease-out ${
                isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}>
                <div className="overflow-hidden">
                  <div className="pt-2 border-t border-border/20">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ===== MAIN SECTION COMPONENT =====
const ExperienceSection = () => {
  const { data: experiences, isLoading, error } = useExperiences();
  const { data: siteSettings } = useSiteSettings();
  const sectionRef = useRef(null);
  const { isSmall } = useBreakpoint();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const lineProgress = useTransform(scrollYProgress, [0.1, 0.6], [0, 1]);
  const resumeUrl = siteSettings?.resume?.asset?.url || '/Kurtik Resume.pdf';

  const experienceGroups = useMemo(() => {
    if (!experiences) return [];
    return createExperienceGroups(experiences);
  }, [experiences]);

  return (
    <div ref={sectionRef}>
      <AnimatedSection id="experience" className="py-16 sm:py-24 md:py-32 relative overflow-hidden">
        {/* ===== SUBTLE BACKGROUND ===== */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[800px]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/[0.04] via-transparent to-transparent" />
          </div>
          <div
            className="absolute inset-0 opacity-[0.008]"
            style={{
              backgroundImage: `
                linear-gradient(to right, hsl(43 74% 49%) 1px, transparent 1px),
                linear-gradient(to bottom, hsl(43 74% 49%) 1px, transparent 1px)
              `,
              backgroundSize: '100px 100px',
            }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* ===== SECTION HEADER ===== */}
          <motion.div
            className="mb-12 sm:mb-16 md:mb-24 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            <motion.div
              className="flex items-center justify-center gap-4 mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.span
                className="w-16 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              />
              <div className="relative">
                <Sparkles className="w-5 h-5 text-primary" />
                <motion.div
                  className="absolute inset-0 blur-sm"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="w-5 h-5 text-primary" />
                </motion.div>
              </div>
              <motion.span
                className="w-16 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              />
            </motion.div>

            <motion.span
              className="inline-block text-xs font-mono text-primary/80 uppercase tracking-[0.3em] mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Career Chronograph
            </motion.span>

            <motion.h2
              className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-semibold tracking-tight mb-4 sm:mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <span className="text-foreground">Professional</span>
              <br />
              <span className="text-primary italic">Experience</span>
            </motion.h2>

            <motion.p
              className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              Precision-crafted solutions across technology, finance, and research
            </motion.p>
          </motion.div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-20">
              <motion.div className="relative" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="w-20 h-20 rounded-full border border-primary/20 relative">
                  <motion.div
                    className="absolute inset-2 rounded-full border-t-2 border-primary"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div
                    className="absolute inset-4 rounded-full border-t border-primary/50"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                </div>
                <p className="text-muted-foreground font-mono text-xs mt-4 text-center tracking-wider">LOADING</p>
              </motion.div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">Failed to load experiences.</p>
            </div>
          )}

          {/* ===== TIMELINE ===== */}
          {experienceGroups && experienceGroups.length > 0 && (
            <>
              {/* Mobile: Horizontal Carousel with Dock Effect */}
              {isSmall ? (
                <MobileExperienceCarousel groups={experienceGroups} resumeUrl={resumeUrl} />
              ) : (
                /* Desktop: Vertical Timeline */
                <div className="max-w-6xl mx-auto relative">
                  {/* Timeline Track - Desktop */}
                  <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px">
                    <div className="absolute inset-0 bg-border/40" />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-b from-primary via-primary to-primary/50 origin-top"
                      style={{ scaleY: lineProgress }}
                    />
                  </div>

                  {/* Tablet Timeline (md breakpoint) */}
                  <div className="md:hidden absolute left-6 top-0 bottom-0 w-px">
                    <div className="absolute inset-0 bg-border/30" />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-b from-primary to-primary/40 origin-top"
                      style={{ scaleY: lineProgress }}
                    />
                  </div>

                  {/* Experience Groups */}
                  <div className="flex flex-col">
                    {experienceGroups.map((group, index) => (
                      <ExperienceGroupCard
                        key={group.id}
                        group={group}
                        index={index}
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* ===== RESUME CTA ===== */}
          <motion.div
            className="text-center mt-20 md:mt-28"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.a
              href={resumeUrl}
              download
              className="group relative inline-flex items-center gap-3 px-8 py-4 overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-primary/90 rounded-full" />
              <div className="absolute inset-[1px] bg-gradient-to-r from-primary to-primary/80 rounded-full" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent rounded-full"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
              <Briefcase className="w-5 h-5 text-primary-foreground relative z-10" />
              <span className="text-primary-foreground font-medium relative z-10">Download Resume</span>
              <ChevronRight className="w-4 h-4 text-primary-foreground relative z-10 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </motion.div>
        </div>
      </AnimatedSection>
    </div>
  );
};

// ===== EXPERIENCE GROUP CARD =====
const ExperienceGroupCard = ({
  group,
  index,
}: {
  group: ExperienceGroup;
  index: number;
}) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });
  const isLeft = group.side === 'left';
  const isGrouped = group.experiences.length > 1;

  return (
    <div ref={cardRef} className="mb-12 md:mb-20">
      {/* ===== DESKTOP LAYOUT ===== */}
      <div className="hidden md:flex items-start">
        {/* Left Column */}
        <div className="flex-1 flex justify-end pr-12">
          {isLeft && (
            <GroupCardContent
              group={group}
              isInView={isInView}
              isLeft={true}
              index={index}
            />
          )}
        </div>

        {/* Center Timeline Node */}
        <div className="flex-shrink-0 w-20 flex flex-col items-center relative z-20">
          <motion.div
            className="w-5 h-5 relative"
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.1, type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-primary to-primary/70 p-[2px]">
              <div className="w-full h-full rounded-full bg-background" />
            </div>
            <motion.div
              className="absolute inset-[5px] rounded-full bg-primary"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -inset-2 rounded-full bg-primary/30 blur-md"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="flex-1 flex justify-start pl-12">
          {!isLeft && (
            <GroupCardContent
              group={group}
              isInView={isInView}
              isLeft={false}
              index={index}
            />
          )}
        </div>
      </div>

      {/* ===== MOBILE LAYOUT ===== */}
      <div className="md:hidden flex items-start">
        <div className="flex-shrink-0 w-12 flex flex-col items-center relative z-20">
          <motion.div
            className="w-4 h-4 relative"
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-primary/70 p-[2px]">
              <div className="w-full h-full rounded-full bg-background" />
            </div>
            <div className="absolute inset-[3px] rounded-full bg-primary" />
          </motion.div>
        </div>

        <div className="flex-1 pl-4">
          <GroupCardContent
            group={group}
            isInView={isInView}
            isLeft={false}
            index={index}
            isMobile
          />
        </div>
      </div>
    </div>
  );
};

// ===== GROUP CARD CONTENT =====
const GroupCardContent = ({
  group,
  isInView,
  isLeft,
  index,
  isMobile = false,
}: {
  group: ExperienceGroup;
  isInView: boolean;
  isLeft: boolean;
  index: number;
  isMobile?: boolean;
}) => {
  const isGrouped = group.experiences.length > 1;

  return (
    <motion.div
      className={`w-full ${isMobile ? 'max-w-full' : 'max-w-2xl'}`}
      initial={{ opacity: 0, y: 30, x: isLeft ? -20 : 20 }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: 30, x: isLeft ? -20 : 20 }}
      transition={{ duration: 0.7, delay: 0.1 + index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="relative rounded-2xl bg-card border border-border/50 overflow-hidden transition-all duration-300 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/[0.03]">
        {/* Subtle corner accents */}
        <div className="absolute top-0 left-0 w-12 h-12 overflow-hidden">
          <div className="absolute top-0 left-0 w-[1px] h-8 bg-gradient-to-b from-primary/40 to-transparent" />
          <div className="absolute top-0 left-0 w-8 h-[1px] bg-gradient-to-r from-primary/40 to-transparent" />
        </div>
        <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
          <div className="absolute top-0 right-0 w-[1px] h-8 bg-gradient-to-b from-primary/40 to-transparent" />
          <div className="absolute top-0 right-0 w-8 h-[1px] bg-gradient-to-l from-primary/40 to-transparent" />
        </div>

        {/* ===== COMPANY HEADER ===== */}
        <div className="p-5 md:p-6 border-b border-border/30">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <div className="relative flex-shrink-0">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-background border border-border/50 p-2.5 flex items-center justify-center overflow-hidden">
                {group.logo ? (
                  <img
                    src={group.logo}
                    alt={`${group.company} logo`}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <Briefcase className="w-6 h-6 text-primary" />
                )}
              </div>
              {/* Subtle glow behind logo */}
              <div className="absolute inset-0 rounded-xl bg-primary/10 blur-xl -z-10" />
            </div>

            {/* Company Info */}
            <div className="flex-1 min-w-0">
              <h3 className="font-display text-lg md:text-xl font-semibold text-foreground mb-1">
                {group.company}
              </h3>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <MapPin className="w-3.5 h-3.5 text-primary/50" />
                <span className="text-sm">{group.location}</span>
              </div>
            </div>

            {/* Career Progression Badge (for grouped) */}
            {isGrouped && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                <TrendingUp className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-medium text-primary">
                  {group.experiences.length} Roles
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ===== ROLES SECTION ===== */}
        <div className="relative">
          {/* Inner timeline for grouped experiences */}
          {isGrouped && (
            <div className="absolute left-7 md:left-8 top-6 bottom-6 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent" />
          )}

          {/* Role Cards */}
          <div className={`${isGrouped ? 'divide-y divide-border/20' : ''}`}>
            {group.experiences.map((exp, expIndex) => (
              <RoleCard
                key={exp._id}
                experience={exp}
                isFirst={expIndex === 0}
                isLast={expIndex === group.experiences.length - 1}
                isGrouped={isGrouped}
                expIndex={expIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ===== ROLE CARD (Individual role within a group) =====
const RoleCard = ({
  experience: exp,
  isFirst,
  isLast,
  isGrouped,
  expIndex,
}: {
  experience: Experience;
  isFirst: boolean;
  isLast: boolean;
  isGrouped: boolean;
  expIndex: number;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`
        relative p-5 md:p-6
        ${isGrouped ? 'pl-12 md:pl-14' : ''}
        transition-colors duration-200
        hover:bg-card-hover/30
        cursor-pointer
      `}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Role node on inner timeline (for grouped) */}
      {isGrouped && (
        <div className="absolute left-5 md:left-6 top-7 md:top-8">
          <div className={`
            relative rounded-full
            ${isFirst
              ? 'w-4 h-4 bg-primary shadow-lg shadow-primary/30'
              : 'w-3 h-3 bg-primary/50 border border-primary/30'
            }
          `}>
            {isFirst && (
              <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-30" />
            )}
          </div>
        </div>
      )}

      {/* Role Content */}
      <div className="space-y-3">
        {/* Role Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            {/* Role Title */}
            <div className="flex items-center gap-2 mb-1">
              <h4 className={`
                font-display font-semibold leading-tight
                ${isFirst && isGrouped ? 'text-base md:text-lg text-foreground' : 'text-sm md:text-base text-foreground/90'}
              `}>
                {exp.role}
              </h4>
              {isFirst && isGrouped && (
                <span className="px-2 py-0.5 text-[10px] font-mono font-medium text-primary bg-primary/10 rounded-full border border-primary/20">
                  Current
                </span>
              )}
            </div>

            {/* Duration */}
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-primary/50" />
              <span className="text-xs font-mono text-muted-foreground">{exp.duration}</span>
            </div>
          </div>

          {/* Expand indicator */}
          <div className={`
            flex-shrink-0 w-6 h-6 rounded-full border border-border/50
            flex items-center justify-center
            transition-all duration-200
            ${isExpanded ? 'rotate-90 border-primary/50 bg-primary/10' : ''}
          `}>
            <ChevronRight className={`w-3.5 h-3.5 ${isExpanded ? 'text-primary' : 'text-muted-foreground'}`} />
          </div>
        </div>

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-1.5">
          {exp.technologies.slice(0, isExpanded ? undefined : 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-[10px] font-mono text-muted-foreground bg-background rounded border border-border/50 transition-colors hover:border-primary/30 hover:text-primary/80"
            >
              {tech}
            </span>
          ))}
          {!isExpanded && exp.technologies.length > 4 && (
            <span className="px-2 py-0.5 text-[10px] font-mono text-primary bg-primary/10 rounded">
              +{exp.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Expandable Description */}
        <div
          className={`
            grid transition-all duration-300 ease-out
            ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}
          `}
        >
          <div className="overflow-hidden">
            <div className="pt-3 border-t border-border/20">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {exp.description}
              </p>
            </div>
          </div>
        </div>

        {/* Collapse hint when not expanded */}
        {!isExpanded && (
          <p className="text-[10px] font-mono text-muted-foreground/50 uppercase tracking-wider">
            Click to expand
          </p>
        )}
      </div>
    </div>
  );
};

export default ExperienceSection;
