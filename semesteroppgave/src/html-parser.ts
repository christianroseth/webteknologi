// ============================================================
// html-parser.ts — HTML-parser (Milepæl 1)
//
// Din oppgave: Implementer en recursive descent parser som tar
// en HTML-string og returnerer et DomNode-tre.
//
// Les mer: https://limpet.net/mbrubeck/2014/08/11/toy-layout-engine-2-html.html
// ============================================================

import type { DomNode } from "./typer.js";

/**
 * Parse en HTML-string og returner rot-noden i DOM-treet.
 *
 * Eksempel:
 *   parseHtml("<p>Hei</p>") → DomNode med tagName "p" og tekstbarn "Hei"
 */
export function parseHtml(_source: string): DomNode {
  // TODO: Implementer HTML-parser
  // Hint: Opprett en Parser-klasse med pos og input,
  // og implementer parseNode(), parseElement(), parseText(), parseAttributes()
  throw new Error("Ikke implementert ennå — dette er din oppgave i milepæl 1!");
}
