# Tasks: upgrade-nextjs-16.1.2

## Pre-flight

- [ ] 1. Verify current Next.js version is 16.1.1
- [ ] 2. Review release notes for breaking changes (none expected)

## Implementation

- [ ] 3. Update `next` version in `package.json` to `16.1.2`
- [ ] 4. Run `pnpm install` to update lockfile
- [ ] 5. Verify no peer dependency warnings

## Validation

- [ ] 6. Run `pnpm type-check` - TypeScript validation
- [ ] 7. Run `pnpm lint:check` - ESLint validation
- [ ] 8. Run `pnpm build` - Production build
- [ ] 9. Run `pnpm test` - Unit tests
- [ ] 10. Run `pnpm dev` - Verify dev server starts without errors
- [ ] 11. Test MDX content with Chinese characters renders correctly

## Commit

- [ ] 12. Commit with message: `chore(deps): upgrade next.js to 16.1.2`
