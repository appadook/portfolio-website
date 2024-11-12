'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import ProgrammingLanguages from './ProgrammingLanguages'
import Technologies from './Technologies'

const Skills = () => {
  const [activeTab, setActiveTab] = useState('languages')

  return (
    <section id="skills" className="py-16 md:py-24 relative  flex items-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-extrabold text-center mb-12"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            My Skillset
          </span>
        </motion.h2>

        <div className="flex justify-center mb-8">
          <motion.div
            className="inline-flex rounded-md shadow-sm"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <button
              onClick={() => setActiveTab('languages')}
              className={`px-4 py-2 text-sm font-medium rounded-l-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 ${
                activeTab === 'languages'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Programming Languages
            </button>
            <button
              onClick={() => setActiveTab('technologies')}
              className={`px-4 py-2 text-sm font-medium rounded-r-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 ${
                activeTab === 'technologies'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Technologies
            </button>
          </motion.div>
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          {activeTab === 'languages' ? <ProgrammingLanguages /> : <Technologies />}
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Skills