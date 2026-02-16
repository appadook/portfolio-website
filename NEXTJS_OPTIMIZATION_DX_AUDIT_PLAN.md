# Next.js Optimization + DX Audit Plan

## Document Metadata
- Repository: `portfolio-platform`
- Primary app: `apps/web`
- Backend package: `packages/backend` (Convex)
- Audit date: 2026-02-16
- Scope: Full monorepo audit focused on rendering strategy, performance, maintainability, and developer experience
- Note: This plan intentionally makes no code changes; it is a handoff blueprint for implementation

---

## 1. Executive Summary

The app is functional and type-safe, but the public experience is currently over-client-rendered. The biggest performance and DX gains come from:

1. Converting the public route from client-first to server-first (`RSC + ISR`) with small client islands.
2. Keeping admin as `SSR auth shell + CSR realtime editor` (current direction is mostly correct).
3. Replacing all critical `<img>` usage with `next/image` and configuring remote image domains.
4. Splitting providers so global route bundles do not always include Convex client code.
5. Reducing waterfalls and hydration overhead with `Promise.all`, `Suspense`, and better boundary placement.
6. Aligning CI/tooling with actual project stack (Bun + Turborepo + Next output paths).

---

## 2. Current-State Snapshot

### 2.1 Build and routing snapshot
From `apps/web` production build:

- `/` static route, but ships heavy client JS and client-fetched content.
- `/admin` dynamic route.
- `/admin/login`, `/admin/signup` static.

Build output (observed):
- `/` page bundle: `67.3 kB`
- `/` first-load JS: `249 kB`
- shared first-load JS: `102 kB`

### 2.2 Lint/runtime warnings observed
1. 15 warnings for `@next/next/no-img-element` across public and admin components.
2. `metadataBase` warning in Next metadata (social URLs resolve to localhost fallback).
3. Browserslist data stale warning during build (`caniuse-lite` update needed).

### 2.3 Architecture observations
1. Root layout wraps all routes with client providers (`ConvexProvider`, toasters, tooltip provider), increasing global hydration footprint.
2. Public content is loaded via client Convex hooks (`useQuery`) rather than server fetches.
3. Admin is server-gated correctly, but then client dashboard loads large data and logic in a single large component.
4. Convex queries in `packages/backend/convex/portfolio.ts` often use `collect() + sort/filter` patterns that can be improved with index-first querying and grouping strategies.
5. CI workflows are not fully aligned with repository setup (Bun/Turbo/Next): current CI scripts use `npm` and expect `dist`, but Next app output is `.next`.

---

## 3. Rendering Mental Model (for this project)

Use this decision model route-by-route and component-by-component:

1. Is data public/shared and not user-specific?
- Prefer `RSC + ISR`.

2. Is output request-dependent (auth/session/cookies/headers)?
- Prefer dynamic `SSR` (`no-store` where needed).

3. Is UI highly interactive/realtime (drag-drop, form editor, local transient state)?
- Keep as `CSR` island/component.

4. Are data calls independent?
- Start in parallel (`Promise.all`) and stream with `Suspense`.

5. Is a large feature non-critical above-the-fold?
- Lazy load with `next/dynamic` or route-level/client boundary deferral.

### 3.1 How this maps to your stack
- `useQuery` (Convex): best for realtime editor/admin surfaces, not baseline for initial public content.
- `Promise.all`: server data parallelism for public page composition.
- `Suspense`: stream sections and avoid all-or-nothing rendering.
- `ISR`: public portfolio content should revalidate without forcing full dynamic SSR.

---

## 4. Target Architecture

## 4.1 Route-level rendering targets

| Route | Current | Target | Why |
|---|---|---|---|
| `/` | Static route with client-heavy data/UI | `RSC + ISR + client islands` | Better TTFB/FCP, lower hydration JS, cleaner separation |
| `/admin` | Dynamic server gate + large CSR dashboard | Keep dynamic SSR gate + modular CSR panels | Correct auth model; improve maintainability and local performance |
| `/admin/login` | Static + client form | Keep static shell + CSR form | Appropriate; minimal changes |
| `/admin/signup` | Static + client form | Keep static shell + CSR form | Appropriate; minimal changes |
| `not-found` | Static RSC | Keep static | Already good |

