# Uke 7: JS-motoren — JIT og optimalisering

## Læringsmål

Etter denne uken skal du kunne:
- Forklare hvordan TurboFan optimaliserer "hot" kode
- Beskrive hidden classes og inline caching
- Identifisere kode som trigger deoptimalisering
- Forstå trade-off mellom oppstartstid og topp-ytelse

## Oversikt

Forrige uke så vi at Ignition tolker bytekode. Men for kode som kjøres tusenvis av ganger, er tolking for sakte. **TurboFan** kompilerer slik "hot" kode til optimalisert maskinkode — dette er JIT-kompilering (Just-In-Time).

### Optimalisering: Fra bytekode til maskinkode

```
Bytekode (Ignition) → Profileringsdata → TurboFan → Optimalisert maskinkode
```

Ignition samler **profileringsdata** mens den tolker:
- Hvilke typer ser vi for hvert argument?
- Hvilke grener tas oftest?
- Hvilke funksjoner kalles mest?

TurboFan bruker denne informasjonen til å lage **spekulativ kode** som er optimalisert for det vanlige tilfellet.

### Hidden classes

V8 gir hvert objekt en skjult klasse (hidden class) som beskriver objektets layout:

```javascript
// Begge får SAMME hidden class fordi de har identisk struktur
const a = { x: 1, y: 2 };
const b = { x: 3, y: 4 };

// Denne får ANNEN hidden class — egenskapene er i annen rekkefølge
const c = { y: 2, x: 1 };
```

Objekter med samme hidden class kan dele optimalisert kode.

### Inline caching

Når kode aksesserer `obj.x`, må V8 normalt søke gjennom objektets egenskaper. Med inline caching husker den **nøyaktig offset** fra forrige gang:

```javascript
function getX(obj) {
  return obj.x; // Første gang: dyrt oppslag. Andre gang: direkte minnelesing!
}
```

### Deoptimalisering

Når antagelsene til TurboFan brytes, må den **deoptimalisere** — falle tilbake til Ignition:

```javascript
function add(a, b) {
  return a + b;
}

// TurboFan optimaliserer for tall etter mange kall med tall
for (let i = 0; i < 10000; i++) add(i, i);

// Plutselig en streng — antagelsen brytes!
add("hei", "verden"); // → Deoptimalisering!
```

### Hva trigger deoptimalisering?

- **Typeendring** — Funksjonen ser en ny type den ikke var optimalisert for
- **Hidden class endring** — Objektets layout endres etter at egenskaper legges til/fjernes
- **Prototype-endring** — Prototypekjeden endres under kjøring
- **arguments-objektet** — Bruk av `arguments` i visse kontekster

## Lesestoff

### Obligatorisk
- [An Introduction to Speculative Optimization in V8](https://benediktmeurer.de/2017/12/13/an-introduction-to-speculative-optimization-in-v8/) — Benedikt Meurer ([arkiv](https://web.archive.org/web/2024/https://benediktmeurer.de/2017/12/13/an-introduction-to-speculative-optimization-in-v8/))
- [V8 Hidden Classes](https://v8.dev/blog/fast-properties) — V8 Blog
- [What's up with monomorphism?](https://mrale.ph/blog/2015/01/11/whats-up-with-monomorphism.html) — Vyacheslav Egorov ([arkiv](https://web.archive.org/web/2024/https://mrale.ph/blog/2015/01/11/whats-up-with-monomorphism.html))

### Anbefalt
- [TurboFan JIT Design](https://v8.dev/docs/turbofan) — V8 Docs
- [Deoptimization in V8](https://docs.google.com/presentation/d/1Z6oCocRASCfTqGq1GCo1jbULDGS-w-nzxkbVF7Up0u0/htmlpresent) — Slides ([arkiv](https://web.archive.org/web/2024/https://docs.google.com/presentation/d/1Z6oCocRASCfTqGq1GCo1jbULDGS-w-nzxkbVF7Up0u0/htmlpresent))

## Oppgaver

### Oppgave 1: Trigger deoptimalisering

Lag en funksjon som TurboFan vil optimalisere, og trigger deretter deoptimalisering:

```javascript
function multiply(a, b) {
  return a * b;
}

// Varm opp med tall
for (let i = 0; i < 100000; i++) multiply(i, 2);

// Trigger deopt
multiply("hei", 2);
```

Kjør med `node --trace-opt --trace-deopt test.js` og finn:
1. Meldingen om at `multiply` ble optimalisert
2. Meldingen om deoptimalisering — hva er grunnen?

### Oppgave 2: Hidden classes

```javascript
function Point(x, y) {
  this.x = x;
  this.y = y;
}

const p1 = new Point(1, 2);
const p2 = new Point(3, 4);
p2.z = 5; // Legger til en ny egenskap!
```

1. Har `p1` og `p2` samme hidden class etter at `z` er lagt til?
2. Hvorfor er dette et problem for V8s inline cache?
3. Hvordan kan du skrive koden slik at alle Point-objekter beholder samme hidden class?

### Oppgave 3: Monomorf vs. polymorf

```javascript
function len(collection) {
  return collection.length;
}

// Monomorf: alltid samme type
const arrays = [[1], [2, 3], [4, 5, 6]];
arrays.forEach(a => len(a));

// Polymorf: forskjellige typer
len([1, 2]);
len("hei");
len({ length: 5 });
```

Forklar hvorfor den monomorfe versjonen er raskere. Hva skjer med inline cachen i den polymorfe versjonen?

## Semesteroppgave

**Denne uken:** Begynn milepæl 4 (Layout). Les om boksmodellen i `Dimensions`-typen i `typer.ts`.

## Nøkkelbegreper

| Begrep | Forklaring |
|--------|------------|
| JIT-kompilering | Kompilering til maskinkode under kjøring basert på profileringsdata |
| Hidden class | V8s interne beskrivelse av et objekts layout i minnet |
| Inline caching | Optimalisering der egenskapsoppslag huskes for raskere tilgang |
| Deoptimalisering | Tilbakefall fra optimalisert maskinkode til bytekode-tolking |
| Monomorf | Funksjonsanrop som alltid ser samme type — best for optimalisering |
