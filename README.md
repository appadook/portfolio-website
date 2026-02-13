# Portfolio Platform Monorepo

This repository has been migrated to a Turborepo monorepo with:

- Next.js App Router frontend (`apps/web`)
- Convex backend package (`packages/backend`)
- WAY Auth SDK-based admin authentication (client + server + middleware)

## Repository Structure

- `apps/web`: Public portfolio site and in-app admin CMS UI.
- `packages/backend`: App-agnostic Convex schema and function modules.

## Tech Stack

- Bun (package manager + scripts)
- Turborepo (monorepo task orchestration)
- Next.js 15 App Router + React 18
- Tailwind CSS + shadcn/ui
- Convex (database, realtime sync, mutations, queries)
- `@way/auth-sdk` (authentication service integration)

## Rendering Model (SSR / CSR / RSC)

- RSC/SSR:
  - Route entry files in `apps/web/src/app/**/page.tsx` are server components by default.
  - Admin route gating (`/admin`) validates auth server-side before rendering.
- CSR:
  - Interactive portfolio sections and admin CMS editor are client components.
  - Convex live data subscriptions (`useQuery`) run in client components for realtime updates.
- Middleware auth:
  - `apps/web/middleware.ts` verifies WAY JWT access token for `/admin/*`.

## Environment Variables

Create `.env.local` at repository root:

```bash
# Convex
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud

# WAY Auth (client)
NEXT_PUBLIC_WAY_AUTH_BASE_URL=https://way-my-auth-service.vercel.app

# WAY Auth (server + middleware verification)
WAY_AUTH_BASE_URL=https://way-my-auth-service.vercel.app
WAY_AUTH_ISSUER=https://way-my-auth-service.vercel.app
WAY_AUTH_AUDIENCE=way-clients
WAY_AUTH_JWKS_URL=https://way-my-auth-service.vercel.app/api/v1/jwks

# Optional: if false, disables fallback content when Convex is empty/unavailable
NEXT_PUBLIC_ENABLE_CONTENT_FALLBACK=true
```

## Local Development

Install deps from repo root:

```bash
bun install
```

Run web + convex (two terminals):

```bash
bun run dev:web
bun run dev:convex
```

Or run all turbo dev tasks:

```bash
bun run dev
```

## Build / Lint / Typecheck

```bash
bun run lint
bun run typecheck
bun run build
```

## Admin Routes

- `/admin/login`
- `/admin/signup`
- `/admin`

Admin login/signup use WAY Auth SDK and set an access token cookie for middleware/server verification.
