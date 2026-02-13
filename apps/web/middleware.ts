import { createWayAuthGuard } from '@way/auth-sdk/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { WAY_AUTH_ACCESS_TOKEN_COOKIE } from '@/lib/auth/constants';
import { getWayAuthVerificationConfig } from '@/lib/auth/config';

const adminPublicPaths = ['/admin/login', '/admin/signup'];

function buildGuard() {
  const { jwksUrl, issuer, audience } = getWayAuthVerificationConfig();

  return createWayAuthGuard({
    jwksUrl,
    issuer,
    audience,
  });
}

const guard = buildGuard();

async function hasValidToken(token: string | undefined) {
  if (!token) {
    return false;
  }

  try {
    await guard.verifyAccessToken(token);
    return true;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  const token = request.cookies.get(WAY_AUTH_ACCESS_TOKEN_COOKIE)?.value;
  const isAuthenticated = await hasValidToken(token);
  const isPublicAdminPath = adminPublicPaths.some((path) => pathname.startsWith(path));

  if (!isAuthenticated && !isPublicAdminPath) {
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthenticated && isPublicAdminPath) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
