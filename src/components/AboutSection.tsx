import { useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
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

interface AboutItem {
  id: string;
  category: "education" | "awards" | "hobbies";
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
      "Honor student in both Computer Science and Economics",
      'Thesis: "Arbitrage in the Crypto Currency Market"',
      "Cum Laude",
      "Dean's List student-athlete"
    ],
    icon: <GraduationCap className="w-6 h-6" />,
  },
  {
    id: "1",
    category: "education",
    title: "A-level CIE",
    subtitle: "Northfields Internation High School",
    date: "2016 - 2020",
    details: [
      "Grades: A+ in Physics, A+ in Mathematics, A in Economics and A in French",
      "Ranked 3rd Overall in class",
      "Ranked best in Math for A-level"
    ],
    icon: <GraduationCap className="w-6 h-6" />,
  },
  {
    id: "3",
    category: "awards",
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
    id: "5",
    category: "hobbies",
    title: "Tennis",
    description:
      "Division III collegiate tennis player with a lifelong passion for the sport. Compete at the varsity level while balancing academic commitments, developing discipline and time management skills.",
    details: [
      "Varsity tennis player at Union College",
      "Nationally ranked Player U18 in Mauritius",
      "Competed in NCAA Division III tournaments",
      "Maintain rigorous training schedule year-round",
      "Ranked player in both the U.S and France"
    ],
    icon: <Heart className="w-6 h-6" />,
  },
  {
    id: "6",
    category: "hobbies",
    title: "Fitness",
    description:
      "Dedicated fitness enthusiast with a structured approach to strength training and athletic performance. Apply data-driven methods to track progress and optimize training protocols.",
    details: [
      "Implement periodized training programs for strength and conditioning",
      "Track metrics and analyze performance data for continuous improvement",
      "Practice evidence-based nutrition strategies to support training goals",
      "Mentor fellow students in effective training methodologies"
    ],
    icon: <Heart className="w-6 h-6" />,
  },
  
];

const categoryConfig = {
  education: { label: "Academic Journey", color: "from-blue-500 to-cyan-500" },
  awards: { label: "Awards & Honors", color: "from-yellow-500 to-orange-500" },
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
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">About Me</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            My journey through academics, achievements, and the passions that
            drive me
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
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
          {Object.entries(categoryConfig).map(([key, config]) => (
            <Button
              key={key}
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
          ))}
        </div>

        {/* Carousel Navigation */}
        <div className="flex justify-center items-center gap-4 mb-8">
          <Button
            variant="outline"
            size="icon"
            onClick={scrollPrev}
            className="hover:border-primary hover:text-primary transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-muted-foreground">
            {filteredData.length} {filteredData.length === 1 ? "item" : "items"}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={scrollNext}
            className="hover:border-primary hover:text-primary transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Carousel */}
        <div className="embla overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex">
            {filteredData.map((item, index) => (
              <div
                key={item.id}
                className="embla__slide flex-[0_0_90%] md:flex-[0_0_45%] lg:flex-[0_0_33.333%] pl-4"
              >
                <Card
                  className="h-full glass-effect hover:scale-105 transition-all duration-500 animate-fade-in group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div
                        className={`p-3 rounded-lg bg-gradient-to-r ${
                          categoryConfig[item.category].color
                        } mr-4 text-white group-hover:scale-110 transition-transform duration-300`}
                      >
                        {item.icon}
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {categoryConfig[item.category].label}
                      </Badge>
                    </div>
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
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {item.description}
                    </p>
                    {item.details && (
                      <ul className="space-y-1">
                        {item.details.map((detail, i) => (
                          <li
                            key={i}
                            className="text-sm text-muted-foreground flex items-center"
                          >
                            <span className="w-1 h-1 bg-primary rounded-full mr-2"></span>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
