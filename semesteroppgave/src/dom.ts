// ============================================================
// dom.ts — Hjelpefunksjoner for å opprette DOM-noder
// Denne filen er FERDIG LEVERT. Du skal IKKE endre den.
// ============================================================

import type { DomNode, ElementData } from "./typer.js";

/**
 * Opprett en tekstnode.
 *
 * En tekstnode har ingen barn — den representerer ren tekst i dokumentet.
 */
export function createTextNode(text: string): DomNode {
  return {
    children: [],
    nodeType: text,
  };
}

/**
 * Opprett en element-node med tagnavn, attributter og barn.
 *
 * Eksempel:
 *   createElement("div", new Map([["id", "main"]]), [createTextNode("Hei")])
 *   → { children: [...], nodeType: { tagName: "div", attributes: Map { "id" => "main" } } }
 */
export function createElement(
  tag: string,
  attrs: Map<string, string>,
  children: DomNode[]
): DomNode {
  const elementData: ElementData = {
    tagName: tag,
    attributes: attrs,
  };
  return {
    children,
    nodeType: elementData,
  };
}
