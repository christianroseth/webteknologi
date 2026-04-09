# Uke 4: Rendertreet, layout og paint

## Læringsmål

Etter denne uken skal du kunne:
- Forklare hvordan render-treet bygges fra DOM og CSSOM
- Beskrive layout-algoritmen for blokk-elementer (boksmodellen)
- Forstå forskjellen mellom reflow og repaint
- Identifisere kode som trigger unødvendig reflow

## Oversikt

Nå har nettleseren to trær: DOM (fra HTML) og CSSOM (fra CSS). Neste steg er å kombinere disse til et **render-tre** som representerer det som faktisk skal vises.

### Render-treet

```
DOM + CSSOM → Render tree
```

Render-treet inneholder **kun synlige elementer**:
- `<head>`, `<script>`, `<meta>` — utelatt (ikke synlige)
- Elementer med `display: none` — utelatt
- Pseudoelementer (`::before`, `::after`) — inkludert (selv om de ikke er i DOM)

### Layout (Reflow)

Layout-fasen beregner **nøyaktig posisjon og størrelse** for hvert element i render-treet. For blokk-elementer:

1. **Bredde** beregnes fra forelderen (top-down)
2. **Posisjon** beregnes fra margin, padding, border
3. **Barn** legges ut inni forelderens innholdsområde
4. **Høyde** beregnes fra innholdet (bottom-up)

### Boksmodellen

Hvert element er en boks med fire lag:

```
┌─────────── margin ──────────┐
│ ┌──────── border ─────────┐ │
│ │ ┌───── padding ───────┐ │ │
│ │ │                     │ │ │
│ │ │    content          │ │ │
│ │ │                     │ │ │
│ │ └─────────────────────┘ │ │
│ └─────────────────────────┘ │
└─────────────────────────────┘
```

### Paint

Etter layout vet nettleseren hvor alt skal plasseres. Paint-fasen konverterer dette til **tegnekommandoer**: bakgrunnsfarger, border, tekst, bilder. Disse kommandoene blir deretter rasterisert til piksler.

### Reflow vs. Repaint

| | Reflow | Repaint |
|---|--------|---------|
| **Trigger** | Endring i geometri (størrelse, posisjon) | Endring i utseende (farge, skygge) |
| **Kostnad** | Høy — hele layout må reberegnes | Lav — bare tegning |
| **Eksempel** | `width`, `height`, `margin`, `padding` | `color`, `background-color`, `visibility` |

### Layout thrashing

Å lese og skrive layout-egenskaper i samme loop tvinger nettleseren til å reberegne layout for hvert element:

```javascript
// Dårlig — layout thrashing
elements.forEach(el => {
  const h = el.offsetHeight;     // Les → trigger layout
  el.style.height = h * 2 + "px"; // Skriv → invaliderer layout
});

// Bra — batch reads og writes
const heights = elements.map(el => el.offsetHeight); // Alle les
elements.forEach((el, i) => {
  el.style.height = heights[i] * 2 + "px";           // Alle skriv
});
```

## Lesestoff

### Obligatorisk
- [How Browsers Work — Render tree, Layout, Paint](https://web.dev/articles/howbrowserswork#the_render_tree) — Tali Garsiel
- [Inside look at modern web browser (Part 3)](https://developer.chrome.com/blog/inside-browser-part3) — Mariko Kosaka
- [Let's build a browser engine! Part 4: Style](https://limpet.net/mbrubeck/2014/08/23/toy-layout-engine-4-style.html) — Matt Brubeck
- [Let's build a browser engine! Part 5: Boxes](https://limpet.net/mbrubeck/2014/09/08/toy-layout-engine-5-boxes.html) — Matt Brubeck

### Anbefalt
- [CSS Box Model — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_box_model)
- [What forces layout/reflow](https://gist.github.com/paulirish/5d52fb081b3570c81e3a) — Paul Irish ([arkiv](https://web.archive.org/web/2024/https://gist.github.com/paulirish/5d52fb081b3570c81e3a))

## Oppgaver

### Oppgave 1: Tving reflow

Åpne en nettside i Chrome DevTools. I Performance-panelet:
1. Start en opptak.
2. Endre størrelsen på nettleservinduet.
3. Stopp opptaket.
4. Finn "Layout"-hendelsene i flame chart. Hvor lang tid tok de?

### Oppgave 2: Layout thrashing

Lag en enkel HTML-side med 100 `<div>`-elementer. Skriv JavaScript som:
1. Først: Les og skriv i samme loop (layout thrashing). Mål tiden med `performance.now()`.
2. Deretter: Batch reads og writes. Mål tiden.
3. Sammenlign resultatene.

### Oppgave 3: Render-tre vs. DOM

Gitt denne HTML-en, skriv ned hvilke elementer som er med i render-treet og hvilke som er utelatt:

```html
<html>
  <head><title>Test</title></head>
  <body>
    <div style="display: none">Skjult</div>
    <p>Synlig</p>
    <span style="visibility: hidden">Usynlig men tar plass</span>
    <script>console.log("hei")</script>
  </body>
</html>
```

## Semesteroppgave

**Denne uken:** Innlevering milepæl 1 (HTML-parser). Sørg for at alle tester i `html-parser.test.ts` passerer.

## Nøkkelbegreper

| Begrep | Forklaring |
|--------|------------|
| Render tree | Tre med kun synlige elementer, kombinert fra DOM og CSSOM |
| Layout / reflow | Beregning av posisjon og størrelse for alle elementer |
| Boksmodellen | Content + padding + border + margin |
| Paint | Generering av tegnekommandoer fra layout-treet |
| Layout thrashing | Unødvendig reflow forårsaket av blandet lesing/skriving |
