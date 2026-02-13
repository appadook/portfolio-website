import {
  cloudProviders,
  certifications,
  experiences as legacyExperiences,
  programmingLanguages as legacyLanguages,
  projects as legacyProjects,
  technologiesByCategory,
} from '@/data/portfolio';
import { fallbackAboutCategories, fallbackAboutItems } from '@/data/aboutFallback';
import type {
  AboutCategory,
  AboutItem,
  CloudProvider,
  Experience,
  ProgrammingLanguage,
  Project,
  SiteSettings,
  Technology,
} from '@/lib/portfolio.types';

const normalizeAssetPath = (path?: string) => {
  if (!path) {
    return path;
  }

  if (path.startsWith('/experience/')) {
    return `/static${path}`;
  }

  if (path.startsWith('/project_images/')) {
    return `/static${path}`;
  }

  return path;
};

export const fallbackSiteSettings: SiteSettings = {
  _id: 'fallback-site-settings',
  siteName: 'Kurtik Appadoo',
  tagline: 'Software Engineer & Data Scientist',
  logo: {
    asset: {
      _ref: 'fallback-logo',
      url: '/Ka Logo.jpg',
    },
  },
  profileImage: {
    asset: {
      _ref: 'fallback-profile',
      url: '/headhsot.jpg',
    },
  },
  resume: {
    asset: {
      _ref: 'fallback-resume',
      url: '/Kurtik Resume.pdf',
    },
  },
};

export const fallbackExperiences: Experience[] = legacyExperiences.map((experience, index) => ({
  _id: `fallback-exp-${experience.id}`,
  company: experience.company,
  role: experience.role,
  duration: experience.duration,
  location: experience.location,
  description: experience.description,
  technologies: experience.technologies,
  logo: normalizeAssetPath(experience.logo),
  order: index,
}));

export const fallbackProjects: Project[] = legacyProjects.map((project, index) => ({
  _id: `fallback-proj-${project.id}`,
  title: project.title,
  description: project.description,
  longDescription: project.longDescription,
  categories: project.categories,
  techStack: project.techStack,
  githubUrl: project.githubUrl,
  liveUrl: project.liveUrl,
  image: normalizeAssetPath(project.imageUrl),
  features: project.features,
  challenges: project.challenges,
  outcomes: project.outcomes,
  timeline: project.timeline,
  teamSize: project.teamSize,
  order: index,
}));

export const fallbackProgrammingLanguages: ProgrammingLanguage[] = legacyLanguages.map(
  (language, index) => ({
    _id: `fallback-lang-${index}`,
    name: language.name,
    level: language.level,
    description: language.description,
    order: index,
  }),
);

export const fallbackTechnologies: Technology[] = Object.entries(technologiesByCategory)
  .flatMap(([category, technologies]) =>
    technologies.map((technology, index) => ({
      _id: `fallback-tech-${category}-${technology.name}-${index}`,
      name: technology.name,
      category,
      description: '',
      iconName: undefined,
      order: index,
    })),
  )
  .map((technology, index) => ({
    ...technology,
    _id: `fallback-tech-${index}`,
  }));

export const fallbackCloudProviders: CloudProvider[] = cloudProviders.map((provider, index) => ({
  _id: `fallback-provider-${index}`,
  name: provider.name,
  order: index,
  certificates:
    certifications[provider.name]?.map((certificate, certIndex) => ({
      _id: `fallback-cert-${provider.name}-${certIndex}`,
      name: certificate.name,
      image: normalizeAssetPath(certificate.image) || '/placeholder.svg',
      year: certificate.year,
      description: certificate.description,
      issuer: certificate.issuer,
      credentialId: certificate.credentialId,
      verificationUrl: certificate.verificationUrl,
      skills: certificate.skills,
      order: certIndex,
    })) ?? [],
}));

export const fallbackAboutCategoriesData: AboutCategory[] = fallbackAboutCategories;
export const fallbackAboutItemsData: AboutItem[] = fallbackAboutItems;
