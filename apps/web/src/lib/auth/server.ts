import { createWayAuthGuard } from '@way/auth-sdk/server';
import { cookies } from 'next/headers';
import { WAY_AUTH_ACCESS_TOKEN_COOKIE } from '@/lib/auth/constants';
import { getWayAuthVerificationConfig } from '@/lib/auth/config';

export type ValidSession = {
  user: {
    id: string;
    email: string;
  };
  claims: {
    sub: string;
    sid?: string;
  };
};

function getAuthGuard() {
  const { jwksUrl, issuer, audience } = getWayAuthVerificationConfig();
  return createWayAuthGuard({ jwksUrl, issuer, audience });
}

const guard = getAuthGuard();

async function fetchMe(accessToken: string) {
  const { baseUrl } = getWayAuthVerificationConfig();

  const response = await fetch(`${baseUrl}/api/v1/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    return null;
  }

  const payload = (await response.json()) as { user?: { id: string; email: string } };
  return payload.user ?? null;
}

export async function getAdminAccessToken(): Promise<string | null> {
  const store = await cookies();
  return store.get(WAY_AUTH_ACCESS_TOKEN_COOKIE)?.value ?? null;
}

export async function getValidatedAdminSession(): Promise<ValidSession | null> {
  const accessToken = await getAdminAccessToken();
  if (!accessToken) {
    return null;
  }

  try {
    const claims = await guard.verifyAccessToken(accessToken);
    const user = await fetchMe(accessToken);

    return {
      user: {
        id: user?.id || claims.sub,
        email: user?.email || String((claims as Record<string, unknown>).email || 'admin@way.local'),
      },
      claims,
    };
  } catch {
    return null;
  }
}
