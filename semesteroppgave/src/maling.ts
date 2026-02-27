// ============================================================
// maling.ts — Maling / painting (Milepæl 5)
//
// Din oppgave: Traverser layout-treet og generer tegnekommandoer,
// deretter render til Canvas.
//
// Les mer: https://limpet.net/mbrubeck/2014/11/05/toy-layout-engine-7-painting.html
// ============================================================

import type { LayoutBox, DisplayCommand } from "./typer.js";

/**
 * Bygg en display list (liste med tegnekommandoer) fra layout-treet.
 *
 * Traverserer layout-treet og genererer SolidColor-kommandoer for
 * bakgrunnsfarger og border.
 */
export function buildDisplayList(_layoutRoot: LayoutBox): DisplayCommand[] {
  // TODO: Implementer display list-bygging
  // Hint:
  // 1. For hver LayoutBox: legg til bakgrunnsfarge-kommando (renderBackground)
  // 2. Legg til border-kommandoer (renderBorders)
  // 3. Rekursivt prosesser barn
  throw new Error("Ikke implementert ennå — dette er din oppgave i milepæl 5!");
}

/**
 * Tegn alle kommandoer i display-listen til et Canvas 2D-kontekst.
 *
 * Itererer gjennom kommandoene og tegner hvert rektangel med riktig farge.
 */
export function paint(
  _commands: DisplayCommand[],
  _ctx: CanvasRenderingContext2D
): void {
  // TODO: Implementer Canvas-maling
  // Hint: For hver SolidColor-kommando:
  // 1. Sett ctx.fillStyle til riktig farge
  // 2. Kall ctx.fillRect med rektangelets koordinater
  throw new Error("Ikke implementert ennå — dette er din oppgave i milepæl 5!");
}
