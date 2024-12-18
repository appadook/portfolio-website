'use client'

import { motion } from 'framer-motion'

export default function Academics() {
  return (
    <motion.section
      id="academics"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-20"
    >
      <h2 className="text-3xl font-bold mb-8 text-center">Academics</h2>
      <motion.div
        initial={{ y: 50 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-[#1E1E1E] p-6 rounded-lg max-w-2xl mx-auto"
      >
        <h3 className="text-xl font-semibold text-[#00E5FF]">Double Bachelor of Science in Computer Science & Economics</h3>
        <p className="text-[#FF4081]">Union College</p>
        <p className="text-sm text-gray-400">Expected Graduation: June 2025</p>
        <p className="mt-4">GPA: 3.5/4.0</p>
        <p className="mt-2">Relevant Coursework: Data Structures and Algorithms, Software Engineering, Programming Languages, Compiler Design, Data Visualization, Databases, Natural Language Processing</p>
      </motion.div>
    </motion.section>
  )
}

