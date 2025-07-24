import { useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Trophy,
  Heart,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AnimatedSection from "./AnimatedSection";

interface AboutItem {
  id: string;
  category: "education" | "awards & Leadership" | "hobbies";
  title: string;
  subtitle?: string;
  description?: string;
  date?: string;
  details?: string[];
  icon: React.ReactNode;
}

const aboutData: AboutItem[] = [
  {
    id: "1",
    category: "education",
    title: "B.S in Computer Science & Economics Double",
    subtitle: "Union College",
    date: "2021 - 2025",
    details: [
      "GPA: 3.6/4.0",
      "Computer Science & Economics Honor Student",
      'Thesis: "Arbitrage in the Crypto Currency Market"',
      "Cum Laude",
      "Dean's List student-athlete",
    ],
    icon: <GraduationCap className="w-6 h-6" />,
  },
  {
    id: "2",
    category: "education",
    title: "A-level CIE",
    subtitle: "Northfields Internation High School",
    date: "2016 - 2020",
    details: [
      "Grades: A+ in Physics, A+ in Mathematics, A in Economics and A in French",
      "Ranked 3rd Overall in class",
      "Ranked best in Math for A-level",
    ],
    icon: <GraduationCap className="w-6 h-6" />,
  },
  {
    id: "3",
    category: "awards & Leadership",
    title: "Presenter at the PIERS 2025 Conference",
    subtitle: "Williams College.",
    description:
      "Recognized for my senior thesis project on cryptocurrency arbitrage and invited to share my work",
    date: "2025",
    details: [
      "Presented my work at the PIERS 2025 conference",
      "Shared my work and insight with other great minds in Economics, developing connections and critical thinking",
      "Gathered insight that led into further machine learning implimentations to my research",
    ],
    icon: <Trophy className="w-6 h-6" />,
  },
  {
    id: "7",
    category: "awards & Leadership",
    title: "SparkLab - Entrepreneurship Program",
    subtitle: "Union College",
    description:
      "Selected participant in Union College's premier entrepreneurship incubator program, developing innovative business solutions and startup concepts.",
    date: "2024 - 2025",
    details: [
      "Secured second place with my team's startup concept, earning $12,500 in startup capital",
      "Completed an intensive 20-week program focused on entrepreneurship fundamentals and business launch strategies",
      "Created a professional pitch deck and presented to potential investors and judges in the final competition",
    ],
    icon: <Trophy className="w-6 h-6" />,
  },
  {
    id: "4",
    category: "awards & Leadership",
    title: "Omicron Delta Epsilon - Economics Honor Society",
    subtitle: "Union College",
    description:
      "Recognized for academic excellence in the field of Economics and inducted into this prestigious international honor society.",
    date: "2024",
    details: [
      "Upheld the highest standard of academic excellence in the field of Economics",
      "Participated in economic research initiatives",
      "Attended exclusive seminars with industry professionals",
    ],
    icon: <Trophy className="w-6 h-6" />,
  },
  {
    id: "5",
    category: "awards & Leadership",
    title: "Order of Omega - Greek Life Honor Society",
    subtitle: "Union College",
    description:
      "Selected for membership in this prestigious honor society recognizing excellence in Greek leadership, academics, and campus involvement.",
    date: "2024",
    details: [
      "Served as Vice-President of the Executive Board - upholding the highest values and promoting excellence across campus through events and workshops",
      "Top 3% of Greek organization members",
      "Recognized for leadership contributions to campus community",
    ],
    icon: <Trophy className="w-6 h-6" />,
  },
  {
    id: "6",
    category: "awards & Leadership",
    title: "Alpha Phi Omega",
    subtitle: "Union College",
    description:
      "Active member of this national co-ed service fraternity dedicated to developing leadership, promoting friendship, and providing service to the community.",
    date: "2024",
    details: [
      "Completed over 100 hours of community service",
      "Organized campus-wide fundraising events",
      "Led volunteer initiatives with local non-profit organizations",
    ],
    icon: <Trophy className="w-6 h-6" />,
  },
  {
    id: "8",
    category: "hobbies",
    title: "Tennis",
    description:
      "Division III collegiate tennis player with a lifelong passion for the sport. Compete at the varsity level while balancing academic commitments, developing discipline and time management skills.",
    details: [
      "Varsity tennis player at Union College",
      "Nationally ranked Player U18 in Mauritius",
      "Competed in NCAA Division III tournaments",
      "Maintain rigorous training schedule year-round",
      "Ranked player in both the U.S and France",
    ],
    icon: <Heart className="w-6 h-6" />,
  },
  {
    id: "9",
    category: "hobbies",
    title: "Fitness",
    description:
      "Dedicated fitness enthusiast with a structured approach to strength training and athletic performance. Apply data-driven methods to track progress and optimize training protocols.",
    details: [
      "Implement periodized training programs for strength and conditioning",
      "Track metrics and analyze performance data for continuous improvement",
      "Practice evidence-based nutrition strategies to support training goals",
      "Mentor fellow students in effective training methodologies",
    ],
    icon: <Heart className="w-6 h-6" />,
  },
];

const categoryConfig = {
  education: { label: "Academic Journey", color: "from-blue-500 to-cyan-500" },
  "awards & Leadership": {
    label: "Awards & Honors",
    color: "from-yellow-500 to-orange-500",
  },
  hobbies: {
    label: "Personal Interests",
    color: "from-purple-500 to-pink-500",
  },
};

const AboutSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
  });
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredData =
    selectedCategory === "all"
      ? aboutData
      : aboutData.filter((item) => item.category === selectedCategory);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  return (
    <AnimatedSection id="about" className="py-20 relative">
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
            <span className="gradient-text">About Me</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            My journey through academics, achievements, and the passions that
            drive me
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-2 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              onClick={() => setSelectedCategory("all")}
              className={`transition-all duration-300 ${
                selectedCategory === "all"
                  ? "bg-gradient-to-r from-primary to-accent text-white glow-effect"
                  : "hover:border-primary hover:text-primary"
              }`}
            >
              All
            </Button>
          </motion.div>
          {Object.entries(categoryConfig).map(([key, config], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              viewport={{ once: true }}
            >
              <Button
                variant={selectedCategory === key ? "default" : "outline"}
                onClick={() => setSelectedCategory(key)}
                className={`transition-all duration-300 ${
                  selectedCategory === key
                    ? "bg-gradient-to-r from-primary to-accent text-white glow-effect"
                    : "hover:border-primary hover:text-primary"
                }`}
              >
                {config.label}
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Carousel Navigation */}
        <motion.div 
          className="flex justify-center items-center gap-4 mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="outline"
              size="icon"
              onClick={scrollPrev}
              className="hover:border-primary hover:text-primary transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
          </motion.div>
          <motion.span 
            className="text-muted-foreground"
            key={filteredData.length}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filteredData.length} {filteredData.length === 1 ? "item" : "items"}
          </motion.span>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="outline"
              size="icon"
              onClick={scrollNext}
              className="hover:border-primary hover:text-primary transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Carousel */}
        <motion.div 
          className="embla overflow-hidden" 
          ref={emblaRef}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="embla__container flex">
            <AnimatePresence mode="wait">
              {filteredData.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="embla__slide flex-[0_0_90%] md:flex-[0_0_45%] lg:flex-[0_0_33.333%] pl-4"
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    transition: {
                      duration: 0.6,
                      delay: index * 0.1,
                      ease: [0.25, 0.25, 0.25, 0.75]
                    }
                  }}
                  viewport={{ once: true, amount: 0.2 }}
                  whileHover={{ 
                    y: -8,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="h-full glass-effect group cursor-pointer">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <motion.div
                            className={`p-3 rounded-lg bg-gradient-to-r ${
                              categoryConfig[item.category].color
                            } mr-4 text-white`}
                            whileHover={{ 
                              scale: 1.1, 
                              rotate: 5,
                              transition: { duration: 0.2 }
                            }}
                          >
                            {item.icon}
                          </motion.div>
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: 0.3 }}
                          >
                            <Badge variant="secondary" className="text-xs">
                              {categoryConfig[item.category].label}
                            </Badge>
                          </motion.div>
                        </div>
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                        >
                          <CardTitle className="text-xl group-hover:text-primary transition-colors">
                            {item.title}
                          </CardTitle>
                          {item.subtitle && (
                            <p className="text-accent font-medium">{item.subtitle}</p>
                          )}
                          {item.date && (
                            <p className="text-sm text-muted-foreground">
                              {item.date}
                            </p>
                          )}
                        </motion.div>
                      </CardHeader>
                      <CardContent>
                        <motion.p 
                          className="text-muted-foreground mb-4 leading-relaxed"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ duration: 0.6, delay: 0.3 }}
                        >
                          {item.description}
                        </motion.p>
                        {item.details && (
                          <motion.ul 
                            className="space-y-1"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                          >
                            {item.details.map((detail, i) => (
                              <motion.li
                                key={i}
                                className="text-sm text-muted-foreground flex items-center"
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ 
                                  duration: 0.4, 
                                  delay: 0.5 + (i * 0.1) 
                                }}
                              >
                                <motion.span 
                                  className="w-1 h-1 bg-primary rounded-full mr-2"
                                  initial={{ scale: 0 }}
                                  whileInView={{ scale: 1 }}
                                  transition={{ 
                                    duration: 0.3, 
                                    delay: 0.6 + (i * 0.1),
                                    type: "spring",
                                    stiffness: 200
                                  }}
                                />
                                {detail}
                              </motion.li>
                            ))}
                          </motion.ul>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
};

export default AboutSection;
