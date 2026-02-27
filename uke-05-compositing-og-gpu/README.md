# Uke 5: Compositing og GPU-akselerasjon

## Læringsmål

Etter denne uken skal du kunne:
- Forklare hva compositing er og hvorfor det er en separat fase
- Beskrive hva som gjør at et element får sitt eget compositor-lag
- Forstå forskjellen mellom CPU-rasterisering og GPU-akselerert compositing
- Bruke DevTools til å visualisere lag og compositing

## Oversikt

Etter paint har nettleseren tegnekommandoer for alle elementer. Men den maler ikke alt til én stor overflate — i stedet deles innholdet i **lag** (layers) som kan composites (settes sammen) av GPU-en.

### Hvorfor lag?

Tenk deg at du har en animasjon som flytter et element. Uten lag måtte nettleseren **male hele siden på nytt** for hvert bilde. Med lag maler den bare elementet som beveger seg på sitt eget lag, og GPU-en setter lagene sammen.

### Hva trigger et nytt lag?

- `transform` (3D eller `will-change: transform`)
- `opacity` (med animasjon)
- `position: fixed`
- `<video>`, `<canvas>`
- CSS-filtre
- Elementer som overlapper et allerede promotert lag

### Compositing-pipeline

```
Paint → Layer tree → Rasterize (GPU) → Composite → Skjerm
```

1. **Paint** — Generer tegnekommandoer
2. **Layer tree** — Organiser i lag
3. **Rasterize** — Konverter hvert lag til piksler (kan gjøres på GPU)
4. **Composite** — GPU setter lagene sammen i riktig rekkefølge

### `left` vs. `transform`

```css
/* Trigger: Layout → Paint → Composite */
.animasjon-left {
  animation: flytt-left 1s infinite;
}
@keyframes flytt-left {
  to { left: 100px; }
}

/* Trigger: Composite (kun!) */
.animasjon-transform {
  animation: flytt-transform 1s infinite;
}
@keyframes flytt-transform {
  to { transform: translateX(100px); }
}
```

`transform` er mye raskere fordi den kun krever compositing — ingen ny layout eller paint.

### Lag-eksplosjoner

For mange lag er også et problem — hvert lag bruker GPU-minne. "Layer explosion" skjer når nettleseren uventet oppretter hundrevis av lag, typisk på grunn av overlappende elementer.

## Lesestoff

### Obligatorisk
- [Inside look at modern web browser (Part 3)](https://developer.chrome.com/blog/inside-browser-part3) — Seksjonene om compositing
- [Stick to Compositor-Only Properties](https://web.dev/articles/stick-to-compositor-only-properties-and-manage-layer-count) — web.dev
- [GPU Accelerated Compositing in Chrome](https://www.chromium.org/developers/design-documents/gpu-accelerated-compositing-in-chrome/) — Chromium docs

### Anbefalt
- [Layers and how to force them](https://surma.dev/things/forcing-layers/) — Surma

## Oppgaver

### Oppgave 1: `left` vs. `transform` profilering

Lag to animasjoner:
1. En boks som animeres med `left` (f.eks. `left: 0` → `left: 300px`)
2. En boks som animeres med `transform: translateX()`

Åpne Performance-panelet i DevTools, ta opp begge animasjonene, og sammenlign:
- Antall Layout-hendelser
- Antall Paint-hendelser
- FPS (frames per second)

### Oppgave 2: Visualiser lag

Åpne Chrome DevTools → More tools → **Layers**.
1. Naviger til en side med animasjoner (f.eks. en nettside med parallax-scrolling).
2. Identifiser elementene som har sine egne lag.
3. Sjekk `Compositing reasons` — hvorfor fikk de egne lag?

### Oppgave 3: Layer explosion

Lag en side med 50 absolutt-posisjonerte elementer som overlapper hverandre. Gi ett av dem `transform: translateZ(0)`. Sjekk Layers-panelet — hvor mange lag opprettes? Hva skjer og hvorfor?

## Semesteroppgave

**Denne uken:** Begynn milepæl 3 (Style tree). Les igjen gjennom `StyledNode`-typen i `typer.ts`. Forstå koblingen mellom DOM-noder og CSS-regler.

## Nøkkelbegreper

| Begrep | Forklaring |
|--------|------------|
| Compositing | Å sette sammen malte lag til det endelige bildet |
| Compositor-lag | Separat tegneflate som kan manipuleres av GPU |
| GPU-akselerasjon | Bruk av grafikkprosessoren for rasterisering og compositing |
| Layer explosion | Uønsket opprettelse av for mange lag |
| `will-change` | CSS-hint til nettleseren om kommende endringer |
