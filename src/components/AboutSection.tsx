import { useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AnimatedSection from "./AnimatedSection";
import { useAboutCategories, useAboutItems } from "@/hooks/useSanityData";
import { getAboutIcon } from "@/data/aboutIcons";
import type { AboutItem as AboutItemType } from "@/lib/sanity.types";

const AboutSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
  });
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  // Fetch data from Sanity CMS
  const { data: categories, isLoading: categoriesLoading } = useAboutCategories();
  const { data: items, isLoading: itemsLoading } = useAboutItems();

  const isLoading = categoriesLoading || itemsLoading;

  // Filter items by selected category
  const filteredData =
    selectedCategory === "all"
      ? items || []
      : items?.filter((item) => item.category.name === selectedCategory) || [];

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  // Toggle expanded state for an item
  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  // Loading state
  if (isLoading) {
    return (
      <AnimatedSection id="about" className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-muted-foreground">Loading about section...</p>
          </div>
        </div>
      </AnimatedSection>
    );
  }

  // Render card with optional image and layout fixes
  const renderCard = (item: AboutItemType, index: number) => {
    const IconComponent = getAboutIcon(item.icon);
    const isExpanded = expandedItems.has(item._id);
    const hasLongDetails = item.details && item.details.length > 3;
    const displayedDetails = isExpanded ? item.details : item.details?.slice(0, 3);

    return (
      <motion.div
        key={item._id}
        className="embla__slide flex-[0_0_90%] md:flex-[0_0_45%] lg:flex-[0_0_33.333%] pl-4"
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        whileInView={{
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.6,
            delay: index * 0.1,
            ease: [0.25, 0.25, 0.25, 0.75],
          },
        }}
        viewport={{ once: true, amount: 0.2 }}
        whileHover={{
          y: -8,
          transition: { duration: 0.3, ease: "easeOut" },
        }}
      >
        <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
          <Card className="h-full glass-effect group cursor-pointer flex flex-col min-h-[280px] max-h-[400px]">
            {/* Optional Image */}
            {item.image && (
              <motion.div
                className="w-full aspect-video overflow-hidden rounded-t-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </motion.div>
            )}

            <CardHeader className="flex-shrink-0">
              <div className="flex items-start justify-between">
                <motion.div
                  className="p-3 rounded-lg mr-4 text-white"
                  style={{
                    background: `linear-gradient(135deg, ${item.category.color} 0%, ${item.category.color}dd 100%)`,
                  }}
                  whileHover={{
                    scale: 1.1,
                    rotate: 5,
                    transition: { duration: 0.2 },
                  }}
                >
                  <IconComponent className="w-6 h-6" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <Badge
                    variant="secondary"
                    className="text-xs"
                    style={{
                      borderColor: item.category.color,
                      color: item.category.color,
                    }}
                  >
                    {item.category.label}
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
                  <p className="text-sm text-muted-foreground">{item.date}</p>
                )}
              </motion.div>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col overflow-hidden">
              {item.description && (
                <motion.p
                  className="text-muted-foreground mb-4 leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  {item.description}
                </motion.p>
              )}

              {/* Details section with scrollable area */}
              {item.details && item.details.length > 0 && (
                <div className="flex-1 flex flex-col">
                  <motion.div
                    className={`space-y-1 ${
                      isExpanded ? "overflow-y-auto" : "max-h-[120px] overflow-y-auto"
                    } custom-scrollbar relative`}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <ul className="space-y-1">
                      {displayedDetails?.map((detail, i) => (
                        <motion.li
                          key={i}
                          className="text-sm text-muted-foreground flex items-start"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.4,
                            delay: 0.5 + i * 0.1,
                          }}
                        >
                          <motion.span
                            className="w-1 h-1 bg-primary rounded-full mr-2 mt-2 flex-shrink-0"
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{
                              duration: 0.3,
                              delay: 0.6 + i * 0.1,
                              type: "spring",
                              stiffness: 200,
                            }}
                          />
                          {detail}
                        </motion.li>
                      ))}
                    </ul>

                    {/* Fade indicator for scrollable content */}
                    {!isExpanded && hasLongDetails && (
                      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-card to-transparent pointer-events-none" />
                    )}
                  </motion.div>

                  {/* Show more/less button */}
                  {hasLongDetails && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleExpanded(item._id)}
                      className="mt-2 text-xs text-muted-foreground hover:text-foreground hover:bg-accent/50 flex items-center gap-1 transition-colors"
                    >
                      {isExpanded ? (
                        <>
                          Show less <ChevronUp className="w-3 h-3" />
                        </>
                      ) : (
                        <>
                          Show more ({item.details!.length - 3} more){" "}
                          <ChevronDown className="w-3 h-3" />
                        </>
                      )}
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    );
  };

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
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
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
          {categories?.map((category, index) => {
            const CategoryIcon = getAboutIcon(category.icon);
            return (
              <motion.div
                key={category._id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                viewport={{ once: true }}
              >
                <Button
                  variant={selectedCategory === category.name ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`transition-all duration-300 flex items-center gap-2 ${
                    selectedCategory === category.name
                      ? "bg-gradient-to-r from-primary to-accent text-white glow-effect"
                      : "hover:border-primary hover:text-primary"
                  }`}
                >
                  <CategoryIcon className="w-4 h-4" />
                  {category.label}
                </Button>
              </motion.div>
            );
          })}
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
              {filteredData.map((item, index) => renderCard(item, index))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Custom scrollbar styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: hsl(var(--primary) / 0.3);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: hsl(var(--primary) / 0.5);
        }
      `}</style>
    </AnimatedSection>
  );
};

export default AboutSection;
