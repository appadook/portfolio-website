import { 
  SiJavascript, SiTypescript, SiPython, SiCplusplus, SiPostgresql,
  SiReact, SiNextdotjs, SiNodedotjs, SiExpress, SiDjango, SiSpring,
  SiMongodb, SiMysql, SiRedis, SiGit, SiDocker, SiGithubactions,
  SiJsonwebtokens, SiPassport, SiAuth0, SiGraphql,
  SiOcaml, SiElectron, SiTailwindcss, SiSupabase, SiFirebase,
  SiPostman, SiTableau, SiLatex, SiGradle,
  SiFlask
} from 'react-icons/si';
import { FaAws, FaJava, FaKey, FaPlug } from 'react-icons/fa';
import { AiOutlineApi } from 'react-icons/ai';
import { MdStorage } from 'react-icons/md';

export const skillIcons: { [key: string]: React.ComponentType } = {
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  Python: SiPython,
  Java: FaJava,
  'C++': SiCplusplus,
  SQL: SiPostgresql,
  'React.js': SiReact,
  'Next.js': SiNextdotjs,
  'Node.js': SiNodedotjs,
  'Express.js': SiExpress,
  Django: SiDjango,
  'Spring Boot': SiSpring,
  MongoDB: SiMongodb,
  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
  Redis: SiRedis,
  Git: SiGit,
  Docker: SiDocker,
  AWS: FaAws,
  'CI/CD': SiGithubactions,
  OAuth: FaKey,
  JWT: SiJsonwebtokens,
  Passport: SiPassport,
  Auth0: SiAuth0,
  GraphQL: SiGraphql,
  'REST API': AiOutlineApi,
  WebSockets: FaPlug,
  Microservices: MdStorage,
  OCaml: SiOcaml,
  'Electron.js': SiElectron,
  TailwindCSS: SiTailwindcss,
  Supabase: SiSupabase,
  Firebase: SiFirebase,
  Postman: SiPostman,
  Tableau: SiTableau,
  LATEX: SiLatex,
  Maven: SiGradle,
  Gradle: SiGradle,
  Flask: SiFlask
};

