'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Header() {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="bg-[#1E1E1E] py-4 sticky top-0 z-10"
    >
      <nav className="container mx-auto px-4 flex justify-between items-center">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="text-2xl font-bold text-[#6200EA]"
        >
          Kurtik Appadoo
        </motion.div>
        <ul className="flex space-x-6">
          {['About', 'Projects', 'Experience', 'Academics', 'Skills', 'Contact'].map((item) => (
            <motion.li key={item} whileHover={{ scale: 1.1 }}>
              <Link href={`#${item.toLowerCase()}`} className="hover:text-[#00E5FF] transition-colors">
                {item}
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>
    </motion.header>
  )
}

