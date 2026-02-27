# Uke 2: HTML-parsing og DOM

## Læringsmål

Etter denne uken skal du kunne:
- Forklare hvordan en HTML-parser tokeniserer og bygger et DOM-tre
- Beskrive forskjellen mellom DOM-treet som datastruktur og HTML som tekst
- Bruke DevTools til å inspektere og manipulere DOM
- Forstå hva en recursive descent parser er

## Oversikt

Nettleseren mottar HTML som en strøm av bytes. Disse må omgjøres til en strukturert trestruktur — DOM-treet — som resten av nettleseren kan jobbe med. Denne prosessen kalles **parsing**, og den er mer kompleks enn du kanskje tror.

### Stegene i HTML-parsing

```
Bytes → Tegn (Character encoding) → Tokens → Noder → DOM-tre
```

1. **Byte til tegn** — Nettleseren leser content-encoding headeren (f.eks. UTF-8) og dekoder bytestrømmen til tegn.
2. **Tegn til tokens** — Tokenizeren bryter teksten ned i meningsfulle enheter: start-tags, slutt-tags, attributter, tekstinnhold.
3. **Tokens til noder** — Hvert token blir en DOM-node med riktig type (Element, Text, Comment, etc.).
4. **Noder til tre** — Nodene organiseres i en trestruktur basert på åpnings- og lukkingstags.

### DOM-treet

```html
<html>
  <body>
    <h1 class="title">Hei</h1>
    <p>Verden</p>
  </body>
</html>
```

Blir til:

```
Document
└── html
    └── body
        ├── h1 (class="title")
        │   └── "Hei"
        └── p
            └── "Verden"
```

### Feiltoleranse

HTML-parseren er ekstremt feiltolerant. Den håndterer manglende lukkingstags, feil nøsting, og uventede elementer. Dette er en bevisst designbeslutning — weben skal fungere selv med dårlig markup.

I semesteroppgaven bygger vi en **forenklet** parser som antar korrekt HTML. Virkelige nettlesere har tusenvis av linjer dedikert til feilhåndtering.

## Lesestoff

### Obligatorisk
- [How Browsers Work — Parsing](https://web.dev/articles/howbrowserswork#parsing_general) — Tali Garsiel
- [DOM — MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)
- [Let's build a browser engine! Part 2: HTML](https://limpet.net/mbrubeck/2014/08/11/toy-layout-engine-2-html.html) — Matt Brubeck

### Anbefalt
- [HTML parsing specification](https://html.spec.whatwg.org/multipage/parsing.html) — WHATWG (referanse, ikke les alt)

## Oppgaver

### Oppgave 1: DOM-utforsking

Åpne en valgfri nettside i Chrome. I DevTools (Elements-panelet):
1. Finn en `<div>` med barn og skriv ned trestrukturen (3–4 nivåer).
2. Bruk Console til å kjøre `document.querySelectorAll("*").length` — hvor mange noder har siden?
3. Modifiser en nodes `textContent` fra Console og observer endringen.

### Oppgave 2: Parse for hånd

Gitt følgende HTML, tegn DOM-treet for hånd (som trestruktur):

```html
<div id="container">
  <h1>Tittel</h1>
  <ul>
    <li class="active">Punkt 1</li>
    <li>Punkt 2</li>
  </ul>
</div>
```

### Oppgave 3: Feiltoleranse

Test nettleserens feiltoleranse. Åpne DevTools og lim inn denne HTML-en i en tom side. Se på Elements-panelet — hva har nettleseren gjort med den?

```html
<p>Første
<p>Andre
<b>Uthevet <i>og kursiv</b> bare kursiv</i>
```

## Semesteroppgave

**Denne uken:** Begynn å tenke på milepæl 1 (HTML-parser). Les gjennom `typer.ts` og `dom.ts` i starter-koden for å forstå datastrukturene du skal produsere.

## Nøkkelbegreper

| Begrep | Forklaring |
|--------|------------|
| Tokenisering | Å bryte tekst ned i tokens (start-tag, slutt-tag, tekst, etc.) |
| Recursive descent | Parsingteknikk der hver grammatikkregel er en funksjon |
| DOM | Document Object Model — trerepresentasjon av dokumentet |
| Node | Enkelt punkt i DOM-treet (element, tekst, kommentar, etc.) |
| Feiltoleranse | HTMLs evne til å håndtere ugyldig markup uten å krasje |
