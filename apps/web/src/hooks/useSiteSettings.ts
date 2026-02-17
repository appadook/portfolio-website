'use client';

import { useQuery } from 'convex/react';
import { api } from '@portfolio/backend/convex/_generated/api';
import type { SiteSettings } from '@/lib/portfolio.types';
import { mapSiteSettings } from '@/lib/portfolio.mappers';

type QueryState<T> = {
  data: T;
  isLoading: boolean;
  error: Error | null;
};

const hasConvexUrl = Boolean(process.env.NEXT_PUBLIC_CONVEX_URL);

export const useSiteSettings = (): QueryState<SiteSettings> => {
  const raw = useQuery(api.portfolio.getSiteSettings);
  const emptyState: SiteSettings = {
    _id: 'site-settings',
  };

  if (raw !== undefined) {
    return {
      data: raw ? mapSiteSettings(raw) : emptyState,
      isLoading: false,
      error: null,
    };
  }

  if (hasConvexUrl) {
    return {
      data: emptyState,
      isLoading: true,
      error: null,
    };
  }

  return {
    data: emptyState,
    isLoading: false,
    error: null,
  };
};
