'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Github, Linkedin, Mail, ChevronLeft, ChevronRight } from "lucide-react"
import * as THREE from 'three'

export default function Component() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [currentProject, setCurrentProject] = useState(0)
  const [direction, setDirection] = useState(0)

  const projects = [
    {
      title: "AI-Powered Chess Engine",
      description: "Developed a chess engine using minimax algorithm with alpha-beta pruning. Implemented in Python with a PyQt5 GUI.",
      image: "/placeholder.svg?height=400&width=600",
      techStack: ["Python", "PyQt5", "AI Algorithms"]
    },
    {
      title: "Distributed File System",
      description: "Built a distributed file system in Go, featuring data replication, fault tolerance, and a simple client API.",
      image: "/placeholder.svg?height=400&width=600",
      techStack: ["Go", "Distributed Systems", "Network Programming"]
    },
    {
      title: "Real-time Collaboration Tool",
      description: "Created a web-based real-time collaboration tool using React, Node.js, and WebSockets, allowing multiple users to edit documents simultaneously.",
      image: "/placeholder.svg?height=400&width=600",
      techStack: ["React", "Node.js", "WebSockets", "MongoDB"]
    }
  ]

  useEffect(() => {
    if (!canvasRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true })

    renderer.setSize(window.innerWidth, window.innerHeight)

    const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
    const material = new THREE.MeshBasicMaterial({ color: 0x6366f1, wireframe: true })
    const torus = new THREE.Mesh(geometry, material)

    scene.add(torus)

    camera.position.z = 30

    const animate = () => {
      requestAnimationFrame(animate)

      torus.rotation.x += 0.01
      torus.rotation.y += 0.005

      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const nextProject = () => {
    setDirection(1)
    setCurrentProject((prev) => (prev + 1) % projects.length)
  }

  const prevProject = () => {
    setDirection(-1)
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Here you would typically handle the form submission,
    // e.g., sending the data to a server or API
    console.log('Form submitted')
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Enhanced Navbar */}
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 border-b">
        <div className="container flex h-16 items-center">
          <Link className="font-bold text-lg text-primary" href="#">
            CS Portfolio
          </Link>
          <div className="ml-auto flex gap-1">
            {["About", "Projects", "Languages", "Technologies", "Contact"].map((item) => (
              <Link
                key={item}
                className="px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground rounded-md"
                href={`#${item.toLowerCase()}`}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section with Three.js Animation */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl mb-4">John Doe</h1>
          <p className="text-xl max-w-[700px] text-muted-foreground">
            Aspiring computer scientist passionate about creating innovative solutions through code.
          </p>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="py-16 md:py-24">
        <div className="container">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">About Me</h2>
          <p className="max-w-[700px] text-muted-foreground text-lg">
            I'm a Computer Science student at [University Name], with a focus on [Your Focus Areas, e.g., artificial intelligence and web development]. I'm passionate about leveraging technology to solve real-world problems and constantly expanding my skillset. My journey in computer science has led me to explore various domains, from low-level systems programming to high-level web development and machine learning applications.
          </p>
        </div>
      </section>

      {/* Projects Section with Improved Slider and Tech Stack */}
      <section id="projects" className="py-16 md:py-24 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">Projects</h2>
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentProject * 100}%)` }}
            >
              {projects.map((project, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <Card className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={600}
                        height={400}
                        className="object-cover md:w-1/2"
                      />
                      <CardContent className="p-6 md:w-1/2">
                        <CardTitle className="text-2xl mb-2">{project.title}</CardTitle>
                        <p className="text-muted-foreground mb-4">{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.techStack.map((tech) => (
                            <span 
                              key={tech} 
                              className="px-2 py-1 bg-primary/10 text-primary rounded-full text-sm transition-colors duration-200 ease-in-out hover:bg-primary hover:text-primary-foreground cursor-default"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2"
              onClick={prevProject}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous project</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2"
              onClick={nextProject}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next project</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Programming Languages Section */}
      <section id="languages" className="py-16 md:py-24">
        <div className="container">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">Programming Languages</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {[
              { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
              { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
              { name: 'Java', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
              { name: 'C++', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
              { name: 'Go', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg' },
            ].map((lang) => (
              <div key={lang.name} className="flex flex-col items-center justify-center group">
                <div className="relative w-20 h-20 mb-2">
                  <Image
                    src={lang.logo}
                    alt={`${lang.name} logo`}
                    layout="fill"
                    objectFit="contain"
                    className="transition-opacity duration-300 group-hover:opacity-10"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-sm font-medium">{lang.name}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section id="technologies" className="py-16 md:py-24 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">Technologies</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {[
              { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
              { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
              { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
              { name: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
              { name: 'AWS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg' },
              { name: 'TensorFlow', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
              { name: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
              { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
              { name: 'Kubernetes', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg' },
              { name: 'GraphQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg' },
            ].map((tech) => (
              <div key={tech.name} className="flex flex-col items-center justify-center group">
                <div className="relative w-20 h-20 mb-2">
                  <Image
                    src={tech.logo}
                    alt={`${tech.name} logo`}
                    layout="fill"
                    objectFit="contain"
                    className="transition-opacity duration-300 group-hover:opacity-10"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-sm font-medium">{tech.name}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section with Form */}
      <section id="contact" className="py-16 md:py-24">
        <div className="container">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">Get In Touch</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-muted-foreground text-lg mb-4">
                I'm always open to new opportunities and collaborations. Whether you have a question or just want to say hi, feel free to reach out!
              </p>
              <div className="flex gap-4">
                <Button variant="outline" size="icon">
                  <Mail className="h-5 w-5" />
                  <span className="sr-only">Email</span>
                </Button>
                <Button variant="outline" size="icon">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Button>
                <Button variant="outline" size="icon">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Button>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <Input type="text" placeholder="Your Name" required />
              <Input type="email" placeholder="Your Email" required />
              <Textarea placeholder="Your Message" required />
              <Button type="submit">Send Message</Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}