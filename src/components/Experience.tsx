'use client'

import { motion } from 'framer-motion'
import { jobs } from '@/data/experience'



export default function Experience() {
  return (
    <motion.section
      id="experience"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-20"
    >
      <h2 className="text-3xl font-bold mb-8 text-center">Work Experience</h2>
      <div className="space-y-8">
      {jobs.map((exp, index) => (
        <motion.div
        key={index}
        initial={{ x: -50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="bg-[#1E1E1E] p-6 rounded-lg"
        >
        <h3 className="text-xl font-semibold text-[#00E5FF]">{exp.title}</h3>
        <p className="text-[#FF4081] mb-2">{exp.company}</p>
        <p className="text-sm text-gray-400 mb-4">{exp.period}</p>
        <h4 className="text-lg font-semibold mb-2 text-[#00E5FF]">Descriptions:</h4>
        <ul className="list-disc list-inside space-y-1">
          {exp.description.map((desc, descIndex) => (
          <li key={descIndex}>{desc}</li>
          ))}
        </ul>
        </motion.div>
      ))}
      </div>
    </motion.section>
  )
}

