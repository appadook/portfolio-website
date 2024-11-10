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
    <div id="projects" className="relative flex flex-col items-center justify-center w-[95vw] max-w-[1500px] mx-auto overflow-hidden">
      <h2 className="text-3xl font-bold mb-6 text-white">Personal Projects</h2>
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 z-10 bg-white/10 backdrop-blur-sm border-gray-200/20 hover:bg-white/20 transition-colors"
        onClick={prevProject}
      >
        <ChevronLeft className="h-6 w-6 text-white" />
        <span className="sr-only">Previous project</span>
      </Button>

      <div
        className="flex transition-transform duration-500 ease-in-out w-full"
        style={{ transform: `translateX(-${currentProject * 100}%)` }}
      >
        {projects.map((project, index) => (
          <div key={index} className="w-full flex-shrink-0 px-4">
            <div className="rounded-lg overflow-hidden border border-gray-200/20 h-[300px] flex bg-white/10 backdrop-blur-md backdrop-filter">
              {/* Image Section */}
              <div className="relative w-1/2 h-full">
                <Image
                  src={project.image}
                  alt={project.title}
                  layout="fill"
                  objectFit="cover"
                  className="w-full h-full"
                />
              </div>
              {/* Text Content Section */}
              <div className="p-6 flex flex-col justify-between w-1/2">
                <h3 className="text-2xl font-bold mb-2 text-white">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex gap-2 flex-wrap">
                  {project.techStack.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="bg-primary text-white px-2 py-1 rounded text-sm"
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

      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 z-10 bg-white/10 backdrop-blur-sm border-gray-200/20 hover:bg-white/20 transition-colors"
        onClick={nextProject}
      >
        <ChevronRight className="h-6 w-6 text-white" />
        <span className="sr-only">Next project</span>
      </Button>
    </div>
  );
}
