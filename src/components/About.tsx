'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export default function About() {
  const [showLeadership, setShowLeadership] = useState(false)

  return (
    <motion.section
      id="about"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-20"
    >
      <h2 className="text-3xl font-bold mb-8 text-center">About Me</h2>
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ y: 50 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#1E1E1E] p-6 rounded-lg mb-8"
        >
          <p className="text-center mb-4">
            I'm a senior Computer Science student passionate about creating innovative solutions through code. 
            With a strong foundation in algorithms, data structures, and software engineering principles, 
            I'm eager to apply my skills to real-world challenges and contribute to cutting-edge projects.
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
          className="overflow-hidden"
        >
          <button
            onClick={() => setShowLeadership(!showLeadership)}
            className="w-full bg-[#2A2A2A] text-[#00E5FF] py-2 rounded-lg mb-4 hover:bg-[#3A3A3A] transition-colors"
          >
            {showLeadership ? 'Hide Leadership Experience' : 'Show Leadership Experience'}
          </button>

          {showLeadership && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-[#1E1E1E] p-6 rounded-lg"
            >
              <h3 className="text-xl font-semibold mb-4 text-[#FF4081]">Leadership Experience</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>President of the Computer Science Student Association (2022-2023)</li>
                <li>Team Lead for the University Hackathon, managing a team of 5 developers</li>
                <li>Mentor for incoming freshman in the CS department's peer mentorship program</li>
                <li>Organizer of weekly coding workshops, teaching web development to over 50 students</li>
              </ul>
              <p className="mt-4">
                These experiences have honed my communication, project management, and team-building skills, 
                complementing my technical abilities and preparing me for leadership roles in the tech industry.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.section>
  )
}