## 4.2 Data strategy targets
1. Public data: server-fetched snapshots + ISR.
2. Admin data: client `useQuery` for live updates + mutation workflow.
3. Mutations from admin should trigger public cache invalidation strategy (time-based revalidate now; optional on-demand later).

## 4.3 Boundary targets
1. Keep root layout server-first.
2. Scope Convex provider to admin subtree or only components that require client subscriptions.
3. Isolate animation-heavy sections into explicit client boundaries instead of making the entire page client.

---

## 5. File-by-File Refactor Plan (Web App)

## 5.1 App router and layout

### `apps/web/src/app/layout.tsx`
Changes:
1. Keep as server component.
2. Add `metadataBase` in `metadata` export.
3. Remove global dependency on Convex provider from root-level providers.
4. Add `next/font` usage and map font variables to CSS tokens.

DX/Perf impact:
- Fixes metadata warning.
- Reduces global JS/hydration.
- Improves CLS/font loading behavior.

### `apps/web/src/app/page.tsx`
Changes:
1. Convert to server orchestration component.
2. Fetch public data server-side in parallel.
3. Pass data into section components as typed props.
4. Add `export const revalidate = <value>` (recommend starting `60` seconds).

DX/Perf impact:
- Clear route-level ownership of data lifecycle.
- Enables ISR + streaming composition.

### `apps/web/src/app/admin/page.tsx`
Changes:
1. Keep server gate using `getValidatedAdminSession()`.
2. Explicitly set dynamic behavior to avoid accidental static inference if logic changes.

DX/Perf impact:
- Preserves secure request-time behavior.

### `apps/web/src/app/admin/layout.tsx`
Changes:
1. Optionally add admin-scoped providers wrapper (Convex + toasts + tooltip).
2. Keep admin font scope.

DX impact:
- Clear separation between public and admin provider stacks.

## 5.2 Public feature shell

### `apps/web/src/features/public/PortfolioPage.tsx`
Current issue:
- Entire page marked `'use client'`; forces all sections to client.

Changes:
1. Split into:
- `PortfolioPage.server.tsx` (data orchestration + section composition)
- `PortfolioPageClientShell.tsx` (only shared client concerns that must remain client)
2. Remove global `useSmoothScroll` hook from root of public page; prefer native + CSS smooth scroll and local handlers.
3. Footer year rendering can remain server-rendered using current date at render time.

Perf impact:
- Largest JS and hydration reduction on `/` route.

## 5.3 Public sections (convert to server-first where possible)

Target pattern:
- Server section component receives data via props.
- Client subcomponents only for interaction points.

Files:
- `apps/web/src/components/HeroSection.tsx`
- `apps/web/src/components/AboutSection.tsx`
- `apps/web/src/components/ProjectsSection.tsx`
- `apps/web/src/components/ExperienceSection.tsx`
- `apps/web/src/components/SkillsSection.tsx`
- `apps/web/src/components/TechnologiesSectionV2.tsx`
- `apps/web/src/components/Navigation.tsx`
- `apps/web/src/components/ContactSection.tsx`

Changes:
1. Split each into `*.server.tsx` and `*.client.tsx` only where interactivity exists.
2. Keep static content, headings, and data mapping in server files.
3. Move only these concerns to client islands:
- carousels (Embla)
- filter tabs
- modal open/close
- scroll listener menu behavior
- typing animation effect
4. Use `Suspense` around section-level client islands and slow data-dependent chunks.
5. Prefer CSS-driven responsiveness over runtime `useBreakpoint` checks where possible.

DX impact:
- Smaller components with explicit responsibilities.
- Easier testing and profiling.

## 5.4 Hooks and data layer

### `apps/web/src/hooks/usePortfolioData.ts`
### `apps/web/src/hooks/useSiteSettings.ts`
Changes:
1. Keep for admin/client realtime contexts.
2. Stop using these hooks for initial public page data hydration.
3. Introduce server data access module(s) for public route.

New files proposed:
- `apps/web/src/lib/server/portfolioData.ts`
- `apps/web/src/lib/server/cache.ts` (optional helper)

