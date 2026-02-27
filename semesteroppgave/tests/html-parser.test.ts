import { describe, it, expect } from "vitest";
import { parseHtml } from "../src/html-parser.js";
import type { DomNode, ElementData } from "../src/typer.js";

// Hjelpefunksjon for å sjekke om en node er et element
function isElement(nodeType: DomNode["nodeType"]): nodeType is ElementData {
  return typeof nodeType !== "string";
}

describe("HTML-parser", () => {
  describe("parseHtml", () => {
    it("skal parse en enkel tekstnode", () => {
      const result = parseHtml("<p>Hei</p>");
      expect(isElement(result.nodeType)).toBe(true);
      if (isElement(result.nodeType)) {
        expect(result.nodeType.tagName).toBe("p");
      }
      expect(result.children).toHaveLength(1);
      expect(result.children[0].nodeType).toBe("Hei");
    });

    it("skal parse et element uten barn", () => {
      const result = parseHtml("<div></div>");
      expect(isElement(result.nodeType)).toBe(true);
      if (isElement(result.nodeType)) {
        expect(result.nodeType.tagName).toBe("div");
      }
      expect(result.children).toHaveLength(0);
    });

    it("skal parse attributter", () => {
      const result = parseHtml('<div id="main" class="container"></div>');
      expect(isElement(result.nodeType)).toBe(true);
      if (isElement(result.nodeType)) {
        expect(result.nodeType.tagName).toBe("div");
        expect(result.nodeType.attributes.get("id")).toBe("main");
        expect(result.nodeType.attributes.get("class")).toBe("container");
      }
    });

    it("skal parse nøstede elementer", () => {
      const result = parseHtml("<div><p>Hei</p></div>");
      expect(isElement(result.nodeType)).toBe(true);
      if (isElement(result.nodeType)) {
        expect(result.nodeType.tagName).toBe("div");
      }
      expect(result.children).toHaveLength(1);

      const p = result.children[0];
      expect(isElement(p.nodeType)).toBe(true);
      if (isElement(p.nodeType)) {
        expect(p.nodeType.tagName).toBe("p");
      }
      expect(p.children).toHaveLength(1);
      expect(p.children[0].nodeType).toBe("Hei");
    });

    it("skal parse flere søsken-elementer", () => {
      const result = parseHtml("<div><h1>Tittel</h1><p>Tekst</p></div>");
      expect(result.children).toHaveLength(2);

      const h1 = result.children[0];
      expect(isElement(h1.nodeType)).toBe(true);
      if (isElement(h1.nodeType)) {
        expect(h1.nodeType.tagName).toBe("h1");
      }

      const p = result.children[1];
      expect(isElement(p.nodeType)).toBe(true);
      if (isElement(p.nodeType)) {
        expect(p.nodeType.tagName).toBe("p");
      }
    });

    it("skal parse dyp nøsting", () => {
      const result = parseHtml(
        "<html><body><div><p>Dypt</p></div></body></html>"
      );
      expect(isElement(result.nodeType)).toBe(true);
      if (isElement(result.nodeType)) {
        expect(result.nodeType.tagName).toBe("html");
      }

      // html > body > div > p > "Dypt"
      const body = result.children[0];
      const div = body.children[0];
      const p = div.children[0];
      expect(p.children[0].nodeType).toBe("Dypt");
    });

    it("skal parse attributter med bindestreker", () => {
      const result = parseHtml('<div data-value="42"></div>');
      expect(isElement(result.nodeType)).toBe(true);
      if (isElement(result.nodeType)) {
        expect(result.nodeType.attributes.get("data-value")).toBe("42");
      }
    });

    it("skal håndtere mellomrom mellom elementer", () => {
      const result = parseHtml("<div>  <p>Hei</p>  </div>");
      // Parseren kan velge å inkludere eller ignorere whitespace-noder.
      // Vi sjekker bare at p-elementet finnes med riktig innhold.
      const pNode = result.children.find(
        (child) => isElement(child.nodeType) && child.nodeType.tagName === "p"
      );
      expect(pNode).toBeDefined();
      if (pNode) {
        expect(pNode.children[0].nodeType).toBe("Hei");
      }
    });
  });
});
