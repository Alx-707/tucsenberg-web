# CLAUDE.md

## WHY — 项目目的

玻璃/幕墙公司官网。面向国际 B2B 客户，展示产品（Low-E 中空玻璃、单元式幕墙、店面系统等），支持中英文，提供询盘入口。

---

## WHAT — 技术栈与结构

**Stack**: Next.js 16 (App Router, Cache Components) + React 19 + TypeScript 5 + Tailwind 4 + next-intl

```
src/
├── app/[locale]/     # Async Server Components (pages)
├── components/       # shadcn/ui based
├── lib/              # Utilities, services
├── i18n/             # next-intl config
content/              # MDX by locale
messages/             # i18n JSON
```

---

## HOW — 验证命令

```bash
pnpm dev              # Dev server
pnpm build            # Production build
pnpm type-check       # TypeScript
pnpm test             # Vitest
pnpm ci:local:quick   # Fast CI gate
```

---

## Hard Constraints

1. **TypeScript strict** — No `any`, prefer `interface`
2. **Server Components first** — `"use client"` only for interactivity
3. **i18n required** — All user text via translation keys
4. **Complexity** — Function ≤120 lines, File ≤500 lines

---

## Rules Index

Read **only when relevant** to current task:

| Topic | File |
|-------|------|
| Next.js 16 Cache Components | `architecture.md` |
| Naming, imports | `coding-standards.md` |
| CI, coverage, Lighthouse | `quality-gates.md` |
| XSS, CSP, validation | `security.md` |
| Bug investigation | `debugging.md` |
| API threat analysis | `threat-modeling.md` |
| Requirement clarification | `socratic-questioning.md` |
| Dependency upgrades | `dependency-upgrade.md` |

All in `.claude/rules/`.

---

## Protocols

- **Language**: English for tools; **Chinese** for user output
- **Git**: Never commit to `main`—use feature branch (`feat/`, `fix/`, `docs/`, `chore/`)
- **Next.js DevTools**: When starting work, ALWAYS call `init` from `next-devtools-mcp` FIRST to set up context and establish documentation requirements (automatic, no prompt needed)
