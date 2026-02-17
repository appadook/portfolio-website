import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import { useBreakpoint } from '@/hooks/use-mobile';
import type { ProgrammingLanguage } from '@/lib/portfolio.types';

// Icon mapping for programming languages
const languageIcons: Record<string, string> = {
  Python: '🐍',
  TypeScript: '📘',
  JavaScript: '💛',
  Java: '☕',
  SQL: '🗄️',
  'C++': '⚙️',
  C: '🔧',
  R: '📊',
  Go: '🐹',
  Rust: '🦀',
};

const getLevelColor = (level: string) => {
  switch (level) {
    case 'expert':
      return 'bg-primary text-primary-foreground';
    case 'advanced':
      return 'bg-primary/20 text-primary border border-primary/30';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

const getLevelWidth = (level: string) => {
  switch (level) {
    case 'expert':
      return '100%';
    case 'advanced':
      return '75%';
    default:
      return '50%';
  }
};

const SkillsSection = ({
  programmingLanguages,
}: {
  programmingLanguages: ProgrammingLanguage[];
}) => {
  const { isSmall } = useBreakpoint();

  return (
    <AnimatedSection id="skills" className="py-20 md:py-32 relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/3 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-primary/2 rounded-full blur-3xl" />
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
              Core Skills
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
            <span className="text-foreground">Programming </span>
            <span className="text-primary italic">Languages</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            The programming languages I use to build solutions and bring ideas to life.
          </motion.p>
        </motion.div>

        {/* Programming Languages Grid */}
        {programmingLanguages.length > 0 ? (
          <motion.div
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="card-luxe p-4 sm:p-8">
              {/* Header */}
              <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 pb-4 sm:pb-6 border-b border-border/50">
                <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                  <Code2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    Core Languages
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {programmingLanguages.length} languages in my toolkit
                  </p>
                </div>
              </div>

              {/* Mobile: Compact 3x3 Icon Grid with Labels */}
              {isSmall ? (
                <div className="grid grid-cols-3 gap-3">
                  {programmingLanguages.map((language, index) => (
                    <motion.div
                      key={language.name}
                      className={`group flex flex-col items-center justify-center p-3 rounded-xl bg-background-subtle/50 border transition-all duration-300 ${
                        language.level === 'expert' 
                          ? 'border-primary/40' 
                          : language.level === 'advanced' 
                            ? 'border-primary/20' 
                            : 'border-border/30'
                      }`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.05 * index }}
                      viewport={{ once: true }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-2xl mb-1.5">
                        {languageIcons[language.name] || '💻'}
                      </span>
                      <span className="text-[10px] font-medium text-muted-foreground text-center leading-tight">
                        {language.name}
                      </span>
                      {/* Level indicator dot */}
                      <div className={`w-1.5 h-1.5 rounded-full mt-1.5 ${
                        language.level === 'expert' 
                          ? 'bg-primary' 
                          : language.level === 'advanced' 
                            ? 'bg-primary/50' 
                            : 'bg-muted-foreground/50'
                      }`} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                /* Desktop: Full Cards Grid */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {programmingLanguages.map((language, index) => (
                    <motion.div
                      key={language.name}
                      className="group p-4 sm:p-5 rounded-xl bg-background-subtle/50 border border-border/30 hover:border-primary/30 transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      viewport={{ once: true }}
                      whileHover={{ y: -4 }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                            {languageIcons[language.name] || '💻'}
                          </span>
                          <h4 className="font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                            {language.name}
                          </h4>
                        </div>
                        <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getLevelColor(language.level)}`}>
                          {language.level.charAt(0).toUpperCase() + language.level.slice(1)}
                        </span>
                      </div>

                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {language.description}
                      </p>

                      {/* Progress bar */}
                      <div className="h-1 bg-border/50 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: getLevelWidth(language.level) }}
                          transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Proficiency Legend */}
            <motion.div
              className="mt-8 flex flex-wrap justify-center gap-6 text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-muted-foreground font-mono text-xs">Expert</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary/50" />
                <span className="text-muted-foreground font-mono text-xs">Advanced</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-muted-foreground/50" />
                <span className="text-muted-foreground font-mono text-xs">Intermediate</span>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-muted-foreground">No programming languages available yet.</p>
          </div>
        )}
      </div>
    </AnimatedSection>
  );
};

export default SkillsSection;
