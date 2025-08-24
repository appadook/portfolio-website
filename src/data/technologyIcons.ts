import React from 'react';
import { 
  Monitor,
  Server, 
  Database, 
  Smartphone, 
  Settings, 
  Cloud,
  TestTube
} from 'lucide-react';
import { 
  SiReact, 
  SiNextdotjs, 
  SiTypescript, 
  SiJavascript, 
  SiTailwindcss,
  SiNodedotjs,
  SiPython,
  SiFlask,
  SiExpress,
  SiSpringboot,
  SiPostgresql,
  SiMysql,
  SiSupabase,
  SiFirebase,
  SiSqlite,
  SiGit,
  SiDocker,
  SiGradle,
  SiApache,
  SiGooglecloud,
  SiAmazon,
  SiJest,
  SiCypress,
  SiSelenium,
  SiDatabricks
} from 'react-icons/si';
import { FaJava, FaMicrosoft } from 'react-icons/fa';

// Icon mappings for categories
export const categoryIcons: { [key: string]: React.ElementType } = {
  "Frontend": Monitor,
  "Backend": Server,
  "Database": Database,
  "Mobile": Smartphone,
  "Testing & QA": TestTube,
  "DevOps": Settings,
};

// Icon mappings for technologies
export const technologyIcons: { [key: string]: React.ElementType } = {
  // Frontend
  "React.js": SiReact,
  "Next.js": SiNextdotjs,
  "TypeScript": SiTypescript,
  "JavaScript": SiJavascript,
  "Tailwind CSS": SiTailwindcss,
  
  // Backend
  "Node.js": SiNodedotjs,
  "Python": SiPython,
  "Flask": SiFlask,
  "Express.js": SiExpress,
  "Spring Boot": SiSpringboot,
  "Java": FaJava,
  
  // Database
  "PostgreSQL": SiPostgresql,
  "MySQL": SiMysql,
  "Supabase": SiSupabase,
  "Firebase": SiFirebase,
  "SQL": SiSqlite,
  
  // Mobile
  "React Native": SiReact,
  "Expo": SiReact,
  
  // Testing & QA
  "Jest": SiJest,
  "Cypress": SiCypress,
  "Selenium": SiSelenium,
  "Unit Testing": TestTube,
  
  // DevOps
  "Git": SiGit,
  "Docker": SiDocker,
  "Gradle": SiGradle,
  "Maven": SiApache,
};

// Icon mappings for cloud providers
export const cloudProviderIcons: { [key: string]: React.ElementType } = {
  "Google Cloud": SiGooglecloud,
  "AWS": SiAmazon,
  "Azure": FaMicrosoft,
  "Databricks": SiDatabricks,
};

// Floating animation icons for the bottom section
export const floatingAnimationIcons = [
  SiReact, SiPython, SiNodedotjs, SiPostgresql, SiGooglecloud, SiDocker, 
  SiTypescript, SiJavascript, SiNextdotjs, SiFlask, SiMysql, SiGit,
  SiReact, SiPython, SiNodedotjs, SiPostgresql, SiGooglecloud, SiDocker
];
