# Skriftlig eksamen — Webteknologi: Under panseret

**Varighet:** 4 timer
**Hjelpemidler:** Ingen

---

## Struktur

| Del | Andel | Format |
|-----|-------|--------|
| Del A — Konsepter | 30 % | 10 kortsvarsspørsmål (3–8 setninger per svar) |
| Del B — Dypdykk | 30 % | Velg 1 av 3 essay (800–1200 ord) |
| Del C — Praktisk | 40 % | Feilsøking og optimalisering av en webapp |

---

## Del A — Konseptuelle spørsmål (30 %)

Svar kort og presist (3–8 setninger). Fokuser på **hvorfor**, ikke bare **hva**.

### Eksempelspørsmål

1. **Forklar forskjellen mellom DOM-treet og render-treet.** Hvorfor inneholder ikke render-treet alle DOM-noder?

2. **Hva er spesifisitet i CSS, og hvordan beregnes den?** Gi et eksempel der spesifisitet avgjør hvilken stil som vinner.

3. **Beskriv hva som skjer under en "reflow" (layout) i nettleseren.** Hvilke typer endringer trigger en reflow, og hvorfor er det kostbart?

4. **Forklar forskjellen mellom rasterisering og compositing.** Hvorfor bruker moderne nettlesere GPU-akselerert compositing?

5. **Hva er forskjellen mellom V8s Ignition (interpreter) og TurboFan (JIT-kompilator)?** Hvorfor bruker V8 begge deler i stedet for bare én?

6. **Forklar hvordan event loopen håndterer en `setTimeout(fn, 0)` sammenlignet med en `Promise.resolve().then(fn)`.** Hvilken kjører først, og hvorfor?

7. **Hva skjer under et TLS 1.3 handshake?** Beskriv de viktigste stegene og forklar hvorfor det er raskere enn TLS 1.2.

8. **Forklar forskjellen mellom HTTP/1.1 pipelining og HTTP/2 multiplexing.** Hvorfor løste ikke pipelining head-of-line blocking?

9. **Hva er Same-Origin Policy, og hvilket problem løser den?** Gi et konkret eksempel på et angrep den forhindrer.

10. **Forklar hva Content Security Policy (CSP) er og hvordan det beskytter mot XSS.** Gi et eksempel på en CSP-header og forklar hva den tillater.

---

## Del B — Dypdykk-essay (30 %)

Velg **én** av følgende tre oppgaver. Skriv et strukturert essay på 800–1200 ord.

### Alternativ 1: Fra URL til piksler

> Beskriv den komplette reisen fra det øyeblikket brukeren skriver en URL i adressefeltet til pikslene vises på skjermen. Dekk alle lag: nettverk (DNS, TCP, TLS, HTTP), parsing (HTML, CSS), rendering (DOM, CSSOM, render tree, layout, paint, compositing), og JavaScript-kjøring. Forklar hvordan disse stegene overlapper og påvirker hverandre.

**Vurderingskriterier:**
- Korrekt og komplett rekkefølge av steg
- Forståelse av hvordan stegene henger sammen
- Forklaring av optimaliseringer nettleseren gjør (preloading, speculative parsing, etc.)
- Bruk av korrekt terminologi

### Alternativ 2: JavaScript-motorens indre virkemåte

> Forklar hva som skjer fra det øyeblikket nettleseren møter en `<script>`-tag til JavaScript-koden faktisk kjører. Dekk parsing til AST, bytekode-generering, interpretation, JIT-kompilering, optimalisering og deoptimalisering. Bruk V8 som eksempel og forklar designvalgene bak arkitekturen.

**Vurderingskriterier:**
- Korrekt beskrivelse av V8s pipeline (parsing → AST → Ignition → TurboFan)
- Forståelse av hvorfor JIT-kompilering er nødvendig
- Konkrete eksempler på optimaliseringer og hva som trigger deoptimalisering
- Forklaring av hidden classes og inline caching

### Alternativ 3: Nettleserens sikkerhetsmodell

> Beskriv nettleserens sikkerhetsmodell i dybden. Start med Same-Origin Policy som fundament, og forklar deretter hvordan CSP, CORS, Subresource Integrity og sandboxing bygger videre. Inkluder konkrete angrepsscenarier (XSS, CSRF, clickjacking) og forklar hvordan de ulike mekanismene beskytter mot dem.

**Vurderingskriterier:**
- Klar forklaring av Same-Origin Policy og dens begrensninger
- Konkrete angrepseksempler og tilhørende forsvar
- Forståelse av hvordan CSP, CORS og SRI fungerer teknisk
- Helhetlig bilde av sikkerhetsmodellen som system

---

## Del C — Praktisk oppgave (40 %)

