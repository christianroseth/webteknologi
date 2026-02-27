# Uke 16: Eksamensforberedelse og eksamen

## Oversikt

Denne uken er dedikert til repetisjon og eksamen. Ingen nytt stoff introduseres.

## Eksamensinformasjon

Se [EKSAMEN.md](../EKSAMEN.md) for fullstendig beskrivelse av eksamensformat.

**Struktur:**
- **Del A (30%):** 10 konseptuelle kortsvarsspørsmål
- **Del B (30%):** Velg 1 av 3 essays (800–1200 ord)
- **Del C (40%):** Praktisk feilsøking og optimalisering

## Repetisjonsguide

### Rendering-pipeline (uke 2–5)

Sørg for at du kan forklare:
- [ ] Hvordan HTML-parseren bygger DOM-treet
- [ ] Hva CSSOM er og hvorfor CSS blokkerer rendering
- [ ] Forskjellen mellom DOM, render-tre og layout-tre
- [ ] Boksmodellen: content, padding, border, margin
- [ ] Hva layout (reflow) beregner og hva som trigger det
- [ ] Forskjellen mellom paint og compositing
- [ ] Når og hvorfor nettleseren promoterer elementer til egne lag
- [ ] Hvorfor `transform` er raskere enn `left` for animasjoner

### JavaScript-motoren (uke 6–8)

Sørg for at du kan forklare:
- [ ] V8s pipeline: kildekode → scanner → parser → AST → Ignition → TurboFan
- [ ] Forskjellen mellom eager og lazy parsing
- [ ] Hva bytekode er og hvorfor V8 bruker det
- [ ] Hva JIT-kompilering er og når det skjer
- [ ] Hidden classes og inline caching
- [ ] Hva som trigger deoptimalisering
- [ ] Event loopen: call stack, task queue, microtask queue
- [ ] Forskjellen mellom makro- og mikrooppgaver

### Nettverk (uke 9–10)

Sørg for at du kan forklare:
- [ ] DNS-oppslag fra start til slutt
- [ ] TCP three-way handshake
- [ ] TLS 1.3 handshake og hva det oppnår
- [ ] Forskjellen mellom HTTP/1.1, HTTP/2 og HTTP/3
- [ ] Head-of-line blocking på applikasjons- og transportlaget
- [ ] Multiplexing og hvorfor det er viktig

### Web APIer og byggverktøy (uke 11–12)

Sørg for at du kan forklare:
- [ ] Forskjellen mellom Web Workers og Service Workers
- [ ] Service Worker-livssyklusen
- [ ] Cachestrategier (cache first, network first, stale-while-revalidate)
- [ ] CommonJS vs. ES Modules
- [ ] Hva en bundler gjør (dependency graph, tree shaking, code splitting)

### Ytelse og sikkerhet (uke 13–14)

Sørg for at du kan forklare:
- [ ] Core Web Vitals: LCP, INP, CLS
- [ ] Kritisk renderingsbane og hvordan den optimaliseres
- [ ] Same-Origin Policy og dens formål
- [ ] XSS — typer, angrep og forsvar
- [ ] CSRF — angrep og forsvar
- [ ] CSP og CORS — hva de gjør og hvordan de konfigureres

### Helhetlig forståelse (uke 15)

- [ ] Kan du forklare reisen fra URL til piksler som ett sammenhengende narrativ?
- [ ] Vet du hvilke faser som overlapper?
- [ ] Kan du identifisere optimaliseringer i hver fase?

## Tips til eksamen

### Del A — Kortsvar
- Svar presist (3–8 setninger)
- Forklar **hvorfor**, ikke bare **hva**
- Bruk korrekt terminologi
- Gi eksempler der det er naturlig

### Del B — Essay
- Velg det temaet du er sterkest på
- Lag en disposisjon før du skriver
- Fokuser på dybde fremfor bredde
- Vis at du forstår sammenhengene

### Del C — Praktisk
- Les gjennom all koden før du begynner å svare
- Kategoriser problemene (ytelse, sikkerhet, etc.)
- Forklar alltid **hvorfor** noe er et problem (hva skjer internt)
- Kodeeksempler i løsningsforslag behøver ikke være perfekte — fokuser på korrekt prinsipp

## Øvingsoppgaver

### Rask-quiz

1. Hva er forskjellen mellom `display: none` og `visibility: hidden` i kontekst av render-treet?
2. Hvorfor er `setTimeout(fn, 0)` ikke det samme som umiddelbar kjøring?
3. Hva skjer hvis en HTTP/2-tilkobling mister én TCP-pakke?
4. Gi et eksempel på kode som er monomorf vs. polymorf.
5. Hva er forskjellen mellom preload og prefetch?
