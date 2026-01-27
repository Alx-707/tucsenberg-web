# Twitter Theme Complete Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 完整实现 tweakcn.com Twitter 主题的所有设计 token，包括颜色、字体、圆角和阴影。

**Architecture:**
- 使用 next/font/google 加载 Open Sans 字体
- 更新 globals.css 中的 CSS 变量和 Tailwind theme 配置
- 修复当前颜色变量中的一些错误值（accent-foreground、muted-foreground、card-foreground in dark mode）

**Tech Stack:** Next.js 16, Tailwind CSS v4, next/font/google, OKLCH 颜色格式

---

## Twitter 主题完整 Token 参考

### Light Mode
```
background: #ffffff
foreground: #0f1419
card: #f7f8f8
card-foreground: #0f1419
popover: #ffffff
popover-foreground: #0f1419
primary: #1e9df1
primary-foreground: #ffffff
secondary: #0f1419
secondary-foreground: #ffffff
muted: #E5E5E6
muted-foreground: #0f1419  ← 注意：原主题是 #0f1419，不是灰色
accent: #E3ECF6
accent-foreground: #1e9df1  ← 注意：原主题是 Twitter Blue
destructive: #f4212e
destructive-foreground: #ffffff
border: #e1eaef
input: #f7f9fa
ring: #1da1f2
font-sans: Open Sans, sans-serif
font-serif: Georgia, serif
font-mono: Menlo, monospace
radius: 1.3rem
shadow-color: rgba(29,161,242,0.15)
shadow-opacity: 0
shadow-blur: 0px
shadow-spread: 0px
shadow-offset-x: 0px
shadow-offset-y: 2px
```

### Dark Mode
```
background: #000000
foreground: #e7e9ea
card: #17181c
card-foreground: #d9d9d9  ← 注意：是 #d9d9d9，不同于 foreground
popover: #000000
popover-foreground: #e7e9ea
primary: #1c9cf0
primary-foreground: #ffffff
secondary: #f0f3f4
secondary-foreground: #0f1419
muted: #181818
muted-foreground: #72767a  ← 注意：是灰色 #72767a
accent: #061622
accent-foreground: #1c9cf0  ← 注意：是 Twitter Blue
destructive: #f4212e
destructive-foreground: #ffffff
border: #242628
input: #22303c
ring: #1da1f2
shadow-color: rgba(29,161,242,0.25)
```

---

## Task 1: 安装 Open Sans 字体

**Files:**
- Modify: `src/app/[locale]/layout-fonts.ts`

**Step 1: 添加 Open Sans 字体导入**

```typescript
import localFont from "next/font/local";
import { Open_Sans } from "next/font/google";

/**
 * Twitter 主题字体配置
 * 使用 Open Sans 作为主要无衬线字体
 */
export const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

/**
 * Geist Sans Latin 子集字体配置（保留作为备用）
 * P2-1 Phase 3：使用本地 Latin 子集替代完整 Geist Sans，节省 ~32KB
 * 子集包含：ASCII (U+0020-007E) + Latin-1 Supplement (U+00A0-00FF)
 * License: SIL Open Font License（允许子集化和再分发）
 */
export const geistSans = localFont({
  src: "./GeistSans-Latin.woff2",
  variable: "--font-geist-sans",
  display: "swap",
  weight: "100 900",
});

/**
 * Geist Mono 不再全局加载（P2-1 Phase 2）
 * 等宽字体使用系统字体栈：ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace
 * 如需在特定组件中使用等宽字体，可添加本地字体文件并通过 next/font/local 配置。
 */

/**
 * 获取字体类名字符串，应用到 body 元素
 * Twitter 主题：使用 Open Sans 作为主要字体
 */
export function getFontClassNames(): string {
  return `${openSans.variable} ${geistSans.variable}`;
}
```

**Step 2: 运行类型检查验证**

Run: `pnpm type-check`
Expected: PASS

