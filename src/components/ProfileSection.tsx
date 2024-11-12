// components/ProfileSection.tsx

import { motion } from "framer-motion";
import Image from 'next/image';

export const ProfileSection = () => {
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.8
      }
    }
  };

  return (
    <div className="w-1/2 flex items-center justify-center px-8 z-10">
      <motion.div variants={itemVariants} initial="hidden" animate="show" className="flex flex-col items-center text-center text-white">
        <div className="w-48 h-48 rounded-full bg-gray-300 mb-8 relative">
          <Image
            src="/kurtik-appadoo.jpeg"
            alt="Profile"
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        </div>
        <div className="max-w-xl">
          <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl mb-4">
            Kurtik Appadoo
          </h1>
          <p className="text-xl text-white">
            Computer Science and Economics Double Major student at Union College with a passion for software development. 
          </p>
        </div>
      </motion.div>
    </div>
  );
};