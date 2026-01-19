# Dependencies Spec Delta

## MODIFIED Requirements

### Requirement: Next.js Version

The project SHALL use Next.js 16.1.2 with Turbopack for development builds.

#### Scenario: MDX with multibyte characters

**Given** an MDX file containing Chinese characters in `content/`
**When** the file is processed by Turbopack during development
**Then** the build completes without crashing

#### Scenario: Production build

**Given** the project with Next.js 16.1.2
**When** `pnpm build` is executed
**Then** the build completes successfully with no errors
