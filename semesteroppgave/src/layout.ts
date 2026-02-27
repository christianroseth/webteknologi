// ============================================================
// layout.ts — Layout / boksmodell (Milepæl 4)
//
// Din oppgave: Beregn posisjoner og dimensjoner for alle bokser.
// Kun block layout — inline layout er utenfor scope.
//
// Les mer:
// - https://limpet.net/mbrubeck/2014/09/08/toy-layout-engine-5-boxes.html
// - https://limpet.net/mbrubeck/2014/09/17/toy-layout-engine-6-block.html
// ============================================================

import type { StyledNode, LayoutBox } from "./typer.js";

/**
 * Bygg et layout-tre fra et style tree.
 *
 * Beregner posisjon og størrelse for hver boks basert på
 * CSS-egenskaper (width, height, margin, padding, border) og
 * forelderens dimensjoner.
 *
 * @param styledNode - Roten av style-treet
 * @param containerWidth - Bredden på viewport/forelder-containeren
 */
export function buildLayoutTree(
  _styledNode: StyledNode,
  _containerWidth: number
): LayoutBox {
  // TODO: Implementer layout-algoritmen
  // Hint:
  // 1. Opprett en LayoutBox for noden
  // 2. Beregn bredde fra forelderens bredde
  // 3. Beregn posisjon (x, y) fra margin, padding, border
  // 4. Legg ut barn-elementer
  // 5. Beregn høyde fra innholdet
  throw new Error("Ikke implementert ennå — dette er din oppgave i milepæl 4!");
}
