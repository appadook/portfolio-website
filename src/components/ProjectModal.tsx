import { X, Github, ExternalLink, Calendar, User, Code } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import type { Project } from '@/lib/sanity.types';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto glass-effect">
        <DialogHeader>
          <DialogTitle className="text-2xl gradient-text flex items-center">
            {project.title}
            <div className="ml-3 flex flex-wrap gap-2">
              {project.categories.map((category) => (
                <Badge key={category} variant="secondary">
                  {category}
                </Badge>
              ))}
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Project Image */}
          <div className="w-full h-64 rounded-lg relative overflow-hidden">
            {project.image ? (
              <img
                src={project.image}
                alt={`${project.title} screenshot`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <h3 className="text-white text-xl font-semibold">{project.title}</h3>
            </div>
          </div>

          {/* Project Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Main Description */}
            <Card className="glass-effect">
              <CardContent className="p-6">
                <h4 className="font-semibold text-lg mb-3 flex items-center">
                  <User className="w-5 h-5 mr-2 text-primary" />
                  Project Overview
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  {project.longDescription || project.description}
                </p>
              </CardContent>
            </Card>

            {/* Project Meta */}
            <Card className="glass-effect">
              <CardContent className="p-6">
                <h4 className="font-semibold text-lg mb-3 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-primary" />
                  Project Details
                </h4>
                <div className="space-y-2 text-sm">
                  {project.timeline && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Timeline:</span>
                      <span>{project.timeline}</span>
                    </div>
                  )}
                  {project.teamSize && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Team Size:</span>
                      <span>{project.teamSize}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Categories:</span>
                    <span>{project.categories.join(', ')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tech Stack */}
          <Card className="glass-effect">
            <CardContent className="p-6">
              <h4 className="font-semibold text-lg mb-3 flex items-center">
                <Code className="w-5 h-5 mr-2 text-primary" />
                Technologies Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <Badge key={tech} variant="outline" className="hover:border-primary transition-colors">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          {project.features && (
            <Card className="glass-effect">
              <CardContent className="p-6">
                <h4 className="font-semibold text-lg mb-3">Key Features</h4>
                <ul className="space-y-2">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Challenges & Outcomes */}
          {(project.challenges || project.outcomes) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.challenges && (
                <Card className="glass-effect">
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-lg mb-3">Challenges</h4>
                    <ul className="space-y-2">
                      {project.challenges.map((challenge, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-muted-foreground text-sm">{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {project.outcomes && (
                <Card className="glass-effect">
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-lg mb-3">Outcomes</h4>
                    <ul className="space-y-2">
                      {project.outcomes.map((outcome, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-muted-foreground text-sm">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-4 border-t border-border">
            {project.githubUrl && (
              <Button
                variant="outline"
                asChild
                className="hover:border-primary hover:text-primary transition-colors"
              >
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  View Code
                </a>
              </Button>
            )}
            {project.liveUrl && (
              <Button
                variant="outline"
                asChild
                className="hover:border-accent hover:text-accent transition-colors"
              >
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Live Demo
                </a>
              </Button>
            )}
            <Button
              variant="default"
              onClick={onClose}
              className="bg-gradient-to-r from-primary to-accent text-white hover:opacity-90"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;