"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Github, ExternalLink } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Economic Data Visualizer",
    description:
      "Interactive dashboard for visualizing economic indicators and trends using React, D3.js, and Python for data processing.",
    image: "/project_images/crypto-project.png",
    category: "Data Analysis",
    tags: ["React", "D3.js", "Python", "Economic Data", "API Integration"],
    github: "#",
    
  },
  {
    id: 2,
    title: "E-Commerce Platform",
    description:
      "Full-stack e-commerce application with user authentication, product management, and payment processing.",
    image: "/placeholder.svg?height=200&width=300&text=E-Commerce+Platform",
    category: "Web Development",
    tags: ["Next.js", "MongoDB", "Stripe", "Tailwind CSS", "Authentication"],
    github: "#",
    
  },
  {
    id: 3,
    title: "Stock Market Predictor",
    description: "Machine learning model to predict stock market trends using historical data and sentiment analysis.",
    image: "/placeholder.svg?height=200&width=300&text=Stock+Market+Predictor",
    category: "Machine Learning",
    tags: ["Python", "TensorFlow", "Pandas", "NLP", "Financial Analysis"],
    github: "#",
    
  },
  {
    id: 4,
    title: "Budget Tracker App",
    description: "Mobile-first web application for tracking personal finances with visualization and budgeting tools.",
    image: "/placeholder.svg?height=200&width=300&text=Budget+Tracker",
    category: "Web Development",
    tags: ["React", "Firebase", "Chart.js", "PWA", "Financial Planning"],
    github: "#",
    
  },
  {
    id: 5,
    title: "Supply Chain Optimization Tool",
    description: "Algorithm to optimize supply chain logistics using economic principles and operations research.",
    image: "/placeholder.svg?height=200&width=300&text=Supply+Chain+Optimization",
    category: "Data Analysis",
    tags: ["Python", "Operations Research", "Optimization", "Data Visualization"],
    github: "#",
    
  },
  {
    id: 6,
    title: "Cryptocurrency Dashboard",
    description: "Real-time dashboard for tracking cryptocurrency prices, trends, and portfolio management.",
    image: "/placeholder.svg?height=200&width=300&text=Crypto+Dashboard",
    category: "Web Development",
    tags: ["React", "WebSockets", "API Integration", "Financial Data"],
    github: "#",
    
  },
]

export default function Projects() {
  const [activeTab, setActiveTab] = useState("all")
  const [flippedCards, setFlippedCards] = useState<number[]>([])

  const categories = ["All", ...new Set(projects.map((project) => project.category))]

  const filteredProjects =
    activeTab === "all"
      ? projects
      : projects.filter((project) => project.category.toLowerCase() === activeTab.toLowerCase())

  const toggleFlip = (id: number) => {
    setFlippedCards((prev) => (prev.includes(id) ? prev.filter((cardId) => cardId !== id) : [...prev, id]))
  }

  return (
    <section id="projects" className="w-full py-20 bg-muted/30">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of my technical projects spanning web development, data analysis, and economic applications.
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full mb-12">
          <div className="flex justify-center">
            <TabsList>
              {categories.map((category, index) => (
                <TabsTrigger
                  key={index}
                  value={category.toLowerCase()}
                  onClick={() => setActiveTab(category.toLowerCase())}
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value={activeTab} className="mt-8">
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="h-[280px] perspective-1000"
                  onMouseEnter={() => toggleFlip(project.id)}
                  onMouseLeave={() => toggleFlip(project.id)}
                >
                  <div
                    className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
                      flippedCards.includes(project.id) ? "rotate-y-180" : ""
                    }`}
                  >
                    {/* Front of card */}
                    <div className="absolute w-full h-full backface-hidden rounded-lg overflow-hidden border shadow-sm bg-card">
                      <div className="relative h-40 w-full bg-muted">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 300px"
                          priority={project.id <= 2}
                          unoptimized={project.image.includes('placeholder.svg')}
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-lg mb-1">{project.title}</h3>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {project.tags.slice(0, 2).map((tag, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {project.tags.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{project.tags.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Back of card */}
                    <div className="absolute w-full h-full backface-hidden rotate-y-180 rounded-lg overflow-hidden border shadow-sm bg-card flex flex-col p-4">
                      <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4 flex-grow">{project.description}</p>
                      <div className="flex justify-between mt-auto">
                        <Button variant="outline" size="sm" asChild>
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4 mr-1" />
                            Code
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>

        <div className="text-center">
          <Button variant="outline" size="lg">
            View All Projects on GitHub
          </Button>
        </div>
      </div>
    </section>
  )
}

