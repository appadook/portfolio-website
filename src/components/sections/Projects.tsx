import React, { useState } from 'react';
import SectionHeader from '@/components/ui/SectionHeader';
import ProjectCard from '@/components/ui/ProjectCard';
import { projects } from '@/lib/data/Project';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Filter } from 'lucide-react';

const Projects = () => {
  // Extract unique categories from projects (now handling arrays)
  const categoriesSet = new Set<string>(['All']);
  projects.forEach(project => {
    if (project.category && project.category.length > 0) {
      project.category.forEach(cat => categoriesSet.add(cat));
    } 
  });
  categoriesSet.add('Other');
  const categories = Array.from(categoriesSet);
  
  // State for active filter
  const [activeFilter, setActiveFilter] = useState('All');
  
  // Filter projects based on active filter
  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => 
        project.category && project.category.includes(activeFilter)
      );

  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-6">
        <SectionHeader
          title="My Projects"
          subtitle="Featured Work"
        />
        
        {/* Filter Controls */}
        <div className="mb-10 flex justify-center">
          <div className="flex items-center gap-2 bg-secondary/30 p-2 rounded-lg">
            <Filter size={18} className="text-muted-foreground" />
            <ToggleGroup type="single" value={activeFilter} onValueChange={(value) => value && setActiveFilter(value)}>
              {categories.map((category) => (
                <ToggleGroupItem key={category} value={category} aria-label={`Filter by ${category}`} className="text-sm">
                  {category}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
        </div>
        
        {/* Project Grid - 2 columns on medium screens and above */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard 
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 border border-border rounded-md hover:bg-secondary transition-colors"
          >
            View More on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
