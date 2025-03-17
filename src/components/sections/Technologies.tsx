import Image from 'next/image';

// components/ProgrammingLanguages.tsx
const technologies = [
  { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "React.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "Express.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
  { name: "Spring Boot", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
  { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "GraphQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" },
  { name: "Supabase", logo: "https://seeklogo.com/images/S/supabase-logo-DCC676FFE2-seeklogo.com.png" },
  { name: "TailwindCSS", logo: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" },
  { name: "Electron.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/electron/electron-original.svg" },
  { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "Postman", logo: "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" },
  { name: "Tableau", logo: "https://cdn.worldvectorlogo.com/logos/tableau-software.svg" },
  { name: "Rstudio", logo: "https://www.vectorlogo.zone/logos/r-project/r-project-icon.svg" },
  { name: "LATEX", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/latex/latex-original.svg" },
  { name: "Gradle", logo: "https://www.vectorlogo.zone/logos/gradle/gradle-icon.svg" },
  { name: "Maven", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/maven/maven-original.svg" },
];

const Technologies = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <h3 className="text-2xl font-bold text-white mb-8">Technologies</h3>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 w-[95vw] max-w-[1400px]">
        {technologies.map((tech) => (
          <div key={tech.name} className="flex flex-col items-center justify-center group">
            <div className="w-16 h-16 mb-2 bg-white rounded-full p-4 flex items-center justify-center">
              <Image
                src={tech.logo}
                alt={`${tech.name} logo`}
                width={64}
                height={64}
                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <span className="text-sm font-medium text-white text-center transition-all duration-300 group-hover:font-bold">{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Technologies;
