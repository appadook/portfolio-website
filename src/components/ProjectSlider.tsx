// components/ProjectSlider.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { projects } from "@/data/projects";
import Image from "next/image";

export default function ProjectSlider() {
  const [currentProject, setCurrentProject] = useState(0);

  const nextProject = () => setCurrentProject((prev) => (prev + 1) % projects.length);
  const prevProject = () => setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);

  return (
    <div id="projects" className="relative flex flex-col items-center justify-center w-screen backdrop-blur-sm py-12">
      <h2 className="text-3xl font-bold mb-6 text-white">Personal Projects</h2>
      
      <div className="flex items-center w-full max-w-[1800px] px-4">
        <Button
          variant="outline"
          size="icon"
          className="z-10 mr-4 bg-white/10 backdrop-blur-sm border-gray-200/20 hover:bg-white/20 transition-colors"
          onClick={prevProject}
        >
          <ChevronLeft className="h-6 w-6 text-white" />
          <span className="sr-only">Previous project</span>
        </Button>

        <div className="overflow-hidden flex-1">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentProject * 100}%)` }}
          >
            {projects.map((project, index) => (
              <div 
                key={index} 
                className="w-full flex-shrink-0 px-8"
                style={{ transform: 'scale(0.95)', transition: 'transform 0.5s' }}
              >
                <div className="rounded-lg overflow-hidden border border-gray-200/20 flex flex-col md:flex-row bg-white/10 backdrop-blur-md backdrop-filter max-w-[1200px] mx-auto">
                  {/* Image Section - Made responsive */}
                  <div className="relative md:w-auto md:flex-1 aspect-[16/9]">
                    <Image
                      src={project.image}
                      alt={project.title}
                      layout="fill"
                      objectFit="contain"
                      className="w-full h-full bg-black/30"
                    />
                  </div>
                  {/* Text Content Section */}
                  <div className="p-8 flex flex-col justify-between md:w-[600px] shrink-0">
                    <div>
                      <h3 className="text-3xl font-bold mb-4 text-white">{project.title}</h3>
                      <p className="text-gray-300 mb-6 text-lg">{project.description}</p>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {project.techStack.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="bg-primary text-white px-3 py-1.5 rounded text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Button
          variant="outline"
          size="icon"
          className="z-10 ml-4 bg-white/10 backdrop-blur-sm border-gray-200/20 hover:bg-white/20 transition-colors"
          onClick={nextProject}
        >
          <ChevronRight className="h-6 w-6 text-white" />
          <span className="sr-only">Next project</span>
        </Button>
      </div>
    </div>
  );
}
