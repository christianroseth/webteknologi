# Uke 15: Fra URL til piksler — den komplette reisen

## Læringsmål

Etter denne uken skal du kunne:
- Beskrive den komplette reisen fra URL til piksler i ett sammenhengende narrativ
- Forklare hvordan de ulike fasene overlapper og påvirker hverandre
- Identifisere optimaliseringer nettleseren gjør i hver fase
- Lage et detaljert flytdiagram over hele prosessen

## Oversikt

Denne uken samler vi alt. Gjennom 14 uker har vi zoomet inn på hvert steg. Nå zoomer vi ut og ser helheten — fra du trykker Enter til pikslene lyser opp.

### Den komplette reisen

#### 1. Navigasjon (uke 1)
```
Bruker skriver URL → Nettleseren sjekker: er det et søk eller en URL?
→ UI-tråden sender URL til nettverkstråden
```

#### 2. DNS-oppslag (uke 9)
```
Sjekk DNS-cache → OS-cache → Recursive resolver → Root → TLD → Authoritative
→ IP-adresse funnet
```

**Optimalisering:** DNS prefetch — `<link rel="dns-prefetch" href="//cdn.example.com">`

#### 3. TCP + TLS (uke 9)
```
TCP three-way handshake (1 RTT) → TLS 1.3 handshake (1 RTT)
→ Sikker tilkobling opprettet
```

**Optimalisering:** Preconnect — `<link rel="preconnect" href="https://cdn.example.com">`

#### 4. HTTP-forespørsel (uke 10)
```
GET /index.html HTTP/2 → Server prosesserer → 200 OK + HTML-bytes
```

**Optimalisering:** HTTP/2 multiplexing, caching, compression

#### 5. HTML-parsing (uke 2)
```
Bytes → Tegn → Tokens → DOM-noder → DOM-tre
```

Parser kjører inkrementelt — den venter ikke på at hele dokumentet er lastet.

**Samtidig:** Preload scanner finner `<link>`, `<script>`, `<img>` og starter nedlasting parallelt.

#### 6. CSS-parsing (uke 3)
```
CSS-bytes → Tokens → CSSOM-tre
```

**Viktig:** CSS blokkerer rendering — ingen piksler vises før CSSOM er ferdig.

#### 7. JavaScript-kjøring (uke 6-8)
```
<script> → Parser stopper → Last JS → Parse → Compile → Kjør → Parser fortsetter
```

**Optimalisering:** `defer` (kjør etter parsing), `async` (kjør når lastet), `type="module"`

#### 8. Render tree (uke 4)
```
DOM + CSSOM → Render tree (kun synlige elementer)
```

#### 9. Layout (uke 4)
```
Render tree → Beregn posisjon og størrelse for alle elementer
```

#### 10. Paint (uke 4)
```
Layout tree → Tegnekommandoer → Rasterisering
```

#### 11. Compositing (uke 5)
```
Lag (layers) → GPU rasterisering → Composite → Piksler på skjerm!
```

### Flytdiagram

```
┌─────────────────────────────────────────────────────────┐
│                     NETTVERK                             │
│  DNS → TCP → TLS → HTTP Request → Response              │
└───────────────────────┬─────────────────────────────────┘
                        │ HTML bytes
                        ▼
┌─────────────────────────────────────────────────────────┐
│                     PARSING                              │
│  HTML Parser ──→ DOM                                     │
│       │                                                  │
│       ├── Preload scanner → parallell nedlasting         │
│       │                                                  │
│  CSS Parser ──→ CSSOM                                    │
│       │                                                  │
│  <script> ──→ JS Engine → (kan endre DOM!)               │
└───────────────────────┬─────────────────────────────────┘
                        │ DOM + CSSOM
                        ▼
┌─────────────────────────────────────────────────────────┐
│                    RENDERING                             │
│  Style ──→ Layout ──→ Paint ──→ Composite               │
│                                     │                    │
│                                     ▼                    │
│                               Piksler! 🖥️               │
└─────────────────────────────────────────────────────────┘
```

### Optimaliseringer nettleseren gjør automatisk

| Optimalisering | Fase | Beskrivelse |
|----------------|------|-------------|
| DNS cache | Nettverk | Husker oppslag |
| Preload scanner | Parsing | Starter nedlasting tidlig |
| Speculative parsing | Parsing | Parser videre mens JS kjøres |
| Incremental layout | Rendering | Beregner kun endrede deler |
| Layer promotion | Compositing | Isolerer elementer for effektiv animasjon |
| Tile-basert rasterisering | Paint | Maler bare synlige deler |

## Oppgaver

### Oppgave 1: Flytdiagram

Lag et detaljert flytdiagram (fysisk tegning, Excalidraw, Mermaid, eller lignende) som viser hele reisen fra URL til piksler. Inkluder:
- Alle hovedfaser (nettverk, parsing, rendering)
- Optimaliseringer (preload, defer, caching)
- Punkter der JavaScript kan påvirke prosessen
- Punkter der CSS blokkerer

### Oppgave 2: Essay — den komplette reisen

Skriv et essay (800–1200 ord) der du forklarer reisen fra URL til piksler. Bruk det du har lært gjennom hele semesteret. Sammenlign med den mentale modellen du skrev i uke 1 — hva har endret seg?

### Oppgave 3: Tidsmåling

Åpne Chrome DevTools → Performance. Last inn en side og identifiser i opptaket:
1. Nettverksfasen (DNS, TCP, TLS, HTTP)
2. Parsing (HTML, CSS)
3. JavaScript-evaluering
4. Layout og Paint
5. Compositing

Mål tiden for hver fase. Hvilken fase tar lengst? Hva ville du optimalisert?

## Nøkkelbegreper

| Begrep | Forklaring |
|--------|------------|
| Preload scanner | Nettleserens tidlige oppdagelse av ressurser under HTML-parsing |
| Speculative parsing | Parsing som fortsetter parallelt med JS-kjøring |
| Render-blocking | Ressurser som forhindrer visning (CSS, synkron JS) |
| Kritisk bane | Minimumskjeden av steg for å vise første piksler |
| Incremental layout | Layout som bare oppdaterer endrede deler av treet |
