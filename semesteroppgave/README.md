# Semesteroppgave: Bygg din egen browser engine

## Introduksjon

I denne oppgaven bygger du en forenklet browser engine i TypeScript. Motoren tar HTML og CSS som input og produserer et visuelt resultat på et HTML5 Canvas-element i nettleseren.

Prosjektet er inspirert av Matt Brubeck sin [Robinson browser engine](https://limpet.net/mbrubeck/2014/08/08/toy-layout-engine-1.html), opprinnelig skrevet i Rust. Vi har tilpasset det til TypeScript og delt det opp i 5 milepæler som følger kursets progresjon.

### Rendering-pipeline

```
HTML-tekst ──→ HTML-parser ──→ DOM-tre
                                  │
CSS-tekst  ──→ CSS-parser  ──→ Stylesheet
                                  │
                DOM + CSS ──→ Style tree
                                  │
                            Layout tree
                                  │
                           Display list
                                  │
                           Canvas (piksler!)
```

Du implementerer hvert steg i denne pipelinen.

## Hva er ferdig levert

Du trenger **ikke** tenke på:

- **Prosjektoppsett** — `package.json`, `tsconfig.json`, `vitest.config.ts` er klare
- **Typer** — Alle interfaces og typer er definert i `src/typer.ts`
- **DOM-hjelpefunksjoner** — `src/dom.ts` har funksjoner for å opprette DOM-noder
- **Pipeline** — `src/main.ts` kobler alle modulene sammen
- **Tester** — Ferdigskrevne tester for alle moduler i `tests/`
- **Testfiler** — HTML/CSS-eksempler i `testfiler/`
- **Canvas-visning** — `index.html` med Vite for live preview

## Kom i gang

```bash
cd semesteroppgave
npm install

# Kjør tester (feiler inntil du implementerer modulene)
npm test

# Tester i watch mode
npm run test:watch

# Start utviklingsserver for Canvas-visning
npm run dev
```

## Milepæler

### Milepæl 1: HTML-parser (innlevering etter uke 4)

**Fil:** `src/html-parser.ts`

Implementer en recursive descent parser som tar en HTML-string og returnerer et DOM-tre (`DomNode`).

**Du skal implementere:**
- `parseHtml(source: string): DomNode` — Hovedfunksjon
- En `Parser`-klasse med:
  - `pos` — nåværende posisjon i input-strengen
  - `input` — hele input-strengen
  - `nextChar()` — se neste tegn uten å konsumere
  - `consumeChar()` — les og returner neste tegn
  - `consumeWhile(test)` — les tegn så lenge betingelsen er sann
  - `consumeWhitespace()` — hopp over mellomrom
- `parseNode()` — Parse én node (element eller tekst)
- `parseElement()` — Parse et element med åpnings-/lukketag
- `parseText()` — Parse en tekstnode
- `parseAttributes()` — Parse attributter i en åpningstag

**Støttet:** Elementer med åpnings-/lukketags, attributter, tekstnoder, nøsting.
**Ikke nødvendig:** Self-closing tags, kommentarer, doctype, feilhåndtering for ugyldig HTML.

**Relevante lesestoff:**
- [Let's build a browser engine! Part 2: HTML](https://limpet.net/mbrubeck/2014/08/11/toy-layout-engine-2.html)

---

### Milepæl 2: CSS-parser (innlevering etter uke 6)

**Fil:** `src/css-parser.ts`

Implementer en parser som tar en CSS-string og returnerer et `Stylesheet`.

**Du skal implementere:**
- `parseCss(source: string): Stylesheet` — Hovedfunksjon
- `parseRule()` — Parse én CSS-regel (selektorer + deklarasjoner)
- `parseSelectors()` — Parse kommaseparerte selektorer
- `parseSimpleSelector()` — Parse tag, #id, .class
- `parseDeclaration()` — Parse ett egenskap–verdi-par
- `parseValue()` — Parse en verdi (nøkkelord, lengde, farge)
- `specificity(selector: Selector): Specificity` — Beregn spesifisitet

**Støttet:** Tag-selektorer, class-selektorer, id-selektorer, `px`-verdier, farger (`#rrggbb`), nøkkelord.
**Ikke nødvendig:** Media queries, pseudo-klasser, shorthand properties, enheter utover `px`.

**Relevante lesestoff:**
- [Let's build a browser engine! Part 3: CSS](https://limpet.net/mbrubeck/2014/08/13/toy-layout-engine-3-css.html)

---

### Milepæl 3: Style tree (innlevering etter uke 8)

**Fil:** `src/stil.ts`

Koble CSS-regler til DOM-noder og bygg et style tree.

**Du skal implementere:**
- `buildStyleTree(root: DomNode, stylesheet: Stylesheet): StyledNode` — Hovedfunksjon
- `matchRule(elem: ElementData, rule: Rule): MatchedRule | null` — Sjekk om en regel matcher et element
- `matchSelector(elem: ElementData, selector: Selector): boolean` — Sjekk om en selektor matcher
- `matchingRules(elem: ElementData, stylesheet: Stylesheet): MatchedRule[]` — Finn alle regler som matcher
- `specifiedValues(elem: ElementData, stylesheet: Stylesheet): Map<string, Value>` — Bygg style-map sortert etter spesifisitet

**Nøkkelalgoritme:** For hver DOM-node: finn matchende regler → sorter etter spesifisitet → bygg `specifiedValues` map.

**Relevante lesestoff:**
- [Let's build a browser engine! Part 4: Style](https://limpet.net/mbrubeck/2014/08/23/toy-layout-engine-4-style.html)

---

### Milepæl 4: Layout (innlevering etter uke 11)

**Fil:** `src/layout.ts`

Beregn posisjoner og dimensjoner for alle bokser (kun block layout).

**Du skal implementere:**
- `buildLayoutTree(styledNode: StyledNode, containerWidth: number): LayoutBox` — Hovedfunksjon
- `layoutBlock(box: LayoutBox, containingBlock: Dimensions): void` — Legg ut en blokk-boks
- `calculateBlockWidth(box: LayoutBox, containingBlock: Dimensions): void` — Beregn bredde
- `calculateBlockPosition(box: LayoutBox, containingBlock: Dimensions): void` — Beregn posisjon
- `layoutBlockChildren(box: LayoutBox): void` — Legg ut barne-elementer
- `calculateBlockHeight(box: LayoutBox): void` — Beregn høyde

**Nøkkelalgoritme:** Bredde beregnes top-down (fra forelder), høyde beregnes bottom-up (fra innhold).

**Relevante lesestoff:**
- [Let's build a browser engine! Part 5: Boxes](https://limpet.net/mbrubeck/2014/09/08/toy-layout-engine-5-boxes.html)
- [Let's build a browser engine! Part 6: Block layout](https://limpet.net/mbrubeck/2014/09/17/toy-layout-engine-6-block.html)

---

### Milepæl 5: Maling (innlevering etter uke 14)

**Fil:** `src/maling.ts`

Traverser layout-treet og generer tegnekommandoer, og render til Canvas.

**Du skal implementere:**
- `buildDisplayList(layoutRoot: LayoutBox): DisplayCommand[]` — Bygg liste med tegnekommandoer
- `paint(commands: DisplayCommand[], ctx: CanvasRenderingContext2D): void` — Tegn til Canvas
- `renderBackground(box: LayoutBox, list: DisplayCommand[]): void` — Legg til bakgrunnsfarge-kommando
- `renderBorders(box: LayoutBox, list: DisplayCommand[]): void` — Legg til border-kommandoer

**Rendering:** Resultatet vises i nettleseren via `index.html` (med Vite og Canvas).

**Relevante lesestoff:**
- [Let's build a browser engine! Part 7: Painting 101](https://limpet.net/mbrubeck/2014/11/05/toy-layout-engine-7-painting.html)

---

## Vurdering

| Kriterium | Andel | Beskrivelse |
|-----------|-------|-------------|
| Funksjonalitet | 50 % | Passerer testene for hver milepæl |
| Kodeforståelse | 30 % | Korte kommentarer som viser at du forstår HVORFOR, ikke bare HVA |
| Refleksjonsnotat | 20 % | 500–800 ord ved siste innlevering |

### Refleksjonsnotat

Lever sammen med milepæl 5. Reflekter over:
- Hva lærte du gjennom å bygge en browser engine?
- Hva overrasket deg?
- Hvordan endret prosjektet forståelsen din av hva nettleseren gjør?
- Hva var vanskeligst? Hva ville du gjort annerledes?

## Filstruktur

```
semesteroppgave/
├── package.json
├── tsconfig.json
├── vitest.config.ts
├── index.html                    # Canvas-visning med Vite
├── testfiler/
│   ├── enkel.html / enkel.css
│   ├── boksmodell.html / boksmodell.css
│   └── nesting.html / nesting.css
├── src/
│   ├── main.ts                   # Pipeline (ferdig)
│   ├── typer.ts                  # Alle typer (ferdig)
│   ├── dom.ts                    # DOM-hjelpefunksjoner (ferdig)
│   ├── html-parser.ts            # Milepæl 1
│   ├── css-parser.ts             # Milepæl 2
│   ├── stil.ts                   # Milepæl 3
│   ├── layout.ts                 # Milepæl 4
│   └── maling.ts                 # Milepæl 5
└── tests/
    ├── html-parser.test.ts
    ├── css-parser.test.ts
    ├── stil.test.ts
    ├── layout.test.ts
    └── maling.test.ts
```