**Step 3: Commit**

```bash
git add src/app/[locale]/layout-fonts.ts
git commit -m "feat(theme): add Open Sans font for Twitter theme"
```

---

## Task 2: 更新 CSS 变量 - 字体配置

**Files:**
- Modify: `src/app/globals.css:11-18` (@theme inline 块)
- Modify: `src/app/globals.css:255-258` (body 样式)

**Step 1: 更新 @theme inline 中的字体变量**

在 `@theme inline` 块中，更新字体配置：

```css
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  /* Twitter 主题：使用 Open Sans 作为主要字体 */
  --font-sans: var(--font-open-sans), var(--font-geist-sans);
  /* Twitter 主题：使用 Georgia 作为衬线字体 */
  --font-serif: Georgia, Cambria, "Times New Roman", Times, serif;
  /* Twitter 主题：使用 Menlo 作为等宽字体 */
  --font-mono: Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  /* ... 其余颜色变量保持不变 ... */
}
```

**Step 2: 更新 body 字体样式**

在 `@layer base` 中，更新 body 的 font-family：

```css
body {
  @apply bg-background text-foreground;
  font-family: var(--font-open-sans), var(--font-geist-sans), var(--font-chinese-stack);
}
```

**Step 3: 运行构建验证**

Run: `pnpm build`
Expected: PASS

**Step 4: Commit**

```bash
git add src/app/globals.css
git commit -m "feat(theme): update font configuration for Twitter theme"
```

---

## Task 3: 修复 Light Mode 颜色变量

**Files:**
- Modify: `src/app/globals.css:54-152` (:root 块)

**Step 1: 修复 accent-foreground 和 muted-foreground**

原主题中：
- `accent-foreground` 应该是 `#1e9df1` (Twitter Blue)，不是深灰色
- `muted-foreground` 应该是 `#0f1419` (深灰色)，当前使用的是错误值

更新以下变量：

```css
/* 静音颜色 */
/* #E5E5E6 -> oklch(0.919 0.001 264.5) */
--muted: oklch(0.919 0.001 264.5);
/* #0f1419 -> oklch(0.183 0.011 256.1) - 原主题使用深灰色 */
--muted-foreground: oklch(0.183 0.011 256.1);

/* 强调颜色 */
/* #E3ECF6 -> oklch(0.939 0.018 250.1) */
--accent: oklch(0.939 0.018 250.1);
/* #1e9df1 -> oklch(0.668 0.163 237.8) - Twitter Blue */
--accent-foreground: oklch(0.668 0.163 237.8);
```

**Step 2: 运行类型检查**

Run: `pnpm type-check`
Expected: PASS

**Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "fix(theme): correct accent-foreground and muted-foreground in light mode"
```

---

## Task 4: 修复 Dark Mode 颜色变量

**Files:**
- Modify: `src/app/globals.css:155-249` (.dark 块)

**Step 1: 修复 card-foreground、muted-foreground 和 accent-foreground**

原主题中：
- `card-foreground` 应该是 `#d9d9d9`，不是 `#e7e9ea`
- `muted-foreground` 应该是 `#72767a` (灰色)，当前使用的是错误值
- `accent-foreground` 应该是 `#1c9cf0` (Twitter Blue dark)

更新以下变量：

```css
/* 卡片和弹出层 */
/* #17181c -> oklch(0.173 0.009 273.9) */
--card: oklch(0.173 0.009 273.9);
/* #d9d9d9 -> oklch(0.878 0 0) - 注意：与 foreground 不同 */
--card-foreground: oklch(0.878 0 0);

/* 静音颜色 */
/* #181818 -> oklch(0.168 0 0) */
--muted: oklch(0.168 0 0);
/* #72767a -> oklch(0.532 0.012 252.9) - Twitter 灰色 */
--muted-foreground: oklch(0.532 0.012 252.9);

/* 强调颜色 */
/* #061622 -> oklch(0.146 0.024 242.8) */
--accent: oklch(0.146 0.024 242.8);
/* #1c9cf0 -> oklch(0.663 0.165 237.7) - Twitter Blue dark */
--accent-foreground: oklch(0.663 0.165 237.7);

/* 侧边栏颜色 */
/* #17181c */
--sidebar: oklch(0.173 0.009 273.9);
/* #d9d9d9 -> oklch(0.878 0 0) */
--sidebar-foreground: oklch(0.878 0 0);
```

