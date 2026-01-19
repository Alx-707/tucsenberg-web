# Proposal: upgrade-nextjs-16.1.2

## Summary

Upgrade Next.js from 16.1.1 to 16.1.2 to incorporate Turbopack bug fixes and performance improvements.

## Motivation

Next.js v16.1.2 (released 2025-01-14) is a patch release backporting critical bug fixes:

1. **MDX Multibyte Character Crash Fix** - Turbopack crashed when processing MDX files containing multibyte characters (e.g., Chinese, Japanese, emoji). This directly impacts our i18n content in `content/` directory.

2. **musl/Alpine Performance Fix** - Significant performance improvement on musl-based Linux distributions (Alpine in Docker) by enabling mimalloc allocator. Relevant for containerized deployments.

## Scope

- **In scope**: Update `next` package version in `package.json`
- **Out of scope**: No API changes, no breaking changes, no new features

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Build regression | Low | High | Run full CI pipeline |
| Runtime regression | Very Low | Medium | E2E tests cover critical paths |

**Risk Level**: Low - This is a patch release with only bug fixes, no breaking changes.

## Success Criteria

1. `pnpm install` completes without errors
2. `pnpm type-check` passes
3. `pnpm build` succeeds
4. `pnpm test` passes
5. `pnpm test:e2e` passes (if available)
6. No new console warnings in dev mode

## References

- [Next.js v16.1.2 Release Notes](https://github.com/vercel/next.js/releases/tag/v16.1.2)
- [PR #87841 - swc_core update](https://github.com/vercel/next.js/pull/87841)
- [PR #88503 - mimalloc on musl](https://github.com/vercel/next.js/pull/88503)
- [Issue #87713 - MDX multibyte crash](https://github.com/vercel/next.js/issues/87713)
