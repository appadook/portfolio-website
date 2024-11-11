import { useRef } from "react";

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

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-2xl font-bold text-white mb-8">Programming Languages</h3>
      <div
        ref={containerRef}
        className="flex flex-wrap justify-center gap-8"
      >
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="floating-icon w-16 h-16 group transition-opacity duration-300 hover:opacity-80"
            style={{ animation: "synchronizedFloat 5s ease-in-out infinite" }} // Apply the synchronized animation
          >
            <img
              src={skill.logo}
              alt={`${skill.name} logo`}
              className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition duration-300"
            />
            <div className="text-center mt-2 text-white/70 group-hover:text-white transition font-medium">
              {skill.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgrammingLanguages;
