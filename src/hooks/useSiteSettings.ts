import { useQuery } from '@tanstack/react-query';
import { client } from '@/lib/sanity.client';
import type { SiteSettings } from '@/lib/sanity.types';

const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0] {
  _id,
  logo {
    asset->{
      _ref,
      url
    }
  },
  profileImage {
    asset->{
      _ref,
      url
    }
  },
  resume {
    asset->{
      _ref,
      url
    }
  },
  siteName,
  tagline
}`;

export const useSiteSettings = () => {
  return useQuery<SiteSettings>({
    queryKey: ['siteSettings'],
    queryFn: async () => {
      const data = await client.fetch(SITE_SETTINGS_QUERY);
      return data;
    },
    staleTime: 1000 * 60 * 60, // 1 hour - site settings rarely change
    retry: 1, // Only retry once if fails
  });
};
