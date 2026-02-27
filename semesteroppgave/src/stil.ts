// ============================================================
// stil.ts — Style tree (Milepæl 3)
//
// Din oppgave: Koble CSS-regler til DOM-noder og bygg et style tree.
// For hver DOM-node, finn matchende CSS-regler, sorter etter
// spesifisitet, og bygg en StyledNode med specifiedValues.
//
// Les mer: https://limpet.net/mbrubeck/2014/08/23/toy-layout-engine-4-style.html
// ============================================================

import type { DomNode, Stylesheet, StyledNode } from "./typer.js";

/**
 * Bygg et style tree fra et DOM-tre og et stilark.
 *
 * Hver DOM-node får tilknyttede CSS-verdier basert på matchende regler.
 * Regler sorteres etter spesifisitet — høyest spesifisitet vinner.
 */
export function buildStyleTree(
  _root: DomNode,
  _stylesheet: Stylesheet
): StyledNode {
  // TODO: Implementer style tree-bygging
  // Hint: For hvert element i DOM-treet:
  // 1. Finn alle CSS-regler som matcher (matchSelector)
  // 2. Sorter etter spesifisitet
  // 3. Bygg specifiedValues map
  // 4. Rekursivt bygg barn-noder
  throw new Error("Ikke implementert ennå — dette er din oppgave i milepæl 3!");
}
