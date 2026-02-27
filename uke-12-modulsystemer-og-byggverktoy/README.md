# Uke 12: Modulsystemer og byggverktøy

## Læringsmål

Etter denne uken skal du kunne:
- Forklare forskjellen mellom CommonJS, AMD og ES Modules
- Beskrive hva en bundler gjør og hvorfor det er nødvendig
- Forstå tree shaking, code splitting og lazy loading
- Bygge en forenklet mini-bundler

## Oversikt

Moderne webapper består av hundrevis av filer og avhengigheter. Nettleseren trenger et effektivt system for å laste alt dette. Modulsystemer definerer hvordan kode deles i gjenbrukbare enheter, og byggverktøy (bundlere) pakker dem for produksjon.

### Historien om JavaScript-moduler

```
Globale variabler (2005) → IIFE (2008) → CommonJS (2009) → AMD (2011)
                                                                ↓
                                         ES Modules (2015) ← UMD (2012)
```

### CommonJS (Node.js)

```javascript
// math.js
const add = (a, b) => a + b;
module.exports = { add };

// app.js
const { add } = require("./math");
console.log(add(1, 2));
```

- **Synkron** `require()` — fungerer for servere, ikke for nettlesere
- Kjøretids-evaluering — modulen kjøres når `require()` kalles

### ES Modules (standarden)

```javascript
// math.js
export const add = (a, b) => a + b;

// app.js
import { add } from "./math.js";
console.log(add(1, 2));
```

- **Statisk** — importstrukturen er kjent før kjøring
- Muliggjør **tree shaking** — fjern ubrukt kode
- Nativt støttet i nettlesere med `<script type="module">`

### Hva gjør en bundler?

```
Mange filer → Dependency graph → Bundle(s) → Minifisering → Output
```

1. **Dependency graph** — Finn alle `import`/`require` og bygg avhengighetstre
2. **Bundling** — Kombiner moduler til færre filer
3. **Tree shaking** — Fjern kode som aldri importeres
4. **Code splitting** — Del opp i chunks som kan lastes separat
5. **Minifisering** — Fjern whitespace, forkort variabelnavn
6. **Transformasjon** — TypeScript → JS, JSX → JS, etc.

### Moderne byggverktøy

| Verktøy | Kjerne-ide |
|---------|-----------|
| **Webpack** | Konfigurasjonsdrevet, svært fleksibelt, modent økosystem |
| **Vite** | ESM-native dev server, Rollup for produksjon, rask HMR |
| **esbuild** | Skrevet i Go, ekstremt rask bundling og transpilering |
| **Rollup** | Fokusert på ES Modules og tree shaking, brukes av Vite |
| **Turbopack** | Rust-basert, inkrementell bundling (Vercel/Next.js) |

### Hvorfor Vite er rask i utvikling

```
Tradisjonell bundler:  Alle filer → Bundle → Server → Nettleser
Vite:                  Server → Nettleser ber om fil → Transformer den ene filen
```

Vite bruker nettleserens native ESM-støtte i utvikling — ingen bundling nødvendig!

## Lesestoff

### Obligatorisk
- [JavaScript modules — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [ES Modules: A cartoon deep-dive](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/) — Lin Clark
- [Why Vite](https://vite.dev/guide/why) — Vite docs

### Anbefalt
- [Webpack concepts](https://webpack.js.org/concepts/) — Webpack docs
- [Tree Shaking — web.dev](https://web.dev/articles/reduce-javascript-payloads-with-tree-shaking)

## Oppgaver

### Oppgave 1: Bygg en mini-bundler

Lag en forenklet bundler i Node.js som:
1. Leser en inngangsfil (entry point)
2. Finner alle `import`-statements med regex
3. Bygger en avhengighetsgraf (dependency graph)
4. Kombinerer alle filer til én output-fil

Du trenger ikke håndtere `export` — bare konkatener filene i riktig rekkefølge.

### Oppgave 2: Tree shaking i praksis

Lag en modul med 5 eksporterte funksjoner. Importer bare 2 av dem i en annen fil.

1. Bygg med Vite/Rollup (`npx vite build`) og inspiser output-filen.
2. Er de ubrukte funksjonene borte?
3. Legg til en sideeffekt i en ubrukt funksjon (f.eks. `console.log()`). Hva skjer nå?

### Oppgave 3: Sammenlign ESM og bundlet

Lag en liten app med 10 moduler. Last den i nettleseren på to måter:
1. Med native ES Modules (`<script type="module">`). Se Network-panelet — hvor mange forespørsler?
2. Bundlet med Vite (`npx vite build`). Hvor mange forespørsler nå?
3. Mål lastetiden. Når er native ESM raskere? Når er bundling raskere?

## Semesteroppgave

**Denne uken:** Begynn milepæl 5 (Maling). Fokuser på `DisplayCommand` og `SolidColor` i `typer.ts`.

## Nøkkelbegreper

| Begrep | Forklaring |
|--------|------------|
| ES Modules | Standardisert modulsystem med `import`/`export` |
| CommonJS | Node.js-modulsystem med `require()`/`module.exports` |
| Tree shaking | Fjerning av ubrukt eksportert kode ved bundling |
| Code splitting | Oppdeling av bundle i mindre chunks for lazy loading |
| HMR | Hot Module Replacement — oppdatering uten full reload |
