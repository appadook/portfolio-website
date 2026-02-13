import { useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { useAboutCategories, useAboutItems } from "@/hooks/usePortfolioData";
import { getAboutIcon } from "@/data/aboutIcons";
import type { AboutItem as AboutItemType } from "@/lib/portfolio.types";

const AboutSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
  });
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  // Fetch data from Convex
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
      <AnimatedSection id="about" className="py-20 md:py-32 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <motion.div
              className="flex flex-col items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="w-12 h-12 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
              <p className="text-muted-foreground font-mono text-sm">Loading...</p>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>
    );
  }

  // Render card with luxe styling
  const renderCard = (item: AboutItemType, index: number) => {
    const IconComponent = getAboutIcon(item.icon);
    const isExpanded = expandedItems.has(item._id);
    const hasLongDetails = item.details && item.details.length > 3;
    const displayedDetails = isExpanded ? item.details : item.details?.slice(0, 3);

    return (
      <motion.div
        key={item._id}
        className="embla__slide flex-shrink-0 w-[280px] sm:w-[300px] md:w-[340px]"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.7,
            delay: Math.min(index * 0.1, 0.3),
            ease: [0.4, 0, 0.2, 1],
          },
        }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div
          className="h-full"
          whileHover={{ y: -8 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="card-luxe h-full flex flex-col min-h-[280px] sm:min-h-[320px] p-4 sm:p-6 group">
            {/* Optional Image */}
            {item.image && (
              <motion.div
                className="w-full aspect-video overflow-hidden rounded-xl mb-6 -mt-2 -mx-2"
                style={{ width: 'calc(100% + 1rem)' }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Gold overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            )}

            {/* Header with Icon and Badge */}
            <div className="flex items-start justify-between mb-4">
              <motion.div
                className="p-3 rounded-xl bg-primary/10 border border-primary/20 text-primary"
                whileHover={{
                  scale: 1.1,
                  boxShadow: '0 0 20px hsl(var(--primary) / 0.3)',
                }}
                transition={{ duration: 0.3 }}
              >
                <IconComponent className="w-5 h-5" />
              </motion.div>
              <span
                className="tag-luxe text-xs"
                style={{
                  borderColor: `${item.category.color}50`,
                  color: item.category.color,
                  background: `${item.category.color}10`,
                }}
              >
                {item.category.label}
              </span>
            </div>

            {/* Title and Metadata */}
            <div className="mb-4">
              <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300 mb-1">
                {item.title}
              </h3>
              {item.subtitle && (
                <p className="text-primary font-medium text-sm">{item.subtitle}</p>
              )}
              {item.date && (
                <p className="text-xs text-muted-foreground font-mono mt-1">{item.date}</p>
              )}
            </div>

            {/* Description */}
            {item.description && (
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {item.description}
              </p>
            )}

            {/* Details List */}
            {item.details && item.details.length > 0 && (
              <div className="flex-1 flex flex-col mt-auto">
                <div
                  className={`space-y-2 ${
                    isExpanded ? "overflow-y-auto max-h-[200px]" : "max-h-[100px] overflow-hidden"
                  } relative custom-scrollbar`}
                >
                  <ul className="space-y-2">
                    {displayedDetails?.map((detail, i) => (
                      <motion.li
                        key={i}
                        className="text-sm text-muted-foreground flex items-start gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: 0.3 + i * 0.05,
                        }}
                        viewport={{ once: true }}
                      >
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                        <span>{detail}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Fade gradient for overflow */}
                  {!isExpanded && hasLongDetails && (
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-card to-transparent pointer-events-none" />
                  )}
                </div>

                {/* Show more/less button */}
                {hasLongDetails && (
                  <button
                    onClick={() => toggleExpanded(item._id)}
                    className="mt-3 text-xs text-primary hover:text-primary-light flex items-center gap-1 transition-colors font-medium"
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
                  </button>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <AnimatedSection id="about" className="py-20 md:py-32 relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/3 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-primary/2 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="mb-16"
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
              Get to Know Me
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h2
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <span className="text-foreground">About </span>
            <span className="text-primary italic">Me</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            My journey through academics, achievements, and the passions that
            drive me forward.
          </motion.p>
        </motion.div>

        {/* Category Filter - horizontally scrollable on mobile */}
        <motion.div
          className="flex gap-2 sm:gap-3 mb-8 sm:mb-10 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap scrollbar-hide"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.button
            onClick={() => setSelectedCategory("all")}
            className={`px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
              selectedCategory === "all"
                ? "bg-primary text-primary-foreground"
                : "border border-border hover:border-primary/50 text-muted-foreground hover:text-foreground"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            All
          </motion.button>
          {categories?.map((category, index) => {
            const CategoryIcon = getAboutIcon(category.icon);
            return (
              <motion.button
                key={category._id}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 flex items-center gap-1.5 sm:gap-2 whitespace-nowrap flex-shrink-0 ${
                  selectedCategory === category.name
                    ? "bg-primary text-primary-foreground"
                    : "border border-border hover:border-primary/50 text-muted-foreground hover:text-foreground"
                }`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <CategoryIcon className="w-4 h-4" />
                {category.label}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Carousel Section */}
        <div className="relative">
          {/* Carousel Navigation */}
          <motion.div
            className="flex items-center justify-between mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={filteredData.length}
                className="text-sm text-muted-foreground font-mono"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {filteredData.length} {filteredData.length === 1 ? "item" : "items"}
              </motion.span>
            </AnimatePresence>

            <div className="flex items-center gap-3">
              <motion.button
                onClick={scrollPrev}
                className="w-10 h-10 rounded-full border border-border hover:border-primary/50 flex items-center justify-center text-muted-foreground hover:text-primary transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
              <motion.button
                onClick={scrollNext}
                className="w-10 h-10 rounded-full border border-border hover:border-primary/50 flex items-center justify-center text-muted-foreground hover:text-primary transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>

          {/* Carousel */}
          <div className="relative">
            <motion.div
              className="embla overflow-hidden"
              ref={emblaRef}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="embla__container flex gap-5 px-1">
                {filteredData.map((item, index) => renderCard(item, index))}
              </div>
            </motion.div>

            {/* Edge fade indicators */}
            <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
            <div className="absolute top-0 bottom-0 right-0 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
          </div>
        </div>
      </div>

      {/* Custom scrollbar styles */}
      <style>{`
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
