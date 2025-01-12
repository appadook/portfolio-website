'use client'

import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Experience from '@/components/Experience'
import Academics from '@/components/Academics'
import Skills from '@/components/Skills-new'
import Contact from '@/components/ContactForm'

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#121212] text-[#E0E0E0]"
    >
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Academics />
        <Skills />
        <Contact />
      </main>
    </motion.div>
  )
}

