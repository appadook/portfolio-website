import { motion } from 'framer-motion';
import { Cloud } from 'lucide-react';
import React, { useState, useMemo } from 'react';
import CertificateModal from './CertificateModal';
import CertificateItem from './CertificateItem';
import { useTechnologies, useCloudProvidersWithCertificates } from '@/hooks/useSanityData';
import type { Technology, CloudProvider, Certificate } from '@/lib/sanity.types';
import AnimatedSection from './AnimatedSection';
import { useBreakpoint } from '@/hooks/use-mobile';
import {
  categoryIcons,
  technologyIcons,
  cloudProviderIcons,
} from '@/data/technologyIcons';

// Tech category configuration
const techCategoryConfig = [
  { title: 'Frontend', color: 'primary' },
  { title: 'Backend', color: 'primary' },
  { title: 'Database', color: 'primary' },
  { title: 'Mobile', color: 'primary' },
  { title: 'Testing & QA', color: 'primary' },
  { title: 'DevOps', color: 'primary' },
];

// Type for tech with icon
type TechWithIcon = Technology & { icon: any };

// Type for category with technologies
type TechCategory = {
  title: string;
  color: string;
  icon: any;
  technologies: TechWithIcon[];
};

// Components
const TechnologyBadge = ({ tech }: { tech: TechWithIcon }) => {
  const IconComponent = tech.icon;
  return (
    <motion.div
      className="flex items-center gap-2 px-3 py-2 bg-background-subtle border border-border/50 rounded-lg hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 group"
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      <IconComponent className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
      <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">
        {tech.name}
      </span>
    </motion.div>
  );
};

// Compact mobile icon badge with label
const TechnologyIconBadge = ({ tech }: { tech: TechWithIcon }) => {
  const IconComponent = tech.icon;
  return (
    <motion.div
      className="flex flex-col items-center justify-center p-3 bg-background-subtle border border-border/50 rounded-lg"
      whileTap={{ scale: 0.95 }}
    >
      <IconComponent className="w-7 h-7 text-muted-foreground mb-1.5" />
      <span className="text-[9px] font-medium text-muted-foreground text-center leading-tight line-clamp-1">
        {tech.name}
      </span>
    </motion.div>
  );
};

const CloudProviderCard = ({ provider }: { provider: CloudProvider }) => {
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getCloudIcon = (name: string) => {
    return cloudProviderIcons[name] || Cloud;
  };

  const CloudIcon = getCloudIcon(provider.name);

  const handleCertificateClick = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCertificate(null);
  };

  const certCount = provider.certificates?.length || 0;

  return (
    <>
      <div className="p-5 bg-background-subtle/50 border border-border/30 rounded-xl hover:border-primary/30 transition-all duration-300">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/20">
            <CloudIcon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h4 className="font-medium text-foreground">{provider.name}</h4>
            <p className="text-xs text-muted-foreground font-mono">
              {certCount > 0 ? `${certCount} certification${certCount === 1 ? '' : 's'}` : 'In progress'}
            </p>
          </div>
        </div>

        {certCount > 0 ? (
          <div className="space-y-2">
            {provider.certificates!.map((cert, index) => (
              <CertificateItem
                key={cert._id || index}
                certificate={cert}
                onClick={() => handleCertificateClick(cert)}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Learning in progress...</p>
        )}
      </div>

      <CertificateModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        certificate={selectedCertificate}
        providerName={provider.name}
      />
    </>
  );
};

const TechnologiesSectionV2 = () => {
  const { data: technologies, isLoading: techLoading, error: techError } = useTechnologies();
  const { data: cloudProviders, isLoading: cloudLoading, error: cloudError } = useCloudProvidersWithCertificates();
  const { isSmall } = useBreakpoint();

  const techCategories: TechCategory[] = useMemo(() => {
    if (!technologies) return [];

    return techCategoryConfig.map(config => {
      const categoryTechs = technologies
        .filter(tech => tech.category === config.title)
        .map(tech => ({
          ...tech,
          icon: technologyIcons[tech.name] || Cloud
        }));

      return {
        ...config,
        icon: categoryIcons[config.title],
        technologies: categoryTechs
      };
    }).filter(category => category.technologies.length > 0);
  }, [technologies]);

  if (techLoading || cloudLoading) {
    return (
      <AnimatedSection id="technologies" className="py-20 md:py-32 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-20">
            <motion.div
              className="flex flex-col items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="w-12 h-12 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
              <p className="text-muted-foreground font-mono text-sm">Loading technologies...</p>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>
    );
  }

  if (techError || cloudError) {
    return (
      <AnimatedSection id="technologies" className="py-20 md:py-32 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <p className="text-muted-foreground">Failed to load technologies. Please try again later.</p>
          </div>
        </div>
      </AnimatedSection>
    );
  }

  return (
    <AnimatedSection id="technologies" className="py-20 md:py-32 relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-primary/2 rounded-full blur-3xl" />
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
              Tech Stack
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
            <span className="text-foreground">Technology </span>
            <span className="text-primary italic">Stack</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            A comprehensive overview of my technical expertise across modern development tools,
            frameworks, and cloud platforms.
          </motion.p>
        </motion.div>

        {/* Main Grid - stack on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
          {/* Tech Categories - 2 columns on large screens */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {techCategories.map((category, categoryIndex) => {
                const IconComponent = category.icon;

                return (
                  <motion.div
                    key={category.title}
                    className="card-luxe p-4 sm:p-6"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center gap-3 mb-4 sm:mb-5">
                      <div className="p-2 sm:p-2.5 rounded-xl bg-primary/10 border border-primary/20">
                        <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-display text-base sm:text-lg font-semibold text-foreground">
                          {category.title}
                        </h3>
                        <p className="text-[10px] sm:text-xs text-muted-foreground font-mono">
                          {category.technologies.length} technologies
                        </p>
                      </div>
                    </div>

                    {/* Mobile: 3-column icon grid / Desktop: flex wrap badges */}
                    {isSmall ? (
                      <div className="grid grid-cols-3 gap-2">
                        {category.technologies.map((tech, techIndex) => (
                          <motion.div
                            key={tech._id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.2, delay: 0.1 + techIndex * 0.02 }}
                            viewport={{ once: true }}
                          >
                            <TechnologyIconBadge tech={tech} />
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {category.technologies.map((tech, techIndex) => (
                          <motion.div
                            key={tech._id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.2 + techIndex * 0.03 }}
                            viewport={{ once: true }}
                          >
                            <TechnologyBadge tech={tech} />
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Cloud Platforms */}
          <div className="lg:col-span-1">
            <motion.div
              className="card-luxe p-4 sm:p-6 h-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
                  <Cloud className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    Cloud Platforms
                  </h3>
                  <p className="text-xs text-muted-foreground font-mono">
                    Infrastructure & Services
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {cloudProviders && cloudProviders.map((provider, index) => (
                  <motion.div
                    key={provider._id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <CloudProviderCard provider={provider} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Tech count summary */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-muted-foreground font-mono">
            {technologies?.length || 0} technologies across {techCategories.length} categories
          </p>
        </motion.div>
      </div>
    </AnimatedSection>
  );
};

export default TechnologiesSectionV2;
