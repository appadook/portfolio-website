import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import ProjectModal from "./ProjectModal";
import { useProjects } from "@/hooks/useSanityData";
import type { Project } from "@/lib/sanity.types";
import AnimatedSection from "./AnimatedSection";

const categories = [
  "All",
  "AI/ML",
  "Software Engineering",
  "Web Dev",
  "System Engineering",
  "Quantitative Dev",
  "Research",
];

const ProjectsSection = () => {
  const { data: projects, isLoading, error } = useProjects();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProjects = useMemo(() => {
    if (!projects) return [];
    return selectedCategory === "All"
      ? projects
      : projects.filter((project) =>
          project.categories.includes(selectedCategory)
        );
  }, [projects, selectedCategory]);

  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeProjectModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <AnimatedSection id="projects" className="py-32 relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-primary/2 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
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
              Portfolio
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
            <span className="text-foreground">Featured </span>
            <span className="text-primary italic">Work</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            A showcase of my work spanning software engineering, machine
            learning, and quantitative research.
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
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
              {category}
            </motion.button>
          ))}
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
              <p className="text-muted-foreground font-mono text-sm">Loading projects...</p>
            </motion.div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">Failed to load projects. Please try again later.</p>
          </div>
        )}

        {/* Projects Grid */}
        {!isLoading && !error && (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, amount: 0.1 }}
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project._id}
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.6,
                      delay: index * 0.1,
                      ease: [0.4, 0, 0.2, 1],
                    },
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.95,
                    transition: { duration: 0.3 },
                  }}
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <motion.div
                    className="card-luxe h-full cursor-pointer group overflow-hidden"
                    onClick={() => openProjectModal(project)}
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  >
                    {/* Project Image */}
                    <div className="relative h-36 overflow-hidden">
                      {project.image ? (
                        <>
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          {/* Gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                          {/* Gold shimmer on hover */}
                          <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </>
                      ) : (
                        <div className="h-full bg-gradient-to-br from-card-hover to-card flex items-center justify-center">
                          <span className="text-4xl font-display text-primary/20">
                            {project.title.charAt(0)}
                          </span>
                        </div>
                      )}

                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="tag-luxe text-xs">
                          {project.categories[0]}
                        </span>
                      </div>

                      {/* View indicator on hover */}
                      <motion.div
                        className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ scale: 0.8 }}
                        whileHover={{ scale: 1 }}
                      >
                        <div className="w-10 h-10 rounded-full bg-primary/90 flex items-center justify-center backdrop-blur-sm">
                          <ArrowUpRight className="w-5 h-5 text-primary-foreground" />
                        </div>
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      {/* Title */}
                      <h3 className="font-display text-base font-semibold mb-1.5 text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-1">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-2">
                        {project.description}
                      </p>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {project.techStack.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 text-[10px] font-mono text-muted-foreground bg-background-subtle rounded border border-border/50"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 3 && (
                          <span className="px-2 py-0.5 text-[10px] font-mono text-primary bg-primary/10 rounded">
                            +{project.techStack.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Footer with links */}
                      <div className="flex items-center justify-between pt-3 border-t border-border/50">
                        <div className="flex items-center gap-2">
                          {project.githubUrl && (
                            <motion.a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="p-1.5 rounded-full border border-border/50 text-muted-foreground hover:border-primary/50 hover:text-primary transition-all duration-300"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Github className="w-3.5 h-3.5" />
                            </motion.a>
                          )}
                          {project.liveUrl && (
                            <motion.a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="p-1.5 rounded-full border border-border/50 text-muted-foreground hover:border-primary/50 hover:text-primary transition-all duration-300"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </motion.a>
                          )}
                        </div>

                        <span className="text-[10px] text-muted-foreground font-mono group-hover:text-primary transition-colors">
                          Details
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Results count */}
        {!isLoading && !error && (
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-sm text-muted-foreground font-mono">
              Showing {filteredProjects.length} of {projects?.length || 0} projects
            </p>
          </motion.div>
        )}

        {/* Project Modal */}
        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={closeProjectModal}
        />
      </div>
    </AnimatedSection>
  );
};

export default ProjectsSection;
