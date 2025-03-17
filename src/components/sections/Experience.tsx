"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Calendar, MapPin, Building2 } from "lucide-react";

const experiences = [
  {
    title: "Software Engineering Intern",
    company: "Tech Corp",
    location: "San Francisco, CA",
    period: "Summer 2023",
    description: "Developed and maintained full-stack applications using React and Node.js. Collaborated with senior developers on critical projects. Implemented new features that improved user engagement by 40%.",
    logo: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=128&h=128&fit=crop&q=80",
    skills: ["React", "Node.js", "TypeScript", "AWS"],
    side: "right",
  },
  {
    title: "Research Assistant",
    company: "University Economics Department",
    location: "Boston, MA",
    period: "2022 - Present",
    description: "Led research initiatives in market dynamics and behavioral economics. Developed predictive models using Python and R. Published findings in two peer-reviewed journals.",
    logo: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=128&h=128&fit=crop&q=80",
    skills: ["Python", "R", "Data Analysis", "Research"],
    side: "left",
  },
  {
    title: "Teaching Assistant",
    company: "Computer Science Department",
    location: "Boston, MA",
    period: "2022 - 2023",
    description: "Mentored 100+ students in advanced programming concepts. Created comprehensive learning materials and conducted weekly code reviews. Improved class average performance by 15%.",
    logo: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=128&h=128&fit=crop&q=80",
    skills: ["Java", "Python", "Mentoring", "Education"],
    side: "right",
  },
];

export default function Experience() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section id="experience" ref={ref} className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto px-4"
      >
        <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
          Experience
        </h2>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-purple-600 to-blue-500" />

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: exp.side === "left" ? -50 : 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative mb-16"
            >
              {/* Timeline dot with year label */}
              <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-white dark:bg-gray-800 border-2 border-purple-600 dark:border-purple-400" />
                <div className="mt-2 px-2 py-1 bg-purple-100 dark:bg-purple-900/50 rounded-full">
                  <span className="text-sm font-medium text-purple-600 dark:text-purple-300">
                    {exp.period.split(" ")[0]} {/* Show just the year */}
                  </span>
                </div>
              </div>

              {/* Content container with grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left side content */}
                <div className={`${exp.side === "left" ? "md:block" : "md:hidden"}`}>
                  {exp.side === "left" && (
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:mr-8">
                      <TimelineContent experience={exp} align="right" />
                    </div>
                  )}
                </div>

                {/* Right side content */}
                <div className={`${exp.side === "right" ? "md:block md:col-start-2" : "md:hidden"}`}>
                  {exp.side === "right" && (
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:ml-8">
                      <TimelineContent experience={exp} align="left" />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// Extracted TimelineContent component for better organization
const TimelineContent = ({ experience, align }: { experience: typeof experiences[0], align: "left" | "right" }) => (
  <>
    <div className={`flex items-center gap-4 mb-4 ${align === "right" ? "flex-row-reverse" : "flex-row"}`}>
      <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-purple-100 dark:bg-purple-900">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={experience.logo}
          alt={experience.company}
          className="w-full h-full object-cover"
        />
      </div>
      <div className={`flex-grow ${align === "right" ? "text-right" : "text-left"}`}>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
          {experience.title}
        </h3>
        <p className="text-purple-600 dark:text-purple-400 font-medium">
          {experience.company}
        </p>
      </div>
    </div>

    <div className="space-y-3">
      <div className={`flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm ${
        align === "right" ? "justify-end" : "justify-start"
      }`}>
        <Calendar className="w-4 h-4" />
        <span>{experience.period}</span>
        <MapPin className="w-4 h-4 ml-2" />
        <span>{experience.location}</span>
      </div>

      <p className={`text-gray-600 dark:text-gray-300 ${align === "right" ? "text-right" : "text-left"}`}>
        {experience.description}
      </p>

      <div className={`flex flex-wrap gap-2 mt-4 ${align === "right" ? "justify-end" : "justify-start"}`}>
        {experience.skills.map((skill, skillIndex) => (
          <span
            key={skillIndex}
            className="px-3 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 rounded-full text-sm"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  </>
);