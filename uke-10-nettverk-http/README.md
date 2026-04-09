# Uke 10: Nettverk — HTTP/1.1, HTTP/2, HTTP/3

## Læringsmål

Etter denne uken skal du kunne:
- Forklare HTTP/1.1 sin request-response-modell og begrensningene
- Beskrive hvordan HTTP/2 multiplexing løser head-of-line blocking på applikasjonslaget
- Forstå hvorfor HTTP/3 byttet fra TCP til QUIC (UDP)
- Sammenligne ytelseskarakteristikkene til de tre versjonene

## Oversikt

HTTP er protokollen som overfører nettsider mellom server og klient. Den har gjennomgått tre store revisjoner, hver gang for å løse ytelsesproblemer fra forrige versjon.

### HTTP/1.1 (1997)

```
Klient                    Server
  |--- GET /index.html ---->|
  |<-- 200 OK + HTML -------|
  |--- GET /style.css ----->|
  |<-- 200 OK + CSS --------|
  |--- GET /script.js ----->|
  |<-- 200 OK + JS ----------|
```

**Begrensninger:**
- **Head-of-line blocking** — Én forespørsel om gangen per tilkobling
- **Workaround:** Nettlesere åpner 6 parallelle TCP-tilkoblinger per domene
- **Workaround:** Domain sharding — fordel ressurser over flere domener
- Ingen header-komprimering — samme headers sendes gang etter gang

### HTTP/2 (2015)

```
Klient                    Server
  |=== Stream 1: GET /index.html ===>|
  |=== Stream 2: GET /style.css ====>|  Alle over ÉN tilkobling
  |=== Stream 3: GET /script.js ====>|
  |<=== Stream 1: 200 + HTML ========|
  |<=== Stream 2: 200 + CSS =========|
  |<=== Stream 3: 200 + JS ==========|
```

**Forbedringer:**
- **Multiplexing** — Flere forespørsler over én TCP-tilkobling
- **Header-komprimering** (HPACK) — Bare endringer sendes
- **Binært protokoll** — Mer effektiv parsing enn HTTP/1.1s tekstformat
- **Prioritering** — Klienten kan angi hvilke ressurser som haster mest

> **Merk:** HTTP/2 hadde opprinnelig også *Server Push*, der serveren kunne sende ressurser proaktivt uten at klienten ba om dem. Denne funksjonen viste seg å være vanskelig å bruke riktig i praksis og har blitt droppet: Chrome fjernet støtten i 2022 (v106), og de fleste servere og CDN-er implementerer den ikke lenger. Du vil se den nevnt i eldre litteratur, men den er ikke lenger relevant for moderne webutvikling.

**Men:** TCP-lagets head-of-line blocking er fortsatt et problem. Hvis én TCP-pakke mistes, blokkeres ALLE strømmer.

### HTTP/3 (2022)

HTTP/3 erstatter TCP med **QUIC** (basert på UDP):

- **Ingen TCP head-of-line blocking** — Hvert strøm er uavhengig
- **Raskere oppkobling** — TLS er integrert i QUIC (0-RTT mulig)
- **Bedre mobilytelse** — Overleverer mellom nettverk uten ny tilkobling

### Sammenligning

| | HTTP/1.1 | HTTP/2 | HTTP/3 |
|---|----------|--------|--------|
| Transport | TCP | TCP | QUIC (UDP) |
| Multiplexing | Nei | Ja | Ja |
| HOL blocking | Applikasjon | TCP-nivå | Ingen |
| Header-komprimering | Nei | HPACK | QPACK |
| Tilkoblingstid | TCP + TLS | TCP + TLS | 1 RTT (0-RTT mulig) |

## Lesestoff

### Obligatorisk
- [HTTP/2 Introduction](https://web.dev/articles/performance-http2) — web.dev
- [HTTP/3 explained](https://http3-explained.haxx.se/) — Daniel Stenberg (curl-skaperen) ([arkiv](https://web.archive.org/web/2024/https://http3-explained.haxx.se/))
- [Inside look at modern web browser (Part 2)](https://developer.chrome.com/blog/inside-browser-part2) — Nettverksseksjonen

### Anbefalt
- [High Performance Browser Networking — HTTP/2](https://hpbn.co/http2/) — Ilya Grigorik
- [HTTP/3 From A To Z](https://www.smashingmagazine.com/2021/08/http3-core-concepts-part1/) — Smashing Magazine

## Oppgaver

### Oppgave 1: HTTP-versjon i DevTools

Åpne Chrome DevTools → Network. Last inn 3 forskjellige nettsider og sjekk "Protocol"-kolonnen:
1. Hvilken HTTP-versjon bruker de?
2. Hvor mange tilkoblinger åpnes? (Sjekk "Connection ID"-kolonnen)
3. Sammenlign vannfallsdiagrammet for en HTTP/1.1-side vs. HTTP/2-side.

### Oppgave 2: Multiplexing-demo

Lag en enkel server (Node.js) som serverer en HTML-side med 20 små bilder.

1. Server med HTTP/1.1 — observer at nettleseren bruker flere tilkoblinger og at bilder lastes i "bølger".
2. Server med HTTP/2 (bruk `http2`-modulen) — observer at alle bilder lastes parallelt over én tilkobling.
3. Mål total lastetid med Performance-panelet.

### Oppgave 3: Wireshark — HTTP/2 rammer

Fang trafikk til en HTTP/2-side:
1. Filtrer med `http2`.
2. Identifiser HEADERS-rammer og DATA-rammer.
3. Se hvordan flere strømmer er interleaved over én TCP-tilkobling.
4. Observer stream-ID-feltet — legg merke til at partall-IDer brukes av serveren og oddetall av klienten.

> **Merk:** HTTP/2 hadde opprinnelig PRIORITY-rammer for prioritering, men RFC 9218 (2022) erstattet dette systemet. Moderne servere sender ikke lenger PRIORITY-rammer, så du vil ikke finne dem i en vanlig capture.

## Semesteroppgave

**Denne uken:** Fortsett milepæl 4 (Layout). Du begynte på dette i uke 7 — innlevering er uke 11.

## Nøkkelbegreper

| Begrep | Forklaring |
|--------|------------|
| Head-of-line blocking | Når én treg forespørsel/pakke blokkerer alle bak seg |
| Multiplexing | Flere samtidige strømmer over én tilkobling |
| QUIC | UDP-basert transportprotokoll designet for HTTP/3 |
| HPACK/QPACK | Header-komprimeringsalgoritmer for HTTP/2 og HTTP/3 |
| 0-RTT | Mulighet til å sende data i første pakke (for gjentatte tilkoblinger) |
