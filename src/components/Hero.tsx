'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-20 text-center"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8"
      >
        <Image
          src="/kurtik-appadoo.jpeg?height=200&width=200"
          alt="Kurtik Appadoo"
          width={200}
          height={200}
          className="rounded-full mx-auto border-4 border-[#6200EA]"
        />
      </motion.div>
      <motion.h1
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="text-5xl font-bold mb-4"
      >
        Kurtik Appadoo
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-xl text-[#00E5FF]"
      >
        Computer Science and Economics Double Major Student | Aspiring Software Engineer
      </motion.p>
    </motion.section>
  )
}