Implementation detail:
1. Use server fetch helpers with typed return shape.
2. Parallelize independent reads with `Promise.all`.
3. Keep mapping functions shared and side-effect free.

### `apps/web/src/hooks/useSmoothScroll.ts`
Changes:
1. Remove global document click listener from app-wide shell.
2. Replace with scoped click handlers where required.
3. Keep utility-only `scrollToSection` if still needed.

### `apps/web/src/hooks/use-mobile.tsx`
Changes:
1. Keep for truly behavior-critical client decisions.
2. Replace pure layout branching with CSS media breakpoints.

DX/Perf impact:
- Less resize listener churn and reduced hydration mismatch risk.

## 5.5 Provider stack

### `apps/web/src/components/providers/AppProviders.tsx`
### `apps/web/src/lib/convex.ts`
Changes:
1. Split providers into:
- `RootProviders` (minimal, no Convex)
- `AdminProviders` (Convex provider + admin-specific UI providers)
2. Ensure `next-themes` usage is either:
- Removed if not needed, or
- Backed by proper `ThemeProvider` if `useTheme` remains in `ui/sonner.tsx`.

Perf impact:
- Lower base bundle for public pages.

## 5.6 Image optimization

Affected files include:
- `apps/web/src/components/AboutSection.tsx`
- `apps/web/src/components/HeroSection.tsx`
- `apps/web/src/components/ProjectsSection.tsx`
- `apps/web/src/components/ExperienceSection.tsx`
- `apps/web/src/components/ProjectModal.tsx`
- `apps/web/src/components/CertificateModal.tsx`
- `apps/web/src/features/admin/AdminDashboard.tsx`

Changes:
1. Replace `<img>` with `next/image` where possible.
2. Add `images.remotePatterns` in `apps/web/next.config.ts` for Convex storage and known external hosts.
3. Provide `sizes` and `priority` for above-the-fold images.
4. Use `placeholder` strategy where suitable.
5. Keep plain `<img>` only where `next/image` is intentionally unsuitable (document why).

Perf impact:
- Better LCP and bandwidth efficiency.

## 5.7 Dynamic/lazy loading

### `apps/web/src/components/BackgroundSpline.tsx`
Changes:
1. Move to dynamic import boundary (`next/dynamic`, `ssr: false`).
2. Load only after first paint or when section enters viewport.
3. Respect reduced-motion preferences.

General changes:
1. Consider dynamic import for heavy, non-critical client sections.
2. Avoid putting large third-party libs in top-level initial bundle.

---

## 6. Backend/Convex Optimization Plan

## 6.1 Query/index optimization

### `packages/backend/convex/portfolio.ts`
Changes:
1. Replace `collect() + sortByOrder` with index-driven queries where indexes exist (`by_order`).
2. Avoid provider N+1 pattern in `getCloudProvidersWithCertificates`:
- fetch all providers once
- fetch all certificates once
- group in memory by `providerId`
3. Review `getProjectsByCategory` strategy:
- current array filter over full dataset is acceptable for small datasets
- if growth expected, introduce normalized category indexing approach

DX/Perf impact:
- Predictable query complexity and improved scalability.

## 6.2 Mutation throughput and consistency

### `packages/backend/convex/admin.ts`
Changes:
1. Review sequential mutation loops in reorder/seed-like operations.
2. Keep correctness checks, but reduce redundant loops where safe.
3. Ensure mutation response payloads support client cache invalidation intent.

## 6.3 Schema evolution and constraints

### `packages/backend/convex/schema.ts`
Changes:
1. Validate index coverage against query patterns.
2. Add/comment expected access patterns near indexes for future maintainers.

---

## 7. Code Organization and DX Cleanup Plan

## 7.1 Public feature folder structure
Proposed structure:

```text
apps/web/src/features/public/
  page/
    PortfolioPage.server.tsx
    PortfolioPageClientShell.tsx
  sections/
    hero/
      HeroSection.server.tsx
      HeroSection.client.tsx
      HeroSection.types.ts
    projects/
      ProjectsSection.server.tsx
      ProjectsCarousel.client.tsx
      ProjectModal.client.tsx
    ...
  data/
    portfolioMappers.ts
```

