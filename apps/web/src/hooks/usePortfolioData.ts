'use client';

import { useQuery } from 'convex/react';
import { api } from '@portfolio/backend/convex/_generated/api';
import type { Id } from '@portfolio/backend/convex/_generated/dataModel';
import {
  fallbackAboutCategoriesData,
  fallbackAboutItemsData,
  fallbackCloudProviders,
  fallbackExperiences,
  fallbackProgrammingLanguages,
  fallbackProjects,
  fallbackTechnologies,
} from '@/lib/contentFallback';
import type {
  AboutCategory,
  AboutItem,
  CloudProvider,
  Experience,
  ProgrammingLanguage,
  Project,
  Technology,
} from '@/lib/portfolio.types';

type QueryState<T> = {
  data: T;
  isLoading: boolean;
  error: Error | null;
};

type ExperiencePayload = {
  _id: string;
  company: string;
  role: string;
  duration: string;
  location: string;
  description: string;
  technologies: string[];
  logo?: string;
  order: number;
};

type ProjectPayload = {
  _id: string;
  title: string;
  description: string;
  longDescription?: string;
  categories: string[];
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
  features?: string[];
  challenges?: string[];
  outcomes?: string[];
  timeline?: string;
  teamSize?: string;
  order: number;
};

type ProgrammingLanguagePayload = {
  _id: string;
  name: string;
  level: ProgrammingLanguage['level'];
  description: string;
  order: number;
};

type TechnologyPayload = {
  _id: string;
  name: string;
  category: string;
  description?: string;
  iconName?: string;
  order: number;
};

type CertificatePayload = {
  _id: string;
  name: string;
  image: string;
  year: string;
  description?: string;
  issuer?: string;
  credentialId?: string;
  verificationUrl?: string;
  skills?: string[];
  order: number;
  providerId?: string;
};

type CloudProviderPayload = {
  _id: string;
  name: string;
  order: number;
  certificates: CertificatePayload[];
};

type AboutCategoryPayload = {
  _id: string;
  name: string;
  label: string;
  color: string;
  icon: string;
  order: number;
};

type AboutItemPayload = {
  _id: string;
  title: string;
  subtitle?: string;
  description?: string;
  date?: string;
  details?: string[];
  icon: string;
  image?: string;
  order: number;
  category: AboutCategoryPayload;
};

const fallbackEnabled = process.env.NEXT_PUBLIC_ENABLE_CONTENT_FALLBACK === 'true';
const hasConvexUrl = Boolean(process.env.NEXT_PUBLIC_CONVEX_URL);

function withListState<T>(raw: T[] | undefined, fallback: T[]): QueryState<T[]> {
  if (raw !== undefined) {
    return {
      data: raw,
      isLoading: false,
      error: null,
    };
  }

  if (hasConvexUrl) {
    return {
      data: [],
      isLoading: true,
      error: null,
    };
  }

  return {
    data: fallbackEnabled ? fallback : [],
    isLoading: false,
    error: null,
  };
}

const mapExperience = (item: ExperiencePayload): Experience => ({
  _id: String(item._id),
  company: item.company,
  role: item.role,
  duration: item.duration,
  location: item.location,
  description: item.description,
  technologies: item.technologies || [],
  logo: item.logo,
  order: item.order ?? 0,
});

const mapProject = (item: ProjectPayload): Project => ({
  _id: String(item._id),
  title: item.title,
  description: item.description,
  longDescription: item.longDescription,
  categories: item.categories || [],
  techStack: item.techStack || [],
  githubUrl: item.githubUrl,
  liveUrl: item.liveUrl,
  image: item.image,
  features: item.features,
  challenges: item.challenges,
  outcomes: item.outcomes,
  timeline: item.timeline,
  teamSize: item.teamSize,
  order: item.order ?? 0,
});

const mapProgrammingLanguage = (item: ProgrammingLanguagePayload): ProgrammingLanguage => ({
  _id: String(item._id),
  name: item.name,
  level: item.level,
  description: item.description,
  order: item.order ?? 0,
});

