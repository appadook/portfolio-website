'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import { Github } from 'lucide-react'
import {projects} from '@/data/projects'


function ProjectCard({ project }: { project: typeof projects[0] }) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div 
      className="w-full h-[400px] relative"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="w-full h-full absolute"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 300, damping: 30 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front of the card */}
        <div className="w-full h-full absolute backface-hidden">
          <Image
            src={project.image}
            alt={project.title}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>

        {/* Back of the card */}
        <div className="w-full h-full absolute backface-hidden bg-[#1E1E1E] p-6 rounded-lg flex flex-col justify-between overflow-y-auto"
             style={{ transform: 'rotateY(180deg)' }}>
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-[#FF4081]">{project.title}</h3>
            <p className="mb-4 text-[#E0E0E0]">{project.description}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-2 text-[#00E5FF]">Technologies:</h4>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech, index) => (
                <span key={index} className="text-xs bg-[#2A2A2A] px-2 py-1 rounded-full text-[#00E5FF]">
                  {tech}
                </span>
              ))}
            </div>
            {/* <a 
              href={project.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-[#00E5FF] hover:text-[#FF4081] transition-colors"
            >
              <Github className="mr-2" size={20} />
              View on GitHub
            </a> */}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="py-20">
      <h2 className="text-3xl font-bold mb-8 text-center">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </section>
  )
}