Goal:
- Co-locate section logic, types, and local utilities.

## 7.2 Admin decomposition

### `apps/web/src/features/admin/AdminDashboard.tsx`
Current issue:
- Very large single file, mixed concerns (UI, state orchestration, mutation wiring, form schema, upload logic).

Proposed splits:
- `AdminDashboardPage.client.tsx` (top-level orchestration)
- `components/SectionCardGrid.tsx`
- `components/EntityInspector.tsx`
- `components/MediaUploadField.tsx`
- `components/ProjectOrderToolbar.tsx`
- `config/adminSections.ts`
- `lib/adminFormTransforms.ts`
- `lib/adminSelectors.ts`

DX impact:
- Better ownership and testability.

## 7.3 Type centralization
Changes:
1. Keep API domain types in `lib/portfolio.types.ts`.
2. Add route/section-specific view-model types close to section files.
3. Avoid large ad hoc payload type blocks inside hooks/components when possible.

## 7.4 CSS organization

### `apps/web/src/app/globals.css`
Changes:
1. Keep design tokens and base resets in `globals.css`.
2. Move large component utility classes and animations into split files:
- `styles/tokens.css`
- `styles/utilities.css`
- `styles/animations.css`
3. Import those from `globals.css`.

DX impact:
- Easier maintenance and reduced merge conflicts.

---

## 8. Tooling, CI/CD, and Repo Hygiene

## 8.1 CI alignment with actual stack

### `.github/workflows/ci.yml`
Issues:
1. Uses `npm ci` in Bun-managed workspace.
2. Uses root `npx tsc --noEmit` instead of package-level turbo typecheck.
3. Checks `dist` output which does not match Next.js output (`.next`).

Plan:
1. Use Bun setup action and `bun install`.
2. Run `bun run lint`, `bun run typecheck`, `bun run build`.
3. Validate `.next` output for web package if needed.

### `.github/workflows/security.yml`
Plan:
1. Align audit strategy with lockfile/package manager.
2. Consider `bun audit` and/or `npm audit` fallback with documented rationale.

## 8.2 Dependency and dead-code cleanup
Plan:
1. Audit dependencies for unused packages, especially UI libs and duplicated tooling.
2. Remove or archive stale files only after confirming no references.
3. Standardize scripts and docs around Bun + Turbo commands.

## 8.3 Documentation updates
Files:
- `README.md`
- `.github/README.md`
- `.github/SETUP.md`

Plan:
1. Update rendering architecture docs to reflect RSC/ISR/admin CSR split.
2. Add performance budgeting and profiling workflow to contributor guide.

---

## 9. Suspense, Promise, and `useQuery` Guidelines (Project-Specific)

## 9.1 Public page (preferred pattern)
1. In server route/section layer:
- Start all independent fetches immediately.
- Use `Promise.all` for independent data.
2. Wrap lower-priority sections with `Suspense` to stream.
3. Pass resolved data into mostly-server components.

When to avoid:
- Avoid client `useQuery` for first-render public content unless realtime behavior is explicitly required.

## 9.2 Admin page (preferred pattern)
1. Server side validates session.
2. Client dashboard uses `useQuery` and `useMutation` for realtime editing UX.
3. Use `Suspense` only where it improves perceived loading without over-fragmenting UX.

## 9.3 Promise usage guardrails
1. Parallelize independent requests.
2. Keep dependent requests explicit (do not over-parallelize causally dependent flows).
3. Start promise early, await late where it reduces critical path latency.

---

## 10. Performance Budgets and Success Criteria

## 10.1 Initial budget targets
1. Reduce `/` first-load JS from ~249 kB to <170 kB (stretch target <140 kB).
2. Reduce shared first-load JS from ~102 kB to <80 kB.
3. Eliminate all `no-img-element` warnings unless explicitly justified.
4. Keep admin route interactive performance stable while decomposing code.

## 10.2 Rendering success criteria
1. Public route primarily server-rendered with ISR.
2. Client hydration limited to interactive islands.
3. No accidental dynamic rendering on public route unless required.

