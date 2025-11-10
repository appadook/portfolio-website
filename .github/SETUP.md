# GitHub Actions Setup Guide

This document explains how to configure the GitHub Actions workflows for this project.

## Required GitHub Secrets

To enable all CI/CD workflows, you need to add the following secrets to your GitHub repository:

### 1. **VERCEL_TOKEN** (Required for env-check workflow)

**Purpose:** Allows GitHub Actions to interact with Vercel API

**How to get it:**
1. Go to https://vercel.com/account/tokens
2. Click "Create Token"
3. Name it "GitHub Actions CI/CD"
4. Copy the token

**How to add it:**
1. Go to your GitHub repository
2. Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Name: `VERCEL_TOKEN`
5. Paste the token
6. Click "Add secret"

### 2. **VERCEL_ORG_ID** (Optional but recommended)

**Purpose:** Identifies your Vercel organization/team

**How to get it:**
1. Go to your Vercel dashboard
2. Click on your team/profile in the top right
3. Settings → General
4. Copy the "Team ID" or "Personal Account ID"

**How to add it:**
Same process as VERCEL_TOKEN, but name it `VERCEL_ORG_ID`

### 3. **VERCEL_PROJECT_ID** (Optional but recommended)

**Purpose:** Identifies your specific Vercel project

**How to get it:**
1. Go to your Vercel project dashboard
2. Settings → General
3. Copy the "Project ID"

**How to add it:**
Same process as VERCEL_TOKEN, but name it `VERCEL_PROJECT_ID`

---

## Workflows Overview

### 1. **CI Pipeline** (`.github/workflows/ci.yml`)
**Triggers:** Every PR to main + pushes to main
**Purpose:** Ensures code quality before deployment

**What it does:**
- ✅ Installs dependencies
- ✅ Runs TypeScript type checking
- ✅ Runs ESLint
- ✅ Builds the project
- ✅ Checks bundle size

**No setup required** - works out of the box!

---

### 2. **Security Audit** (`.github/workflows/security.yml`)
**Triggers:** PRs to main + weekly schedule + manual

**Purpose:** Checks for security vulnerabilities in dependencies

**What it does:**
- 🔒 Runs `npm audit`
- ❌ Fails on critical/high vulnerabilities
- 💬 Comments on PR if vulnerabilities found
- 📅 Runs weekly to catch new vulnerabilities

**No setup required** - works out of the box!

---

### 3. **Vercel Preview Comment** (`.github/workflows/vercel-preview.yml`)
**Triggers:** Every PR to main

**Purpose:** Adds preview deployment URL to PR comments

**What it does:**
- ⏳ Waits for Vercel to finish deploying
- 💬 Adds/updates comment with preview URL
- 🔗 Provides direct link to preview deployment

**No setup required** - works out of the box!
*(Uses default GitHub token)*

---

### 4. **Environment Variables Check** (`.github/workflows/env-check.yml`)
**Triggers:** PRs that modify `.env.example` + manual

**Purpose:** Ensures all required env vars are set in Vercel

**What it does:**
- 📋 Extracts required vars from `.env.example`
- 🔍 Checks if they exist in Vercel
- ❌ Fails if any are missing
- 💬 Comments on PR with missing variables

**Setup required:** Add `VERCEL_TOKEN` secret (see above)

**Optional:** Add `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` for better reliability

---

## Testing the Workflows

After setting up the secrets:

1. **Create a test PR** to trigger the workflows
2. **Check the Actions tab** to see the workflows running
3. **Fix any issues** that the workflows identify

### Manual Trigger

You can manually run workflows from the Actions tab:
1. Go to Actions
2. Select the workflow
3. Click "Run workflow"

---

## Troubleshooting

### Environment Variables Check Fails

**Error:** "Could not fetch environment variables from Vercel"

**Solution:**
1. Make sure `VERCEL_TOKEN` is set correctly
2. Check that the token has not expired
3. Verify you have access to the Vercel project

### Security Audit Fails

**Error:** "Critical or high severity vulnerabilities found"

**Solution:**
1. Run `npm audit` locally
2. Run `npm audit fix` to automatically fix issues
3. For unfixable issues, check if updates are available
4. Commit the fixes and push

### CI Pipeline Fails

**Error:** TypeScript or ESLint errors

**Solution:**
1. Run `npm run lint` locally
2. Fix the reported issues
3. Run `npx tsc --noEmit` to check types
4. Commit the fixes and push

---

## Disabling Workflows

If you want to disable a workflow temporarily:

1. Go to `.github/workflows/[workflow-name].yml`
2. Comment out or remove the file
3. Or add `if: false` to the job

---

## Adding More Workflows

To add more workflows in the future:

1. Create a new `.yml` file in `.github/workflows/`
2. Define the trigger conditions
3. Add the steps you want to run
4. Commit and push

For more information, see the [GitHub Actions documentation](https://docs.github.com/en/actions).