const mapTechnology = (item: TechnologyPayload): Technology => ({
  _id: String(item._id),
  name: item.name,
  category: item.category,
  description: item.description,
  iconName: item.iconName,
  order: item.order ?? 0,
});

const mapCloudProvider = (item: CloudProviderPayload): CloudProvider => ({
  _id: String(item._id),
  name: item.name,
  order: item.order ?? 0,
  certificates: (item.certificates || []).map((certificate) => ({
    _id: String(certificate._id),
    name: certificate.name,
    image: certificate.image,
    year: certificate.year,
    description: certificate.description,
    issuer: certificate.issuer,
    credentialId: certificate.credentialId,
    verificationUrl: certificate.verificationUrl,
    skills: certificate.skills,
    order: certificate.order ?? 0,
    providerId: String(certificate.providerId ?? ''),
  })),
});

const mapAboutCategory = (item: AboutCategoryPayload): AboutCategory => ({
  _id: String(item._id),
  name: item.name,
  label: item.label,
  color: item.color,
  icon: item.icon,
  order: item.order ?? 0,
});

const mapAboutItem = (item: AboutItemPayload): AboutItem => ({
  _id: String(item._id),
  title: item.title,
  subtitle: item.subtitle,
  description: item.description,
  date: item.date,
  details: item.details,
  icon: item.icon,
  image: item.image,
  order: item.order ?? 0,
  category: mapAboutCategory(item.category),
});

function isPresent<T>(value: T | null | undefined): value is T {
  return value != null;
}

export function useExperiences(): QueryState<Experience[]> {
  const raw = useQuery(api.portfolio.getExperiences);
  return withListState(raw?.map(mapExperience), fallbackExperiences);
}

export function useProjects(): QueryState<Project[]> {
  const raw = useQuery(api.portfolio.getProjects);
  return withListState(raw?.map(mapProject), fallbackProjects);
}

export function useProjectsByCategory(category: string): QueryState<Project[]> {
  const raw = useQuery(api.portfolio.getProjectsByCategory, { category });
  const fallback =
    category === 'All'
      ? fallbackProjects
      : fallbackProjects.filter((project) => project.categories.includes(category));

  return withListState(raw?.map(mapProject), fallback);
}

export function useProgrammingLanguages(): QueryState<ProgrammingLanguage[]> {
  const raw = useQuery(api.portfolio.getProgrammingLanguages);
  return withListState(raw?.map(mapProgrammingLanguage), fallbackProgrammingLanguages);
}

export function useTechnologies(): QueryState<Technology[]> {
  const raw = useQuery(api.portfolio.getTechnologies);
  return withListState(raw?.map(mapTechnology), fallbackTechnologies);
}

export function useTechnologiesByCategory(category: string): QueryState<Technology[]> {
  const raw = useQuery(api.portfolio.getTechnologiesByCategory, { category });
  const fallback = fallbackTechnologies.filter((technology) => technology.category === category);
  return withListState(raw?.map(mapTechnology), fallback);
}

export function useCloudProvidersWithCertificates(): QueryState<CloudProvider[]> {
  const raw = useQuery(api.portfolio.getCloudProvidersWithCertificates);
  return withListState(raw?.map(mapCloudProvider), fallbackCloudProviders);
}

export function useAboutCategories(): QueryState<AboutCategory[]> {
  const raw = useQuery(api.portfolio.getAboutCategories);
  return withListState(raw?.map(mapAboutCategory), fallbackAboutCategoriesData);
}

export function useAboutItems(): QueryState<AboutItem[]> {
  const raw = useQuery(api.portfolio.getAboutItems);
  return withListState(raw?.filter(isPresent).map(mapAboutItem), fallbackAboutItemsData);
}

export function useAboutItemsByCategory(categoryId: string): QueryState<AboutItem[]> {
  const raw = useQuery(api.portfolio.getAboutItemsByCategory, {
    categoryId: categoryId as Id<'aboutCategories'>,
  });
  const fallback = fallbackAboutItemsData.filter((item) => item.category._id === categoryId);
  return withListState(raw?.map(mapAboutItem), fallback);
}
