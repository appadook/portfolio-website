import { useState } from "react";
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
import { projects } from "@/data/portfolio";

// Define the Project interface to match our data structure
interface Project {
  id: number;
  title: string;
  description: string;
  longDescription?: string;
  categories: Array<
    | "AI/ML"
    | "Software Engineering"
    | "Web Dev"
    | "System Engineering"
    | "Quantitative Dev"
    | "Research"
  >;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  features?: string[];
  challenges?: string[];
  outcomes?: string[];
  timeline?: string;
  teamSize?: string;
}

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
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) =>
          project.categories.includes(selectedCategory as "AI/ML" | "Software Engineering" | "Web Dev" | "System Engineering" | "Quantitative Dev" | "Research")
        );

  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeProjectModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Featured Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A showcase of my work spanning software engineering, machine
            learning, and quantitative research
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
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
          ))}
        </div>

        {/* Projects Grid - Smaller Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProjects.map((project, index) => (
            <Card
              key={project.id}
              className="group glass-effect hover:scale-105 transition-all duration-500 cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => openProjectModal(project)}
            >
              {/* Project Image */}
              <div className="h-32 relative overflow-hidden rounded-t-lg">
                {project.imageUrl ? (
                  <img
                    src={project.imageUrl}
                    alt={`${project.title} screenshot`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="h-full bg-gradient-to-br from-primary/20 to-accent/20" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                  <Badge variant="secondary" className="text-xs">
                    {project.categories[0]}
                  </Badge>
                  {project.categories.length > 1 && (
                    <Badge variant="outline" className="text-xs">
                      +{project.categories.length - 1}
                    </Badge>
                  )}
                </div>
                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="p-2 rounded-full bg-primary/20 backdrop-blur-sm">
                    <Eye className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>

              <CardContent className="p-4">
                {/* Compact Title */}
                <h3 className="font-semibold text-sm mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {project.title}
                </h3>

                {/* Short Description */}
                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                  {project.description}
                </p>

                {/* Compact Tech Stack - Show only first 3 */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <Badge
                      key={tech}
                      variant="outline"
                      className="text-xs px-2 py-0.5"
                    >
                      {tech}
                    </Badge>
                  ))}
                  {project.techStack.length > 3 && (
                    <Badge variant="secondary" className="text-xs px-2 py-0.5">
                      +{project.techStack.length - 3}
                    </Badge>
                  )}
                </div>

                {/* Quick Actions */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    {project.githubUrl && (
                      <Github className="w-4 h-4 text-muted-foreground" />
                    )}
                    {project.liveUrl && (
                      <ExternalLink className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                  <span className="text-muted-foreground hover:text-primary transition-colors">
                    View Details
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Show More Button */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="hover:border-primary hover:text-primary transition-all duration-300 hover:scale-105"
          >
            View All Projects
          </Button>
        </div>

        {/* Project Modal */}
        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={closeProjectModal}
        />
      </div>
    </section>
  );
};

export default ProjectsSection;
