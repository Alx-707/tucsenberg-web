import { vi } from "vitest";

// Mock CSS imports to avoid PostCSS processing in tests
vi.mock("@/app/globals.css", () => ({ default: {} }));

// Mock server-only to prevent import errors in test environment
vi.mock("server-only", () => ({}));

// Mock MDX importers to prevent Vite from resolving @content imports in test environment
// This is necessary because @content/* paths reference actual MDX files that may not exist
// or should not be loaded during unit/integration tests
vi.mock("@/lib/mdx-importers.generated", () => ({
  postImporters: {
    en: {},
    zh: {},
  },
  productImporters: {
    en: {},
    zh: {},
  },
  pageImporters: {
    en: {},
    zh: {},
  },
}));

// Mock next/font/local for local font loading
// - Support both Geist Sans (template default) and Open Sans (theme variants)
vi.mock("next/font/local", () => ({
  default: vi.fn(
    (config: { src: string | Array<{ path: string }>; variable?: string }) => {
      const src = config?.src;
      const srcText = Array.isArray(src)
        ? src.map((item) => item.path).join(",")
        : typeof src === "string"
          ? src
          : "";

      const isOpenSans =
        config?.variable === "--font-open-sans" ||
        srcText.includes("open-sans");

      if (isOpenSans) {
        return {
          variable: "--font-open-sans",
          className: "open-sans-local",
          style: { fontFamily: "Open Sans" },
        };
      }

      return {
        variable: "--font-geist-sans",
        className: "geist-sans-subset",
        style: { fontFamily: "Geist Sans Latin" },
      };
    },
  ),
}));

// Mock next/font/google (kept for compatibility, not currently used in all repos)
vi.mock("next/font/google", () => ({
  Open_Sans: vi.fn(() => ({
    variable: "--font-open-sans",
    className: "open-sans",
    style: { fontFamily: "Open Sans" },
  })),
}));