## 10.3 DX success criteria
1. No mega-files for core features (>800 lines target threshold for refactor candidates).
2. Clear directory boundaries (server/client/shared).
3. CI reflects actual package manager and build outputs.

---

## 11. Proposed Implementation Phases

## Phase 0: Baseline and safety rails
1. Capture Lighthouse/Web Vitals baseline for `/` and `/admin`.
2. Add route bundle diff tracking in PR checks.
3. Lock in smoke tests for auth and critical navigation.

Exit criteria:
- Baseline metrics documented.

## Phase 1: Public rendering architecture
1. Convert public page shell to RSC + ISR.
2. Introduce server data module and remove public hook-driven initial data loads.
3. Add section-level `Suspense` streaming boundaries.

Exit criteria:
- Public route renders correctly without requiring client data bootstrap.

## Phase 2: Image/media optimization
1. Migrate critical `<img>` to `next/image`.
2. Configure `next.config.ts` image patterns.
3. Tune image `sizes` and priority.

Exit criteria:
- Lint warning count reduced to zero (or documented exceptions).

## Phase 3: Provider and bundle boundary cleanup
1. Split root and admin providers.
2. Move Convex provider out of global root where possible.
3. Lazy-load heavy client-only components.

Exit criteria:
- Measurable first-load JS reduction.

## Phase 4: Admin decomposition and DX improvements
1. Break `AdminDashboard.tsx` into smaller modules.
2. Extract admin configs/selectors/transforms.
3. Keep behavior parity with snapshot tests.

Exit criteria:
- Smaller files and preserved admin behavior.

## Phase 5: Backend/Convex query optimization
1. Refactor index usage and N+1 query patterns.
2. Validate data correctness and ordering.

Exit criteria:
- Query logic simplified and scalable.

## Phase 6: Tooling and CI alignment
1. Update workflows for Bun/Turbo/Next outputs.
2. Refresh docs and developer onboarding instructions.

Exit criteria:
- CI stable and representative.

---

## 12. Test and Verification Plan

## 12.1 Automated checks
1. `bun run lint`
2. `bun run typecheck`
3. `bun run build`
4. Add smoke E2E for:
- public route render
- admin auth redirect behavior
- admin login and dashboard access

## 12.2 Manual checks
1. Public page visual parity desktop/mobile.
2. Scroll/animation behavior and reduced-motion fallback.
3. Admin CRUD operations and reorder workflow.
4. Upload flows and media preview behavior.

## 12.3 Regression checks
1. Verify no hydration mismatch warnings.
2. Verify metadata/social image URLs resolve correctly with `metadataBase`.
3. Verify no route inadvertently becomes dynamic/static against intent.

---

## 13. Risks and Mitigations

1. Risk: RSC conversion may break animation-heavy sections.
- Mitigation: move only interaction logic to client islands and preserve motion components where needed.

2. Risk: Provider boundary changes may affect toasts/tooltips availability.
- Mitigation: explicit provider contract per route group with smoke tests.

3. Risk: Query refactors could alter sort/filter semantics.
- Mitigation: snapshot fixtures and deterministic ordering assertions.

4. Risk: CI migration may disrupt contributor workflows.
- Mitigation: update docs and provide fallback local commands.

---

## 14. Handoff Checklist for Implementing Developer/Agent

1. Create a dedicated branch for the optimization program.
2. Execute phases in order; do not combine all in one PR.
3. Keep each PR scoped with explicit before/after metrics.
4. Require route-level QA signoff before merging each phase.
5. Keep this plan updated with completed items and deviations.

---

## 15. Optional Future Enhancements (Post-Core)

1. Add route-level `instrumentation.ts` and Web Vitals reporting pipeline.
2. Introduce on-demand ISR revalidation hooks on admin mutations.
3. Add bundle analyzer in CI artifact for pull requests.
4. Add lightweight E2E performance guardrails for `/`.

---

## 16. Suggested Deliverables During Execution

1. `docs/architecture/rendering-strategy.md`
2. `docs/architecture/data-flow.md`
3. `docs/performance/budgets.md`
4. `docs/migrations/public-rsc-isr-migration.md`

These companion docs should be produced while implementing the plan to preserve institutional knowledge and maintain DX over time.

