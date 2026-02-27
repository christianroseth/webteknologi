// ============================================================
// main.ts — Pipeline som kobler alle modulene sammen
// Denne filen er FERDIG LEVERT. Du skal IKKE endre den.
// ============================================================

import { parseHtml } from "./html-parser.js";
import { parseCss } from "./css-parser.js";
import { buildStyleTree } from "./stil.js";
import { buildLayoutTree } from "./layout.js";
import { buildDisplayList, paint } from "./maling.js";

// --- Testfiler (inline for enkelhets skyld, kan også hentes via fetch) ---

const testfiler: Record<string, { html: string; css: string }> = {
  enkel: {
    html: `<html><body><h1>Hei verden</h1></body></html>`,
    css: `h1 { color: #003366; }`,
  },
  boksmodell: {
    html: `<html><body><div class="boks">Innhold</div></body></html>`,
    css: `
      .boks {
        background: #336699;
        padding: 20px;
        margin: 10px;
        border-width: 2px;
        border-color: #003366;
      }
    `,
  },
  nesting: {
    html: `<html><body><div class="ytre"><div class="indre">Nestet</div></div></body></html>`,
    css: `
      .ytre {
        background: #ccddee;
        padding: 20px;
        margin: 10px;
      }
      .indre {
        background: #336699;
        padding: 10px;
        margin: 5px;
      }
    `,
  },
};

// --- Canvas-rendering ---

function renderToCanvas(htmlSource: string, cssSource: string): void {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement | null;
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const viewportWidth = canvas.width;
  const viewportHeight = canvas.height;

  // Tøm canvas
  ctx.clearRect(0, 0, viewportWidth, viewportHeight);

  try {
    // Kjør hele pipelinen
    const dom = parseHtml(htmlSource);
    const stylesheet = parseCss(cssSource);
    const styleTree = buildStyleTree(dom, stylesheet);
    const layoutTree = buildLayoutTree(styleTree, viewportWidth);
    const displayList = buildDisplayList(layoutTree);
    paint(displayList, ctx);

    console.log("Rendering fullført!");
    console.log("DOM:", dom);
    console.log("Stylesheet:", stylesheet);
    console.log("Style tree:", styleTree);
    console.log("Layout tree:", layoutTree);
    console.log("Display list:", displayList);
  } catch (error) {
    console.error("Feil under rendering:", error);
    ctx.fillStyle = "#ff0000";
    ctx.font = "16px monospace";
    ctx.fillText(
      `Feil: ${error instanceof Error ? error.message : String(error)}`,
      20,
      30
    );
  }
}

// --- Event listeners ---

document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("testfil") as HTMLSelectElement | null;
  const button = document.getElementById("render-btn");

  if (button && select) {
    button.addEventListener("click", () => {
      const valgt = testfiler[select.value];
      if (valgt) {
        renderToCanvas(valgt.html, valgt.css);
      }
    });
  }
});