**Step 2: 运行类型检查**

Run: `pnpm type-check`
Expected: PASS

**Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "fix(theme): correct card-foreground, muted-foreground, accent-foreground in dark mode"
```

---

## Task 5: 添加 Twitter 阴影变量

**Files:**
- Modify: `src/app/globals.css:54-152` (:root 块)
- Modify: `src/app/globals.css:155-249` (.dark 块)

**Step 1: 在 :root 块末尾添加阴影变量**

在 `:root` 块的 `--sidebar-ring` 之后添加：

```css
/* Twitter 主题 - 阴影设置 */
--shadow-color: oklch(0.676 0.163 237.7 / 15%); /* rgba(29,161,242,0.15) */
--shadow-opacity: 0;
--shadow-blur: 0px;
--shadow-spread: 0px;
--shadow-offset-x: 0px;
--shadow-offset-y: 2px;
```

**Step 2: 在 .dark 块末尾添加阴影变量**

在 `.dark` 块的 `--sidebar-ring` 之后添加：

```css
/* Twitter 主题 - 阴影设置 (dark mode) */
--shadow-color: oklch(0.676 0.163 237.7 / 25%); /* rgba(29,161,242,0.25) */
```

**Step 3: 运行构建验证**

Run: `pnpm build`
Expected: PASS

**Step 4: Commit**

```bash
git add src/app/globals.css
git commit -m "feat(theme): add Twitter shadow variables"
```

---

## Task 6: 完整验证

**Step 1: 运行完整 CI 检查**

Run: `pnpm ci:local:quick`
Expected: PASS

**Step 2: 运行完整构建**

Run: `pnpm build`
Expected: PASS

**Step 3: 启动开发服务器视觉验证**

Run: `pnpm dev`

手动检查：
- [ ] 主色调为 Twitter Blue (#1e9df1)
- [ ] Light mode 背景为白色
- [ ] Dark mode 背景为纯黑色
- [ ] 字体为 Open Sans
- [ ] 圆角为较大的 1.3rem
- [ ] 切换主题时颜色正确

**Step 4: 最终提交**

```bash
git add .
git commit -m "feat(theme): complete Twitter theme implementation from tweakcn"
```

---

## 变更总结

| 文件 | 变更类型 | 说明 |
|------|---------|------|
| `src/app/[locale]/layout-fonts.ts` | 修改 | 添加 Open Sans 字体 |
| `src/app/globals.css` | 修改 | 更新字体变量、修复颜色值、添加阴影变量 |

### 颜色值修正清单

| 变量 | 模式 | 修正前 | 修正后 |
|------|------|--------|--------|
| `--muted-foreground` | light | `oklch(0.478 0.025 238.5)` | `oklch(0.183 0.011 256.1)` |
| `--accent-foreground` | light | `oklch(0.183 0.011 256.1)` | `oklch(0.668 0.163 237.8)` |
| `--card-foreground` | dark | `oklch(0.929 0.005 264.5)` | `oklch(0.878 0 0)` |
| `--muted-foreground` | dark | `oklch(0.664 0.028 244.5)` | `oklch(0.532 0.012 252.9)` |
| `--accent-foreground` | dark | `oklch(0.929 0.005 264.5)` | `oklch(0.663 0.165 237.7)` |
| `--sidebar-foreground` | dark | `oklch(0.929 0.005 264.5)` | `oklch(0.878 0 0)` |
