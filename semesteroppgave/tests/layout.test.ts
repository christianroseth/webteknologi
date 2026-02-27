import { describe, it, expect } from "vitest";
import { buildLayoutTree } from "../src/layout.js";
import { createElement, createTextNode } from "../src/dom.js";
import type {
  StyledNode,
  Value,
  Keyword,
  Length,
  Color,
  LayoutBox,
} from "../src/typer.js";

// --- Hjelpefunksjoner ---

function keyword(value: string): Keyword {
  return { type: "keyword", value };
}

function length(value: number): Length {
  return { type: "length", value, unit: "px" };
}

function color(r: number, g: number, b: number): Color {
  return { type: "color", r, g, b, a: 255 };
}

function styledElement(
  tag: string,
  values: [string, Value][],
  children: StyledNode[] = []
): StyledNode {
  return {
    node: createElement(tag, new Map(), []),
    specifiedValues: new Map(values),
    children,
  };
}

function styledText(text: string): StyledNode {
  return {
    node: createTextNode(text),
    specifiedValues: new Map(),
    children: [],
  };
}

describe("Layout", () => {
  describe("buildLayoutTree", () => {
    it("skal opprette en layout-boks med riktig bredde fra container", () => {
      const styled = styledElement("div", [
        ["display", keyword("block")],
      ]);

      const layout = buildLayoutTree(styled, 800);
      expect(layout.dimensions.content.width).toBe(800);
    });

    it("skal beregne bredde med margin", () => {
      const styled = styledElement("div", [
        ["display", keyword("block")],
        ["margin-left", length(20)],
        ["margin-right", length(20)],
      ]);

      const layout = buildLayoutTree(styled, 800);
      // Bredde = container - margin-left - margin-right = 800 - 20 - 20 = 760
      expect(layout.dimensions.content.width).toBe(760);
      expect(layout.dimensions.margin.left).toBe(20);
      expect(layout.dimensions.margin.right).toBe(20);
    });

    it("skal beregne bredde med padding og border", () => {
      const styled = styledElement("div", [
        ["display", keyword("block")],
        ["padding-left", length(10)],
        ["padding-right", length(10)],
        ["border-left-width", length(2)],
        ["border-right-width", length(2)],
      ]);

      const layout = buildLayoutTree(styled, 800);
      // content width = 800 - 10 - 10 - 2 - 2 = 776
      expect(layout.dimensions.content.width).toBe(776);
      expect(layout.dimensions.padding.left).toBe(10);
      expect(layout.dimensions.padding.right).toBe(10);
      expect(layout.dimensions.border.left).toBe(2);
      expect(layout.dimensions.border.right).toBe(2);
    });

    it("skal bruke eksplisitt width om den er satt", () => {
      const styled = styledElement("div", [
        ["display", keyword("block")],
        ["width", length(400)],
      ]);

      const layout = buildLayoutTree(styled, 800);
      expect(layout.dimensions.content.width).toBe(400);
    });

    it("skal beregne posisjon med margin og padding", () => {
      const styled = styledElement("div", [
        ["display", keyword("block")],
        ["margin-top", length(10)],
        ["margin-left", length(20)],
        ["padding-top", length(5)],
        ["border-top-width", length(1)],
      ]);

      const layout = buildLayoutTree(styled, 800);
      // content.x = margin-left + border-left + padding-left = 20 + 0 + 0 = 20
      expect(layout.dimensions.content.x).toBe(20);
      // content.y = margin-top + border-top + padding-top = 10 + 1 + 5 = 16
      expect(layout.dimensions.content.y).toBe(16);
    });

    it("skal legge ut barn vertikalt (block layout)", () => {
      const child1 = styledElement("p", [
        ["display", keyword("block")],
        ["height", length(50)],
      ]);
      const child2 = styledElement("p", [
        ["display", keyword("block")],
        ["height", length(30)],
      ]);
      const parent = styledElement(
        "div",
        [["display", keyword("block")]],
        [child1, child2]
      );

      const layout = buildLayoutTree(parent, 800);
      expect(layout.children).toHaveLength(2);
      // Første barn starter på y=0
      expect(layout.children[0].dimensions.content.y).toBe(0);
      // Andre barn starter etter første (y = 50)
      expect(layout.children[1].dimensions.content.y).toBe(50);
    });

    it("skal beregne høyde fra barn automatisk", () => {
      const child = styledElement("p", [
        ["display", keyword("block")],
        ["height", length(100)],
      ]);
      const parent = styledElement(
        "div",
        [["display", keyword("block")]],
        [child]
      );

      const layout = buildLayoutTree(parent, 800);
      // Forelderens høyde skal være summen av barnas høyder
      expect(layout.dimensions.content.height).toBe(100);
    });

    it("skal bruke eksplisitt height om den er satt", () => {
      const styled = styledElement("div", [
        ["display", keyword("block")],
        ["height", length(200)],
      ]);

      const layout = buildLayoutTree(styled, 800);
      expect(layout.dimensions.content.height).toBe(200);
    });
  });
});
