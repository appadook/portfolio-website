import React from 'react';
import { cn } from '@/lib/utils';
import { useInView } from '@/lib/animations';
import { Github, ExternalLink } from 'lucide-react';
import { type Project } from '@/lib/data/Project';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const [ref, isInView] = useInView<HTMLDivElement>();

  return (
    <Card
      ref={ref}
      className={cn(
        "flex flex-col h-full overflow-hidden group transition-all duration-700 transform border border-border",
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Image */}
      <div className="relative w-full h-52 overflow-hidden">
        <div className="absolute inset-0 bg-black/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {project.category && project.category.length > 0 && (
          <div className="absolute top-2 right-2 flex flex-wrap gap-1 justify-end z-20">
            {project.category.map((cat, i) => (
              <span 
                key={i} 
                className="px-2 py-1 text-xs font-medium bg-primary/80 text-primary-foreground rounded"
              >
                {cat}
              </span>
            ))}
          </div>
        )}
      </div>
      
      {/* Content */}
      <CardHeader className="pb-2">
        <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-300">
          {project.title}
        </h3>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <p className="text-muted-foreground mb-4 text-sm">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-2">
          {project.technologies.map((tech, i) => (
            <span
              key={i}
              className="px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="flex gap-4 pt-2 border-t border-border">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm"
          >
            <Github size={16} />
            <span>Code</span>
          </a>
        )}
        
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm"
          >
            <ExternalLink size={16} />
            <span>Live Demo</span>
          </a>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
