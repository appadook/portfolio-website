import type { Project } from '@/lib/portfolio.types';

type ProjectBadgeTone = 'danger' | 'success' | 'brand' | 'neutral';

export type ProjectCardBadge = {
  key: 'deprecated' | 'new';
  label: string;
  tone: ProjectBadgeTone;
};

export type ProjectCardLink = {
  key: 'github' | 'live';
  label: string;
  href: string;
};

const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;
const DEFAULT_NEW_PROJECT_WINDOW_DAYS = 45;
const MAX_BADGES_PER_CARD = 2;

function getNewProjectWindowDays(): number {
  const rawValue = Number(process.env.NEXT_PUBLIC_PROJECT_NEW_DAYS ?? DEFAULT_NEW_PROJECT_WINDOW_DAYS);
  if (!Number.isFinite(rawValue) || rawValue <= 0) {
    return DEFAULT_NEW_PROJECT_WINDOW_DAYS;
  }
  return rawValue;
}

function normalizeExternalUrl(url?: string): string | null {
  if (!url) {
    return null;
  }

  const trimmed = url.trim();
  if (!trimmed) {
    return null;
  }

  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;

  try {
    const parsed = new URL(withProtocol);
    return parsed.toString();
  } catch {
    return null;
  }
}

function isRecentlyCreated(project: Project, nowMs: number): boolean {
  if (typeof project._creationTime !== 'number') {
    return false;
  }

  const ageMs = nowMs - project._creationTime;
  if (ageMs < 0) {
    return false;
  }

  return ageMs <= getNewProjectWindowDays() * MILLISECONDS_PER_DAY;
}

export function getProjectCardMeta(
  project: Project,
  nowMs = Date.now(),
): { badges: ProjectCardBadge[]; links: ProjectCardLink[] } {
  const githubUrl = normalizeExternalUrl(project.githubUrl);
  const liveUrl = normalizeExternalUrl(project.liveUrl);
  const isDeprecated = project.status === 'deprecated';
  const isNew = !isDeprecated && isRecentlyCreated(project, nowMs);

  const badges: ProjectCardBadge[] = [];
  const links: ProjectCardLink[] = [];

  if (isDeprecated) {
    badges.push({ key: 'deprecated', label: 'Deprecated', tone: 'danger' });
  }

  if (isNew) {
    badges.push({ key: 'new', label: 'New', tone: 'success' });
  }

  if (liveUrl) {
    links.push({ key: 'live', label: 'Live site', href: liveUrl });
  }

  if (githubUrl) {
    links.push({ key: 'github', label: 'GitHub', href: githubUrl });
  }

  return {
    badges: badges.slice(0, MAX_BADGES_PER_CARD),
    links,
  };
}
