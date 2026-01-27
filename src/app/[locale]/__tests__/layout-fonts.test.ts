import { describe, expect, it } from "vitest";
import {
  geistSans,
  getFontClassNames,
  openSans,
} from "@/app/[locale]/layout-fonts";

// 使用全局 setup 中的 next/font/local mock（src/test/setup.ts）
// 该全局 mock 提供 variable/className/style，避免 ESM 目录导入问题
//
// Twitter 主题更新说明：
// - Open Sans 通过 next/font/local 本地加载
// - openSans 和 geistSans 都是 localFont 对象
// - getFontClassNames() 返回两个字体变量

describe("Layout Fonts Configuration", () => {
  describe("openSans字体配置 (Twitter主题)", () => {
    it("应该正确配置Open Sans字体", () => {
      expect(openSans).toBeDefined();
      expect(openSans.variable).toBe("--font-open-sans");
    });

    it("应该包含正确的字体配置选项", () => {
      expect(openSans).toHaveProperty("variable");
      expect(openSans).toHaveProperty("className");
      expect(openSans).toHaveProperty("style");
    });

    it("应该设置正确的CSS变量名", () => {
      expect(openSans.variable).toBe("--font-open-sans");
    });
  });

  describe("geistSans字体配置 (备用字体)", () => {
    it("应该正确配置Geist Sans字体", () => {
      expect(geistSans).toBeDefined();
      expect(geistSans.variable).toBe("--font-geist-sans");
    });

    it("应该包含正确的字体配置选项", () => {
      // 验证字体配置对象的结构
      expect(geistSans).toHaveProperty("variable");
      expect(geistSans).toHaveProperty("className");
      expect(geistSans).toHaveProperty("style");
    });

    it("应该设置正确的CSS变量名", () => {
      expect(geistSans.variable).toBe("--font-geist-sans");
    });
  });

  describe("getFontClassNames函数 (Twitter主题)", () => {
    it("应该返回Open Sans和Geist Sans变量", () => {
      const classNames = getFontClassNames();

      expect(typeof classNames).toBe("string");
      expect(classNames).toContain("--font-open-sans");
      expect(classNames).toContain("--font-geist-sans");
      // Geist Mono 不应包含在全局类名中
      expect(classNames).not.toContain("--font-geist-mono");
    });

    it("应该包含两个字体变量", () => {
      const classNames = getFontClassNames();

      expect(classNames).toBe(`${openSans.variable} ${geistSans.variable}`);
    });

    it("应该返回一致的结果", () => {
      const classNames1 = getFontClassNames();
      const classNames2 = getFontClassNames();

      expect(classNames1).toBe(classNames2);
    });

    it("应该返回非空字符串", () => {
      const classNames = getFontClassNames();

      expect(classNames).toBeTruthy();
      expect(classNames.length).toBeGreaterThan(0);
    });
  });

  describe("字体变量一致性", () => {
    it("字体变量应该遵循CSS自定义属性命名规范", () => {
      expect(openSans.variable).toMatch(/^--font-/);
      expect(geistSans.variable).toMatch(/^--font-/);
    });

    it("getFontClassNames应该包含所有字体变量", () => {
      const classNames = getFontClassNames();

      expect(classNames).toContain(openSans.variable);
      expect(classNames).toContain(geistSans.variable);
    });
  });

  describe("字体对象属性验证", () => {
    it("openSans应该包含必要的Next.js字体属性", () => {
      expect(openSans).toHaveProperty("className");
      expect(openSans).toHaveProperty("style");
      expect(typeof openSans.className).toBe("string");
      expect(typeof openSans.style).toBe("object");
    });

    it("geistSans应该包含必要的Next.js字体属性", () => {
      expect(geistSans).toHaveProperty("className");
      expect(geistSans).toHaveProperty("style");
      expect(typeof geistSans.className).toBe("string");
      expect(typeof geistSans.style).toBe("object");
    });

    it("字体样式对象应该包含fontFamily属性", () => {
      expect(openSans.style).toHaveProperty("fontFamily");
      expect(typeof openSans.style.fontFamily).toBe("string");
      expect(geistSans.style).toHaveProperty("fontFamily");
      expect(typeof geistSans.style.fontFamily).toBe("string");
    });
  });

  describe("边界条件测试", () => {
    it("字体变量名不应该为空", () => {
      expect(openSans.variable.length).toBeGreaterThan(0);
      expect(geistSans.variable.length).toBeGreaterThan(0);
    });

    it("字体类名不应该为空", () => {
      expect(openSans.className.length).toBeGreaterThan(0);
      expect(geistSans.className.length).toBeGreaterThan(0);
    });

    it("getFontClassNames返回值不应该包含多余的空格", () => {
      const classNames = getFontClassNames();

      // 不应该以空格开头或结尾
      expect(classNames).not.toMatch(/^\s/);
      expect(classNames).not.toMatch(/\s$/);

      // 不应该包含连续的空格
      expect(classNames).not.toMatch(/\s{2,}/);
    });
  });
});
