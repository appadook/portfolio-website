'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { GithubIcon, LinkedinIcon, MailIcon, FileText, Code, Cpu, Database, Globe, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import * as THREE from 'three'

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [currentProject, setCurrentProject] = useState(0)
  const projects = [
    { title: "Project 1", description: "A brief description of project 1", tech: "React, Node.js, MongoDB" },
    { title: "Project 2", description: "A brief description of project 2", tech: "Vue.js, Express, PostgreSQL" },
    { title: "Project 3", description: "A brief description of project 3", tech: "Angular, Django, MySQL" },
    { title: "Project 4", description: "A brief description of project 4", tech: "React Native, Firebase" },
  ]

  const scrollTo = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(id)
    }
  }

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length)
  }

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length)
  }

  useEffect(() => {
    if (canvasRef.current) {
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
      const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true })
      renderer.setSize(window.innerWidth, window.innerHeight)

      const geometry = new THREE.TorusGeometry(5, 2, 16, 100)
      const material = new THREE.MeshBasicMaterial({ color: 0x9333ea, wireframe: true })
      const torus = new THREE.Mesh(geometry, material)
      scene.add(torus)

      camera.position.z = 20

      const animate = () => {
        requestAnimationFrame(animate)
        torus.rotation.x += 0.005
        torus.rotation.y += 0.005
        renderer.render(scene, camera)
      }

      animate()

      const handleResize = () => {
        const width = window.innerWidth
        const height = window.innerHeight
        camera.aspect = width / height
        camera.updateProjectionMatrix()
        renderer.setSize(width, height)
      }

      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-10 bg-black/80 backdrop-blur-sm">
        <nav className="container mx-auto px-4 py-2">
          <ul className="flex justify-center space-x-4">
            {['home', 'projects', 'skills', 'resume', 'contact'].map((item) => (
              <li key={item}>
                <Button
                  variant={activeSection === item ? 'secondary' : 'ghost'}
                  onClick={() => scrollTo(item)}
                  className="transition-all duration-300 hover:scale-110 hover:bg-purple-700 hover:text-white"
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </Button>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main>
        {/* Hero Section with 3D Background */}
        <section id="home" className="relative h-screen flex flex-col items-center justify-center pt-16">
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
          <div className="relative z-10 text-center">
            <h1 className="text-5xl font-bold mb-4 text-purple-500">Kurtik Appadoo</h1>
            <p className="text-xl mb-8 text-gold-500">Computer Science & Economics student | Aspiring Software Developer</p>
          </div>
          <div className="relative z-10 mt-auto mb-8">
            <div className="flex justify-center space-x-4">
              <Button variant="outline" size="icon" className="bg-gold-500 hover:bg-purple-700 hover:text-white transition-colors duration-300">
                <GithubIcon className="h-5 w-5 text-black" />
              </Button>
              <Button variant="outline" size="icon" className="bg-gold-500 hover:bg-purple-700 hover:text-white transition-colors duration-300">
                <LinkedinIcon className="h-5 w-5 text-black" />
              </Button>
              <Button variant="outline" size="icon" className="bg-gold-500 hover:bg-purple-700 hover:text-white transition-colors duration-300">
                <MailIcon className="h-5 w-5 text-black" />
              </Button>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center text-purple-500">My Projects</h2>
            <div className="relative">
              <Button 
                variant="outline" 
                size="icon" 
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-purple-700 text-white"
                onClick={prevProject}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="overflow-hidden">
                <div 
                  className="flex transition-transform duration-300 ease-in-out"
                  style={{ transform: `translateX(-${currentProject * 100}%)` }}
                >
                  {projects.map((project, index) => (
                    <Card key={index} className="w-full flex-shrink-0 mx-4 bg-black border-purple-500">
                      <Image
                        src={`/placeholder.svg?height=200&width=400&text=${project.title}`}
                        alt={project.title}
                        width={400}
                        height={200}
                        className="w-full h-48 object-cover"
                      />
                      <CardHeader>
                        <CardTitle className="text-purple-500">{project.title}</CardTitle>
                        <CardDescription className="text-gold-500">{project.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-white">Technologies used: {project.tech}</p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="secondary" className="bg-gold-500 text-black hover:bg-purple-600 hover:text-white">View Project</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
              <Button 
                variant="outline" 
                size="icon" 
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-purple-700 text-white"
                onClick={nextProject}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center text-purple-500">Skills & Technologies</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: <Code className="h-8 w-8 mb-2 text-white" />, name: 'Programming Languages', skills: ['Java', 'Python', 'JavaScript'] },
                { icon: <Globe className="h-8 w-8 mb-2 text-white" />, name: 'Web Technologies', skills: ['HTML', 'CSS', 'React'] },
                { icon: <Database className="h-8 w-8 mb-2 text-white" />, name: 'Databases', skills: ['MySQL', 'MongoDB'] },
                { icon: <Cpu className="h-8 w-8 mb-2 text-white" />, name: 'Other', skills: ['Git', 'Docker', 'AWS'] },
              ].map((category, index) => (
                <Card key={index} className="text-center bg-gray-900 border-purple-500">
                  <CardHeader>
                    {category.icon}
                    <CardTitle className="text-purple-500">{category.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-gold-500">
                      {category.skills.map((skill, skillIndex) => (
                        <li key={skillIndex}>{skill}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Resume Section */}
        <section id="resume" className="py-20 bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center text-purple-500">Resume</h2>
            <div className="max-w-2xl mx-auto">
              <Card className="bg-black border-purple-500">
                <CardHeader>
                  <CardTitle className="text-purple-500">Education</CardTitle>
                </CardHeader>
                <CardContent className="text-white">
                  <p>Bachelor of Science in Computer Science</p>
                  <p>University Name, Expected Graduation: May 2024</p>
                </CardContent>
              </Card>
              <Card className="mt-6 bg-black border-purple-500">
                <CardHeader>
                  <CardTitle className="text-purple-500">Experience</CardTitle>
                </CardHeader>
                <CardContent className="text-white">
                  <p>Software Development Intern</p>
                  <p>Company Name, Summer 2023</p>
                  <ul className="list-disc list-inside mt-2">
                    <li>Developed features for web applications</li>
                    <li>Collaborated with team members using Agile methodologies</li>
                  </ul>
                </CardContent>
              </Card>
              <div className="mt-6 text-center">
                <Button className="bg-gold-500 text-black hover:bg-purple-600 hover:text-white">
                  <FileText className="mr-2 h-4 w-4" /> Download Full Resume
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center text-purple-500">Contact Me</h2>
            <form className="max-w-md mx-auto">
              <div className="space-y-4">
                <Input placeholder="Your Name" className="bg-gray-900 text-white border-purple-500 focus:border-gold-500" />
                <Input type="email" placeholder="Your Email" className="bg-gray-900 text-white border-purple-500 focus:border-gold-500" />
                <Textarea placeholder="Your Message" className="bg-gray-900 text-white border-purple-500 focus:border-gold-500" />
                <Button type="submit" className="w-full bg-gold-500 text-black hover:bg-purple-600 hover:text-white">Send Message</Button>
              </div>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 py-6 text-center text-gold-500">
        <p>&copy; 2024 John Doe. All rights reserved.</p>
      </footer>
    </div>
  )
}