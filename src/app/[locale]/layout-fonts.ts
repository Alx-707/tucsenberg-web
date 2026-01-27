import localFont from "next/font/local";

/**
 * Twitter 主题字体配置
 * 使用 Open Sans 作为主要无衬线字体
 * 本地字体文件来源：@fontsource/open-sans (Latin subset)
 * License: Apache License 2.0
 */
export const openSans = localFont({
  src: [
    { path: "./fonts/open-sans-latin-300-normal.woff2", weight: "300" },
    { path: "./fonts/open-sans-latin-400-normal.woff2", weight: "400" },
    { path: "./fonts/open-sans-latin-500-normal.woff2", weight: "500" },
    { path: "./fonts/open-sans-latin-600-normal.woff2", weight: "600" },
    { path: "./fonts/open-sans-latin-700-normal.woff2", weight: "700" },
    { path: "./fonts/open-sans-latin-800-normal.woff2", weight: "800" },
  ],
  variable: "--font-open-sans",
  display: "swap",
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
