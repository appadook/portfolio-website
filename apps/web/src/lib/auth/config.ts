const WAY_AUTH_DEFAULT_BASE_URL = 'https://way-my-auth-service.vercel.app';

function normalizeBaseUrl(value: string) {
  return value.replace(/\/+$/, '');
}

export function getWayAuthBaseUrl() {
  const raw =
    process.env.WAY_AUTH_BASE_URL ||
    process.env.NEXT_PUBLIC_WAY_AUTH_BASE_URL ||
    WAY_AUTH_DEFAULT_BASE_URL;

  return normalizeBaseUrl(raw);
}

export function getWayAuthVerificationConfig() {
  const baseUrl = getWayAuthBaseUrl();

  return {
    baseUrl,
    issuer: process.env.WAY_AUTH_ISSUER || baseUrl,
    audience: process.env.WAY_AUTH_AUDIENCE || 'way-clients',
    jwksUrl: process.env.WAY_AUTH_JWKS_URL || `${baseUrl}/api/v1/jwks`,
  };
}
