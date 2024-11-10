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

const Skills = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="languages" className="py-16 md:py-24 relative bg-white/2 backdrop-blur-sm" >
      <div className="container mx-auto flex flex-col items-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center text-white">
          Programming Languages
        </h2>
        <div
          ref={containerRef}
          className="flex justify-center items-center gap-8 relative"
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
    </section>
  );
};

export default Skills;
