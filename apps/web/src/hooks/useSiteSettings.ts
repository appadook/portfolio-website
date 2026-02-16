'use client';

import { useQuery } from 'convex/react';
import { api } from '@portfolio/backend/convex/_generated/api';
import type { SiteSettings } from '@/lib/portfolio.types';

type QueryState<T> = {
  data: T;
  isLoading: boolean;
  error: Error | null;
};

type SiteSettingsPayload = {
  _id?: string;
  siteName?: string;
  tagline?: string;
  logoUrl?: string;
  profileImageUrl?: string;
  resumeUrl?: string;
};

const hasConvexUrl = Boolean(process.env.NEXT_PUBLIC_CONVEX_URL);

const mapSiteSettings = (raw: SiteSettingsPayload): SiteSettings => ({
  _id: String(raw._id ?? 'site-settings'),
  siteName: raw.siteName,
  tagline: raw.tagline,
  logo: {
    asset: {
      _ref: 'site-logo',
      url: raw.logoUrl,
    },
  },
  profileImage: {
    asset: {
      _ref: 'site-profile',
      url: raw.profileImageUrl,
    },
  },
  resume: {
    asset: {
      _ref: 'site-resume',
      url: raw.resumeUrl,
    },
  },
});

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
