# GitHub Actions CI/CD Pipelines

This directory contains GitHub Actions workflows for automated testing, security checks, and deployment validation.

## 📋 Quick Overview

| Workflow | Status | Triggers | Purpose |
|----------|--------|----------|---------|
| **CI Pipeline** | ✅ Ready | PR + Push to main | Type check, lint, build |
| **Security Audit** | ✅ Ready | PR + Weekly + Manual | Dependency vulnerability scan |
| **Vercel Preview** | ✅ Ready | PR to main | Comment with preview URL |
| **Env Variables Check** | ⚠️ Needs setup | PR (`.env.example` changes) | Verify Vercel env vars |

## 🚀 Quick Start

1. **Read the setup guide:** [SETUP.md](./SETUP.md)
2. **Add GitHub secrets** (for env-check workflow):
   - `VERCEL_TOKEN` (required)
   - `VERCEL_PROJECT_ID` (optional)
   - `VERCEL_ORG_ID` (optional)
3. **Create a PR** to test the workflows
4. **Check the Actions tab** to see results

## 📦 What Gets Checked

### On Every Pull Request:
- ✅ TypeScript compilation
- ✅ ESLint code quality
- ✅ Build success
- ✅ Bundle size warnings
- 🔒 Security vulnerabilities
- 🔗 Vercel preview deployment
- 🔑 Environment variables (if `.env.example` changed)

### Weekly (Mondays at 9 AM UTC):
- 🔒 Security audit for new vulnerabilities

## 💡 Pro Tips

- **All workflows work out of the box** except env-check (requires secrets)
- Workflows will **block merging** if they fail (recommended)
- You can **manually trigger** security audit and env-check from Actions tab
- Preview URLs are **automatically posted** as PR comments

## 📚 Learn More

- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Vercel GitHub Integration](https://vercel.com/docs/concepts/git/vercel-for-github)

---

**Need help?** Check [SETUP.md](./SETUP.md) for detailed instructions.
