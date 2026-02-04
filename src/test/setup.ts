/**
 * Vitest 测试环境设置文件
 * 配置全局测试环境、Mock和工具函数（按职责拆分）
 */

import "@testing-library/jest-dom/vitest";
import type { TestingLibraryMatchers } from "@testing-library/jest-dom/matchers";
import "@/test/setup.console";
import "@/test/setup.base-mocks";
import "@/test/setup.fetch";
import "@/test/setup.next";
import "@/test/setup.icons";
import "@/test/setup.zod";
import "@/test/setup.constants-and-i18n";
import "@/test/setup.env";
import "@/test/setup.browser-apis";
import "@/test/setup.hooks";

declare module "vitest" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface Assertion<T = any> extends TestingLibraryMatchers<T, void> {}
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface AsymmetricMatchersContaining extends TestingLibraryMatchers<
    any,
    void
  > {}
}

export {
  triggerAll,
  triggerVisible,
  setIntersectionAutoVisibleAll,
} from "@/test/setup.intersection-observer";
