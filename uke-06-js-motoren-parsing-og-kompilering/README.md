# Uke 6: JS-motoren — parsing og kompilering

## Læringsmål

Etter denne uken skal du kunne:
- Beskrive V8s pipeline fra kildekode til kjørbar kode
- Forklare hva et AST (Abstract Syntax Tree) er og hvordan det genereres
- Forstå forskjellen mellom bytekode og maskinkode
- Bruke V8-flagg til å inspektere parsing og bytekode-generering

## Oversikt

Når nettleseren treffer en `<script>`-tag, må JavaScript-koden parses, kompileres og kjøres. Moderne JS-motorer som V8 har en sofistikert pipeline som balanserer oppstartstid mot kjøretidsytelse.

### V8s pipeline

```
Kildekode → Scanner → Parser → AST → Ignition (bytekode) → [TurboFan (maskinkode)]
```

1. **Scanner (Lexer)** — Bryter koden i tokens: nøkkelord, identifikatorer, operatorer
2. **Parser** — Bygger et AST fra tokens
3. **Ignition** — V8s interpreter, konverterer AST til bytekode og kjører det
4. **TurboFan** — JIT-kompilator som kompilerer "hot" bytekode til optimalisert maskinkode

### Parsing: Eager vs. Lazy

V8 parser ikke all kode umiddelbart. Det bruker **lazy parsing** for funksjoner som ikke kalles med en gang:

```javascript
// Eager-parsed: kjøres umiddelbart
const x = 2 + 3;

// Lazy-parsed: bare syntakssjekk, full parsing utsettes
function sjeldentBrukt() {
  // Tusenvis av linjer...
  // Parses først når funksjonen kalles
}
```

### AST (Abstract Syntax Tree)

```javascript
const sum = a + b;
```

Blir til et tre:

```
VariableDeclaration (const)
└── VariableDeclarator
    ├── Identifier: "sum"
    └── BinaryExpression (+)
        ├── Identifier: "a"
        └── Identifier: "b"
```

### Bytekode

Ignition kompilerer AST til bytekode — et kompakt mellomformat:

```
LdaNamedProperty a0, [0]  // Last verdi av 'a'
Add a1, [1]                // Legg til 'b'
Star r0                    // Lagre resultatet
```

Bytekode er mer kompakt enn AST (sparer minne) og raskere å tolke enn rå kildekode.

## Lesestoff

### Obligatorisk
- [V8's JavaScript parsing](https://v8.dev/blog/scanner) — V8 Blog
- [Blazingly fast parsing, part 1](https://v8.dev/blog/preparser) — V8 Blog (lazy parsing)
- [Understanding V8's Bytecode](https://medium.com/dailyjs/understanding-v8s-bytecode-317d46c94775) — Franziska Hinkelmann

### Anbefalt
- [AST Explorer](https://astexplorer.net/) — Interaktiv AST-visualisering
- [V8 Blog — Launching Ignition and TurboFan](https://v8.dev/blog/launching-ignition-and-turbofan)

## Oppgaver

### Oppgave 1: Utforsk AST

Gå til [astexplorer.net](https://astexplorer.net/) og skriv inn:

```javascript
function greet(name) {
  return "Hei, " + name + "!";
}
```

1. Hvilke node-typer ser du?
2. Hva skjer med AST-et om du endrer `+` til template literals?
3. Sammenlign AST for en `for`-løkke og en `while`-løkke.

### Oppgave 2: V8-flagg

Lagre denne koden som `test.js`:

```javascript
function add(a, b) {
  return a + b;
}

for (let i = 0; i < 1000; i++) {
  add(i, i + 1);
}
```

Kjør med V8-flagg:
```bash
node --print-bytecode --print-bytecode-filter=add test.js
```

> **Merk:** `--print-ast` har vært ustabil i nyere Node.js-versjoner og kan gi lite output eller feile. For å se AST interaktivt, bruk [astexplorer.net](https://astexplorer.net/) i stedet — det er mer pålitelig og lettere å lese.

Studer output:
1. Identifiser bytekode-instruksjonene for `a + b` i `--print-bytecode`-outputen.
2. Finn register-instruksjonene som laster `a` og `b` og legger dem sammen.

### Oppgave 3: Lazy parsing

Lag en fil med to funksjoner — én som kalles umiddelbart og én som aldri kalles. Bruk `--trace-opt` for å se hvilke funksjoner V8 faktisk kompilerer og optimaliserer:

```bash
node --trace-opt test.js 2>&1 | grep -i "compil"
```

> **Merk:** `--trace-parse` er ikke et gyldig V8-flagg og vil ikke gi nyttig output. `--trace-opt` viser hvilke funksjoner TurboFan kompilerer — en god indikator på hvilke funksjoner V8 har valgt å fullparse og varme opp.

## Semesteroppgave

**Denne uken:** Innlevering milepæl 2 (CSS-parser). Sørg for at alle tester i `css-parser.test.ts` passerer.

## Nøkkelbegreper

| Begrep | Forklaring |
|--------|------------|
| AST | Abstract Syntax Tree — trerepresentasjon av parsert kode |
| Bytekode | Kompakt mellomformat mellom kildekode og maskinkode |
| Ignition | V8s interpreter som kjører bytekode |
| Lazy parsing | Utsatt full parsing av funksjoner som ikke brukes umiddelbart |
| TurboFan | V8s optimaliserende JIT-kompilator |
