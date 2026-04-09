# Uke 3: CSS-parsing og CSSOM

## Læringsmål

Etter denne uken skal du kunne:
- Forklare hvordan CSS-parseren bygger CSSOM-treet
- Beregne spesifisitet for ulike selektorer
- Beskrive kaskadealgoritmen og hvordan den bestemmer endelige stilverdier
- Forstå forskjellen mellom beregnede og brukte verdier

## Oversikt

Mens HTML-parseren bygger DOM, jobber CSS-parseren parallelt med å bygge **CSSOM** (CSS Object Model). CSSOM er et tre som representerer alle CSS-regler og deres tilknytning til elementer.

### CSS-parsing

```
CSS-tekst → Tokens → Regler → CSSOM
```

En CSS-regel består av:
```css
/* Selektor    Deklarasjonsblokk */
h1.title  {  color: red;  font-size: 24px;  }
```

- **Selektor** — matcher elementer i DOM
- **Deklarasjoner** — egenskap–verdi-par som skal anvendes

### Spesifisitet

Når flere regler matcher samme element, avgjør **spesifisitet** hvilken som vinner. Spesifisitet beregnes som en trippel: `(id, klasse, tag)`.

| Selektor | Spesifisitet | Forklaring |
|----------|-------------|------------|
| `p` | (0, 0, 1) | Én tag |
| `.intro` | (0, 1, 0) | Én klasse |
| `#header` | (1, 0, 0) | Én id |
| `div.intro` | (0, 1, 1) | Én klasse + én tag |
| `#header .nav li` | (1, 1, 1) | Én id + én klasse + én tag |

Sammenligning skjer fra venstre: id > klasse > tag.

### Kaskaden

Når spesifisiteten er lik, avgjøres det av rekkefølge — siste regel vinner. Den fullstendige kaskadealgoritmen tar hensyn til (i prioritert rekkefølge):

1. **`!important`-flagg** — Deklarasjoner merket med `!important` overstyrer alt annet, uavhengig av opprinnelse og spesifisitet. Brukeragent-stiler med `!important` vinner til og med over forfatter-stiler med `!important`.
2. **Opprinnelse** — Brukeragent (nettleserens standardstiler) < Bruker < Forfatter (din CSS)
3. **Kaskadelag (`@layer`)** — Moderne CSS (2022) lar deg organisere regler i navngitte lag. Regler i et lag som er definert *seinere* vinner over regler i tidligere lag, uavhengig av spesifisitet. Regler *utenfor* `@layer` vinner alltid over regler innenfor.
4. **Spesifisitet** — (id, klasse, tag)-tripelen
5. **Kilderekkefølge** — Siste regel vinner ved ellers lik prioritet

```css
/* @layer-eksempel */
@layer base, theme;

@layer base {
  h1 { color: black; }   /* Denne taper... */
}

@layer theme {
  h1 { color: blue; }    /* ...fordi theme er definert etter base */
}

/* Regel utenfor @layer vinner alltid over regler innenfor */
h1 { color: red; }       /* Denne vinner, selv om spesifisiteten er lik */
```

`@layer` er baseline-støttet i alle moderne nettlesere siden 2022 og vil du møte i produksjonskode.

### Render-blocking CSS

CSS blokkerer rendering — nettleseren viser ingenting før CSSOM er ferdig. Dette er fordi den trenger all stilinformasjon for å beregne korrekt layout. Derfor er CSS-optimalisering kritisk for ytelse.

## Lesestoff

### Obligatorisk
- [How Browsers Work — CSS parsing](https://web.dev/articles/howbrowserswork#css_parsing) — Tali Garsiel
- [Specificity — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity)
- [Let's build a browser engine! Part 3: CSS](https://limpet.net/mbrubeck/2014/08/13/toy-layout-engine-3-css.html) — Matt Brubeck

### Anbefalt
- [CSS Cascade — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Cascade)
- [CSSOM specification](https://drafts.csswg.org/cssom/) — W3C (referanse)

## Oppgaver

### Oppgave 1: Spesifisitetsberegning

Beregn spesifisiteten for følgende selektorer. Sorter dem fra lavest til høyest:

1. `div`
2. `.container`
3. `#main`
4. `div.container`
5. `#main .content p`
6. `div#main.container`

### Oppgave 2: Kaskadekamp

Gitt dette stilarket og HTML-en, hvilken farge får teksten "Hei"? Forklar steg for steg.

```html
<div id="box" class="highlight">
  <p class="text">Hei</p>
</div>
```

```css
p { color: black; }
.text { color: blue; }
.highlight p { color: green; }
#box p { color: red; }
div .text { color: purple; }
```

<details>
<summary>Fasit (prøv selv først)</summary>

| Selektor | Spesifisitet | Farge |
|----------|-------------|-------|
| `p` | (0,0,1) | black |
| `.text` | (0,1,0) | blue |
| `.highlight p` | (0,1,1) | green |
| `#box p` | (1,0,1) | **red** ← vinner |
| `div .text` | (0,1,1) | purple |

`#box p` vinner med spesifisitet (1,0,1) fordi ID-en (1) slår alle de andre.

Legg merke til at `.highlight p` og `div .text` begge har spesifisitet (0,1,1). Når spesifisiteten er *lik*, vinner siste regel i kilden — det betyr at `div .text` (purple) ville vunnet over `green` *hvis* ikke `#box p` slo dem begge. Kilderekkefølge er tie-breaker.

</details>

### Oppgave 3: CSSOM i DevTools

Åpne en valgfri nettside. I DevTools:
1. Velg et element i Elements-panelet.
2. Se på "Styles"-panelet til høyre — legg merke til at regler er listet i spesifisitetsrekkefølge.
3. Finn et element der en stil er overstreket (strøket over). Hva betyr det?
4. Sjekk "Computed"-fanen — dette er de endelige beregnede verdiene.

## Semesteroppgave

**Denne uken:** Begynn å tenke på milepæl 2 (CSS-parser). Se på `Selector`, `Rule` og `Declaration`-typene i `typer.ts`.

## Nøkkelbegreper

| Begrep | Forklaring |
|--------|------------|
| CSSOM | CSS Object Model — trerepresentasjon av CSS-regler |
| Spesifisitet | (id, klasse, tag) — system for å avgjøre CSS-regelprioritet |
| Kaskade | Algoritmen som bestemmer endelig stilverdi fra flere kilder |
| Render-blocking | CSS blokkerer visning til CSSOM er ferdig |
| Beregnet verdi | Den endelige verdien etter kaskade, arv og standardverdier |
