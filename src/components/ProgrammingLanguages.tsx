'use client'

import { useRef } from "react";
import { motion } from 'framer-motion';
import { useState } from 'react';

const skills = [
  { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "Typecript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "SQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "R", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg" },
  { name: "OCaml", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ocaml/ocaml-original.svg" },
];

const ProgrammingLanguages = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <motion.div 
      className="flex flex-col items-center"
      initial="hidden"
      animate="show"
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      <h3 className="text-2xl font-bold text-white mb-8">Programming Languages</h3>
      <div
        ref={containerRef}
        className="flex flex-wrap justify-center gap-8"
      >
        {skills.map((skill) => (
          <motion.div
            key={skill.name}
            className="w-16 h-16 group"
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              show: { opacity: 1, scale: 1 },
            }}
            whileHover={{ scale: 1.05 }}
            onMouseEnter={() => setHoveredSkill(skill.name)}
            onMouseLeave={() => setHoveredSkill(null)}
          >
            <img
              src={skill.logo}
              alt={`${skill.name} logo`}
              className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition duration-300"
            />
            <motion.div 
              className="text-center mt-2 text-white/70 group-hover:text-white transition font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: hoveredSkill === skill.name ? 1 : 0.7 }}
            >
              {skill.name}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProgrammingLanguages;
