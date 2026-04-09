# Webteknologi — Under panseret

> Fra URL til piksler: Forstå alt som skjer mellom koden din og det nettleseren viser.

## Kursbeskrivelse

Dette kurset tar deg med på en dyp reise inn i nettleserens indre virkemåte. Du kan allerede React og TypeScript — nå skal du forstå **hva som faktisk skjer** når nettleseren mottar HTML, CSS og JavaScript og gjør det om til piksler på skjermen.

Kurset er bygget rundt én sentral ide: **du forstår teknologi best ved å bygge den selv**. Gjennom semesteroppgaven bygger du din egen mini browser engine i TypeScript, inspirert av Matt Brubeck sin [Robinson-motor](https://limpet.net/mbrubeck/2014/08/08/toy-layout-engine-1.html).

## Læringsmål

Etter fullført kurs skal studenten kunne:

- Forklare den komplette reisen fra URL til piksler, inkludert DNS, TCP, TLS, HTTP, parsing, rendering og compositing
- Beskrive hvordan en JavaScript-motor parser, kompilerer og optimaliserer kode
- Analysere nettverksaktivitet med verktøy som Wireshark og Chrome DevTools
- Identifisere og løse ytelsesproblemer ved hjelp av Chrome DevTools og Lighthouse
- Forstå nettleserens sikkerhetsmodell, inkludert same-origin policy, CSP og CORS
- Implementere en forenklet browser engine som demonstrerer parsing, styling, layout og maling

## Ukeplan

| Uke | Tema | Nøkkeloppgave | Semesteroppgave |
|-----|------|---------------|-----------------|
| 1 | Internett og nettleseren — det store bildet | Skriv mental modell URL→piksler | — |
| 2 | HTML-parsing og DOM | Utforsk DOM i DevTools | Begynn milepæl 1 |
| 3 | CSS-parsing og CSSOM | Spesifisitetsberegning | Begynn milepæl 2 |
| 4 | Rendertreet, layout og paint | Tving reflow i DevTools | **Innlevering milepæl 1** |
| 5 | Compositing og GPU-akselerasjon | `left` vs `transform` profilering | Begynn milepæl 3 |
| 6 | JS-motoren — parsing og kompilering | V8 `--print-bytecode`, AST Explorer | **Innlevering milepæl 2** |
| 7 | JS-motoren — JIT og optimalisering | Trigger deoptimalisering | Begynn milepæl 4 |
| 8 | Event loop og asynkronitet | Bygg event loop-simulator | **Innlevering milepæl 3** |
| 9 | Nettverk — DNS, TCP, TLS | Wireshark-analyse | Fortsett milepæl 4 |
| 10 | Nettverk — HTTP/1.1, HTTP/2, HTTP/3 | Multiplexing-demo | Fortsett milepæl 4 |
| 11 | Web APIer og Workers | Service Worker + offline-cache | **Innlevering milepæl 4** |
| 12 | Modulsystemer og byggverktøy | Bygg mini-bundler | Begynn milepæl 5 |
| 13 | Ytelse og Core Web Vitals | Lighthouse-audit | — |
| 14 | Sikkerhet | XSS/CSRF-lab | **Innlevering milepæl 5 + refleksjonsnotat** |
| 15 | Fra URL til piksler — den komplette reisen | Flytdiagram + essay | — |
| 16 | Eksamensforberedelse og eksamen | Repetisjon + eksamen | — |

## Vurdering

| Komponent | Andel |
|-----------|-------|
| Semesteroppgave | 50 % |
| Skriftlig eksamen | 50 % |

### Semesteroppgave — "Bygg din egen browser engine"

Du bygger en forenklet browser engine i TypeScript gjennom 5 milepæler. Se [semesteroppgave/README.md](semesteroppgave/README.md) for full oppgavebeskrivelse.

### Skriftlig eksamen

Tredelt eksamen som tester dybdeforståelse, evne til å forklare komplekse systemer, og praktisk feilsøking. Se [EKSAMEN.md](EKSAMEN.md) for detaljer.

## Lesestoff

> **Lenkestatus:** Alle lenker ble sist verifisert april 2025. Lenker til personlige blogger og mindre nettsteder er merket med en *(arkiv)*-lenke til Wayback Machine som fallback. Meld fra hvis en lenke er brutt.

### Primærkilder (gratis)
- [MDN Web Docs](https://developer.mozilla.org/) — Referanseverk for webteknologi
- [web.dev](https://web.dev/) — Googles læringsressurs for moderne webteknologi
- [Chrome for Developers Blog](https://developer.chrome.com/blog) — Tekniske dypdykk i Chrome
- [V8 Blog](https://v8.dev/blog) — Innsikt i V8 JavaScript-motoren

### Nøkkelartikler
- [How Browsers Work](https://web.dev/articles/howbrowserswork) — Tali Garsiel & Paul Irish
- [Inside look at modern web browser](https://developer.chrome.com/blog/inside-browser-part1) — Mariko Kosaka (4 deler)
- [Let's build a browser engine!](https://limpet.net/mbrubeck/2014/08/08/toy-layout-engine-1.html) — Matt Brubeck

### Verktøy
- [Wireshark](https://www.wireshark.org/) — Nettverksanalyse
- [Chrome DevTools](https://developer.chrome.com/docs/devtools) — Nettleserens innebygde utviklerverktøy

Se [ressurser/verktoy.md](ressurser/verktoy.md) for installasjonsinstruksjoner og [ressurser/ordliste.md](ressurser/ordliste.md) for norsk-engelsk ordliste.

## Forutsetninger

- Grunnleggende HTML, CSS og JavaScript
- Kjennskap til TypeScript
- Erfaring med React (eller tilsvarende rammeverk)
- Komfortabel med terminalen og Git

### TypeScript-nivå for semesteroppgaven

Semesteroppgaven krever mer enn grunnleggende TypeScript. Du bør være komfortabel med:

- Union-typer og type narrowing (`type A = B | C`, `if (x.type === "keyword")`)
- Generiske typer og grensesnitt (`interface`, `Map<string, Value>`)
- Rekursive datastrukturer (en node som inneholder en liste av noder av samme type)

Hvis noe av dette er ukjent, bruk de første dagene av kurset til å gå gjennom [TypeScript Handbook — Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html) og [Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html). Det vil spare deg for mye frustrasjon i milepæl 1.
