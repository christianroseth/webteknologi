import { describe, it, expect } from "vitest";
import { parseCss, specificity } from "../src/css-parser.js";
import type { Selector, Color, Length, Keyword } from "../src/typer.js";

describe("CSS-parser", () => {
  describe("parseCss", () => {
    it("skal parse en enkel regel med nøkkelord-verdi", () => {
      const stylesheet = parseCss("h1 { display: block; }");
      expect(stylesheet.rules).toHaveLength(1);

      const rule = stylesheet.rules[0];
      expect(rule.selectors).toHaveLength(1);
      expect(rule.selectors[0].tagName).toBe("h1");

      expect(rule.declarations).toHaveLength(1);
      expect(rule.declarations[0].name).toBe("display");
      expect(rule.declarations[0].value).toEqual({
        type: "keyword",
        value: "block",
      });
    });

    it("skal parse en farge (#rrggbb)", () => {
      const stylesheet = parseCss("p { color: #ff0000; }");
      const decl = stylesheet.rules[0].declarations[0];
      expect(decl.name).toBe("color");

      const color = decl.value as Color;
      expect(color.type).toBe("color");
      expect(color.r).toBe(255);
      expect(color.g).toBe(0);
      expect(color.b).toBe(0);
      expect(color.a).toBe(255);
    });

    it("skal parse en lengdeverdi (px)", () => {
      const stylesheet = parseCss("div { margin: 10px; }");
      const decl = stylesheet.rules[0].declarations[0];
      expect(decl.name).toBe("margin");

      const length = decl.value as Length;
      expect(length.type).toBe("length");
      expect(length.value).toBe(10);
      expect(length.unit).toBe("px");
    });

    it("skal parse en class-selektor", () => {
      const stylesheet = parseCss(".intro { color: #0000ff; }");
      const selector = stylesheet.rules[0].selectors[0];
      expect(selector.classes).toContain("intro");
    });

    it("skal parse en id-selektor", () => {
      const stylesheet = parseCss("#header { display: block; }");
      const selector = stylesheet.rules[0].selectors[0];
      expect(selector.id).toBe("header");
    });

    it("skal parse en kombinert selektor (tag.class)", () => {
      const stylesheet = parseCss("div.container { margin: 0px; }");
      const selector = stylesheet.rules[0].selectors[0];
      expect(selector.tagName).toBe("div");
      expect(selector.classes).toContain("container");
    });

    it("skal parse flere deklarasjoner", () => {
      const stylesheet = parseCss(
        "div { margin: 10px; padding: 5px; background: #cccccc; }"
      );
      const rule = stylesheet.rules[0];
      expect(rule.declarations).toHaveLength(3);
      expect(rule.declarations[0].name).toBe("margin");
      expect(rule.declarations[1].name).toBe("padding");
      expect(rule.declarations[2].name).toBe("background");
    });

    it("skal parse flere regler", () => {
      const stylesheet = parseCss(`
        h1 { display: block; }
        p { color: #333333; }
      `);
      expect(stylesheet.rules).toHaveLength(2);
      expect(stylesheet.rules[0].selectors[0].tagName).toBe("h1");
      expect(stylesheet.rules[1].selectors[0].tagName).toBe("p");
    });

    it("skal parse kommaseparerte selektorer", () => {
      const stylesheet = parseCss("h1, h2, h3 { display: block; }");
      const rule = stylesheet.rules[0];
      expect(rule.selectors).toHaveLength(3);
      expect(rule.selectors[0].tagName).toBe("h1");
      expect(rule.selectors[1].tagName).toBe("h2");
      expect(rule.selectors[2].tagName).toBe("h3");
    });
  });

  describe("specificity", () => {
    it("skal beregne spesifisitet for tag-selektor", () => {
      const sel: Selector = { tagName: "p", classes: [] };
      expect(specificity(sel)).toEqual([0, 0, 1]);
    });

    it("skal beregne spesifisitet for class-selektor", () => {
      const sel: Selector = { classes: ["intro"] };
      expect(specificity(sel)).toEqual([0, 1, 0]);
    });

    it("skal beregne spesifisitet for id-selektor", () => {
      const sel: Selector = { id: "header", classes: [] };
      expect(specificity(sel)).toEqual([1, 0, 0]);
    });

    it("skal beregne spesifisitet for kombinert selektor", () => {
      const sel: Selector = {
        tagName: "div",
        id: "main",
        classes: ["container", "wide"],
      };
      // id=1, classes=2, tag=1
      expect(specificity(sel)).toEqual([1, 2, 1]);
    });

    it("skal returnere [0,0,0] for tom selektor", () => {
      const sel: Selector = { classes: [] };
      expect(specificity(sel)).toEqual([0, 0, 0]);
    });
  });
});
