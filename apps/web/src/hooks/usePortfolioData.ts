'use client';

import { useQuery } from 'convex/react';
import { api } from '@portfolio/backend/convex/_generated/api';
import type { Id } from '@portfolio/backend/convex/_generated/dataModel';
import type {
  AboutCategory,
  AboutItem,
  CloudProvider,
  Experience,
  ProgrammingLanguage,
  Project,
  Technology,
} from '@/lib/portfolio.types';
import {
  mapAboutCategory,
  mapAboutItem,
  mapCloudProvider,
  mapExperience,
  mapProgrammingLanguage,
  mapProject,
  mapTechnology,
  isPresent,
} from '@/lib/portfolio.mappers';

type QueryState<T> = {
  data: T;
  isLoading: boolean;
  error: Error | null;
};

const hasConvexUrl = Boolean(process.env.NEXT_PUBLIC_CONVEX_URL);

function withListState<T>(raw: T[] | undefined): QueryState<T[]> {
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
    data: [],
    isLoading: false,
    error: null,
  };
}

export function useExperiences(): QueryState<Experience[]> {
  const raw = useQuery(api.portfolio.getExperiences);
  return withListState(raw?.map(mapExperience));
}

export function useProjects(): QueryState<Project[]> {
  const raw = useQuery(api.portfolio.getProjects);
  return withListState(raw?.map(mapProject));
}

export function useProjectsByCategory(category: string): QueryState<Project[]> {
  const raw = useQuery(api.portfolio.getProjectsByCategory, { category });
  return withListState(raw?.map(mapProject));
}

export function useProgrammingLanguages(): QueryState<ProgrammingLanguage[]> {
  const raw = useQuery(api.portfolio.getProgrammingLanguages);
  return withListState(raw?.map(mapProgrammingLanguage));
}

export function useTechnologies(): QueryState<Technology[]> {
  const raw = useQuery(api.portfolio.getTechnologies);
  return withListState(raw?.map(mapTechnology));
}

export function useTechnologiesByCategory(category: string): QueryState<Technology[]> {
  const raw = useQuery(api.portfolio.getTechnologiesByCategory, { category });
  return withListState(raw?.map(mapTechnology));
}

export function useCloudProvidersWithCertificates(): QueryState<CloudProvider[]> {
  const raw = useQuery(api.portfolio.getCloudProvidersWithCertificates);
  return withListState(raw?.map(mapCloudProvider));
}

export function useAboutCategories(): QueryState<AboutCategory[]> {
  const raw = useQuery(api.portfolio.getAboutCategories);
  return withListState(raw?.map(mapAboutCategory));
}

export function useAboutItems(): QueryState<AboutItem[]> {
  const raw = useQuery(api.portfolio.getAboutItems);
  return withListState(raw?.filter(isPresent).map(mapAboutItem));
}

export function useAboutItemsByCategory(categoryId: string): QueryState<AboutItem[]> {
  const raw = useQuery(api.portfolio.getAboutItemsByCategory, {
    categoryId: categoryId as Id<'aboutCategories'>,
  });
  return withListState(raw?.map(mapAboutItem));
}
