import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Filter, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
    <AnimatedSection id="projects" className="py-20 relative">
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
            <span className="gradient-text">Featured Projects</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            A showcase of my work spanning software engineering, machine
            learning, and quantitative research
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {categories.map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.4, 
                delay: 0.1 * index,
                type: "spring",
                stiffness: 200
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              viewport={{ once: true }}
            >
              <Button
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-primary to-accent text-white glow-effect"
                    : "hover:border-primary hover:text-primary"
                }`}
              >
                <Filter className="w-4 h-4 mr-2" />
                {category}
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
            <p className="mt-4 text-muted-foreground">Loading projects...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-destructive">Failed to load projects. Please try again later.</p>
          </div>
        )}

        {/* Projects Grid - Smaller Cards */}
        {!isLoading && !error && (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, amount: 0.1 }}
          >
            <AnimatePresence mode="wait">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project._id}
                layout
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: {
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: [0.25, 0.25, 0.25, 0.75]
                  }
                }}
                exit={{ 
                  opacity: 0, 
                  scale: 0.8,
                  transition: { duration: 0.3 }
                }}
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <Card
                  className="group glass-effect cursor-pointer h-full"
                  onClick={() => openProjectModal(project)}
                >
                  {/* Project Image */}
                  <div className="h-32 relative overflow-hidden rounded-t-lg">
                    {project.image ? (
                      <motion.img
                        src={project.image}
                        alt={`${project.title} screenshot`}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      />
                    ) : (
                      <motion.div 
                        className="h-full bg-gradient-to-br from-primary/20 to-accent/20"
                        whileHover={{ 
                          background: "linear-gradient(135deg, rgba(var(--primary), 0.3), rgba(var(--accent), 0.3))"
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <motion.div 
                      className="absolute top-2 left-2 flex flex-wrap gap-1"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                    >
                      <Badge variant="secondary" className="text-xs">
                        {project.categories[0]}
                      </Badge>
                      {project.categories.length > 1 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.categories.length - 1}
                        </Badge>
                      )}
                    </motion.div>
                    
                    <motion.div 
                      className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.2, type: "spring", stiffness: 200 }}
                    >
                      <div className="p-2 rounded-full bg-primary/20 backdrop-blur-sm">
                        <Eye className="w-4 h-4 text-white" />
                      </div>
                    </motion.div>
                  </div>

                  <CardContent className="p-4">
                    {/* Compact Title */}
                    <motion.h3 
                      className="font-semibold text-sm mb-2 group-hover:text-primary transition-colors line-clamp-2"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      {project.title}
                    </motion.h3>

                    {/* Short Description */}
                    <motion.p 
                      className="text-xs text-muted-foreground mb-3 line-clamp-2"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                    >
                      {project.description}
                    </motion.p>

                    {/* Compact Tech Stack - Show only first 3 */}
                    <motion.div 
                      className="flex flex-wrap gap-1 mb-3"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 }}
                    >
                      {project.techStack.slice(0, 3).map((tech, techIndex) => (
                        <motion.div
                          key={tech}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ 
                            duration: 0.3, 
                            delay: 0.5 + (techIndex * 0.1) 
                          }}
                        >
                          <Badge
                            variant="outline"
                            className="text-xs px-2 py-0.5"
                          >
                            {tech}
                          </Badge>
                        </motion.div>
                      ))}
                      {project.techStack.length > 3 && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.8 }}
                        >
                          <Badge variant="secondary" className="text-xs px-2 py-0.5">
                            +{project.techStack.length - 3}
                          </Badge>
                        </motion.div>
                      )}
                    </motion.div>

                    {/* Quick Actions */}
                    <motion.div 
                      className="flex items-center justify-between text-xs"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 }}
                    >
                      <div className="flex items-center space-x-2">
                        {project.githubUrl && (
                          <motion.div
                            whileHover={{ scale: 1.2, rotate: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Github className="w-4 h-4 text-muted-foreground" />
                          </motion.div>
                        )}
                        {project.liveUrl && (
                          <motion.div
                            whileHover={{ scale: 1.2, rotate: -5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ExternalLink className="w-4 h-4 text-muted-foreground" />
                          </motion.div>
                        )}
                      </div>
                      <span className="text-muted-foreground hover:text-primary transition-colors">
                        View Details
                      </span>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
          </motion.div>
        )}

        {/* Show More Button */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="outline"
              size="lg"
              className="hover:border-primary hover:text-primary transition-all duration-300"
            >
              View All Projects
            </Button>
          </motion.div>
        </motion.div>

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
