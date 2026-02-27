// ============================================================
// css-parser.ts — CSS-parser (Milepæl 2)
//
// Din oppgave: Implementer en parser som tar en CSS-string
// og returnerer et Stylesheet-objekt.
//
// Les mer: https://limpet.net/mbrubeck/2014/08/13/toy-layout-engine-3-css.html
// ============================================================

import type { Stylesheet, Selector, Specificity } from "./typer.js";

/**
 * Parse en CSS-string og returner et Stylesheet.
 *
 * Eksempel:
 *   parseCss("h1 { color: #ff0000; }") → Stylesheet med én regel
 */
export function parseCss(_source: string): Stylesheet {
  // TODO: Implementer CSS-parser
  // Hint: Bruk samme Parser-teknikk som HTML-parseren.
  // Implementer parseRule(), parseSelectors(), parseDeclaration(), parseValue()
  throw new Error("Ikke implementert ennå — dette er din oppgave i milepæl 2!");
}

/**
 * Beregn spesifisiteten til en selektor.
 *
 * Returnerer [id-count, class-count, tag-count].
 * Eksempel: "#main .intro p" → [1, 1, 1]
 */
export function specificity(_selector: Selector): Specificity {
  // TODO: Implementer spesifisitetsberegning
  throw new Error("Ikke implementert ennå — dette er din oppgave i milepæl 2!");
}
