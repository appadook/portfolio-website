import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Cloud } from 'lucide-react';
import React, { useState, useMemo } from 'react';
import CertificateModal from './CertificateModal';
import CertificateItem from './CertificateItem';
import { useTechnologies, useCloudProvidersWithCertificates } from '@/hooks/useSanityData';
import type { Technology, CloudProvider, Certificate } from '@/lib/sanity.types';
import {
  categoryIcons,
  technologyIcons,
  cloudProviderIcons,
  floatingAnimationIcons
} from '@/data/technologyIcons';

// Tech category configuration
const techCategoryConfig = [
  { title: 'Frontend', color: 'primary' },
  { title: 'Backend', color: 'secondary' },
  { title: 'Database', color: 'accent' },
  { title: 'Mobile', color: 'primary' },
  { title: 'Testing & QA', color: 'secondary' },
  { title: 'DevOps', color: 'accent' },
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
    <Badge
      variant="secondary"
      className="flex items-center gap-2 px-3 py-1.5 bg-gradient-card border-0 hover:scale-105 hover:bg-orange-500/20 hover:border-orange-500/30 hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-200 group"
    >
      <IconComponent className="w-4 h-4 group-hover:scale-110 group-hover:text-orange-400 transition-all duration-200" />
      <span className="text-sm font-medium group-hover:text-orange-400 transition-colors duration-200">{tech.name}</span>
    </Badge>
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
      <Card className="p-6 bg-gradient-card border-0 shadow-card hover:shadow-hover transition-all duration-300">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-primary rounded-lg">
            <CloudIcon className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h4 className="font-semibold text-lg">{provider.name}</h4>
            <p className="text-sm text-muted-foreground">
              {certCount > 0 ? `${certCount} certification${certCount === 1 ? '' : 's'}` : 'Learning in progress...'}
            </p>
          </div>
        </div>

        {certCount > 0 ? (
          <div className="space-y-3">
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
      </Card>

      <CertificateModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        certificate={selectedCertificate}
        providerName={provider.name}
      />
    </>
  );
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const categoryVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 }
};

const TechnologiesSectionV2 = () => {
  const { data: technologies, isLoading: techLoading, error: techError } = useTechnologies();
  const { data: cloudProviders, isLoading: cloudLoading, error: cloudError } = useCloudProvidersWithCertificates();

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
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
            <p className="mt-4 text-muted-foreground">Loading technologies...</p>
          </div>
        </div>
      </section>
    );
  }

  if (techError || cloudError) {
    return (
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <p className="text-destructive">Failed to load technologies. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Technology Stack
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive overview of my technical expertise across modern development tools,
            frameworks, and cloud platforms
          </p>
        </motion.div>

        <motion.div
          className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="lg:col-span-2">
            <motion.div
              className="grid md:grid-cols-2 gap-6"
              variants={containerVariants}
            >
              {techCategories.map((category, categoryIndex) => {
                const IconComponent = category.icon;

                return (
                  <motion.div
                    key={category.title}
                    variants={categoryVariants}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="group"
                  >
                    <Card className="p-6 h-full bg-gradient-card border-0 shadow-card hover:shadow-hover transition-all duration-300">
                      <div className="flex items-center gap-3 mb-6">
                        <div className={`p-3 rounded-xl bg-gradient-${category.color} shadow-glow`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{category.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {category.technologies.length} technologies
                          </p>
                        </div>
                      </div>

                      <motion.div
                        className="flex flex-wrap gap-2"
                        variants={containerVariants}
                      >
                        {category.technologies.map((tech, techIndex) => (
                          <motion.div
                            key={tech._id}
                            variants={itemVariants}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <TechnologyBadge tech={tech} />
                          </motion.div>
                        ))}
                      </motion.div>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          <div className="lg:col-span-1">
            <motion.div
              variants={categoryVariants}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <Card className="p-6 h-full bg-gradient-card border-0 shadow-card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-accent shadow-glow">
                    <Cloud className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Cloud Platforms</h3>
                    <p className="text-sm text-muted-foreground">
                      Infrastructure & Services
                    </p>
                  </div>
                </div>

                <motion.div
                  className="space-y-4"
                  variants={containerVariants}
                >
                  {cloudProviders && cloudProviders.map((provider, index) => (
                    <motion.div
                      key={provider._id}
                      variants={itemVariants}
                    >
                      <CloudProviderCard provider={provider} />
                    </motion.div>
                  ))}
                </motion.div>
              </Card>
            </motion.div>
          </div>
        </motion.div>

        <div className="mt-16 relative h-32 overflow-hidden">
          <div className="absolute inset-0 flex items-center">
            <motion.div
              className="flex space-x-8 text-4xl opacity-20"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                repeat: Infinity,
                duration: 20,
                ease: "linear"
              }}
            >
              {floatingAnimationIcons.map((IconComponent, index) => (
                <span key={index} className="flex-shrink-0">
                  <IconComponent />
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologiesSectionV2;
