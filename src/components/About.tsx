'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import LeadershipSection from './LeadershipSection'

export default function About() {
  const [showLeadership, setShowLeadership] = useState(false)

  return (
    <motion.section
      id="about"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-20 w-full"
    >
      <h2 className="text-3xl font-bold mb-8 text-center">About Me</h2>
      <div className="w-11/12 mx-auto">
        <motion.div
          initial={{ y: 50 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#1E1E1E] p-8 rounded-lg mb-8 max-w-[90%] mx-auto"
        >
          <p className="text-center mb-4">
            I&apos;m a senior Computer Science student passionate about creating innovative solutions through code. 
            With a strong foundation in algorithms, data structures, and software engineering principles, 
            I&apos;m eager to apply my skills to real-world challenges and contribute to cutting-edge projects.
          </p>
          <p className="text-center">
            My academic journey has equipped me with a diverse skill set, ranging from low-level systems programming 
            to high-level web and mobile application development. I thrive in collaborative environments and am always 
            excited to learn new technologies and methodologies.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden w-full"
        >
          <button
            onClick={() => setShowLeadership(!showLeadership)}
            className="w-full bg-[#2A2A2A] text-[#00E5FF] py-2 rounded-lg mb-4 hover:bg-[#3A3A3A] transition-colors"
          >
            {showLeadership ? 'Hide Leadership Experience' : 'Show Leadership Experience'}
          </button>

          {showLeadership && <LeadershipSection />}
        </motion.div>
      </div>
    </motion.section>
  )
}

