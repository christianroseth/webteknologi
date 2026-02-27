import { describe, it, expect } from "vitest";
import { buildStyleTree } from "../src/stil.js";
import { createElement, createTextNode } from "../src/dom.js";
import type {
  Stylesheet,
  Rule,
  Selector,
  Declaration,
  Value,
  Keyword,
  Color,
  Length,
  StyledNode,
} from "../src/typer.js";

// --- Hjelpefunksjoner for å bygge testdata ---

function keyword(value: string): Keyword {
  return { type: "keyword", value };
}

function color(r: number, g: number, b: number): Color {
  return { type: "color", r, g, b, a: 255 };
}

function length(value: number): Length {
  return { type: "length", value, unit: "px" };
}

function rule(
  selectors: Selector[],
  declarations: Declaration[]
): Rule {
  return { selectors, declarations };
}

function tagSelector(tagName: string): Selector {
  return { tagName, classes: [] };
}

function classSelector(className: string): Selector {
  return { classes: [className] };
}

function idSelector(id: string): Selector {
  return { id, classes: [] };
}

function decl(name: string, value: Value): Declaration {
  return { name, value };
}

describe("Style tree", () => {
  describe("buildStyleTree", () => {
    it("skal matche et element basert på tagnavn", () => {
      const dom = createElement("h1", new Map(), [createTextNode("Tittel")]);
      const stylesheet: Stylesheet = {
        rules: [
          rule([tagSelector("h1")], [decl("display", keyword("block"))]),
        ],
      };

      const styled = buildStyleTree(dom, stylesheet);
      expect(styled.specifiedValues.get("display")).toEqual(
        keyword("block")
      );
    });

    it("skal matche et element basert på class", () => {
      const dom = createElement(
        "div",
        new Map([["class", "intro"]]),
        []
      );
      const stylesheet: Stylesheet = {
        rules: [
          rule(
            [classSelector("intro")],
            [decl("color", color(255, 0, 0))]
          ),
        ],
      };

      const styled = buildStyleTree(dom, stylesheet);
      expect(styled.specifiedValues.get("color")).toEqual(
        color(255, 0, 0)
      );
    });

    it("skal matche et element basert på id", () => {
      const dom = createElement(
        "div",
        new Map([["id", "header"]]),
        []
      );
      const stylesheet: Stylesheet = {
        rules: [
          rule(
            [idSelector("header")],
            [decl("margin", length(10))]
          ),
        ],
      };

      const styled = buildStyleTree(dom, stylesheet);
      expect(styled.specifiedValues.get("margin")).toEqual(length(10));
    });

    it("skal ikke matche et element som ikke passer selektoren", () => {
      const dom = createElement("p", new Map(), []);
      const stylesheet: Stylesheet = {
        rules: [
          rule([tagSelector("h1")], [decl("display", keyword("block"))]),
        ],
      };

      const styled = buildStyleTree(dom, stylesheet);
      expect(styled.specifiedValues.size).toBe(0);
    });

    it("skal håndtere flere regler som matcher", () => {
      const dom = createElement(
        "p",
        new Map([["class", "intro"]]),
        []
      );
      const stylesheet: Stylesheet = {
        rules: [
          rule([tagSelector("p")], [decl("display", keyword("block"))]),
          rule(
            [classSelector("intro")],
            [decl("color", color(0, 0, 255))]
          ),
        ],
      };

      const styled = buildStyleTree(dom, stylesheet);
      expect(styled.specifiedValues.get("display")).toEqual(
        keyword("block")
      );
      expect(styled.specifiedValues.get("color")).toEqual(
        color(0, 0, 255)
      );
    });

    it("skal la høyere spesifisitet vinne ved konflikt", () => {
      const dom = createElement(
        "p",
        new Map([["id", "main"]]),
        []
      );
      const stylesheet: Stylesheet = {
        rules: [
          // Tag-selektor: spesifisitet (0,0,1)
          rule([tagSelector("p")], [decl("color", color(255, 0, 0))]),
          // Id-selektor: spesifisitet (1,0,0) — denne skal vinne
          rule(
            [idSelector("main")],
            [decl("color", color(0, 0, 255))]
          ),
        ],
      };

      const styled = buildStyleTree(dom, stylesheet);
      expect(styled.specifiedValues.get("color")).toEqual(
        color(0, 0, 255)
      );
    });

    it("skal rekursivt bygge style tree for barn", () => {
      const dom = createElement("div", new Map(), [
        createElement("p", new Map(), [createTextNode("Hei")]),
      ]);
      const stylesheet: Stylesheet = {
        rules: [
          rule([tagSelector("div")], [decl("margin", length(10))]),
          rule([tagSelector("p")], [decl("color", color(0, 0, 0))]),
        ],
      };

      const styled = buildStyleTree(dom, stylesheet);
      expect(styled.specifiedValues.get("margin")).toEqual(length(10));
      expect(styled.children).toHaveLength(1);
      expect(styled.children[0].specifiedValues.get("color")).toEqual(
        color(0, 0, 0)
      );
    });

    it("skal gi tekstnoder tom specifiedValues", () => {
      const dom = createElement("p", new Map(), [createTextNode("Tekst")]);
      const stylesheet: Stylesheet = { rules: [] };

      const styled = buildStyleTree(dom, stylesheet);
      expect(styled.children).toHaveLength(1);
      expect(styled.children[0].specifiedValues.size).toBe(0);
    });
  });
});
