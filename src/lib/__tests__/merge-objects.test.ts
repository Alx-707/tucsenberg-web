import { describe, expect, it } from "vitest";
import { mergeObjects } from "@/lib/merge-objects";

describe("mergeObjects", () => {
  it("merges defined source values and preserves target when source is undefined", () => {
    interface Model extends Record<string, unknown> {
      a: number;
      b: string | undefined;
    }

    const target: Model = { a: 1, b: "x" };
    const source: Partial<Model> = { a: 2, b: undefined };

    const merged = mergeObjects(target, source);

    expect(merged).toEqual({ a: 2, b: "x" });
    expect(target).toEqual({ a: 1, b: "x" });
  });

  it("deep merges nested plain objects and keeps target-only keys", () => {
    interface Model extends Record<string, unknown> {
      nested: Record<string, number>;
    }

    const target: Model = { nested: { keep: 1, change: 1 } };
    const source: Partial<Model> = { nested: { change: 2 } };

    const merged = mergeObjects(target, source);

    expect(merged).toEqual({ nested: { keep: 1, change: 2 } });
  });

  it("replaces arrays instead of deep merging them", () => {
    interface Model extends Record<string, unknown> {
      items: number[];
    }

    const target: Model = { items: [1, 2] };
    const source: Partial<Model> = { items: [3] };

    const merged = mergeObjects(target, source);

    expect(merged).toEqual({ items: [3] });
  });

  it("ignores inherited enumerable properties on source", () => {
    const source = Object.create({ inherited: "nope" }) as Partial<
      Record<string, unknown>
    >;
    source.own = "ok";

    const merged = mergeObjects<Record<string, unknown>>({}, source);

    expect(merged).toEqual({ own: "ok" });
  });

  describe("prototype pollution protection", () => {
    it("blocks __proto__ key from being merged", () => {
      const target: Record<string, unknown> = { safe: "value" };
      // Simulate malicious payload with __proto__
      const source = JSON.parse('{"__proto__": {"polluted": true}, "ok": 1}');

      const merged = mergeObjects(target, source);

      expect(merged).toEqual({ safe: "value", ok: 1 });
      // Verify prototype was not polluted
      expect(({} as Record<string, unknown>)["polluted"]).toBeUndefined();
    });

    it("blocks constructor key from being merged", () => {
      const target: Record<string, unknown> = { a: 1 };
      const source: Record<string, unknown> = {
        constructor: { polluted: true },
        b: 2,
      };

      const merged = mergeObjects(target, source);

      expect(merged).toEqual({ a: 1, b: 2 });
      expect(merged.constructor).toBe(Object);
    });

    it("blocks prototype key from being merged", () => {
      const target: Record<string, unknown> = { x: "original" };
      const source: Record<string, unknown> = {
        prototype: { evil: "payload" },
        y: "safe",
      };

      const merged = mergeObjects(target, source);

      expect(merged).toEqual({ x: "original", y: "safe" });
      expect(merged).not.toHaveProperty("prototype");
    });

    it("blocks nested __proto__ attempts", () => {
      const target: Record<string, unknown> = { nested: { safe: true } };
      const source = JSON.parse(
        '{"nested": {"__proto__": {"polluted": true}, "ok": 1}}',
      );

      const merged = mergeObjects(target, source);

      expect(merged.nested).toEqual({ safe: true, ok: 1 });
      expect(({} as Record<string, unknown>)["polluted"]).toBeUndefined();
    });
  });
});
