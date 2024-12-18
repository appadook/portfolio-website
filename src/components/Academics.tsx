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
      
      <div className="flex flex-col lg:flex-row justify-center gap-8 px-4 max-w-7xl mx-auto">
        <motion.div
          initial={{ y: 50 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#1E1E1E] p-6 rounded-lg w-full lg:w-1/2"
        >
          <h3 className="text-xl font-semibold text-[#00E5FF]">Bachelor of Science in Computer Science</h3>
          <p className="text-[#FF4081]">Union College</p>
          <p className="text-sm text-gray-400">Expected Graduation: June 2025</p>
          <p className="mt-2"><span className="text-[#FF4081]">Relevant Coursework:</span> Data Structures and Algorithms, Software Engineering, Programming Languages, Compiler Design, Data Visualization, Databases, Natural Language Processing</p>
        </motion.div>

        <motion.div
          initial={{ y: 50 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-[#1E1E1E] p-6 rounded-lg w-full lg:w-1/2"
        >
          <h3 className="text-xl font-semibold text-[#00E5FF]">Bachelor of Science in Economics</h3>
          <p className="text-[#FF4081]">Union College</p>
          <p className="text-sm text-gray-400">Expected Graduation: June 2025</p>
          <p className="mt-2"><span className="text-[#FF4081]">Relevant Coursework:</span> Introduction to Financial Analysis, Forecasting Seminar, Econometrics, Macro-economics, Micro-economics, Seminar in Open-Macro Economy</p>
        </motion.div>
      </div>
      
    </motion.section>
  )
}

