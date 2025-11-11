import { useQuery } from '@tanstack/react-query';
import { client } from '@/lib/sanity.client';
import {
  experiencesQuery,
  projectsQuery,
  projectsByCategoryQuery,
  programmingLanguagesQuery,
  technologiesQuery,
  technologiesByCategoryQuery,
  cloudProvidersWithCertificatesQuery,
  aboutCategoriesQuery,
  aboutItemsQuery,
  aboutItemsByCategoryQuery,
} from '@/lib/sanity.queries';
import type {
  Experience,
  Project,
  ProgrammingLanguage,
  Technology,
  CloudProvider,
  AboutCategory,
  AboutItem,
} from '@/lib/sanity.types';

// Hook to fetch all experiences
export function useExperiences() {
  return useQuery<Experience[]>({
    queryKey: ['experiences'],
    queryFn: () => client.fetch(experiencesQuery),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// Hook to fetch all projects
export function useProjects() {
  return useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: () => client.fetch(projectsQuery),
    staleTime: 1000 * 60 * 5,
  });
}

// Hook to fetch projects by category
export function useProjectsByCategory(category: string) {
  return useQuery<Project[]>({
    queryKey: ['projects', category],
    queryFn: () =>
      category === 'All'
        ? client.fetch(projectsQuery)
        : client.fetch(projectsByCategoryQuery, { category }),
    staleTime: 1000 * 60 * 5,
    enabled: !!category,
  });
}

// Hook to fetch all programming languages
export function useProgrammingLanguages() {
  return useQuery<ProgrammingLanguage[]>({
    queryKey: ['programmingLanguages'],
    queryFn: () => client.fetch(programmingLanguagesQuery),
    staleTime: 1000 * 60 * 5,
  });
}

// Hook to fetch all technologies
export function useTechnologies() {
  return useQuery<Technology[]>({
    queryKey: ['technologies'],
    queryFn: () => client.fetch(technologiesQuery),
    staleTime: 1000 * 60 * 5,
  });
}

// Hook to fetch technologies by category
export function useTechnologiesByCategory(category: string) {
  return useQuery<Technology[]>({
    queryKey: ['technologies', category],
    queryFn: () => client.fetch(technologiesByCategoryQuery, { category }),
    staleTime: 1000 * 60 * 5,
    enabled: !!category,
  });
}

// Hook to fetch cloud providers with their certificates
export function useCloudProvidersWithCertificates() {
  return useQuery<CloudProvider[]>({
    queryKey: ['cloudProviders'],
    queryFn: () => client.fetch(cloudProvidersWithCertificatesQuery),
    staleTime: 1000 * 60 * 5,
  });
}

// Hook to fetch all about categories
export function useAboutCategories() {
  return useQuery<AboutCategory[]>({
    queryKey: ['aboutCategories'],
    queryFn: () => client.fetch(aboutCategoriesQuery),
    staleTime: 1000 * 60 * 5,
  });
}

// Hook to fetch all about items
export function useAboutItems() {
  return useQuery<AboutItem[]>({
    queryKey: ['aboutItems'],
    queryFn: () => client.fetch(aboutItemsQuery),
    staleTime: 1000 * 60 * 5,
  });
}

// Hook to fetch about items by category
export function useAboutItemsByCategory(categoryId: string) {
  return useQuery<AboutItem[]>({
    queryKey: ['aboutItems', categoryId],
    queryFn: () => client.fetch(aboutItemsByCategoryQuery, { categoryId }),
    staleTime: 1000 * 60 * 5,
    enabled: !!categoryId,
  });
}