Du får utlevert kildekoden til en enkel webapp som har flere ytelses- og sikkerhetsproblemer innebygd. Din oppgave er å:

### C1: Identifisere problemer (15 %)

Analyser koden og identifiser minst **5 konkrete problemer** innenfor kategoriene:
- Rendering-ytelse (unødvendig reflow, blokkerende ressurser)
- JavaScript-ytelse (minnelekkasjer, main thread blocking)
- Nettverksytelse (manglende caching, for mange requests)
- Sikkerhet (XSS, manglende CSP, usikker databehandling)

For hvert problem: beskriv hva problemet er, **hvorfor** det er et problem (hva skjer internt i nettleseren), og hvilken effekt det har på brukeropplevelsen.

### C2: Løsningsforslag (15 %)

For hvert identifisert problem, skriv et konkret løsningsforslag med kodeeksempel. Forklar **hvorfor** løsningen fungerer — hva endrer den i nettleserens oppførsel?

### C3: Måling (10 %)

Beskriv hvordan du ville **målt** at forbedringene faktisk virker. Hvilke verktøy ville du brukt? Hvilke metrikker ville du sett på? Hvordan ville du verifisert at sikkerhetsproblemene er løst?

### Eksempel på kode som kan deles ut

```html
<!DOCTYPE html>
<html>
<head>
  <title>ProblematiskApp</title>
  <!-- Problem: Blokkerende CSS i <head> uten media-attributt -->
  <link rel="stylesheet" href="/print-styles.css">
  <script>
    // Problem: Synkron XHR blokkerer main thread
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/config", false);
    xhr.send();
    const config = JSON.parse(xhr.responseText);
  </script>
</head>
<body>
  <div id="app"></div>
  <script>
    // Problem: innerHTML med brukerinput → XSS
    const params = new URLSearchParams(location.search);
    const name = params.get("name") ?? "gjest";
    document.getElementById("app").innerHTML = `
      <h1>Velkommen, ${name}!</h1>
    `;

    // Problem: Layout thrashing
    const items = document.querySelectorAll(".item");
    items.forEach(item => {
      const height = item.offsetHeight;          // Les (trigger layout)
      item.style.height = (height * 1.1) + "px"; // Skriv (invaliderer layout)
    });

    // Problem: Ukontrollert DOM-vekst og potensiell minnelekkasje
    // Hvert 100ms legges det til et nytt element i DOM som aldri fjernes.
    // Listener-closuren holder en referanse til `el`, men siden `el` er i DOM,
    // er det DOM-veksten (ikke en klassisk GC-lekkasje) som er hovedproblemet.
    setInterval(() => {
      const el = document.createElement("div");
      el.addEventListener("click", () => {
        console.log(el.textContent);
      });
      document.body.appendChild(el);
    }, 100);
  </script>
</body>
</html>
```

---

## Sensorveiledning

### Del A
- Hvert spørsmål vurderes 0–3 poeng
- 3 poeng: Korrekt, presis, viser dyp forståelse
- 2 poeng: Korrekt men mangler dybde
- 1 poeng: Delvis korrekt, viser noe forståelse
- 0 poeng: Feil eller ikke besvart

### Del B
- Faglig korrekthet (40 %)
- Dybde og innsikt (30 %)
- Struktur og klarhet (20 %)
- Bruk av terminologi (10 %)

### Del C

**C1 — Identifisering (15 %):**
- 13–15 p: Identifiserer ≥ 5 problemer korrekt, forklarer *hvorfor* hvert er et problem med referanse til nettleserens interne mekanismer (ikke bare "det er en sårbarhet")
- 8–12 p: Identifiserer 3–4 problemer korrekt med rimelig forklaring
- 3–7 p: Identifiserer problemer overfladisk uten mekanistisk forklaring
- 0–2 p: Vesentlig feil eller svært mangelfull

**C2 — Løsningsforslag (15 %):**
- 13–15 p: Korrekte løsninger for alle identifiserte problemer, med kodeeksempel og forklaring av *hvorfor* løsningen fungerer (hva endrer det i nettleserens oppførsel)
- 8–12 p: Korrekte løsninger uten full forklaring, eller mangler kodeeksempel
- 3–7 p: Delvis korrekte løsninger
- 0–2 p: Vesentlig feil

**C3 — Måling (10 %):**
- 9–10 p: Navngir riktige verktøy (DevTools Performance, Lighthouse, Network-panel) og konkrete metrikker (LCP, INP, CLS) for hvert type problem. Forklarer hvordan sikkerhetsproblemer verifiseres (CSP-rapport, manuell XSS-test).
- 5–8 p: Nevner riktige verktøy uten å knytte dem til konkrete metrikker eller problemer
- 0–4 p: Vag eller feil
