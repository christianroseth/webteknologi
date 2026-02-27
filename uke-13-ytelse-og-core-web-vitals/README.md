# Uke 13: Ytelse og Core Web Vitals

## Læringsmål

Etter denne uken skal du kunne:
- Forklare de tre Core Web Vitals (LCP, INP, CLS) og hva de måler
- Bruke Lighthouse til å kjøre en ytelsesaudit
- Identifisere og løse vanlige ytelsesproblemer
- Forstå den kritiske renderingsbanen og hvordan den påvirkes

## Oversikt

Ytelse handler ikke bare om lastetid — det handler om brukeropplevelse. Google har definert **Core Web Vitals** som standardiserte metrikker for brukeropplevd ytelse.

### Core Web Vitals

| Metrikk | Måler | Bra | Trenger arbeid | Dårlig |
|---------|-------|-----|----------------|--------|
| **LCP** (Largest Contentful Paint) | Lastetid | < 2.5s | 2.5–4s | > 4s |
| **INP** (Interaction to Next Paint) | Responsivitet | < 200ms | 200–500ms | > 500ms |
| **CLS** (Cumulative Layout Shift) | Visuell stabilitet | < 0.1 | 0.1–0.25 | > 0.25 |

### LCP — Largest Contentful Paint

Tiden det tar før det **største synlige elementet** er ferdig rendret. Typisk:
- Stort bilde eller video
- Stor tekstblokk
- Bakgrunnsbilde

**Vanlige problemer:**
- Trege serverresponstider (TTFB)
- Render-blokkerende CSS/JS
- Treg ressurslasting (store bilder uten optimalisering)
- Klientside-rendering uten SSR

### INP — Interaction to Next Paint

Tiden fra bruker interagerer (klikk, tast, tap) til nettleseren viser resultatet.

**Vanlige problemer:**
- Lang oppgave på main thread (> 50ms)
- Tung JavaScript som blokkerer input-håndtering
- For mange event listeners
- Manglende debouncing/throttling

### CLS — Cumulative Layout Shift

Uventede layoutendringer etter at innhold er synlig.

**Vanlige problemer:**
- Bilder uten `width`/`height`-attributter
- Annonser og embeds som skyver innhold
- Dynamisk injisert innhold over synlig innhold
- Webfonter som forårsaker FOUT (Flash of Unstyled Text)

### Kritisk renderingsbane

```
HTML → DOM ─────────────┐
                         ├─→ Render tree → Layout → Paint
CSS → CSSOM ────────────┘
                ↑
JS (blokkerer) ─┘
```

For å forbedre lastetid:
1. **Minimer kritisk CSS** — Inline det som trengs for above-the-fold
2. **Defer JavaScript** — `<script defer>` blokkerer ikke parsing
3. **Preload viktige ressurser** — `<link rel="preload">`
4. **Optimaliser bilder** — Riktig format, lazy loading, responsivt

## Lesestoff

### Obligatorisk
- [Web Vitals — web.dev](https://web.dev/articles/vitals)
- [Optimize LCP](https://web.dev/articles/optimize-lcp) — web.dev
- [Optimize INP](https://web.dev/articles/optimize-inp) — web.dev
- [Optimize CLS](https://web.dev/articles/optimize-cls) — web.dev

### Anbefalt
- [Critical Rendering Path — web.dev](https://web.dev/articles/critical-rendering-path)
- [Lighthouse documentation](https://developer.chrome.com/docs/lighthouse)

## Oppgaver

### Oppgave 1: Lighthouse-audit

Kjør en Lighthouse-audit på 3 nettsider du bruker daglig:
1. Åpne DevTools → Lighthouse → Generer rapport (Mobile-modus).
2. For hver side, noter:
   - Performance-score
   - LCP, INP, CLS-verdier
   - Topp 3 forbedningsforslag
3. Sammenlign — hvilken side er raskest? Hvilke problemer er mest vanlige?

### Oppgave 2: Fiks CLS

Lag en side med bevisst dårlig CLS:
```html
<h1>Velkommen</h1>
<!-- Bilde uten dimensjoner -->
<img src="stort-bilde.jpg">
<p>Denne teksten hopper!</p>
```

1. Mål CLS med Lighthouse.
2. Fiks problemet (legg til `width`/`height`).
3. Mål CLS igjen og sammenlign.

### Oppgave 3: Kritisk CSS

Gitt en side med et eksternt stilark på 50 KB:
1. Bruk Coverage-verktøyet i DevTools (Ctrl+Shift+P → "Coverage") for å finne hvor mye CSS som faktisk brukes above the fold.
2. Ekstraher den kritiske CSS-en og inline den i `<head>`.
3. Last resten asynkront med `<link rel="preload" as="style">`.
4. Mål LCP-forbedringen med Performance-panelet.

## Nøkkelbegreper

| Begrep | Forklaring |
|--------|------------|
| LCP | Largest Contentful Paint — når største synlige element er rendret |
| INP | Interaction to Next Paint — responsivitet på brukerinteraksjon |
| CLS | Cumulative Layout Shift — mål på visuell ustabilitet |
| TTFB | Time to First Byte — tid til første byte fra serveren |
| Kritisk renderingsbane | Minimum stegene for å vise første piksler |
